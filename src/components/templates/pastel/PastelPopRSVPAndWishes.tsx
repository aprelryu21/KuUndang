import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Check, Copy, Heart, MessageSquare, Gift, Sparkles, Smile, Users } from 'lucide-react';
import { GiftAccount, Wish } from '../../../types/wedding';
import { weddingService } from '../../../services/weddingService';
import { useToast } from '../../../context/ToastContext';

interface PastelPopRSVPAndWishesProps {
  invitationId: string;
  gifts: GiftAccount[];
  wishes: Wish[];
  defaultGuestName: string;
  guestId?: string | null;
  onRefreshData?: () => void;
}

export const PastelPopRSVPAndWishes: React.FC<PastelPopRSVPAndWishesProps> = ({
  invitationId,
  gifts,
  wishes,
  defaultGuestName,
  guestId,
  onRefreshData,
}) => {
  const { showToast } = useToast();

  // RSVP States
  const [rsvpName, setRsvpName] = useState(defaultGuestName || '');
  const [attendance, setAttendance] = useState<'attending' | 'not_attending'>('attending');
  const [guestCount, setGuestCount] = useState(2);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [isSubmittingRSVP, setIsSubmittingRSVP] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Wish States
  const [wishName, setWishName] = useState(defaultGuestName || '');
  const [wishMessage, setWishMessage] = useState('');
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);

  // Copy state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAccount = (number: string, id: string) => {
    navigator.clipboard.writeText(number);
    setCopiedId(id);
    showToast('Nomor rekening berhasil disalin! Terima kasih atas tanda kasih Anda ♡', 'success');
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handleSubmitRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) {
      showToast('Harap masukkan nama Anda', 'error');
      return;
    }

    setIsSubmittingRSVP(true);
    try {
      await weddingService.createRSVP({
        invitation_id: invitationId,
        guest_id: guestId || null,
        guest_name: rsvpName.trim(),
        attendance,
        guest_count: attendance === 'attending' ? guestCount : 0,
        message: rsvpMessage.trim(),
      });

      setRsvpSubmitted(true);
      showToast('Konfirmasi RSVP Anda berhasil tersimpan! Terima kasih banyak ♡', 'success');
      if (onRefreshData) onRefreshData();
    } catch {
      showToast('Gagal mengirim RSVP. Mohon coba beberapa saat lagi.', 'error');
    } finally {
      setIsSubmittingRSVP(false);
    }
  };

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishMessage.trim()) {
      showToast('Harap lengkapi nama dan doa restu Anda', 'error');
      return;
    }

    setIsSubmittingWish(true);
    try {
      await weddingService.createWish({
        invitation_id: invitationId,
        guest_id: guestId || null,
        guest_name: wishName.trim(),
        message: wishMessage.trim(),
      });

      setWishMessage('');
      showToast('Doa restu manis Anda berhasil ditempel di papan pesan! ♡', 'success');
      if (onRefreshData) onRefreshData();
    } catch {
      showToast('Gagal mengirim doa restu. Mohon coba lagi.', 'error');
    } finally {
      setIsSubmittingWish(false);
    }
  };

  const noteColors = [
    { bg: 'bg-[#FFF0F3]', border: 'border-[#FF6B8B]', shadow: 'shadow-[#FFD166]' },
    { bg: 'bg-[#FFF9E6]', border: 'border-[#FFD166]', shadow: 'shadow-[#FF6B8B]' },
    { bg: 'bg-[#E8FBF5]', border: 'border-[#06D6A0]', shadow: 'shadow-[#4D96FF]' },
    { bg: 'bg-[#EDF5FF]', border: 'border-[#4D96FF]', shadow: 'shadow-[#06D6A0]' },
    { bg: 'bg-[#F4EEFF]', border: 'border-[#9D80CB]', shadow: 'shadow-[#FF6B8B]' },
  ];

  return (
    <section id="cute-rsvp" className="py-20 sm:py-28 bg-gradient-to-b from-[#FFE5EC]/40 via-white to-[#FFF9E6]/60 relative overflow-hidden">
      {/* Playful Doodles */}
      <div className="absolute top-10 right-6 text-3xl opacity-30 select-none animate-bounce" style={{ animationDuration: '4s' }}>
        🎁
      </div>
      <div className="absolute bottom-10 left-6 text-3xl opacity-30 select-none animate-bounce" style={{ animationDuration: '4.4s' }}>
        💌
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        {/* 1. KOTAK KADO & TANDA KASIH DIGITAL */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE5EC] border-2 border-[#FF6B8B] text-[#FF6B8B] text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
            <Gift className="w-3.5 h-3.5" />
            <span>KOTAK KADO &amp; CELENGAN CINTA</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166] fill-[#FFD166]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#2B2D42] tracking-tight">
            Tanda Kasih Digital ♡
          </h2>
          <p className="text-xs sm:text-sm text-[#2B2D42]/70 mt-2 max-w-lg mx-auto leading-relaxed">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberi tanda kasih dalam bentuk digital, kami sediakan rekening di bawah ini.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mt-10 text-left">
            {gifts.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-white border-3 border-[#2B2D42] shadow-[6px_6px_0px_0px_#FFD166] flex flex-col justify-between relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#FFE5EC] text-[#FF6B8B] text-[10px] font-black uppercase">
                    {item.type === 'bank' ? 'TRANSFER BANK' : 'DOMPET DIGITAL'}
                  </span>
                  <span className="text-xl font-black text-[#2B2D42]">
                    {item.provider}
                  </span>
                </div>

                <div className="my-5">
                  <p className="text-[11px] font-semibold text-[#2B2D42]/60 uppercase">Nomor Rekening</p>
                  <p className="text-xl sm:text-2xl font-mono font-black text-[#2B2D42] tracking-wider mt-0.5">
                    {item.account_number}
                  </p>
                  <p className="text-xs font-bold text-[#FF6B8B] mt-1">
                    a.n. {item.account_name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyAccount(item.account_number, item.id)}
                  className="w-full py-2.5 px-4 rounded-2xl bg-[#FFF9E6] hover:bg-[#FFD166] text-[#2B2D42] border-2 border-[#2B2D42] text-xs font-black flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_#2B2D42] transition-all cursor-pointer"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Nomor Rekening Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#FF6B8B]" />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. RSVP FORM */}
        <div className="bg-white rounded-4xl border-4 border-[#2B2D42] shadow-[8px_8px_0px_0px_#FF6B8B] p-6 sm:p-10 max-w-2xl mx-auto text-left">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8FBF5] text-[#06D6A0] text-xs font-black uppercase mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>KONFIRMASI KEHADIRAN</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-[#2B2D42]">
              Konfirmasi RSVP Anda ♡
            </h3>
            <p className="text-xs sm:text-sm text-[#2B2D42]/70 mt-1">
              Bantu kami mempersiapkan hidangan &amp; jamuan terbaik dengan konfirmasi kehadiran.
            </p>
          </div>

          {rsvpSubmitted ? (
            <div className="p-8 rounded-3xl bg-[#E8FBF5] border-3 border-[#06D6A0] text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#06D6A0] text-white flex items-center justify-center shadow-md">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>
              <h4 className="text-xl font-black text-[#2B2D42]">Terima Kasih Banyak! ♡</h4>
              <p className="text-xs text-[#2B2D42]/80 max-w-md mx-auto">
                Konfirmasi RSVP Anda telah tercatat dengan baik. Kami sangat menantikan kehadiran Anda di hari bahagia kami!
              </p>
              <button
                type="button"
                onClick={() => setRsvpSubmitted(false)}
                className="mt-3 px-4 py-2 rounded-full bg-white border border-[#06D6A0] text-xs font-bold text-[#06D6A0] hover:bg-[#06D6A0] hover:text-white transition-colors cursor-pointer"
              >
                Kirim Ulang / Ubah Jawaban
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitRSVP} className="space-y-5">
              {/* Nama */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#2B2D42] mb-1.5">
                  Nama Lengkap Anda
                </label>
                <input
                  type="text"
                  required
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Contoh: Budi Santoso &amp; Keluarga"
                  className="w-full px-4 py-3 rounded-2xl bg-[#FFF9E6] border-2 border-[#2B2D42] text-sm font-bold text-[#2B2D42] focus:outline-hidden focus:border-[#FF6B8B]"
                />
              </div>

              {/* Status Kehadiran (Cute Emoji Selector) */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#2B2D42] mb-1.5">
                  Apakah Anda Berkenan Hadir?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance('attending')}
                    className={`p-3.5 rounded-2xl border-2 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      attendance === 'attending'
                        ? 'bg-[#06D6A0] text-white border-[#2B2D42] shadow-[3px_3px_0px_0px_#2B2D42]'
                        : 'bg-white text-[#2B2D42] border-slate-200 hover:border-[#06D6A0]'
                    }`}
                  >
                    <span>😍</span>
                    <span>Pasti Hadir!</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance('not_attending')}
                    className={`p-3.5 rounded-2xl border-2 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      attendance === 'not_attending'
                        ? 'bg-[#FF6B8B] text-white border-[#2B2D42] shadow-[3px_3px_0px_0px_#2B2D42]'
                        : 'bg-white text-[#2B2D42] border-slate-200 hover:border-[#FF6B8B]'
                    }`}
                  >
                    <span>🥺</span>
                    <span>Maaf, Belum Bisa</span>
                  </button>
                </div>
              </div>

              {/* Jumlah Tamu */}
              {attendance === 'attending' && (
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#2B2D42] mb-1.5">
                    Jumlah Tamu yang Hadir:
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestCount(num)}
                        className={`flex-1 py-2.5 rounded-xl border-2 font-black text-xs cursor-pointer transition-all ${
                          guestCount === num
                            ? 'bg-[#FFD166] text-[#2B2D42] border-[#2B2D42] shadow-[2px_2px_0px_0px_#2B2D42]'
                            : 'bg-white text-[#2B2D42] border-slate-200'
                        }`}
                      >
                        {num} Orang
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pesan Opsional */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#2B2D42] mb-1.5">
                  Catatan untuk Mempelai (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={rsvpMessage}
                  onChange={(e) => setRsvpMessage(e.target.value)}
                  placeholder="Tulis pesan atau ucapan singkat..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9E6] border-2 border-[#2B2D42] text-xs font-semibold text-[#2B2D42] focus:outline-hidden"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmittingRSVP}
                className="w-full py-3.5 rounded-2xl bg-[#FF6B8B] hover:bg-[#FF5277] text-white border-2 border-[#2B2D42] shadow-[4px_4px_0px_0px_#2B2D42] text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmittingRSVP ? 'Menyimpan...' : 'Kirim Konfirmasi RSVP ♡'}</span>
              </button>
            </form>
          )}
        </div>

        {/* 3. PAPAN DOA RESTU / BULLETIN BOARD OF WISHES */}
        <div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EEFF] border-2 border-[#9D80CB] text-[#9D80CB] text-xs font-black uppercase tracking-wider mb-2 shadow-xs">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>PAPAN DOA &amp; UCAPAN MANIS</span>
              <Heart className="w-3.5 h-3.5 text-[#FF6B8B] fill-[#FF6B8B]" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-[#2B2D42]">
              Kirimkan Doa &amp; Restu Anda ♡
            </h3>
            <p className="text-xs sm:text-sm text-[#2B2D42]/70 mt-1 max-w-md mx-auto">
              Tempelkan doa dan pesan cinta Anda di papan kenangan pernikahan kami.
            </p>
          </div>

          {/* Form Kirim Ucapan */}
          <div className="bg-white rounded-3xl border-3 border-[#2B2D42] shadow-[6px_6px_0px_0px_#4D96FF] p-6 max-w-2xl mx-auto mb-10 text-left">
            <form onSubmit={handleSubmitWish} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-black uppercase text-[#2B2D42] mb-1">
                    Nama Anda
                  </label>
                  <input
                    type="text"
                    required
                    value={wishName}
                    onChange={(e) => setWishName(e.target.value)}
                    placeholder="Nama Anda"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FFF9E6] border-2 border-[#2B2D42] text-xs font-bold text-[#2B2D42] focus:outline-hidden"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-black uppercase text-[#2B2D42] mb-1">
                    Doa &amp; Ucapan Selamat
                  </label>
                  <input
                    type="text"
                    required
                    value={wishMessage}
                    onChange={(e) => setWishMessage(e.target.value)}
                    placeholder="Tuliskan doa terbaik Anda untuk kedua mempelai..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FFF9E6] border-2 border-[#2B2D42] text-xs font-bold text-[#2B2D42] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  disabled={isSubmittingWish}
                  className="px-6 py-2.5 rounded-xl bg-[#06D6A0] hover:bg-[#05b88a] text-white border-2 border-[#2B2D42] shadow-[3px_3px_0px_0px_#2B2D42] text-xs font-black inline-flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmittingWish ? 'Mengirim...' : 'Tempel Doa Restu ✨'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Sticky Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-left">
            {wishes.map((item, idx) => {
              const theme = noteColors[idx % noteColors.length];
              const formattedDate = new Date(item.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 6) * 0.05 }}
                  whileHover={{ rotate: idx % 2 === 0 ? -2 : 2, y: -4 }}
                  className={`p-5 rounded-3xl ${theme.bg} border-3 ${theme.border} shadow-[5px_5px_0px_0px_#2B2D42] relative flex flex-col justify-between`}
                >
                  {/* Pin Sticker */}
                  <div className="absolute -top-2 left-6 w-4 h-4 rounded-full bg-[#FF6B8B] border-2 border-white shadow-xs" />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="font-black text-sm text-[#2B2D42] truncate">
                        {item.guest_name}
                      </h4>
                      <span className="text-[10px] text-[#2B2D42]/60 font-medium shrink-0">
                        {formattedDate}
                      </span>
                    </div>

                    <p className="text-xs text-[#2B2D42]/90 font-medium leading-relaxed italic">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#2B2D42]/10 flex items-center justify-between text-[10px] text-[#2B2D42]/60 font-bold">
                    <span>♡ Doa Restu Hangat</span>
                    <span>#AprilSiti</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
