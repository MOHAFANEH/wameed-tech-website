import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AutoAccept: Driver Assistant — Terms of Use',
  description: 'Terms of Use for AutoAccept: Driver Assistant.',
}

export default function TermsPage() {
  return (
    <article className="leading-relaxed">
      <h1 className="text-3xl md:text-4xl font-bold text-brand-deep">
        Terms of Use — AutoAccept: Driver Assistant
      </h1>
      <p className="mt-2 text-sm italic text-brand-ink/60">
        Last updated: 27 September 2026
      </p>

      <p className="mt-8">
        By using AutoAccept: Driver Assistant (&ldquo;the app&rdquo;) you agree to these terms.
      </p>

      <h2 className="mt-10 border-t border-brand-lilac/30 pt-6 text-xl font-bold text-brand-deep">
        1. Independent tool
      </h2>
      <p className="mt-2">
        The app is an independent productivity tool. It is not affiliated with, endorsed by, or an
        official product of any ride-hailing or delivery company. All third-party names remain the
        property of their owners.
      </p>

      <h2 className="mt-10 border-t border-brand-lilac/30 pt-6 text-xl font-bold text-brand-deep">
        2. Your responsibility
      </h2>
      <p className="mt-2">
        You are responsible for complying with all applicable laws and with the terms of service of
        any driver platform you use. Use the app only where permitted. You decide the rules and when
        to enable or disable the service.
      </p>

      <h2 className="mt-10 border-t border-brand-lilac/30 pt-6 text-xl font-bold text-brand-deep">
        3. Subscription and activation
      </h2>
      <p className="mt-2">
        Access is enabled by an activation code obtained from our support. Codes are
        non-transferable. Subscription periods are stated at the time of activation.
      </p>

      <h2 className="mt-10 border-t border-brand-lilac/30 pt-6 text-xl font-bold text-brand-deep">
        4. No warranty
      </h2>
      <p className="mt-2">
        The app is provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee
        that it will accept any particular offer or operate without interruption on every device.
      </p>

      <h2 className="mt-10 border-t border-brand-lilac/30 pt-6 text-xl font-bold text-brand-deep">
        5. Limitation of liability
      </h2>
      <p className="mt-2">
        To the maximum extent permitted by law, we are not liable for any indirect or consequential
        damages arising from use of the app.
      </p>

      <h2 className="mt-10 border-t border-brand-lilac/30 pt-6 text-xl font-bold text-brand-deep">
        6. Contact
      </h2>
      <p className="mt-2">
        WhatsApp:{' '}
        <a className="text-brand-indigo hover:text-brand-teal" href="https://wa.me/962799593766">
          +962 79 959 3766
        </a>{' '}
        &nbsp;|&nbsp; Email:{' '}
        <a
          className="text-brand-indigo hover:text-brand-teal"
          href="mailto:mohammadafaneh@flashwash.co"
        >
          mohammadafaneh@flashwash.co
        </a>
      </p>

      <footer className="mt-14 border-t border-brand-lilac/30 pt-6 text-sm text-brand-ink/60">
        <Link className="text-brand-indigo hover:text-brand-teal" href="/autoclikerksa/privacy">
          Privacy Policy
        </Link>
      </footer>
    </article>
  )
}
