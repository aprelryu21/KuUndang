import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc3, Radio } from 'lucide-react';
import { motion } from 'motion/react';

interface Persona3AudioPlayerProps {
  musicUrl: string;
  musicTitle: string;
  musicArtist: string;
  enabled: boolean;
  autoPlayTrigger?: boolean;
}

export const Persona3AudioPlayer: React.FC<Persona3AudioPlayerProps> = ({
  musicUrl,
  musicTitle,
  musicArtist,
  enabled,
  autoPlayTrigger = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current && musicUrl) {
      const audio = new Audio(musicUrl);
      audio.loop = true;
      audio.preload = 'auto';
      audioRef.current = audio;

      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicUrl]);

  useEffect(() => {
    if (autoPlayTrigger && enabled && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked by browser policy until user gesture
      });
    }
  }, [autoPlayTrigger, enabled]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log('Audio playback error:', err));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!enabled || !musicUrl) return null;

  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-40 select-none"
      aria-label="Persona 3 Gekkoukan MP3 Audio Player"
    >
      <div className="relative group">
        {/* Slanted Persona 3 MP3 player frame */}
        <div className="relative flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#081226]/95 border-2 border-[#00D2FF] shadow-[0_0_20px_rgba(0,210,255,0.4)] backdrop-blur-md text-[#F0F8FF] transform -skew-x-6">
          {/* Animated Equalizer Bars */}
          <div className="flex items-end gap-1 h-5 w-4 shrink-0 transform skew-x-6">
            <span
              className={`w-1 bg-[#00D2FF] rounded-xs transition-all ${
                isPlaying ? 'animate-pulse h-5' : 'h-1'
              }`}
            />
            <span
              className={`w-1 bg-[#FFE600] rounded-xs transition-all ${
                isPlaying ? 'animate-bounce h-4' : 'h-2'
              }`}
            />
            <span
              className={`w-1 bg-[#00D2FF] rounded-xs transition-all ${
                isPlaying ? 'animate-pulse h-3' : 'h-1'
              }`}
            />
          </div>

          {/* Track Info */}
          <div className="transform skew-x-6 max-w-[150px] sm:max-w-[210px]">
            <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-[#FFE600] uppercase font-bold">
              <Radio className="w-2.5 h-2.5 animate-spin" />
              <span>GEKKOUKAN AUDIO</span>
            </div>
            <p className="text-xs font-bold text-[#FFFFFF] truncate font-sans tracking-wide">
              {musicTitle || 'Canon in D Major'}
            </p>
            <p className="text-[10px] text-[#00D2FF]/80 truncate font-mono">
              {musicArtist || 'Persona 3 Neo-Mix'}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#00D2FF]/30 transform skew-x-6">
            <button
              type="button"
              onClick={togglePlay}
              className="w-8 h-8 rounded-lg bg-[#00D2FF] hover:bg-[#38BDF8] text-[#081226] flex items-center justify-center font-bold shadow-md active:scale-95 transition-all cursor-pointer"
              title={isPlaying ? 'Pause Music' : 'Play Music'}
              aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 rounded-lg text-[#00D2FF] hover:text-[#FFE600] hover:bg-white/10 transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Decorative corner tag */}
        <div className="absolute -top-2 -right-1 px-1.5 py-0.5 rounded-xs bg-[#FFE600] text-[#081226] text-[8px] font-mono font-black tracking-widest uppercase shadow-xs">
          BGM: ON
        </div>
      </div>
    </motion.aside>
  );
};
