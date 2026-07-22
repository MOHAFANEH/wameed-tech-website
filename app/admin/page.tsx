import { redirect } from 'next/navigation'

// Middleware already redirects unauthenticated requests to /admin/login
// before this page is ever reached, so reaching here always means an
// authenticated session — just forward to the dashboard.
export default function AdminRoot() {
  redirect('/admin/dashboard')
}
