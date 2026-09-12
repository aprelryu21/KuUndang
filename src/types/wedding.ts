export type SectionKey =
  | 'cover'
  | 'greeting'
  | 'hero'
  | 'countdown'
  | 'couple'
  | 'events'
  | 'location'
  | 'story'
  | 'gallery'
  | 'rsvp'
  | 'wishes'
  | 'gifts'
  | 'closing';

export interface ThemeConfig {
  primary_color: string;
  accent_color: string;
  background_color: string;
  secondary_bg: string;
  text_color: string;
  muted_color: string;
  gold_color: string;
  blush_color: string;
  font_heading: string;
  font_body: string;
  font_accent?: string;
  corner_radius: string;
  decorative_intensity: 'minimal' | 'subtle' | 'moderate';
}

export interface SectionSetting {
  id: string;
  invitation_id: string;
  section_key: SectionKey;
  title: string;
  enabled: boolean;
  sort_order: number;
}

export interface Couple {
  id: string;
  invitation_id: string;
  role: 'bride' | 'groom';
  nickname: string;
  full_name: string;
  father_name: string;
  mother_name: string;
  child_order: string;
  instagram?: string;
  photo_url: string;
  description?: string;
}

export interface WeddingEvent {
  id: string;
  invitation_id: string;
  title: string;
  event_type: 'akad' | 'reception' | 'ceremony' | 'party' | 'other';
  date: string;
  start_time: string;
  end_time?: string;
  venue: string;
  address: string;
  maps_url?: string;
  description?: string;
  sort_order: number;
}

export interface StoryItem {
  id: string;
  invitation_id: string;
  title: string;
  date: string;
  description: string;
  photo_url?: string;
  sort_order: number;
}

export interface GalleryItem {
  id: string;
  invitation_id: string;
  image_url: string;
  caption?: string;
  sort_order: number;
  featured?: boolean;
}

export interface GiftAccount {
  id: string;
  invitation_id: string;
  type: 'bank' | 'ewallet' | 'address';
  provider: string;
  account_name: string;
  account_number: string;
  description?: string;
  sort_order: number;
}

export interface Guest {
  id: string;
  invitation_id: string;
  name: string;
  guest_code: string;
  category: string;
  max_guests: number;
  opened_at?: string | null;
  created_at: string;
}

export interface RSVP {
  id: string;
  invitation_id: string;
  guest_id?: string | null;
  guest_name: string;
  attendance: 'attending' | 'not_attending';
  guest_count: number;
  message?: string;
  created_at: string;
}

export interface Wish {
  id: string;
  invitation_id: string;
  guest_id?: string | null;
  guest_name: string;
  message: string;
  status: 'approved' | 'pending' | 'hidden';
  created_at: string;
}

export interface Invitation {
  id: string;
  template_id?: 'royal-arch' | 'persona-5' | 'pastel-pop';
  owner_id?: string;
  title: string;
  slug: string;
  wedding_date: string;
  status: 'draft' | 'published' | 'archived';
  opening_title: string;
  bride_nickname: string;
  groom_nickname: string;
  greeting_text: string;
  hero_quote: string;
  closing_message: string;
  closing_subtext: string;
  cover_image: string;
  hero_image: string;
  events_image?: string;
  closing_image?: string;
  music_url: string;
  music_title: string;
  music_artist: string;
  music_enabled: boolean;
  theme_config: ThemeConfig;
  created_at: string;
  updated_at: string;
}

export interface FullInvitationData {
  invitation: Invitation;
  bride: Couple;
  groom: Couple;
  events: WeddingEvent[];
  stories: StoryItem[];
  gallery: GalleryItem[];
  gifts: GiftAccount[];
  sections: SectionSetting[];
  wishes: Wish[];
}
