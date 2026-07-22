'use client'

import { useState } from 'react'
import Reveal from './Reveal'

interface CTAProps {
  lang: string
}

const CTA = ({ lang }: CTAProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const content = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get in Touch',
      description: 'Have a project in mind? Let\'s talk about how we can help your business grow.',
      form: {
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully! We\'ll get back to you soon.',
        error: 'Failed to send message. Please try again.',
      },
    },
    ar: {
      title: 'تواصل معنا',
      subtitle: 'هل لديك مشروع؟',
      description: 'هل لديك مشروع في الذهن؟ دعنا نتحدث عن كيفية مساعدة عملك على النمو.',
      form: {
        name: 'اسمك',
        email: 'بريدك الإلكتروني',
        message: 'رسالتك',
        submit: 'إرسال الرسالة',
        sending: 'جاري الإرسال...',
        success: 'تم إرسال الرسالة بنجاح! سنرد عليك قريباً.',
        error: 'فشل الإرسال. يرجى المحاولة مرة أخرى.',
      },
    },
  }

  const c = content[lang as keyof typeof content]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    try {
      // Call AWS Lambda function (we'll set this up later)
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(''), 5000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-brand-bg">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-deep mb-2">{c.title}</h2>
            <p className="text-2xl text-brand-indigo mb-4">{c.subtitle}</p>
            <p className="text-lg text-gray-600">{c.description}</p>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={150}>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-brand-deep mb-2">
                {c.form.name}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                placeholder={c.form.name}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-brand-deep mb-2">
                {c.form.email}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                placeholder={c.form.email}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-brand-deep mb-2">
                {c.form.message}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal resize-none"
                placeholder={c.form.message}
              />
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="p-4 bg-green-100 text-green-700 rounded-lg font-semibold">
                {c.form.success}
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg font-semibold">
                {c.form.error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 gradient-brand text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? c.form.sending : c.form.submit}
            </button>
          </form>
        </div>
        </Reveal>

        {/* Contact Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-2">📧</div>
            <p className="text-gray-600">
              <a href="mailto:info@wameedtech.com" className="font-semibold text-brand-indigo hover:text-brand-deep hover:underline">
                Info@wameedtech.com
              </a>
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">📱</div>
            <p className="text-gray-600 font-semibold" dir="ltr">+962 78 627 7768</p>
          </div>
          <div>
            <div className="text-3xl mb-2">📍</div>
            <p className="text-gray-600 font-semibold">
              {lang === 'en' ? 'Amman, Jordan' : 'عمّان، الأردن'}
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-10">
          <a
            href="https://www.facebook.com/wameedtech"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-11 h-11 bg-brand-deep bg-opacity-10 text-brand-deep rounded-full flex items-center justify-center hover:bg-brand-teal hover:text-white transition"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"/>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/wameedtech"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 bg-brand-deep bg-opacity-10 text-brand-deep rounded-full flex items-center justify-center hover:bg-brand-teal hover:text-white transition"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.5.5.87 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.76c-.5.5-1.1.87-1.76 1.15-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.76-1.15 4.9 4.9 0 01-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76.5-.5 1.1-.87 1.76-1.15.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.31-.42.16-.71.36-1.02.67-.31.31-.5.6-.67 1.02-.13.31-.27.78-.31 1.65-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.87.18 1.34.31 1.65.16.42.36.71.67 1.02.31.31.6.5 1.02.67.31.13.78.27 1.65.31 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.65-.31.42-.16.71-.36 1.02-.67.31-.31.5-.6.67-1.02.13-.31.27-.78.31-1.65.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.87-.18-1.34-.31-1.65a2.7 2.7 0 00-.67-1.02 2.7 2.7 0 00-1.02-.67c-.31-.13-.78-.27-1.65-.31-1.05-.05-1.37-.06-4.04-.06zm0 4.7a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 1.8a3.7 3.7 0 100 7.4 3.7 3.7 0 000-7.4zm5.72-1.98a1.29 1.29 0 11-2.58 0 1.29 1.29 0 012.58 0z"/>
            </svg>
          </a>
          <a
            href="https://wa.me/962786277768"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-11 h-11 bg-brand-deep bg-opacity-10 text-brand-deep rounded-full flex items-center justify-center hover:bg-brand-teal hover:text-white transition"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0012.04 2zm0 1.8a8.1 8.1 0 015.75 13.83 8.07 8.07 0 01-5.75 2.38 8.1 8.1 0 01-4.12-1.12l-.3-.17-3.12.82.83-3.04-.19-.31a8.1 8.1 0 01-1.24-4.3c0-4.47 3.64-8.1 8.14-8.1zm-4.42 4.6c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.13.16 1.74 2.77 4.28 3.78 2.11.84 2.54.67 3 .63.46-.04 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.16-.48-.29-.25-.13-1.48-.73-1.7-.81-.23-.08-.4-.13-.56.13-.17.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.56-1.36-.78-1.85-.2-.48-.4-.42-.56-.42h-.4z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTA
