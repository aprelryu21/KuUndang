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
import { isSupabaseConfigured, supabase } from '../lib/supabase';

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

const DATA_VERSION = 'v3_april_siti';

// Helper for local storage initialization
function initializeLocalStorage() {
  if (typeof window === 'undefined') return;

  const currentVersion = localStorage.getItem('wedding_studio_data_version');
  const hasInvs = localStorage.getItem(STORAGE_KEYS.INVITATIONS);

  if (!hasInvs || currentVersion !== DATA_VERSION) {
    localStorage.setItem(STORAGE_KEYS.INVITATIONS, JSON.stringify([INITIAL_DEMO_DATA.invitation]));
    localStorage.setItem(STORAGE_KEYS.COUPLES, JSON.stringify([INITIAL_DEMO_DATA.bride, INITIAL_DEMO_DATA.groom]));
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_DEMO_DATA.events));
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(INITIAL_DEMO_DATA.stories));
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_DEMO_DATA.gallery));
    localStorage.setItem(STORAGE_KEYS.GIFTS, JSON.stringify(INITIAL_DEMO_DATA.gifts));
    localStorage.setItem(STORAGE_KEYS.SECTIONS, JSON.stringify(INITIAL_DEMO_DATA.sections));
    localStorage.setItem(STORAGE_KEYS.GUESTS, JSON.stringify(INITIAL_DEMO_GUESTS));
    localStorage.setItem(STORAGE_KEYS.RSVPS, JSON.stringify(INITIAL_DEMO_RSVPS));
    localStorage.setItem(STORAGE_KEYS.WISHES, JSON.stringify(INITIAL_DEMO_DATA.wishes));
    localStorage.setItem('wedding_studio_data_version', DATA_VERSION);
  }
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
    window.dispatchEvent(new Event('wedding_studio_updated'));
  } catch (e) {
    console.error('Error writing to localStorage key:', key, e);
  }
}

export const weddingService = {
  // Ensure seed is in place
  init(): void {
    initializeLocalStorage();
  },

  async getAllInvitations(): Promise<Invitation[]> {
    initializeLocalStorage();
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('invitations')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local:', err);
      }
    }
    return getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, [INITIAL_DEMO_DATA.invitation]);
  },

  async getInvitationBySlug(slug: string): Promise<FullInvitationData | null> {
    initializeLocalStorage();
    const invitations = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, [INITIAL_DEMO_DATA.invitation]);
    const invitation =
      invitations.find((inv) => inv.slug === slug) ||
      (slug === 'shofwan-allya' || slug === 'april-siti' ? invitations[0] : null);
    if (!invitation) return null;

    return this.getFullInvitationData(invitation.id, invitation);
  },

  async getInvitationById(id: string): Promise<FullInvitationData | null> {
    initializeLocalStorage();
    const invitations = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, [INITIAL_DEMO_DATA.invitation]);
    const invitation = invitations.find((inv) => inv.id === id);
    if (!invitation) return null;

    return this.getFullInvitationData(invitation.id, invitation);
  },

  async getFullInvitationData(id: string, cachedInv?: Invitation): Promise<FullInvitationData | null> {
    const invitations = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, [INITIAL_DEMO_DATA.invitation]);
    const invitation = cachedInv || invitations.find((inv) => inv.id === id);
    if (!invitation) return null;

    const couples = getLocal<Couple[]>(STORAGE_KEYS.COUPLES, [INITIAL_DEMO_DATA.bride, INITIAL_DEMO_DATA.groom]);
    const invCouples = couples.filter((c) => c.invitation_id === id);
    const bride = invCouples.find((c) => c.role === 'bride') || {
      ...INITIAL_DEMO_DATA.bride,
      invitation_id: id,
      nickname: invitation.bride_nickname,
      full_name: INITIAL_DEMO_DATA.bride.full_name,
    };
    const groom = invCouples.find((c) => c.role === 'groom') || {
      ...INITIAL_DEMO_DATA.groom,
      invitation_id: id,
      nickname: invitation.groom_nickname,
      full_name: INITIAL_DEMO_DATA.groom.full_name,
    };

    const events = getLocal<WeddingEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_DEMO_DATA.events)
      .filter((e) => e.invitation_id === id)
      .sort((a, b) => a.sort_order - b.sort_order);

    const stories = getLocal<StoryItem[]>(STORAGE_KEYS.STORIES, INITIAL_DEMO_DATA.stories)
      .filter((s) => s.invitation_id === id)
      .sort((a, b) => a.sort_order - b.sort_order);

    const gallery = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_DEMO_DATA.gallery)
      .filter((g) => g.invitation_id === id)
      .sort((a, b) => a.sort_order - b.sort_order);

    const gifts = getLocal<GiftAccount[]>(STORAGE_KEYS.GIFTS, INITIAL_DEMO_DATA.gifts)
      .filter((g) => g.invitation_id === id)
      .sort((a, b) => a.sort_order - b.sort_order);

    const sections = getLocal<SectionSetting[]>(STORAGE_KEYS.SECTIONS, INITIAL_DEMO_DATA.sections)
      .filter((sec) => sec.invitation_id === id)
      .sort((a, b) => a.sort_order - b.sort_order);

    const wishes = getLocal<Wish[]>(STORAGE_KEYS.WISHES, INITIAL_DEMO_DATA.wishes)
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
    template_id?: 'royal-arch' | 'persona-5';
    theme_config?: Partial<ThemeConfig>;
  }): Promise<Invitation> {
    initializeLocalStorage();
    const id = 'inv-' + Math.random().toString(36).substring(2, 9);
    const newInv: Invitation = {
      id,
      template_id: params.template_id || 'royal-arch',
      title: params.title || `The Wedding of ${params.groom_nickname} & ${params.bride_nickname}`,
      slug: params.slug || `${params.groom_nickname.toLowerCase()}-${params.bride_nickname.toLowerCase()}`,
      wedding_date: params.wedding_date || '2026-10-10',
      status: 'draft',
      opening_title: 'THE WEDDING OF',
      bride_nickname: params.bride_nickname,
      groom_nickname: params.groom_nickname,
      greeting_text: "We're so happy you're here ♡",
      hero_quote: 'Two souls, one heart, a lifetime of memories ahead.',
      closing_message: 'It would mean the world to have you with us on our special day.',
      closing_subtext: 'Eat, laugh, dance, repeat. ♡',
      cover_image: INITIAL_DEMO_DATA.invitation.cover_image,
      hero_image: INITIAL_DEMO_DATA.invitation.hero_image,
      events_image: INITIAL_DEMO_DATA.invitation.events_image,
      closing_image: INITIAL_DEMO_DATA.invitation.closing_image,
      music_url: INITIAL_DEMO_DATA.invitation.music_url,
      music_title: INITIAL_DEMO_DATA.invitation.music_title,
      music_artist: INITIAL_DEMO_DATA.invitation.music_artist,
      music_enabled: true,
      theme_config: {
        ...INITIAL_DEMO_DATA.invitation.theme_config,
        ...(params.theme_config || {}),
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Save invitation
    const invitations = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, []);
    setLocal(STORAGE_KEYS.INVITATIONS, [newInv, ...invitations]);

    // Create couples
    const couples = getLocal<Couple[]>(STORAGE_KEYS.COUPLES, []);
    const newBride: Couple = {
      ...INITIAL_DEMO_DATA.bride,
      id: 'bride-' + Math.random().toString(36).substring(2, 9),
      invitation_id: id,
      nickname: params.bride_nickname,
      full_name: `${params.bride_nickname} Putri`,
    };
    const newGroom: Couple = {
      ...INITIAL_DEMO_DATA.groom,
      id: 'groom-' + Math.random().toString(36).substring(2, 9),
      invitation_id: id,
      nickname: params.groom_nickname,
      full_name: `${params.groom_nickname} Pratama`,
    };
    setLocal(STORAGE_KEYS.COUPLES, [...couples, newBride, newGroom]);

    // Copy default events, stories, gifts, sections
    const events = getLocal<WeddingEvent[]>(STORAGE_KEYS.EVENTS, []);
    const newEvents = INITIAL_DEMO_DATA.events.map((e, idx) => ({
      ...e,
      id: 'event-' + Math.random().toString(36).substring(2, 9),
      invitation_id: id,
      date: params.wedding_date,
      sort_order: idx + 1,
    }));
    setLocal(STORAGE_KEYS.EVENTS, [...events, ...newEvents]);

    const stories = getLocal<StoryItem[]>(STORAGE_KEYS.STORIES, []);
    const newStories = INITIAL_DEMO_DATA.stories.map((s, idx) => ({
      ...s,
      id: 'story-' + Math.random().toString(36).substring(2, 9),
      invitation_id: id,
      sort_order: idx + 1,
    }));
    setLocal(STORAGE_KEYS.STORIES, [...stories, ...newStories]);

    const gallery = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, []);
    const newGallery = INITIAL_DEMO_DATA.gallery.map((g, idx) => ({
      ...g,
      id: 'gal-' + Math.random().toString(36).substring(2, 9),
      invitation_id: id,
      sort_order: idx + 1,
    }));
    setLocal(STORAGE_KEYS.GALLERY, [...gallery, ...newGallery]);

    const gifts = getLocal<GiftAccount[]>(STORAGE_KEYS.GIFTS, []);
    const newGifts = INITIAL_DEMO_DATA.gifts.map((gf, idx) => ({
      ...gf,
      id: 'gift-' + Math.random().toString(36).substring(2, 9),
      invitation_id: id,
      sort_order: idx + 1,
    }));
    setLocal(STORAGE_KEYS.GIFTS, [...gifts, ...newGifts]);

    const sections = getLocal<SectionSetting[]>(STORAGE_KEYS.SECTIONS, []);
    const newSections = INITIAL_DEMO_DATA.sections.map((sec, idx) => ({
      ...sec,
      id: 'sec-' + Math.random().toString(36).substring(2, 9),
      invitation_id: id,
      sort_order: idx + 1,
    }));
    setLocal(STORAGE_KEYS.SECTIONS, [...sections, ...newSections]);

    return newInv;
  },

  async duplicateInvitation(
    sourceId: string,
    newTitle: string,
    newSlug: string,
    options?: { copyPhotos?: boolean; copyGifts?: boolean }
  ): Promise<Invitation> {
    initializeLocalStorage();
    const source = await this.getInvitationById(sourceId);
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

    const invitations = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, []);
    setLocal(STORAGE_KEYS.INVITATIONS, [newInv, ...invitations]);

    // Copy Couples
    const couples = getLocal<Couple[]>(STORAGE_KEYS.COUPLES, []);
    const newBride = {
      ...source.bride,
      id: 'bride-' + Math.random().toString(36).substring(2, 9),
      invitation_id: newId,
    };
    const newGroom = {
      ...source.groom,
      id: 'groom-' + Math.random().toString(36).substring(2, 9),
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

    // Copy Gallery if opted
    if (options?.copyPhotos !== false) {
      const gallery = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, []);
      const newGallery = source.gallery.map((g) => ({
        ...g,
        id: 'gal-' + Math.random().toString(36).substring(2, 9),
        invitation_id: newId,
      }));
      setLocal(STORAGE_KEYS.GALLERY, [...gallery, ...newGallery]);
    }

    // Copy Gifts if opted
    if (options?.copyGifts !== false) {
      const gifts = getLocal<GiftAccount[]>(STORAGE_KEYS.GIFTS, []);
      const newGifts = source.gifts.map((gf) => ({
        ...gf,
        id: 'gift-' + Math.random().toString(36).substring(2, 9),
        invitation_id: newId,
      }));
      setLocal(STORAGE_KEYS.GIFTS, [...gifts, ...newGifts]);
    }

    // Copy Sections
    const sections = getLocal<SectionSetting[]>(STORAGE_KEYS.SECTIONS, []);
    const newSections = source.sections.map((sec) => ({
      ...sec,
      id: 'sec-' + Math.random().toString(36).substring(2, 9),
      invitation_id: newId,
    }));
    setLocal(STORAGE_KEYS.SECTIONS, [...sections, ...newSections]);

    return newInv;
  },

  async updateInvitation(id: string, updates: Partial<Invitation>): Promise<Invitation> {
    initializeLocalStorage();
    const invitations = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, []);
    const index = invitations.findIndex((inv) => inv.id === id);
    if (index === -1) throw new Error('Invitation not found');

    const updated: Invitation = {
      ...invitations[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    invitations[index] = updated;
    setLocal(STORAGE_KEYS.INVITATIONS, invitations);
    return updated;
  },

  async updateCouple(invitationId: string, role: 'bride' | 'groom', updates: Partial<Couple>): Promise<Couple> {
    initializeLocalStorage();
    const couples = getLocal<Couple[]>(STORAGE_KEYS.COUPLES, []);
    const index = couples.findIndex((c) => c.invitation_id === invitationId && c.role === role);

    if (index === -1) {
      const newCouple: Couple = {
        id: role + '-' + Math.random().toString(36).substring(2, 9),
        invitation_id: invitationId,
        role,
        nickname: updates.nickname || (role === 'bride' ? 'Allya' : 'Shofwan'),
        full_name: updates.full_name || '',
        father_name: updates.father_name || '',
        mother_name: updates.mother_name || '',
        child_order: updates.child_order || '',
        instagram: updates.instagram || '',
        photo_url: updates.photo_url || '',
        description: updates.description || '',
        ...updates,
      };
      setLocal(STORAGE_KEYS.COUPLES, [...couples, newCouple]);
      return newCouple;
    }

    const updated: Couple = { ...couples[index], ...updates };
    couples[index] = updated;
    setLocal(STORAGE_KEYS.COUPLES, couples);
    return updated;
  },

  async updateEvents(invitationId: string, updatedEvents: WeddingEvent[]): Promise<WeddingEvent[]> {
    initializeLocalStorage();
    const all = getLocal<WeddingEvent[]>(STORAGE_KEYS.EVENTS, []);
    const filtered = all.filter((e) => e.invitation_id !== invitationId);
    const withIds = updatedEvents.map((e, idx) => ({
      ...e,
      id: e.id || 'event-' + Math.random().toString(36).substring(2, 9),
      invitation_id: invitationId,
      sort_order: idx + 1,
    }));
    setLocal(STORAGE_KEYS.EVENTS, [...filtered, ...withIds]);
    return withIds;
  },

  async updateStories(invitationId: string, updatedStories: StoryItem[]): Promise<StoryItem[]> {
    initializeLocalStorage();
    const all = getLocal<StoryItem[]>(STORAGE_KEYS.STORIES, []);
    const filtered = all.filter((s) => s.invitation_id !== invitationId);
    const withIds = updatedStories.map((s, idx) => ({
      ...s,
      id: s.id || 'story-' + Math.random().toString(36).substring(2, 9),
      invitation_id: invitationId,
      sort_order: idx + 1,
    }));
    setLocal(STORAGE_KEYS.STORIES, [...filtered, ...withIds]);
    return withIds;
  },

  async updateGallery(invitationId: string, updatedGallery: GalleryItem[]): Promise<GalleryItem[]> {
    initializeLocalStorage();
    const all = getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, []);
    const filtered = all.filter((g) => g.invitation_id !== invitationId);
    const withIds = updatedGallery.map((g, idx) => ({
      ...g,
      id: g.id || 'gal-' + Math.random().toString(36).substring(2, 9),
      invitation_id: invitationId,
      sort_order: idx + 1,
    }));
    setLocal(STORAGE_KEYS.GALLERY, [...filtered, ...withIds]);
    return withIds;
  },

  async updateGifts(invitationId: string, updatedGifts: GiftAccount[]): Promise<GiftAccount[]> {
    initializeLocalStorage();
    const all = getLocal<GiftAccount[]>(STORAGE_KEYS.GIFTS, []);
    const filtered = all.filter((g) => g.invitation_id !== invitationId);
    const withIds = updatedGifts.map((g, idx) => ({
      ...g,
      id: g.id || 'gift-' + Math.random().toString(36).substring(2, 9),
      invitation_id: invitationId,
      sort_order: idx + 1,
    }));
    setLocal(STORAGE_KEYS.GIFTS, [...filtered, ...withIds]);
    return withIds;
  },

  async updateSections(invitationId: string, updatedSections: SectionSetting[]): Promise<SectionSetting[]> {
    initializeLocalStorage();
    const all = getLocal<SectionSetting[]>(STORAGE_KEYS.SECTIONS, []);
    const filtered = all.filter((s) => s.invitation_id !== invitationId);
    const withIds = updatedSections.map((s, idx) => ({
      ...s,
      id: s.id || 'sec-' + Math.random().toString(36).substring(2, 9),
      invitation_id: invitationId,
      sort_order: idx + 1,
    }));
    setLocal(STORAGE_KEYS.SECTIONS, [...filtered, ...withIds]);
    return withIds;
  },

  async deleteInvitation(id: string): Promise<boolean> {
    initializeLocalStorage();
    const invitations = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, []);
    const filtered = invitations.filter((inv) => inv.id !== id);
    setLocal(STORAGE_KEYS.INVITATIONS, filtered);
    return true;
  },

  // Guests
  async getGuests(invitationId: string): Promise<Guest[]> {
    initializeLocalStorage();
    const guests = getLocal<Guest[]>(STORAGE_KEYS.GUESTS, INITIAL_DEMO_GUESTS);
    return guests.filter((g) => g.invitation_id === invitationId);
  },

  async getGuestByCode(invitationId: string, code: string): Promise<Guest | null> {
    initializeLocalStorage();
    const guests = getLocal<Guest[]>(STORAGE_KEYS.GUESTS, INITIAL_DEMO_GUESTS);
    const found = guests.find(
      (g) => g.invitation_id === invitationId && g.guest_code.toLowerCase() === code.toLowerCase()
    );
    return found || null;
  },

  async addGuest(
    invitationId: string,
    guestData: { name: string; category?: string; max_guests?: number; guest_code?: string }
  ): Promise<Guest> {
    initializeLocalStorage();
    const guests = getLocal<Guest[]>(STORAGE_KEYS.GUESTS, INITIAL_DEMO_GUESTS);
    const generatedCode = guestData.guest_code || Math.random().toString(36).substring(2, 8);
    const newGuest: Guest = {
      id: 'guest-' + Math.random().toString(36).substring(2, 9),
      invitation_id: invitationId,
      name: guestData.name.trim(),
      category: guestData.category || 'Umum',
      max_guests: guestData.max_guests || 2,
      guest_code: generatedCode,
      opened_at: null,
      created_at: new Date().toISOString(),
    };
    setLocal(STORAGE_KEYS.GUESTS, [newGuest, ...guests]);
    return newGuest;
  },

  async deleteGuest(id: string): Promise<boolean> {
    initializeLocalStorage();
    const guests = getLocal<Guest[]>(STORAGE_KEYS.GUESTS, INITIAL_DEMO_GUESTS);
    const filtered = guests.filter((g) => g.id !== id);
    setLocal(STORAGE_KEYS.GUESTS, filtered);
    return true;
  },

  async markGuestOpened(invitationId: string, code: string): Promise<void> {
    initializeLocalStorage();
    const guests = getLocal<Guest[]>(STORAGE_KEYS.GUESTS, INITIAL_DEMO_GUESTS);
    const index = guests.findIndex(
      (g) => g.invitation_id === invitationId && g.guest_code.toLowerCase() === code.toLowerCase()
    );
    if (index !== -1 && !guests[index].opened_at) {
      guests[index].opened_at = new Date().toISOString();
      setLocal(STORAGE_KEYS.GUESTS, guests);
    }
  },

  // RSVP
  async submitRSVP(params: {
    invitation_id: string;
    guest_id?: string | null;
    guest_name: string;
    attendance: 'attending' | 'not_attending';
    guest_count: number;
    message?: string;
  }): Promise<RSVP> {
    initializeLocalStorage();
    const rsvps = getLocal<RSVP[]>(STORAGE_KEYS.RSVPS, INITIAL_DEMO_RSVPS);

    // Prevent duplicate spam from same guest
    const existingIndex = rsvps.findIndex(
      (r) =>
        r.invitation_id === params.invitation_id &&
        ((params.guest_id && r.guest_id === params.guest_id) ||
          r.guest_name.toLowerCase().trim() === params.guest_name.toLowerCase().trim())
    );

    const newRSVP: RSVP = {
      id: 'rsvp-' + Math.random().toString(36).substring(2, 9),
      invitation_id: params.invitation_id,
      guest_id: params.guest_id || null,
      guest_name: params.guest_name.trim(),
      attendance: params.attendance,
      guest_count: params.attendance === 'attending' ? Math.max(1, params.guest_count) : 0,
      message: params.message?.trim(),
      created_at: new Date().toISOString(),
    };

    if (existingIndex !== -1) {
      rsvps[existingIndex] = newRSVP;
    } else {
      rsvps.unshift(newRSVP);
    }

    setLocal(STORAGE_KEYS.RSVPS, rsvps);

    // If message provided, also create a wish
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

  // Alias for RSVP submission
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
    const rsvps = getLocal<RSVP[]>(STORAGE_KEYS.RSVPS, INITIAL_DEMO_RSVPS);
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
    const wishes = getLocal<Wish[]>(STORAGE_KEYS.WISHES, INITIAL_DEMO_DATA.wishes);
    const newWish: Wish = {
      id: 'wish-' + Math.random().toString(36).substring(2, 9),
      invitation_id: params.invitation_id,
      guest_id: params.guest_id || null,
      guest_name: params.guest_name.trim(),
      message: params.message.trim(),
      status: 'approved', // default approved for delight, can be moderated in admin
      created_at: new Date().toISOString(),
    };
    wishes.unshift(newWish);
    setLocal(STORAGE_KEYS.WISHES, wishes);
    return newWish;
  },

  // Alias for wish submission
  async createWish(params: {
    invitation_id: string;
    guest_id?: string | null;
    guest_name: string;
    message: string;
  }): Promise<Wish> {
    return this.submitWish(params);
  },

  async getWishes(invitationId: string, onlyApproved: boolean = true): Promise<Wish[]> {
    initializeLocalStorage();
    const wishes = getLocal<Wish[]>(STORAGE_KEYS.WISHES, INITIAL_DEMO_DATA.wishes);
    const filtered = wishes.filter((w) => w.invitation_id === invitationId);
    if (onlyApproved) {
      return filtered.filter((w) => w.status === 'approved');
    }
    return filtered;
  },

  async updateWishStatus(id: string, status: 'approved' | 'pending' | 'hidden'): Promise<void> {
    initializeLocalStorage();
    const wishes = getLocal<Wish[]>(STORAGE_KEYS.WISHES, INITIAL_DEMO_DATA.wishes);
    const item = wishes.find((w) => w.id === id);
    if (item) {
      item.status = status;
      setLocal(STORAGE_KEYS.WISHES, wishes);
    }
  },

  async deleteWish(id: string): Promise<boolean> {
    initializeLocalStorage();
    const wishes = getLocal<Wish[]>(STORAGE_KEYS.WISHES, INITIAL_DEMO_DATA.wishes);
    const filtered = wishes.filter((w) => w.id !== id);
    setLocal(STORAGE_KEYS.WISHES, filtered);
    return true;
  },

  // Dashboard Aggregated Stats
  async getStats(invitationId?: string) {
    initializeLocalStorage();
    const invitations = getLocal<Invitation[]>(STORAGE_KEYS.INVITATIONS, [INITIAL_DEMO_DATA.invitation]);
    const guests = getLocal<Guest[]>(STORAGE_KEYS.GUESTS, INITIAL_DEMO_GUESTS);
    const rsvps = getLocal<RSVP[]>(STORAGE_KEYS.RSVPS, INITIAL_DEMO_RSVPS);
    const wishes = getLocal<Wish[]>(STORAGE_KEYS.WISHES, INITIAL_DEMO_DATA.wishes);

    const filteredGuests = invitationId ? guests.filter((g) => g.invitation_id === invitationId) : guests;
    const filteredRsvps = invitationId ? rsvps.filter((r) => r.invitation_id === invitationId) : rsvps;
    const filteredWishes = invitationId ? wishes.filter((w) => w.invitation_id === invitationId) : wishes;

    const attendingRsvps = filteredRsvps.filter((r) => r.attendance === 'attending');
    const notAttendingRsvps = filteredRsvps.filter((r) => r.attendance === 'not_attending');
    const totalAttendanceCount = attendingRsvps.reduce((acc, curr) => acc + (curr.guest_count || 1), 0);

    return {
      totalInvitations: invitations.length,
      totalGuests: filteredGuests.length,
      totalRSVPs: filteredRsvps.length,
      attending: attendingRsvps.length,
      notAttending: notAttendingRsvps.length,
      totalAttendanceCount,
      totalWishes: filteredWishes.length,
    };
  },
};
