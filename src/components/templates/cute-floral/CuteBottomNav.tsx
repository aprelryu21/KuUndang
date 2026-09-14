import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Users, Camera, MessageSquare, Home, MapPin } from 'lucide-react';
import { CuteSakuraFlower } from './cuteFloralAssets';

interface CuteBottomNavProps {
  enabledKeys?: string[];
}

export const CuteBottomNav: React.FC<CuteBottomNavProps> = ({ enabledKeys }) => {
  const [activeSection, setActiveSection] = useState('cute-hero');

  const allNavItems = [
    { id: 'cute-hero', key: 'hero', label: 'Awal', icon: Home },
    { id: 'cute-couple', key: 'couple', label: 'Mempelai', icon: Users },
    { id: 'cute-events', key: 'events', label: 'Acara', icon: Calendar },
    { id: 'cute-location', key: 'location', label: 'Lokasi', icon: MapPin },
    { id: 'cute-story', key: 'story', label: 'Kisah', icon: Heart },
    { id: 'cute-gallery', key: 'gallery', label: 'Galeri', icon: Camera },
    { id: 'cute-rsvp', key: 'rsvp', label: 'Ucapan', icon: MessageSquare },
  ];

  const navItems = enabledKeys
    ? allNavItems.filter((item) => enabledKeys.includes(item.key))
    : allNavItems;

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="cute-bottom-nav"
      className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-3 pointer-events-none"
    >
      <div className="pointer-events-auto bg-white/95 border-2 border-[#FFA3B8] rounded-full px-3 py-1.5 shadow-[0_8px_30px_rgba(255,133,162,0.3)] backdrop-blur-md flex items-center gap-1 sm:gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleScrollTo(item.id)}
              className={`flex flex-col items-center justify-center px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF5C8D] to-[#FF477E] text-white shadow-xs scale-105'
                  : 'text-[#8A505F] hover:text-[#FF5C8D] hover:bg-[#FFF0F5]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[9px] sm:text-[10px] font-sans font-bold tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
