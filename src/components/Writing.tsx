import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { blogPosts } from '../data/posts'

const Writing = () => {
  return (
    <section id="writing" className="py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            Writing
          </h2>
          <p className="text-xl text-[#9CA3AF]">
            Thoughts on engineering leadership, product delivery, and building teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-[#111827] rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/10"
            >
              <div className="text-sm font-semibold text-[#22D3EE] uppercase tracking-wider mb-3">
                {post.date}
              </div>
              <h3 className="text-2xl font-bold text-[#F9FAFB] mb-4 group-hover:text-[#22D3EE] transition-colors">
                {post.title}
              </h3>
              <p className="text-[#9CA3AF] leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <Link
                to={`/posts/${post.slug}`}
                className="inline-flex items-center gap-2 text-[#22D3EE] font-semibold hover:gap-3 hover:text-[#01C16A] transition-all"
              >
                Read more
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Writing
