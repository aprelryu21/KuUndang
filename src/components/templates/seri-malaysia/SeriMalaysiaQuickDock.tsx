import React from 'react';
import { Users, Calendar, Heart, Image as ImageIcon, Gift, MessageSquare, Shirt } from 'lucide-react';

interface SeriMalaysiaQuickDockProps {
  enabledSections?: string[];
  onOpenModal: (modalType: 'couple' | 'event' | 'story' | 'gallery' | 'gift' | 'wishes') => void;
  onOpenCharacterSelect: () => void;
}

export const SeriMalaysiaQuickDock: React.FC<SeriMalaysiaQuickDockProps> = ({
  enabledSections = ['couple', 'events', 'story', 'gallery', 'gifts', 'wishes', 'rsvp'],
  onOpenModal,
  onOpenCharacterSelect,
}) => {
  const allItems = [
    { type: 'couple' as const, label: 'Mempelai', icon: Users, navImg: '/templates/seri-malaysia/nav-couple.png' },
    { type: 'event' as const, label: 'Acara', icon: Calendar, navImg: '/templates/seri-malaysia/nav-event.png' },
    { type: 'story' as const, label: 'Kisah', icon: Heart, navImg: null },
    { type: 'gallery' as const, label: 'Galeri', icon: ImageIcon, navImg: '/templates/seri-malaysia/nav-gallery.png' },
    { type: 'gift' as const, label: 'Hadiah', icon: Gift, navImg: '/templates/seri-malaysia/nav-gift.png' },
    { type: 'wishes' as const, label: 'Ucapan', icon: MessageSquare, navImg: '/templates/seri-malaysia/nav-wishes.png' },
  ];

  const items = allItems.filter((item) => {
    if (!enabledSections || enabledSections.length === 0) return true;
    if (item.type === 'event') return enabledSections.includes('events');
    if (item.type === 'gift') return enabledSections.includes('gifts');
    if (item.type === 'wishes') {
      return enabledSections.includes('wishes') || enabledSections.includes('rsvp');
    }
    return enabledSections.includes(item.type);
  });

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 max-w-full px-2">
      <div 
        className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-2xl bg-[#FFFCF3]/95 backdrop-blur-md border-2 border-[#D7BB83] shadow-xl text-[#2A1713]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.type}
              onClick={() => onOpenModal(item.type)}
              className="group flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl hover:bg-[#4C030A]/10 active:scale-95 transition-all text-[#4C030A]"
              title={item.label}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-[#D7BB83]/60 flex items-center justify-center shadow-xs group-hover:border-[#8A1B26] transition-colors">
                {item.navImg ? (
                  <img src={item.navImg} alt={item.label} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                ) : (
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#8A1B26]" />
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] font-semibold mt-1 tracking-tight text-[#4C030A]">
                {item.label}
              </span>
            </button>
          );
        })}

        <div className="w-px h-8 bg-[#D7BB83]/50 mx-1" />

        {/* Change Character Button */}
        <button
          onClick={onOpenCharacterSelect}
          className="group flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-[#4C030A] text-[#D7BB83] hover:bg-[#8A1B26] active:scale-95 transition-all shadow-sm"
          title="Ganti Karakter"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center">
            <Shirt className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold mt-1 tracking-tight">
            Busana
          </span>
        </button>
      </div>
    </div>
  );
};
