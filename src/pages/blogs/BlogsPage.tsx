import { useMemo, useState } from 'react'
import { Navbar } from '../../components/layout/Navbar'
import { SiteClosing } from '../../components/layout/SiteClosing'
import { PageHero } from '../../components/sections/PageHero'
import { SectionBadge } from '../../components/ui/SectionBadge'
import { blogCategories } from '../../data/blogs'
import { pageHeroContent } from '../../data/pageHeroContent'
import { useBlogs } from '../../hooks/useBlogs'
import { BlogCard } from './components/BlogCard'

export function BlogsPage() {
  const { data: blogs, isLoading } = useBlogs()
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [search, setSearch] = useState('')

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return blogs.filter((post) => {
      if (activeCategory !== 'All' && post.category !== activeCategory) return false
      if (!query) return true
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      )
    })
  }, [activeCategory, blogs, search])

  return (
    <div className="min-h-screen bg-cream text-navy">
      <Navbar />
      <main>
        <PageHero {...pageHeroContent.blogs} />

        <section id="articles" className="px-4 py-16 md:px-11 md:py-20">
          <div className="mx-auto max-w-[1154px]">
            <SectionBadge label="Insights & Blogs" />
            <h2 className="mt-6 text-3xl font-bold text-navy md:text-5xl">Latest Articles</h2>
            <p className="mt-3 max-w-2xl text-base text-navy/70 md:text-lg">
              Filter by category or search for topics that matter to your organization.
            </p>

            <div className="relative mt-8">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/40">
                ⌕
              </span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search articles by title or topic…"
                className="w-full rounded-xl border border-navy/15 bg-white py-3.5 pl-12 pr-4 text-sm text-navy outline-none focus:border-accent"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-b border-navy/10">
              {blogCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'border-accent text-navy'
                      : 'border-transparent text-navy/60 hover:text-navy'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="mt-12 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
                <p className="text-navy/40">Loading articles…</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="mt-12 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
                <p className="text-navy/60">No articles match your search.</p>
              </div>
            ) : (
              <div className="mt-10 grid gap-8 lg:grid-cols-2">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteClosing />
    </div>
  )
}
