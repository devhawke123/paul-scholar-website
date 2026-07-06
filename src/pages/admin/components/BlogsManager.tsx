import { useState } from 'react'
import { createBlog, deleteBlog, updateBlog, formatBlogDate } from '../../../services/blogs'
import type { BlogFiles } from '../../../services/blogs'
import { useBlogs } from '../../../hooks/useBlogs'
import { Button } from '../../../components/ui/Button'
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog'
import type { BlogInput, BlogPost } from '../../../types/blog'
import { BlogForm } from './BlogForm'

/* ── inline SVG icon ──────────────────────────────────────────────────────── */

function IconPencil() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 size-4 shrink-0 text-navy/40"
    >
      <path d="M11.5 2.5l2 2-8 8H3.5v-2l8-8z" />
      <path d="M10 4l2 2" />
    </svg>
  )
}

/* ── stats bar ────────────────────────────────────────────────────────────── */

function StatsBar({ blogs }: { blogs: BlogPost[] }) {
  const categories = new Set(blogs.map((b) => b.category)).size
  return (
    <div className="mt-6 flex gap-px overflow-hidden rounded-xl border border-navy/10 bg-navy/10">
      <div className="flex flex-1 flex-col bg-white px-5 py-4">
        <span className="text-2xl font-semibold text-navy">{blogs.length}</span>
        <span className="mt-0.5 text-xs text-navy/50">Total posts</span>
      </div>
      <div className="flex flex-1 flex-col bg-white px-5 py-4">
        <span className="text-2xl font-semibold text-navy">{categories}</span>
        <span className="mt-0.5 text-xs text-navy/50">Categories</span>
      </div>
    </div>
  )
}

/* ── manager ──────────────────────────────────────────────────────────────── */

export function BlogsManager() {
  const { data: blogs, refetch } = useBlogs({ full: true })
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
  const [blogToDelete, setBlogToDelete] = useState<BlogPost | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  function closeForm() {
    setShowForm(false)
    setEditingBlog(null)
  }

  async function handleAdd(input: BlogInput, files: BlogFiles) {
    await createBlog(input, files)
    await refetch()
    closeForm()
  }

  async function handleUpdate(input: BlogInput, files: BlogFiles) {
    if (!editingBlog) return
    await updateBlog(editingBlog.id, input, files)
    await refetch()
    closeForm()
  }

  async function confirmDelete() {
    if (!blogToDelete) return
    setIsDeleting(true)
    try {
      await deleteBlog(blogToDelete.id)
      await refetch()
      if (editingBlog?.id === blogToDelete.id) closeForm()
      setBlogToDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section className="px-4 py-12 md:px-11 md:py-16">
      <div className="mx-auto max-w-[1154px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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

        <StatsBar blogs={blogs} />

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
                  className="flex flex-col gap-4 px-6 py-6 transition hover:bg-navy/[0.025] md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex gap-4">
                    <IconPencil />
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
                      onClick={() => setBlogToDelete(blog)}
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

      <ConfirmDialog
        open={blogToDelete !== null}
        title="Delete blog post?"
        description={
          blogToDelete ? (
            <>
              Delete <strong>&ldquo;{blogToDelete.title}&rdquo;</strong>? This cannot be undone.
            </>
          ) : (
            ''
          )
        }
        confirmLabel="Delete"
        variant="danger"
        isLoading={isDeleting}
        onConfirm={() => void confirmDelete()}
        onCancel={() => {
          if (!isDeleting) setBlogToDelete(null)
        }}
      />
    </section>
  )
}
