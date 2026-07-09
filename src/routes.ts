export const routes = {
  home: '/',
  about: '/about',
  library: '/library',
  blogs: '/blogs',
  contact: '/contact',
  admin: '/admin',
  contactForm: '/contact#get-in-touch',
  contactFaq: '/contact#faq',
  subscribe: '#subscribe',
  blogsArticles: '/blogs#articles',
} as const

export function libraryPath(id: string) {
  return `/library/${id}`
}

export function blogPath(slug: string) {
  return `/blogs/${slug}`
}

export function isNavActive(href: string, pathname: string) {
  if (href === routes.home) return pathname === routes.home
  if (href === routes.about) return pathname === routes.about
  if (href === routes.library) {
    return pathname === routes.library || pathname.startsWith('/library/')
  }
  if (href === routes.blogs) {
    return pathname === routes.blogs || pathname.startsWith('/blogs/')
  }
  if (href === routes.contact) return pathname === routes.contact
  return false
}

export function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}
