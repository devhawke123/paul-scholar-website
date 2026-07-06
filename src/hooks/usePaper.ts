import { useCallback, useEffect, useState } from 'react'
import { fetchPaperById } from '../services/papers'
import type { Paper } from '../types/paper'

export function usePaper(id?: string) {
  const [data, setData] = useState<Paper | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const load = useCallback(async () => {
    if (!id) {
      setData(null)
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      setData(await fetchPaperById(id))
    } catch (err) {
      console.error('[usePaper] fetch failed:', err)
      setError(err instanceof Error ? err : new Error('Failed to load paper'))
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    void load()
  }, [load])

  return { data, isLoading, error }
}
