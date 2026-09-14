import React, { useState } from 'react';
import { FullInvitationData, Guest } from '../../../types/wedding';
import { JavaneseCover } from './JavaneseCover';
import { JavaneseHeader } from './JavaneseHeader';
import { JavaneseGreetingBanner } from './JavaneseGreetingBanner';
import { JavaneseHeroSection } from './JavaneseHeroSection';
import { JavaneseCoupleSection } from './JavaneseCoupleSection';
import { JavaneseEventsSection } from './JavaneseEventsSection';
import { JavaneseLocationSection } from './JavaneseLocationSection';
import { JavaneseStorySection } from './JavaneseStorySection';
import { JavaneseGallerySection } from './JavaneseGallerySection';
import { JavaneseRSVPAndWishes } from './JavaneseRSVPAndWishes';
import { JavaneseClosingSection } from './JavaneseClosingSection';
import { JavaneseGamelanPlayer } from './JavaneseGamelanPlayer';
import { JavaneseBottomNav } from './JavaneseBottomNav';
import { AdminLoginModal } from '../../admin/AdminLoginModal';

interface JavaneseWeddingViewProps {
  data: FullInvitationData;
  guest?: Guest | null;
  guestName: string;
  isPreview?: boolean;
  onRefreshData?: () => void;
}

export const JavaneseWeddingView: React.FC<JavaneseWeddingViewProps> = ({
  data,
  guestName: initialGuestName,
  onRefreshData,
}) => {
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [currentGuestName, setCurrentGuestName] = useState(
    initialGuestName || 'Tamu Terhormat'
  );
  const [musicStarted, setMusicStarted] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const { invitation, bride, groom, events, stories, gallery, gifts, wishes } = data;

  const handleOpenCover = (enteredName: string) => {
    if (enteredName) {
      setCurrentGuestName(enteredName);
    }
    setIsCoverOpen(false);
    setMusicStarted(true);
  };

  const handleBackToCover = () => {
    setIsCoverOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="javanese-wedding-view"
      className="min-h-screen bg-[#1A1009] text-[#FAF6EE] font-serif selection:bg-[#D4AF37]/30 selection:text-[#FAF6EE]"
    >
      {/* 1. Opening Ceremonial Cover with Sacred Gong Sfx */}
      <JavaneseCover
        invitation={invitation}
        initialGuestName={currentGuestName}
        isOpen={isCoverOpen}
        onOpen={handleOpenCover}
      />

      {/* 2. Main Inside Invitation Content */}
      <div
        className={`transition-opacity duration-1000 ${
          isCoverOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Top Sacred Bar with Language Switcher */}
        <JavaneseHeader invitation={invitation} />

        {/* Recipient Honorific Greeting Banner (Nama Penerima di Bagian Atas Isi) */}
        <JavaneseGreetingBanner
          guestName={currentGuestName}
          invitation={invitation}
        />

        {/* Hero & Ceremonial Countdown Section */}
        <JavaneseHeroSection invitation={invitation} />

        {/* Sang Pinanganten Couple Profile */}
        <JavaneseCoupleSection bride={bride} groom={groom} />

        {/* Reroncening Adicara (Events & Calendar) */}
        <JavaneseEventsSection events={events} invitation={invitation} />

        {/* Papan Palakrama (Location & Google Maps) */}
        <JavaneseLocationSection events={events} />

        {/* Lelampahan Tresna (Story Timeline) */}
        <JavaneseStorySection stories={stories} />

        {/* Pasinaon Potret (Photo Gallery Lightbox) */}
        <JavaneseGallerySection gallery={gallery} />

        {/* Tali Asih, Konfirmasi Rawuh (RSVP), & Donga Pangestu (Wishes) */}
        <JavaneseRSVPAndWishes
          invitationId={invitation.id}
          defaultGuestName={currentGuestName}
          gifts={gifts}
          wishes={wishes}
          onRefreshData={onRefreshData}
        />

        {/* Pambagyaharja, Family Thanks, & Back to Cover */}
        <JavaneseClosingSection
          invitation={invitation}
          bride={bride}
          groom={groom}
          onBackToCover={handleBackToCover}
        />

        {/* Floating Bottom Quick Navigation Bar */}
        {!isCoverOpen && <JavaneseBottomNav />}
      </div>

      {/* Floating Sacred Gamelan Music Player */}
      <JavaneseGamelanPlayer autoPlayTrigger={musicStarted} />

      {/* Secret Admin Login Modal if triggered */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};
