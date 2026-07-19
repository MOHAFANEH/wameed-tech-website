'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const slides = [
  '/images/slide-1.jpg',
  '/images/slide-2.jpg',
  '/images/slide-3.jpg',
  '/images/slide-4.jpg',
]

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      {/* Brand color overlay so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/90 via-brand-indigo/85 to-brand-deep/90" />

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? 'bg-brand-teal w-6' : 'bg-white/50'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlideshow
