'use client'

import { useState } from 'react'

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
    } catch (error) {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-brand-bg">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-deep mb-2">{c.title}</h2>
          <p className="text-2xl text-brand-teal mb-4">{c.subtitle}</p>
          <p className="text-lg text-gray-600">{c.description}</p>
        </div>

        {/* Form */}
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
              className="w-full py-3 bg-gradient-brand text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? c.form.sending : c.form.submit}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-2">📧</div>
            <p className="text-gray-600">
              <a href="mailto:info@wameedtech.com" className="font-semibold hover:text-brand-teal">
                Info@wameedtech.com
              </a>
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">📱</div>
            <p className="text-gray-600 font-semibold">+962 78 627 7768</p>
          </div>
          <div>
            <div className="text-3xl mb-2">📍</div>
            <p className="text-gray-600 font-semibold">Amman, Jordan</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
