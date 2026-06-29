import { useEffect, useState } from 'react'
import { loadPapers, subscribeToPapers } from '../data/papersStore'
import type { Paper } from '../types/paper'

export function usePapers() {
  const [papers, setPapers] = useState<Paper[]>(() => loadPapers())

  useEffect(() => {
    return subscribeToPapers(() => setPapers(loadPapers()))
  }, [])

  return papers
}
