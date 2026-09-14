import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEY_URL = 'kuundang_supabase_url';
const STORAGE_KEY_KEY = 'kuundang_supabase_anon_key';

/**
 * Normalizes user-inputted Supabase Project URL to prevent PGRST125 (Invalid path specified in request URL).
 * Common user mistakes handled:
 * 1. Copying REST URL with "/rest/v1" or "/rest/v1/" suffix
 * 2. Copying Supabase Dashboard URL (e.g., https://supabase.com/dashboard/project/<ref>)
 * 3. Copying with trailing slash or quotes
 * 4. Pasting only the 20-character project ref
 */
export function normalizeSupabaseUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  let str = rawUrl.trim().replace(/^["']|["']$/g, '').trim();

  // If user pasted dashboard link:
  // e.g. https://supabase.com/dashboard/project/abcdefghijklmnopqrst/...
  // e.g. https://app.supabase.com/project/abcdefghijklmnopqrst/...
  const dashMatch = str.match(/supabase\.com\/(?:dashboard\/)?project\/([a-zA-Z0-9_-]+)/i);
  if (dashMatch && dashMatch[1]) {
    return `https://${dashMatch[1]}.supabase.co`;
  }

  // If user pasted only project reference ID (e.g. 15-35 alphanumeric chars)
  if (/^[a-zA-Z0-9_-]{15,35}$/.test(str)) {
    return `https://${str}.supabase.co`;
  }

  // Prepend https:// if protocol is missing
  if (!/^https?:\/\//i.test(str)) {
    str = 'https://' + str;
  }

  // Remove common API endpoints appended by mistake (e.g. /rest/v1, /auth/v1, /storage/v1)
  str = str
    .replace(/\/rest\/v1\/?.*$/i, '')
    .replace(/\/auth\/v1\/?.*$/i, '')
    .replace(/\/storage\/v1\/?.*$/i, '');

  try {
    const urlObj = new URL(str);
    // PostgREST strictly requires origin only (e.g. https://<ref>.supabase.co)
    return urlObj.origin;
  } catch {
    return str.replace(/\/+$/, '');
  }
}

/**
 * Normalizes Supabase API key (strips quotes, whitespace, and accidental newlines)
 */
export function normalizeSupabaseKey(rawKey: string): string {
  if (!rawKey) return '';
  return rawKey.trim().replace(/^["']|["']$/g, '').replace(/\s+/g, '');
}

export const DEFAULT_SUPABASE_URL = 'https://xyryhdusxnwwjwkycsvd.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5cnloZHVzeG53d2p3a3ljc3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNzUzOTYsImV4cCI6MjEwNDk1MTM5Nn0.QNfo1oxTBUxb_s25q-wcn8Ue7rgCs6XquTXW_yzaDzc';

/**
 * Get active Supabase configuration from localStorage, Vite environment variables, or default project.
 * Automatically corrects/normalizes URL in localStorage if it was saved with /rest/v1 or subpaths.
 */
export function getSupabaseConfig(): { url: string; anonKey: string; isConfigured: boolean; rawUrl?: string } {
  let url = '';
  let anonKey = '';

  if (typeof window !== 'undefined') {
    url = localStorage.getItem(STORAGE_KEY_URL) || '';
    anonKey = localStorage.getItem(STORAGE_KEY_KEY) || '';
  }

  if (!url) {
    url = (import.meta as any).env?.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  }
  if (!anonKey) {
    anonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
  }

  const rawUrl = url;
  url = normalizeSupabaseUrl(url);
  anonKey = normalizeSupabaseKey(anonKey);

  // Auto-correct invalid URL in localStorage if user previously saved one with /rest/v1 or trailing slash
  if (typeof window !== 'undefined' && rawUrl && rawUrl !== url) {
    try {
      localStorage.setItem(STORAGE_KEY_URL, url);
    } catch {}
  }

  const isConfigured = Boolean(
    url &&
    anonKey &&
    url.startsWith('https://') &&
    anonKey.length > 20
  );

  return { url, anonKey, isConfigured, rawUrl };
}

let cachedClient: SupabaseClient | null = null;
let lastUrl = '';
let lastKey = '';

/**
 * Get the initialized Supabase client.
 * Supports forceRefresh to recreate client after URL sanitization.
 */
export function getSupabaseClient(forceRefresh = false): SupabaseClient | null {
  const { url, anonKey, isConfigured } = getSupabaseConfig();
  if (!isConfigured) {
    return null;
  }

  if (!forceRefresh && cachedClient && lastUrl === url && lastKey === anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    lastUrl = url;
    lastKey = anonKey;
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

/**
 * Save custom Supabase credentials to localStorage (auto-normalized)
 */
export function setSupabaseConfig(url: string, anonKey: string): void {
  if (typeof window === 'undefined') return;
  const cleanUrl = normalizeSupabaseUrl(url);
  const cleanKey = normalizeSupabaseKey(anonKey);

  if (cleanUrl && cleanKey) {
    localStorage.setItem(STORAGE_KEY_URL, cleanUrl);
    localStorage.setItem(STORAGE_KEY_KEY, cleanKey);
  } else {
    localStorage.removeItem(STORAGE_KEY_URL);
    localStorage.removeItem(STORAGE_KEY_KEY);
  }
  cachedClient = null;
  lastUrl = '';
  lastKey = '';
  window.dispatchEvent(new Event('supabase_config_changed'));
}

/**
 * Test connectivity with the configured Supabase instance
 */
export async function testSupabaseConnection(): Promise<{
  success: boolean;
  message: string;
  tablesFound?: string[];
  normalizedUrl?: string;
}> {
  const { url, isConfigured } = getSupabaseConfig();
  if (!isConfigured) {
    return {
      success: false,
      message: 'Supabase belum dikonfigurasi. Harap isi URL dan Anon Key terlebih dahulu.',
    };
  }

  const client = getSupabaseClient(true);
  if (!client) {
    return {
      success: false,
      message: 'Gagal membuat Supabase client. Periksa format URL dan Key Anda.',
    };
  }

  try {
    // Attempt a light query to verify connection
    const { error } = await client.from('invitations').select('id').limit(1);
    if (error) {
      if (error.code === 'PGRST125' || error.message.includes('Invalid path')) {
        return {
          success: false,
          message: `Error PGRST125 (Invalid path): URL yang dimasukkan sebelumnya mengandung subpath tidak valid (seperti "/rest/v1"). Format telah dirapikan menjadi "${url}". Silakan klik tombol "Uji Koneksi" sekali lagi.`,
          normalizedUrl: url,
        };
      }
      // If table doesn't exist yet, we still reached Supabase!
      if (error.code === '42P01' || error.message.includes('relation "invitations" does not exist')) {
        return {
          success: true,
          message: `Terkoneksi ke Supabase (${url})! Namun tabel "invitations" belum dibuat di database. Silakan salin skrip di tab "SQL Schema" lalu jalankan di SQL Editor dashboard Supabase Anda.`,
          tablesFound: [],
          normalizedUrl: url,
        };
      }
      return {
        success: false,
        message: `Koneksi gagal: ${error.message} (${error.code || 'Error'})`,
        normalizedUrl: url,
      };
    }

    return {
      success: true,
      message: `Koneksi ke Supabase Cloud (${url}) berhasil dan tabel "invitations" telah siap!`,
      tablesFound: ['invitations'],
      normalizedUrl: url,
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Gagal menghubungkan ke Supabase: ${err.message || 'Periksa koneksi internet dan kredensial Anda.'}`,
    };
  }
}

/**
 * Upload a File (photo, audio, video) to Supabase Storage.
 * Uses bucket 'wedding-media' (creates public URL).
 * Falls back to Base64 Data URL if bucket is not yet configured so user is never blocked.
 */
export async function uploadToSupabaseStorage(
  file: File,
  bucketName = 'wedding-media',
  folder = 'general'
): Promise<{ url: string; isFallback?: boolean; error?: string }> {
  const client = getSupabaseClient();

  // If Supabase is configured, attempt upload to Supabase Storage
  if (client) {
    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 7);
      const filePath = `${folder.toLowerCase().replace(/[^a-z0-9]/g, '-')}/${timestamp}-${randomStr}-${sanitizedName}`;

      const { data, error } = await client.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.warn(`Supabase storage upload to bucket '${bucketName}' failed:`, error.message);
        // If bucket doesn't exist or policy blocked, fall back to base64
        const fallbackUrl = await fileToDataUrl(file);
        return {
          url: fallbackUrl,
          isFallback: true,
          error: `Bucket '${bucketName}' belum dibuat atau policy belum public. Foto tersimpan sementara secara lokal. Silakan jalankan script SQL Storage di bawah.`,
        };
      }

      // Get public URL
      const { data: publicUrlData } = client.storage.from(bucketName).getPublicUrl(filePath);
      return {
        url: publicUrlData.publicUrl,
        isFallback: false,
      };
    } catch (err: any) {
      console.warn('Supabase storage error, falling back to Data URL:', err);
      const fallbackUrl = await fileToDataUrl(file);
      return {
        url: fallbackUrl,
        isFallback: true,
        error: err.message,
      };
    }
  }

  // If Supabase is not configured, fall back to Base64 Data URL so user can still upload
  const fallbackUrl = await fileToDataUrl(file);
  return {
    url: fallbackUrl,
    isFallback: true,
  };
}

/**
 * Helper to convert a File into a Data URL
 */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

/**
 * Dynamic getter for isSupabaseConfigured
 */
export const isSupabaseConfigured = Boolean(getSupabaseConfig().isConfigured);

/**
 * Dynamic proxy for supabase client so all existing imports `supabase` work seamlessly
 */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseClient();
    if (!client) {
      return undefined;
    }
    const val = (client as any)[prop];
    if (typeof val === 'function') {
      return val.bind(client);
    }
    return val;
  },
});

/**
 * Complete ready-to-run PostgreSQL schema script for Supabase SQL Editor
 */
export const SUPABASE_SQL_SCHEMA = `-- ============================================================
-- KUUNDANG WEDDING STUDIO - FULL DATABASE & STORAGE SCHEMA
-- Jalankan skrip ini di SQL Editor dashboard Supabase Anda:
-- Dashboard Supabase -> Project Anda -> SQL Editor -> New Query -> Run
-- ============================================================

-- 1. Tabel INVITATIONS
CREATE TABLE IF NOT EXISTS public.invitations (
  id TEXT PRIMARY KEY,
  template_id TEXT NOT NULL DEFAULT 'royal-arch',
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  wedding_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  opening_title TEXT,
  bride_nickname TEXT,
  groom_nickname TEXT,
  greeting_text TEXT,
  hero_quote TEXT,
  closing_message TEXT,
  closing_subtext TEXT,
  cover_image TEXT,
  hero_image TEXT,
  events_image TEXT,
  closing_image TEXT,
  music_url TEXT,
  music_title TEXT,
  music_artist TEXT,
  music_enabled BOOLEAN DEFAULT true,
  theme_config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabel COUPLES (Mempelai Pria & Wanita)
CREATE TABLE IF NOT EXISTS public.couples (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES public.invitations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('bride', 'groom')),
  nickname TEXT,
  full_name TEXT,
  father_name TEXT,
  mother_name TEXT,
  child_order TEXT,
  instagram TEXT,
  photo_url TEXT,
  description TEXT
);

-- 3. Tabel EVENTS (Akad, Resepsi, Unduh Mantu, dll)
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES public.invitations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  event_type TEXT,
  date TEXT,
  start_time TEXT,
  end_time TEXT,
  venue TEXT,
  address TEXT,
  maps_url TEXT,
  description TEXT,
  sort_order INT DEFAULT 0
);

-- 4. Tabel STORIES (Love Story Timeline)
CREATE TABLE IF NOT EXISTS public.stories (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES public.invitations(id) ON DELETE CASCADE,
  year TEXT,
  date TEXT,
  title TEXT,
  description TEXT,
  image_url TEXT,
  photo_url TEXT,
  sort_order INT DEFAULT 0
);

-- 5. Tabel GALLERY (Foto Kenangan)
CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES public.invitations(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0
);

-- 6. Tabel GIFTS (Rekening & Tali Asih Digital)
CREATE TABLE IF NOT EXISTS public.gifts (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES public.invitations(id) ON DELETE CASCADE,
  type TEXT DEFAULT 'bank',
  bank_name TEXT,
  provider TEXT,
  account_number TEXT,
  account_name TEXT,
  description TEXT,
  qr_code_url TEXT,
  sort_order INT DEFAULT 0
);

-- 7. Tabel SECTIONS (Pengaturan Urutan & On/Off Section)
CREATE TABLE IF NOT EXISTS public.sections (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES public.invitations(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  title TEXT,
  enabled BOOLEAN DEFAULT true,
  sort_order REAL DEFAULT 0
);

-- 8. Tabel GUESTS (Daftar Tamu Undangan)
CREATE TABLE IF NOT EXISTS public.guests (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES public.invitations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  guest_code TEXT NOT NULL,
  category TEXT DEFAULT 'Keluarga',
  max_guests INT DEFAULT 2,
  has_opened BOOLEAN DEFAULT false,
  opened_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Tabel RSVPs (Konfirmasi Kehadiran Tamu)
CREATE TABLE IF NOT EXISTS public.rsvps (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES public.invitations(id) ON DELETE CASCADE,
  guest_id TEXT,
  name TEXT NOT NULL,
  guest_name TEXT,
  attendance TEXT NOT NULL,
  pax INT DEFAULT 1,
  guest_count INT,
  notes TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Tabel WISHES (Buku Tamu & Ucapan Doa Restu)
CREATE TABLE IF NOT EXISTS public.wishes (
  id TEXT PRIMARY KEY,
  invitation_id TEXT REFERENCES public.invitations(id) ON DELETE CASCADE,
  guest_id TEXT,
  name TEXT NOT NULL,
  guest_name TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'approved',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Safe migrations in case tables were previously created without newer columns:
ALTER TABLE public.stories ADD COLUMN IF NOT EXISTS date TEXT;
ALTER TABLE public.stories ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE public.gifts ADD COLUMN IF NOT EXISTS provider TEXT;
ALTER TABLE public.gifts ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.rsvps ADD COLUMN IF NOT EXISTS guest_name TEXT;
ALTER TABLE public.rsvps ADD COLUMN IF NOT EXISTS guest_count INT;
ALTER TABLE public.rsvps ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE public.wishes ADD COLUMN IF NOT EXISTS guest_id TEXT;
ALTER TABLE public.wishes ADD COLUMN IF NOT EXISTS guest_name TEXT;
ALTER TABLE public.sections ADD COLUMN IF NOT EXISTS subtitle TEXT;

-- ============================================================
-- STORAGE BUCKET UNTUK FOTO & MEDIA (wedding-media)
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('wedding-media', 'wedding-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy Akses Publik untuk Bucket wedding-media
DROP POLICY IF EXISTS "Public Access wedding-media" ON storage.objects;
CREATE POLICY "Public Access wedding-media"
ON storage.objects FOR SELECT
USING (bucket_id = 'wedding-media');

DROP POLICY IF EXISTS "Public Upload wedding-media" ON storage.objects;
CREATE POLICY "Public Upload wedding-media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'wedding-media');

DROP POLICY IF EXISTS "Public Update wedding-media" ON storage.objects;
CREATE POLICY "Public Update wedding-media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'wedding-media');

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Memberikan izin read/write publik untuk aplikasi wedding
-- ============================================================
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- Izinkan akses anonim (read/write) untuk semua tabel undangan
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY['invitations', 'couples', 'events', 'stories', 'gallery', 'gifts', 'sections', 'guests', 'rsvps', 'wishes'])
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Allow public read on %I" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "Allow public read on %I" ON public.%I FOR SELECT USING (true)', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "Allow public insert on %I" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "Allow public insert on %I" ON public.%I FOR INSERT WITH CHECK (true)', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "Allow public update on %I" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "Allow public update on %I" ON public.%I FOR UPDATE USING (true)', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "Allow public delete on %I" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "Allow public delete on %I" ON public.%I FOR DELETE USING (true)', t, t);
  END LOOP;
END $$;

-- 11. Muat Ulang Schema Cache PostgREST Secara Instan
NOTIFY pgrst, 'reload schema';
`;
