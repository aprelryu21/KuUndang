import React, { useState } from 'react';
import { FullInvitationData, Guest } from '../../../types/wedding';
import { weddingService } from '../../../services/weddingService';
import { CuteOpeningCover } from './CuteOpeningCover';
import { CuteTopHeader } from './CuteTopHeader';
import { CuteGreetingBanner } from './CuteGreetingBanner';
import { CuteHeroSection } from './CuteHeroSection';
import { CuteCoupleSection } from './CuteCoupleSection';
import { CuteEventsSection } from './CuteEventsSection';
import { CuteLocationSection } from './CuteLocationSection';
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

  const { invitation, bride, groom, events, stories, gallery, gifts, wishes, sections = [] } = data;

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

        {/* Recipient Honorific Greeting Banner (Nama Penerima di Bagian Paling Atas Isi) */}
        {isSectionEnabled('greeting') && (
          <CuteGreetingBanner
            guestName={currentGuestName}
            invitation={invitation}
          />
        )}

        {/* Hero Section & Countdown */}
        {isSectionEnabled('hero') && <CuteHeroSection invitation={invitation} />}

        {/* Couple Profile Section */}
        {isSectionEnabled('couple') && <CuteCoupleSection bride={bride} groom={groom} />}

        {/* Events Schedule & Calendar */}
        {isSectionEnabled('events') && <CuteEventsSection events={events} invitation={invitation} />}

        {/* Dedicated Location & Google Maps Section */}
        {isSectionEnabled('location') && (
          <CuteLocationSection events={events} section={getSec('location')} />
        )}

        {/* Story Timeline Scrapbook */}
        {isSectionEnabled('story') && (
          <CuteStorySection stories={stories} section={getSec('story')} />
        )}

        {/* Photo Gallery Lightbox */}
        {isSectionEnabled('gallery') && <CuteGallerySection gallery={gallery} />}

        {/* RSVP, Digital Red Packet, & Wishes */}
        {(isSectionEnabled('rsvp') || isSectionEnabled('gifts') || isSectionEnabled('wishes')) && (
          <CuteRSVPAndWishes
            invitationId={invitation.id}
            wishes={wishes}
            gifts={gifts}
            guest={guest}
            guestName={currentGuestName}
            onRefreshData={onRefreshData || (() => {})}
          />
        )}

        {/* Closing Thank You Section */}
        {isSectionEnabled('closing') && (
          <CuteClosingSection
            invitation={invitation}
            onReopenCover={handleReopenCover}
          />
        )}

        {/* Floating Cute Bottom Quick Navigation Bar */}
        {!isCoverOpen && <CuteBottomNav enabledKeys={enabledKeys} />}
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
