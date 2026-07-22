import { setRequestLocale } from 'next-intl/server'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Clients from '@/components/Clients'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <Clients />
      <CTA />
      <Footer />
    </div>
  )
}
