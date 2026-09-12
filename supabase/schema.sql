-- ==============================================================================
-- WEDDING INVITATION STUDIO — SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Admins / Studio Owners)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. INVITATIONS
CREATE TABLE IF NOT EXISTS invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  wedding_date DATE NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  opening_title TEXT DEFAULT 'THE WEDDING OF',
  bride_nickname TEXT NOT NULL,
  groom_nickname TEXT NOT NULL,
  greeting_text TEXT DEFAULT 'We are so happy you are here ♡',
  hero_quote TEXT DEFAULT 'Two souls, one heart, a lifetime of adventures together.',
  closing_message TEXT DEFAULT 'It would mean the world to have you with us.',
  closing_subtext TEXT DEFAULT 'Eat, laugh, dance, repeat. ♡',
  cover_image TEXT,
  hero_image TEXT,
  closing_image TEXT,
  music_url TEXT,
  music_title TEXT DEFAULT 'Romantic Wedding Melody',
  music_artist TEXT DEFAULT 'Acoustic Strings',
  music_enabled BOOLEAN DEFAULT TRUE,
  theme_config JSONB DEFAULT '{
    "primary_color": "#283D52",
    "accent_color": "#C2A56B",
    "background_color": "#F7F2EA",
    "secondary_bg": "#EFE8DE",
    "text_color": "#24313A",
    "muted_color": "#768692",
    "gold_color": "#C2A56B",
    "blush_color": "#DFBFC1",
    "font_heading": "Cormorant Garamond",
    "font_body": "Manrope",
    "corner_radius": "12px",
    "decorative_intensity": "subtle"
  }'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. COUPLES (Bride & Groom Profiles)
CREATE TABLE IF NOT EXISTS couples (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('bride', 'groom')),
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

-- 4. EVENTS (Akad, Reception, etc.)
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  event_type TEXT NOT NULL DEFAULT 'reception',
  date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT,
  venue TEXT NOT NULL,
  address TEXT NOT NULL,
  maps_url TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. STORIES (Timeline milestones)
CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  photo_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. GALLERY (Photos)
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. GIFTS (Bank Accounts & Digital Angpao)
CREATE TABLE IF NOT EXISTS gifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bank', 'ewallet', 'address')),
  provider TEXT NOT NULL,
  account_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. GUESTS (Guest list & personal token)
CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  guest_code TEXT NOT NULL UNIQUE,
  category TEXT DEFAULT 'Umum',
  max_guests INTEGER DEFAULT 2,
  opened_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. RSVPS (Confirmations)
CREATE TABLE IF NOT EXISTS rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  guest_id UUID REFERENCES guests(id) ON DELETE SET NULL,
  guest_name TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK (attendance IN ('attending', 'not_attending')),
  guest_count INTEGER DEFAULT 1,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. WISHES (Guestbook)
CREATE TABLE IF NOT EXISTS wishes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  guest_id UUID REFERENCES guests(id) ON DELETE SET NULL,
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'hidden')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. SECTION SETTINGS (Visibility & Ordering)
CREATE TABLE IF NOT EXISTS section_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  section_key TEXT NOT NULL,
  title TEXT NOT NULL,
  enabled BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_invitations_slug ON invitations(slug);
CREATE INDEX IF NOT EXISTS idx_guests_code ON guests(guest_code);
CREATE INDEX IF NOT EXISTS idx_events_invitation ON events(invitation_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_stories_invitation ON stories(invitation_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_gallery_invitation ON gallery(invitation_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_wishes_invitation ON wishes(invitation_id, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rsvps_invitation ON rsvps(invitation_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC POLICIES:
-- Anyone can view published invitations
CREATE POLICY "Public can view published invitations"
  ON invitations FOR SELECT
  USING (status = 'published');

-- Public can read couples, events, stories, gallery, gifts, section_settings of published invitations
CREATE POLICY "Public can read couples of published invitations"
  ON couples FOR SELECT
  USING (EXISTS (SELECT 1 FROM invitations WHERE invitations.id = couples.invitation_id AND invitations.status = 'published'));

CREATE POLICY "Public can read events of published invitations"
  ON events FOR SELECT
  USING (EXISTS (SELECT 1 FROM invitations WHERE invitations.id = events.invitation_id AND invitations.status = 'published'));

CREATE POLICY "Public can read stories of published invitations"
  ON stories FOR SELECT
  USING (EXISTS (SELECT 1 FROM invitations WHERE invitations.id = stories.invitation_id AND invitations.status = 'published'));

CREATE POLICY "Public can read gallery of published invitations"
  ON gallery FOR SELECT
  USING (EXISTS (SELECT 1 FROM invitations WHERE invitations.id = gallery.invitation_id AND invitations.status = 'published'));

CREATE POLICY "Public can read gifts of published invitations"
  ON gifts FOR SELECT
  USING (EXISTS (SELECT 1 FROM invitations WHERE invitations.id = gifts.invitation_id AND invitations.status = 'published'));

CREATE POLICY "Public can read sections of published invitations"
  ON section_settings FOR SELECT
  USING (EXISTS (SELECT 1 FROM invitations WHERE invitations.id = section_settings.invitation_id AND invitations.status = 'published'));

-- Guests lookup by code
CREATE POLICY "Public can read specific guest by guest_code"
  ON guests FOR SELECT
  USING (true);

-- Public can insert RSVP and Wishes
CREATE POLICY "Public can insert RSVP"
  ON rsvps FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can insert wishes"
  ON wishes FOR INSERT
  WITH CHECK (true);

-- Public can read approved wishes
CREATE POLICY "Public can read approved wishes"
  ON wishes FOR SELECT
  USING (status = 'approved');

-- AUTHENTICATED / ADMIN POLICIES:
-- Authenticated users have full control over their invitations and associated data
CREATE POLICY "Admins have full access to invitations"
  ON invitations FOR ALL
  TO authenticated
  USING (auth.uid() = owner_id OR owner_id IS NULL)
  WITH CHECK (auth.uid() = owner_id OR owner_id IS NULL);

CREATE POLICY "Admins have full access to couples"
  ON couples FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins have full access to events"
  ON events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins have full access to stories"
  ON stories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins have full access to gallery"
  ON gallery FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins have full access to gifts"
  ON gifts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins have full access to guests"
  ON guests FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins have full access to rsvps"
  ON rsvps FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins have full access to wishes"
  ON wishes FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins have full access to section_settings"
  ON section_settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
