'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const TABS = [
  { href: '/admin/dashboard/edit-text', label: 'Edit Text' },
  { href: '/admin/dashboard/blog', label: 'Blog Posts' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="gradient-brand text-white px-4 md:px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-lg">Wameed Tech Admin</span>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition disabled:opacity-50"
        >
          {loggingOut ? 'Signing out...' : 'Logout'}
        </button>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <nav className="md:w-56 shrink-0 bg-white border-b md:border-b-0 md:border-r border-gray-200 px-4 md:px-3 py-3 md:py-6 flex md:flex-col gap-2">
          {TABS.map((tab) => {
            const active = pathname?.startsWith(tab.href)
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  active
                    ? 'bg-brand-teal text-brand-deep'
                    : 'text-brand-deep hover:bg-brand-bg'
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>

        <main className="flex-1 bg-brand-bg p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
