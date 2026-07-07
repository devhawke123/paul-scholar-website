import { formatBlogDate, getBlogCoverImage } from '../../../data/blogs'
import { DetailPageHero } from '../../../components/sections/DetailPageHero'
import type { BlogPost } from '../../../types/blog'

type BlogPostHeroProps = {
  post: BlogPost
}

export function BlogPostHero({ post }: BlogPostHeroProps) {
  const heroTitle = post.heroTitle?.trim() || post.title
  const badge = post.heroBadge?.trim() || post.category

  return (
    <DetailPageHero
      imageSrc={getBlogCoverImage(post)}
      imageAlt={post.title}
      badges={
        <span className="inline-flex w-fit rounded-[10px] bg-accent px-3 py-1.5 text-xs font-medium text-navy sm:px-4 sm:text-sm">
          {badge}
        </span>
      }
      title={heroTitle}
      description={post.excerpt}
      meta={
        <>
          <span>{formatBlogDate(post.date)}</span>
          {post.citations ? <span>{post.citations}</span> : <span>{post.readTime}</span>}
        </>
      }
    />
  )
}
