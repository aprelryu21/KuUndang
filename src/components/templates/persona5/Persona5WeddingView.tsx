import React, { useState } from 'react';
import { FullInvitationData, Guest } from '../../../types/wedding';
import { Persona5OpeningCover } from './Persona5OpeningCover';
import { Persona5TopHeader } from './Persona5TopHeader';
import { Persona5GreetingBanner } from './Persona5GreetingBanner';
import { Persona5HeroSection } from './Persona5HeroSection';
import { Persona5StatusSection } from './Persona5StatusSection';
import { Persona5EventsSection } from './Persona5EventsSection';
import { Persona5LocationSection } from './Persona5LocationSection';
import { Persona5SocialLinkStory } from './Persona5SocialLinkStory';
import { Persona5GallerySection } from './Persona5GallerySection';
import { Persona5RSVPAndWishes } from './Persona5RSVPAndWishes';
import { Persona5ClosingSection } from './Persona5ClosingSection';
import { Persona5AudioPlayer, PERSONA5_DEFAULT_MUSIC } from './Persona5AudioPlayer';
import { Persona5BottomNav } from './Persona5BottomNav';
import { AdminLoginModal } from '../../admin/AdminLoginModal';

interface Persona5WeddingViewProps {
  data: FullInvitationData;
  guest?: Guest | null;
  guestName: string;
  isPreview?: boolean;
  onRefreshData?: () => void;
}

export const Persona5WeddingView: React.FC<Persona5WeddingViewProps> = ({
  data,
  guest,
  guestName,
  isPreview = false,
  onRefreshData,
}) => {
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [musicStarted, setMusicStarted] = useState(false);
  const [activeGuestName, setActiveGuestName] = useState(guestName || 'Tamu Terhormat');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const { invitation, bride, groom, events, stories, gallery, gifts, wishes } = data;

  // Determine Persona 5 soundtrack: ensure Persona 5 has its distinctive Tokyo Acid Jazz vibe
  const persona5MusicUrl =
    invitation.music_url && !invitation.music_url.includes('Canon')
      ? invitation.music_url
      : PERSONA5_DEFAULT_MUSIC.url;

  const persona5MusicTitle =
    invitation.music_title && !invitation.music_title.includes('Canon')
      ? invitation.music_title
      : PERSONA5_DEFAULT_MUSIC.title;

  const persona5MusicArtist =
    invitation.music_artist && !invitation.music_artist.includes('Pachelbel')
      ? invitation.music_artist
      : PERSONA5_DEFAULT_MUSIC.artist;

  const handleOpenInvitation = (enteredName: string) => {
    setActiveGuestName(enteredName || guestName || 'Tamu Terhormat');
    setIsCoverOpen(false);
    setMusicStarted(true);
  };

  const handleBackToCover = () => {
    setIsCoverOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0D0D0D] text-[#FFFFFF] font-sans selection:bg-[#E60012] selection:text-white pb-20 sm:pb-24">
      {/* 1. OPENING COVER MODAL (CALLING CARD) */}
      {isCoverOpen && (
        <Persona5OpeningCover
          invitation={invitation}
          guestName={activeGuestName}
          guest={guest}
          onOpen={handleOpenInvitation}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
        />
      )}

      {/* 2. TOP HEADER (STICKY) - RECIPIENT NAME & CONTROLS */}
      {!isCoverOpen && (
        <Persona5TopHeader
          guestName={activeGuestName}
          onBackToCover={handleBackToCover}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
        />
      )}

      {/* 3. FLOATING AUDIO PLAYER (Acid Jazz Lounge Soundtrack) */}
      {invitation.music_enabled !== false && (
        <Persona5AudioPlayer
          musicUrl={persona5MusicUrl}
          musicTitle={persona5MusicTitle}
          musicArtist={persona5MusicArtist}
          autoPlay={musicStarted}
        />
      )}

      {/* 4. MAIN INVITATION BODY */}
      <main className="relative">
        {/* Section: Personal Greeting & Holy Verse */}
        <Persona5GreetingBanner
          guestName={activeGuestName}
          invitation={invitation}
        />

        {/* Dynamic Stylized Diagonal Marquee Strip 1 */}
        <div className="bg-[#E60012] text-white py-2 overflow-hidden select-none -rotate-1 shadow-md border-y border-white">
          <div className="flex whitespace-nowrap text-xs font-black tracking-[0.3em] font-mono uppercase animate-pulse">
            <span className="mx-4">★ TAKE YOUR HEART ★</span>
            <span className="mx-4">THE PHANTOM THIEVES OF HEARTS</span>
            <span className="mx-4">★ SACRED WEDDING HEIST ★</span>
            <span className="mx-4">STEAL THE FUTURE</span>
            <span className="mx-4">★ THOU ART I, AND I AM THOU ★</span>
            <span className="mx-4">★ TAKE YOUR HEART ★</span>
            <span className="mx-4">THE PHANTOM THIEVES OF HEARTS</span>
            <span className="mx-4">★ SACRED WEDDING HEIST ★</span>
          </div>
        </div>

        {/* Section 1: Home (Hero & Countdown) */}
        <Persona5HeroSection invitation={invitation} />

        {/* Section 2: Mempelai (Character Status Screen - April & Siti) */}
        <Persona5StatusSection bride={bride} groom={groom} />

        {/* Section 3: Acara (Target Infiltration Operations - Akad, Resepsi, Unduh Mantu) */}
        <Persona5EventsSection events={events} invitation={invitation} />

        {/* Section 4: Lokasi (Dedicated Tactical Coordinates & Google Maps) */}
        <Persona5LocationSection events={events} />

        {/* Dynamic Stylized Diagonal Marquee Strip 2 */}
        <div className="bg-[#FFF000] text-black py-2 overflow-hidden select-none rotate-1 shadow-md border-y-2 border-black">
          <div className="flex whitespace-nowrap text-xs font-black tracking-[0.3em] font-mono uppercase">
            <span className="mx-4">★ CONFIDANT BOND MAX ★</span>
            <span className="mx-4">ALL-OUT ATTACK FINISHER</span>
            <span className="mx-4">★ VELVET ROOM COGNITION ★</span>
            <span className="mx-4">APRIL & SITI WEDDING CELEBRATION</span>
            <span className="mx-4">★ CONFIDANT BOND MAX ★</span>
            <span className="mx-4">ALL-OUT ATTACK FINISHER</span>
          </div>
        </div>

        {/* Section 5: Timeline Kisah (Confidant Story Chronicle with Photo Illustrations) */}
        <Persona5SocialLinkStory stories={stories} />

        {/* Section 6: Galeri Foto (All-Out Attack Finishing Touch & Finisher Lightbox) */}
        <Persona5GallerySection gallery={gallery} />

        {/* Section 7: RSVP & Amplop Digital & Ucapan (Velvet Room Tribute & Battle Command RSVP) */}
        <Persona5RSVPAndWishes
          invitationId={invitation.id}
          gifts={gifts}
          wishes={wishes}
          defaultGuestName={activeGuestName}
          guestId={guest?.id}
          onRefreshData={onRefreshData}
        />

        {/* Section 8: Penutup (Mission Complete Closing) */}
        <Persona5ClosingSection invitation={invitation} onBackToCover={handleBackToCover} />
      </main>

      {/* 6. PERSONA 5 STYLIZED FLOATING BOTTOM NAVIGATION */}
      {!isCoverOpen && <Persona5BottomNav />}

      {/* 7. ADMIN LOGIN MODAL */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};
