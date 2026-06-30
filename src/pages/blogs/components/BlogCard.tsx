import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { blogAuthorAvatar } from '../../../data/blogAssets'
import { formatBlogDate, getBlogImage } from '../../../data/blogs'
import type { BlogPost } from '../../../types/blog'

type BlogCardProps = {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm">
      <img
        src={getBlogImage(post.imageKey)}
        alt={post.title}
        className="aspect-[585/339] w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-4 text-sm text-navy/60">
          <span className="inline-flex items-center gap-2">
            <img
              src={blogAuthorAvatar}
              alt=""
              className="size-8 rounded-full object-cover"
            />
            {post.author}
          </span>
          <span>{post.readTime}</span>
          <span className="rounded-full bg-navy/5 px-3 py-0.5 text-xs font-medium text-navy/70">
            {post.category}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-navy">{post.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/70">{post.excerpt}</p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="text-sm text-navy/60">{formatBlogDate(post.date)}</span>
          <Link to={`/blogs/${post.slug}`}>
            <Button variant="outline" className="rounded-full px-8">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
