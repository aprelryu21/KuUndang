import {
  Couple,
  FullInvitationData,
  GalleryItem,
  GiftAccount,
  Guest,
  Invitation,
  RSVP,
  SectionSetting,
  StoryItem,
  TemplateId,
  ThemeConfig,
  WeddingEvent,
  Wish,
} from '../types/wedding';
import {
  INITIAL_DEMO_DATA,
  INITIAL_DEMO_GUESTS,
  INITIAL_DEMO_INVITATION_ID,
  INITIAL_DEMO_RSVPS,
} from '../data/initialDemo';
import { getTemplatePreset } from '../data/templatePresets';
import { getSupabaseClient, getSupabaseConfig } from '../lib/supabase';

const STORAGE_KEYS = {
  INVITATIONS: 'wedding_studio_invitations',
  COUPLES: 'wedding_studio_couples',
  EVENTS: 'wedding_studio_events',
  STORIES: 'wedding_studio_stories',
  GALLERY: 'wedding_studio_gallery',
  GIFTS: 'wedding_studio_gifts',
  SECTIONS: 'wedding_studio_sections',
  GUESTS: 'wedding_studio_guests',
  RSVPS: 'wedding_studio_rsvps',
  WISHES: 'wedding_studio_wishes',
};

const DATA_VERSION = 'v5_supabase_clean_sync';

// Helper for local storage initialization
function initializeLocalStorage() {
  if (typeof window === 'undefined') return;

  const rawDeleted = localStorage.getItem('wedding_deleted_invitation_ids');
  let deletedIds: string[] = [];
  try {
    deletedIds = rawDeleted ? JSON.parse(rawDeleted) : [];
  } catch {
    deletedIds = [];
  }

  const rawInvs = localStorage.getItem(STORAGE_KEYS.INVITATIONS);
  let invitations: Invitation[] = [];
  try {
    invitations = rawInvs ? JSON.parse(rawInvs) : [];
  } catch {
    invitations = [];
  }

  // Filter out any invitations that were deleted
  if (deletedIds.length > 0) {
    const filtered = invitations.filter((inv) => !deletedIds.includes(inv.id));
    if (filtered.length !== invitations.length) {
      invitations = filtered;
      localStorage.setItem(STORAGE_KEYS.INVITATIONS, JSON.stringify(invitations));
    }
  }

  // Ensure initial demo invitation exists in the array ONLY if never deleted and list is empty
  const isDemoDeleted = deletedIds.includes(INITIAL_DEMO_DATA.invitation.id);
  const hasDemo = invitations.some(
    (inv) => inv.id === INITIAL_DEMO_DATA.invitation.id || inv.slug === INITIAL_DEMO_DATA.invitation.slug
  );
  if (!hasDemo && !isDemoDeleted && invitations.length === 0) {
    invitations.push(INITIAL_DEMO_DATA.invitation);
    localStorage.setItem(STORAGE_KEYS.INVITATIONS, JSON.stringify(invitations));
  }

  // Seed demo data for the demo invitation only if storage key is totally absent
  if (!localStorage.getItem(STORAGE_KEYS.COUPLES)) {
    localStorage.setItem(STORAGE_KEYS.COUPLES, JSON.stringify([INITIAL_DEMO_DATA.bride, INITIAL_DEMO_DATA.groom]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_DEMO_DATA.events));
  }
  if (!localStorage.getItem(STORAGE_KEYS.STORIES)) {
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(INITIAL_DEMO_DATA.stories));
  }
  if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_DEMO_DATA.gallery));
  }
  if (!localStorage.getItem(STORAGE_KEYS.GIFTS)) {
    localStorage.setItem(STORAGE_KEYS.GIFTS, JSON.stringify(INITIAL_DEMO_DATA.gifts));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SECTIONS)) {
    localStorage.setItem(STORAGE_KEYS.SECTIONS, JSON.stringify(INITIAL_DEMO_DATA.sections));
  }
  if (!localStorage.getItem(STORAGE_KEYS.GUESTS)) {
    localStorage.setItem(STORAGE_KEYS.GUESTS, JSON.stringify(INITIAL_DEMO_GUESTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.RSVPS)) {
    localStorage.setItem(STORAGE_KEYS.RSVPS, JSON.stringify(INITIAL_DEMO_RSVPS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.WISHES)) {
    localStorage.setItem(STORAGE_KEYS.WISHES, JSON.stringify(INITIAL_DEMO_DATA.wishes));
  }
  localStorage.setItem('wedding_studio_data_version', DATA_VERSION);
}

// Read helper
function getLocal<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch (e) {
    console.error('Error reading localStorage key:', key, e);
    return defaultVal;
  }
}

// Write helper
function setLocal<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Error writing localStorage key:', key, e);
  }
}

// ============================================================
// SUPABASE DATA SANITIZERS (Ensures exact schema compatibility)
// ============================================================

export function cleanInvitationForSupabase(inv: Invitation) {
  return {
    id: inv.id,
    template_id: inv.template_id || 'royal-arch',
    title: inv.title,
    slug: inv.slug,
    wedding_date: inv.wedding_date || '2026-10-10',
    status: inv.status || 'draft',
    opening_title: inv.opening_title || '',
    bride_nickname: inv.bride_nickname || '',
    groom_nickname: inv.groom_nickname || '',
    greeting_text: inv.greeting_text || '',
    hero_quote: inv.hero_quote || '',
    closing_message: inv.closing_message || '',
    closing_subtext: inv.closing_subtext || '',
    cover_image: inv.cover_image || '',
    hero_image: inv.hero_image || '',
    events_image: inv.events_image || '',
    closing_image: inv.closing_image || '',
    music_url: inv.music_url || '',
    music_title: inv.music_title || '',
    music_artist: inv.music_artist || '',
    music_enabled: inv.music_enabled ?? true,
    theme_config: inv.theme_config || {},
    created_at: inv.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function cleanCoupleForSupabase(couple: Couple) {
  return {
    id: couple.id,
    invitation_id: couple.invitation_id,
    role: couple.role,
    nickname: couple.nickname || '',
    full_name: couple.full_name || couple.nickname || '',
    father_name: couple.father_name || '',
    mother_name: couple.mother_name || '',
    child_order: couple.child_order || '',
    instagram: couple.instagram || '',
    photo_url: couple.photo_url || '',
    description: couple.description || '',
  };
}

export function cleanEventForSupabase(event: WeddingEvent) {
  return {
    id: event.id,
    invitation_id: event.invitation_id,
    title: event.title,
    event_type: event.event_type || 'other',
    date: event.date || '',
    start_time: event.start_time || '',
    end_time: event.end_time || '',
    venue: event.venue || (event as any).venue_name || '',
    address: event.address || '',
    maps_url: event.maps_url || '',
    description: event.description || '',
    sort_order: event.sort_order || 0,
  };
}

export function cleanStoryForSupabase(story: StoryItem) {
  return {
    id: story.id,
    invitation_id: story.invitation_id,
    year: story.year || (story as any).date || '',
    date: (story as any).date || story.year || '',
    title: story.title || '',
    description: story.description || '',
    image_url: story.image_url || (story as any).photo_url || '',
    photo_url: (story as any).photo_url || story.image_url || '',
    sort_order: story.sort_order || 0,
  };
}

export function cleanGalleryForSupabase(item: GalleryItem) {
  return {
    id: item.id,
    invitation_id: item.invitation_id,
    image_url: item.image_url,
    caption: item.caption || '',
    featured: Boolean(item.featured),
    sort_order: item.sort_order || 0,
  };
}

export function cleanGiftForSupabase(gift: GiftAccount) {
  return {
    id: gift.id,
    invitation_id: gift.invitation_id,
    type: gift.type || 'bank',
    bank_name: gift.bank_name || (gift as any).provider || '',
    provider: (gift as any).provider || gift.bank_name || '',
    account_number: gift.account_number || '',
    account_name: gift.account_name || '',
    description: (gift as any).description || '',
    sort_order: gift.sort_order || 0,
  };
}

export function cleanSectionForSupabase(sec: SectionSetting) {
  return {
    id: sec.id,
    invitation_id: sec.invitation_id,
    section_key: sec.section_key,
    title: sec.title || '',
    subtitle: sec.subtitle || '',
    enabled: sec.enabled ?? true,
    sort_order: sec.sort_order || 0,
  };
}

export function cleanGuestForSupabase(guest: Guest) {
  return {
    id: guest.id,
    invitation_id: guest.invitation_id,
    name: guest.name,
    guest_code: guest.guest_code,
    category: guest.category || 'Keluarga',
    max_guests: guest.max_guests || 2,
    has_opened: Boolean(guest.has_opened),
    opened_at: guest.opened_at || null,
    created_at: guest.created_at || new Date().toISOString(),
  };
}

export function cleanRsvpForSupabase(rsvp: RSVP) {
  return {
    id: rsvp.id,
    invitation_id: rsvp.invitation_id,
    guest_id: rsvp.guest_id || null,
    name: rsvp.name || (rsvp as any).guest_name || 'Tamu Undangan',
    guest_name: (rsvp as any).guest_name || rsvp.name || 'Tamu Undangan',
    attendance: rsvp.attendance || 'attending',
    pax: rsvp.pax || (rsvp as any).guest_count || 1,
    guest_count: (rsvp as any).guest_count || rsvp.pax || 1,
    notes: rsvp.notes || (rsvp as any).message || '',
    message: (rsvp as any).message || rsvp.notes || '',
    created_at: rsvp.created_at || new Date().toISOString(),
  };
}

export function cleanWishForSupabase(wish: Wish) {
  return {
    id: wish.id,
    invitation_id: wish.invitation_id,
    guest_id: (wish as any).guest_id || null,
    name: wish.name || (wish as any).guest_name || 'Sahabat & Kerabat',
    guest_name: (wish as any).guest_name || wish.name || 'Sahabat & Kerabat',
    message: wish.message || '',
    status: wish.status || 'approved',
    created_at: wish.created_at || new Date().toISOString(),
  };
}

export const weddingService = {
  init() {
    initializeLocalStorage();
  },

  // Check Supabase connectivity
  isCloudConfigured(): boolean {
    return getSupabaseConfig().isConfigured;
  },

  // Invitations
  async getAllInvitations(): Promise<Invitation[]> {
    initializeLocalStorage();
    const rawDeleted = localStorage.getItem('wedding_deleted_invitation_ids');
    let deletedIds: string[] = [];
    try {
      deletedIds = rawDeleted ? JSON.parse(rawDeleted) : [];
    } catch {
      deletedIds = [];
    }

    let localInvs = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, [INITIAL_DEMO_DATA.invitation]);
    localInvs = localInvs.filter((inv) => !deletedIds.includes(inv.id));

    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('invitations')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          const remoteInvs = (data as Invitation[]).filter((inv) => !deletedIds.includes(inv.id));
          // If Supabase returned results, merge remote with local-only drafts
          const merged = [...remoteInvs];
          for (const loc of localInvs) {
            if (!merged.some((m) => m.id === loc.id) && !deletedIds.includes(loc.id)) {
              merged.push(loc);
            }
          }
          setLocal(STORAGE_KEYS.INVITATIONS, merged);
          return merged;
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local:', err);
      }
    }
    return localInvs;
  },

  async getInvitationBySlug(slug: string): Promise<FullInvitationData | null> {
    initializeLocalStorage();
    const cleanSlug = decodeURIComponent(slug).trim().toLowerCase().replace(/^\/+|\/+$/g, '');
    const invitations = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, [INITIAL_DEMO_DATA.invitation]);
    let invitation = invitations.find(
      (inv) =>
        inv.slug.toLowerCase().trim() === cleanSlug ||
        inv.id.toLowerCase().trim() === cleanSlug
    );

    // Query Supabase if connected
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('invitations')
          .select('*')
          .ilike('slug', cleanSlug)
          .maybeSingle();
        if (!error && data) {
          invitation = data as Invitation;
          // Cache locally
          const localInvs = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, []);
          const idx = localInvs.findIndex((i) => i.id === invitation!.id);
          if (idx === -1) {
            setLocal(STORAGE_KEYS.INVITATIONS, [invitation, ...localInvs]);
          } else {
            localInvs[idx] = invitation;
            setLocal(STORAGE_KEYS.INVITATIONS, localInvs);
          }
        }
      } catch (err) {
        console.warn('Supabase getInvitationBySlug error:', err);
      }
    }

    // Demo slug fallback only for explicit demo slugs
    if (!invitation && (cleanSlug === 'shofwan-allya' || cleanSlug === 'april-siti')) {
      invitation = INITIAL_DEMO_DATA.invitation;
    }

    if (!invitation) return null;

    return this.getFullInvitationData(invitation.id, invitation);
  },

  async getInvitationById(id: string): Promise<FullInvitationData | null> {
    initializeLocalStorage();
    const cleanId = decodeURIComponent(id).trim().toLowerCase().replace(/^\/+|\/+$/g, '');
    const invitations = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, [INITIAL_DEMO_DATA.invitation]);
    let invitation = invitations.find(
      (inv) =>
        inv.id.toLowerCase().trim() === cleanId ||
        inv.slug.toLowerCase().trim() === cleanId
    );

    const client = getSupabaseClient();
    if (client) {
      try {
        let { data, error } = await client
          .from('invitations')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (!data) {
          const slugRes = await client.from('invitations').select('*').ilike('slug', cleanId).maybeSingle();
          if (slugRes.data) data = slugRes.data;
        }

        if (data) {
          invitation = data as Invitation;
          const localInvs = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, []);
          const idx = localInvs.findIndex((i) => i.id === invitation!.id);
          if (idx === -1) {
            setLocal(STORAGE_KEYS.INVITATIONS, [invitation, ...localInvs]);
          } else {
            localInvs[idx] = invitation;
            setLocal(STORAGE_KEYS.INVITATIONS, localInvs);
          }
        }
      } catch (err) {
        console.warn('Supabase getInvitationById error:', err);
      }
    }

    if (!invitation && (cleanId === INITIAL_DEMO_INVITATION_ID.toLowerCase() || cleanId === 'april-siti')) {
      invitation = INITIAL_DEMO_DATA.invitation;
    }

    if (!invitation) return null;

    return this.getFullInvitationData(invitation.id, invitation);
  },

  async getFullInvitationData(id: string, cachedInv?: Invitation): Promise<FullInvitationData | null> {
    const invitations = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, [INITIAL_DEMO_DATA.invitation]);
    let invitation = cachedInv || invitations.find((inv) => inv.id === id || inv.slug === id);

    const client = getSupabaseClient();
    if (!invitation && client) {
      try {
        const { data, error } = await client.from('invitations').select('*').eq('id', id).maybeSingle();
        if (!error && data) invitation = data as Invitation;
      } catch (err) {
        console.warn('Supabase getFullInvitationData error:', err);
      }
    }

    if (!invitation) return null;

    const isDemo = invitation.id === INITIAL_DEMO_INVITATION_ID || invitation.slug === 'april-siti';

    // 1. COUPLES (Bride & Groom)
    const couples = getLocal<Couple[]>(STORAGE_KEYS.COUPLES, isDemo ? [INITIAL_DEMO_DATA.bride, INITIAL_DEMO_DATA.groom] : []);
    const invCouples = couples.filter((c) => c.invitation_id === id);

    let bride = invCouples.find((c) => c.role === 'bride');
    let groom = invCouples.find((c) => c.role === 'groom');

    // Fetch from Supabase if missing locally
    if (client && (!bride || !groom)) {
      try {
        const { data: dbCouples } = await client.from('couples').select('*').eq('invitation_id', id);
        if (dbCouples && dbCouples.length > 0) {
          if (!bride) bride = dbCouples.find((c: any) => c.role === 'bride');
          if (!groom) groom = dbCouples.find((c: any) => c.role === 'groom');
          const localCouples = getLocal<Couple[]>(STORAGE_KEYS.COUPLES, []);
          setLocal(STORAGE_KEYS.COUPLES, [...localCouples.filter((c) => c.invitation_id !== id), ...dbCouples]);
        }
      } catch (err) {
        console.warn('Supabase fetch couples error:', err);
      }
    }

    // If this is the demo invitation and missing, use demo couples
    if (isDemo) {
      if (!bride) bride = INITIAL_DEMO_DATA.bride;
      if (!groom) groom = INITIAL_DEMO_DATA.groom;
    } else {
      // For any user-created invitation, NEVER use Siti & April's data!
      const preset = getTemplatePreset(invitation.template_id || 'royal-arch');
      if (!bride) {
        bride = {
          id: 'bride-' + id,
          invitation_id: id,
          role: 'bride',
          nickname: invitation.bride_nickname || 'Mempelai Wanita',
          full_name: invitation.bride_nickname ? `${invitation.bride_nickname}` : 'Mempelai Wanita',
          father_name: '',
          mother_name: '',
          child_order: 'Putri',
          instagram: '',
          photo_url: preset.bridePhoto || '',
          description: 'Putri tercinta yang berbahagia.',
        };
      }
      if (!groom) {
        groom = {
          id: 'groom-' + id,
          invitation_id: id,
          role: 'groom',
          nickname: invitation.groom_nickname || 'Mempelai Pria',
          full_name: invitation.groom_nickname ? `${invitation.groom_nickname}` : 'Mempelai Pria',
          father_name: '',
          mother_name: '',
          child_order: 'Putra',
          instagram: '',
          photo_url: preset.groomPhoto || '',
          description: 'Putra tercinta yang berbahagia.',
        };
      }
    }

    // 2. EVENTS
    const allEvents = getLocal<WeddingEvent[]>(STORAGE_KEYS.EVENTS, isDemo ? INITIAL_DEMO_DATA.events : []);
    let events = allEvents
      .filter((e) => e.invitation_id === id)
      .sort((a, b) => a.sort_order - b.sort_order);

    if (events.length === 0) {
      if (isDemo) {
        events = INITIAL_DEMO_DATA.events;
      } else {
        events = [
          {
            id: 'event-1-' + id,
            invitation_id: id,
            title: 'Akad Nikah',
            event_type: 'akad',
            date: invitation.wedding_date || '2026-10-10',
            start_time: '08:00 WIB',
            end_time: '10:00 WIB',
            venue: 'Kediaman Mempelai Wanita / Masjid',
            address: 'Jl. Bahagia Menuju Pelaminan No. 1',
            maps_url: 'https://maps.google.com',
            description: 'Momen sakral pengucapan janji suci akad nikah.',
            sort_order: 1,
          },
          {
            id: 'event-2-' + id,
            invitation_id: id,
            title: 'Resepsi Pernikahan',
            event_type: 'reception',
            date: invitation.wedding_date || '2026-10-10',
            start_time: '11:00 WIB',
            end_time: '14:00 WIB',
            venue: 'Grand Ballroom / Gedung Serbaguna',
            address: 'Jl. Bahagia Menuju Pelaminan No. 1',
            maps_url: 'https://maps.google.com',
            description: 'Tasyakuran dan ramah tamah bersama keluarga dan handai taulan.',
            sort_order: 2,
          },
        ];
      }
    }

    // 3. STORIES
    const allStories = getLocal<StoryItem[]>(STORAGE_KEYS.STORIES, isDemo ? INITIAL_DEMO_DATA.stories : []);
    let stories = allStories
      .filter((s) => s.invitation_id === id)
      .sort((a, b) => a.sort_order - b.sort_order);

    if (stories.length === 0) {
      if (isDemo) {
        stories = INITIAL_DEMO_DATA.stories;
      } else {
        const preset = getTemplatePreset(invitation.template_id || 'royal-arch');
        stories = [
          {
            id: 'story-1-' + id,
            invitation_id: id,
            year: 'Awal Pertemuan',
            title: 'Takdir Mempertemukan',
            description: 'Awal mula langkah perjalanan yang dipenuhi senyum dan ketulusan.',
            image_url: preset.storyImage1,
            sort_order: 1,
          },
          {
            id: 'story-2-' + id,
            invitation_id: id,
            year: 'Janji Suci',
            title: 'Menuju Ikatan Abadi',
            description: 'Dengan restu kedua orang tua, kami mantap menyatukan hati dalam pernikahan.',
            image_url: preset.storyImage2,
            sort_order: 2,
          },
        ];
      }
    }

    // 4. GALLERY
    const allGallery = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, isDemo ? INITIAL_DEMO_DATA.gallery : []);
    let gallery = allGallery
      .filter((g) => g.invitation_id === id)
      .sort((a, b) => a.sort_order - b.sort_order);

    if (gallery.length === 0 && isDemo) {
      gallery = INITIAL_DEMO_DATA.gallery;
    }

    // 5. GIFTS
    const allGifts = getLocal<GiftAccount[]>(STORAGE_KEYS.GIFTS, isDemo ? INITIAL_DEMO_DATA.gifts : []);
    let gifts = allGifts
      .filter((g) => g.invitation_id === id)
      .sort((a, b) => a.sort_order - b.sort_order);

    if (gifts.length === 0) {
      if (isDemo) {
        gifts = INITIAL_DEMO_DATA.gifts;
      } else {
        gifts = [
          {
            id: 'gift-1-' + id,
            invitation_id: id,
            type: 'bank',
            bank_name: 'BCA',
            account_number: '1234567890',
            account_name: `${invitation.groom_nickname || 'Mempelai Pria'} / ${invitation.bride_nickname || 'Mempelai Wanita'}`,
            sort_order: 1,
          },
        ];
      }
    }

    // 6. SECTIONS
    const allSections = getLocal<SectionSetting[]>(STORAGE_KEYS.SECTIONS, isDemo ? INITIAL_DEMO_DATA.sections : []);
    let sections = allSections
      .filter((sec) => sec.invitation_id === id)
      .sort((a, b) => a.sort_order - b.sort_order);

    // Ensure all 13 standard sections exist and have subtitles
    const standardSections = INITIAL_DEMO_DATA.sections;
    if (sections.length === 0) {
      sections = standardSections.map((sec, idx) => ({
        ...sec,
        id: `sec-${idx + 1}-${id}`,
        invitation_id: id,
      }));
    } else {
      standardSections.forEach((stdSec, idx) => {
        const existingIdx = sections.findIndex((s) => s.section_key === stdSec.section_key);
        if (existingIdx === -1) {
          sections.push({
            ...stdSec,
            id: `sec-${idx + 1}-${id}`,
            invitation_id: id,
          });
        } else if (!sections[existingIdx].subtitle && stdSec.subtitle) {
          sections[existingIdx].subtitle = stdSec.subtitle;
        }
      });
      sections.sort((a, b) => a.sort_order - b.sort_order);
    }

    // 7. WISHES (Only show wishes belonging to this specific invitation!)
    const allWishes = getLocal<Wish[]>(STORAGE_KEYS.WISHES, isDemo ? INITIAL_DEMO_DATA.wishes : []);
    const wishes = allWishes
      .filter((w) => w.invitation_id === id)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return {
      invitation,
      bride,
      groom,
      events,
      stories,
      gallery,
      gifts,
      sections,
      wishes,
    };
  },

  async createInvitation(params: {
    title: string;
    bride_nickname: string;
    groom_nickname: string;
    slug: string;
    wedding_date: string;
    template_id?: TemplateId;
    theme_config?: Partial<ThemeConfig>;
  }): Promise<Invitation> {
    initializeLocalStorage();
    const id = 'inv-' + Math.random().toString(36).substring(2, 9);
    const chosenTemplate = params.template_id || 'royal-arch';
    const preset = getTemplatePreset(chosenTemplate);

    const newInv: Invitation = {
      id,
      template_id: chosenTemplate,
      title: params.title || `The Wedding of ${params.groom_nickname || 'Groom'} & ${params.bride_nickname || 'Bride'}`,
      slug: params.slug || `${(params.groom_nickname || 'groom').toLowerCase()}-${(params.bride_nickname || 'bride').toLowerCase()}`,
      wedding_date: params.wedding_date || '2026-10-10',
      status: 'draft',
      opening_title: preset.opening_title,
      bride_nickname: params.bride_nickname,
      groom_nickname: params.groom_nickname,
      greeting_text: preset.greeting_text,
      hero_quote: preset.hero_quote,
      closing_message: preset.closing_message,
      closing_subtext: preset.closing_subtext,
      cover_image: preset.cover_image,
      hero_image: preset.hero_image,
      events_image: preset.events_image,
      closing_image: preset.closing_image,
      music_url: preset.music_url,
      music_title: preset.music_title,
      music_artist: preset.music_artist,
      music_enabled: preset.music_enabled,
      theme_config: {
        ...preset.theme_config,
        ...(params.theme_config || {}),
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Save invitation locally
    const rawDeleted = localStorage.getItem('wedding_deleted_invitation_ids');
    if (rawDeleted) {
      try {
        const deletedIds: string[] = JSON.parse(rawDeleted);
        if (deletedIds.includes(id)) {
          const updated = deletedIds.filter((d) => d !== id);
          localStorage.setItem('wedding_deleted_invitation_ids', JSON.stringify(updated));
        }
      } catch {
        // ignore
      }
    }
    const invitations = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, []);
    setLocal(STORAGE_KEYS.INVITATIONS, [newInv, ...invitations]);

    // Create fresh couples with NO carryover from demo data
    const couples = getLocal<Couple[]>(STORAGE_KEYS.COUPLES, []);
    const newBride: Couple = {
      id: 'bride-' + id,
      invitation_id: id,
      role: 'bride',
      nickname: params.bride_nickname,
      full_name: `${params.bride_nickname}`,
      father_name: '',
      mother_name: '',
      child_order: 'Putri',
      instagram: '',
      photo_url: preset.bridePhoto || '',
      description: 'Putri tercinta yang berbahagia.',
    };
    const newGroom: Couple = {
      id: 'groom-' + id,
      invitation_id: id,
      role: 'groom',
      nickname: params.groom_nickname,
      full_name: `${params.groom_nickname}`,
      father_name: '',
      mother_name: '',
      child_order: 'Putra',
      instagram: '',
      photo_url: preset.groomPhoto || '',
      description: 'Putra tercinta yang berbahagia.',
    };
    setLocal(STORAGE_KEYS.COUPLES, [...couples, newBride, newGroom]);

    // Fresh events for this wedding date
    const events = getLocal<WeddingEvent[]>(STORAGE_KEYS.EVENTS, []);
    const newEvents: WeddingEvent[] = [
      {
        id: 'event-1-' + id,
        invitation_id: id,
        title: 'Akad Nikah',
        event_type: 'akad',
        date: params.wedding_date || '2026-10-10',
        start_time: '08:00 WIB',
        end_time: '10:00 WIB',
        venue: 'Kediaman Mempelai / Masjid',
        address: 'Jl. Bahagia Menuju Pelaminan No. 1',
        maps_url: 'https://maps.google.com',
        description: 'Momen sakral pengucapan janji suci akad nikah.',
        sort_order: 1,
      },
      {
        id: 'event-2-' + id,
        invitation_id: id,
        title: 'Resepsi Pernikahan',
        event_type: 'reception',
        date: params.wedding_date || '2026-10-10',
        start_time: '11:00 WIB',
        end_time: '14:00 WIB',
        venue: 'Grand Ballroom / Gedung Serbaguna',
        address: 'Jl. Bahagia Menuju Pelaminan No. 1',
        maps_url: 'https://maps.google.com',
        description: 'Tasyakuran dan ramah tamah bersama keluarga dan sahabat tercinta.',
        sort_order: 2,
      },
    ];
    setLocal(STORAGE_KEYS.EVENTS, [...events, ...newEvents]);

    // Fresh stories matching template
    const stories = getLocal<StoryItem[]>(STORAGE_KEYS.STORIES, []);
    const newStories: StoryItem[] = [
      {
        id: 'story-1-' + id,
        invitation_id: id,
        year: 'Awal Bertemu',
        title: 'Pertemuan Pertama',
        description: 'Awal mula langkah cinta kami yang indah dan penuh kehangatan.',
        image_url: preset.storyImage1,
        sort_order: 1,
      },
      {
        id: 'story-2-' + id,
        invitation_id: id,
        year: 'Janji Suci',
        title: 'Menuju Pelaminan',
        description: 'Dengan restu kedua orang tua, kami mantap melangkah ke jenjang pernikahan.',
        image_url: preset.storyImage2,
        sort_order: 2,
      },
    ];
    setLocal(STORAGE_KEYS.STORIES, [...stories, ...newStories]);

    // Fresh gifts
    const gifts = getLocal<GiftAccount[]>(STORAGE_KEYS.GIFTS, []);
    const newGifts: GiftAccount[] = [
      {
        id: 'gift-1-' + id,
        invitation_id: id,
        type: 'bank',
        bank_name: 'BCA',
        account_number: '1234567890',
        account_name: `${params.groom_nickname} / ${params.bride_nickname}`,
        sort_order: 1,
      },
    ];
    setLocal(STORAGE_KEYS.GIFTS, [...gifts, ...newGifts]);

    // Fresh sections
    const sections = getLocal<SectionSetting[]>(STORAGE_KEYS.SECTIONS, []);
    const newSections = INITIAL_DEMO_DATA.sections.map((sec, idx) => ({
      ...sec,
      id: `sec-${idx + 1}-${id}`,
      invitation_id: id,
      sort_order: idx + 1,
    }));
    setLocal(STORAGE_KEYS.SECTIONS, [...sections, ...newSections]);

    // Push to Supabase if configured
    const client = getSupabaseClient();
    const supabaseStatus = {
      isConfigured: false,
      synced: false,
      error: null as string | null,
    };

    if (client) {
      supabaseStatus.isConfigured = true;
      try {
        let { error: invErr } = await client.from('invitations').upsert(cleanInvitationForSupabase(newInv));
        if (invErr && (invErr.code === 'PGRST125' || invErr.message.includes('Invalid path'))) {
          // Retry with fresh normalized client
          const freshClient = getSupabaseClient(true);
          if (freshClient) {
            const retryRes = await freshClient.from('invitations').upsert(cleanInvitationForSupabase(newInv));
            invErr = retryRes.error;
          }
        }
        if (invErr) {
          if (invErr.code === 'PGRST125' || invErr.message.includes('Invalid path')) {
            throw new Error('URL Supabase mengandung akhiran tidak valid (seperti /rest/v1). URL telah otomatis dirapikan.');
          }
          if (invErr.code === '42P01' || invErr.message.includes('relation "invitations" does not exist')) {
            throw new Error('Tabel "invitations" belum dibuat di Supabase. Harap buka Pengaturan Supabase > Tab "SQL Schema", lalu salin dan jalankan skripnya di SQL Editor dashboard Supabase Anda.');
          }
          throw new Error(`Gagal menyimpan undangan ke Supabase: ${invErr.message} (${invErr.code || ''})`);
        }

        const { error: coupleErr } = await client.from('couples').upsert([cleanCoupleForSupabase(newBride), cleanCoupleForSupabase(newGroom)]);
        if (coupleErr) console.warn('Supabase couples upsert warning:', coupleErr.message);

        const { error: eventErr } = await client.from('events').upsert(newEvents.map(cleanEventForSupabase));
        if (eventErr) console.warn('Supabase events upsert warning:', eventErr.message);

        const { error: storyErr } = await client.from('stories').upsert(newStories.map(cleanStoryForSupabase));
        if (storyErr) console.warn('Supabase stories upsert warning:', storyErr.message);

        const { error: giftErr } = await client.from('gifts').upsert(newGifts.map(cleanGiftForSupabase));
        if (giftErr) console.warn('Supabase gifts upsert warning:', giftErr.message);

        const { error: secErr } = await client.from('sections').upsert(newSections.map(cleanSectionForSupabase));
        if (secErr) console.warn('Supabase sections upsert warning:', secErr.message);

        supabaseStatus.synced = true;
      } catch (err: any) {
        console.error('Supabase createInvitation sync error:', err);
        supabaseStatus.error = err.message || 'Gagal menyimpan ke Supabase';
      }
    }

    return Object.assign(newInv, { _supabaseStatus: supabaseStatus });
  },

  async duplicateInvitation(
    sourceId: string,
    newTitle: string,
    newSlug: string,
    _options?: { copyPhotos?: boolean; copyGifts?: boolean }
  ): Promise<Invitation> {
    const source = await this.getFullInvitationData(sourceId);
    if (!source) throw new Error('Source invitation not found');

    const newId = 'inv-' + Math.random().toString(36).substring(2, 9);
    const newInv: Invitation = {
      ...source.invitation,
      id: newId,
      title: newTitle,
      slug: newSlug,
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Save invitation
    const invitations = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, []);
    setLocal(STORAGE_KEYS.INVITATIONS, [newInv, ...invitations]);

    // Copy Couples
    const couples = getLocal<Couple[]>(STORAGE_KEYS.COUPLES, []);
    const newBride: Couple = {
      ...source.bride,
      id: 'bride-' + newId,
      invitation_id: newId,
    };
    const newGroom: Couple = {
      ...source.groom,
      id: 'groom-' + newId,
      invitation_id: newId,
    };
    setLocal(STORAGE_KEYS.COUPLES, [...couples, newBride, newGroom]);

    // Copy Events
    const events = getLocal<WeddingEvent[]>(STORAGE_KEYS.EVENTS, []);
    const newEvents = source.events.map((e) => ({
      ...e,
      id: 'event-' + Math.random().toString(36).substring(2, 9),
      invitation_id: newId,
    }));
    setLocal(STORAGE_KEYS.EVENTS, [...events, ...newEvents]);

    // Copy Stories
    const stories = getLocal<StoryItem[]>(STORAGE_KEYS.STORIES, []);
    const newStories = source.stories.map((s) => ({
      ...s,
      id: 'story-' + Math.random().toString(36).substring(2, 9),
      invitation_id: newId,
    }));
    setLocal(STORAGE_KEYS.STORIES, [...stories, ...newStories]);

    // Copy Gallery
    const gallery = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, []);
    const newGallery = source.gallery.map((g) => ({
      ...g,
      id: 'gal-' + Math.random().toString(36).substring(2, 9),
      invitation_id: newId,
    }));
    setLocal(STORAGE_KEYS.GALLERY, [...gallery, ...newGallery]);

    // Copy Gifts
    const gifts = getLocal<GiftAccount[]>(STORAGE_KEYS.GIFTS, []);
    const newGifts = source.gifts.map((gf) => ({
      ...gf,
      id: 'gift-' + Math.random().toString(36).substring(2, 9),
      invitation_id: newId,
    }));
    setLocal(STORAGE_KEYS.GIFTS, [...gifts, ...newGifts]);

    // Copy Sections
    const sections = getLocal<SectionSetting[]>(STORAGE_KEYS.SECTIONS, []);
    const newSections = source.sections.map((sec) => ({
      ...sec,
      id: 'sec-' + Math.random().toString(36).substring(2, 9),
      invitation_id: newId,
    }));
    setLocal(STORAGE_KEYS.SECTIONS, [...sections, ...newSections]);

    // Sync to Supabase if configured
    const client = getSupabaseClient();
    if (client) {
      try {
        const { error: invErr } = await client.from('invitations').upsert(cleanInvitationForSupabase(newInv));
        if (invErr) console.warn('Supabase duplicate invitation error:', invErr.message);
        await client.from('couples').upsert([cleanCoupleForSupabase(newBride), cleanCoupleForSupabase(newGroom)]);
        await client.from('events').upsert(newEvents.map(cleanEventForSupabase));
        await client.from('stories').upsert(newStories.map(cleanStoryForSupabase));
        await client.from('gallery').upsert(newGallery.map(cleanGalleryForSupabase));
        await client.from('gifts').upsert(newGifts.map(cleanGiftForSupabase));
        await client.from('sections').upsert(newSections.map(cleanSectionForSupabase));
      } catch (err) {
        console.warn('Supabase duplicateInvitation sync failed:', err);
      }
    }

    return newInv;
  },

  async updateInvitation(id: string, updates: Partial<Invitation>): Promise<Invitation> {
    initializeLocalStorage();
    const invitations = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, []);
    const index = invitations.findIndex((inv) => inv.id === id);

    let updated: Invitation;
    if (index === -1) {
      const existing = await this.getInvitationById(id);
      if (existing) {
        updated = {
          ...existing.invitation,
          ...updates,
          updated_at: new Date().toISOString(),
        };
        setLocal(STORAGE_KEYS.INVITATIONS, [updated, ...invitations]);
      } else {
        throw new Error('Invitation not found');
      }
    } else {
      updated = {
        ...invitations[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      invitations[index] = updated;
      setLocal(STORAGE_KEYS.INVITATIONS, invitations);
    }

    const client = getSupabaseClient();
    if (client) {
      try {
        const { error } = await client.from('invitations').upsert(cleanInvitationForSupabase(updated));
        if (error) {
          console.error('Supabase updateInvitation error:', error);
        }
      } catch (err) {
        console.warn('Supabase updateInvitation sync failed:', err);
      }
    }

    return updated;
  },

  async deleteInvitation(id: string): Promise<void> {
    initializeLocalStorage();

    // 1. Record ID in deleted list so it will never be auto-seeded or resurrected
    const rawDeleted = localStorage.getItem('wedding_deleted_invitation_ids');
    let deletedIds: string[] = [];
    try {
      deletedIds = rawDeleted ? JSON.parse(rawDeleted) : [];
    } catch {
      deletedIds = [];
    }
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
      localStorage.setItem('wedding_deleted_invitation_ids', JSON.stringify(deletedIds));
    }

    // 2. Remove invitation from local storage
    const invitations = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, []);
    const remainingInvs = invitations.filter((i) => i.id !== id);
    setLocal(STORAGE_KEYS.INVITATIONS, remainingInvs);

    // 3. Clean up associated child records locally
    setLocal(STORAGE_KEYS.COUPLES, getLocal<Couple[]>(STORAGE_KEYS.COUPLES, []).filter((c) => c.invitation_id !== id));
    setLocal(STORAGE_KEYS.EVENTS, getLocal<WeddingEvent[]>(STORAGE_KEYS.EVENTS, []).filter((e) => e.invitation_id !== id));
    setLocal(STORAGE_KEYS.STORIES, getLocal<StoryItem[]>(STORAGE_KEYS.STORIES, []).filter((s) => s.invitation_id !== id));
    setLocal(STORAGE_KEYS.GALLERY, getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, []).filter((g) => g.invitation_id !== id));
    setLocal(STORAGE_KEYS.GIFTS, getLocal<GiftAccount[]>(STORAGE_KEYS.GIFTS, []).filter((g) => g.invitation_id !== id));
    setLocal(STORAGE_KEYS.SECTIONS, getLocal<SectionSetting[]>(STORAGE_KEYS.SECTIONS, []).filter((s) => s.invitation_id !== id));
    setLocal(STORAGE_KEYS.GUESTS, getLocal<Guest[]>(STORAGE_KEYS.GUESTS, []).filter((g) => g.invitation_id !== id));
    setLocal(STORAGE_KEYS.RSVPS, getLocal<RSVP[]>(STORAGE_KEYS.RSVPS, []).filter((r) => r.invitation_id !== id));
    setLocal(STORAGE_KEYS.WISHES, getLocal<Wish[]>(STORAGE_KEYS.WISHES, []).filter((w) => w.invitation_id !== id));

    // 4. Delete from Supabase if connected (delete child records first to satisfy foreign key constraints)
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('wishes').delete().eq('invitation_id', id);
        await client.from('rsvps').delete().eq('invitation_id', id);
        await client.from('guests').delete().eq('invitation_id', id);
        await client.from('sections').delete().eq('invitation_id', id);
        await client.from('gifts').delete().eq('invitation_id', id);
        await client.from('gallery').delete().eq('invitation_id', id);
        await client.from('stories').delete().eq('invitation_id', id);
        await client.from('events').delete().eq('invitation_id', id);
        await client.from('couples').delete().eq('invitation_id', id);
        const { error } = await client.from('invitations').delete().eq('id', id);
        if (error) {
          console.error('Supabase delete invitation error:', error);
        }
      } catch (err) {
        console.warn('Supabase deleteInvitation failed:', err);
      }
    }
  },

  // Apply template & matching presets
  async applyTemplateToInvitation(
    invitationId: string,
    templateId: TemplateId,
    applyColorsAndMedia = true
  ): Promise<Invitation> {
    const preset = getTemplatePreset(templateId);
    const updates: Partial<Invitation> = {
      template_id: templateId,
    };

    if (applyColorsAndMedia) {
      updates.theme_config = preset.theme_config;
      updates.music_url = preset.music_url;
      updates.music_title = preset.music_title;
      updates.music_artist = preset.music_artist;
      updates.cover_image = preset.cover_image;
      updates.hero_image = preset.hero_image;
      updates.events_image = preset.events_image;
      updates.closing_image = preset.closing_image;
    }

    return this.updateInvitation(invitationId, updates);
  },

  // Couple
  async updateCouple(invitationId: string, role: 'bride' | 'groom', updates: Partial<Couple>): Promise<Couple> {
    initializeLocalStorage();
    const couples = getLocal<Couple[]>(STORAGE_KEYS.COUPLES, []);
    const index = couples.findIndex((c) => c.invitation_id === invitationId && c.role === role);

    let updatedCouple: Couple;
    if (index === -1) {
      updatedCouple = {
        id: `${role}-${invitationId}`,
        invitation_id: invitationId,
        role,
        nickname: updates.nickname || (role === 'bride' ? 'Mempelai Wanita' : 'Mempelai Pria'),
        full_name: updates.full_name || '',
        father_name: updates.father_name || '',
        mother_name: updates.mother_name || '',
        child_order: updates.child_order || (role === 'bride' ? 'Putri' : 'Putra'),
        instagram: updates.instagram || '',
        photo_url: updates.photo_url || '',
        description: updates.description || '',
        ...updates,
      };
      couples.push(updatedCouple);
    } else {
      updatedCouple = { ...couples[index], ...updates };
      couples[index] = updatedCouple;
    }
    setLocal(STORAGE_KEYS.COUPLES, couples);

    // Sync to Supabase if configured
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('couples').upsert(updatedCouple);
      } catch (err) {
        console.warn('Supabase updateCouple sync failed:', err);
      }
    }

    return updatedCouple;
  },

  // Events
  async updateEvents(invitationId: string, events: WeddingEvent[]): Promise<WeddingEvent[]> {
    initializeLocalStorage();
    const allEvents = getLocal<WeddingEvent[]>(STORAGE_KEYS.EVENTS, []);
    const filtered = allEvents.filter((e) => e.invitation_id !== invitationId);
    const updated = [...filtered, ...events];
    setLocal(STORAGE_KEYS.EVENTS, updated);

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('events').delete().eq('invitation_id', invitationId);
        if (events.length > 0) {
          await client.from('events').upsert(events);
        }
      } catch (err) {
        console.warn('Supabase updateEvents sync failed:', err);
      }
    }

    return events;
  },

  // Stories
  async updateStories(invitationId: string, stories: StoryItem[]): Promise<StoryItem[]> {
    initializeLocalStorage();
    const allStories = getLocal<StoryItem[]>(STORAGE_KEYS.STORIES, []);
    const filtered = allStories.filter((s) => s.invitation_id !== invitationId);
    const updated = [...filtered, ...stories];
    setLocal(STORAGE_KEYS.STORIES, updated);

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('stories').delete().eq('invitation_id', invitationId);
        if (stories.length > 0) {
          await client.from('stories').upsert(stories);
        }
      } catch (err) {
        console.warn('Supabase updateStories sync failed:', err);
      }
    }

    return stories;
  },

  // Gallery
  async updateGallery(invitationId: string, gallery: GalleryItem[]): Promise<GalleryItem[]> {
    initializeLocalStorage();
    const allGallery = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, []);
    const filtered = allGallery.filter((g) => g.invitation_id !== invitationId);
    const updated = [...filtered, ...gallery];
    setLocal(STORAGE_KEYS.GALLERY, updated);

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('gallery').delete().eq('invitation_id', invitationId);
        if (gallery.length > 0) {
          await client.from('gallery').upsert(gallery);
        }
      } catch (err) {
        console.warn('Supabase updateGallery sync failed:', err);
      }
    }

    return gallery;
  },

  // Gifts
  async updateGifts(invitationId: string, gifts: GiftAccount[]): Promise<GiftAccount[]> {
    initializeLocalStorage();
    const allGifts = getLocal<GiftAccount[]>(STORAGE_KEYS.GIFTS, []);
    const filtered = allGifts.filter((g) => g.invitation_id !== invitationId);
    const updated = [...filtered, ...gifts];
    setLocal(STORAGE_KEYS.GIFTS, updated);

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('gifts').delete().eq('invitation_id', invitationId);
        if (gifts.length > 0) {
          await client.from('gifts').upsert(gifts);
        }
      } catch (err) {
        console.warn('Supabase updateGifts sync failed:', err);
      }
    }

    return gifts;
  },

  // Sections
  async updateSections(invitationId: string, sections: SectionSetting[]): Promise<SectionSetting[]> {
    initializeLocalStorage();
    const allSections = getLocal<SectionSetting[]>(STORAGE_KEYS.SECTIONS, []);
    const filtered = allSections.filter((s) => s.invitation_id !== invitationId);
    const updated = [...filtered, ...sections];
    setLocal(STORAGE_KEYS.SECTIONS, updated);

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('sections').delete().eq('invitation_id', invitationId);
        if (sections.length > 0) {
          await client.from('sections').upsert(sections);
        }
      } catch (err) {
        console.warn('Supabase updateSections sync failed:', err);
      }
    }

    return sections;
  },

  // Guests
  async getGuests(invitationId: string): Promise<Guest[]> {
    initializeLocalStorage();
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('guests')
          .select('*')
          .eq('invitation_id', invitationId)
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase getGuests error:', err);
      }
    }
    const isDemo = invitationId === INITIAL_DEMO_INVITATION_ID;
    const guests = getLocal<Guest[]>(STORAGE_KEYS.GUESTS, isDemo ? INITIAL_DEMO_GUESTS : []);
    return guests.filter((g) => g.invitation_id === invitationId);
  },

  async addGuest(
    invitationIdOrParams:
      | string
      | {
          invitation_id: string;
          name: string;
          guest_code?: string;
          category?: string;
          max_guests?: number;
        },
    guestData?: {
      name: string;
      category?: string;
      max_guests?: number;
      guest_code?: string;
    }
  ): Promise<Guest> {
    initializeLocalStorage();
    let invitationId = '';
    let name = '';
    let guestCode = '';
    let category = 'Keluarga';
    let maxGuests = 2;

    if (typeof invitationIdOrParams === 'string') {
      invitationId = invitationIdOrParams;
      name = guestData?.name || '';
      category = guestData?.category || 'Keluarga';
      maxGuests = guestData?.max_guests || 2;
      guestCode =
        guestData?.guest_code ||
        name.toLowerCase().replace(/[^a-z0-9]/g, '') + '-' + Math.random().toString(36).substring(2, 6);
    } else {
      invitationId = invitationIdOrParams.invitation_id;
      name = invitationIdOrParams.name;
      category = invitationIdOrParams.category || 'Keluarga';
      maxGuests = invitationIdOrParams.max_guests || 2;
      guestCode =
        invitationIdOrParams.guest_code ||
        name.toLowerCase().replace(/[^a-z0-9]/g, '') + '-' + Math.random().toString(36).substring(2, 6);
    }

    const guests = getLocal<Guest[]>(STORAGE_KEYS.GUESTS, []);
    const newGuest: Guest = {
      id: 'guest-' + Math.random().toString(36).substring(2, 9),
      invitation_id: invitationId,
      name: name,
      guest_code: guestCode,
      category: category,
      max_guests: maxGuests,
      has_opened: false,
      created_at: new Date().toISOString(),
    };
    guests.unshift(newGuest);
    setLocal(STORAGE_KEYS.GUESTS, guests);

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('guests').insert(newGuest);
      } catch (err) {
        console.warn('Supabase addGuest sync failed:', err);
      }
    }

    return newGuest;
  },

  async updateGuest(id: string, updates: Partial<Guest>): Promise<Guest> {
    initializeLocalStorage();
    const guests = getLocal<Guest[]>(STORAGE_KEYS.GUESTS, []);
    const idx = guests.findIndex((g) => g.id === id);
    if (idx === -1) throw new Error('Guest not found');
    const updated = { ...guests[idx], ...updates };
    guests[idx] = updated;
    setLocal(STORAGE_KEYS.GUESTS, guests);

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('guests').update(updates).eq('id', id);
      } catch (err) {
        console.warn('Supabase updateGuest sync failed:', err);
      }
    }

    return updated;
  },

  async deleteGuest(id: string): Promise<void> {
    initializeLocalStorage();
    const guests = getLocal<Guest[]>(STORAGE_KEYS.GUESTS, []);
    setLocal(
      STORAGE_KEYS.GUESTS,
      guests.filter((g) => g.id !== id)
    );

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('guests').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteGuest failed:', err);
      }
    }
  },

  async getGuestByCode(invitationId: string, code: string): Promise<Guest | null> {
    initializeLocalStorage();
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('guests')
          .select('*')
          .eq('invitation_id', invitationId)
          .eq('guest_code', code)
          .maybeSingle();
        if (!error && data) return data as Guest;
      } catch (err) {
        console.warn('Supabase getGuestByCode error:', err);
      }
    }
    const isDemo = invitationId === INITIAL_DEMO_INVITATION_ID;
    const guests = getLocal<Guest[]>(STORAGE_KEYS.GUESTS, isDemo ? INITIAL_DEMO_GUESTS : []);
    return guests.find((g) => g.invitation_id === invitationId && g.guest_code.toLowerCase() === code.toLowerCase()) || null;
  },

  async markGuestOpened(invitationId: string, guestCode: string): Promise<void> {
    initializeLocalStorage();
    const guests = getLocal<Guest[]>(STORAGE_KEYS.GUESTS, []);
    const target = guests.find(
      (g) => g.invitation_id === invitationId && g.guest_code.toLowerCase() === guestCode.toLowerCase()
    );
    if (target && !target.has_opened) {
      target.has_opened = true;
      target.opened_at = new Date().toISOString();
      setLocal(STORAGE_KEYS.GUESTS, guests);

      const client = getSupabaseClient();
      if (client) {
        try {
          await client
            .from('guests')
            .update({ has_opened: true, opened_at: target.opened_at })
            .eq('id', target.id);
        } catch (err) {
          console.warn('Supabase markGuestOpened sync failed:', err);
        }
      }
    }
  },

  // RSVP
  async submitRSVP(params: {
    invitation_id: string;
    guest_id?: string | null;
    guest_name: string;
    attendance: 'attending' | 'not_attending';
    guest_count: number;
    notes?: string;
    message?: string;
  }): Promise<RSVP> {
    initializeLocalStorage();
    const rsvps = getLocal<RSVP[]>(STORAGE_KEYS.RSVPS, INITIAL_DEMO_RSVPS);
    const newRSVP: RSVP = {
      id: 'rsvp-' + Math.random().toString(36).substring(2, 9),
      invitation_id: params.invitation_id,
      guest_id: params.guest_id || null,
      name: params.guest_name,
      attendance: params.attendance,
      pax: params.guest_count,
      notes: params.notes || '',
      created_at: new Date().toISOString(),
    };
    rsvps.unshift(newRSVP);
    setLocal(STORAGE_KEYS.RSVPS, rsvps);

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('rsvps').upsert(newRSVP);
      } catch (err) {
        console.warn('Supabase RSVP sync failed, fallback to local:', err);
      }
    }

    if (params.message && params.message.trim().length > 3) {
      await this.submitWish({
        invitation_id: params.invitation_id,
        guest_id: params.guest_id || null,
        guest_name: params.guest_name,
        message: params.message.trim(),
      });
    }

    return newRSVP;
  },

  async createRSVP(params: {
    invitation_id: string;
    guest_id?: string | null;
    guest_name: string;
    attendance: 'attending' | 'not_attending';
    guest_count: number;
    message?: string;
  }): Promise<RSVP> {
    return this.submitRSVP(params);
  },

  async getRSVPs(invitationId: string): Promise<RSVP[]> {
    initializeLocalStorage();
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('rsvps')
          .select('*')
          .eq('invitation_id', invitationId)
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase getRSVPs error:', err);
      }
    }
    const isDemo = invitationId === INITIAL_DEMO_INVITATION_ID;
    const rsvps = getLocal<RSVP[]>(STORAGE_KEYS.RSVPS, isDemo ? INITIAL_DEMO_RSVPS : []);
    return rsvps.filter((r) => r.invitation_id === invitationId);
  },

  // Wishes
  async submitWish(params: {
    invitation_id: string;
    guest_id?: string | null;
    guest_name: string;
    message: string;
  }): Promise<Wish> {
    initializeLocalStorage();
    const isDemo = params.invitation_id === INITIAL_DEMO_INVITATION_ID;
    const wishes = getLocal<Wish[]>(STORAGE_KEYS.WISHES, isDemo ? INITIAL_DEMO_DATA.wishes : []);
    const newWish: Wish = {
      id: 'wish-' + Math.random().toString(36).substring(2, 9),
      invitation_id: params.invitation_id,
      guest_id: params.guest_id || null,
      name: params.guest_name.trim(),
      message: params.message.trim(),
      status: 'approved',
      created_at: new Date().toISOString(),
    };
    wishes.unshift(newWish);
    setLocal(STORAGE_KEYS.WISHES, wishes);

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('wishes').insert(newWish);
      } catch (err) {
        console.warn('Supabase Wish sync failed, fallback to local:', err);
      }
    }

    return newWish;
  },

  async createWish(params: {
    invitation_id: string;
    guest_name: string;
    message: string;
    guest_id?: string | null;
  }): Promise<Wish> {
    return this.submitWish(params);
  },

  async getWishes(invitationId: string): Promise<Wish[]> {
    initializeLocalStorage();
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('wishes')
          .select('*')
          .eq('invitation_id', invitationId)
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase getWishes error:', err);
      }
    }
    const isDemo = invitationId === INITIAL_DEMO_INVITATION_ID;
    const wishes = getLocal<Wish[]>(STORAGE_KEYS.WISHES, isDemo ? INITIAL_DEMO_DATA.wishes : []);
    return wishes.filter((w) => w.invitation_id === invitationId);
  },

  async updateWishStatus(id: string, status: 'approved' | 'hidden' | 'pending'): Promise<Wish> {
    initializeLocalStorage();
    const wishes = getLocal<Wish[]>(STORAGE_KEYS.WISHES, []);
    const idx = wishes.findIndex((w) => w.id === id);
    if (idx === -1) throw new Error('Wish not found');
    wishes[idx].status = status;
    setLocal(STORAGE_KEYS.WISHES, wishes);

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('wishes').update({ status }).eq('id', id);
      } catch (err) {
        console.warn('Supabase updateWishStatus failed:', err);
      }
    }
    return wishes[idx];
  },

  async deleteWish(id: string): Promise<void> {
    initializeLocalStorage();
    const wishes = getLocal<Wish[]>(STORAGE_KEYS.WISHES, []);
    setLocal(
      STORAGE_KEYS.WISHES,
      wishes.filter((w) => w.id !== id)
    );

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('wishes').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteWish failed:', err);
      }
    }
  },

  // Stats
  async getStats() {
    initializeLocalStorage();
    const invitations = await this.getAllInvitations();
    const allGuests = getLocal<Guest[]>(STORAGE_KEYS.GUESTS, INITIAL_DEMO_GUESTS);
    const allRSVPs = getLocal<RSVP[]>(STORAGE_KEYS.RSVPS, INITIAL_DEMO_RSVPS);
    const allWishes = getLocal<Wish[]>(STORAGE_KEYS.WISHES, INITIAL_DEMO_DATA.wishes);

    const attending = allRSVPs.filter((r) => r.attendance === 'attending');
    const notAttending = allRSVPs.filter((r) => r.attendance === 'not_attending');
    const totalAttendanceCount = attending.reduce(
      (acc, curr) => acc + (curr.guest_count || curr.pax || 1),
      0
    );

    return {
      totalInvitations: invitations.length,
      totalGuests: allGuests.length,
      totalRSVPs: allRSVPs.length,
      attending: attending.length,
      notAttending: notAttending.length,
      totalAttendanceCount,
      totalWishes: allWishes.length,
    };
  },

  // Sync all local data into Supabase
  async syncAllLocalDataToSupabase(): Promise<{ success: boolean; message: string; count?: number }> {
    const client = getSupabaseClient();
    if (!client) {
      return {
        success: false,
        message: 'Supabase belum dikonfigurasi. Harap buka Pengaturan Supabase lalu masukkan URL & Anon Key project Anda.',
      };
    }

    try {
      // Gather all local invitations
      const invs = await this.getAllInvitations();
      const couples = getLocal<Couple[]>(STORAGE_KEYS.COUPLES, [INITIAL_DEMO_DATA.bride, INITIAL_DEMO_DATA.groom]);
      const events = getLocal<WeddingEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_DEMO_DATA.events);
      const stories = getLocal<StoryItem[]>(STORAGE_KEYS.STORIES, INITIAL_DEMO_DATA.stories);
      const gallery = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_DEMO_DATA.gallery);
      const gifts = getLocal<GiftAccount[]>(STORAGE_KEYS.GIFTS, INITIAL_DEMO_DATA.gifts);
      const sections = getLocal<SectionSetting[]>(STORAGE_KEYS.SECTIONS, INITIAL_DEMO_DATA.sections);
      const guests = getLocal<Guest[]>(STORAGE_KEYS.GUESTS, INITIAL_DEMO_GUESTS);
      const rsvps = getLocal<RSVP[]>(STORAGE_KEYS.RSVPS, INITIAL_DEMO_RSVPS);
      const wishes = getLocal<Wish[]>(STORAGE_KEYS.WISHES, INITIAL_DEMO_DATA.wishes);

      // Cleaned arrays matching Postgres schemas
      const cleanInvs = invs.map(cleanInvitationForSupabase);
      const cleanCouples = couples.map(cleanCoupleForSupabase);
      const cleanEvents = events.map(cleanEventForSupabase);
      const cleanStories = stories.map(cleanStoryForSupabase);
      const cleanGallery = gallery.map(cleanGalleryForSupabase);
      const cleanGifts = gifts.map(cleanGiftForSupabase);
      const cleanSections = sections.map(cleanSectionForSupabase);
      const cleanGuests = guests.map(cleanGuestForSupabase);
      const cleanRsvps = rsvps.map(cleanRsvpForSupabase);
      const cleanWishes = wishes.map(cleanWishForSupabase);

      // 1. Invitations (Parent Table)
      if (cleanInvs.length > 0) {
        let { error } = await client.from('invitations').upsert(cleanInvs);
        if (error && (error.code === 'PGRST125' || error.message.includes('Invalid path'))) {
          // Force refresh client with normalized URL and retry
          const freshClient = getSupabaseClient(true);
          if (freshClient) {
            const retryRes = await freshClient.from('invitations').upsert(cleanInvs);
            error = retryRes.error;
          }
        }
        if (error) {
          if (error.code === 'PGRST125' || error.message.includes('Invalid path')) {
            throw new Error('URL Supabase terdeteksi ada akhiran tidak valid (seperti /rest/v1 atau URL dashboard). URL telah kami rapikan otomatis. Silakan klik tombol "Sinkron ke Cloud" sekali lagi!');
          }
          if (error.code === '42P01' || error.message.includes('relation "invitations" does not exist')) {
            throw new Error('Tabel "invitations" belum dibuat di Supabase. Buka Pengaturan Supabase > tab "SQL Schema", lalu salin dan jalankan skripnya di SQL Editor dashboard Supabase Anda.');
          }
          throw new Error(`Gagal menyimpan tabel invitations: ${error.message} (${error.code || ''})`);
        }
      }

      // 2. Child Tables
      if (cleanCouples.length > 0) {
        const { error } = await client.from('couples').upsert(cleanCouples);
        if (error) throw new Error(`Tabel couples: ${error.message}`);
      }
      if (cleanEvents.length > 0) {
        const { error } = await client.from('events').upsert(cleanEvents);
        if (error) throw new Error(`Tabel events: ${error.message}`);
      }
      if (cleanStories.length > 0) {
        const { error } = await client.from('stories').upsert(cleanStories);
        if (error) throw new Error(`Tabel stories: ${error.message}`);
      }
      if (cleanGallery.length > 0) {
        const { error } = await client.from('gallery').upsert(cleanGallery);
        if (error) throw new Error(`Tabel gallery: ${error.message}`);
      }
      if (cleanGifts.length > 0) {
        const { error } = await client.from('gifts').upsert(cleanGifts);
        if (error) throw new Error(`Tabel gifts: ${error.message}`);
      }
      if (cleanSections.length > 0) {
        const { error } = await client.from('sections').upsert(cleanSections);
        if (error) throw new Error(`Tabel sections: ${error.message}`);
      }
      if (cleanGuests.length > 0) {
        const { error } = await client.from('guests').upsert(cleanGuests);
        if (error) throw new Error(`Tabel guests: ${error.message}`);
      }
      if (cleanRsvps.length > 0) {
        const { error } = await client.from('rsvps').upsert(cleanRsvps);
        if (error) throw new Error(`Tabel rsvps: ${error.message}`);
      }
      if (cleanWishes.length > 0) {
        const { error } = await client.from('wishes').upsert(cleanWishes);
        if (error) throw new Error(`Tabel wishes: ${error.message}`);
      }

      return {
        success: true,
        count: cleanInvs.length,
        message: `Sinkronisasi sukses! ${cleanInvs.length} undangan dan seluruh data terkait (${cleanCouples.length} mempelai, ${cleanEvents.length} acara, ${cleanGuests.length} tamu, ${cleanWishes.length} ucapan) telah berhasil disimpan ke database Supabase Cloud.`,
      };
    } catch (err: any) {
      console.error('syncAllLocalDataToSupabase error:', err);
      return {
        success: false,
        message: err.message || 'Gagal menyinkronkan data ke Supabase',
      };
    }
  },

  // Inspection helpers to see data stored in Supabase
  async getSupabaseTableSummary(): Promise<Record<string, number> | null> {
    const client = getSupabaseClient();
    if (!client) return null;
    const tables = ['invitations', 'couples', 'events', 'stories', 'gallery', 'gifts', 'sections', 'guests', 'rsvps', 'wishes'];
    const summary: Record<string, number> = {};
    for (const tbl of tables) {
      try {
        const { count, error } = await client.from(tbl).select('*', { count: 'exact', head: true });
        summary[tbl] = error ? 0 : (count ?? 0);
      } catch {
        summary[tbl] = 0;
      }
    }
    return summary;
  },

  async getSupabaseTableData(table: string, limit = 50): Promise<{ rows: any[]; error?: string }> {
    const client = getSupabaseClient();
    if (!client) return { rows: [], error: 'Supabase tidak terkoneksi' };
    try {
      const { data, error } = await client.from(table).select('*').limit(limit);
      if (error) {
        if (error.code === 'PGRST125' || error.message.includes('Invalid path')) {
          return {
            rows: [],
            error: 'Error PGRST125: Format URL Supabase mengandung path tidak valid (seperti /rest/v1). Buka menu Pengaturan Supabase untuk memperbaikinya.',
          };
        }
        return { rows: [], error: error.message };
      }
      return { rows: data || [] };
    } catch (err: any) {
      return { rows: [], error: err.message || 'Gagal mengambil data dari Supabase' };
    }
  },
};
