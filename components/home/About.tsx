'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle, Award, ThumbsUp, Zap } from 'lucide-react'

const perks = [
  { icon: CheckCircle, text: 'Free estimates on all jobs' },
  { icon: Award, text: 'Lifetime warranty on paint work' },
  { icon: ThumbsUp, text: 'Insurance claims handled for you' },
  { icon: Zap, text: 'Fast turnaround, no shortcuts' },
]

function Gear({ size = 100, className = '' }: { size?: number; className?: string }) {
  const teeth = 12
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={`animate-spin-slow ${className}`} fill="none">
      <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="4" />
      {Array.from({ length: teeth }).map((_, i) => {
        const angle = (i * 360) / teeth
        const rad = (angle * Math.PI) / 180
        const x1 = 50 + 30 * Math.cos(rad)
        const y1 = 50 + 30 * Math.sin(rad)
        const x2 = 50 + 42 * Math.cos(rad)
        const y2 = 50 + 42 * Math.sin(rad)
        return (
          <rect key={i} x={x2 - 5} y={y2 - 3} width={10} height={6} rx={1.5} fill="currentColor"
            transform={`rotate(${angle}, ${x2}, ${y2})`} />
        )
      })}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180
        return (
          <line key={i}
            x1={50 + 20 * Math.cos(angle)} y1={50 + 20 * Math.sin(angle)}
            x2={50 + 30 * Math.cos(angle)} y2={50 + 30 * Math.sin(angle)}
            stroke="currentColor" strokeWidth="4" />
        )
      })}
    </svg>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(192,57,43,0.07)_0%,transparent_60%)]" />

      <div className="absolute -right-10 top-10 text-red-600/5">
        <Gear size={300} />
      </div>
      <div className="absolute -left-20 bottom-0 text-red-600/5">
        <Gear size={200} className="[animation-direction:reverse]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="text-red-500 text-sm font-semibold tracking-widest uppercase">About Us</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-6">
              Why <span className="text-gradient">Reshine?</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              For over 14 years, Reshine Auto Works has been the go-to shop for honest, high-quality
              autobody repair. We treat every car like it’s our own — no cutting corners, no hidden fees,
              just exceptional craftsmanship.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Our certified technicians use the latest equipment and premium materials to restore your
              vehicle to — or beyond — its original condition. We believe in transparency at every step.
            </p>
            <ul className="space-y-3">
              {perks.map((perk) => {
                const Icon = perk.icon
                return (
                  <motion.li key={perk.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: perks.indexOf(perk) * 0.1 + 0.3 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <Icon className="w-5 h-5 text-red-500 shrink-0" />
                    {perk.text}
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="bg-[#111] border border-white/5 rounded-2xl p-8 relative overflow-hidden animate-pulse-glow">
              <div className="flex items-center justify-center py-8">
                <div className="relative">
                  <svg width="200" height="200" viewBox="0 0 200 200" className="animate-spin-slow" fill="none">
                    <circle cx="100" cy="100" r="90" stroke="rgba(192,57,43,0.3)" strokeWidth="3" strokeDasharray="8 6" />
                    <circle cx="100" cy="100" r="70" stroke="rgba(192,57,43,0.2)" strokeWidth="2" />
                    <circle cx="100" cy="100" r="30" stroke="rgba(192,57,43,0.5)" strokeWidth="4" />
                    <circle cx="100" cy="100" r="12" fill="rgba(192,57,43,0.8)" />
                    {[0, 60, 120, 180, 240, 300].map((deg) => {
                      const rad = (deg * Math.PI) / 180
                      return (
                        <line key={deg}
                          x1={100 + 30 * Math.cos(rad)} y1={100 + 30 * Math.sin(rad)}
                          x2={100 + 70 * Math.cos(rad)} y2={100 + 70 * Math.sin(rad)}
                          stroke="rgba(192,57,43,0.6)" strokeWidth="6" strokeLinecap="round" />
                      )
                    })}
                    {Array.from({ length: 24 }).map((_, i) => {
                      const angle = (i * 15 * Math.PI) / 180
                      return (
                        <rect key={i}
                          x={100 + 82 * Math.cos(angle) - 3}
                          y={100 + 82 * Math.sin(angle) - 6}
                          width={6} height={12} rx={2}
                          fill="rgba(150,150,150,0.15)"
                          transform={`rotate(${i * 15}, ${100 + 82 * Math.cos(angle)}, ${100 + 82 * Math.sin(angle)})`} />
                      )
                    })}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-gradient">14</span>
                    <span className="text-gray-500 text-xs mt-1">YEARS</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                {[{ n: '2K+', l: 'Cars Fixed' }, { n: '100%', l: 'Satisfaction' }, { n: '#1', l: 'Rated Local' }].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="text-xl font-black text-gradient">{s.n}</div>
                    <div className="text-gray-600 text-xs mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl px-4 py-2 shadow-lg shadow-red-900/40"
            >
              <span className="text-white text-sm font-bold">Free Estimates</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
