'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ZoomIn } from 'lucide-react'

const photos = [
  { id: 1, label: 'Red Sedan – Full Repaint', bg: 'from-red-900 to-red-600', size: 'large' },
  { id: 2, label: 'Black SUV – Dent Removal', bg: 'from-gray-800 to-gray-600', size: 'small' },
  { id: 3, label: 'Silver Coupe – Collision Repair', bg: 'from-zinc-700 to-zinc-500', size: 'small' },
  { id: 4, label: 'Blue Truck – Frame Straighten', bg: 'from-blue-900 to-blue-600', size: 'medium' },
  { id: 5, label: 'White Sports Car – Polish', bg: 'from-slate-600 to-slate-400', size: 'medium' },
  { id: 6, label: 'Orange Muscle Car – Restore', bg: 'from-orange-800 to-orange-500', size: 'large' },
]

function GalleryCard({ photo, index }: { photo: typeof photos[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.94 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: index * 0.08 }}
      className="gallery-item rounded-xl cursor-pointer relative group" style={{ gridRow: photo.size === 'large' ? 'span 2' : 'span 1' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className={`w-full h-full min-h-[200px] bg-gradient-to-br ${photo.bg} relative overflow-hidden rounded-xl`}>
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 200" fill="none" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="200" cy="120" rx="140" ry="30" fill="white" />
          <path d="M80 120 L100 80 L180 65 L220 65 L300 80 L320 120 Z" fill="white" />
          <circle cx="130" cy="130" r="22" fill="white" opacity="0.8" />
          <circle cx="270" cy="130" r="22" fill="white" opacity="0.8" />
          <circle cx="130" cy="130" r="12" fill="black" opacity="0.5" />
          <circle cx="270" cy="130" r="12" fill="black" opacity="0.5" />
        </svg>
        <div className="gallery-overlay rounded-xl" />
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }} transition={{ duration: 0.2 }} className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <p className="text-white font-semibold text-sm">{photo.label}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }} transition={{ duration: 0.2 }} className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-2">
          <ZoomIn className="w-4 h-4 text-white" />
        </motion.div>
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" animate={{ rotate: hovered ? 360 : 0 }} transition={{ duration: 1, ease: 'linear' }}>
          <svg width="60" height="60" viewBox="0 0 60 60" className="opacity-5">
            <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="3" fill="none" />
            <circle cx="30" cy="30" r="10" stroke="white" strokeWidth="3" fill="none" />
            {[0,60,120,180,240,300].map((deg) => <line key={deg} x1="30" y1="30" x2={30+28*Math.cos((deg*Math.PI)/180)} y2={30+28*Math.sin((deg*Math.PI)/180)} stroke="white" strokeWidth="2.5" />)}
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })
  return (
    <section id="gallery" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={headerRef} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <span className="text-red-500 text-sm font-semibold tracking-widest uppercase">Our Work</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">The <span className="text-gradient">Gallery</span></h2>
          <p className="text-gray-500 max-w-xl mx-auto">Every car we touch is a testament to our craft. See the transformations for yourself.</p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4" style={{ gridAutoRows: '200px' }}>
          {photos.map((photo, i) => <GalleryCard key={photo.id} photo={photo} index={i} />)}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <p className="text-gray-500 text-sm">Want to see your car here?{' '}<a href="/booking" className="text-red-400 hover:text-red-300 font-medium">Book a service →</a></p>
        </motion.div>
      </div>
    </section>
  )
}
