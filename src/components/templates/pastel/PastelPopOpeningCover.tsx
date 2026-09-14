import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Mail, Send, Calendar, MapPin, KeyRound, Star, Gift, Smile } from 'lucide-react';
import { Guest, Invitation } from '../../../types/wedding';

interface PastelPopOpeningCoverProps {
  invitation: Invitation;
  guestName: string;
  guest?: Guest | null;
  onOpen: (name: string) => void;
  onOpenAdminModal?: () => void;
}

export const PastelPopOpeningCover: React.FC<PastelPopOpeningCoverProps> = ({
  invitation,
  guestName,
  guest,
  onOpen,
  onOpenAdminModal,
}) => {
  const [recipientInput, setRecipientInput] = useState(guestName || '');
  const [isOpening, setIsOpening] = useState(false);

  const formattedDate = new Date(invitation.wedding_date).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const playChimeSfx = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 happy chime
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.38);
      });
    } catch {
      // AudioContext fallback
    }
  };

  const handleOpenInvitation = () => {
    playChimeSfx();
    setIsOpening(true);
    setTimeout(() => {
      onOpen(recipientInput.trim() || guestName || 'Tamu Terhormat');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-[#FFE5EC] via-[#FFF9E6] to-[#EDF5FF]">
      {/* Playful Floating Background Doodles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Colorful floating pastel circles */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="absolute top-10 left-8 w-24 h-24 rounded-full bg-[#FFD166]/40 blur-xl"
        />
        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute bottom-12 right-10 w-36 h-36 rounded-full bg-[#FF6B8B]/30 blur-2xl"
        />
        <motion.div
          animate={{ x: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
          className="absolute top-1/3 right-8 w-28 h-28 rounded-full bg-[#06D6A0]/25 blur-xl"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full bg-[#9D80CB]/25 blur-xl"
        />

        {/* Floating Decorative Cute Icons */}
        <div className="absolute top-12 left-1/4 text-2xl animate-bounce" style={{ animationDuration: '3s' }}>
          ✨
        </div>
        <div className="absolute bottom-20 left-1/5 text-2xl animate-bounce" style={{ animationDuration: '4s' }}>
          🌸
        </div>
        <div className="absolute top-24 right-1/4 text-3xl animate-bounce" style={{ animationDuration: '3.5s' }}>
          💖
        </div>
        <div className="absolute bottom-24 right-1/5 text-2xl animate-bounce" style={{ animationDuration: '4.5s' }}>
          🎈
        </div>
        <div className="absolute top-1/2 left-6 text-xl">
          ⭐
        </div>
        <div className="absolute top-2/3 right-6 text-xl">
          🍰
        </div>
      </div>

      {/* Secret Admin Button */}
      {onOpenAdminModal && (
        <button
          type="button"
          onClick={onOpenAdminModal}
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#2B2D42] border border-[#FF6B8B]/30 shadow-xs text-xs font-bold transition-all hover:scale-105 cursor-pointer"
        >
          <KeyRound className="w-3.5 h-3.5 text-[#FF6B8B]" />
          <span>Login Admin</span>
        </button>
      )}

      {/* Main Cute Gift Envelope / Pop-Up Card */}
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{
          scale: isOpening ? 1.08 : 1,
          y: isOpening ? -40 : 0,
          opacity: isOpening ? 0 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-white rounded-4xl border-4 border-[#FF6B8B] shadow-[10px_10px_0px_0px_#FFD166] p-6 sm:p-9 text-center overflow-hidden z-10"
      >
        {/* Top Decorative Washi Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#FFD166] border-2 border-white/80 rounded-md shadow-xs -rotate-2 flex items-center justify-center">
          <span className="text-[10px] font-black tracking-widest text-[#2B2D42] uppercase">
            SPECIAL DELIVERY ♡
          </span>
        </div>

        {/* Cheerful Sticker Pill */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFE5EC] border-2 border-[#FF6B8B] text-[#FF6B8B] text-xs font-extrabold tracking-wider mt-2 mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD166] fill-[#FFD166]" />
          <span>THE SWEET WEDDING OF</span>
          <Heart className="w-3.5 h-3.5 text-[#FF6B8B] fill-[#FF6B8B]" />
        </div>

        {/* Bride & Groom Couple Nicknames */}
        <div className="my-2">
          <h1 className="text-3xl sm:text-5xl font-black text-[#2B2D42] tracking-tight flex items-center justify-center gap-3 flex-wrap">
            <span className="text-[#FF6B8B] hover:scale-105 transition-transform inline-block">
              {invitation.bride_nickname || 'Mempelai Wanita'}
            </span>
            <span className="text-2xl sm:text-3xl text-[#FFD166]">&amp;</span>
            <span className="text-[#4D96FF] hover:scale-105 transition-transform inline-block">
              {invitation.groom_nickname || 'Mempelai Pria'}
            </span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#2B2D42]/70 mt-1.5">
            Menyatukan Dua Hati dalam Kebahagiaan Penuh Warna
          </p>
        </div>

        {/* Cute Couple Avatar Illustration Card */}
        <div className="my-5 relative max-w-xs mx-auto">
          <div className="p-3 bg-gradient-to-r from-[#FFF0F3] via-[#FFF9E6] to-[#EDF5FF] rounded-3xl border-2 border-[#FFD166] shadow-inner flex items-center justify-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-rose-100 shrink-0">
              <img
                src={invitation.cover_image || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80'}
                alt="Couple Moment"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <div className="inline-block px-2 py-0.5 bg-[#06D6A0] text-white text-[10px] font-bold rounded-full mb-1">
                OUR WEDDING DAY
              </div>
              <div className="text-xs font-bold text-[#2B2D42] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FF6B8B]" />
                <span>{formattedDate}</span>
              </div>
              <div className="text-[11px] text-[#2B2D42]/70 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#4D96FF]" />
                <span>Sidoarjo &amp; Kediri</span>
              </div>
            </div>
          </div>
        </div>

        {/* Honored Recipient Bubble Card */}
        <div className="bg-[#FFF9E6] rounded-3xl border-2 border-[#FFD166] p-4 sm:p-5 my-5 shadow-[4px_4px_0px_0px_#4D96FF]">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#2B2D42]/70 flex items-center justify-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#FF6B8B]" />
            <span>Kepada Yth. Tamu Istimewa:</span>
          </p>

          <div className="mt-2">
            <input
              type="text"
              value={recipientInput}
              onChange={(e) => setRecipientInput(e.target.value)}
              placeholder="Ketik nama Anda disini..."
              className="w-full text-center px-4 py-2.5 rounded-2xl bg-white border-2 border-[#FF6B8B]/40 focus:border-[#FF6B8B] text-base sm:text-lg font-black text-[#2B2D42] shadow-inner focus:outline-hidden transition-all"
            />
          </div>

          {guest && (
            <p className="text-[10px] font-medium text-[#2B2D42]/60 mt-1.5">
              Kode Tamu: <span className="font-bold text-[#FF6B8B]">{guest.guest_code}</span> • Maksimal: {guest.max_guests} Orang
            </p>
          )}
        </div>

        {/* Big Bouncy "Buka Undangan" Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleOpenInvitation}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#FF6B8B] hover:bg-[#FF5277] text-white border-2 border-white shadow-[5px_5px_0px_0px_#FFD166] text-sm sm:text-base font-black tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Mail className="w-5 h-5" />
          <span>BUKA UNDANGAN CERIA ♡</span>
          <Sparkles className="w-4 h-4 text-[#FFD166] fill-[#FFD166]" />
        </motion.button>

        <p className="text-[10px] font-semibold text-[#2B2D42]/60 mt-3 flex items-center justify-center gap-1">
          <Smile className="w-3 h-3 text-[#06D6A0]" />
          <span>Klik tombol untuk membuka cerita manis pernikahan kami</span>
        </p>
      </motion.div>
    </div>
  );
};
