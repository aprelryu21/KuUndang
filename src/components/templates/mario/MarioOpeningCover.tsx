import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Play, UserCheck, ShieldCheck } from 'lucide-react';
import { Invitation } from '../../../types/wedding';
import { marioAudio } from './marioAudio';

export interface MarioOpeningCoverProps {
  invitation: Invitation;
  initialGuestName?: string;
  isMobileDevice?: boolean;
  onStart: (name: string, gender: 'tuan' | 'nyonya') => void;
}

export const MarioOpeningCover: React.FC<MarioOpeningCoverProps> = ({
  invitation,
  initialGuestName = '',
  isMobileDevice = false,
  onStart,
}) => {
  const [name, setName] = useState(initialGuestName);
  const [gender, setGender] = useState<'tuan' | 'nyonya'>('tuan');
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStarting) return;

    // Trigger audio & retro transition
    marioAudio.playPowerUp();
    setIsStarting(true);

    setTimeout(() => {
      onStart(name.trim() || (gender === 'tuan' ? 'Tuan Tamu' : 'Nyonya Tamu'), gender);
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#5C94FC] overflow-hidden select-none">
      {/* Background Pixel Clouds & Hills */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {/* Repeating Pixel Ground at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-[#B84418] border-t-8 border-[#00A800] [background-image:linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.1)_50%)] [background-size:24px_24px]" />
      </div>

      {/* Main Arcade Frame */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md mx-4 bg-[#283D52] border-4 sm:border-8 border-white rounded-3xl p-6 sm:p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      >
        {/* Pixel Coin & Score Header */}
        <div className="flex items-center justify-between text-xs font-mono text-[#FFE082] border-b-2 border-white/20 pb-3 mb-5">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-[#FFD166] border border-[#B8860B] animate-ping" />
            <span className="font-bold">WORLD 1-1</span>
          </div>
          <div className="flex items-center gap-1 font-bold">
            <Heart className="w-3.5 h-3.5 text-[#E60012] fill-[#E60012]" />
            <span>WEDDING EDITION</span>
          </div>
        </div>

        {/* Game Title: Super Wedding Bros. */}
        <div className="text-center mb-6">
          <div className="inline-block px-3 py-0.5 bg-[#E60012] text-white font-mono text-[10px] sm:text-xs font-bold rounded-md tracking-widest border border-white mb-2 shadow-xs">
            ★ 8-BIT INTERACTIVE INVITATION ★
          </div>

          <h1 className="font-mono text-2xl sm:text-3xl font-black tracking-tight text-[#FFD166] drop-shadow-[2px_2px_0px_#E60012]">
            SUPER WEDDING
          </h1>
          <h2 className="font-mono text-xl sm:text-2xl font-black text-white drop-shadow-[2px_2px_0px_#283D52]">
            {invitation.groom_nickname.toUpperCase()} &amp; {invitation.bride_nickname.toUpperCase()}
          </h2>
          <p className="text-stone-300 text-xs font-mono mt-1">
            {invitation.wedding_date || '18 & 26 April 2026'}
          </p>
        </div>

        {/* Start Screen Form */}
        <form onSubmit={handleStart} className="space-y-4">
          {/* Guest Name Input */}
          <div>
            <label className="block text-xs font-mono text-stone-200 font-bold mb-1">
              NAMA TAMU UNDANGAN:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ketik nama Anda di sini..."
              className="w-full px-4 py-2.5 bg-white text-[#283D52] font-mono font-bold text-sm rounded-xl border-3 border-[#FFD166] focus:outline-hidden focus:ring-4 focus:ring-[#5C94FC] shadow-inner placeholder:font-normal placeholder:text-stone-400"
            />
          </div>

          {/* Gender / Character Selector (Tuan / Nyonya) */}
          <div>
            <label className="block text-xs font-mono text-stone-200 font-bold mb-1.5">
              PILIH KARAKTER PEMAIN:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Option Tuan */}
              <button
                type="button"
                onClick={() => {
                  setGender('tuan');
                  marioAudio.playCoin();
                }}
                className={`p-3 rounded-2xl border-3 font-mono text-center transition-all flex flex-col items-center gap-1.5 ${
                  gender === 'tuan'
                    ? 'bg-[#5C94FC] border-white text-white shadow-[0_0_15px_rgba(92,148,252,0.8)] scale-102'
                    : 'bg-stone-800/60 border-stone-600 text-stone-300 hover:border-stone-400'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                  🤵
                </div>
                <span className="font-bold text-xs">TUAN</span>
                <span className="text-[10px] text-white/80 leading-tight">Mempelai Pria</span>
              </button>

              {/* Option Nyonya */}
              <button
                type="button"
                onClick={() => {
                  setGender('nyonya');
                  marioAudio.playCoin();
                }}
                className={`p-3 rounded-2xl border-3 font-mono text-center transition-all flex flex-col items-center gap-1.5 ${
                  gender === 'nyonya'
                    ? 'bg-[#FF5C8D] border-white text-white shadow-[0_0_15px_rgba(255,92,141,0.8)] scale-102'
                    : 'bg-stone-800/60 border-stone-600 text-stone-300 hover:border-stone-400'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                  👰
                </div>
                <span className="font-bold text-xs">NYONYA</span>
                <span className="text-[10px] text-white/80 leading-tight">Mempelai Wanita</span>
              </button>
            </div>
          </div>

          {/* Press Start / Mulai Button */}
          <button
            type="submit"
            disabled={isStarting}
            className="w-full mt-4 py-3.5 px-6 rounded-2xl bg-[#00A800] hover:bg-[#008A00] active:scale-95 text-white font-mono font-black text-sm sm:text-base border-4 border-white shadow-[0_8px_0px_#005800] transition-transform flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
            <span>{isStarting ? 'MEMULAI GAME...' : 'MULAI / PRESS START'}</span>
          </button>
        </form>

        {/* Device-Specific Controls Guide */}
        {!isMobileDevice ? (
          <div className="mt-4 p-2.5 bg-black/40 border-2 border-[#FFD166]/50 rounded-xl text-center space-y-1">
            <p className="text-[11px] font-mono font-bold text-[#FFE082]">
              ⌨️ PETUNJUK KONTROL KEYBOARD
            </p>
            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-white flex-wrap">
              <span>Jalan:</span>
              <kbd className="px-1.5 py-0.5 bg-stone-700 rounded border border-white/30">A / ◄</kbd>
              <kbd className="px-1.5 py-0.5 bg-stone-700 rounded border border-white/30">D / ►</kbd>
              <span className="ml-1">Lompat:</span>
              <kbd className="px-1.5 py-0.5 bg-stone-700 rounded border border-white/30">SPASI / W / ▲</kbd>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-2.5 bg-black/40 border-2 border-[#FFD166]/50 rounded-xl text-center space-y-1">
            <p className="text-[11px] font-mono font-bold text-[#FFE082]">
              📱 PETUNJUK KONTROL LAYAR
            </p>
            <p className="text-[10px] font-mono text-stone-200">
              Gunakan tombol D-Pad &amp; tombol Lompat di layar untuk menggerakkan karakter.
            </p>
          </div>
        )}

        <p className="text-[10px] font-mono text-stone-400 text-center mt-3">
          ★ Berjalanlah untuk membaca isi undangan dan temukan pasanganmu di pelaminan! ★
        </p>
      </motion.div>

      {/* Retro Transition Curtain Overlay */}
      <AnimatePresence>
        {isStarting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-white font-mono"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-3"
            >
              <h2 className="text-xl sm:text-2xl font-black text-[#FFD166]">
                WORLD 1-1
              </h2>
              <div className="text-4xl">
                {gender === 'tuan' ? '🤵' : '👰'} × 03
              </div>
              <p className="text-xs text-stone-400 tracking-wider">
                MEMULAI PERJALANAN CINTA...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
