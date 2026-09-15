import React, { useState } from 'react';
import { FullInvitationData, Guest } from '../../../types/wedding';
import { weddingService } from '../../../services/weddingService';
import { FleurBotanicaCover } from './FleurBotanicaCover';
import { FleurBotanicaHeader } from './FleurBotanicaHeader';
import { FleurBotanicaGreetingBanner } from './FleurBotanicaGreetingBanner';
import { FleurBotanicaHeroSection } from './FleurBotanicaHeroSection';
import { FleurBotanicaCoupleSection } from './FleurBotanicaCoupleSection';
import { FleurBotanicaEventsSection } from './FleurBotanicaEventsSection';
import { FleurBotanicaLocationSection } from './FleurBotanicaLocationSection';
import { FleurBotanicaStorySection } from './FleurBotanicaStorySection';
import { FleurBotanicaGallerySection } from './FleurBotanicaGallerySection';
import { FleurBotanicaRSVPAndWishes } from './FleurBotanicaRSVPAndWishes';
import { FleurBotanicaClosingSection } from './FleurBotanicaClosingSection';
import { FleurBotanicaAudioPlayer } from './FleurBotanicaAudioPlayer';
import { FleurBotanicaBottomNav } from './FleurBotanicaBottomNav';
import { AdminLoginModal } from '../../admin/AdminLoginModal';

interface FleurBotanicaWeddingViewProps {
  data: FullInvitationData;
  guest?: Guest | null;
  guestName: string;
  isPreview?: boolean;
  onRefreshData?: () => void;
}

export const FleurBotanicaWeddingView: React.FC<FleurBotanicaWeddingViewProps> = ({
  data,
  guest,
  guestName: initialGuestName,
  onRefreshData,
}) => {
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [currentGuestName, setCurrentGuestName] = useState(
    initialGuestName || 'Tamu Terhormat'
  );
  const [musicStarted, setMusicStarted] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const {
    invitation,
    bride,
    groom,
    events = [],
    stories = [],
    gallery = [],
    gifts = [],
    wishes = [],
    sections = [],
  } = data;

  const isSectionEnabled = (key: string) => {
    const s = sections.find((sec) => sec.section_key === key);
    return s ? s.enabled : true;
  };
  const getSec = (key: string) => sections.find((sec) => sec.section_key === key);
  const enabledKeys = sections.filter((s) => s.enabled).map((s) => s.section_key);

  const handleOpenCover = async (enteredName: string) => {
    const finalName = enteredName || currentGuestName;
    setCurrentGuestName(finalName);
    localStorage.setItem('wedding_guest_name', finalName);

    if (guest && guest.guest_code) {
      await weddingService.markGuestOpened(invitation.id, guest.guest_code);
    }
    setIsCoverOpen(false);
    setMusicStarted(true);
  };

  const handleReopenCover = () => {
    setIsCoverOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="fleur-botanica-wedding-view"
      className="min-h-screen bg-[#FAF8F5] text-[#293522] font-serif selection:bg-[#BDA06C]/30 selection:text-[#293522]"
    >
      {/* 1. Opening Botanical Postal Envelope Cover with Wax Seal */}
      <FleurBotanicaCover
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
        <FleurBotanicaHeader invitation={invitation} />

        {/* Recipient Honorific Greeting Banner */}
        {isSectionEnabled('greeting') && (
          <FleurBotanicaGreetingBanner
            guestName={currentGuestName}
            invitation={invitation}
          />
        )}

        {/* Hero Section & Countdown */}
        {isSectionEnabled('hero') && <FleurBotanicaHeroSection invitation={invitation} />}

        {/* Couple Profile Section */}
        {isSectionEnabled('couple') && (
          <FleurBotanicaCoupleSection bride={bride} groom={groom} />
        )}

        {/* Events Schedule & Calendar */}
        {isSectionEnabled('events') && (
          <FleurBotanicaEventsSection events={events} invitation={invitation} />
        )}

        {/* Dedicated Location & Google Maps Section */}
        {isSectionEnabled('location') && (
          <FleurBotanicaLocationSection events={events} section={getSec('location')} />
        )}

        {/* Story Timeline Scrapbook */}
        {isSectionEnabled('story') && (
          <FleurBotanicaStorySection stories={stories} section={getSec('story')} />
        )}

        {/* Photo Gallery Lightbox */}
        {isSectionEnabled('gallery') && (
          <FleurBotanicaGallerySection gallery={gallery} />
        )}

        {/* RSVP, Digital Red Packet, & Wishes */}
        {(isSectionEnabled('rsvp') || isSectionEnabled('gifts') || isSectionEnabled('wishes')) && (
          <FleurBotanicaRSVPAndWishes
            invitationId={invitation.id}
            defaultGuestName={currentGuestName}
            wishes={wishes}
            gifts={gifts}
            guest={guest}
            giftSection={getSec('gifts')}
            isGiftsEnabled={isSectionEnabled('gifts')}
            onRefreshData={onRefreshData}
          />
        )}

        {/* Closing Thank You Section */}
        {isSectionEnabled('closing') && (
          <FleurBotanicaClosingSection
            invitation={invitation}
            bride={bride}
            groom={groom}
            onReopenCover={handleReopenCover}
          />
        )}

        {/* Floating Bottom Quick Navigation Bar */}
        {!isCoverOpen && <FleurBotanicaBottomNav enabledKeys={enabledKeys} />}
      </div>

      {/* Floating Botanical Vinyl / Wax Disc Music Player */}
      <FleurBotanicaAudioPlayer
        customMusicUrl={invitation.music_url}
        autoPlayTrigger={musicStarted}
      />

      {/* Secret Admin Login Modal if triggered */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};
