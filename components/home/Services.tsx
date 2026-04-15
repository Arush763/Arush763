'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Car, Paintbrush2, Dumbbell, Shield, Sparkles, Wrench, Eye, ClipboardCheck } from 'lucide-react'

const services = [
  { icon: Car, title: 'Collision Repair', desc: 'Full-service collision repair, frame straightening, and structural restoration back to factory spec.' },
  { icon: Paintbrush2, title: 'Paint & Refinishing', desc: 'Color-matched paint jobs with premium materials. Flawless finishes every time.' },
  { icon: Dumbbell, title: 'Dent Removal', desc: "Paintless dent repair and traditional bodywork to eliminate dings, dents, and creases." },
  { icon: Shield, title: 'Frame Straightening', desc: "State-of-the-art frame straightening equipment restores your vehicle's structural integrity." },
  { icon: Sparkles, title: 'Detailing & Polish', desc: 'Full interior and exterior detailing. We make your car look showroom fresh.' },
  { icon: Wrench, title: 'Bumper Repair', desc: 'Cracked or damaged bumpers repaired or replaced with precision and care.' },
  { icon: Eye, title: 'Glass Replacement', desc: 'Windshield and window replacement with OEM-quality glass and proper sealing.' },
  { icon: ClipboardCheck, title: 'Insurance Estimates', desc: 'Free, accurate estimates. We work directly with all major insurance providers.' },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = service.icon
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: (index % 4) * 0.1 }} className="card-hover group bg-[#111] border border-white/5 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      <div className="w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center mb-4 group-hover:bg-red-600/20 transition-colors"><Icon className="w-6 h-6 text-red-500" /></div>
      <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
      <div className="absolute -bottom-8 -right-8 w-24 h-24 opacity-[0.04] animate-spin-slow">
        <svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="48" stroke="white" strokeWidth="4" /><circle cx="50" cy="50" r="20" stroke="white" strokeWidth="4" />{[0,60,120,180,240,300].map((deg) => <line key={deg} x1="50" y1="50" x2={50+48*Math.cos((deg*Math.PI)/180)} y2={50+48*Math.sin((deg*Math.PI)/180)} stroke="white" strokeWidth="4" />)}</svg>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  return (
    <section id="services" className="py-24 bg-[#0d0d0d] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(192,57,43,0.05)_0%,transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div ref={headerRef} initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <span className="text-red-500 text-sm font-semibold tracking-widest uppercase">What We Do</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">Our <span className="text-gradient">Services</span></h2>
          <p className="text-gray-500 max-w-xl mx-auto">From minor dents to major collisions — we handle it all with the highest quality materials and craftsmanship.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => <ServiceCard key={service.title} service={service} index={i} />)}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <a href="/booking" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm border border-white/10 hover:border-red-500/40 px-6 py-3 rounded-lg transition-all duration-300">Get a Free Estimate →</a>
        </motion.div>
      </div>
    </section>
  )
}
