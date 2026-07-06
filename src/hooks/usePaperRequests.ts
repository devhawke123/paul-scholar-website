import { useCallback, useEffect, useState } from 'react'
import { fetchPaperRequests } from '../services/paperRequests'
import type { PaperRequest } from '../types/paperRequest'

export function usePaperRequests() {
  const [data, setData] = useState<PaperRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      setData(await fetchPaperRequests())
    } catch (err) {
      console.error('[usePaperRequests] fetch failed:', err)
      setError(err instanceof Error ? err : new Error('Failed to load requests'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return { data, isLoading, error, refetch: load }
}
