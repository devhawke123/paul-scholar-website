import { routes } from '../routes'

export type FooterLink = {
  label: string
  href: string
}

export const footerContent = {
  brand: 'Dr. Paul A. Stokes',
  contactLines: ['Feel free to call or email me', 'for any kind of query.'] as const,
  phone: '087-7915106',
  email: 'abc@gmail.com',
  copyright: 'Copyright © 2026 Dr. Paul A. Stokes. All rights reserved.',
  newsletterHeading: 'Subscribe to Newsletter',
  newsletterPlaceholder: 'Enter your email',
  newsletterSubmitLabel: 'Subscribe',
  links: {
    pages: [
      { label: 'About', href: routes.about },
      { label: 'Contact', href: routes.contact },
      { label: 'Library', href: routes.library },
      { label: 'Blogs', href: routes.blogs },
    ],
    support: [
      { label: 'Help Center', href: routes.contact },
      { label: 'Documentation', href: routes.library },
      { label: 'FAQ', href: routes.contactFaq },
    ],
    strategic: [
      { label: 'Systemic Manpower Planning', href: routes.about },
      { label: 'Complexity Management', href: routes.about },
      { label: 'Adaptive Governance', href: routes.about },
      { label: 'Managerial Cybernetics (Advanced)', href: routes.about },
      { label: 'Institutional Resilience', href: routes.about },
    ],
    legal: [
      { label: 'Terms of Use', href: routes.contact },
      { label: 'Privacy Policy', href: routes.contact },
      { label: 'Cookie Policy', href: routes.contact },
    ],
  },
} as const

export const footerLinks = footerContent.links
