"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useTranslations, useLocale } from 'next-intl'
import { testimonials as testimonialsData } from '@/lib/data'

export function Testimonial() {
  const t = useTranslations()
  const locale = useLocale()
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Transform for parallax on the large number
  const numberX = useTransform(x, [-200, 200], [-20, 20])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonialsData.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)

  useEffect(() => {
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [])

  const current = testimonialsData[activeIndex]
  const quote = locale === 'en' ? current.contentEn : current.content
  const role = locale === 'en' ? current.roleEn : current.role

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm text-[var(--color-primary)] mb-4">
            {locale === 'en' ? 'What Our Patients Say' : 'Lo Que Dicen Nuestros Pacientes'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t('testimonials.title')}
          </h2>
        </div>

        <div ref={containerRef} className="relative w-full" onMouseMove={handleMouseMove}>
          {/* Oversized index number - positioned to bleed off left edge */}
          <motion.div
            className="absolute -left-8 top-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] font-bold text-gray-900/[0.03] select-none pointer-events-none leading-none tracking-tighter hidden md:block"
            style={{ x: numberX, y: numberY }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Main content - asymmetric layout */}
          <div className="relative flex flex-col md:flex-row">
            {/* Left column - vertical text */}
            <div className="hidden md:flex flex-col items-center justify-center pr-16 border-r border-gray-200">
              <motion.span
                className="text-xs text-gray-400 tracking-widest uppercase"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Testimonios
              </motion.span>

              {/* Vertical progress line */}
              <div className="relative h-32 w-px bg-gray-200 mt-8">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-[var(--color-primary)] origin-top"
                  animate={{
                    height: `${((activeIndex + 1) / testimonialsData.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* Center - main content */}
            <div className="flex-1 md:pl-16 py-12">
              {/* Rating badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="mb-8"
                >
                  <span className="inline-flex items-center gap-2 text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]" />
                    {current.rating} / 5 {locale === 'en' ? 'Rating' : 'Calificacion'}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Quote with character reveal */}
              <div className="relative mb-12 min-h-[140px]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={activeIndex}
                    className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-[1.2] tracking-tight"
                    style={{ fontFamily: 'var(--font-heading), system-ui, sans-serif' }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    &ldquo;{quote.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        className="inline-block mr-[0.3em]"
                        variants={{
                          hidden: { opacity: 0, y: 20, rotateX: 90 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            transition: {
                              duration: 0.5,
                              delay: i * 0.05,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                          exit: {
                            opacity: 0,
                            y: -10,
                            transition: { duration: 0.2, delay: i * 0.02 },
                          },
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Author row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex items-center gap-4"
                  >
                    {/* Animated line before name */}
                    <motion.div
                      className="w-8 h-px bg-[var(--color-primary)]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      style={{ originX: 0 }}
                    />
                    <div>
                      <p className="text-base font-medium text-gray-900">{current.name}</p>
                      <p className="text-sm text-gray-500">{role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 mr-2">
                    {activeIndex + 1} / {testimonialsData.length}
                  </span>
                  <motion.button
                    onClick={goPrev}
                    className="group relative w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden hover:border-[var(--color-primary)] transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="relative z-10 text-gray-600 group-hover:text-[var(--color-primary)] transition-colors"
                    >
                      <path
                        d="M10 12L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>

                  <motion.button
                    onClick={goNext}
                    className="group relative w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center overflow-hidden hover:bg-[var(--color-primary-dark)] transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="relative z-10"
                    >
                      <path
                        d="M6 4L10 8L6 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom ticker - subtle repeating brand name */}
          <div className="absolute -bottom-16 left-0 right-0 overflow-hidden opacity-[0.05] pointer-events-none">
            <motion.div
              className="flex whitespace-nowrap text-4xl md:text-6xl font-bold tracking-tight"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              {[...Array(10)].map((_, i) => (
                <span key={i} className="mx-8">
                  Clinica Alba • Clinica Alba • Clinica Alba •
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
