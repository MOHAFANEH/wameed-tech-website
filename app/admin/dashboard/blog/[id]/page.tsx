'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'

const CATEGORIES = ['Web Development', 'E-Commerce', 'Mobile Apps', 'Business', 'Other']

interface FormValues {
  title: string
  description: string
  content: string
  category: string
  date: string
  author: string
  status: 'draft' | 'published'
}

interface PostData extends FormValues {
  id: number
  slug: string
  locale: 'en' | 'ar'
}

function getCsrfToken(): string {
  const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

export default function EditBlogPostPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [post, setPost] = useState<PostData | null>(null)
  const [serverError, setServerError] = useState('')
  const [notFound, setNotFound] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  useEffect(() => {
    fetch(`/api/admin/blog/${params.id}`)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true)
          return null
        }
        return res.json()
      })
      .then((data: PostData | null) => {
        if (!data) return
        setPost(data)
        reset({
          title: data.title,
          description: data.description,
          content: data.content,
          category: data.category,
          date: data.date,
          author: data.author,
          status: data.status,
        })
      })
  }, [params.id, reset])

  const onSubmit = async (values: FormValues) => {
    setServerError('')
    try {
      const res = await fetch(`/api/admin/blog/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-csrf-token': getCsrfToken() },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (!res.ok) {
        setServerError(data.error || 'Failed to save changes')
        return
      }
      router.push('/admin/dashboard/blog')
    } catch {
      setServerError('Something went wrong. Please try again.')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this post? This cannot be undone.')) return
    await fetch(`/api/admin/blog/${params.id}`, {
      method: 'DELETE',
      headers: { 'x-csrf-token': getCsrfToken() },
    })
    router.push('/admin/dashboard/blog')
  }

  if (notFound) return <p className="text-brand-ink">Post not found.</p>
  if (!post) return <p className="text-brand-ink">Loading...</p>

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-brand-deep mb-1">Edit Post</h1>
      <p className="text-sm text-gray-500 mb-6">
        {post.slug} — <span className="uppercase font-semibold">{post.locale}</span>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-brand-deep mb-1">Title</label>
          <input
            dir={post.locale === 'ar' ? 'rtl' : 'ltr'}
            {...register('title', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
          {errors.title && <p className="text-red-600 text-xs mt-1">Required</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-brand-deep mb-1">Description</label>
          <textarea
            dir={post.locale === 'ar' ? 'rtl' : 'ltr'}
            {...register('description', { required: true })}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
          {errors.description && <p className="text-red-600 text-xs mt-1">Required</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-brand-deep mb-1">
            Content (Markdown)
          </label>
          <textarea
            dir={post.locale === 'ar' ? 'rtl' : 'ltr'}
            {...register('content', { required: true })}
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
          {errors.content && <p className="text-red-600 text-xs mt-1">Required</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <div>
            <label className="block text-sm font-semibold text-brand-deep mb-1">Status</label>
            <select
              {...register('status', { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {serverError && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
            {serverError}
          </div>
        )}

        <div className="flex gap-3 justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-3 border-2 border-red-300 text-red-600 font-bold rounded-lg hover:bg-red-50 transition"
          >
            Delete Post
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 gradient-brand text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
