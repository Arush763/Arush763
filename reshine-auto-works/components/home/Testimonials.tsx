'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Marcus T.',
    vehicle: '2019 BMW M3',
    stars: 5,
    text: 'These guys completely restored my car after a rear-end collision. The paint match was perfect — I couldn\'t even tell it happened. Fast, honest, and professional.',
  },
  {
    name: 'Sarah L.',
    vehicle: '2021 Honda CR-V',
    stars: 5,
    text: 'Brought my SUV in with major door damage. They handled everything with insurance and had it back to me in 4 days looking brand new. Highly recommend!',
  },
  {
    name: 'DeShawn R.',
    vehicle: '1969 Chevelle SS',
    stars: 5,
    text: 'They restored my classic Chevelle. Took their time, sourced original-quality materials, and the result was beyond what I imagined. Real craftsmen.',
  },
  {
    name: 'Jenny K.',
    vehicle: '2022 Toyota Camry',
    stars: 5,
    text: 'Scratches and a bumper crack from a parking lot. Fixed same day, and they detailed the whole car. Amazing value, amazing people.',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(192,57,43,0.06)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-red-500 text-sm font-semibold tracking-widest uppercase">Reviews</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
            What Customers <span className="text-gradient">Say</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-hover bg-[#111] border border-white/5 rounded-xl p-6 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-red-600/20" />
              <div className="flex gap-1 mb-3">
                {[...Array(r.stars)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">"{r.text}"</p>
              <div>
                <p className="text-white font-semibold text-sm">{r.name}</p>
                <p className="text-gray-600 text-xs">{r.vehicle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
