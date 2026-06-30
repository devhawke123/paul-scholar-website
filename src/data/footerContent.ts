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
    company: ['About', 'Contact', 'Career'],
    support: ['Help Center', 'Documentation', 'FAQ'],
    strategic: [
      'Systemic Manpower Planning',
      'Complexity Management',
      'Adaptive Governance',
      'Managerial Cybernetics (Advanced)',
      'Institutional Resilience',
    ],
    legal: ['Terms of Use', 'Privacy Policy', 'Cookie Policy'],
  },
} as const

export const footerLinks = footerContent.links
