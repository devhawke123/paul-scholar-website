import { useCallback, useEffect, useState } from 'react'
import { fetchBlogs } from '../services/blogs'
import type { BlogPost } from '../types/blog'

export function useBlogs() {
  const [data, setData] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      setData(await fetchBlogs())
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load blogs'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return { data, isLoading, error, refetch: load }
}
