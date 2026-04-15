'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { SERVICES, TIME_SLOTS, type ReservationInsert } from '@/lib/types'
import { CheckCircle, Loader2, Calendar, Car, User, Clock } from 'lucide-react'

const STEPS = ['Contact', 'Vehicle', 'Schedule', 'Confirm']
const inputClass = 'w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20 transition-colors text-sm'
const labelClass = 'block text-gray-400 text-sm mb-1.5 font-medium'

export default function BookingForm() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', vehicle_make: '', vehicle_model: '', vehicle_year: '', service: '', preferred_date: '', preferred_time: '', notes: '' })
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm((p) => ({ ...p, [k]: e.target.value }))
  const canProceed = () => {
    if (step === 0) return form.name && form.email && form.phone
    if (step === 1) return form.vehicle_make && form.vehicle_model && form.vehicle_year
    if (step === 2) return form.service && form.preferred_date && form.preferred_time
    return true
  }
  const handleSubmit = async () => {
    setLoading(true); setError('')
    try {
      const payload: ReservationInsert = form
      const { error: err } = await supabase.from('reservations').insert([payload])
      if (err) throw err
      setSubmitted(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }
  if (submitted) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-green-500" /></div>
      <h2 className="text-3xl font-black text-white mb-3">You're Booked!</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8">We received your reservation. We'll call or email within 24 hours to confirm.</p>
      <button onClick={() => { setSubmitted(false); setStep(0); setForm({ name: '', email: '', phone: '', vehicle_make: '', vehicle_model: '', vehicle_year: '', service: '', preferred_date: '', preferred_time: '', notes: '' }) }} className="text-red-400 hover:text-red-300 text-sm border border-red-600/30 px-6 py-3 rounded-lg transition-colors">Book Another</button>
    </motion.div>
  )
  return (
    <div>
      <div className="flex items-center justify-between mb-10 relative">
        <div className="absolute top-4 left-0 right-0 h-px bg-white/5 z-0" />
        <div className="absolute top-4 left-0 h-px bg-gradient-to-r from-red-600 to-orange-500 z-0 transition-all duration-500" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-col items-center gap-2 z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${i < step ? 'bg-red-600 border-red-600 text-white' : i === step ? 'bg-red-600/20 border-red-600 text-red-400' : 'bg-[#111] border-white/10 text-gray-600'}`}>{i < step ? '✓' : i + 1}</div>
            <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-white' : 'text-gray-600'}`}>{s}</span>
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
          {step === 0 && <div className="space-y-4"><div className="flex items-center gap-2 mb-6"><User className="w-5 h-5 text-red-500" /><h3 className="text-white font-bold text-lg">Your Contact Info</h3></div><div><label className={labelClass}>Full Name *</label><input className={inputClass} placeholder="John Smith" value={form.name} onChange={set('name')} /></div><div><label className={labelClass}>Email *</label><input className={inputClass} type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} /></div><div><label className={labelClass}>Phone Number *</label><input className={inputClass} type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={set('phone')} /></div></div>}
          {step === 1 && <div className="space-y-4"><div className="flex items-center gap-2 mb-6"><Car className="w-5 h-5 text-red-500" /><h3 className="text-white font-bold text-lg">Your Vehicle</h3></div><div><label className={labelClass}>Make *</label><input className={inputClass} placeholder="e.g. Toyota" value={form.vehicle_make} onChange={set('vehicle_make')} /></div><div><label className={labelClass}>Model *</label><input className={inputClass} placeholder="e.g. Camry" value={form.vehicle_model} onChange={set('vehicle_model')} /></div><div><label className={labelClass}>Year *</label><input className={inputClass} placeholder="e.g. 2020" value={form.vehicle_year} onChange={set('vehicle_year')} maxLength={4} /></div></div>}
          {step === 2 && <div className="space-y-4"><div className="flex items-center gap-2 mb-6"><Clock className="w-5 h-5 text-red-500" /><h3 className="text-white font-bold text-lg">Pick a Service & Time</h3></div><div><label className={labelClass}>Service *</label><select className={inputClass} value={form.service} onChange={set('service')}><option value="">Select a service...</option>{SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}</select></div><div><label className={labelClass}>Preferred Date *</label><input className={inputClass} type="date" value={form.preferred_date} onChange={set('preferred_date')} min={new Date().toISOString().split('T')[0]} /></div><div><label className={labelClass}>Preferred Time *</label><select className={inputClass} value={form.preferred_time} onChange={set('preferred_time')}><option value="">Select a time...</option>{TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}</select></div><div><label className={labelClass}>Notes (optional)</label><textarea className={`${inputClass} resize-none`} rows={3} placeholder="Describe the damage or any special requests..." value={form.notes} onChange={set('notes')} /></div></div>}
          {step === 3 && <div><div className="flex items-center gap-2 mb-6"><Calendar className="w-5 h-5 text-red-500" /><h3 className="text-white font-bold text-lg">Confirm Your Booking</h3></div><div className="bg-[#111] border border-white/5 rounded-xl p-5 space-y-3 mb-6">{[['Name',form.name],['Email',form.email],['Phone',form.phone],['Vehicle',`${form.vehicle_year} ${form.vehicle_make} ${form.vehicle_model}`],['Service',form.service],['Date',form.preferred_date],['Time',form.preferred_time],...(form.notes?[['Notes',form.notes]]:[])].map(([label,value])=><div key={label} className="flex justify-between gap-4 text-sm"><span className="text-gray-500">{label}</span><span className="text-white text-right">{value}</span></div>)}</div>{error&&<p className="text-red-400 text-sm mb-4 bg-red-600/10 border border-red-600/20 rounded-lg px-4 py-3">{error}</p>}</div>}
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
        <button onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="text-gray-500 hover:text-white text-sm disabled:opacity-0 transition-colors px-4 py-2">← Back</button>
        {step < 3 ? (
          <button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()} className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold px-8 py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity">Continue →</button>
        ) : (
          <button onClick={handleSubmit} disabled={loading} className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold px-8 py-3 rounded-lg disabled:opacity-70 hover:opacity-90 transition-opacity flex items-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}{loading ? 'Submitting...' : 'Confirm Booking'}
          </button>
        )}
      </div>
    </div>
  )
}
