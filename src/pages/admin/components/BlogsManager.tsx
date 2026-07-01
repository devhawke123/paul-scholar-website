import { useState } from 'react'
import { createBlog, deleteBlog, updateBlog, formatBlogDate } from '../../../services/blogs'
import { useBlogs } from '../../../hooks/useBlogs'
import { Button } from '../../../components/ui/Button'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import type { BlogInput, BlogPost } from '../../../types/blog'
import { BlogForm } from './BlogForm'

export function BlogsManager() {
  const { data: blogs, refetch } = useBlogs()
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)

  function closeForm() {
    setShowForm(false)
    setEditingBlog(null)
  }

  async function handleAdd(input: BlogInput) {
    await createBlog(input)
    await refetch()
    closeForm()
  }

  async function handleUpdate(input: BlogInput) {
    if (!editingBlog) return
    await updateBlog(editingBlog.id, input)
    await refetch()
    closeForm()
  }

  async function handleDelete(blog: BlogPost) {
    if (!window.confirm(`Delete "${blog.title}"?`)) return
    await deleteBlog(blog.id)
    await refetch()
    if (editingBlog?.id === blog.id) closeForm()
  }

  return (
    <section className="px-4 py-12 md:px-11 md:py-16">
      <div className="mx-auto max-w-[1154px]">
        <SectionBadge label="Doctor Dashboard" />
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy md:text-4xl">Manage Blogs</h1>
            <p className="mt-2 max-w-2xl text-base text-navy/70">
              Add, update, or remove blog posts. Each post automatically gets a separate inner
              page and appears in the blogs list with its Read More flow.
            </p>
          </div>
          {!showForm && (
            <Button
              onClick={() => {
                setEditingBlog(null)
                setShowForm(true)
              }}
              className="h-12 shrink-0 rounded-full px-8"
            >
              + Add Blog
            </Button>
          )}
        </div>

        {showForm && (
          <div className="mt-8">
            <BlogForm
              initial={editingBlog ?? undefined}
              onSubmit={editingBlog ? handleUpdate : handleAdd}
              onCancel={closeForm}
            />
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-navy/10 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-navy/10 px-6 py-4">
            <h2 className="font-semibold text-navy">Your Blogs</h2>
            <span className="rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy/70">
              {blogs.length} total
            </span>
          </div>

          {blogs.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-navy/60">No blog posts yet. Add your first post above.</p>
            </div>
          ) : (
            <ul className="divide-y divide-navy/10">
              {blogs.map((blog) => (
                <li
                  key={blog.id}
                  className="flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex gap-4">
                    <span className="mt-1 text-navy/40" aria-hidden>
                      ✍️
                    </span>
                    <div>
                      <h3 className="font-medium text-navy">{blog.title}</h3>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-navy/60">
                        <span>{formatBlogDate(blog.date)}</span>
                        <span className="rounded-full bg-navy/5 px-3 py-0.5 text-xs">
                          {blog.category}
                        </span>
                        <span className="rounded-full bg-navy/5 px-3 py-0.5 text-xs">
                          /blogs/{blog.slug}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:shrink-0">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingBlog(blog)
                        setShowForm(true)
                      }}
                      className="h-10 rounded-full px-5 text-sm"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => void handleDelete(blog)}
                      className="h-10 rounded-full px-5 text-sm text-red-700 hover:text-red-800"
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
