import React from 'react';

/**
 * High-quality romantic and adorable SVG illustrations & ornaments
 * for decorating the wedding invitation sections.
 */

// 1. Cute Lovebirds on a Blooming Branch
export const LoveBirdsIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-16' }) => (
  <svg
    viewBox="0 0 160 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} shrink-0 text-[#283D52]`}
    aria-hidden="true"
  >
    {/* Blooming branch */}
    <path
      d="M10 65 Q 50 60 80 50 Q 110 40 150 45"
      stroke="#C2A56B"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M 50 58 Q 65 72 80 70"
      stroke="#C2A56B"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Leaves */}
    <path d="M 35 62 C 30 55 42 52 45 60 Z" fill="#9FB59F" opacity="0.8" />
    <path d="M 75 51 C 70 42 85 40 88 48 Z" fill="#9FB59F" opacity="0.8" />
    <path d="M 120 44 C 115 35 130 32 132 42 Z" fill="#9FB59F" opacity="0.8" />
    <path d="M 68 68 C 62 62 74 60 76 66 Z" fill="#9FB59F" opacity="0.8" />

    {/* Cherry blossoms / Small flowers */}
    <circle cx="28" cy="62" r="3.5" fill="#F4C2C2" />
    <circle cx="28" cy="62" r="1.2" fill="#E89999" />
    <circle cx="95" cy="46" r="3.5" fill="#F4C2C2" />
    <circle cx="95" cy="46" r="1.2" fill="#E89999" />
    <circle cx="138" cy="45" r="3.5" fill="#F4C2C2" />

    {/* Left Lovebird (Groom bird with subtle bow) */}
    <g transform="translate(48, 20)">
      {/* Body */}
      <path
        d="M 22 28 C 15 28 8 22 8 15 C 8 7 16 2 24 6 C 30 9 32 18 28 26 Z"
        fill="#283D52"
      />
      {/* Head */}
      <circle cx="24" cy="8" r="6.5" fill="#283D52" />
      {/* Beak */}
      <polygon points="30,8 35,9.5 30,11" fill="#C2A56B" />
      {/* Eye */}
      <circle cx="26" cy="7" r="1" fill="#FFFCF7" />
      {/* Wing */}
      <path d="M 14 16 C 18 16 22 22 18 26 C 14 26 10 20 14 16 Z" fill="#3D566E" />
      {/* Tail */}
      <path d="M 8 20 L 0 24 L 6 16 Z" fill="#283D52" />
      {/* Cute little bow tie */}
      <polygon points="27,14 31,12 31,16" fill="#DFBFC1" />
      <polygon points="31,14 35,12 35,16" fill="#DFBFC1" />
      <circle cx="31" cy="14" r="1" fill="#C2A56B" />
    </g>

    {/* Right Lovebird (Bride bird with floral crown) */}
    <g transform="translate(82, 16)">
      {/* Body */}
      <path
        d="M 12 32 C 19 32 26 26 26 19 C 26 11 18 6 10 10 C 4 13 2 22 6 30 Z"
        fill="#DFBFC1"
      />
      {/* Head */}
      <circle cx="10" cy="12" r="6.5" fill="#DFBFC1" />
      {/* Beak */}
      <polygon points="4,12 -1,13.5 4,15" fill="#C2A56B" />
      {/* Eye */}
      <circle cx="8" cy="11" r="1" fill="#283D52" />
      {/* Wing */}
      <path d="M 20 20 C 16 20 12 26 16 30 C 20 30 24 24 20 20 Z" fill="#F0D5D7" />
      {/* Tail */}
      <path d="M 26 24 L 34 28 L 28 20 Z" fill="#DFBFC1" />
      {/* Floral veil/crown on head */}
      <circle cx="12" cy="6" r="2" fill="#E8A598" />
      <circle cx="8" cy="6" r="1.8" fill="#C2A56B" />
      <circle cx="15" cy="8" r="1.5" fill="#F4C2C2" />
    </g>

    {/* Floating Love Hearts between the birds */}
    <path
      d="M 76 18 C 76 14 72 12 70 14 C 68 12 64 14 64 18 C 64 22 70 26 70 26 C 70 26 76 22 76 18 Z"
      fill="#E77280"
    />
    <path
      d="M 82 8 C 82 5 79 3.5 77.5 5 C 76 3.5 73 5 73 8 C 73 11 77.5 14 77.5 14 C 77.5 14 82 11 82 8 Z"
      fill="#DFBFC1"
    />
  </svg>
);

// 2. Ornate Botanical Floral Wreath with Entwined Rings
export const FloralWreathIllustration: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} shrink-0`}
    aria-hidden="true"
  >
    {/* Outer dashed delicate golden circle */}
    <circle
      cx="60"
      cy="60"
      r="48"
      stroke="#C2A56B"
      strokeWidth="1"
      strokeDasharray="3 3"
      opacity="0.6"
    />

    {/* Left botanical garland */}
    <path
      d="M 60 14 C 30 14 16 38 16 60 C 16 82 32 106 60 106"
      stroke="#9FB59F"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Right botanical garland */}
    <path
      d="M 60 14 C 90 14 104 38 104 60 C 104 82 88 106 60 106"
      stroke="#9FB59F"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Laurel leaves left */}
    <path d="M 38 24 C 32 18 36 28 42 26 Z" fill="#8FA68F" />
    <path d="M 22 42 C 16 38 22 48 28 44 Z" fill="#8FA68F" />
    <path d="M 16 64 C 8 64 16 72 22 68 Z" fill="#8FA68F" />
    <path d="M 26 86 C 22 92 32 94 32 86 Z" fill="#8FA68F" />
    <path d="M 44 100 C 42 108 50 106 48 100 Z" fill="#8FA68F" />

    {/* Laurel leaves right */}
    <path d="M 82 24 C 88 18 84 28 78 26 Z" fill="#8FA68F" />
    <path d="M 98 42 C 104 38 98 48 92 44 Z" fill="#8FA68F" />
    <path d="M 104 64 C 112 64 104 72 98 68 Z" fill="#8FA68F" />
    <path d="M 94 86 C 98 92 88 94 88 86 Z" fill="#8FA68F" />
    <path d="M 76 100 C 78 108 70 106 72 100 Z" fill="#8FA68F" />

    {/* Blooming Roses at Top & Bottom */}
    <circle cx="60" cy="14" r="5" fill="#DFBFC1" />
    <circle cx="60" cy="14" r="2.5" fill="#E8A598" />
    <circle cx="60" cy="106" r="5" fill="#DFBFC1" />
    <circle cx="60" cy="106" r="2.5" fill="#E8A598" />

    {/* Center Interlocking Golden Wedding Rings */}
    <circle
      cx="54"
      cy="60"
      r="13"
      stroke="#C2A56B"
      strokeWidth="2.5"
      fill="none"
    />
    <circle
      cx="66"
      cy="60"
      r="13"
      stroke="#D4AF37"
      strokeWidth="2.5"
      fill="none"
    />
    {/* Sparkling diamond highlight on right ring */}
    <polygon points="66,45 68,47 66,49 64,47" fill="#FFFCF7" />
    <circle cx="66" cy="47" r="1.5" fill="#C2A56B" />
  </svg>
);

// 3. Vintage Filigree Luxury Divider with Heart
export const VintageDivider: React.FC<{ className?: string }> = ({ className = 'w-48 h-6' }) => (
  <svg
    viewBox="0 0 240 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} mx-auto shrink-0`}
    aria-hidden="true"
  >
    {/* Left horizontal gradient line */}
    <line x1="10" y1="12" x2="90" y2="12" stroke="#C2A56B" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <circle cx="95" cy="12" r="2" fill="#C2A56B" />
    <path d="M 88 12 Q 100 6 105 12" stroke="#C2A56B" strokeWidth="1" fill="none" />

    {/* Center Heart Flourish */}
    <g transform="translate(120, 12)">
      <path
        d="M 0 6 C -5 0 -10 -4 -6 -9 C -2 -14 0 -8 0 -4 C 0 -8 2 -14 6 -9 C 10 -4 5 0 0 6 Z"
        fill="#DFBFC1"
        stroke="#C2A56B"
        strokeWidth="1"
      />
      <circle cx="0" cy="-2" r="1.2" fill="#C2A56B" />
    </g>

    {/* Right horizontal gradient line */}
    <path d="M 152 12 Q 140 6 135 12" stroke="#C2A56B" strokeWidth="1" fill="none" />
    <circle cx="145" cy="12" r="2" fill="#C2A56B" />
    <line x1="150" y1="12" x2="230" y2="12" stroke="#C2A56B" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// 4. Botanical Corner Branch Ornament
export const FloralCornerOrnament: React.FC<{ className?: string; flip?: boolean }> = ({
  className = 'w-16 h-16',
  flip = false,
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} shrink-0 text-[#C2A56B] ${flip ? 'scale-x-[-1]' : ''}`}
    aria-hidden="true"
  >
    {/* Stem */}
    <path
      d="M 4 4 Q 30 8 45 28 Q 55 42 58 60"
      stroke="#C2A56B"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 20 12 Q 16 26 24 38"
      stroke="#C2A56B"
      strokeWidth="0.8"
      fill="none"
      strokeLinecap="round"
    />
    {/* Leaves */}
    <path d="M 8 5 C 14 2 12 12 6 9 Z" fill="#9FB59F" opacity="0.85" />
    <path d="M 22 8 C 28 5 30 14 24 13 Z" fill="#9FB59F" opacity="0.85" />
    <path d="M 38 18 C 46 16 44 26 38 24 Z" fill="#9FB59F" opacity="0.85" />
    <path d="M 18 24 C 12 28 20 34 22 28 Z" fill="#9FB59F" opacity="0.85" />
    <path d="M 52 38 C 60 38 56 48 50 44 Z" fill="#9FB59F" opacity="0.85" />
    {/* Small blossom */}
    <circle cx="48" cy="30" r="3" fill="#DFBFC1" />
    <circle cx="48" cy="30" r="1.2" fill="#C2A56B" />
  </svg>
);

// 5. Entwined Wedding Rings with Sparkling Rays
export const EntwinedRingsIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg
    viewBox="0 0 80 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} shrink-0`}
    aria-hidden="true"
  >
    {/* Left Gold Band */}
    <circle
      cx="32"
      cy="28"
      r="16"
      stroke="#C2A56B"
      strokeWidth="3.5"
      fill="none"
    />
    {/* Right Gold Band (Intertwined) */}
    <circle
      cx="48"
      cy="28"
      r="16"
      stroke="#D4AF37"
      strokeWidth="3.5"
      fill="none"
    />
    {/* Diamond Setting on Right Band */}
    <g transform="translate(48, 12)">
      <polygon points="0,-7 6,-2 0,3 -6,-2" fill="#FFFCF7" stroke="#C2A56B" strokeWidth="1" />
      {/* Sparkle rays */}
      <line x1="0" y1="-10" x2="0" y2="-13" stroke="#C2A56B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="-6" x2="9" y2="-8" stroke="#C2A56B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="-6" y1="-6" x2="-9" y2="-8" stroke="#C2A56B" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
);

// 6. Cute Gift Box Illustration for Wedding Gift Section
export const GiftBoxIllustration: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} shrink-0`}
    aria-hidden="true"
  >
    {/* Box Body */}
    <rect x="18" y="32" width="44" height="38" rx="6" fill="#F7F2EA" stroke="#283D52" strokeWidth="2.5" />
    {/* Box Lid */}
    <rect x="14" y="24" width="52" height="12" rx="4" fill="#FFFCF7" stroke="#283D52" strokeWidth="2.5" />

    {/* Golden Vertical Ribbon */}
    <rect x="36" y="24" width="8" height="46" fill="#C2A56B" />
    {/* Golden Horizontal Ribbon */}
    <rect x="18" y="46" width="44" height="7" fill="#C2A56B" />

    {/* Ribbon Bow on Top */}
    <path
      d="M 40 24 C 32 12 24 16 32 24 C 36 24 38 24 40 24 Z"
      fill="#DFBFC1"
      stroke="#283D52"
      strokeWidth="1.5"
    />
    <path
      d="M 40 24 C 48 12 56 16 48 24 C 44 24 42 24 40 24 Z"
      fill="#DFBFC1"
      stroke="#283D52"
      strokeWidth="1.5"
    />
    <circle cx="40" cy="24" r="3" fill="#C2A56B" stroke="#283D52" strokeWidth="1.5" />

    {/* Floating Cute Hearts */}
    <path
      d="M 62 18 C 62 15 59 13 57.5 15 C 56 13 53 15 53 18 C 53 21 57.5 24 57.5 24 C 57.5 24 62 21 62 18 Z"
      fill="#E77280"
    />
    <path
      d="M 22 16 C 22 13.5 19.5 12 18.5 13.5 C 17.5 12 15 13.5 15 16 C 15 18.5 18.5 21 18.5 21 C 18.5 21 22 18.5 22 16 Z"
      fill="#DFBFC1"
    />
  </svg>
);

// 7. Romantic Love Letter Envelope with Wax Seal
export const LoveLetterIllustration: React.FC<{ className?: string }> = ({ className = 'w-18 h-18' }) => (
  <svg
    viewBox="0 0 80 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} shrink-0`}
    aria-hidden="true"
  >
    {/* Envelope Body */}
    <rect x="10" y="16" width="60" height="44" rx="5" fill="#FFFCF7" stroke="#283D52" strokeWidth="2" />

    {/* Fold Lines */}
    <path d="M 10 18 L 40 40 L 70 18" stroke="#C2A56B" strokeWidth="1.5" fill="none" />
    <path d="M 10 60 L 30 38" stroke="#283D52" strokeWidth="1.2" opacity="0.4" />
    <path d="M 70 60 L 50 38" stroke="#283D52" strokeWidth="1.2" opacity="0.4" />

    {/* Wax Seal Stamp */}
    <circle cx="40" cy="40" r="8" fill="#C8102E" stroke="#8A0B1E" strokeWidth="1" />
    <path
      d="M 40 42 C 40 42 37 39 37 38 C 37 36.8 38 36 39 36 C 39.6 36 40 36.5 40 36.5 C 40 36.5 40.4 36 41 36 C 42 36 43 36.8 43 38 C 43 39 40 42 40 42 Z"
      fill="#FFFCF7"
    />

    {/* Sprig of lavender sticking out */}
    <path d="M 22 12 Q 32 16 42 22" stroke="#9FB59F" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="20" cy="11" r="2" fill="#B4A7D6" />
    <circle cx="26" cy="13" r="2" fill="#B4A7D6" />
    <circle cx="32" cy="16" r="2" fill="#B4A7D6" />
  </svg>
);

// 8. Floral Map Pin for Location Section
export const MapPinFloralIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} shrink-0`}
    aria-hidden="true"
  >
    {/* Floral Base Leaves */}
    <path d="M 24 64 C 18 56 30 52 34 60 Z" fill="#9FB59F" opacity="0.9" />
    <path d="M 56 64 C 62 56 50 52 46 60 Z" fill="#9FB59F" opacity="0.9" />
    <circle cx="28" cy="62" r="3" fill="#DFBFC1" />
    <circle cx="52" cy="62" r="3" fill="#DFBFC1" />

    {/* Ground Ellipse */}
    <ellipse cx="40" cy="64" rx="22" ry="4" fill="#283D52" opacity="0.15" />

    {/* Map Pin */}
    <path
      d="M 40 14 C 28 14 20 22 20 32 C 20 46 40 64 40 64 C 40 64 60 46 60 32 C 60 22 52 14 40 14 Z"
      fill="#283D52"
      stroke="#C2A56B"
      strokeWidth="2"
    />
    {/* Center Heart in Pin */}
    <circle cx="40" cy="30" r="10" fill="#FFFCF7" />
    <path
      d="M 40 35 C 40 35 34 30.5 34 28 C 34 26 35.8 24.5 37.5 24.5 C 38.6 24.5 39.5 25.2 40 25.8 C 40.5 25.2 41.4 24.5 42.5 24.5 C 44.2 24.5 46 26 46 28 C 46 30.5 40 35 40 35 Z"
      fill="#C8102E"
    />
  </svg>
);
