import React from 'react';

/**
 * Botanical Eucalyptus Stem SVG
 */
export const EucalyptusStem: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = 'w-16 h-16',
  style,
}) => (
  <svg
    viewBox="0 0 120 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Main Stem */}
    <path
      d="M60 170 C58 130, 62 70, 60 10"
      stroke="#66705A"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Leaf Pairs */}
    <ellipse cx="44" cy="140" rx="16" ry="10" transform="rotate(-30 44 140)" fill="#8A9A7B" opacity="0.85" />
    <ellipse cx="76" cy="130" rx="17" ry="11" transform="rotate(25 76 130)" fill="#78886A" opacity="0.9" />
    <ellipse cx="40" cy="95" rx="15" ry="9" transform="rotate(-25 40 95)" fill="#78886A" opacity="0.9" />
    <ellipse cx="80" cy="88" rx="16" ry="10" transform="rotate(30 80 88)" fill="#8A9A7B" opacity="0.85" />
    <ellipse cx="44" cy="52" rx="14" ry="8" transform="rotate(-20 44 52)" fill="#8A9A7B" opacity="0.9" />
    <ellipse cx="76" cy="46" rx="14" ry="9" transform="rotate(20 76 46)" fill="#78886A" opacity="0.9" />
    <ellipse cx="60" cy="16" rx="10" ry="6" transform="rotate(0 60 16)" fill="#9EB08F" opacity="0.95" />
    {/* Vein lines */}
    <path d="M44 140 L34 135 M76 130 L86 126 M40 95 L31 91 M80 88 L90 84" stroke="#4D5742" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
  </svg>
);

/**
 * Botanical Magnolia & Rose Bud SVG
 */
export const MagnoliaBranch: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = 'w-16 h-16',
  style,
}) => (
  <svg
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M20 120 Q60 80 110 30"
      stroke="#525E48"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Petals */}
    <path
      d="M110 30 C125 15, 135 25, 125 40 C115 55, 100 45, 110 30 Z"
      fill="#F5EDE0"
      stroke="#BDA06C"
      strokeWidth="1.2"
    />
    <path
      d="M102 24 C108 8, 120 12, 116 26 C112 36, 98 32, 102 24 Z"
      fill="#FAF6F0"
      stroke="#BDA06C"
      strokeWidth="1"
    />
    {/* Leaves */}
    <ellipse cx="65" cy="85" rx="16" ry="8" transform="rotate(-40 65 85)" fill="#6B795F" />
    <ellipse cx="85" cy="55" rx="14" ry="7" transform="rotate(25 85 55)" fill="#7F8F72" />
    <ellipse cx="45" cy="100" rx="13" ry="6" transform="rotate(15 45 100)" fill="#5A664F" />
    {/* Gold stamen accents */}
    <circle cx="114" cy="32" r="2.5" fill="#BDA06C" />
    <circle cx="118" cy="28" r="2" fill="#D4AF37" />
  </svg>
);

/**
 * Golden Botanical Heirloom Divider
 */
export const HeirloomDivider: React.FC<{ className?: string }> = ({ className = 'my-6' }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#BDA06C]/70 to-[#BDA06C]" />
    <div className="flex items-center gap-1.5 text-[#BDA06C]">
      <svg className="w-3.5 h-3.5 rotate-45" viewBox="0 0 10 10" fill="currentColor">
        <rect width="10" height="10" rx="1" />
      </svg>
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C8 6 4 10 4 15C4 18.5 7 21 12 21C17 21 20 18.5 20 15C20 10 16 6 12 2Z" fill="#BDA06C" fillOpacity="0.3" />
        <path d="M12 6V18 M8 12C10 14 14 14 16 12" />
      </svg>
      <svg className="w-3.5 h-3.5 rotate-45" viewBox="0 0 10 10" fill="currentColor">
        <rect width="10" height="10" rx="1" />
      </svg>
    </div>
    <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-[#BDA06C]/70 to-[#BDA06C]" />
  </div>
);

/**
 * Botanical Corner Flourish SVG
 */
export const BotanicalCorner: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 92 C8 45, 45 8, 92 8"
      stroke="#BDA06C"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.75"
    />
    <path
      d="M16 84 C16 48, 48 16, 84 16"
      stroke="#80683E"
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.5"
    />
    <ellipse cx="50" cy="24" rx="10" ry="5" transform="rotate(-30 50 24)" fill="#66705A" opacity="0.8" />
    <ellipse cx="24" cy="50" rx="10" ry="5" transform="rotate(60 24 50)" fill="#66705A" opacity="0.8" />
    <circle cx="8" cy="8" r="3.5" fill="#BDA06C" />
  </svg>
);

/**
 * Interactive Wax Seal Badge
 */
export const BotanicalWaxSeal: React.FC<{
  monogram?: string;
  className?: string;
  onClick?: () => void;
}> = ({ monogram = 'A & D', className = 'w-20 h-20', onClick }) => (
  <div
    onClick={onClick}
    className={`relative inline-flex items-center justify-center rounded-full cursor-pointer select-none transition-transform hover:scale-105 active:scale-95 shadow-[0_8px_25px_rgba(41,53,34,0.4)] ${className}`}
  >
    {/* Wax Edge Imperfections */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#80683E] via-[#BDA06C] to-[#5C4A26] p-1.5 shadow-inner">
      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#A88B57] via-[#8C7140] to-[#5C4927] flex items-center justify-center border border-[#FFDF9E]/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.5)]">
        {/* Inner Laurel Wreath Ring */}
        <div className="w-[84%] h-[84%] rounded-full border border-dashed border-[#F3E5AB]/70 flex flex-col items-center justify-center p-1 text-center">
          <span className="font-serif text-[9px] tracking-widest text-[#F9F3DC] uppercase opacity-90">
            WEDDING
          </span>
          <span className="font-serif font-bold text-xs sm:text-sm tracking-wider text-[#FFF8E7] drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
            {monogram}
          </span>
          <span className="font-serif text-[8px] text-[#F3E5AB] tracking-widest opacity-80">
            INVITATION
          </span>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Play gentle harp / bell chime for envelope opening
 */
export function playEnvelopeChime() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Arpeggio)
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 1.2);
    });
  } catch (e) {
    // AudioContext blocked or unsupported
  }
}
