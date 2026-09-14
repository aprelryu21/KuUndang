import { TemplateId, ThemeConfig } from '../types/wedding';

export interface TemplatePreset {
  id: TemplateId;
  name: string;
  badge: string;
  accentColor: string;
  theme_config: ThemeConfig;
  cover_image: string;
  hero_image: string;
  events_image: string;
  closing_image: string;
  music_url: string;
  music_title: string;
  music_artist: string;
  music_enabled: boolean;
  opening_title: string;
  greeting_text: string;
  hero_quote: string;
  closing_message: string;
  closing_subtext: string;
  bridePhoto: string;
  groomPhoto: string;
  storyImage1: string;
  storyImage2: string;
}

export const TEMPLATE_PRESETS: Record<TemplateId, TemplatePreset> = {
  'royal-arch': {
    id: 'royal-arch',
    name: 'The Royal Navy & Gold Arch',
    badge: 'KLASIK & ELEGAN',
    accentColor: '#C2A56B',
    theme_config: {
      primary_color: '#283D52',
      accent_color: '#C2A56B',
      background_color: '#F7F2EA',
      secondary_bg: '#EFE8DE',
      text_color: '#24313A',
      muted_color: '#768692',
      gold_color: '#C2A56B',
      blush_color: '#DFBFC1',
      font_heading: 'Cormorant Garamond',
      font_body: 'Manrope',
    },
    cover_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1470&auto=format&fit=crop',
    hero_image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1469&auto=format&fit=crop',
    events_image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1470&auto=format&fit=crop',
    closing_image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1374&auto=format&fit=crop',
    music_url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/59/Kevin_MacLeod_-_Canon_in_D_Major.ogg/Kevin_MacLeod_-_Canon_in_D_Major.ogg.mp3',
    music_title: 'Canon in D Major (Classical Romance)',
    music_artist: 'Johann Pachelbel',
    music_enabled: true,
    opening_title: 'THE WEDDING OF',
    greeting_text: "We're so happy you're here ♡",
    hero_quote: 'Two souls, one heart, a lifetime of memories ahead.',
    closing_message: 'It would mean the world to have you with us on our special day.',
    closing_subtext: 'Eat, laugh, dance, repeat. ♡',
    bridePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop',
    groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop',
    storyImage1: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop',
    storyImage2: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop',
  },

  'persona-5': {
    id: 'persona-5',
    name: 'Phantom Crimson & Black (Persona 5 Theme)',
    badge: 'PERSONA 5 THEME',
    accentColor: '#E60012',
    theme_config: {
      primary_color: '#E60012',
      accent_color: '#FFF000',
      background_color: '#141418',
      secondary_bg: '#0D0D0F',
      text_color: '#FFFFFF',
      muted_color: '#9E9EA8',
      gold_color: '#FFF000',
      blush_color: '#E60012',
      font_heading: 'Impact, Montserrat, sans-serif',
      font_body: 'Montserrat, sans-serif',
    },
    cover_image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1469&auto=format&fit=crop',
    hero_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1470&auto=format&fit=crop',
    events_image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1470&auto=format&fit=crop',
    closing_image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1374&auto=format&fit=crop',
    music_url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/59/Kevin_MacLeod_-_Canon_in_D_Major.ogg/Kevin_MacLeod_-_Canon_in_D_Major.ogg.mp3',
    music_title: 'Take Your Heart (Wedding Edition)',
    music_artist: 'Phantom Thieves',
    music_enabled: true,
    opening_title: 'CALLING CARD: TARGET WEDDING',
    greeting_text: '★ TAKE YOUR HEART ★',
    hero_quote: 'Our hearts have officially been stolen by each other forever.',
    closing_message: 'Rank MAX Confidant achieved. Join our All-Out Celebration!',
    closing_subtext: 'The Show is Just Beginning! ★',
    bridePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=688&auto=format&fit=crop',
    groomPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop',
    storyImage1: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop',
    storyImage2: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
  },

  'javanese-royal': {
    id: 'javanese-royal',
    name: 'Adat Jawa Keraton & Gamelan Sakral',
    badge: 'ADAT JAWA SAKRAL',
    accentColor: '#D4AF37',
    theme_config: {
      primary_color: '#D4AF37',
      accent_color: '#E5C158',
      background_color: '#1A1009',
      secondary_bg: '#24160E',
      text_color: '#FAF6EE',
      muted_color: '#C4B59D',
      gold_color: '#D4AF37',
      blush_color: '#A86538',
      font_heading: 'Playfair Display, serif',
      font_body: 'Plus Jakarta Sans, sans-serif',
    },
    cover_image: 'https://images.unsplash.com/photo-1609151162377-794fa6ec9a3f?q=80&w=1470&auto=format&fit=crop',
    hero_image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1374&auto=format&fit=crop',
    events_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1470&auto=format&fit=crop',
    closing_image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1469&auto=format&fit=crop',
    music_url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Gamelan_degung_colotomy.ogg',
    music_title: 'Gamelan Jawa Sakral (Udan Mas)',
    music_artist: 'Karawitan Karaton',
    music_enabled: true,
    opening_title: 'ꦱꦼꦫꦠ꧀ꦲꦸꦊꦩ꧀ — SERAT ULEM',
    greeting_text: 'Nyuwun lumintuning sih samudro pangaksami',
    hero_quote: 'Mugi Gusti Kang Murbeng Dumadi tansah paring berkah lan karaharjan.',
    closing_message: 'Matur nuwun sanget awit saking rawuh lan donga pangestu panjenengan sami.',
    closing_subtext: 'Rahayu, Rahayu, Rahayu Sagung Dumadi.',
    bridePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop',
    groomPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop',
    storyImage1: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop',
    storyImage2: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop',
  },

  'cute-pink-floral': {
    id: 'cute-pink-floral',
    name: 'Pastel Bloom & Bunga Lucu (Pink)',
    badge: 'LUCU & MENGGEMASKAN',
    accentColor: '#FF5C8D',
    theme_config: {
      primary_color: '#FF5C8D',
      accent_color: '#FFA3B8',
      background_color: '#FFF0F5',
      secondary_bg: '#FFE4EC',
      text_color: '#4A2E35',
      muted_color: '#8A505F',
      gold_color: '#FFB703',
      blush_color: '#FF85A2',
      font_heading: 'Patrick Hand, cursive',
      font_body: 'Quicksand, sans-serif',
    },
    cover_image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1480&auto=format&fit=crop',
    hero_image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1376&auto=format&fit=crop',
    events_image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1470&auto=format&fit=crop',
    closing_image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1470&auto=format&fit=crop',
    music_url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/59/Kevin_MacLeod_-_Canon_in_D_Major.ogg/Kevin_MacLeod_-_Canon_in_D_Major.ogg.mp3',
    music_title: 'Sweet Romance & Blossoms (Acoustic)',
    music_artist: 'Pastel Love Strings',
    music_enabled: true,
    opening_title: '🌸 UNDANGAN PERNIKAHAN MANIS 🌸',
    greeting_text: 'Hai! Kami sangat bersemangat mengundangmu ke hari bahagia kami ♡',
    hero_quote: 'Di antara sejuta bunga, kamulah yang paling indah di hatiku.',
    closing_message: 'Kehadiran dan senyum manismu adalah kado terindah bagi kami berdua.',
    closing_subtext: 'Penuh cinta, tawa, dan kebahagiaan selamanya ♡',
    bridePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=688&auto=format&fit=crop',
    groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop',
    storyImage1: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop',
    storyImage2: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&auto=format&fit=crop',
  },

  'super-mario': {
    id: 'super-mario',
    name: '8-Bit Retro Platformer (Super Wedding Bros)',
    badge: 'GAME PLATFORMER 8-BIT',
    accentColor: '#5C94FC',
    theme_config: {
      primary_color: '#5C94FC',
      accent_color: '#E60012',
      background_color: '#182B42',
      secondary_bg: '#0F1E2E',
      text_color: '#FFFFFF',
      muted_color: '#A0C4FF',
      gold_color: '#FFD166',
      blush_color: '#EF476F',
      font_heading: "'Press Start 2P', monospace",
      font_body: "'Press Start 2P', monospace",
    },
    cover_image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1470&auto=format&fit=crop',
    hero_image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1471&auto=format&fit=crop',
    events_image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1470&auto=format&fit=crop',
    closing_image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1471&auto=format&fit=crop',
    music_url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/59/Kevin_MacLeod_-_Canon_in_D_Major.ogg/Kevin_MacLeod_-_Canon_in_D_Major.ogg.mp3',
    music_title: '8-Bit Wedding March & Arcade Fanfare',
    music_artist: 'Retro Game Lab',
    music_enabled: true,
    opening_title: '★ STAGE 1-1: WEDDING QUEST ★',
    greeting_text: 'PLAYER 1 & PLAYER 2 HAVE TEAMED UP FOR LIFE!',
    hero_quote: 'THANK YOU GUEST! BUT OUR HAPPINESS IS COMPLETE WITH YOUR PRESENCE!',
    closing_message: 'MISSION COMPLETE! JOIN THE CASTLE BANQUET CELEBRATION!',
    closing_subtext: 'PRESS START TO CELEBRATE WITH US ★',
    bridePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=688&auto=format&fit=crop',
    groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop',
    storyImage1: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    storyImage2: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
  },
  'pastel-pop': null as any,
};

TEMPLATE_PRESETS['pastel-pop'] = {
  ...TEMPLATE_PRESETS['cute-pink-floral'],
  id: 'pastel-pop',
};

export function getTemplatePreset(templateId: TemplateId): TemplatePreset {
  return TEMPLATE_PRESETS[templateId] || TEMPLATE_PRESETS['royal-arch'];
}
