import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToHashWithRetry } from '../utils/scroll'

/** Scroll to top on route changes; honor hash anchors when present. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      scrollToHashWithRetry(id)
      return
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
