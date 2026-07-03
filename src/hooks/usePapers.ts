import { useCallback, useEffect, useState } from 'react'
import { fetchPapers } from '../services/papers'
import type { Paper } from '../types/paper'

export function usePapers(limit?: number) {
  const [data, setData] = useState<Paper[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      setData(await fetchPapers(limit))
    } catch (err) {
      console.error('[usePapers] fetch failed:', err)
      setError(err instanceof Error ? err : new Error('Failed to load papers'))
    } finally {
      setIsLoading(false)
    }
  }, [limit])

  useEffect(() => {
    void load()
  }, [load])

  return { data, isLoading, error, refetch: load }
}
