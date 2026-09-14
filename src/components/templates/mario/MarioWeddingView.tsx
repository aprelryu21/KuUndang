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
  100,  // Zone 0: Start / Sambutan
  900,  // Zone 1: Mempelai
  1550, // Zone 2: Kisah Kasih
  2250, // Zone 3: Rangkaian Acara
  2900, // Zone 4: Tanda Kasih
  3550, // Zone 5: Buku Tamu & RSVP
  4050, // Zone 6: Finish / Wedding Altar
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
    const targetX = ZONE_X_TARGETS[zone] || 100;
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
