import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Disc } from 'lucide-react';

interface FloatingMusicPlayerProps {
  musicUrl?: string;
  musicTitle?: string;
  musicArtist?: string;
  enabled?: boolean;
  autoPlayTrigger?: boolean;
}

export const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({
  musicUrl,
  musicTitle = 'Wedding Song',
  musicArtist = 'Acoustic Strings',
  enabled = true,
  autoPlayTrigger = false,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (!enabled || !musicUrl) return;

    if (autoPlayTrigger && !hasInteracted && audioRef.current) {
      setHasInteracted(true);
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Autoplay prevented or failed:', err);
            setIsPlaying(false);
          });
      }
    }
  }, [autoPlayTrigger, enabled, musicUrl, hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.warn('Play error:', e));
    }
  };

  if (!enabled || !musicUrl) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />

      <button
        id="floating-music-btn"
        type="button"
        onClick={togglePlay}
        className="group relative flex items-center gap-2 p-2 bg-[#FFFCF7]/90 hover:bg-[#FFFCF7] text-[#24313A] rounded-full shadow-lg border border-[#C2A56B]/40 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
        title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      >
        {/* Spinning Vinyl Visual */}
        <div
          className={`relative w-10 h-10 rounded-full bg-[#1a2228] flex items-center justify-center shadow-inner border border-[#C2A56B]/30 ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
        >
          {/* Vinyl concentric grooving rings */}
          <div className="w-8 h-8 rounded-full border border-neutral-700/50 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border border-neutral-700/70 flex items-center justify-center">
              {/* Vinyl center label */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#DFBFC1] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#1a2228]" />
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicator Icon */}
        <div className="pr-2 hidden sm:flex flex-col text-left max-w-[130px] overflow-hidden">
          <span className="text-[10px] font-semibold tracking-wider uppercase text-[#283D52] truncate">
            {musicTitle}
          </span>
          <span className="text-[9px] text-[#768692] truncate">{musicArtist}</span>
        </div>

        <div className="pr-1 text-[#283D52]">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#C2A56B] animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#768692]" />
          )}
        </div>
      </button>
    </div>
  );
};
