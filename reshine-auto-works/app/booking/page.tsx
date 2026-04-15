export const dynamic = 'force-dynamic'

import BookingForm from '@/components/booking/BookingForm'
import { Car, Shield, Clock } from 'lucide-react'

export const metadata = {
  title: 'Book a Reservation – Reshine Auto Works',
  description: 'Schedule your autobody repair appointment online. Fast, easy, no phone call required.',
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-24">
      {/* Background radial */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(192,57,43,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-red-500 text-sm font-semibold tracking-widest uppercase">Online Booking</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
            Reserve Your <span className="text-gradient">Appointment</span>
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Fill out the form below. We'll confirm within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#0e0e0e] border border-white/5 rounded-2xl p-6 sm:p-8">
              <BookingForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-[#0e0e0e] border border-white/5 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">Why Book Online?</h3>
              <ul className="space-y-3">
                {[
                  { icon: Clock, text: 'Takes under 2 minutes' },
                  { icon: Shield, text: 'No obligation estimate' },
                  { icon: Car, text: 'Any service, any vehicle' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.text} className="flex items-center gap-3 text-gray-400 text-sm">
                      <Icon className="w-4 h-4 text-red-500 shrink-0" />
                      {item.text}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-900/20 to-orange-900/10 border border-red-600/20 rounded-xl p-6">
              <h3 className="text-white font-bold mb-2">Hours of Operation</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li className="flex justify-between"><span>Mon – Fri</span><span>8:00 AM – 6:00 PM</span></li>
                <li className="flex justify-between"><span>Saturday</span><span>9:00 AM – 4:00 PM</span></li>
                <li className="flex justify-between text-gray-600"><span>Sunday</span><span>Closed</span></li>
              </ul>
            </div>

            <div className="bg-[#0e0e0e] border border-white/5 rounded-xl p-6">
              <h3 className="text-white font-bold mb-2">Prefer to call?</h3>
              <a href="tel:+15555555555" className="text-red-400 hover:text-red-300 text-xl font-bold transition-colors">
                (555) 555-5555
              </a>
              <p className="text-gray-600 text-xs mt-1">We'll answer every call.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
