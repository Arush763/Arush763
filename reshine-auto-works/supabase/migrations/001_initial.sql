-- Reservations table for Reshine Auto Works
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  vehicle_make text not null,
  vehicle_model text not null,
  vehicle_year text not null,
  service text not null,
  preferred_date date not null,
  preferred_time text not null,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.reservations enable row level security;

-- Policy: anyone can insert (public booking form)
create policy "Allow public inserts"
  on public.reservations
  for insert
  to anon
  with check (true);

-- Policy: anyone can read (admin panel – no auth for now)
create policy "Allow public reads"
  on public.reservations
  for select
  to anon
  using (true);

-- Policy: anyone can update status
create policy "Allow public updates"
  on public.reservations
  for update
  to anon
  using (true)
  with check (true);

-- Index on status for filtered queries
create index if not exists reservations_status_idx on public.reservations(status);
create index if not exists reservations_created_idx on public.reservations(created_at desc);
