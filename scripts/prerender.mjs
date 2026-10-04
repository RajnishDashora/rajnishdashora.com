#!/usr/bin/env node
// Postbuild: give every post a real static page so crawlers and link previews
// (Google, LinkedIn, X) get HTTP 200, the article text and per-post meta tags —
// instead of GitHub Pages' 404 → SPA redirect.
//
// For each public/posts/<slug>.md it writes:
//   dist/posts/<slug>.html           (GitHub Pages serves /posts/<slug> from this)
//   dist/posts/<slug>/index.html     (fallback if extensionless .html isn't resolved)
// plus dist/sitemap.xml, dist/robots.txt and dist/og-default.png.
//
// The page is dist/index.html with the <!--seo:start-->…<!--seo:end--> block
// swapped for per-post tags, the article rendered into #root, and the post data
// embedded as JSON so BlogPost renders immediately instead of re-fetching.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const SITE = 'https://rajnishdashora.com'
const AUTHOR = 'Rajnish Dashora'
const DEFAULT_IMAGE = '/og-default.png'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const postsDir = path.join(root, 'public', 'posts')

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const abs = (u) => (/^https?:\/\//.test(u) ? u : SITE + (u.startsWith('/') ? u : '/' + u))
// Frontmatter dates look like "July 5, 2026"; parse as UTC so the day never shifts with the build machine's timezone.
const isoDate = (d) => {
  const t = new Date(`${d} 00:00:00 UTC`)
  return Number.isNaN(t.getTime()) ? null : t.toISOString().slice(0, 10)
}

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
if (!/<!--seo:start-->[\s\S]*<!--seo:end-->/.test(template)) {
  throw new Error('dist/index.html is missing the <!--seo:start-->…<!--seo:end--> block')
}
if (!template.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html is missing <div id="root"></div>')
}

// Same Tailwind classes as src/components/BlogPost.tsx, so the static page and the
// React render look the same when React takes over.
const cls = {
  h1: 'text-3xl font-bold text-fg mt-8 mb-4',
  h2: 'text-2xl font-bold text-fg mt-8 mb-4',
  h3: 'text-xl font-bold text-fg mt-6 mb-3',
  p: 'text-muted mb-4 leading-relaxed',
  ul: 'list-disc list-inside mb-4 text-muted',
  ol: 'list-decimal list-inside mb-4 text-muted',
  li: 'mb-2',
  a: 'text-accent hover:text-accent-hover underline transition-colors',
  blockquote: 'border-l-4 border-accent pl-4 italic text-muted my-4',
  strong: 'text-fg font-semibold',
  img: 'max-w-full h-auto my-8 mx-auto block rounded-xl border border-line/10',
}
const components = Object.fromEntries(
  Object.entries(cls).map(([tag, className]) => [
    tag,
    ({ node, ...props }) => createElement(tag, { className, ...props }),
  ]),
)

function seoBlock(post) {
  // Pages pass their own url; posts default to /posts/<slug>.
  const url = post.url || `${SITE}/posts/${post.slug}`
  const image = abs(post.image || DEFAULT_IMAGE)
  return [
    `<meta name="description" content="${esc(post.excerpt)}" />`,
    `<meta name="author" content="${AUTHOR}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="${AUTHOR}" />`,
    `<meta property="og:title" content="${esc(post.title)}" />`,
    `<meta property="og:description" content="${esc(post.excerpt)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    post.iso ? `<meta property="article:published_time" content="${post.iso}" />` : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(post.title)}" />`,
    `<meta name="twitter:description" content="${esc(post.excerpt)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  ]
    .filter(Boolean)
    .join('\n    ')
}

function articleHtml(post) {
  const body = renderToStaticMarkup(
    createElement(Markdown, { remarkPlugins: [remarkGfm], components }, post.content),
  )
  // Mirrors BlogPost.tsx's layout (header + article) without the icon.
  return `<div class="min-h-screen bg-page">
      <header class="bg-surface border-b border-line/10 sticky top-0 z-10">
        <div class="max-w-4xl mx-auto px-6 py-4">
          <a href="/" class="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors">← Back to home</a>
        </div>
      </header>
      <article class="max-w-4xl mx-auto px-6 py-12">
        <header class="mb-12">
          <time class="text-accent font-medium"${post.iso ? ` datetime="${post.iso}"` : ''}>${esc(post.date)}</time>
          <h1 class="text-4xl md:text-5xl font-bold text-fg mt-4 mb-6">${esc(post.title)}</h1>
          <p class="text-xl text-muted">${esc(post.excerpt)}</p>
        </header>
        <div class="prose prose-lg prose-blue max-w-none">${body}</div>
      </article>
    </div>`
}

// JSON inside <script> must not be able to close the tag.
const safeJson = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')

const posts = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith('.md'))
  .map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
    const { data, content } = matter(raw)
    const slug = data.slug || file.replace(/\.md$/, '')
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      iso: isoDate(data.date),
      excerpt: data.excerpt || '',
      image: data.image || '',
      content,
    }
  })

for (const post of posts) {
  const title = `${post.title} | ${AUTHOR}`
  const data = { slug: post.slug, title: post.title, date: post.date, excerpt: post.excerpt, content: post.content }
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n    ${seoBlock(post)}\n    <!--seo:end-->`)
    .replace(
      '<div id="root"></div>',
      `<div id="root">${articleHtml(post)}</div>\n    <script type="application/json" id="post-data">${safeJson(data)}</script>`,
    )
  fs.mkdirSync(path.join(dist, 'posts', post.slug), { recursive: true })
  fs.writeFileSync(path.join(dist, 'posts', `${post.slug}.html`), html)
  fs.writeFileSync(path.join(dist, 'posts', post.slug, 'index.html'), html)
}

// --- /all and /about -------------------------------------------------------------------
// Both get real HTML for the same reason posts do: a crawler or a link preview that lands on
// an empty <div id="root"> sees nothing. /all is built from the same post files the list uses,
// so it cannot drift; /about reads src/data/about.json, the file the React page imports.
function writePage({ slug, title, description, body }) {
  const page = { slug, title, excerpt: description, image: '', iso: null, url: `${SITE}/${slug}` }
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(`${title} | ${AUTHOR}`)}</title>`)
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n    ${seoBlock(page).replace('og:type" content="article"', 'og:type" content="website"')}\n    <!--seo:end-->`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  fs.mkdirSync(path.join(dist, slug), { recursive: true })
  fs.writeFileSync(path.join(dist, `${slug}.html`), html)
  fs.writeFileSync(path.join(dist, slug, 'index.html'), html)
}

const shell = (inner) => `<div class="min-h-screen bg-[#0F172A]"><div class="max-w-4xl mx-auto px-6 py-12">${inner}</div></div>`

// /all — year-grouped list, derived from the same posts
const byYear = {}
posts.slice().sort((a, b) => (b.iso || '').localeCompare(a.iso || '')).forEach((p) => {
  const y = (p.iso || '').slice(0, 4) || 'Undated'
  ;(byYear[y] ||= []).push(p)
})
writePage({
  slug: 'all',
  title: 'Index',
  description: 'Writing, talks, papers and the moves between them — one list, newest first.',
  body: shell(
    `<h1 class="text-4xl font-bold text-[#F9FAFB] mb-2">Index</h1>` +
    `<p class="text-[#9CA3AF] mb-8">Writing, talks, papers and the moves between them — one list, newest first.</p>` +
    Object.entries(byYear).map(([y, es]) =>
      `<h2 class="text-2xl font-bold text-[#F9FAFB] mt-8 mb-1">${y}</h2>` +
      es.map((e) => `<div class="py-2"><a class="text-[#F9FAFB]" href="/posts/${e.slug}">${esc(e.title)}</a> <span class="text-[#9CA3AF]">— ${esc(e.date)}</span></div>`).join('')
    ).join('')
  ),
})

// /about — from the file the React page imports, so the words match
const about = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'about.json'), 'utf8'))
writePage({
  slug: 'about',
  title: 'About',
  description: about.lead,
  body: shell(
    `<h1 class="text-4xl font-bold text-[#F9FAFB] mb-6">About</h1>` +
    `<p class="text-xl text-[#F9FAFB] mb-6">${esc(about.lead)}</p>` +
    about.paragraphs.map((t) => `<p class="text-[#9CA3AF] mb-4 leading-relaxed">${esc(t)}</p>`).join('') +
    `<h2 class="text-2xl font-bold text-[#F9FAFB] mt-8 mb-4">Roles</h2>` +
    about.roles.map((r) => `<div class="mb-4"><div class="text-[#9CA3AF] text-sm">${esc(r.dates)}</div><div class="text-[#F9FAFB]"><strong>${esc(r.title)}</strong>, ${esc(r.org)}</div><div class="text-[#9CA3AF] text-sm">${esc(r.scope)}</div><div class="text-[#9CA3AF] text-sm">${esc(r.outcomes.join(' · '))}</div></div>`).join('') +
    `<h2 class="text-2xl font-bold text-[#F9FAFB] mt-8 mb-4">Short bio</h2>` +
    `<p class="text-[#9CA3AF] leading-relaxed">${esc(about.bio)}</p>`
  ),
})

// sitemap + robots
const newest = posts.map((p) => p.iso).filter(Boolean).sort().pop()
const urls = [
  `  <url><loc>${SITE}/</loc>${newest ? `<lastmod>${newest}</lastmod>` : ''}</url>`,
  `  <url><loc>${SITE}/all</loc>${newest ? `<lastmod>${newest}</lastmod>` : ''}</url>`,
  `  <url><loc>${SITE}/about</loc></url>`,
  ...posts
    .slice()
    .sort((a, b) => (b.iso || '').localeCompare(a.iso || ''))
    .map((p) => `  <url><loc>${SITE}/posts/${p.slug}</loc>${p.iso ? `<lastmod>${p.iso}</lastmod>` : ''}</url>`),
]
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)

// default share image (the profile photo) at a stable, unhashed URL
fs.copyFileSync(path.join(root, 'src', 'assets', 'images', 'rajnish.png'), path.join(dist, 'og-default.png'))

console.log(`prerender: ${posts.length} posts + /all + /about → static HTML, sitemap.xml, robots.txt, og-default.png`)
