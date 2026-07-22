'use client'

import { useEffect, useState } from 'react'

interface ServiceItem {
  icon: string
  title: string
  description: string
}

interface Sections {
  hero: {
    title: string
    subtitle: string
    tagline: string
    description: string
    cta_primary: string
    cta_secondary: string
  }
  services: {
    section_title: string
    section_subtitle: string
    description: string
    items: ServiceItem[]
    // Preserved but not edited in this form:
    values_title?: unknown
    values?: unknown
  }
  cta: {
    section_title: string
    section_subtitle: string
    description: string
    location: string
    form: {
      name_label: string
      email_label: string
      message_label: string
      submit: string
      success: string
      error: string
      // Preserved but not edited in this form:
      phone_label?: unknown
      project_type_label?: unknown
      project_type_options?: unknown
      budget_label?: unknown
      budget_options?: unknown
      sending?: unknown
    }
  }
  footer: {
    copyright: string
    tagline: string
    quick_links_title: string
    contact_title: string
    location: string
    crafted_by: string
    // Preserved but not edited in this form:
    brand?: unknown
    links?: unknown
  }
}

type LocaleData = Record<'en' | 'ar', Sections>

function getCsrfToken(): string {
  const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

export default function EditTextPage() {
  const [data, setData] = useState<LocaleData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/admin/text-sections')
      .then((res) => res.json())
      .then((json) => {
        setData(json)
        setLoading(false)
      })
  }, [])

  const update = <L extends 'en' | 'ar', S extends keyof Sections>(
    locale: L,
    section: S,
    updater: (current: Sections[S]) => Sections[S]
  ) => {
    setData((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        [locale]: {
          ...prev[locale],
          [section]: updater(prev[locale][section]),
        },
      }
    })
  }

  const handleSave = async () => {
    if (!data) return
    setSaving(true)
    setToast(null)
    try {
      const res = await fetch('/api/admin/text-sections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': getCsrfToken(),
        },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setToast({ type: 'success', text: 'Text updated successfully' })
      } else {
        const body = await res.json()
        setToast({ type: 'error', text: body.error || 'Failed to save' })
      }
    } catch {
      setToast({ type: 'error', text: 'Failed to save' })
    } finally {
      setSaving(false)
      setTimeout(() => setToast(null), 4000)
    }
  }

  if (loading || !data) {
    return <p className="text-brand-ink">Loading...</p>
  }

  const columnHeader = (label: string) => (
    <div className="grid grid-cols-2 gap-4 mb-2">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-indigo">{label} — English</p>
      <p className="text-xs font-bold uppercase tracking-wide text-brand-indigo">{label} — Arabic</p>
    </div>
  )

  const textField = (
    labelText: string,
    valueEn: string,
    valueAr: string,
    onChangeEn: (v: string) => void,
    onChangeAr: (v: string) => void,
    multiline = false
  ) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-brand-deep mb-1">{labelText}</label>
      <div className="grid grid-cols-2 gap-4">
        {multiline ? (
          <textarea
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
        ) : (
          <input
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
        )}
        {multiline ? (
          <textarea
            dir="rtl"
            value={valueAr}
            onChange={(e) => onChangeAr(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
        ) : (
          <input
            dir="rtl"
            value={valueAr}
            onChange={(e) => onChangeAr(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
        )}
      </div>
    </div>
  )

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold text-brand-deep mb-6">Edit Text</h1>

      {/* Hero */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-bold text-brand-deep mb-4">Hero Section</h2>
        {columnHeader('Headline')}
        {textField(
          'Headline (tagline)',
          data.en.hero.tagline,
          data.ar.hero.tagline,
          (v) => update('en', 'hero', (h) => ({ ...h, tagline: v })),
          (v) => update('ar', 'hero', (h) => ({ ...h, tagline: v }))
        )}
        {textField(
          'Subheading (description)',
          data.en.hero.description,
          data.ar.hero.description,
          (v) => update('en', 'hero', (h) => ({ ...h, description: v })),
          (v) => update('ar', 'hero', (h) => ({ ...h, description: v })),
          true
        )}
        {textField(
          'Primary CTA (WhatsApp button)',
          data.en.hero.cta_primary,
          data.ar.hero.cta_primary,
          (v) => update('en', 'hero', (h) => ({ ...h, cta_primary: v })),
          (v) => update('ar', 'hero', (h) => ({ ...h, cta_primary: v }))
        )}
        {textField(
          'Secondary CTA',
          data.en.hero.cta_secondary,
          data.ar.hero.cta_secondary,
          (v) => update('en', 'hero', (h) => ({ ...h, cta_secondary: v })),
          (v) => update('ar', 'hero', (h) => ({ ...h, cta_secondary: v }))
        )}
      </section>

      {/* Services */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-bold text-brand-deep mb-4">Services Section</h2>
        {columnHeader('Section Title')}
        {textField(
          'Section title',
          data.en.services.section_title,
          data.ar.services.section_title,
          (v) => update('en', 'services', (s) => ({ ...s, section_title: v })),
          (v) => update('ar', 'services', (s) => ({ ...s, section_title: v }))
        )}
        {textField(
          'Section subtitle',
          data.en.services.section_subtitle,
          data.ar.services.section_subtitle,
          (v) => update('en', 'services', (s) => ({ ...s, section_subtitle: v })),
          (v) => update('ar', 'services', (s) => ({ ...s, section_subtitle: v }))
        )}

        {data.en.services.items.map((_, i) => (
          <div key={i} className="border-t border-gray-100 pt-4 mt-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">
              Service {i + 1}
            </p>
            {textField(
              'Title',
              data.en.services.items[i].title,
              data.ar.services.items[i].title,
              (v) =>
                update('en', 'services', (s) => ({
                  ...s,
                  items: s.items.map((it, idx) => (idx === i ? { ...it, title: v } : it)),
                })),
              (v) =>
                update('ar', 'services', (s) => ({
                  ...s,
                  items: s.items.map((it, idx) => (idx === i ? { ...it, title: v } : it)),
                }))
            )}
            {textField(
              'Description',
              data.en.services.items[i].description,
              data.ar.services.items[i].description,
              (v) =>
                update('en', 'services', (s) => ({
                  ...s,
                  items: s.items.map((it, idx) => (idx === i ? { ...it, description: v } : it)),
                })),
              (v) =>
                update('ar', 'services', (s) => ({
                  ...s,
                  items: s.items.map((it, idx) => (idx === i ? { ...it, description: v } : it)),
                })),
              true
            )}
          </div>
        ))}
      </section>

      {/* Contact Form */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-bold text-brand-deep mb-4">Contact Form</h2>
        {columnHeader('Labels')}
        {textField(
          'Name field label',
          data.en.cta.form.name_label,
          data.ar.cta.form.name_label,
          (v) => update('en', 'cta', (c) => ({ ...c, form: { ...c.form, name_label: v } })),
          (v) => update('ar', 'cta', (c) => ({ ...c, form: { ...c.form, name_label: v } }))
        )}
        {textField(
          'Email field label',
          data.en.cta.form.email_label,
          data.ar.cta.form.email_label,
          (v) => update('en', 'cta', (c) => ({ ...c, form: { ...c.form, email_label: v } })),
          (v) => update('ar', 'cta', (c) => ({ ...c, form: { ...c.form, email_label: v } }))
        )}
        {textField(
          'Message field label',
          data.en.cta.form.message_label,
          data.ar.cta.form.message_label,
          (v) => update('en', 'cta', (c) => ({ ...c, form: { ...c.form, message_label: v } })),
          (v) => update('ar', 'cta', (c) => ({ ...c, form: { ...c.form, message_label: v } }))
        )}
        {textField(
          'Submit button text',
          data.en.cta.form.submit,
          data.ar.cta.form.submit,
          (v) => update('en', 'cta', (c) => ({ ...c, form: { ...c.form, submit: v } })),
          (v) => update('ar', 'cta', (c) => ({ ...c, form: { ...c.form, submit: v } }))
        )}
        {textField(
          'Success message',
          data.en.cta.form.success,
          data.ar.cta.form.success,
          (v) => update('en', 'cta', (c) => ({ ...c, form: { ...c.form, success: v } })),
          (v) => update('ar', 'cta', (c) => ({ ...c, form: { ...c.form, success: v } }))
        )}
        {textField(
          'Error message',
          data.en.cta.form.error,
          data.ar.cta.form.error,
          (v) => update('en', 'cta', (c) => ({ ...c, form: { ...c.form, error: v } })),
          (v) => update('ar', 'cta', (c) => ({ ...c, form: { ...c.form, error: v } }))
        )}
        <p className="text-xs text-gray-400 mt-2">
          Phone/project-type/budget field options aren&apos;t editable here yet — preserved as-is.
        </p>
      </section>

      {/* Footer */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-bold text-brand-deep mb-4">Footer</h2>
        {columnHeader('Copyright')}
        {textField(
          'Copyright text',
          data.en.footer.copyright,
          data.ar.footer.copyright,
          (v) => update('en', 'footer', (f) => ({ ...f, copyright: v })),
          (v) => update('ar', 'footer', (f) => ({ ...f, copyright: v }))
        )}
        {textField(
          'Tagline',
          data.en.footer.tagline,
          data.ar.footer.tagline,
          (v) => update('en', 'footer', (f) => ({ ...f, tagline: v })),
          (v) => update('ar', 'footer', (f) => ({ ...f, tagline: v }))
        )}
        {textField(
          'Quick links title',
          data.en.footer.quick_links_title,
          data.ar.footer.quick_links_title,
          (v) => update('en', 'footer', (f) => ({ ...f, quick_links_title: v })),
          (v) => update('ar', 'footer', (f) => ({ ...f, quick_links_title: v }))
        )}
        <p className="text-xs text-gray-400 mt-2">
          Note: the contact email shown in the footer is hardcoded in
          Footer.tsx, not stored as editable text — not editable here.
        </p>
      </section>

      <div className="sticky bottom-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 gradient-brand text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50 shadow-lg"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {toast && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg font-medium text-sm z-50 ${
            toast.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {toast.text}
        </div>
      )}
    </div>
  )
}
