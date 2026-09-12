import React from 'react';

// ==========================================
// CUTE FLORAL SVG ASSETS (Cute, Adorable & Sweet)
// ==========================================

/**
 * Cute 5-Petal Smiling Daisy Flower
 */
export const CuteDaisyFlower: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Petals */}
    <ellipse cx="50" cy="22" rx="14" ry="18" fill="#FFF5F8" stroke="#FFA3B8" strokeWidth="3" />
    <ellipse cx="76" cy="40" rx="18" ry="14" fill="#FFF5F8" stroke="#FFA3B8" strokeWidth="3" />
    <ellipse cx="66" cy="74" rx="15" ry="18" fill="#FFF5F8" stroke="#FFA3B8" strokeWidth="3" />
    <ellipse cx="34" cy="74" rx="15" ry="18" fill="#FFF5F8" stroke="#FFA3B8" strokeWidth="3" />
    <ellipse cx="24" cy="40" rx="18" ry="14" fill="#FFF5F8" stroke="#FFA3B8" strokeWidth="3" />
    {/* Flower Center with Happy Face */}
    <circle cx="50" cy="50" r="19" fill="#FFD166" stroke="#FFAA00" strokeWidth="3" />
    {/* Eyes */}
    <circle cx="43" cy="48" r="2.5" fill="#4A2E35" />
    <circle cx="57" cy="48" r="2.5" fill="#4A2E35" />
    {/* Smile */}
    <path d="M 45 54 Q 50 59 55 54" stroke="#4A2E35" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Pink Blush Cheeks */}
    <circle cx="39" cy="52" r="2.5" fill="#FF85A2" opacity="0.8" />
    <circle cx="61" cy="52" r="2.5" fill="#FF85A2" opacity="0.8" />
  </svg>
);

/**
 * Cute Cherry Blossom / Sakura Flower with Blush
 */
export const CuteSakuraFlower: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(50, 50)">
      {[0, 72, 144, 216, 288].map((angle, idx) => (
        <g key={idx} transform={`rotate(${angle})`}>
          <path
            d="M 0 0 C -14 -18 -18 -36 0 -44 C 18 -36 14 -18 0 0"
            fill="#FFCCD7"
            stroke="#FF85A2"
            strokeWidth="2.5"
          />
        </g>
      ))}
      <circle cx="0" cy="0" r="11" fill="#FFF0F5" stroke="#FF5C8D" strokeWidth="2.5" />
      {/* Mini smiling eyes & smile */}
      <circle cx="-3.5" cy="-1.5" r="1.5" fill="#6B3E48" />
      <circle cx="3.5" cy="-1.5" r="1.5" fill="#6B3E48" />
      <path d="M -2.5 2 Q 0 4.5 2.5 2" stroke="#6B3E48" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </g>
  </svg>
);

/**
 * Cute Pastel Tulip Flower
 */
export const CuteTulipFlower: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stem and leaves */}
    <path d="M 50 60 Q 50 82 50 95" stroke="#81C784" strokeWidth="4" strokeLinecap="round" />
    <path d="M 50 78 Q 30 72 25 60 Q 38 60 48 74" fill="#A5D6A7" />
    <path d="M 50 82 Q 70 76 75 64 Q 62 64 52 78" fill="#A5D6A7" />
    {/* Tulip petals */}
    <path d="M 50 20 C 32 20 25 38 32 58 C 40 68 60 68 68 58 C 75 38 68 20 50 20 Z" fill="#FF80A6" stroke="#FF477E" strokeWidth="2.5" />
    <path d="M 50 20 C 42 32 44 48 50 62 C 56 48 58 32 50 20 Z" fill="#FFA8C2" stroke="#FF477E" strokeWidth="2" />
    {/* Cute Face */}
    <circle cx="44" cy="46" r="2" fill="#4A2E35" />
    <circle cx="56" cy="46" r="2" fill="#4A2E35" />
    <path d="M 46 51 Q 50 54 54 51" stroke="#4A2E35" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="41" cy="49" r="1.5" fill="#FF3366" opacity="0.7" />
    <circle cx="59" cy="49" r="1.5" fill="#FF3366" opacity="0.7" />
  </svg>
);

/**
 * Cute Pastel Ribbon Bow
 */
export const CuteBowSvg: React.FC<{ className?: string }> = ({ className = 'w-10 h-8' }) => (
  <svg viewBox="0 0 100 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Loop */}
    <path
      d="M 50 40 C 35 25 15 22 15 36 C 15 50 35 48 50 40 Z"
      fill="#FF85A2"
      stroke="#FF477E"
      strokeWidth="3"
    />
    <path d="M 28 34 C 24 38 24 42 28 44" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    {/* Right Loop */}
    <path
      d="M 50 40 C 65 25 85 22 85 36 C 85 50 65 48 50 40 Z"
      fill="#FF85A2"
      stroke="#FF477E"
      strokeWidth="3"
    />
    <path d="M 72 34 C 76 38 76 42 72 44" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    {/* Ribbons tails */}
    <path d="M 46 45 Q 36 65 28 72 Q 40 68 48 52" fill="#FF6584" stroke="#FF477E" strokeWidth="2.5" />
    <path d="M 54 45 Q 64 65 72 72 Q 60 68 52 52" fill="#FF6584" stroke="#FF477E" strokeWidth="2.5" />
    {/* Knot with heart */}
    <circle cx="50" cy="40" r="8" fill="#FFCCD7" stroke="#FF477E" strokeWidth="3" />
    <path d="M 50 38 C 49 36 46 36 46 38 C 46 40 50 42 50 42 C 50 42 54 40 54 38 C 54 36 51 36 50 38 Z" fill="#FF477E" />
  </svg>
);

/**
 * Cute Washi Tape Strip (Pastel Masking Tape)
 */
export const WashiTape: React.FC<{ className?: string; color?: 'pink' | 'yellow' | 'green' | 'mint' }> = ({
  className = 'w-24 h-6',
  color = 'pink',
}) => {
  const bgColors = {
    pink: '#FFCCD7',
    yellow: '#FEF08A',
    green: '#BBF7D0',
    mint: '#A7F3D0',
  };
  const strokeColors = {
    pink: '#FF85A2',
    yellow: '#F59E0B',
    green: '#34D399',
    mint: '#10B981',
  };

  return (
    <svg viewBox="0 0 120 30" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 5 3 L 115 3 L 112 15 L 115 27 L 5 27 L 8 15 Z"
        fill={bgColors[color]}
        stroke={strokeColors[color]}
        strokeWidth="1.5"
        strokeDasharray="4 2"
        opacity="0.9"
      />
      {/* Decorative little hearts or dots on tape */}
      <circle cx="25" cy="15" r="2" fill={strokeColors[color]} opacity="0.6" />
      <circle cx="45" cy="15" r="2" fill={strokeColors[color]} opacity="0.6" />
      <circle cx="65" cy="15" r="2" fill={strokeColors[color]} opacity="0.6" />
      <circle cx="85" cy="15" r="2" fill={strokeColors[color]} opacity="0.6" />
      <circle cx="105" cy="15" r="2" fill={strokeColors[color]} opacity="0.6" />
    </svg>
  );
};

/**
 * Cute Twinkling Sparkle Star
 */
export const CuteSparkleStar: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-[#FFD166]' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M 50 5 Q 50 45 95 50 Q 50 55 50 95 Q 50 55 5 50 Q 50 45 50 5 Z" />
    <circle cx="50" cy="50" r="6" fill="#FFF" />
  </svg>
);

/**
 * Cute Floral Ribbon Divider
 */
export const CuteFloralDivider: React.FC<{ className?: string }> = ({ className = 'my-6' }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-[2px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#FFA3B8] to-[#FF5C8D] rounded-full" />
    <div className="flex items-center gap-1.5">
      <CuteSakuraFlower className="w-5 h-5 text-[#FF85A2]" />
      <CuteDaisyFlower className="w-6 h-6" />
      <CuteSakuraFlower className="w-5 h-5 text-[#FF85A2]" />
    </div>
    <div className="h-[2px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-[#FFA3B8] to-[#FF5C8D] rounded-full" />
  </div>
);

/**
 * Cute Corner Floral Flourish
 */
export const CuteCornerFloral: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Vines / Leaves */}
    <path d="M 10 10 Q 50 15 75 40 Q 40 75 15 50 Z" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="2" />
    <path d="M 12 12 Q 35 35 45 65" stroke="#81C784" strokeWidth="2.5" strokeLinecap="round" />
    {/* Mini blossoms */}
    <circle cx="20" cy="20" r="10" fill="#FFCCD7" stroke="#FF85A2" strokeWidth="2" />
    <circle cx="20" cy="20" r="4" fill="#FFF0F5" />
    <circle cx="55" cy="35" r="8" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="1.5" />
    <circle cx="55" cy="35" r="3" fill="#FFF" />
    <circle cx="35" cy="55" r="7" fill="#FFCCD7" stroke="#FF85A2" strokeWidth="1.5" />
  </svg>
);

// ==========================================
// AUDIO & SOUND EFFECT UTILITIES
// ==========================================

export const CUTE_LOFI_MUSIC_SOURCES = [
  // Sweet acoustic romantic melodies suitable for cute pastel floral theme
  'https://assets.mixkit.co/music/preview/mixkit-loving-you-is-easy-860.mp3',
  'https://assets.mixkit.co/music/preview/mixkit-tender-love-687.mp3',
  'https://assets.mixkit.co/music/preview/mixkit-a-very-happy-day-864.mp3',
];

/**
 * Plays a cheerful magical music box bell chime via Web Audio API
 */
export const playCuteChimeSfx = (): void => {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Sweet arpeggio: C5 -> E5 -> G5 -> B5 -> C6
    const freqs = [523.25, 659.25, 783.99, 987.77, 1046.5];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

      gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.07);
      osc.stop(ctx.currentTime + idx * 0.07 + 0.48);
    });
  } catch (err) {
    console.warn('Cute chime audio playback error:', err);
  }
};

let activeCuteMusicSynthInterval: number | null = null;
let cuteMusicAudioCtx: AudioContext | null = null;

/**
 * Synthesizes a sweet, gentle music box lullaby loop in case external music links fail
 */
export const startCuteMusicBoxSynth = (): void => {
  if (activeCuteMusicSynthInterval !== null) return;

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    cuteMusicAudioCtx = new AudioCtx();

    // Sweet romantic melody notes in Hz (Canon/Lullaby pastel theme)
    const melody = [
      523.25, 659.25, 783.99, 659.25, 587.33, 739.99, 880.0, 739.99,
      659.25, 783.99, 987.77, 783.99, 523.25, 659.25, 783.99, 1046.5,
    ];
    let noteIdx = 0;

    activeCuteMusicSynthInterval = window.setInterval(() => {
      if (!cuteMusicAudioCtx || cuteMusicAudioCtx.state === 'closed') return;
      if (cuteMusicAudioCtx.state === 'suspended') {
        cuteMusicAudioCtx.resume();
      }

      const freq = melody[noteIdx % melody.length];
      noteIdx++;

      const osc = cuteMusicAudioCtx.createOscillator();
      const gain = cuteMusicAudioCtx.createGain();

      osc.type = 'triangle'; // Sweet music box / marimba timbre
      osc.frequency.setValueAtTime(freq, cuteMusicAudioCtx.currentTime);

      gain.gain.setValueAtTime(0.08, cuteMusicAudioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, cuteMusicAudioCtx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(cuteMusicAudioCtx.destination);

      osc.start();
      osc.stop(cuteMusicAudioCtx.currentTime + 0.65);
    }, 450);
  } catch (e) {
    console.warn('Could not start cute music box synth:', e);
  }
};

export const stopCuteMusicBoxSynth = (): void => {
  if (activeCuteMusicSynthInterval !== null) {
    clearInterval(activeCuteMusicSynthInterval);
    activeCuteMusicSynthInterval = null;
  }
  if (cuteMusicAudioCtx) {
    cuteMusicAudioCtx.close().catch(() => {});
    cuteMusicAudioCtx = null;
  }
};
