'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Calendar, Phone } from 'lucide-react'

export default function BookingCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 bg-[#0d0d0d] relative overflow-hidden">
      {/* Animated background lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent w-full"
            style={{ top: `${20 + i * 15}%` }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              repeat: Infinity,
              duration: 8 + i * 2,
              delay: i * 1.5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#1a0a0a] via-[#110808] to-[#1a0505] border border-red-900/20 rounded-2xl p-12 relative overflow-hidden animate-pulse-glow"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

          <span className="text-red-500 text-sm font-semibold tracking-widest uppercase">Ready to Restore?</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-4 mb-4">
            Book Your Appointment <span className="text-gradient">Today</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-10">
            Reservations are quick and easy. Choose your service, pick a time, and we'll take it from there.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold px-8 py-4 rounded-lg text-lg shadow-xl shadow-red-900/40 hover:scale-105 hover:shadow-red-900/60 transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              Book a Reservation
            </Link>
            <a
              href="tel:+15555555555"
              className="inline-flex items-center gap-3 text-gray-300 hover:text-white border border-white/10 hover:border-white/30 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:bg-white/5"
            >
              <Phone className="w-5 h-5 text-red-500" />
              Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
