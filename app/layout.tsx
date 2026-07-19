import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wameed Tech | وميض تك - Web & App Development Studio',
  description: 'Professional web and mobile app development studio in Amman, Jordan.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&family=Noto+Sans+Arabic:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-comfortaa bg-brand-bg text-brand-ink">
        {children}
      </body>
    </html>
  )
}
