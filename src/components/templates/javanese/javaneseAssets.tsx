import React from 'react';

/**
 * High-fidelity vector ornaments and motifs inspired by Javanese Keraton art:
 * - Gunungan Wayang Kulit (Kayon)
 * - Motif Batik Kawung & Parang
 * - Sudut Ukiran Lung-Lungan Jepara / Keraton Emas
 * - Pembatas Bilah Keris & Rantai Emas
 */

export const GununganWayangSvg: React.FC<{ className?: string; color?: string; accent?: string }> = ({
  className = 'w-16 h-24',
  color = '#D4AF37',
  accent = '#9C7A1D',
}) => {
  return (
    <svg
      viewBox="0 0 100 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Gunungan Wayang Kulit Jawa"
    >
      <defs>
        <linearGradient id="gununganGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D77F" />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
        <radialGradient id="gununganCoreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF2B2" stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* Gunungan Silhouette Contour (Tree of Life / Leaf Shape) */}
      <path
        d="M 50 4 
           C 53 12, 60 22, 66 32 
           C 74 44, 84 58, 88 74 
           C 92 88, 91 104, 85 118 
           C 80 128, 70 134, 58 136 
           L 58 146 L 42 146 L 42 136 
           C 30 134, 20 128, 15 118 
           C 9 104, 8 88, 12 74 
           C 16 58, 26 44, 34 32 
           C 40 22, 47 12, 50 4 Z"
        fill="url(#gununganGoldGrad)"
        fillOpacity="0.12"
        stroke="url(#gununganGoldGrad)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Inner Sacred Frame */}
      <path
        d="M 50 12 
           C 54 20, 62 34, 69 46 
           C 76 60, 80 76, 78 92 
           C 76 106, 68 118, 56 124 
           L 44 124 
           C 32 118, 24 106, 22 92 
           C 20 76, 24 60, 31 46 
           C 38 34, 46 20, 50 12 Z"
        stroke="url(#gununganGoldGrad)"
        strokeWidth="1.2"
        strokeDasharray="3 1.5"
      />

      {/* Central Gapura Keraton / Pintu Gerbang Sakral */}
      <rect
        x="42"
        y="96"
        width="16"
        height="26"
        rx="2"
        fill="#1A1009"
        stroke={color}
        strokeWidth="1.2"
      />
      <path
        d="M 42 96 C 42 90, 58 90, 58 96"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="50" cy="106" r="2.5" fill={color} />

      {/* Pohon Hayat / Tree of Life Foliage */}
      <path
        d="M 50 40 L 50 90 M 50 50 Q 64 45, 68 38 M 50 50 Q 36 45, 32 38 M 50 62 Q 70 58, 74 50 M 50 62 Q 30 58, 26 50 M 50 74 Q 72 72, 76 66 M 50 74 Q 28 72, 24 66"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Puncak Mustaka / Jewel of Gunungan */}
      <circle cx="50" cy="8" r="2.5" fill="#FFF2B2" stroke={color} strokeWidth="1" />
      <path d="M 50 1 L 50 6" stroke={color} strokeWidth="1.2" />

      {/* Base Cempurit (Tangkai Pegangan) */}
      <rect x="47" y="136" width="6" height="13" fill="url(#gununganGoldGrad)" rx="1" />
    </svg>
  );
};

export const JavaneseCornerFlourish: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-12 h-12',
  color = '#D4AF37',
}) => {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ornamen Ukiran Sudut Jawa"
    >
      <path
        d="M 4 4 L 4 36 C 4 38, 6 40, 8 40 C 10 40, 11 38, 12 34 C 14 26, 20 20, 28 16 C 34 13, 38 10, 38 7 C 38 5, 36 4, 34 4 L 4 4 Z"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="1.2"
      />
      {/* Lung-lungan / Tendril swirls */}
      <path
        d="M 6 6 L 6 28 C 8 20, 14 14, 24 10 C 26 9, 28 8, 28 6 L 6 6"
        stroke={color}
        strokeWidth="1"
      />
      <circle cx="16" cy="16" r="3" fill={color} />
      <circle cx="28" cy="8" r="1.5" fill={color} />
      <circle cx="8" cy="28" r="1.5" fill={color} />
      <circle cx="6" cy="6" r="2" fill="#FFF" />
    </svg>
  );
};

export const JavaneseDivider: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-full max-w-xs mx-auto my-4',
  color = '#D4AF37',
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]/40" />
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-[10px] text-[#D4AF37] opacity-60">❖</span>
        <div className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37] bg-[#24160E] flex items-center justify-center">
          <div className="w-1 h-1 bg-[#D4AF37]" />
        </div>
        <span className="text-[10px] text-[#D4AF37] opacity-60">❖</span>
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]/40" />
    </div>
  );
};

export const BatikKawungPattern: React.FC<{ className?: string }> = ({
  className = 'absolute inset-0 pointer-events-none opacity-5',
}) => {
  return (
    <div
      className={className}
      style={{
        backgroundImage: `radial-gradient(circle at 12px 12px, #D4AF37 2px, transparent 2.5px), radial-gradient(ellipse at 12px 6px, #D4AF37 3px, transparent 4px), radial-gradient(ellipse at 12px 18px, #D4AF37 3px, transparent 4px), radial-gradient(ellipse at 6px 12px, #D4AF37 3px, transparent 4px), radial-gradient(ellipse at 18px 12px, #D4AF37 3px, transparent 4px)`,
        backgroundSize: '24px 24px',
      }}
    />
  );
};

/**
 * Kembar Mayang (Sepasang Janur Kuning Sakral Pengantin Jawa):
 * Simbol kesakralan, tolak bala, keagungan, dan kebahagiaan sejati.
 */
export const KembarMayangSvg: React.FC<{ className?: string }> = ({
  className = 'w-10 h-20 sm:w-12 sm:h-24',
}) => {
  return (
    <svg
      viewBox="0 0 80 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Kembar Mayang Janur Kuning Pengantin Jawa"
    >
      <defs>
        <linearGradient id="kembarGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D77F" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8A6615" />
        </linearGradient>
      </defs>
      {/* Batang Utama & Mahkota Bunga Janur */}
      <path
        d="M 40 155 L 40 45"
        stroke="url(#kembarGold)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Pucuk Janur (Cunduk Menur) */}
      <path
        d="M 40 45 C 36 30, 32 15, 40 5 C 48 15, 44 30, 40 45 Z"
        fill="url(#kembarGold)"
        fillOpacity="0.4"
        stroke="url(#kembarGold)"
        strokeWidth="1.5"
      />
      {/* Daun Janur Lengkung Kiri & Kanan (Anyaman Mayang) */}
      <path
        d="M 40 60 C 25 55, 12 65, 8 80 C 22 75, 34 70, 40 60 Z"
        fill="url(#kembarGold)"
        fillOpacity="0.3"
        stroke="url(#kembarGold)"
        strokeWidth="1.2"
      />
      <path
        d="M 40 60 C 55 55, 68 65, 72 80 C 58 75, 46 70, 40 60 Z"
        fill="url(#kembarGold)"
        fillOpacity="0.3"
        stroke="url(#kembarGold)"
        strokeWidth="1.2"
      />
      <path
        d="M 40 85 C 20 80, 10 95, 6 112 C 22 105, 34 98, 40 85 Z"
        fill="url(#kembarGold)"
        fillOpacity="0.3"
        stroke="url(#kembarGold)"
        strokeWidth="1.2"
      />
      <path
        d="M 40 85 C 60 80, 70 95, 74 112 C 58 105, 46 98, 40 85 Z"
        fill="url(#kembarGold)"
        fillOpacity="0.3"
        stroke="url(#kembarGold)"
        strokeWidth="1.2"
      />
      <path
        d="M 40 110 C 24 110, 14 125, 10 140 C 26 132, 36 122, 40 110 Z"
        fill="url(#kembarGold)"
        fillOpacity="0.3"
        stroke="url(#kembarGold)"
        strokeWidth="1.2"
      />
      <path
        d="M 40 110 C 56 110, 66 125, 70 140 C 54 132, 44 122, 40 110 Z"
        fill="url(#kembarGold)"
        fillOpacity="0.3"
        stroke="url(#kembarGold)"
        strokeWidth="1.2"
      />
      {/* Vas Bokor Kencana Penyangga */}
      <path
        d="M 28 145 C 28 138, 52 138, 52 145 L 56 156 L 24 156 Z"
        fill="url(#kembarGold)"
        stroke="url(#kembarGold)"
        strokeWidth="1.5"
      />
    </svg>
  );
};

/**
 * Gebyok Ukir Keraton Emas (Traditional Javanese Carved Arch Motif)
 */
export const JavaneseGebyokArch: React.FC<{ className?: string }> = ({
  className = 'w-full h-12 text-[#D4AF37]',
}) => {
  return (
    <svg
      viewBox="0 0 600 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="gebyokGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1A1009" stopOpacity="0" />
          <stop offset="20%" stopColor="#D4AF37" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFF2B2" />
          <stop offset="80%" stopColor="#D4AF37" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1A1009" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 0 35 Q 150 5, 300 5 Q 450 5, 600 35"
        stroke="url(#gebyokGoldGrad)"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M 100 38 Q 200 15, 300 15 Q 400 15, 500 38"
        stroke="url(#gebyokGoldGrad)"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="4 4"
      />
      {/* Central Floral Crown Medallion */}
      <circle cx="300" cy="8" r="5" fill="#D4AF37" />
      <circle cx="300" cy="8" r="2" fill="#FAF6EE" />
      <circle cx="285" cy="11" r="3" fill="#D4AF37" fillOpacity="0.7" />
      <circle cx="315" cy="11" r="3" fill="#D4AF37" fillOpacity="0.7" />
    </svg>
  );
};

/**
 * Gong Ageng & Kenong Chime Synthesizer using Web Audio API:
 * Provides a ceremonial deep resonant sound when opening the Javanese invitation.
 */
export const playGongAgeng = () => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Fundamental Gong frequency (~65Hz - 85Hz) with rich bronze harmonics
    const freqs = [72, 144, 216, 290, 440];
    const gains = [0.45, 0.25, 0.15, 0.08, 0.04];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      // Slight pitch drift characteristic of hand-beaten bronze gongs
      osc.frequency.exponentialRampToValueAtTime(freq * 0.985, now + 3.0);

      gainNode.gain.setValueAtTime(gains[idx], now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 3.2);
    });
  } catch (err) {
    console.warn('Gong sound synthesis error:', err);
  }
};

/**
 * Web Audio API Sacred Gamelan Continuous Ambient Synthesizer:
 * Plays traditional Slendro/Pelog bronze notes (Bonang, Gender, Kempul, & Gong) in a looping hypnotic rhythm.
 * Works 100% reliably even if external audio files fail to load or are blocked by browser.
 */
let synthAudioCtx: AudioContext | null = null;
let synthTimerId: number | null = null;

export const startWebAudioGamelan = () => {
  try {
    if (synthTimerId !== null) return; // already running

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!synthAudioCtx) {
      synthAudioCtx = new AudioContextClass();
    }
    if (synthAudioCtx.state === 'suspended') {
      synthAudioCtx.resume();
    }

    // Javanese Slendro Tuning Notes (approximate Hz: Panunggal 270, Gulu 300, Dhadha 338, Pelog Nem 405, Barang 450)
    const slendroNotes = [270, 300, 338, 405, 450, 540, 608, 810];
    let step = 0;

    const playNote = () => {
      if (!synthAudioCtx) return;
      const ctx = synthAudioCtx;
      const now = ctx.currentTime;

      // Select notes patterned like Ladrang Wilujeng
      const noteFreq = slendroNotes[step % slendroNotes.length];
      const isKenong = step % 4 === 0;
      const isGong = step % 16 === 0;

      // Bronze bell tone (Bonang)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, now);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.2);

      // Deep gong resonance every 16 steps
      if (isGong) {
        const gongOsc = ctx.createOscillator();
        const gongGain = ctx.createGain();
        gongOsc.type = 'triangle';
        gongOsc.frequency.setValueAtTime(72, now);
        gongGain.gain.setValueAtTime(0.2, now);
        gongGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);
        gongOsc.connect(gongGain);
        gongGain.connect(ctx.destination);
        gongOsc.start(now);
        gongOsc.stop(now + 3.0);
      } else if (isKenong) {
        const kenongOsc = ctx.createOscillator();
        const kenongGain = ctx.createGain();
        kenongOsc.type = 'sine';
        kenongOsc.frequency.setValueAtTime(144, now);
        kenongGain.gain.setValueAtTime(0.12, now);
        kenongGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
        kenongOsc.connect(kenongGain);
        kenongGain.connect(ctx.destination);
        kenongOsc.start(now);
        kenongOsc.stop(now + 1.8);
      }

      step++;
    };

    // Play every 750ms for a peaceful ceremonial tempo
    playNote();
    synthTimerId = window.setInterval(playNote, 750);
  } catch (err) {
    console.warn('Web Audio Gamelan error:', err);
  }
};

export const stopWebAudioGamelan = () => {
  if (synthTimerId !== null) {
    window.clearInterval(synthTimerId);
    synthTimerId = null;
  }
};

/**
 * Traditional Gamelan Audio Source Links:
 * Multiple mirrors for high availability:
 */
export const GAMELAN_AUDIO_SOURCES = [
  'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=gamelan-traditional-indonesian-music-111818.mp3',
  'https://upload.wikimedia.org/wikipedia/commons/transcoded/8/87/Javanese_Gamelan_-_Udan_Mas.ogg/Javanese_Gamelan_-_Udan_Mas.ogg.mp3',
  'https://upload.wikimedia.org/wikipedia/commons/transcoded/e/ec/Gamelan_degung_sabilulungan.ogg/Gamelan_degung_sabilulungan.ogg.mp3',
];
