import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

interface SeriMalaysiaAudioPlayerProps {
  musicUrl?: string;
  autoPlay?: boolean;
}

export const SeriMalaysiaAudioPlayer: React.FC<SeriMalaysiaAudioPlayerProps> = ({
  musicUrl,
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const defaultMusic =
    'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/59/Kevin_MacLeod_-_Canon_in_D_Major.ogg/Kevin_MacLeod_-_Canon_in_D_Major.ogg.mp3';

  const source = musicUrl || defaultMusic;

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('AutoPlay deferred until user interaction:', err);
      });
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40">
      <audio ref={audioRef} src={source} loop preload="auto" />
      <button
        onClick={togglePlay}
        className={`w-11 h-11 rounded-full border-2 border-[#D7BB83] flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 ${
          isPlaying
            ? 'bg-[#4C030A] text-[#D7BB83] shadow-[#D7BB83]/40 animate-pulse'
            : 'bg-black/60 text-white/70 hover:bg-black/80'
        }`}
        title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        aria-label="Kontrol Musik Latar"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};
