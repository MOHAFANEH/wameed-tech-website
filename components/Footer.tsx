interface FooterProps {
  lang: string
}

const Footer = ({ lang }: FooterProps) => {
  const content = {
    en: {
      copyright: '© 2026 Wameed Tech. All rights reserved.',
      tagline: 'Building digital solutions for businesses that dream big.',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Projects', href: '#clients' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    ar: {
      copyright: '© 2026 وميض تك. جميع الحقوق محفوظة.',
      tagline: 'نبني حلولاً رقمية للشركات التي تحلم بالكبر.',
      links: [
        { label: 'عننا', href: '#about' },
        { label: 'مشاريعنا', href: '#clients' },
        { label: 'تواصل', href: '#contact' },
      ],
    },
  }

  const c = content[lang as keyof typeof content]

  return (
    <footer className="gradient-brand text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <img src="/images/logo-mark.svg" alt="" className="w-7 h-auto" />
              </div>
              <span className="text-2xl font-bold">
                {lang === 'ar' ? 'وميض تك' : 'Wameed Tech'}
              </span>
            </div>
            <p className="opacity-80">{c.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">
              {lang === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h4>
            <div className="space-y-2">
              {c.links.map((link, i) => (
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
            <h4 className="text-lg font-bold mb-4">
              {lang === 'en' ? 'Contact' : 'تواصل'}
            </h4>
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
              <p>Amman, Jordan</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white border-opacity-20 py-8">
          <div className="text-center opacity-80">
            <p>{c.copyright}</p>
            <p className="text-sm mt-2">
              {lang === 'en'
                ? 'Crafted with ❤️ by Wameed Tech'
                : 'صُنعت بـ ❤️ من قبل وميض تك'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
