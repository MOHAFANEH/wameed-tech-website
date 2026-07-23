'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSend = async () => {
    setStatus('sending')
    try {
      const res = await fetch('/api/admin/forgot-password', { method: 'POST' })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-brand-deep mb-1">Forgot Password</h1>
        <p className="text-gray-500 mb-6">
          A reset link will be sent to <span className="font-semibold">Info@wameedtech.com</span>.
        </p>

        {status === 'sent' ? (
          <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
            Reset link sent. Check the inbox at Info@wameedtech.com.
          </div>
        ) : (
          <>
            {status === 'error' && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium mb-4">
                Something went wrong. Please try again.
              </div>
            )}
            <button
              onClick={handleSend}
              disabled={status === 'sending'}
              className="w-full py-3 gradient-brand text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Reset Link'}
            </button>
          </>
        )}

        <Link
          href="/admin/login"
          className="block text-center text-sm text-brand-indigo hover:text-brand-deep mt-4"
        >
          Back to login
        </Link>
      </div>
    </div>
  )
}
