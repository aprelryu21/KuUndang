import React from 'react';

/**
 * High-end architectural Roman Arch with classical filigree vine & gold accents.
 */
export const RoyalArchSvg: React.FC<{ className?: string }> = ({ className = 'w-48 h-64' }) => (
  <svg
    viewBox="0 0 200 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="goldArchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DFC28A" />
        <stop offset="50%" stopColor="#C9A86A" />
        <stop offset="100%" stopColor="#A68244" />
      </linearGradient>
      <linearGradient id="softInnerGrad" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#EFE8DD" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    {/* Outer Arch Frame */}
    <path
      d="M10 270 V100 C10 45 50 10 100 10 C150 10 190 45 190 100 V270"
      stroke="url(#goldArchGrad)"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="url(#softInnerGrad)"
    />
    {/* Inner Secondary Arch */}
    <path
      d="M22 270 V102 C22 55 58 22 100 22 C142 22 178 55 178 102 V270"
      stroke="url(#goldArchGrad)"
      strokeWidth="1"
      strokeDasharray="4 3"
      strokeOpacity="0.75"
    />
    {/* Keystone Center Crest */}
    <g transform="translate(100, 16)">
      <circle cx="0" cy="0" r="9" fill="#283D52" stroke="url(#goldArchGrad)" strokeWidth="1.5" />
      <path d="M-4 0 L0 -4 L4 0 L0 4 Z" fill="url(#goldArchGrad)" />
    </g>
    {/* Decorative Botanical Leaf Flourishes Top Corners */}
    <path
      d="M32 90 C32 60 50 40 75 35 M75 35 C65 42 62 55 64 68 M40 70 C48 58 60 52 75 52"
      stroke="url(#goldArchGrad)"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
      opacity="0.8"
    />
    <path
      d="M168 90 C168 60 150 40 125 35 M125 35 C135 42 138 55 136 68 M160 70 C152 58 140 52 125 52"
      stroke="url(#goldArchGrad)"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
      opacity="0.8"
    />
    {/* Base Pedestal Pillars */}
    <rect x="6" y="266" width="188" height="6" rx="3" fill="url(#goldArchGrad)" opacity="0.9" />
    <rect x="2" y="274" width="196" height="4" rx="2" fill="url(#goldArchGrad)" opacity="0.6" />
  </svg>
);

/**
 * Intertwined Golden Wedding Rings with Diamond Sparkle
 */
export const GoldenRingsSvg: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ringGold1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#DFC28A" />
        <stop offset="50%" stopColor="#C9A86A" />
        <stop offset="100%" stopColor="#8A6B30" />
      </linearGradient>
      <linearGradient id="ringGold2" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F5E4BE" />
        <stop offset="70%" stopColor="#C9A86A" />
        <stop offset="100%" stopColor="#9C7836" />
      </linearGradient>
    </defs>
    {/* First Ring (Left) */}
    <ellipse
      cx="48"
      cy="64"
      rx="32"
      ry="32"
      stroke="url(#ringGold1)"
      strokeWidth="5"
      fill="none"
    />
    {/* Second Ring (Right) */}
    <ellipse
      cx="74"
      cy="56"
      rx="30"
      ry="30"
      stroke="url(#ringGold2)"
      strokeWidth="5"
      fill="none"
    />
    {/* Diamond Setting on Second Ring */}
    <g transform="translate(74, 23)">
      <polygon points="0,-10 8,-2 0,6 -8,-2" fill="#FAF7F2" stroke="url(#ringGold1)" strokeWidth="1.5" />
      <path d="M-8,-2 L8,-2 M0,-10 L0,6" stroke="#C9A86A" strokeWidth="0.8" />
      {/* Light Glint Sparkle */}
      <circle cx="6" cy="-8" r="1.5" fill="#FFFFFF" />
      <path d="M6 -14 V -2 M0 -8 H 12" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
    </g>
  </svg>
);

/**
 * Royal Wax Seal Monogram with Silk Ribbons
 */
export const WaxSealSvg: React.FC<{ className?: string; text?: string }> = ({
  className = 'w-16 h-20',
  text = 'KU',
}) => (
  <svg
    viewBox="0 0 100 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="waxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A32438" />
        <stop offset="50%" stopColor="#7B1425" />
        <stop offset="100%" stopColor="#540816" />
      </linearGradient>
      <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DFC28A" />
        <stop offset="100%" stopColor="#A68244" />
      </linearGradient>
    </defs>
    {/* Hanging Ribbons */}
    <path d="M38 60 L24 116 L44 104 L52 116 L48 60 Z" fill="url(#ribbonGrad)" opacity="0.9" />
    <path d="M62 60 L76 116 L56 104 L48 116 L52 60 Z" fill="url(#ribbonGrad)" opacity="0.8" />
    {/* Outer Wavy Wax Edge */}
    <path
      d="M50 8 C62 8 72 13 80 20 C88 28 92 38 92 50 C92 62 86 72 78 80 C70 88 60 92 48 92 C36 92 26 86 18 78 C10 70 8 60 8 48 C8 36 14 26 22 18 C30 10 40 8 50 8 Z"
      fill="url(#waxGrad)"
      stroke="#C9A86A"
      strokeWidth="1.5"
    />
    {/* Inner Recessed Circle */}
    <circle cx="50" cy="50" r="30" fill="#5E0B19" stroke="#C9A86A" strokeWidth="1.2" strokeDasharray="3 2" />
    {/* Monogram Text */}
    <text
      x="50"
      y="57"
      textAnchor="middle"
      fill="#F5E4BE"
      fontSize="20"
      fontFamily="serif"
      fontWeight="bold"
      letterSpacing="2"
    >
      {text}
    </text>
  </svg>
);

/**
 * Elegant Floral Filigree Divider for headings & cards
 */
export const FloralFiligreeDivider: React.FC<{ className?: string }> = ({
  className = 'w-64 h-6 mx-auto',
}) => (
  <svg
    viewBox="0 0 240 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M0 12 H90 M150 12 H240"
      stroke="#C9A86A"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* Central Botanical Motif */}
    <g transform="translate(120, 12)">
      {/* Center Diamond */}
      <polygon points="0,-4 5,0 0,4 -5,0" fill="#C9A86A" />
      {/* Side Leaves */}
      <path
        d="M-8 0 C-14 -6 -20 -4 -22 0 C-20 4 -14 6 -8 0 Z"
        fill="#C9A86A"
        opacity="0.8"
      />
      <path
        d="M8 0 C14 -6 20 -4 22 0 C20 4 14 6 8 0 Z"
        fill="#C9A86A"
        opacity="0.8"
      />
      {/* Tiny Dots */}
      <circle cx="-28" cy="0" r="1.5" fill="#C9A86A" opacity="0.6" />
      <circle cx="28" cy="0" r="1.5" fill="#C9A86A" opacity="0.6" />
    </g>
  </svg>
);

/**
 * Corner Decorative Filigree for Luxury Cards
 */
export const LuxuryCornerOrnament: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = 'w-8 h-8 text-[#C9A86A]' }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scale(-1, 1)';
      case 'bottom-left':
        return 'scale(1, -1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
      default:
        return 'none';
    }
  };

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: getTransform() }}
      aria-hidden="true"
    >
      <path
        d="M2 38 V12 C2 6 6 2 12 2 H38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M6 34 V14 C6 9 9 6 14 6 H34"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="2 2"
        fill="none"
        opacity="0.6"
      />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.8" />
    </svg>
  );
};
