'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface PostRow {
  id: number
  slug: string
  locale: 'en' | 'ar'
  title: string
  category: string
  date: string
  status: 'draft' | 'published'
  author: string
}

function getCsrfToken(): string {
  const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

export default function BlogListPage() {
  const [posts, setPosts] = useState<PostRow[] | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const load = () => {
    fetch('/api/admin/blog')
      .then((res) => res.json())
      .then((json) => setPosts(json.posts))
  }

  useEffect(load, [])

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
        headers: { 'x-csrf-token': getCsrfToken() },
      })
      if (res.ok) {
        setPosts((prev) => (prev ? prev.filter((p) => p.id !== id) : prev))
      }
    } finally {
      setDeletingId(null)
    }
  }

  if (!posts) return <p className="text-brand-ink">Loading...</p>

  // Group by slug so bilingual pairs of the same conceptual post show
  // together, per spec ("show both; otherwise show which locale has it").
  const bySlug = new Map<string, PostRow[]>()
  for (const post of posts) {
    const group = bySlug.get(post.slug) || []
    group.push(post)
    bySlug.set(post.slug, group)
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-deep">Blog Posts</h1>
        <Link
          href="/admin/dashboard/blog/new"
          className="px-5 py-2 gradient-brand text-white font-bold rounded-lg hover:opacity-90 transition text-sm"
        >
          Create New Post
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-start">
              <th className="px-4 py-3 text-start font-semibold text-brand-deep">Title</th>
              <th className="px-4 py-3 text-start font-semibold text-brand-deep">Author</th>
              <th className="px-4 py-3 text-start font-semibold text-brand-deep">Category</th>
              <th className="px-4 py-3 text-start font-semibold text-brand-deep">Date</th>
              <th className="px-4 py-3 text-start font-semibold text-brand-deep">Language</th>
              <th className="px-4 py-3 text-start font-semibold text-brand-deep">Status</th>
              <th className="px-4 py-3 text-start font-semibold text-brand-deep">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(bySlug.entries()).map(([slug, group]) => (
              <tr key={slug} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 text-brand-ink">
                  {group.map((p) => p.title).join(' / ')}
                </td>
                <td className="px-4 py-3 text-gray-500">{group[0].author}</td>
                <td className="px-4 py-3 text-gray-500">{group[0].category}</td>
                <td className="px-4 py-3 text-gray-500">{group[0].date}</td>
                <td className="px-4 py-3">
                  {group.map((p) => (
                    <span
                      key={p.id}
                      className="inline-block px-2 py-0.5 me-1 text-xs font-semibold rounded bg-brand-teal/20 text-brand-deep"
                    >
                      {p.locale.toUpperCase()}
                    </span>
                  ))}
                </td>
                <td className="px-4 py-3">
                  {group.map((p) => (
                    <span
                      key={p.id}
                      className={`inline-block px-2 py-0.5 me-1 text-xs font-semibold rounded ${
                        p.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {p.status}
                    </span>
                  ))}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    {group.map((p) => (
                      <div key={p.id} className="flex gap-2 items-center">
                        <span className="text-xs text-gray-400 w-8">{p.locale}:</span>
                        <Link
                          href={`/admin/dashboard/blog/${p.id}`}
                          className="text-brand-indigo hover:text-brand-deep text-xs font-semibold"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          disabled={deletingId === p.id}
                          className="text-red-600 hover:text-red-800 text-xs font-semibold disabled:opacity-50"
                        >
                          {deletingId === p.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bySlug.size === 0 && (
          <p className="text-center text-gray-400 py-12">No blog posts yet.</p>
        )}
      </div>
    </div>
  )
}
