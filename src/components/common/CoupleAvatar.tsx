import React from 'react';
import { User } from 'lucide-react';

interface CoupleAvatarProps {
  photoUrl?: string;
  role: 'bride' | 'groom';
  name: string;
  className?: string;
  theme?: 'javanese' | 'cute' | 'royal' | 'pastel' | 'persona5' | 'default';
}

/**
 * Custom SVG silhouette for Bride (Mempelai Wanita)
 */
export const BrideProfileIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Ikon Profil Mempelai Wanita"
  >
    {/* Background Circle */}
    <circle cx="50" cy="50" r="48" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
    
    {/* Woman Hair Bun / Chignon Silhouette */}
    <ellipse cx="50" cy="27" rx="14" ry="11" opacity="0.35" />
    <circle cx="50" cy="18" r="7" opacity="0.4" />
    
    {/* Woman Face & Neck */}
    <ellipse cx="50" cy="38" rx="12" ry="14" />
    <path d="M46 51 H54 V58 H46 Z" />
    
    {/* Elegant Shoulders & Blouse / Kebaya neckline */}
    <path
      d="M26 84 C26 67 36 60 50 60 C64 60 74 67 74 84 C74 86 73 88 71 88 H29 C27 88 26 86 26 84 Z"
    />
    
    {/* Subtle Neck Jewel / Accents */}
    <circle cx="50" cy="57" r="2.5" fill="#FAF6EE" />
  </svg>
);

/**
 * Custom SVG silhouette for Groom (Mempelai Pria)
 */
export const GroomProfileIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Ikon Profil Mempelai Pria"
  >
    {/* Background Circle */}
    <circle cx="50" cy="50" r="48" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
    
    {/* Groom Hair Cut Silhouette */}
    <path
      d="M36 34 C36 22 43 17 50 17 C57 17 64 22 64 34 C64 36 62 36 61 32 C58 27 54 26 50 26 C46 26 42 27 39 32 C38 36 36 36 36 34 Z"
      opacity="0.5"
    />
    
    {/* Groom Face & Neck */}
    <ellipse cx="50" cy="38" rx="12" ry="14" />
    <path d="M45 51 H55 V59 H45 Z" />
    
    {/* Groom Suit / Beskap / Shoulders */}
    <path
      d="M24 84 C24 67 35 61 50 61 C65 61 76 67 76 84 C76 86 75 88 73 88 H27 C25 88 24 86 24 84 Z"
    />
    
    {/* Tie / Bow / Collar accent */}
    <polygon points="50,62 46,70 54,70" fill="#FAF6EE" />
  </svg>
);

export const CoupleAvatar: React.FC<CoupleAvatarProps> = ({
  photoUrl,
  role,
  name,
  className = 'w-full h-full',
  theme = 'default',
}) => {
  const [imgError, setImgError] = React.useState(false);

  // If photoUrl exists and not failed, show image
  if (photoUrl && photoUrl.trim() !== '' && !imgError) {
    return (
      <img
        src={photoUrl}
        alt={name}
        onError={() => setImgError(true)}
        className={`object-cover ${className}`}
      />
    );
  }

  // Theme-specific styling for profile icon placeholder
  let bgClass = 'bg-stone-100 text-stone-600';
  let iconColor = 'text-stone-500';

  if (theme === 'javanese') {
    bgClass = 'bg-[#2A170C] text-[#D4AF37] border-2 border-[#D4AF37]/40';
    iconColor = 'text-[#D4AF37]';
  } else if (theme === 'cute') {
    bgClass = 'bg-[#FFF0F5] text-[#FF5C8D] border-2 border-[#FFA3B8]/60';
    iconColor = 'text-[#FF5C8D]';
  } else if (theme === 'royal') {
    bgClass = 'bg-[#152331] text-[#C2A56B] border-2 border-[#C2A56B]/40';
    iconColor = 'text-[#C2A56B]';
  } else if (theme === 'pastel') {
    bgClass = 'bg-[#FFF9EB] text-[#F39C12] border-2 border-[#F39C12]/40';
    iconColor = 'text-[#F39C12]';
  } else if (theme === 'persona5') {
    bgClass = 'bg-[#111111] text-[#E60012] border-2 border-[#E60012]/60';
    iconColor = 'text-[#E60012]';
  }

  return (
    <div
      className={`flex flex-col items-center justify-center relative p-4 transition-all select-none ${bgClass} ${className}`}
      title={name}
    >
      <div className="transform scale-110 mb-2">
        {role === 'bride' ? (
          <BrideProfileIcon className={`w-24 h-24 sm:w-28 sm:h-28 ${iconColor}`} />
        ) : (
          <GroomProfileIcon className={`w-24 h-24 sm:w-28 sm:h-28 ${iconColor}`} />
        )}
      </div>

      <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase opacity-85 text-center truncate max-w-full px-2">
        {role === 'bride' ? 'Mempelai Wanita' : 'Mempelai Pria'}
      </span>
      <span className="text-[10px] opacity-65 text-center truncate max-w-full font-serif">
        {name}
      </span>
    </div>
  );
};
