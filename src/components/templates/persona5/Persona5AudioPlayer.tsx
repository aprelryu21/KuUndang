import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Music, Flame, Zap } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

interface Persona5AudioPlayerProps {
  musicUrl?: string;
  musicTitle?: string;
  musicArtist?: string;
  autoPlay?: boolean;
}

// Verified working audio URLs
export const PERSONA5_DEFAULT_MUSIC = {
  url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/2/26/Kevin_MacLeod_-_AcidJazz.ogg/Kevin_MacLeod_-_AcidJazz.ogg.mp3',
  oggUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Kevin_MacLeod_-_AcidJazz.ogg',
  backupUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/59/Kevin_MacLeod_-_Canon_in_D_Major.ogg/Kevin_MacLeod_-_Canon_in_D_Major.ogg.mp3',
  title: 'Beneath The Mask (Tokyo Acid Jazz Lounge)',
  artist: 'The Phantom Thieves / Acid Jazz Groove',
};

export const Persona5AudioPlayer: React.FC<Persona5AudioPlayerProps> = ({
  musicUrl = PERSONA5_DEFAULT_MUSIC.url,
  musicTitle = PERSONA5_DEFAULT_MUSIC.title,
  musicArtist = PERSONA5_DEFAULT_MUSIC.artist,
  autoPlay = false,
}) => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const effectiveUrl =
    musicUrl && !musicUrl.includes('Kevin_MacLeod_-_Acid_Jazz.ogg')
      ? musicUrl
      : PERSONA5_DEFAULT_MUSIC.url;

  // Auto-play trigger when cover opens or when user toggles
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      const el = audioRef.current;
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('Persona5 audio autoplay deferred:', err);
            setIsPlaying(false);
          });
      }
    }
  }, [autoPlay]);

  // Keep state synchronized with actual HTML audio events
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      console.warn('Persona 5 primary audio failed, switching to backup track...');
      if (el.src !== PERSONA5_DEFAULT_MUSIC.backupUrl) {
        el.src = PERSONA5_DEFAULT_MUSIC.backupUrl;
        el.play().catch(() => {});
      }
    };

    el.addEventListener('play', handlePlay);
    el.addEventListener('pause', handlePause);
    el.addEventListener('playing', handlePlay);
    el.addEventListener('error', handleError);

    return () => {
      el.removeEventListener('play', handlePlay);
      el.removeEventListener('pause', handlePause);
      el.removeEventListener('playing', handlePlay);
      el.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    const el = audioRef.current;

    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Audio play request failed:', err);
            // Attempt backup source if failed
            el.src = PERSONA5_DEFAULT_MUSIC.backupUrl;
            el.play().then(() => setIsPlaying(true)).catch(() => {});
          });
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const p5SoundtrackLabel = t.p5?.soundtrack || 'P5 SOUNDTRACK';
  const p5PlayingLabel = t.p5?.playing || 'PLAYING';
  const p5PausedLabel = t.p5?.paused || 'PAUSED';

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-40 select-none">
      <audio
        id="p5-audio-element"
        ref={audioRef}
        src={effectiveUrl}
        preload="auto"
        loop
      >
        <source src={effectiveUrl} type="audio/mpeg" />
        <source src={PERSONA5_DEFAULT_MUSIC.oggUrl} type="audio/ogg" />
        <source src={PERSONA5_DEFAULT_MUSIC.backupUrl} type="audio/mpeg" />
      </audio>

      <div className="flex items-center gap-2">
        {/* Main Floating Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className="relative flex items-center gap-2 px-3.5 py-2.5 bg-[#000000] border-2 border-[#FFFFFF] hover:border-[#E60012] text-white shadow-[4px_4px_0px_0px_#E60012] -skew-x-6 cursor-pointer group"
          title={isPlaying ? 'Jeda Musik / Pause' : 'Putar Musik / Play'}
        >
          {/* Equalizer animation when playing */}
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-4 w-4 skew-x-6">
              <span className="w-1 bg-[#E60012] animate-[bounce_0.8s_infinite] h-full" />
              <span className="w-1 bg-[#FFF000] animate-[bounce_1.2s_infinite] h-2/3" />
              <span className="w-1 bg-[#FFFFFF] animate-[bounce_0.6s_infinite] h-4/5" />
            </div>
          ) : (
            <Play className="w-4 h-4 text-[#FFF000] fill-[#FFF000] skew-x-6" />
          )}

          <div className="text-left font-mono skew-x-6">
            <span className="text-[9px] text-[#FFF000] block uppercase font-bold tracking-wider leading-tight">
              {p5SoundtrackLabel}
            </span>
            <span className="text-[11px] font-black uppercase text-white block max-w-[130px] truncate">
              {isPlaying ? p5PlayingLabel : p5PausedLabel}
            </span>
          </div>
        </motion.button>

        {/* Expand Info / Mute Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2.5 bg-[#000000] border-2 border-[#FFFFFF]/60 text-white -skew-x-6 hover:bg-[#E60012] transition-colors cursor-pointer"
          title="Info Trek Lagu"
        >
          <Music className="w-3.5 h-3.5 text-[#FFF000] skew-x-6" />
        </button>
      </div>

      {/* Expanded Track Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-14 left-0 w-64 bg-[#141418] border-2 border-[#E60012] p-3 shadow-[6px_6px_0px_0px_#FFFFFF] -skew-x-3 text-left"
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-white/20 mb-2">
              <span className="text-[9px] font-mono font-bold text-[#FFF000] uppercase">
                COGNITIVE AUDIO PLAYER
              </span>
              <button
                type="button"
                onClick={toggleMute}
                className="text-white hover:text-[#E60012] cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#E60012]" /> : <Volume2 className="w-3.5 h-3.5 text-[#FFF000]" />}
              </button>
            </div>
            <p className="text-xs font-black uppercase text-white truncate">
              {musicTitle}
            </p>
            <p className="text-[10px] font-mono text-[#FFFFFF]/70 truncate mt-0.5">
              {musicArtist}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
