import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AutoAccept: Driver Assistant — Privacy Policy',
  description: 'Privacy Policy for AutoAccept: Driver Assistant.',
}

export default function PrivacyPage() {
  return (
    <article className="leading-relaxed">
      <h1 className="text-3xl md:text-4xl font-bold text-brand-deep">
        Privacy Policy — AutoAccept: Driver Assistant
      </h1>
      <p className="mt-2 text-sm italic text-brand-ink/60">
        Last updated: 27 September 2026
      </p>

      <p className="mt-8">
        AutoAccept: Driver Assistant (&ldquo;the app&rdquo;, &ldquo;we&rdquo;) is an independent
        productivity tool for drivers. It is not affiliated with, endorsed by, or an official
        product of any ride-hailing or delivery company. This policy explains what data the app
        handles and why.
      </p>

      <h2 className="mt-10 border-t border-brand-lilac/30 pt-6 text-xl font-bold text-brand-deep">
        Data we collect
      </h2>
      <ul className="mt-3 list-disc space-y-2 ps-5">
        <li>
          <strong>Device identifier</strong> (Android ID): used to identify your device for
          subscription/activation.
        </li>
        <li>
          <strong>Name and phone number</strong>: collected once at sign-up to create and support
          your account.
        </li>
        <li>
          <strong>Subscription/activation records</strong>: your activation code, subscription
          status and expiry date.
        </li>
        <li>
          <strong>Accepted-offer summaries</strong> (amount, time, distance, count): recorded so you
          can see your own activity.
        </li>
      </ul>

      <h2 className="mt-10 border-t border-brand-lilac/30 pt-6 text-xl font-bold text-brand-deep">
        Accessibility service — what it reads
      </h2>
      <p className="mt-2">
        With your explicit, manually granted permission, the app uses Android&rsquo;s Accessibility
        service to read the ride-offer screen of your supported driver app and to tap Accept or
        Reject based on the rules you set (fare, pickup time, distance). The app{' '}
        <strong>does not</strong> read personal messages, passwords, or content in other apps.
        Screen content read from the offer is processed on your device to make the accept/reject
        decision; we do not transmit or store the raw screen content on our servers. You can turn
        the service off at any time.
      </p>

      <h2 className="mt-10 border-t border-brand-lilac/30 pt-6 text-xl font-bold text-brand-deep">
        How data is used
      </h2>
      <p className="mt-2">
        Data is used only to operate the app: to verify your subscription/activation, to provide
        support, and to show your own activity. We do <strong>not</strong> sell your data or share
        it with third parties for advertising.
      </p>

      <h2 className="mt-10 border-t border-brand-lilac/30 pt-6 text-xl font-bold text-brand-deep">
        Where data is stored
      </h2>
      <p className="mt-2">
        Account and subscription records are stored in our backend (Google Sheets via Google Apps
        Script). Data is sent over HTTPS (encrypted in transit).
      </p>

      <h2 className="mt-10 border-t border-brand-lilac/30 pt-6 text-xl font-bold text-brand-deep">
        Data retention and deletion
      </h2>
      <p className="mt-2">
        We keep account records while your account is active. You can request deletion of your data
        at any time by contacting us at the address below; we will remove your device record, name
        and phone number.
      </p>

      <h2 className="mt-10 border-t border-brand-lilac/30 pt-6 text-xl font-bold text-brand-deep">
        Children
      </h2>
      <p className="mt-2">
        The app is intended for professional drivers and is not directed to children under 13.
      </p>

      <h2 className="mt-10 border-t border-brand-lilac/30 pt-6 text-xl font-bold text-brand-deep">
        Contact
      </h2>
      <p className="mt-2">
        WhatsApp:{' '}
        <a className="text-brand-indigo hover:text-brand-teal" href="https://wa.me/962799593766">
          +962 79 959 3766
        </a>
        <br />
        Email:{' '}
        <a
          className="text-brand-indigo hover:text-brand-teal"
          href="mailto:mohammadafaneh@flashwash.co"
        >
          mohammadafaneh@flashwash.co
        </a>
      </p>

      <footer className="mt-14 border-t border-brand-lilac/30 pt-6 text-sm text-brand-ink/60">
        <Link className="text-brand-indigo hover:text-brand-teal" href="/autoclikerksa/term">
          Terms of Use
        </Link>
      </footer>
    </article>
  )
}
