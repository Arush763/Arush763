'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'

function Bubble({ delay, left, size }: { delay: number; left: number; size: number }) {
  return (
    <div className="absolute rounded-full pointer-events-none" style={{ left: `${left}%`, bottom: '-60px', width: size, height: size, background: `radial-gradient(circle at 30% 30%, rgba(192,57,43,0.4), rgba(230,126,34,0.15))`, animation: `float-bubble ${8 + delay}s ease-in ${delay}s infinite`, border: '1px solid rgba(192,57,43,0.2)' }} />
  )
}

function AnimatedCar() {
  return (
    <div className="absolute bottom-16 left-0 right-0 pointer-events-none overflow-hidden h-20">
      <div className="animate-drive inline-block">
        <svg viewBox="0 0 220 70" width="220" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="30" width="200" height="28" rx="6" fill="#c0392b" />
          <path d="M55 30 L75 8 L155 8 L175 30 Z" fill="#a93226" />
          <path d="M80 10 L90 28 L155 28 L165 10 Z" fill="#1a1a1a" opacity="0.8" />
          <line x1="120" y1="10" x2="120" y2="28" stroke="#333" strokeWidth="1.5" />
          <rect x="180" y="36" width="22" height="10" rx="2" fill="#ff6b35" opacity="0.9" />
          <rect x="190" y="34" width="8" height="5" rx="1" fill="#ff8c42" />
          <rect x="8" y="38" width="12" height="6" rx="2" fill="#e74c3c" opacity="0.7" />
          <circle cx="55" cy="58" r="11" fill="#1a1a1a" stroke="#555" strokeWidth="2" />
          <circle cx="55" cy="58" r="6" fill="#333" stroke="#888" strokeWidth="1" />
          <circle cx="55" cy="58" r="2" fill="#aaa" />
          <circle cx="165" cy="58" r="11" fill="#1a1a1a" stroke="#555" strokeWidth="2" />
          <circle cx="165" cy="58" r="6" fill="#333" stroke="#888" strokeWidth="1" />
          <circle cx="165" cy="58" r="2" fill="#aaa" />
          <line x1="0" y1="42" x2="-30" y2="42" stroke="rgba(192,57,43,0.5)" strokeWidth="2" />
          <line x1="0" y1="48" x2="-50" y2="48" stroke="rgba(192,57,43,0.3)" strokeWidth="1.5" />
          <line x1="0" y1="38" x2="-20" y2="38" stroke="rgba(192,57,43,0.4)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  )
}

export default function Hero() {
  const [bubbles] = useState(() => Array.from({ length: 12 }, (_, i) => ({ id: i, delay: Math.random() * 6, left: Math.random() * 100, size: 20 + Math.random() * 50 })))
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(192,57,43,0.12)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(230,126,34,0.06)_0%,transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      {bubbles.map((b) => <Bubble key={b.id} delay={b.delay} left={b.left} size={b.size} />)}
      <div className="absolute bottom-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-800/30 to-transparent" />
      <AnimatedCar />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 rounded-full px-4 py-1.5 mb-8">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 text-sm font-medium">Honest Autobody Repair</span>
          <div className="flex gap-0.5 ml-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-orange-400 text-orange-400" />)}</div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }} className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6">
          <span className="text-white">WE </span><span className="text-gradient">RESTORE</span><br /><span className="text-white">YOUR RIDE</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Reshine Auto Works delivers expert collision repair, flawless paint jobs, and honest service. Your car deserves the best — and so do you.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/booking" className="relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold px-8 py-4 rounded-lg text-lg shadow-lg shadow-red-900/40 hover:shadow-red-900/60 hover:scale-105 transition-all duration-300 group">
            <span>Book a Reservation</span><span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link href="/#gallery" className="inline-flex items-center gap-2 text-gray-300 hover:text-white border border-white/10 hover:border-white/30 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:bg-white/5">View Our Work</Link>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-white/5">
          {[{ num: '2,000+', label: 'Cars Restored' },{ num: '14', label: 'Years Experience' },{ num: '100%', label: 'Satisfaction Rate' },{ num: '5★', label: 'Average Rating' }].map((stat) => (
            <div key={stat.label} className="text-center"><div className="text-2xl font-black text-gradient">{stat.num}</div><div className="text-gray-500 text-sm mt-1">{stat.label}</div></div>
          ))}
        </motion.div>
      </div>
      <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <ChevronDown className="w-6 h-6 text-gray-600" />
      </motion.div>
    </section>
  )
}
