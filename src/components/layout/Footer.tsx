import { Button } from '../ui/Button'
import { footerContent, footerLinks } from '../../data/footerContent'

const socialIcons = [
  { label: 'Facebook', path: 'M14 8h2V6h-2v2zm0 4h2v-6h-2v6zM8 8h2V6H8v2zm0 4h2v-6H8v6z' },
  { label: 'Twitter', path: 'M4 6l6 6-6 6' },
  { label: 'LinkedIn', path: 'M6 10v8M10 10v8M6 6h.01M14 10v8M10 6a4 4 0 014 4v4' },
  { label: 'Instagram', path: 'M7 7h10v10H7z M12 15a3 3 0 100-6 3 3 0 000 6z' },
]

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: readonly string[]
}) {
  return (
    <div>
      <h3 className="mb-4 text-base font-bold tracking-wide text-navy">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm text-navy/80 transition-colors hover:text-accent">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer id="contact" className="border-t border-navy/10 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold tracking-wide text-navy">
              {footerContent.brand}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-navy/80">
              {footerContent.contactLines[0]}
              <br />
              {footerContent.contactLines[1]}
            </p>
            <div className="mt-4 space-y-2 text-sm text-navy/80">
              <p>{footerContent.phone}</p>
              <p>{footerContent.email}</p>
            </div>
            <div className="mt-6 flex gap-4">
              {socialIcons.map((icon) => (
                <a
                  key={icon.label}
                  href="#"
                  aria-label={icon.label}
                  className="flex size-5 items-center justify-center text-navy transition-colors hover:text-accent"
                >
                  <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path
                      d={icon.path}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Support" links={footerLinks.support} />
          <FooterColumn title="Strategic Systems" links={footerLinks.strategic} />

          <div>
            <h3 className="mb-4 text-base font-bold tracking-wide text-navy">
              {footerContent.newsletterHeading}
            </h3>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={footerContent.newsletterPlaceholder}
                className="w-full rounded-[10px] border border-navy/20 px-4 py-2.5 text-sm text-navy outline-none focus:border-accent"
              />
              <Button className="w-full rounded-[10px] bg-peach py-2.5 hover:bg-peach/90">
                {footerContent.newsletterSubmitLabel}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-navy/20 pt-8 text-xs text-navy/70 md:flex-row md:items-center md:justify-between">
          <p>{footerContent.copyright}</p>
          <div className="flex flex-wrap gap-6">
            {footerLinks.legal.map((link) => (
              <a key={link} href="#" className="transition-colors hover:text-navy">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
