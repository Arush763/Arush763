export const dynamic = 'force-dynamic'

import AdminGate from '@/components/admin/AdminGate'
import ReservationsTable from '@/components/admin/ReservationsTable'
import { Wrench, Lock } from 'lucide-react'

export const metadata = {
  title: 'Admin – Reshine Auto Works',
}

export default function AdminPage() {
  return (
    <AdminGate>
      <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Wrench className="w-5 h-5 text-red-500" />
                <span className="text-red-500 text-sm font-semibold tracking-widest uppercase">Admin Panel</span>
              </div>
              <h1 className="text-3xl font-black text-white">Reservations Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">Manage all incoming bookings and appointments.</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-xs bg-[#111] border border-white/5 px-3 py-2 rounded-lg">
              <Lock className="w-3.5 h-3.5" />
              Internal Use Only
            </div>
          </div>
          <ReservationsTable />
        </div>
      </div>
    </AdminGate>
  )
}
