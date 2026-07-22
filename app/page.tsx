'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Clients from '@/components/Clients'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  const [lang, setLang] = useState('en')

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang} className="min-h-screen">
      <Navigation lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Services lang={lang} />
      <Clients lang={lang} />
      <CTA lang={lang} />
      <Footer lang={lang} />
    </div>
  )
}
