import { SectionBadge } from '../../../components/ui/SectionBadge'
import type { BlogPost } from '../../../types/blog'
import { BlogCard } from './BlogCard'

type BlogPostRelatedSectionProps = {
  posts: BlogPost[]
}

export function BlogPostRelatedSection({ posts }: BlogPostRelatedSectionProps) {
  if (posts.length === 0) return null

  return (
    <section className="bg-cream px-4 py-14 md:px-11 md:py-16">
      <div className="mx-auto max-w-[1296px]">
        <SectionBadge label="Insights & Blogs" />
        <h2 className="mt-4 text-2xl font-semibold text-navy sm:text-3xl">Insights &amp; Blogs</h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
