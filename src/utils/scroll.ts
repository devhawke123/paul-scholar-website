const NAVBAR_OFFSET = 88

export function scrollToHash(id: string, behavior: ScrollBehavior = 'smooth') {
  const el = document.getElementById(id)
  if (!el) return false

  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior })
  return true
}

export function scrollToHashWithRetry(id: string, behavior: ScrollBehavior = 'smooth') {
  if (scrollToHash(id, behavior)) return

  requestAnimationFrame(() => {
    if (scrollToHash(id, behavior)) return
    window.setTimeout(() => {
      scrollToHash(id, behavior)
    }, 150)
  })
}
