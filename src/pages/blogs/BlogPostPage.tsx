import { Link, Navigate, useParams } from 'react-router-dom'
import { Footer } from '../../components/layout/Footer'
import { Navbar } from '../../components/layout/Navbar'
import { SectionBadge } from '../../components/ui/SectionBadge'
import { blogPosts, formatBlogDate, getBlogBySlug } from '../../data/blogs'
import { BlogCard } from './components/BlogCard'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getBlogBySlug(slug) : undefined

  if (!post) {
    return <Navigate to="/blogs" replace />
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2)

  return (
    <div className="min-h-screen bg-cream text-navy">
      <Navbar />
      <main>
        <article className="px-4 py-12 md:px-11 md:py-16">
          <div className="mx-auto max-w-[800px]">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-sm font-medium text-navy/70 transition-colors hover:text-accent"
            >
              ← Back to all articles
            </Link>

            <div className="mt-8">
              <SectionBadge label={post.category} />
            </div>

            <h1 className="mt-6 text-3xl font-bold leading-tight text-navy md:text-5xl">
              {post.title}
            </h1>

            <img
              src={post.image}
              alt={post.title}
              className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
            />

            <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-navy/10 pb-8 text-sm text-navy/60">
              <span className="font-medium text-navy">{post.author}</span>
              <span>{formatBlogDate(post.date)}</span>
              <span>{post.readTime}</span>
            </div>

            <div className="prose-navy mt-8 space-y-6">
              {post.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-navy/80 md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="border-t border-navy/10 bg-white px-4 py-16 md:px-11">
            <div className="mx-auto max-w-[1154px]">
              <h2 className="text-2xl font-bold text-navy md:text-3xl">More to explore</h2>
              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
