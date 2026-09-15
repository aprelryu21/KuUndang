import React, { useState } from 'react';
import { FullInvitationData, Guest, WeddingInvitation } from '../../../types/wedding';
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
  // Normalize wedding invitation data from FullInvitationData or WeddingInvitation
  const wedding: WeddingInvitation = directWedding || {
    id: data?.invitation?.id || 'inv-demo-1',
    title: data?.invitation?.title || 'Walimatul Ursy',
    wedding_date: data?.invitation?.wedding_date || '2026-10-20',
    music_url: (data?.invitation as any)?.music_url,
    couples: [
      data?.bride || {
        role: 'bride',
        name: 'Siti Fatimah',
        nickname: 'Siti',
        photo: 'https://lh3.googleusercontent.com/d/17Mkq-ytzCKMJSM5jYUwfosOabtLLdUJz',
        instagram: 'este.en',
        address: 'Jl. Melati No. 12, Jakarta',
        father_name: 'H. Rahmat',
        mother_name: 'Hj. Aminah',
      },
      data?.groom || {
        role: 'groom',
        name: 'April Rian',
        nickname: 'April',
        photo: 'https://lh3.googleusercontent.com/d/1qr9VPrFkya17qAU_kLtpYBLSktn3mBzG',
        instagram: 'aprelryu',
        address: 'Jl. Kenanga No. 8, Bandung',
        father_name: 'H. Syamsudin',
        mother_name: 'Hj. Siti Maryam',
      },
    ],
    events: data?.events || [],
    stories: data?.stories || [],
    galleries: data?.gallery || [],
    wishes: data?.wishes || [],
    gift_info: {
      bank_accounts: (data?.gifts || []).map((g) => ({
        bank_name: g.bank_name || g.title,
        account_number: g.account_number,
        account_name: g.account_holder || g.account_name,
      })),
      address: data?.location?.address || data?.events?.[0]?.address,
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
          onOpenModal={(type) => setActiveModal(type)}
        />
      </div>

      {/* 4. Bottom Quick Dock */}
      {isOpen && (
        <SeriMalaysiaQuickDock
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
