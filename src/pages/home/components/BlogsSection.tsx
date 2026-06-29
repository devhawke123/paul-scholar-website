import { Button } from '../../../components/ui/Button'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import { homeAssets } from '../data/homeAssets'
import { blogPosts } from '../data/homeContent'

export function BlogsSection() {
  return (
    <section id="blogs" className="bg-cream px-4 py-20 md:px-11">
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <SectionBadge label="Insights & Blogs" className="mx-auto" />
          <h2 className="mt-6 text-3xl font-bold text-navy md:text-4xl">
            Insights & Blogs
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {blogPosts.map((post, index) => (
            <article
              key={`${post.title}-${index}`}
              className="overflow-hidden rounded-3xl bg-white shadow-sm"
            >
              <img
                src={homeAssets.blogs[index]}
                alt={post.title}
                className="aspect-[585/339] w-full object-cover"
              />
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-4 text-sm text-navy/60">
                  <span className="inline-flex items-center gap-2">
                    <img
                      src={homeAssets.authorAvatar}
                      alt=""
                      className="size-8 rounded-full object-cover"
                    />
                    {post.author}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-navy">{post.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy/70">{post.excerpt}</p>
                <Button variant="outline" className="mt-6 rounded-full px-8">
                  Read More
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
