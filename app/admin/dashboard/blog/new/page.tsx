'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import ImageUploadField from '@/components/admin/ImageUploadField'

const CATEGORIES = ['Web Development', 'E-Commerce', 'Mobile Apps', 'Business', 'Other']

interface FormValues {
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  contentEn: string
  contentAr: string
  category: string
  date: string
  author: string
  language: 'en' | 'ar' | 'both'
}

function getCsrfToken(): string {
  const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

export default function NewBlogPostPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      author: 'Mohammad Afaneh',
      category: CATEGORIES[0],
      language: 'both',
      date: new Date().toISOString().slice(0, 10),
    },
  })

  const language = watch('language')
  const wantsEn = language === 'en' || language === 'both'
  const wantsAr = language === 'ar' || language === 'both'

  const submitWithStatus = (status: 'draft' | 'published') =>
    handleSubmit(async (values) => {
      setServerError('')
      try {
        const res = await fetch('/api/admin/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-csrf-token': getCsrfToken() },
          body: JSON.stringify({ ...values, status }),
        })
        const data = await res.json()
        if (!res.ok) {
          setServerError(data.error || 'Failed to create post')
          return
        }
        router.push('/admin/dashboard/blog')
      } catch {
        setServerError('Something went wrong. Please try again.')
      }
    })

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-brand-deep mb-6">Create New Post</h1>

      <form className="bg-white rounded-lg shadow-md p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-brand-deep mb-2">Language</label>
          <select
            {...register('language')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
          >
            <option value="both">Both (English + Arabic)</option>
            <option value="en">English only</option>
            <option value="ar">Arabic only</option>
          </select>
        </div>

        {wantsEn && (
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-bold uppercase tracking-wide text-brand-indigo mb-3">
              English
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-brand-deep mb-1">Title</label>
                <input
                  {...register('titleEn', { required: wantsEn })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
                {errors.titleEn && <p className="text-red-600 text-xs mt-1">Required</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-deep mb-1">
                  Description
                </label>
                <textarea
                  {...register('descriptionEn', { required: wantsEn })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
                {errors.descriptionEn && <p className="text-red-600 text-xs mt-1">Required</p>}
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-semibold text-brand-deep">
                    Content (Markdown)
                  </label>
                  <ImageUploadField
                    onInsert={(md) => setValue('contentEn', getValues('contentEn') + md)}
                  />
                </div>
                <textarea
                  {...register('contentEn', { required: wantsEn })}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
                {errors.contentEn && <p className="text-red-600 text-xs mt-1">Required</p>}
              </div>
            </div>
          </div>
        )}

        {wantsAr && (
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-bold uppercase tracking-wide text-brand-indigo mb-3">
              Arabic
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-brand-deep mb-1">Title</label>
                <input
                  dir="rtl"
                  {...register('titleAr', { required: wantsAr })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
                {errors.titleAr && <p className="text-red-600 text-xs mt-1">Required</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-deep mb-1">
                  Description
                </label>
                <textarea
                  dir="rtl"
                  {...register('descriptionAr', { required: wantsAr })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
                {errors.descriptionAr && <p className="text-red-600 text-xs mt-1">Required</p>}
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-semibold text-brand-deep">
                    Content (Markdown)
                  </label>
                  <ImageUploadField
                    onInsert={(md) => setValue('contentAr', getValues('contentAr') + md)}
                  />
                </div>
                <textarea
                  dir="rtl"
                  {...register('contentAr', { required: wantsAr })}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
                {errors.contentAr && <p className="text-red-600 text-xs mt-1">Required</p>}
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-gray-100 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-brand-deep mb-1">Category</label>
            <select
              {...register('category', { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-deep mb-1">Date</label>
            <input
              type="date"
              {...register('date', { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-deep mb-1">Author</label>
            <input
              {...register('author', { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>
        </div>

        {serverError && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
            {serverError}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={submitWithStatus('draft')}
            disabled={isSubmitting}
            className="px-6 py-3 border-2 border-brand-deep text-brand-deep font-bold rounded-lg hover:bg-brand-bg transition disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={submitWithStatus('published')}
            disabled={isSubmitting}
            className="px-6 py-3 gradient-brand text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  )
}
