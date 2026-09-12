import React, { useState, useEffect } from 'react';
import { FullInvitationData, Guest } from '../../../types/wedding';
import { Persona3OpeningCover } from './Persona3OpeningCover';
import { Persona3HeroSection } from './Persona3HeroSection';
import { Persona3StatusSection } from './Persona3StatusSection';
import { Persona3EventsSection } from './Persona3EventsSection';
import { Persona3SocialLinkStory } from './Persona3SocialLinkStory';
import { Persona3GallerySection } from './Persona3GallerySection';
import { Persona3RSVPAndWishes } from './Persona3RSVPAndWishes';
import { Persona3ClosingSection } from './Persona3ClosingSection';
import { Persona3AudioPlayer } from './Persona3AudioPlayer';
import { LanguageSwitcher } from '../../common/LanguageSwitcher';
import { AdminLoginModal } from '../../admin/AdminLoginModal';
import { UserCheck, Swords, Heart, Camera, Gift, Shield, ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';

interface Persona3WeddingViewProps {
  data: FullInvitationData;
  guest?: Guest | null;
  guestName: string;
  isPreview?: boolean;
  onRefreshData?: () => void;
}

export const Persona3WeddingView: React.FC<Persona3WeddingViewProps> = ({
  data,
  guest,
  guestName: initialGuestName,
  isPreview = false,
  onRefreshData,
}) => {
  const { invitation, bride, groom, events, stories, gallery, gifts, wishes } = data;

  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [guestName, setGuestName] = useState(initialGuestName || 'Tamu Terhormat');
  const [musicStarted, setMusicStarted] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    if (initialGuestName) {
      setGuestName(initialGuestName);
    }
  }, [initialGuestName]);

  const handleOpenInvitation = (enteredName: string) => {
    const finalName = enteredName || guestName || 'Tamu Terhormat';
    setGuestName(finalName);
    localStorage.setItem('wedding_guest_name', finalName);
    setIsCoverOpen(false);
    setMusicStarted(true);
  };

  const handleBackToCover = () => {
    setIsCoverOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050B18] text-[#F0F8FF] font-sans selection:bg-[#00D2FF] selection:text-[#050B18]">
      {/* 1. Opening Cover */}
      <Persona3OpeningCover
        invitation={invitation}
        initialGuestName={guestName}
        isOpen={isCoverOpen}
        onOpen={handleOpenInvitation}
        onTriggerAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Floating Language Switcher (Persona 3 dark mode) */}
      {!isCoverOpen && (
        <div
          className={`fixed right-3 sm:right-6 z-40 transition-all ${
            isPreview ? 'top-14' : 'top-3 sm:top-5'
          }`}
        >
          <LanguageSwitcher theme="dark" />
        </div>
      )}

      {/* Main Content Sections */}
      <main className={`transition-opacity duration-1000 ${isCoverOpen ? 'opacity-0' : 'opacity-100'}`}>
        <Persona3HeroSection invitation={invitation} guestName={guestName} />
        <Persona3StatusSection bride={bride} groom={groom} />
        <Persona3EventsSection events={events} />
        <Persona3SocialLinkStory stories={stories} />
        <Persona3GallerySection gallery={gallery} />
        <Persona3RSVPAndWishes
          invitationId={invitation.id}
          defaultGuestName={guestName}
          guestId={guest?.id}
          gifts={gifts}
          wishes={wishes}
          onRSVPSubmitted={onRefreshData}
          onWishAdded={onRefreshData}
        />
        <Persona3ClosingSection
          invitation={invitation}
          onBackToCover={handleBackToCover}
        />
      </main>

      {/* Persona 3 Stylized Floating Navigation Bar */}
      {!isCoverOpen && (
        <nav
          className="fixed bottom-3 sm:bottom-6 right-3 sm:right-6 z-40 flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#081226]/90 border-2 border-[#00D2FF] shadow-[0_0_20px_rgba(0,210,255,0.4)] backdrop-blur-md"
          aria-label="Persona 3 Quick Navigation"
        >
          <button
            type="button"
            onClick={() => scrollToSection('mempelai')}
            className="p-2 rounded-xl text-[#00D2FF] hover:text-[#FFE600] hover:bg-white/10 transition-colors cursor-pointer"
            title="Mempelai"
          >
            <UserCheck className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('acara')}
            className="p-2 rounded-xl text-[#00D2FF] hover:text-[#FFE600] hover:bg-white/10 transition-colors cursor-pointer"
            title="Acara"
          >
            <Swords className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('cerita')}
            className="p-2 rounded-xl text-[#00D2FF] hover:text-[#FFE600] hover:bg-white/10 transition-colors cursor-pointer"
            title="Kisah Cinta"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('galeri')}
            className="p-2 rounded-xl text-[#00D2FF] hover:text-[#FFE600] hover:bg-white/10 transition-colors cursor-pointer"
            title="Galeri"
          >
            <Camera className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('amplop')}
            className="p-2 rounded-xl text-[#00D2FF] hover:text-[#FFE600] hover:bg-white/10 transition-colors cursor-pointer"
            title="Kado & Amplop"
          >
            <Gift className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('rsvp')}
            className="p-2 rounded-xl text-[#00D2FF] hover:text-[#FFE600] hover:bg-white/10 transition-colors cursor-pointer"
            title="RSVP"
          >
            <Shield className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-[#00D2FF]/30 mx-1" />
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 rounded-xl text-[#FFE600] hover:bg-[#FFE600] hover:text-[#050B18] transition-all cursor-pointer"
            title="Kembali ke Atas"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </nav>
      )}

      {/* Floating Persona 3 Gekkoukan MP3 Audio Player */}
      <Persona3AudioPlayer
        musicUrl={invitation.music_url}
        musicTitle={invitation.music_title}
        musicArtist={invitation.music_artist}
        enabled={invitation.music_enabled}
        autoPlayTrigger={musicStarted}
      />

      {/* Secret Admin Portal Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};
