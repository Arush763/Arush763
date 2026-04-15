import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Wrench } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="w-6 h-6 text-red-500" />
              <div>
                <span className="text-white font-bold text-lg block leading-none">RESHINE</span>
                <span className="text-red-500 text-xs font-semibold tracking-widest">AUTO WORKS</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">Honest, quality autobody repair done right. Serving our community with pride since 2010.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home','Services','Gallery','About','Book Now','Admin'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Book Now' ? '/booking' : item === 'Admin' ? '/admin' : `/#${item.toLowerCase()}`}
                    className="text-gray-500 hover:text-red-400 text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-500"><MapPin className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />123 Auto Lane, Your City, ST 00000</li>
              <li className="flex items-center gap-3 text-sm text-gray-500"><Phone className="w-4 h-4 text-red-500 shrink-0" /><a href="tel:+15555555555" className="hover:text-white transition-colors">(555) 555-5555</a></li>
              <li className="flex items-center gap-3 text-sm text-gray-500"><Mail className="w-4 h-4 text-red-500 shrink-0" /><a href="mailto:info@reshineauto.com" className="hover:text-white transition-colors">info@reshineauto.com</a></li>
              <li className="flex items-start gap-3 text-sm text-gray-500"><Clock className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /><div><p>Mon–Fri: 8am – 6pm</p><p>Sat: 9am – 4pm</p><p>Sun: Closed</p></div></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Reshine Auto Works. All rights reserved.</p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        </div>
      </div>
    </footer>
  )
}
