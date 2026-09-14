import React, { useState, useEffect } from 'react';
import { Home, Users, Calendar, MapPin, Heart, Image, MessageSquareHeart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface FloatingNavProps {
  enabledKeys?: string[];
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ enabledKeys }) => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const allNavItems = [
    { id: 'hero', label: t.navHome, icon: Home },
    { id: 'couple', label: t.navCouple, icon: Users },
    { id: 'events', label: t.navEvent, icon: Calendar },
    { id: 'location', label: t.navLocation, icon: MapPin },
    { id: 'story', label: t.loveStory || 'Kisah', icon: Heart },
    { id: 'gallery', label: t.navGallery, icon: Image },
    { id: 'rsvp', label: t.navRsvp, icon: MessageSquareHeart },
  ];

  const navItems = enabledKeys
    ? allNavItems.filter((item) => enabledKeys.includes(item.id))
    : allNavItems;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Shrink / hide slightly when scrolling down rapidly
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Determine active section
      const sections = navItems.map((n) => n.id);
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, navItems]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="floating-nav"
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#FFFCF7]/90 backdrop-blur-md border border-[#C2A56B]/40 shadow-lg text-[#24313A]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#283D52] text-[#FFFCF7] shadow-xs'
                  : 'text-[#768692] hover:text-[#283D52] hover:bg-[#F7F2EA]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className={`text-[11px] ${isActive ? 'inline' : 'hidden sm:inline'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
