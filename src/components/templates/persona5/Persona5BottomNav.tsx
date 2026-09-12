import React, { useState, useEffect } from 'react';
import { Home, Users, Calendar, MapPin, Heart, Image, MessageSquare, Star } from 'lucide-react';

export const Persona5BottomNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('p5-home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { id: 'p5-home', label: 'HOME', icon: Home },
    { id: 'p5-couple', label: 'STATUS', icon: Users },
    { id: 'p5-events', label: 'ACARA', icon: Calendar },
    { id: 'p5-location', label: 'LOKASI', icon: MapPin },
    { id: 'p5-story', label: 'KISAH', icon: Heart },
    { id: 'p5-gallery', label: 'GALERI', icon: Image },
    { id: 'p5-rsvp', label: 'RSVP', icon: MessageSquare },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Auto-hide briefly on aggressive rapid downward scroll, re-show on up scroll
      if (currentScrollY > lastScrollY && currentScrollY > 400) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Detect active section
      const sectionIds = ['p5-home', 'p5-couple', 'p5-events', 'p5-location', 'p5-story', 'p5-gallery', 'p5-rsvp'];
      for (const sid of sectionIds) {
        const el = document.getElementById(sid);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.15) {
            setActiveSection(sid);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="p5-bottom-nav"
      className={`fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 select-none ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 bg-[#000000] border-2 border-[#FFFFFF] shadow-[5px_5px_0px_0px_#E60012] -skew-x-6 backdrop-blur-md">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={`relative flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#E60012] text-[#FFFFFF] shadow-sm -translate-y-0.5'
                  : 'text-[#FFFFFF]/75 hover:text-white hover:bg-[#1A1A1E]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0 skew-x-6" />
              <span className="skew-x-6 hidden md:inline">{item.label}</span>
              {isActive && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFF000] rotate-45" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
