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
    setMusicStarted(true);
  };

  const handleBackToCover = () => {
    setIsCoverOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="javanese-wedding-root"
      className="relative min-h-screen bg-[#1A1009] text-[#FAF6EE] overflow-x-hidden font-serif select-none selection:bg-[#D4AF37] selection:text-[#1A1009]"
    >
      {/* 1. Fullscreen Opening Cover Modal */}
      <JavaneseOpeningCover
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
        {isSectionEnabled('greeting') && (
          <JavaneseGreetingBanner
            guestName={currentGuestName}
            invitation={invitation}
          />
        )}

        {/* Hero & Ceremonial Countdown Section */}
        {isSectionEnabled('hero') && <JavaneseHeroSection invitation={invitation} />}

        {/* Sang Pinanganten Couple Profile */}
        {isSectionEnabled('couple') && <JavaneseCoupleSection bride={bride} groom={groom} />}

        {/* Reroncening Adicara (Events & Calendar) */}
        {isSectionEnabled('events') && <JavaneseEventsSection events={events} invitation={invitation} />}

        {/* Papan Palakrama (Location & Google Maps) */}
        {isSectionEnabled('location') && <JavaneseLocationSection events={events} />}

        {/* Lelampahan Tresna (Story Timeline) */}
        {isSectionEnabled('story') && <JavaneseStorySection stories={stories} section={getSec('story')} />}

        {/* Pasinaon Potret (Photo Gallery Lightbox) */}
        {isSectionEnabled('gallery') && <JavaneseGallerySection gallery={gallery} />}

        {/* Tali Asih, Konfirmasi Rawuh (RSVP), & Donga Pangestu (Wishes) */}
        {(isSectionEnabled('rsvp') || isSectionEnabled('gifts') || isSectionEnabled('wishes')) && (
          <JavaneseRSVPAndWishes
            invitationId={invitation.id}
            defaultGuestName={currentGuestName}
            gifts={gifts}
            wishes={wishes}
            onRefreshData={onRefreshData}
          />
        )}

        {/* Pambagyaharja, Family Thanks, & Back to Cover */}
        {isSectionEnabled('closing') && (
          <JavaneseClosingSection
            invitation={invitation}
            bride={bride}
            groom={groom}
            onBackToCover={handleBackToCover}
          />
        )}

        {/* Floating Bottom Quick Navigation Bar */}
        {!isCoverOpen && <JavaneseBottomNav enabledKeys={enabledKeys} />}
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
