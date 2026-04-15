export interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  service: string
  vehicle_make: string
  vehicle_model: string
  vehicle_year: string
  preferred_date: string
  preferred_time: string
  notes: string | null
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
}

export type ReservationInsert = Omit<Reservation, 'id' | 'status' | 'created_at'>

export const SERVICES = [
  'Collision Repair',
  'Paint & Refinishing',
  'Dent Removal',
  'Frame Straightening',
  'Bumper Repair',
  'Glass Replacement',
  'Full Body Restoration',
  'Detailing & Polish',
  'Insurance Estimate',
  'Free Inspection',
]

export const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
]
