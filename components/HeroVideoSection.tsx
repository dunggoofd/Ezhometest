'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

export default function HeroVideoSection() {
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setIsMobile(window.innerWidth < 768)
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {isClient && (
          <ReactPlayer
            url={isMobile ? '/videos/hero-mobile.mp4' : '/videos/hero-desktop.mp4'}
            playing
            loop
            muted
            width="100%"
            height="100%"
            playsinline
            config={{
              file: {
                attributes: {
                  style: { objectFit: 'cover' }
                }
              }
            }}
          />
        )}
        {/* Fallback Image for SEO/No-JS */}
        <picture className="absolute inset-0">
          <source 
            media="(max-width: 640px)" 
            srcSet="/images/hero-mobile.webp" 
            type="image/webp"
          />
          <source 
            media="(max-width: 640px)" 
            srcSet="/images/hero-mobile.jpg" 
            type="image/jpeg"
          />
          <source 
            media="(min-width: 641px)" 
            srcSet="/images/hero-desktop.webp" 
            type="image/webp"
          />
          <img 
            src="/images/hero-desktop.jpg"
            alt="Premium compression sofa in modern living room"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Luxury That Arrives
            <span className="block text-premium-gold mt-2">Compact</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200 animate-slide-up max-w-2xl mx-auto">
            Premium compression sofas that ship in a compact box and assemble in just 10 minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <a 
              href="#configurator"
              className="bg-premium-gold text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105"
            >
              Design Your Sofa
            </a>
            <a 
              href="#showroom"
              className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all"
            >
              Virtual Showroom
            </a>
          </div>

          {/* Key Features */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm sm:text-base">
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">📦</div>
              <div className="font-semibold">Ships Compact</div>
              <div className="text-gray-300">70% smaller packaging</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-semibold">10-Min Assembly</div>
              <div className="text-gray-300">No tools required</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">✨</div>
              <div className="font-semibold">Premium Quality</div>
              <div className="text-gray-300">5-year warranty</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg 
          className="w-6 h-6 text-white"
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}
