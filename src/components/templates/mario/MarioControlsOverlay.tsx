import React from 'react';
import { Volume2, VolumeX, ArrowLeft, ArrowRight, ArrowUp, Compass } from 'lucide-react';

export interface MarioControlsOverlayProps {
  score: number;
  coins: number;
  playerGender: 'tuan' | 'nyonya';
  guestName: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onMoveLeftStart: () => void;
  onMoveLeftEnd: () => void;
  onMoveRightStart: () => void;
  onMoveRightEnd: () => void;
  onJump: () => void;
  onOpenFullModal: () => void;
}

export const MarioControlsOverlay: React.FC<MarioControlsOverlayProps> = ({
  score,
  coins,
  playerGender,
  guestName,
  isMuted,
  onToggleMute,
  onMoveLeftStart,
  onMoveLeftEnd,
  onMoveRightStart,
  onMoveRightEnd,
  onJump,
  onOpenFullModal,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between">
      {/* Top Arcade HUD */}
      <header className="px-3 sm:px-6 py-2 flex items-center justify-between pointer-events-auto bg-black/40 backdrop-blur-xs text-white font-mono text-xs select-none">
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Player Honorific & Name */}
          <div>
            <span className="text-[#FFE082] block text-[9px] sm:text-[10px] uppercase">
              PLAYER ({playerGender === 'tuan' ? 'GROOM' : 'BRIDE'})
            </span>
            <span className="font-bold text-xs sm:text-sm tracking-wide text-white truncate max-w-[120px] sm:max-w-[200px] block">
              {guestName || (playerGender === 'tuan' ? 'Tuan Tamu' : 'Nyonya Tamu')}
            </span>
          </div>

          {/* Coins Collected */}
          <div className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-md border border-[#FFD166]/50">
            <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#FFD166] border border-[#B8860B] animate-pulse" />
            <span className="text-white font-bold text-xs">x{String(coins).padStart(2, '0')}</span>
          </div>

          {/* Love Score */}
          <div className="hidden sm:block">
            <span className="text-stone-300 block text-[10px]">LOVE PTS</span>
            <span className="font-bold text-xs text-[#FF85A2]">{String(score).padStart(5, '0')}</span>
          </div>
        </div>

        {/* Action Controls (Sound & Full Document Mode) */}
        <div className="flex items-center gap-2">
          {/* Read Full Wedding Invitation Modal */}
          <button
            onClick={onOpenFullModal}
            className="flex items-center gap-1 bg-[#06D6A0] hover:bg-[#05B586] text-black font-mono font-bold px-2 sm:px-3 py-1.5 rounded-lg text-[11px] border border-white transition-transform active:scale-95 shadow-md"
            title="Lihat seluruh informasi undangan secara lengkap"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Buku Undangan</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleMute}
            className="flex items-center gap-1 bg-[#283D52] hover:bg-[#1A2837] text-white px-2 sm:px-2.5 py-1.5 rounded-lg border border-white/40 transition-transform active:scale-95 text-xs shadow-md"
            title={isMuted ? 'Aktifkan Suara Retro' : 'Matikan Suara Retro'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#FF5C8D]" />
                <span className="text-[10px] hidden sm:inline">Mute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] hidden sm:inline">Audio</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Bottom Floating Game Controller for Mobile & Touch Devices */}
      <footer className="p-3 sm:p-5 flex items-end justify-between pointer-events-auto select-none">
        {/* Left D-Pad Controls */}
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-2 rounded-2xl border-2 border-white/30 shadow-2xl">
          {/* Left Arrow Button */}
          <button
            onPointerDown={onMoveLeftStart}
            onPointerUp={onMoveLeftEnd}
            onPointerLeave={onMoveLeftEnd}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#283D52] hover:bg-[#344E69] active:bg-[#E60012] border-3 border-white text-white flex items-center justify-center transition-transform active:scale-90 shadow-lg"
            aria-label="Walk Left"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>

          {/* Right Arrow Button */}
          <button
            onPointerDown={onMoveRightStart}
            onPointerUp={onMoveRightEnd}
            onPointerLeave={onMoveRightEnd}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#283D52] hover:bg-[#344E69] active:bg-[#E60012] border-3 border-white text-white flex items-center justify-center transition-transform active:scale-90 shadow-lg"
            aria-label="Walk Right"
          >
            <ArrowRight className="w-7 h-7" />
          </button>
        </div>

        {/* Keyboard Helper for Desktop (Center) */}
        <div className="hidden lg:flex items-center gap-2 bg-black/50 text-white px-3 py-1.5 rounded-full border border-white/30 text-[11px] font-mono">
          <span>⌨️ Gunakan</span>
          <kbd className="px-1.5 py-0.5 bg-stone-700 rounded text-[10px]">A / ◄</kbd>
          <kbd className="px-1.5 py-0.5 bg-stone-700 rounded text-[10px]">D / ►</kbd>
          <span>untuk jalan, dan</span>
          <kbd className="px-2 py-0.5 bg-stone-700 rounded text-[10px]">SPASI / ▲</kbd>
          <span>untuk lompat</span>
        </div>

        {/* Right Jump Action Button (A Button) */}
        <div className="flex flex-col items-center gap-1">
          <button
            onPointerDown={onJump}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E60012] hover:bg-[#FF1A2A] active:bg-[#B3000E] border-4 border-white text-white flex flex-col items-center justify-center transition-transform active:scale-85 shadow-[0_8px_20px_rgba(230,0,18,0.5)] cursor-pointer"
            aria-label="Jump Button"
          >
            <ArrowUp className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3]" />
            <span className="text-[10px] font-mono font-black -mt-1">LOMPAT</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
