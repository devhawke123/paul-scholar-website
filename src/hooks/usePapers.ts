import { useCallback, useEffect, useState } from 'react'
import { fetchPapers } from '../services/papers'
import type { Paper } from '../types/paper'

export function usePapers() {
  const [data, setData] = useState<Paper[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      setData(await fetchPapers())
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load papers'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return { data, isLoading, error, refetch: load }
}
