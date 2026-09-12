import React, { useState } from 'react';
import { FullInvitationData, Guest } from '../../../types/wedding';
import { CuteOpeningCover } from './CuteOpeningCover';
import { CuteTopHeader } from './CuteTopHeader';
import { CuteHeroSection } from './CuteHeroSection';
import { CuteCoupleSection } from './CuteCoupleSection';
import { CuteEventsSection } from './CuteEventsSection';
import { CuteStorySection } from './CuteStorySection';
import { CuteGallerySection } from './CuteGallerySection';
import { CuteRSVPAndWishes } from './CuteRSVPAndWishes';
import { CuteClosingSection } from './CuteClosingSection';
import { CuteMusicPlayer } from './CuteMusicPlayer';
import { CuteBottomNav } from './CuteBottomNav';
import { AdminLoginModal } from '../../admin/AdminLoginModal';

interface CuteFloralWeddingViewProps {
  data: FullInvitationData;
  guest?: Guest | null;
  guestName: string;
  isPreview?: boolean;
  onRefreshData?: () => void;
}

export const CuteFloralWeddingView: React.FC<CuteFloralWeddingViewProps> = ({
  data,
  guest,
  guestName: initialGuestName,
  onRefreshData,
}) => {
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [currentGuestName, setCurrentGuestName] = useState(
    initialGuestName || 'Tamu Terhormat'
  );
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const { invitation, bride, groom, events, stories, gallery, gifts, wishes } = data;

  const handleOpenCover = (enteredName: string) => {
    if (enteredName) {
      setCurrentGuestName(enteredName);
    }
    setIsCoverOpen(false);
  };

  const handleReopenCover = () => {
    setIsCoverOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="cute-floral-wedding-view"
      className="min-h-screen bg-[#FFF0F5] text-[#4A2E35] font-sans selection:bg-[#FF85A2]/30 selection:text-[#E03164]"
    >
      {/* 1. Opening Sweet Love Letter Cover */}
      <CuteOpeningCover
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
        {/* Sticky Top Header */}
        <CuteTopHeader invitation={invitation} />

        {/* Hero Section & Countdown */}
        <CuteHeroSection invitation={invitation} />

        {/* Couple Profile Section */}
        <CuteCoupleSection bride={bride} groom={groom} />

        {/* Events Schedule & Calendar */}
        <CuteEventsSection events={events} invitation={invitation} />

        {/* Story Timeline Scrapbook */}
        <CuteStorySection stories={stories} />

        {/* Photo Gallery Lightbox */}
        <CuteGallerySection gallery={gallery} />

        {/* RSVP, Digital Red Packet, & Wishes */}
        <CuteRSVPAndWishes
          invitationId={invitation.id}
          wishes={wishes}
          gifts={gifts}
          guest={guest}
          guestName={currentGuestName}
          onRefreshData={onRefreshData || (() => {})}
        />

        {/* Closing Thank You Section */}
        <CuteClosingSection
          invitation={invitation}
          onReopenCover={handleReopenCover}
        />

        {/* Floating Cute Bottom Quick Navigation Bar */}
        {!isCoverOpen && <CuteBottomNav />}
      </div>

      {/* Floating Cute Music Player */}
      <CuteMusicPlayer customMusicUrl={invitation.music_url} />

      {/* Secret Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};
