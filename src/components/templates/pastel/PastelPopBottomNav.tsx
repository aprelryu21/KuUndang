import React, { useState, useEffect } from 'react';
import { Home, Users, Calendar, MapPin, BookOpen, Camera, Mail } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export const PastelPopBottomNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('cute-home');

  const navItems: NavItem[] = [
    { id: 'cute-home', label: 'Home', icon: <Home className="w-4 h-4" />, color: '#FF6B8B' },
    { id: 'cute-couple', label: 'Mempelai', icon: <Users className="w-4 h-4" />, color: '#4D96FF' },
    { id: 'cute-events', label: 'Acara', icon: <Calendar className="w-4 h-4" />, color: '#FFD166' },
    { id: 'cute-location', label: 'Lokasi', icon: <MapPin className="w-4 h-4" />, color: '#06D6A0' },
    { id: 'cute-story', label: 'Kisah', icon: <BookOpen className="w-4 h-4" />, color: '#9D80CB' },
    { id: 'cute-gallery', label: 'Galeri', icon: <Camera className="w-4 h-4" />, color: '#FF6B8B' },
    { id: 'cute-rsvp', label: 'RSVP', icon: <Mail className="w-4 h-4" />, color: '#06D6A0' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-3 sm:bottom-5 inset-x-0 z-40 flex justify-center px-3 pointer-events-none select-none">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-full border-3 border-[#2B2D42] shadow-[6px_6px_0px_0px_#FFD166] p-1.5 sm:p-2 flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-full">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#2B2D42] text-white shadow-xs scale-105'
                  : 'text-[#2B2D42]/70 hover:text-[#2B2D42] hover:bg-slate-100'
              }`}
              style={{
                borderColor: isActive ? item.color : 'transparent',
              }}
            >
              <span style={{ color: isActive ? item.color : 'inherit' }}>
                {item.icon}
              </span>
              <span className={`text-[10px] sm:text-xs ${isActive ? 'inline' : 'hidden md:inline'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
