import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft } from 'lucide-react'

interface BlogPostMetadata {
  title: string
  date: string
  excerpt: string
}

// Simple frontmatter parser for browser
function parseFrontmatter(text: string): { data: BlogPostMetadata; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = text.match(frontmatterRegex)

  if (!match) {
    return { data: { title: '', date: '', excerpt: '' }, content: text }
  }

  const frontmatterText = match[1]
  const content = match[2]

  const data: any = {}
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()
      // Remove quotes if present
      value = value.replace(/^["']|["']$/g, '')
      data[key] = value
    }
  })

  return { data: data as BlogPostMetadata, content }
}

// Prerendered post pages (scripts/prerender.mjs) embed the post as JSON, so the
// first render needs no fetch and no "Loading..." flash. Client-side navigation to
// another post falls back to fetching the markdown.
interface PrerenderedPost extends BlogPostMetadata {
  slug: string
  content: string
}

function readPrerendered(slug?: string): PrerenderedPost | null {
  const el = document.getElementById('post-data')
  if (!el || !slug) return null
  try {
    const data = JSON.parse(el.textContent || '') as PrerenderedPost
    return data.slug === slug ? data : null
  } catch {
    return null
  }
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const prerendered = readPrerendered(slug)
  const [content, setContent] = useState<string>(prerendered?.content ?? '')
  const [metadata, setMetadata] = useState<BlogPostMetadata | null>(prerendered)
  const [loading, setLoading] = useState(!prerendered)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!metadata?.title) return
    const previous = document.title
    document.title = `${metadata.title} | Rajnish Dashora`
    return () => {
      document.title = previous
    }
  }, [metadata?.title])

  useEffect(() => {
    if (readPrerendered(slug)) {
      const data = readPrerendered(slug)!
      setMetadata(data)
      setContent(data.content)
      setError(false)
      setLoading(false)
      return
    }

    setLoading(true)
    const fetchPost = async () => {
      try {
        const response = await fetch(`/posts/${slug}.md`)
        if (!response.ok) {
          throw new Error('Post not found')
        }

        const text = await response.text()
        const { data, content: markdownContent } = parseFrontmatter(text)

        setMetadata(data as BlogPostMetadata)
        setContent(markdownContent)
        setLoading(false)
      } catch (err) {
        console.error('Error loading post:', err)
        setError(true)
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    } else {
      setError(true)
      setLoading(false)
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-xl text-muted">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-fg mb-4">Post not found</h1>
          <Link to="/" className="text-accent hover:text-accent-hover inline-flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-page">
      {/* Header */}
      <header className="bg-surface border-b border-line/10 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </header>

      {/* Blog Post Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-12">
          <time className="text-accent font-medium">{metadata?.date}</time>
          <h1 className="text-4xl md:text-5xl font-bold text-fg mt-4 mb-6">
            {metadata?.title}
          </h1>
          <p className="text-xl text-muted">{metadata?.excerpt}</p>
        </header>

        <div className="prose prose-lg prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-fg mt-8 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-fg mt-8 mb-4" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-bold text-fg mt-6 mb-3" {...props} />,
              p: ({node, ...props}) => <p className="text-muted mb-4 leading-relaxed" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 text-muted" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 text-muted" {...props} />,
              li: ({node, ...props}) => <li className="mb-2" {...props} />,
              a: ({node, ...props}) => <a className="text-accent hover:text-accent-hover underline transition-colors" {...props} />,
              code: ({node, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <code className="block bg-surface text-fg p-4 rounded-lg overflow-x-auto my-4 border border-line/10" {...props}>
                    {children}
                  </code>
                ) : (
                  <code className="bg-surface text-accent px-1.5 py-0.5 rounded text-sm" {...props}>
                    {children}
                  </code>
                )
              },
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-accent pl-4 italic text-muted my-4" {...props} />
              ),
              strong: ({node, ...props}) => <strong className="text-fg font-semibold" {...props} />,
              img: ({node, ...props}) => (
                <img className="max-w-full h-auto my-8 mx-auto block rounded-xl border border-line/10" loading="lazy" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
