'use client'

import Link from 'next/link'
import { useState } from 'react'

interface NavigationProps {
  lang: string
  setLang: (lang: string) => void
}

const Navigation = ({ lang, setLang }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = {
    en: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Clients', href: '#clients' },
      { label: 'Contact', href: '#contact' },
    ],
    ar: [
      { label: 'الرئيسية', href: '#home' },
      { label: 'عننا', href: '#about' },
      { label: 'عملاؤنا', href: '#clients' },
      { label: 'تواصل معنا', href: '#contact' },
    ],
  }

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <div className="w-10 h-10 gradient-brand rounded-full flex items-center justify-center">
            <img src="/images/logo-mark.svg" alt="Wameed Tech" className="w-7 h-auto" />
          </div>
          <span className="font-bold text-xl text-brand-deep">
            {lang === 'ar' ? 'وميض تك' : 'Wameed Tech'}
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {navLinks[lang as keyof typeof navLinks].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-brand-deep hover:text-brand-teal font-medium transition"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Language Toggle + Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="px-4 py-2 bg-brand-teal text-brand-deep rounded-lg font-medium hover:bg-brand-lilac transition"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-brand-deep"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
          <div className="flex flex-col gap-4">
            {navLinks[lang as keyof typeof navLinks].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-brand-deep hover:text-brand-teal font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
