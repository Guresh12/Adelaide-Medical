-- ============================================================
-- Adelaide Home Health Portal – Supabase Schema Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
create type booking_status as enum ('pending', 'confirmed', 'completed', 'cancelled');
create type time_slot as enum ('morning', 'afternoon', 'evening');

-- ============================================================
-- NURSES
-- ============================================================
create table public.nurses (
  id            uuid primary key default uuid_generate_v4(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  name          text not null,
  qualifications text not null,
  experience    int not null default 0,
  rating        numeric(3,1) not null default 5.0,
  reviews       int not null default 0,
  specialty     text[] not null default '{}',
  available     boolean not null default true,
  bio           text,
  photo_url     text
);

-- ============================================================
-- SERVICES
-- ============================================================
create table public.services (
  id          uuid primary key default uuid_generate_v4(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  title       text not null,
  description text not null,
  features    text[] not null default '{}',
  icon_name   text not null default 'Stethoscope',
  image_url   text,
  active      boolean not null default true,
  sort_order  int not null default 0
);

-- ============================================================
-- BOOKINGS
-- ============================================================
create table public.bookings (
  id                uuid primary key default uuid_generate_v4(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  booking_ref       text not null unique default ('ICH-' || upper(to_hex(extract(epoch from now())::int))),
  nurse_id          uuid references public.nurses(id) on delete set null,
  service_id        uuid references public.services(id) on delete set null,
  patient_name      text not null,
  patient_email     text not null,
  patient_phone     text not null,
  patient_address   text not null,
  appointment_date  date not null,
  time_slot         time_slot not null,
  notes             text,
  status            booking_status not null default 'pending'
);

-- ============================================================
-- SITE SETTINGS
-- ============================================================
create table public.site_settings (
  id          uuid primary key default uuid_generate_v4(),
  key         text not null unique,
  value       text not null,
  updated_at  timestamptz not null default now()
);

-- Default settings
insert into public.site_settings (key, value) values
  ('company_name',  'Adelaide Medical Services'),
  ('company_phone', '+971 XX XXX XXXX'),
  ('company_email', 'info@adelaidehomehealth.com'),
  ('company_address', 'Dubai, United Arab Emirates'),
  ('hero_title',    'Premium Home Healthcare'),
  ('hero_subtitle', 'Professional nursing care delivered to your doorstep'),
  ('booking_email_enabled', 'false');

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger nurses_updated_at    before update on public.nurses    for each row execute function public.handle_updated_at();
create trigger services_updated_at  before update on public.services  for each row execute function public.handle_updated_at();
create trigger bookings_updated_at  before update on public.bookings  for each row execute function public.handle_updated_at();
create trigger settings_updated_at  before update on public.site_settings for each row execute function public.handle_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.nurses        enable row level security;
alter table public.services      enable row level security;
alter table public.bookings      enable row level security;
alter table public.site_settings enable row level security;

-- NURSES: Public can read available nurses; admins have full access
create policy "Public read available nurses"
  on public.nurses for select
  to anon, authenticated
  using (available = true);

create policy "Admin full access nurses"
  on public.nurses for all
  to authenticated
  using (true)
  with check (true);

-- SERVICES: Public can read active services; admins have full access
create policy "Public read active services"
  on public.services for select
  to anon, authenticated
  using (active = true);

create policy "Admin full access services"
  on public.services for all
  to authenticated
  using (true)
  with check (true);

-- BOOKINGS: Public can insert only; admins can read/update all
create policy "Public can create bookings"
  on public.bookings for insert
  to anon, authenticated
  with check (true);

create policy "Admin full access bookings"
  on public.bookings for all
  to authenticated
  using (true)
  with check (true);

-- SITE SETTINGS: Public can read; admins can write
create policy "Public read settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "Admin full access settings"
  on public.site_settings for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- STORAGE BUCKETS
-- Run separately if needed: Dashboard → Storage → New Bucket
-- ============================================================
insert into storage.buckets (id, name, public) values
  ('nurse-photos',    'nurse-photos',    true),
  ('service-images',  'service-images',  true)
on conflict (id) do nothing;

-- Storage policies: anyone can view, only authenticated can upload
create policy "Public read nurse photos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'nurse-photos');

create policy "Admin upload nurse photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'nurse-photos');

create policy "Admin delete nurse photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'nurse-photos');

create policy "Public read service images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'service-images');

create policy "Admin upload service images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'service-images');

create policy "Admin delete service images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'service-images');

-- ============================================================
-- SEED DATA (optional – matches existing static data)
-- ============================================================
insert into public.nurses (name, qualifications, experience, rating, reviews, specialty, available) values
  ('Sarah Johnson, RN',  'Registered Nurse, BSN',       8,  4.9, 127, ARRAY['Elderly Care','Wound Care'],             true),
  ('Michael Chen, RN',   'Registered Nurse, MSN',       12, 4.8, 203, ARRAY['Post-Surgery','Palliative Care'],        true),
  ('Emily Rodriguez, LPN','Licensed Practical Nurse',   5,  4.7, 89,  ARRAY['Medication Management','Vitals Monitoring'], true),
  ('David Williams, RN', 'Registered Nurse, BSN, CCRN', 15, 5.0, 312, ARRAY['Critical Care','Post-Surgery'],          false),
  ('Amanda Foster, RN',  'Registered Nurse, BSN',       7,  4.9, 156, ARRAY['Home Nursing','Elderly Care'],           true),
  ('James Thompson, LPN','Licensed Practical Nurse',    4,  4.6, 64,  ARRAY['Wound Dressing','Vitals Monitoring'],    true);

insert into public.services (title, description, features, icon_name, active, sort_order) values
  ('Nursing & Clinical Care',
   'Comprehensive nursing assessments, medication administration, IV infusions, wound care, and post-surgical support delivered by qualified professionals.',
   ARRAY['Medication Management','IV Infusions & Injections','Wound Care & Dressing','Chronic Illness Management','Post-Hospital Care'],
   'Stethoscope', true, 1),
  ('Medical & Specialist Visits',
   'Access to doctor home visits and specialist consultations to ensure your medical needs are met without leaving your home.',
   ARRAY['Doctor Home Visits','Specialist Consults','Care Coordination','Referrals'],
   'Activity', true, 2),
  ('Allied Health Services',
   'Supporting your recovery and mobility with professional physiotherapy and rehabilitation services tailored to your goals.',
   ARRAY['Physiotherapy','Rehabilitation Support','Mobility Care','Recovery Plans'],
   'HeartPulse', true, 3),
  ('Personal & Support Care',
   'Compassionate one-on-one care including elderly support, palliative care, and assistance with daily living activities.',
   ARRAY['One-on-one Caregivers','Elderly & Long-term Care','Palliative Care','Companionship'],
   'Heart', true, 4);
