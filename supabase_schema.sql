-- =========================================================
-- KUUNDANG WEDDING INVITATION STUDIO - SUPABASE SQL SCHEMA
-- Jalankan skrip ini di: Supabase Console -> SQL Editor -> Run
-- =========================================================

-- 1. Tabel Undangan (Invitations)
CREATE TABLE IF NOT EXISTS invitations (
  id TEXT PRIMARY KEY,
  template_id TEXT DEFAULT 'royal-arch',
  owner_id TEXT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  wedding_date TEXT NOT NULL,
  status TEXT DEFAULT 'published',
  opening_title TEXT DEFAULT 'THE WEDDING OF',
  bride_nickname TEXT NOT NULL,
  groom_nickname TEXT NOT NULL,
  greeting_text TEXT,
  theme_config JSONB,
  music_url TEXT,
  music_title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Mempelai (Couples)
CREATE TABLE IF NOT EXISTS couples (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES invitations(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'bride' | 'groom'
  nickname TEXT NOT NULL,
  full_name TEXT NOT NULL,
  father_name TEXT,
  mother_name TEXT,
  child_order TEXT,
  instagram TEXT,
  photo_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel Acara (Events)
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES invitations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  event_type TEXT DEFAULT 'akad', -- 'akad' | 'reception' | 'ceremony' | 'party' | 'other'
  date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT,
  venue TEXT NOT NULL,
  venue_name TEXT,
  address TEXT NOT NULL,
  maps_url TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  description TEXT,
  sort_order INT DEFAULT 0
);

-- 4. Tabel Cerita Cinta (Stories)
CREATE TABLE IF NOT EXISTS stories (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES invitations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  photo_url TEXT,
  sort_order INT DEFAULT 0
);

-- 5. Tabel Galeri Foto (Gallery)
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES invitations(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0
);

-- 6. Tabel Rekening & Kado Digital (Gifts)
CREATE TABLE IF NOT EXISTS gifts (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES invitations(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'bank' | 'ewallet' | 'address'
  provider TEXT NOT NULL,
  account_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0
);

-- 7. Tabel Tamu Undangan (Guests)
CREATE TABLE IF NOT EXISTS guests (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES invitations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  guest_code TEXT NOT NULL,
  category TEXT DEFAULT 'Tamu Reguler',
  max_guests INT DEFAULT 2,
  opened_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Tabel Konfirmasi Kehadiran (RSVPs)
CREATE TABLE IF NOT EXISTS rsvps (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES invitations(id) ON DELETE CASCADE,
  guest_id TEXT,
  guest_name TEXT NOT NULL,
  attendance TEXT NOT NULL, -- 'attending' | 'not_attending'
  guest_count INT DEFAULT 1,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Tabel Ucapan & Doa Restu (Wishes)
CREATE TABLE IF NOT EXISTS wishes (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES invitations(id) ON DELETE CASCADE,
  guest_id TEXT,
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'approved', -- 'approved' | 'pending' | 'hidden'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- AKTIFKAN ROW LEVEL SECURITY (RLS) & PUBLIC ACCESS
-- Mengizinkan tamu membaca undangan dan mengirim RSVP/ucapan
-- =========================================================

ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they already exist to avoid ERROR 42710
DROP POLICY IF EXISTS "Public read invitations" ON invitations;
DROP POLICY IF EXISTS "Public read couples" ON couples;
DROP POLICY IF EXISTS "Public read events" ON events;
DROP POLICY IF EXISTS "Public read stories" ON stories;
DROP POLICY IF EXISTS "Public read gallery" ON gallery;
DROP POLICY IF EXISTS "Public read gifts" ON gifts;
DROP POLICY IF EXISTS "Public read guests" ON guests;
DROP POLICY IF EXISTS "Public read wishes" ON wishes;
DROP POLICY IF EXISTS "Public read rsvps" ON rsvps;

DROP POLICY IF EXISTS "Public can view invitations" ON invitations;
DROP POLICY IF EXISTS "Public can view couples" ON couples;
DROP POLICY IF EXISTS "Public can view events" ON events;
DROP POLICY IF EXISTS "Public can view stories" ON stories;
DROP POLICY IF EXISTS "Public can view gallery" ON gallery;
DROP POLICY IF EXISTS "Public can view gifts" ON gifts;
DROP POLICY IF EXISTS "Public can view guests" ON guests;
DROP POLICY IF EXISTS "Public can view wishes" ON wishes;
DROP POLICY IF EXISTS "Public can view rsvps" ON rsvps;

DROP POLICY IF EXISTS "Public insert rsvps" ON rsvps;
DROP POLICY IF EXISTS "Public insert wishes" ON wishes;
DROP POLICY IF EXISTS "Public can insert rsvps" ON rsvps;
DROP POLICY IF EXISTS "Public can insert wishes" ON wishes;

DROP POLICY IF EXISTS "Anon all permissions" ON invitations;
DROP POLICY IF EXISTS "Anon all permissions rsvps" ON rsvps;
DROP POLICY IF EXISTS "Anon all permissions wishes" ON wishes;
DROP POLICY IF EXISTS "Anon all permissions invitations" ON invitations;
DROP POLICY IF EXISTS "Anon all permissions couples" ON couples;
DROP POLICY IF EXISTS "Anon all permissions events" ON events;
DROP POLICY IF EXISTS "Anon all permissions stories" ON stories;
DROP POLICY IF EXISTS "Anon all permissions gallery" ON gallery;
DROP POLICY IF EXISTS "Anon all permissions gifts" ON gifts;
DROP POLICY IF EXISTS "Anon all permissions guests" ON guests;

-- Izinkan publik membaca data undangan & konten
CREATE POLICY "Public can view invitations" ON invitations FOR SELECT USING (true);
CREATE POLICY "Public can view couples" ON couples FOR SELECT USING (true);
CREATE POLICY "Public can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Public can view stories" ON stories FOR SELECT USING (true);
CREATE POLICY "Public can view gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public can view gifts" ON gifts FOR SELECT USING (true);
CREATE POLICY "Public can view guests" ON guests FOR SELECT USING (true);
CREATE POLICY "Public can view wishes" ON wishes FOR SELECT USING (true);
CREATE POLICY "Public can view rsvps" ON rsvps FOR SELECT USING (true);

-- Izinkan publik mengirim RSVP dan Ucapan
CREATE POLICY "Public can insert rsvps" ON rsvps FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert wishes" ON wishes FOR INSERT WITH CHECK (true);

-- Izinkan modifikasi penuh untuk admin/anon key
CREATE POLICY "Anon all permissions invitations" ON invitations FOR ALL USING (true);
CREATE POLICY "Anon all permissions couples" ON couples FOR ALL USING (true);
CREATE POLICY "Anon all permissions events" ON events FOR ALL USING (true);
CREATE POLICY "Anon all permissions stories" ON stories FOR ALL USING (true);
CREATE POLICY "Anon all permissions gallery" ON gallery FOR ALL USING (true);
CREATE POLICY "Anon all permissions gifts" ON gifts FOR ALL USING (true);
CREATE POLICY "Anon all permissions guests" ON guests FOR ALL USING (true);
CREATE POLICY "Anon all permissions rsvps" ON rsvps FOR ALL USING (true);
CREATE POLICY "Anon all permissions wishes" ON wishes FOR ALL USING (true);

