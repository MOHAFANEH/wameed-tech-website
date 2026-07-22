import { useTranslations } from 'next-intl'

const WHATSAPP_NUMBER = '962786277768'

const WhatsAppButton = () => {
  const t = useTranslations('whatsapp')
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('prefill_message'))}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('aria_label')}
      className="fixed bottom-6 end-6 z-40 w-14 h-14 bg-brand-teal rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
    >
      <svg viewBox="0 0 24 24" fill="white" width="28" height="28" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0012.04 2zm0 1.8a8.1 8.1 0 015.75 13.83 8.07 8.07 0 01-5.75 2.38 8.1 8.1 0 01-4.12-1.12l-.3-.17-3.12.82.83-3.04-.19-.31a8.1 8.1 0 01-1.24-4.3c0-4.47 3.64-8.1 8.14-8.1zm-4.42 4.6c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.13.16 1.74 2.77 4.28 3.78 2.11.84 2.54.67 3 .63.46-.04 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.16-.48-.29-.25-.13-1.48-.73-1.7-.81-.23-.08-.4-.13-.56.13-.17.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.56-1.36-.78-1.85-.2-.48-.4-.42-.56-.42h-.4z" />
      </svg>
    </a>
  )
}

export default WhatsAppButton
