import { useEffect } from 'react'

const prefetched = new Set<string>()

/** Warms the browser's HTTP cache for a PDF shortly after mount, so the first click feels instant. */
export function usePdfPrefetch(url?: string) {
  useEffect(() => {
    if (!url || prefetched.has(url)) return

    const timer = window.setTimeout(() => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = url
      link.as = 'fetch'
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
      prefetched.add(url)
    }, 300)

    return () => window.clearTimeout(timer)
  }, [url])
}
