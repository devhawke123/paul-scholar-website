import { useCallback, useEffect, useState } from 'react'
import { fetchBlogBySlug } from '../services/blogs'
import type { BlogPost } from '../types/blog'

export function useBlogPost(slug?: string) {
  const [data, setData] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const load = useCallback(async () => {
    if (!slug) {
      setData(null)
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      setData(await fetchBlogBySlug(slug))
    } catch (err) {
      console.error('[useBlogPost] fetch failed:', err)
      setError(err instanceof Error ? err : new Error('Failed to load post'))
    } finally {
      setIsLoading(false)
    }
  }, [slug])

  useEffect(() => {
    void load()
  }, [load])

  return { data, isLoading, error }
}
