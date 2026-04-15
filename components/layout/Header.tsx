'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Wrench } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#about', label: 'About' },
  { href: '/booking', label: 'Book Now' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-red-600/20 group-hover:bg-red-600/30 transition-colors" />
              <Wrench className="w-5 h-5 text-red-500 group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div>
              <span className="text-white font-bold text-lg leading-none block">RESHINE</span>
              <span className="text-red-500 text-xs font-semibold tracking-widest">AUTO WORKS</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  link.label === 'Book Now'
                    ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white px-5 py-2.5 rounded-md hover:opacity-90 shadow-lg shadow-red-900/30'
                    : 'text-gray-300 hover:text-white'
                }`}>{link.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="tel:+15555555555" className="hidden sm:flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-red-500" />(555) 555-5555
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-300 hover:text-white p-2">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-t border-white/10">
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="text-gray-200 hover:text-white text-lg font-medium">{link.label}</Link>
              ))}
              <a href="tel:+15555555555" className="text-gray-400 text-sm mt-2">(555) 555-5555</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
