import React, { useState, useMemo } from 'react';
import { FullInvitationData, Guest, WeddingInvitation } from '../../../types/wedding';
import { INITIAL_DEMO_DATA } from '../../../data/initialDemo';
import { SeriMalaysiaCover } from './SeriMalaysiaCover';
import { SeriMalaysiaCanvas } from './SeriMalaysiaCanvas';
import {
  SeriMalaysiaCharacterSelector,
  CHARACTER_OPTIONS,
  CharacterOption,
} from './SeriMalaysiaCharacterSelector';
import { SeriMalaysiaAudioPlayer } from './SeriMalaysiaAudioPlayer';
import { SeriMalaysiaQuickDock } from './SeriMalaysiaQuickDock';
import { SeriMalaysiaCoupleModal } from './modals/SeriMalaysiaCoupleModal';
import { SeriMalaysiaEventModal } from './modals/SeriMalaysiaEventModal';
import { SeriMalaysiaStoryModal } from './modals/SeriMalaysiaStoryModal';
import { SeriMalaysiaGalleryModal } from './modals/SeriMalaysiaGalleryModal';
import { SeriMalaysiaGiftModal } from './modals/SeriMalaysiaGiftModal';
import { SeriMalaysiaWishesModal } from './modals/SeriMalaysiaWishesModal';

interface SeriMalaysiaWeddingViewProps {
  data?: FullInvitationData | null;
  wedding?: WeddingInvitation | null;
  guest?: Guest | null;
  guestName?: string;
  isPreview?: boolean;
  onRefreshData?: () => void;
}

export const SeriMalaysiaWeddingView: React.FC<SeriMalaysiaWeddingViewProps> = ({
  data,
  wedding: directWedding,
  guestName = 'Tamu Undangan',
}) => {
  const fallbackDemo = INITIAL_DEMO_DATA;

  // Normalize wedding invitation data from FullInvitationData or WeddingInvitation, strictly using standard dummy fallbacks
  const wedding: WeddingInvitation = directWedding || {
    id: data?.invitation?.id || fallbackDemo.invitation.id,
    title: data?.invitation?.title || fallbackDemo.invitation.title,
    wedding_date: data?.invitation?.wedding_date || fallbackDemo.invitation.wedding_date,
    music_url: data?.invitation?.music_url || fallbackDemo.invitation.music_url,
    couples: [
      {
        role: 'bride',
        name: data?.bride?.full_name || fallbackDemo.bride.full_name,
        nickname: data?.bride?.nickname || fallbackDemo.bride.nickname,
        photo: data?.bride?.photo_url || fallbackDemo.bride.photo_url,
        instagram: data?.bride?.instagram || fallbackDemo.bride.instagram,
        address: data?.bride?.address || fallbackDemo.bride.address,
        father_name: data?.bride?.father_name || fallbackDemo.bride.father_name,
        mother_name: data?.bride?.mother_name || fallbackDemo.bride.mother_name,
        child_order: data?.bride?.child_order || fallbackDemo.bride.child_order,
      },
      {
        role: 'groom',
        name: data?.groom?.full_name || fallbackDemo.groom.full_name,
        nickname: data?.groom?.nickname || fallbackDemo.groom.nickname,
        photo: data?.groom?.photo_url || fallbackDemo.groom.photo_url,
        instagram: data?.groom?.instagram || fallbackDemo.groom.instagram,
        address: data?.groom?.address || fallbackDemo.groom.address,
        father_name: data?.groom?.father_name || fallbackDemo.groom.father_name,
        mother_name: data?.groom?.mother_name || fallbackDemo.groom.mother_name,
        child_order: data?.groom?.child_order || fallbackDemo.groom.child_order,
      },
    ],
    events: (data?.events && data.events.length > 0) ? data.events : fallbackDemo.events,
    stories: (data?.stories && data.stories.length > 0) ? data.stories : fallbackDemo.stories,
    galleries: (data?.gallery && data.gallery.length > 0) ? data.gallery : fallbackDemo.gallery,
    wishes: (data?.wishes && data.wishes.length > 0) ? data.wishes : fallbackDemo.wishes,
    gift_info: {
      bank_accounts: ((data?.gifts && data.gifts.length > 0) ? data.gifts : fallbackDemo.gifts).map((g) => ({
        bank_name: g.bank_name || g.provider || (g as any).title || 'Bank Mandiri',
        account_number: g.account_number,
        account_name: g.account_name || (g as any).account_holder || fallbackDemo.groom.full_name,
      })),
      address: data?.events?.[0]?.address || fallbackDemo.events[0]?.address,
    },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterOption>(
    CHARACTER_OPTIONS[0]
  );
  const [showCharacterSelector, setShowCharacterSelector] = useState(false);
  const [activeModal, setActiveModal] = useState<
    'couple' | 'event' | 'story' | 'gallery' | 'gift' | 'wishes' | null
  >(null);

  // Compute enabled sections dynamically based on admin sections
  const enabledSections = useMemo(() => {
    const list: string[] = [];
    if (data?.sections && data.sections.length > 0) {
      data.sections.forEach((s) => {
        if (s.enabled) list.push(s.section_key);
      });
    } else {
      list.push('couple', 'events', 'story', 'gallery', 'gifts', 'wishes', 'rsvp');
    }
    if (data?.invitation?.music_enabled !== false) {
      list.push('music');
    }
    return list;
  }, [data?.sections, data?.invitation?.music_enabled]);

  const handleOpenCover = () => {
    setIsOpen(true);
    // Open character selection first time entering the garden
    setShowCharacterSelector(true);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#1A1015]">
      {/* 1. Cover Opening Screen */}
      {!isOpen && (
        <SeriMalaysiaCover
          wedding={wedding}
          guestName={guestName}
          onOpen={handleOpenCover}
        />
      )}

      {/* 2. Audio Player */}
      <SeriMalaysiaAudioPlayer
        musicUrl={wedding.music_url}
        autoPlay={isOpen}
      />

      {/* 3. Main Exploration Game Canvas */}
      <div className="w-full h-full">
        <SeriMalaysiaCanvas
          character={selectedCharacter}
          guestName={guestName}
          enabledSections={enabledSections}
          onOpenModal={(type) => setActiveModal(type)}
        />
      </div>

      {/* 4. Bottom Quick Dock */}
      {isOpen && (
        <SeriMalaysiaQuickDock
          enabledSections={enabledSections}
          onOpenModal={(type) => setActiveModal(type)}
          onOpenCharacterSelect={() => setShowCharacterSelector(true)}
        />
      )}

      {/* 5. Modals for Wedding Stations */}
      {activeModal === 'couple' && (
        <SeriMalaysiaCoupleModal
          wedding={wedding}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'event' && (
        <SeriMalaysiaEventModal
          wedding={wedding}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'story' && (
        <SeriMalaysiaStoryModal
          wedding={wedding}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'gallery' && (
        <SeriMalaysiaGalleryModal
          wedding={wedding}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'gift' && (
        <SeriMalaysiaGiftModal
          wedding={wedding}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'wishes' && (
        <SeriMalaysiaWishesModal
          wedding={wedding}
          guestName={guestName}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* 6. Character Selector Dialog */}
      {showCharacterSelector && (
        <SeriMalaysiaCharacterSelector
          selectedId={selectedCharacter.id}
          onSelect={(char) => setSelectedCharacter(char)}
          onClose={() => setShowCharacterSelector(false)}
        />
      )}
    </div>
  );
};
export default SeriMalaysiaWeddingView;
