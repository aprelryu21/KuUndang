import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface FleurBotanicaAudioPlayerProps {
  customMusicUrl?: string;
  autoPlayTrigger?: boolean;
}

export const FleurBotanicaAudioPlayer: React.FC<FleurBotanicaAudioPlayerProps> = ({
  customMusicUrl,
  autoPlayTrigger,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const defaultMusicUrl =
    'https://assets-staging.inveet.id/weddings/dias-azalia/music/c70cf016-5a7b-4fee-a8a1-d5d8478c2c21.mp3';
  const musicSrc = customMusicUrl || defaultMusicUrl;

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <audio ref={audioRef} src={musicSrc} loop preload="auto" />

      <button
        onClick={togglePlay}
        className="group relative w-12 h-12 rounded-full bg-[#293522] border-2 border-[#BDA06C] text-[#FAF8F5] flex items-center justify-center shadow-[0_8px_25px_rgba(41,53,34,0.4)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
      >
        {/* Subtle spinning vinyl track ring */}
        <div
          className={`absolute inset-1 rounded-full border border-dashed border-[#BDA06C]/40 ${
            isPlaying ? 'animate-spin [animation-duration:8s]' : ''
          }`}
        />

        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-[#BDA06C] animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-stone-300" />
        )}
      </button>
    </div>
  );
};
