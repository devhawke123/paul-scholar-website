import { useCallback, useEffect, useState } from 'react'
import { fetchBlogs } from '../services/blogs'
import type { BlogPost } from '../types/blog'

type UseBlogsOptions = {
  limit?: number
  full?: boolean
}

export function useBlogs(options: UseBlogsOptions = {}) {
  const { limit, full } = options
  const [data, setData] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      setData(await fetchBlogs({ limit, full }))
    } catch (err) {
      console.error('[useBlogs] fetch failed:', err)
      setError(err instanceof Error ? err : new Error('Failed to load blogs'))
    } finally {
      setIsLoading(false)
    }
  }, [limit, full])

  useEffect(() => {
    void load()
  }, [load])

  return { data, isLoading, error, refetch: load }
}
