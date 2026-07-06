import { formatBlogDate, getBlogCoverImage } from '../../../data/blogs'
import type { BlogPost } from '../../../types/blog'
import {
  HeroWhatsAppCorner,
  heroCornerVarsClass,
  heroImageScoopMaskClass,
} from '../../../components/sections/HeroWhatsAppCorner'

type BlogPostHeroProps = {
  post: BlogPost
}

export function BlogPostHero({ post }: BlogPostHeroProps) {
  const heroTitle = post.heroTitle?.trim() || post.title
  const badge = post.heroBadge?.trim() || post.category

  return (
    <section className="px-4 pb-2 pt-3 sm:pb-4 sm:pt-5 md:px-11 md:pb-6 md:pt-8">
      <div
        className={`relative mx-auto max-w-[1296px] overflow-visible rounded-[16px] sm:rounded-[28px] md:rounded-[32px] ${heroCornerVarsClass}`}
      >
        <div
          className={`relative overflow-hidden rounded-[16px] sm:rounded-[28px] md:rounded-[32px] ${heroImageScoopMaskClass}`}
        >
          <img
            src={getBlogCoverImage(post)}
            alt={post.title}
            className="aspect-[4/3] w-full object-cover object-center sm:aspect-[16/9] md:aspect-[1296/609]"
          />
          <div className="absolute inset-0 bg-navy/35" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-between px-6 py-6 sm:px-10 sm:py-8 md:px-[72px] md:py-10">
          <span className="inline-flex w-fit rounded-[10px] bg-accent px-4 py-1.5 text-sm font-medium text-navy">
            {badge}
          </span>

          <div className="max-w-[857px]">
            <h1 className="font-serif text-[26px] font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[50px] lg:leading-[1.2]">
              {heroTitle}
            </h1>
            <p className="mt-4 max-w-[802px] text-sm leading-relaxed text-white/90 sm:text-base md:text-lg">
              {post.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-white sm:text-base">
              <span>{formatBlogDate(post.date)}</span>
              {post.citations ? <span>{post.citations}</span> : <span>{post.readTime}</span>}
            </div>
          </div>
        </div>

        <HeroWhatsAppCorner />
      </div>
    </section>
  )
}
