import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Music, Heart, Sparkles } from 'lucide-react';

interface PastelPopAudioPlayerProps {
  musicUrl?: string;
  musicTitle?: string;
  musicArtist?: string;
  autoPlay?: boolean;
}

export const PASTEL_DEFAULT_MUSIC = {
  url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c5/Kevin_MacLeod_-_Carefree.ogg/Kevin_MacLeod_-_Carefree.ogg.mp3',
  title: 'Carefree Love (Cute Ukulele & Bells)',
  artist: 'Kevin MacLeod / Happy Acoustic Melody',
};

export const PastelPopAudioPlayer: React.FC<PastelPopAudioPlayerProps> = ({
  musicUrl = PASTEL_DEFAULT_MUSIC.url,
  musicTitle = PASTEL_DEFAULT_MUSIC.title,
  musicArtist = PASTEL_DEFAULT_MUSIC.artist,
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const effectiveUrl = musicUrl || PASTEL_DEFAULT_MUSIC.url;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-40 select-none">
      <audio ref={audioRef} src={effectiveUrl} loop />

      <div className="flex items-center gap-2">
        {/* Main Floating Candy Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FF6B8B] text-white border-2 border-white shadow-[4px_4px_0px_0px_#FFD166] flex items-center justify-center cursor-pointer overflow-hidden group"
          title={isPlaying ? 'Jeda Musik' : 'Putar Musik Romantis'}
        >
          {/* Cute rotating background ring */}
          {isPlaying && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-white/60 pointer-events-none"
            />
          )}

          {isPlaying ? (
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <Music className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <Play className="w-5 h-5 fill-white text-white ml-0.5" />
          )}

          {/* Little Floating Heart Badge */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFD166] text-[#2B2D42] rounded-full border border-white flex items-center justify-center text-[10px] font-bold shadow-xs">
            ♪
          </span>
        </motion.button>

        {/* Expandable Cute Track Capsule */}
        <motion.div
          initial={false}
          animate={{
            width: isExpanded ? 'auto' : '0px',
            opacity: isExpanded ? 1 : 0,
          }}
          className="overflow-hidden bg-[#FFF9E6] border-2 border-[#FFD166] shadow-[3px_3px_0px_0px_#FF6B8B] rounded-2xl px-0 py-0 flex items-center gap-3 transition-all"
        >
          {isExpanded && (
            <div className="py-2 px-3.5 flex items-center gap-3 whitespace-nowrap">
              {/* Equalizer Wave */}
              <div className="flex items-end gap-1 h-5 shrink-0">
                {[40, 90, 60, 100, 70].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={
                      isPlaying
                        ? { height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }
                        : { height: '20%' }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 0.7,
                      delay: i * 0.12,
                    }}
                    className="w-1 bg-[#FF6B8B] rounded-full"
                  />
                ))}
              </div>

              {/* Title & Artist */}
              <div className="text-left min-w-[130px] max-w-[180px]">
                <p className="text-[11px] font-bold text-[#2B2D42] truncate leading-tight">
                  {musicTitle}
                </p>
                <p className="text-[10px] text-[#2B2D42]/70 truncate leading-tight mt-0.5">
                  {musicArtist}
                </p>
              </div>

              {/* Mute Toggle Button */}
              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 rounded-full hover:bg-[#FFD166]/40 text-[#2B2D42] transition-colors cursor-pointer"
                title={isMuted ? 'Nyalakan Suara' : 'Bisukan'}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#06D6A0]" />
                )}
              </button>
            </div>
          )}
        </motion.div>

        {/* Toggle Info Pill */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 border border-[#FF6B8B]/40 text-[#FF6B8B] text-[10px] font-bold shadow-xs hover:bg-[#FFE5EC] transition-colors cursor-pointer"
        >
          <Sparkles className="w-3 h-3" />
          <span>{isExpanded ? 'Tutup' : 'Lagu'}</span>
        </button>
      </div>
    </div>
  );
};
