import { useEffect, useState } from 'react'
import { loadBlogs, subscribeToBlogs } from '../data/blogsStore'
import type { BlogPost } from '../types/blog'

export function useBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => loadBlogs())

  useEffect(() => {
    return subscribeToBlogs(() => setBlogs(loadBlogs()))
  }, [])

  return blogs
}
