import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import {
  GAMELAN_AUDIO_SOURCES,
  startWebAudioGamelan,
  stopWebAudioGamelan,
} from './javaneseAssets';

interface JavaneseGamelanPlayerProps {
  autoPlayTrigger?: boolean;
}

export const JavaneseGamelanPlayer: React.FC<JavaneseGamelanPlayerProps> = ({
  autoPlayTrigger = false,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWebAudioActive, setIsWebAudioActive] = useState(false);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying && !isWebAudioActive) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Gamelan audio autoplay blocked, starting Web Audio Gamelan fallback:', err);
            startWebAudioGamelan();
            setIsWebAudioActive(true);
            setIsPlaying(true);
          });
      }
    }
  }, [autoPlayTrigger, isPlaying, isWebAudioActive]);

  const togglePlay = () => {
    if (isWebAudioActive) {
      if (isPlaying) {
        stopWebAudioGamelan();
        setIsPlaying(false);
      } else {
        startWebAudioGamelan();
        setIsPlaying(true);
      }
      return;
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback error, switching to Web Audio synth:', err);
          startWebAudioGamelan();
          setIsWebAudioActive(true);
          setIsPlaying(true);
        });
    }
  };

  const handleAudioError = () => {
    if (sourceIndex < GAMELAN_AUDIO_SOURCES.length - 1) {
      setSourceIndex((prev) => prev + 1);
    } else {
      // All external audio URLs failed, switch to reliable Web Audio synthesizer
      console.warn('All audio sources failed, falling back to Web Audio Gamelan');
      if (isPlaying || autoPlayTrigger) {
        startWebAudioGamelan();
        setIsWebAudioActive(true);
        setIsPlaying(true);
      }
    }
  };

  return (
    <div
      id="javanese-gamelan-player"
      className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40 select-none"
    >
      <audio
        ref={audioRef}
        id="javanese-bg-audio"
        src={GAMELAN_AUDIO_SOURCES[sourceIndex]}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => {
          if (!isWebAudioActive) setIsPlaying(false);
        }}
        onError={handleAudioError}
      />

      <div className="flex items-center gap-2">
        {/* Main Bronze Gong Button */}
        <button
          type="button"
          onClick={togglePlay}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className={`relative group p-2.5 rounded-full border-2 border-[#D4AF37] shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer ${
            isPlaying ? 'bg-[#24160E]' : 'bg-[#1A1009]'
          }`}
          aria-label={isPlaying ? 'Jeda Gamelan' : 'Putar Gamelan'}
          title={isPlaying ? 'Jeda Backsound Gamelan' : 'Putar Backsound Gamelan'}
        >
          {/* Rotating Golden Gong Halo */}
          <div
            className={`absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/50 ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '8s' }}
          />

          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-[#D4AF37]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E5C158] animate-ping" />
            </div>
          ) : (
            <VolumeX className="w-5 h-5 text-[#D4AF37]/60" />
          )}
        </button>

        {/* Extended Track Info Pill */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isExpanded || isPlaying
              ? 'max-w-[220px] opacity-100 px-3 py-1.5'
              : 'max-w-0 opacity-0 p-0'
          } rounded-full bg-[#1A1009]/95 border border-[#D4AF37]/60 backdrop-blur-md shadow-lg flex items-center gap-2 text-left`}
        >
          <Disc
            className={`w-3.5 h-3.5 text-[#D4AF37] shrink-0 ${isPlaying ? 'animate-spin' : ''}`}
            style={{ animationDuration: '4s' }}
          />
          <div className="min-w-0">
            <p className="text-[10px] font-serif font-bold text-[#E5C158] truncate">
              Gending Gamelan Jawa
            </p>
            <p className="text-[9px] text-[#FAF6EE]/70 truncate font-sans">
              {isPlaying ? 'Pahargyan Temanten (Playing)' : 'Klik untuk memutar'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
