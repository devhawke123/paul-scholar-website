import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import { useBlogs } from '../../../hooks/useBlogs'
import { BlogCard } from '../../blogs/components/BlogCard'

export function BlogsSection() {
  const blogs = useBlogs()
  const featuredPosts = blogs.slice(0, 2)

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
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-10 text-center">
          {/* <Link to="/blogs"> */}
            <Button className="rounded-full px-10">View All Articles</Button>
          {/* </Link> */}
        </div>
      </div>
    </section>
  )
}
