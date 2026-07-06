import { Navigate, useParams } from 'react-router-dom'
import { Navbar } from '../../components/layout/Navbar'
import { SiteClosing } from '../../components/layout/SiteClosing'
import { getBlogSections } from '../../utils/blogContent'
import { useBlogPost } from '../../hooks/useBlogPost'
import { useBlogs } from '../../hooks/useBlogs'
import { BlogPostContent } from './components/BlogPostContent'
import { BlogPostHero } from './components/BlogPostHero'
import { BlogPostRelatedSection } from './components/BlogPostRelatedSection'
import { BlogPostResearchSection } from './components/BlogPostResearchSection'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: post, isLoading } = useBlogPost(slug)
  const { data: blogs } = useBlogs()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream text-navy">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-navy/40">Loading…</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return <Navigate to="/blogs" replace />
  }

  const relatedPosts = blogs.filter((item) => item.slug !== post.slug).slice(0, 2)
  const sections = getBlogSections(post)

  return (
    <div className="min-h-screen bg-[#fdf7f3] text-navy">
      <Navbar />
      <main>
        <BlogPostHero post={post} />
        <BlogPostContent
          title={post.title}
          author={post.author}
          authorTitle={post.authorTitle}
          sections={sections}
        />
        <BlogPostResearchSection />
        <BlogPostRelatedSection posts={relatedPosts} />
      </main>
      <SiteClosing />
    </div>
  )
}
