'use client'

import { useEffect, useRef } from 'react'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

const Reveal = ({ children, delay = 0, className = '' }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Progressive enhancement: content is already visible from render. Only
    // opt into the animation when the browser supports IntersectionObserver
    // and the user hasn't asked to reduce motion.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      return
    }

    // Fade/slide starting point (visible in the DOM, just offset visually).
    element.style.opacity = '0'
    element.style.transform = 'translateY(40px)'
    element.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.opacity = '1'
          element.style.transform = 'translateY(0)'
          observer.unobserve(element)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export default Reveal
