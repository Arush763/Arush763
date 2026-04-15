'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import type { Reservation } from '@/lib/types'
import { RefreshCw, Calendar, Car, User, Phone, Clock, ChevronDown, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react'

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  confirmed: { label: 'Confirmed', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  completed: { label: 'Completed', color: 'text-green-400 bg-green-400/10 border-green-400/20' },
  cancelled: { label: 'Cancelled', color: 'text-red-400 bg-red-400/10 border-red-400/20' },
}

type Status = keyof typeof STATUS_CONFIG

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.color}`}>
      {status === 'pending' && <AlertCircle className="w-3 h-3" />}
      {status === 'confirmed' && <Clock className="w-3 h-3" />}
      {status === 'completed' && <CheckCircle className="w-3 h-3" />}
      {status === 'cancelled' && <XCircle className="w-3 h-3" />}
      {cfg.label}
    </span>
  )
}

function ReservationRow({ res, onStatusChange }: { res: Reservation; onStatusChange: (id: string, s: Status) => void }) {
  const [open, setOpen] = useState(false)
  const [updating, setUpdating] = useState(false)

  const update = async (status: Status) => {
    setUpdating(true)
    await supabase.from('reservations').update({ status }).eq('id', res.id)
    onStatusChange(res.id, status)
    setUpdating(false)
    setOpen(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111] border border-white/5 rounded-xl overflow-hidden"
    >
      <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <User className="w-4 h-4 text-red-500" />
            <span className="text-white font-semibold text-sm">{res.name}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Phone className="w-3 h-3" />
            {res.phone}
          </div>
          <p className="text-gray-600 text-xs mt-0.5">{res.email}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Car className="w-4 h-4 text-red-500" />
            <span className="text-white text-sm">{res.vehicle_year} {res.vehicle_make} {res.vehicle_model}</span>
          </div>
          <p className="text-gray-500 text-xs">{res.service}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-red-500" />
            <span className="text-white text-sm">{res.preferred_date}</span>
          </div>
          <p className="text-gray-500 text-xs">{res.preferred_time}</p>
        </div>

        <div className="flex flex-col gap-2">
          <StatusBadge status={res.status} />
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              disabled={updating}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              {updating ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
              Change status <ChevronDown className="w-3 h-3" />
            </button>
            {open && (
              <div className="absolute top-6 left-0 bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden z-20 w-36">
                {(Object.keys(STATUS_CONFIG) as Status[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => update(s)}
                    className="w-full text-left px-3 py-2 text-xs text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    {STATUS_CONFIG[s].label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {res.notes && (
        <div className="px-5 pb-4 border-t border-white/5 pt-3">
          <p className="text-gray-600 text-xs">
            <span className="text-gray-500 font-medium">Notes: </span>{res.notes}
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default function ReservationsTable() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Status | 'all'>('all')

  const fetchReservations = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false })
    setReservations(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchReservations() }, [fetchReservations])

  const handleStatusChange = (id: string, status: Status) => {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  const filtered = filter === 'all' ? reservations : reservations.filter((r) => r.status === filter)

  const counts = {
    all: reservations.length,
    pending: reservations.filter((r) => r.status === 'pending').length,
    confirmed: reservations.filter((r) => r.status === 'confirmed').length,
    completed: reservations.filter((r) => r.status === 'completed').length,
    cancelled: reservations.filter((r) => r.status === 'cancelled').length,
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {([['all', 'Total'], ...Object.entries(STATUS_CONFIG).map(([k, v]) => [k, v.label])] as [string, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key as Status | 'all')}
            className={`bg-[#111] border rounded-xl p-4 text-center transition-all ${
              filter === key ? 'border-red-600/40 bg-red-600/5' : 'border-white/5 hover:border-white/10'
            }`}
          >
            <div className={`text-2xl font-black ${filter === key ? 'text-red-400' : 'text-white'}`}>
              {counts[key as keyof typeof counts]}
            </div>
            <div className="text-gray-500 text-xs mt-1">{label}</div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold">
          {filter === 'all' ? 'All Reservations' : `${STATUS_CONFIG[filter as Status].label} Reservations`}
          <span className="text-gray-600 font-normal text-sm ml-2">({filtered.length})</span>
        </h2>
        <button
          onClick={fetchReservations}
          className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin mx-auto mb-3" />
          <p className="text-gray-600 text-sm">Loading reservations...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          No {filter !== 'all' ? filter : ''} reservations found.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((res) => (
            <ReservationRow key={res.id} res={res} onStatusChange={handleStatusChange} />
          ))}
        </div>
      )}
    </div>
  )
}
