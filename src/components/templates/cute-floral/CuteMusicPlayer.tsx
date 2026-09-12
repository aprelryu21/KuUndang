import React, { useState, useEffect, useRef } from 'react';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import {
  CuteDaisyFlower,
  CuteSakuraFlower,
  CUTE_LOFI_MUSIC_SOURCES,
  startCuteMusicBoxSynth,
  stopCuteMusicBoxSynth,
} from './cuteFloralAssets';

interface CuteMusicPlayerProps {
  customMusicUrl?: string;
}

export const CuteMusicPlayer: React.FC<CuteMusicPlayerProps> = ({ customMusicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSynthActive, setIsSynthActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const musicUrl = customMusicUrl || CUTE_LOFI_MUSIC_SOURCES[0];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.65;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Browser autoplay blocked audio element:', err);
          setIsPlaying(false);
        });
    }

    return () => {
      stopCuteMusicBoxSynth();
    };
  }, [musicUrl]);

  const toggleMusic = () => {
    const audio = audioRef.current;

    if (isSynthActive) {
      stopCuteMusicBoxSynth();
      setIsSynthActive(false);
      setIsPlaying(false);
      return;
    }

    if (!audio) {
      // Toggle synth fallback
      if (isPlaying) {
        stopCuteMusicBoxSynth();
        setIsPlaying(false);
      } else {
        startCuteMusicBoxSynth();
        setIsSynthActive(true);
        setIsPlaying(true);
      }
      return;
    }

    if (isPlaying) {
      audio.pause();
      stopCuteMusicBoxSynth();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio play failed, falling back to cute music box synthesizer:', err);
          startCuteMusicBoxSynth();
          setIsSynthActive(true);
          setIsPlaying(true);
        });
    }
  };

  return (
    <>
      <audio
        id="cute-bg-audio"
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
        onError={() => {
          console.warn('Audio source error, activating cute music box synth');
          startCuteMusicBoxSynth();
          setIsSynthActive(true);
          setIsPlaying(true);
        }}
      />

      {/* Floating Cute Player Pill */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          type="button"
          onClick={toggleMusic}
          className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/95 border-2 border-[#FF85A2] text-[#4A2E35] shadow-[0_8px_30px_rgba(255,133,162,0.3)] hover:scale-105 transition-all backdrop-blur-md cursor-pointer"
        >
          {/* Rotating Flower / Vinyl */}
          <div
            className={`w-7 h-7 flex items-center justify-center transition-transform ${
              isPlaying ? 'animate-spin-slow' : 'opacity-70'
            }`}
          >
            <CuteDaisyFlower className="w-full h-full" />
          </div>

          <div className="text-left pr-1 hidden sm:block">
            <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#FF5C8D] leading-tight">
              {isPlaying ? 'Putar Musik Ceria' : 'Musik Dijeda'}
            </p>
            <p className="text-[11px] font-heading font-semibold text-[#4A2E35] leading-tight truncate max-w-[110px]">
              Sweet Romantic Melody
            </p>
          </div>

          <div className="w-6 h-6 rounded-full bg-[#FFE4EC] text-[#FF5C8D] flex items-center justify-center">
            {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </div>
        </button>
      </div>
    </>
  );
};
