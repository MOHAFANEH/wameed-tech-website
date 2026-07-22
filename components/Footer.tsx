import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface FooterLink {
  label: string
  href: string
}

const Footer = () => {
  const t = useTranslations('footer')
  const links = t.raw('links') as FooterLink[]

  return (
    <footer className="gradient-brand text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Image src="/images/logo-mark.svg" alt="Wameed Tech" width={28} height={21} className="w-7 h-auto" />
              </div>
              <span className="text-2xl font-bold">
                {t('brand')}
              </span>
            </div>
            <p className="opacity-80">{t('tagline')}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              {t('quick_links_title')}
            </h3>
            <div className="space-y-2">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="block opacity-80 hover:opacity-100 transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              {t('contact_title')}
            </h3>
            <div className="space-y-2 opacity-80">
              <p>
                <a href="mailto:info@wameedtech.com" className="hover:opacity-100 transition">
                  Info@wameedtech.com
                </a>
              </p>
              <p>
                <a href="tel:+962786277768" className="hover:opacity-100 transition">
                  <span dir="ltr">+962 78 627 7768</span>
                </a>
              </p>
              <p>{t('location')}</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.facebook.com/wameedtech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-brand-teal hover:text-brand-deep transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5" width="18" height="18">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/wameedtech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-brand-teal hover:text-brand-deep transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5" width="18" height="18">
                  <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.5.5.87 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.76c-.5.5-1.1.87-1.76 1.15-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.76-1.15 4.9 4.9 0 01-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76.5-.5 1.1-.87 1.76-1.15.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.31-.42.16-.71.36-1.02.67-.31.31-.5.6-.67 1.02-.13.31-.27.78-.31 1.65-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.87.18 1.34.31 1.65.16.42.36.71.67 1.02.31.31.6.5 1.02.67.31.13.78.27 1.65.31 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.65-.31.42-.16.71-.36 1.02-.67.31-.31.5-.6.67-1.02.13-.31.27-.78.31-1.65.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.87-.18-1.34-.31-1.65a2.7 2.7 0 00-.67-1.02 2.7 2.7 0 00-1.02-.67c-.31-.13-.78-.27-1.65-.31-1.05-.05-1.37-.06-4.04-.06zm0 4.7a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 1.8a3.7 3.7 0 100 7.4 3.7 3.7 0 000-7.4zm5.72-1.98a1.29 1.29 0 11-2.58 0 1.29 1.29 0 012.58 0z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/962786277768"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-brand-teal hover:text-brand-deep transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5" width="18" height="18">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0012.04 2zm0 1.8a8.1 8.1 0 015.75 13.83 8.07 8.07 0 01-5.75 2.38 8.1 8.1 0 01-4.12-1.12l-.3-.17-3.12.82.83-3.04-.19-.31a8.1 8.1 0 01-1.24-4.3c0-4.47 3.64-8.1 8.14-8.1zm-4.42 4.6c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.13.16 1.74 2.77 4.28 3.78 2.11.84 2.54.67 3 .63.46-.04 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.16-.48-.29-.25-.13-1.48-.73-1.7-.81-.23-.08-.4-.13-.56.13-.17.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.56-1.36-.78-1.85-.2-.48-.4-.42-.56-.42h-.4z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white border-opacity-20 py-8">
          <div className="text-center opacity-80">
            <p>{t('copyright')}</p>
            <p className="text-sm mt-2">
              {t('crafted_by')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
