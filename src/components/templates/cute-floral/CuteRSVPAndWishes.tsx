import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wish, GiftAccount, Guest } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import { weddingService } from '../../../services/weddingService';
import {
  CuteDaisyFlower,
  CuteSakuraFlower,
  CuteTulipFlower,
  CuteBowSvg,
  WashiTape,
  CuteFloralDivider,
} from './cuteFloralAssets';
import { CuteFloralParticles } from './CuteFloralParticles';
import { Heart, Gift, Send, Check, Copy, UserCheck, MessageSquareHeart } from 'lucide-react';

interface CuteRSVPAndWishesProps {
  invitationId: string;
  wishes: Wish[];
  gifts: GiftAccount[];
  guest?: Guest | null;
  guestName: string;
  onRefreshData: () => void;
}

export const CuteRSVPAndWishes: React.FC<CuteRSVPAndWishesProps> = ({
  invitationId,
  wishes,
  gifts,
  guest,
  guestName,
  onRefreshData,
}) => {
  const { language } = useLanguage();

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName || '');
  const [attendance, setAttendance] = useState<'attending' | 'not_attending'>('attending');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [submittingRsvp, setSubmittingRsvp] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Copy Account Toast
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (accNum: string) => {
    navigator.clipboard.writeText(accNum);
    setCopiedAccount(accNum);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleSubmitRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    setSubmittingRsvp(true);
    try {
      // 1. Submit RSVP
      await weddingService.submitRSVP({
        invitation_id: invitationId,
        guest_id: guest?.id || null,
        guest_name: rsvpName.trim(),
        attendance,
        guest_count: attendance === 'attending' ? guestCount : 0,
        message: rsvpMessage.trim() || undefined,
      });

      // 2. Submit Wish to Guestbook
      if (rsvpMessage.trim()) {
        await weddingService.createWish({
          invitation_id: invitationId,
          guest_id: guest?.id || null,
          guest_name: rsvpName.trim(),
          message: rsvpMessage.trim(),
        });
      }

      setRsvpSuccess(true);
      onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Gagal mengirim konfirmasi kehadiran');
    } finally {
      setSubmittingRsvp(false);
    }
  };

  const stickyNoteColors = [
    'bg-[#FFF0F5] border-[#FFCCD7]',
    'bg-[#FFF8E7] border-[#FFE082]',
    'bg-[#E8F5E9] border-[#C8E6C9]',
    'bg-[#F3E5F5] border-[#E1BEE7]',
  ];

  return (
    <section
      id="cute-rsvp"
      className="py-20 sm:py-28 px-4 bg-gradient-to-b from-[#FFF5F8] via-[#FFEBF1] to-[#FFF0F5] text-[#4A2E35] relative overflow-hidden border-t border-[#FFCCD7]"
    >
      <CuteFloralParticles count={16} showFlowers={true} />

      <div className="max-w-4xl mx-auto relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <CuteSakuraFlower className="w-6 h-6" />
            <p className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#FF5C8D]">
              {language === 'JW' ? 'DONGA PANGESTU & RAWUH' : 'DOA RESTU & KEHADIRAN'}
            </p>
            <CuteSakuraFlower className="w-6 h-6" />
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#E03164] tracking-wide">
            {language === 'JW' ? 'Serat Rawuh & Tali Asih' : 'Konfirmasi Kehadiran & Doa Restu'}
          </h2>

          <p className="max-w-lg mx-auto text-xs sm:text-sm font-sans text-[#6B3E48] leading-relaxed">
            Kehadiran serta doa restu yang tulus dari Anda adalah kado paling berharga bagi awal kehidupan baru kami.
          </p>
          <CuteFloralDivider />
        </div>

        {/* 1. RSVP FORM CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-[#FF85A2]/60 shadow-[0_12px_40px_rgba(255,133,162,0.18)] relative max-w-xl mx-auto">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <WashiTape className="w-24 h-6" color="pink" />
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFE4EC] text-[#FF5C8D] text-xs font-sans font-bold mb-2">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Formulir RSVP</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#4A2E35]">
              Konfirmasi Kehadiran Anda
            </h3>
          </div>

          {rsvpSuccess ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 rounded-2xl bg-[#E8F5E9] border-2 border-[#81C784] text-center space-y-2"
            >
              <div className="w-12 h-12 rounded-full bg-[#C8E6C9] text-[#2E7D32] mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-xl font-bold text-[#2E7D32]">
                Terima Kasih Banyak!
              </h4>
              <p className="text-xs font-sans text-[#388E3C]">
                Konfirmasi kehadiran &amp; ucapan doa restu Anda telah kami terima dengan penuh sukacita. ♡
              </p>
              <button
                type="button"
                onClick={() => setRsvpSuccess(false)}
                className="mt-3 px-4 py-1.5 rounded-full bg-[#2E7D32] text-white text-xs font-bold hover:bg-[#1B5E20] transition-colors cursor-pointer"
              >
                Kirim Tanggapan Lain
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmitRsvp} className="space-y-4">
              {/* Name input */}
              <div>
                <label className="block text-xs font-sans font-bold text-[#4A2E35] mb-1.5">
                  Nama Anda *
                </label>
                <input
                  type="text"
                  required
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Contoh: Bpk. Ahmad & Keluarga"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFF9FB] border border-[#FFCCD7] focus:border-[#FF5C8D] focus:ring-2 focus:ring-[#FF5C8D]/20 text-xs sm:text-sm text-[#4A2E35] outline-none transition-all"
                />
              </div>

              {/* Attendance Toggle */}
              <div>
                <label className="block text-xs font-sans font-bold text-[#4A2E35] mb-1.5">
                  Apakah Anda akan hadir? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance('attending')}
                    className={`py-2.5 px-3 rounded-xl font-sans text-xs font-bold border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      attendance === 'attending'
                        ? 'bg-[#FFE4EC] border-[#FF5C8D] text-[#E03164] shadow-xs'
                        : 'bg-white border-[#FFCCD7] text-[#8A505F] hover:bg-[#FFF9FB]'
                    }`}
                  >
                    <span>🌸 Ya, Hadir</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('not_attending')}
                    className={`py-2.5 px-3 rounded-xl font-sans text-xs font-bold border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      attendance === 'not_attending'
                        ? 'bg-[#FFE4EC] border-[#FF5C8D] text-[#E03164] shadow-xs'
                        : 'bg-white border-[#FFCCD7] text-[#8A505F] hover:bg-[#FFF9FB]'
                    }`}
                  >
                    <span>Belum Bisa Hadir</span>
                  </button>
                </div>
              </div>

              {/* Number of guests */}
              {attendance === 'attending' && (
                <div>
                  <label className="block text-xs font-sans font-bold text-[#4A2E35] mb-1.5">
                    Jumlah Tamu Hadir
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFF9FB] border border-[#FFCCD7] focus:border-[#FF5C8D] text-xs sm:text-sm text-[#4A2E35] outline-none"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                  </select>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-xs font-sans font-bold text-[#4A2E35] mb-1.5">
                  Ucapan Doa Restu (Opsional)
                </label>
                <textarea
                  rows={3}
                  value={rsvpMessage}
                  onChange={(e) => setRsvpMessage(e.target.value)}
                  placeholder="Tuliskan ucapan selamat dan doa manis untuk kedua mempelai..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFF9FB] border border-[#FFCCD7] focus:border-[#FF5C8D] focus:ring-2 focus:ring-[#FF5C8D]/20 text-xs sm:text-sm text-[#4A2E35] outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submittingRsvp}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#FF5C8D] via-[#FF477E] to-[#FF5C8D] hover:from-[#E03164] hover:to-[#E03164] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_8px_25px_rgba(255,71,126,0.35)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submittingRsvp ? 'Mengirim...' : 'Kirim Konfirmasi Kehadiran 🌸'}</span>
              </button>
            </form>
          )}
        </div>

        {/* 2. TANDA KASIH / AMPLOP DIGITAL */}
        {gifts && gifts.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-[#FF85A2]/60 shadow-[0_12px_40px_rgba(255,133,162,0.18)] relative max-w-xl mx-auto text-center">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <WashiTape className="w-24 h-6" color="yellow" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF0F5] text-[#FF5C8D] text-xs font-sans font-bold mb-2">
              <Gift className="w-3.5 h-3.5" />
              <span>Kado &amp; Amplop Digital</span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-[#4A2E35] mb-2">
              Tanda Kasih untuk Mempelai
            </h3>

            <p className="text-xs font-sans text-[#6B3E48] max-w-md mx-auto mb-6">
              Bagi keluarga &amp; sahabat yang berhalangan hadir atau berkenan mengirimkan tanda kasih, dapat melalui rekening/e-wallet berikut:
            </p>

            <div className="space-y-4">
              {gifts.map((gift) => {
                const isAddress = gift.type === 'address';
                const providerName = gift.provider || (gift as any).bank_name || (isAddress ? 'Kado Fisik' : 'Bank Transfer');
                const holderName = gift.account_name || (gift as any).account_holder || '';

                return (
                  <div
                    key={gift.id}
                    className="p-4 rounded-2xl bg-gradient-to-r from-[#FFF0F5] to-[#FFEBF1] border-2 border-[#FFA3B8] flex flex-col sm:flex-row items-center justify-between gap-3 text-left"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#FF5C8D] text-white text-[10px] font-bold uppercase">
                          {providerName}
                        </span>
                        <span className="text-xs font-sans font-bold text-[#4A2E35]">
                          {isAddress ? 'Penerima: ' : 'a.n '} {holderName}
                        </span>
                      </div>
                      <div className={isAddress ? "font-sans text-sm font-bold text-[#E03164] mt-1 leading-relaxed" : "font-mono text-base sm:text-lg font-bold text-[#E03164] mt-1 tracking-wider"}>
                        {gift.account_number}
                      </div>
                      {(gift as any).description && (
                        <p className="text-[11px] font-sans text-[#6B3E48] italic mt-1">
                          {(gift as any).description}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(gift.account_number)}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white hover:bg-[#FFF0F5] border border-[#FF85A2] text-[#FF5C8D] font-sans text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all hover:scale-105 cursor-pointer"
                    >
                      {copiedAccount === gift.account_number ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-green-600">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{isAddress ? 'Salin Alamat' : 'Salin No. Rekening'}</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. WISHES / BUKU TAMU BOARD */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#FF85A2] text-xs font-sans font-bold text-[#FF5C8D]">
              <MessageSquareHeart className="w-3.5 h-3.5" />
              <span>Buku Tamu &amp; Doa Restu ({wishes.length})</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2E35]">
              Untaian Doa Manis dari Sahabat
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wishes.map((w, idx) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 6) * 0.07 }}
                className={`p-4 rounded-2xl border-2 shadow-xs relative ${
                  stickyNoteColors[idx % stickyNoteColors.length]
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <CuteSakuraFlower className="w-4 h-4" />
                    <span className="font-sans font-bold text-xs sm:text-sm text-[#4A2E35]">
                      {w.guest_name}
                    </span>
                  </div>
                  <Heart className="w-3.5 h-3.5 text-[#FF5C8D] fill-[#FF5C8D]/40" />
                </div>

                <p className="font-sans text-xs text-[#6B3E48] leading-relaxed">
                  {w.message}
                </p>

                <div className="mt-2 text-right">
                  <span className="text-[10px] text-[#8A505F] font-sans">
                    {new Date(w.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
