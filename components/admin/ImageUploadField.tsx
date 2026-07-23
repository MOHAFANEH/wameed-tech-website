'use client'

import { useRef, useState } from 'react'

interface ImageUploadFieldProps {
  onInsert: (markdown: string) => void
}

function getCsrfToken(): string {
  const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

export default function ImageUploadField({ onInsert }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        headers: { 'x-csrf-token': getCsrfToken() },
        body: formData,
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Upload failed')
        return
      }

      // Appended to the end of the content field, not inserted at cursor —
      // simpler and more reliable than juggling a ref alongside React Hook
      // Form's own ref on the same textarea.
      onInsert(`\n\n![](${data.url})\n`)
    } catch {
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="flex items-center gap-3">
      <label className="inline-block px-3 py-1.5 border border-brand-indigo text-brand-indigo text-xs font-semibold rounded-lg cursor-pointer hover:bg-brand-bg transition">
        {uploading ? 'Uploading...' : '+ Insert Image'}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>
      {error && <span className="text-red-600 text-xs">{error}</span>}
    </div>
  )
}
