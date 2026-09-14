import React, { useState, useEffect, useCallback } from 'react';
import { FullInvitationData, Guest } from '../../../types/wedding';
import { MarioOpeningCover } from './MarioOpeningCover';
import { MarioCanvasGame } from './MarioCanvasGame';
import { MarioCloudInfoOverlay } from './MarioCloudInfoOverlay';
import { MarioControlsOverlay } from './MarioControlsOverlay';
import { MarioFullBookModal } from './MarioFullBookModal';
import { marioAudio } from './marioAudio';

export interface MarioWeddingViewProps {
  data: FullInvitationData;
  guest?: Guest | null;
  guestName?: string;
  isPreview?: boolean;
  onRefreshData?: () => void;
}

const ZONE_X_TARGETS = [
  120,  // Zone 0: Sambutan (World 1-1)
  1200, // Zone 1: Mempelai (World 1-2)
  2150, // Zone 2: Kisah Kasih (World 1-3)
  3100, // Zone 3: Rangkaian Acara (World 1-4)
  4050, // Zone 4: Galeri Kenangan (World 1-5)
  5000, // Zone 5: Tanda Kasih (World 1-6)
  5950, // Zone 6: Buku Tamu & RSVP (World 1-7)
  6900, // Zone 7: Pelaminan Impian & Finish (World 1-8)
];

export const MarioWeddingView: React.FC<MarioWeddingViewProps> = ({
  data,
  guest,
  guestName = '',
  isPreview,
  onRefreshData,
}) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [playerGender, setPlayerGender] = useState<'tuan' | 'nyonya'>('tuan');
  const [playerName, setPlayerName] = useState(guestName || '');
  const [currentZone, setCurrentZone] = useState(0);
  const [coins, setCoins] = useState(0);
  const [score, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullModalOpen, setIsFullModalOpen] = useState(false);

  // Detect mobile / touch device without physical keyboard
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const hasTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsMobileDevice(hasTouch);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Control triggers for mobile / touch buttons
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);
  const [isJumpRequested, setIsJumpRequested] = useState(false);

  // Teleport target X
  const [teleportX, setTeleportX] = useState<number | null>(null);

  // Sync initial guest name
  useEffect(() => {
    if (guestName && !playerName) {
      setPlayerName(guestName);
    }
  }, [guestName, playerName]);

  const handleStartGame = (name: string, gender: 'tuan' | 'nyonya') => {
    setPlayerName(name);
    setPlayerGender(gender);
    setIsGameStarted(true);
    // Start joyful 8-bit wedding background music
    marioAudio.startBgm();
  };

  const handleToggleMute = () => {
    const nextMuted = marioAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleZoneChange = useCallback((zone: number) => {
    setCurrentZone(zone);
  }, []);

  const handleCoinCollect = useCallback((newCoins: number, newScore: number) => {
    setCoins(newCoins);
    setScore(newScore);
  }, []);

  const handleJumpToZone = (zone: number) => {
    const targetX = ZONE_X_TARGETS[zone] || 120;
    setTeleportX(targetX);
    setCurrentZone(zone);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#5C94FC]">
      {/* 1. Game Opening Start Screen */}
      {!isGameStarted ? (
        <MarioOpeningCover
          invitation={data.invitation}
          initialGuestName={playerName}
          isMobileDevice={isMobileDevice}
          onStart={handleStartGame}
        />
      ) : (
        <>
          {/* 2. Main 2D Platformer Canvas */}
          <MarioCanvasGame
            playerGender={playerGender}
            onZoneChange={handleZoneChange}
            onCoinCollect={handleCoinCollect}
            targetTeleportX={teleportX}
            onTeleportComplete={() => setTeleportX(null)}
            isMovingLeft={isMovingLeft}
            isMovingRight={isMovingRight}
            isJumpRequested={isJumpRequested}
            onJumpHandled={() => setIsJumpRequested(false)}
          />

          {/* 3. Floating Upper Cloud Info Overlay (Structured Wedding Details) */}
          <MarioCloudInfoOverlay
            currentZone={currentZone}
            playerGender={playerGender}
            guestName={playerName}
            data={data}
            guest={guest}
            onJumpToZone={handleJumpToZone}
            onRefreshData={onRefreshData}
          />

          {/* 4. Retro Arcade Controls & HUD Overlay */}
          <MarioControlsOverlay
            score={score}
            coins={coins}
            playerGender={playerGender}
            guestName={playerName}
            isMuted={isMuted}
            isMobileDevice={isMobileDevice}
            onToggleMute={handleToggleMute}
            onMoveLeftStart={() => setIsMovingLeft(true)}
            onMoveLeftEnd={() => setIsMovingLeft(false)}
            onMoveRightStart={() => setIsMovingRight(true)}
            onMoveRightEnd={() => setIsMovingRight(false)}
            onJump={() => setIsJumpRequested(true)}
            onOpenFullModal={() => setIsFullModalOpen(true)}
          />

          {/* 5. Complete Wedding Booklet Modal */}
          <MarioFullBookModal
            isOpen={isFullModalOpen}
            onClose={() => setIsFullModalOpen(false)}
            data={data}
            guestName={playerName}
          />
        </>
      )}
    </div>
  );
};
