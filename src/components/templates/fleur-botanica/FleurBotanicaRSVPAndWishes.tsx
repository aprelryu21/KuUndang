import React, { useState } from 'react';
import { GiftAccount, Wish, SectionSetting, Guest } from '../../../types/wedding';
import { weddingService } from '../../../services/weddingService';
import { useToast } from '../../../context/ToastContext';
import { HeirloomDivider, EucalyptusStem, playEnvelopeChime } from './fleurBotanicaAssets';
import { Gift, Copy, Check, Send, Heart, MessageSquareHeart, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface FleurBotanicaRSVPAndWishesProps {
  invitationId: string;
  defaultGuestName?: string;
  gifts?: GiftAccount[];
  wishes: Wish[];
  guest?: Guest | null;
  giftSection?: SectionSetting;
  isGiftsEnabled?: boolean;
  onRefreshData?: () => void;
}

export const FleurBotanicaRSVPAndWishes: React.FC<FleurBotanicaRSVPAndWishesProps> = ({
  invitationId,
  defaultGuestName = '',
  gifts = [],
  wishes = [],
  guest,
  giftSection,
  isGiftsEnabled = true,
  onRefreshData,
}) => {
  const { showToast } = useToast();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(defaultGuestName || '');
  const [attendance, setAttendance] = useState<'attending' | 'not_attending'>('attending');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [rsvpNote, setRsvpNote] = useState('');
  const [isSubmittingRSVP, setIsSubmittingRSVP] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Standalone Wish Form State
  const [wishAuthor, setWishAuthor] = useState(defaultGuestName || '');
  const [wishMessage, setWishMessage] = useState('');
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);
  const [wishSentSuccess, setWishSentSuccess] = useState(false);

  // Fallback gifts if none provided
  const displayGifts = gifts && gifts.length > 0
    ? gifts
    : [
        {
          id: 'g-bca',
          invitation_id: invitationId,
          type: 'bank' as const,
          provider: 'BCA',
          account_number: '1234567890',
          account_name: 'Dias Taufik',
          sort_order: 1,
        },
        {
          id: 'g-mandiri',
          invitation_id: invitationId,
          type: 'bank' as const,
          provider: 'Bank Mandiri',
          account_number: '0987654321',
          account_name: 'Azalia Fasya',
          sort_order: 2,
        },
      ];

  const handleCopyAccount = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Nomor rekening / alamat berhasil disalin!', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) {
      showToast('Mohon isi nama Anda', 'error');
      return;
    }

    setIsSubmittingRSVP(true);
    try {
      await weddingService.submitRSVP({
        invitation_id: invitationId,
        guest_id: guest?.id || null,
        guest_name: rsvpName.trim(),
        attendance,
        guest_count: guestCount,
        notes: rsvpNote.trim() || undefined,
      });

      if (rsvpNote.trim()) {
        await weddingService.submitWish({
          invitation_id: invitationId,
          guest_id: guest?.id || null,
          guest_name: rsvpName.trim(),
          message: rsvpNote.trim(),
        });
      }

      playEnvelopeChime();
      setRsvpSubmitted(true);
      showToast('Konfirmasi RSVP & doa restu berhasil dikirimkan!', 'success');
      if (onRefreshData) onRefreshData();
    } catch {
      showToast('Terjadi kendala saat mengirim RSVP, silakan coba lagi.', 'error');
    } finally {
      setIsSubmittingRSVP(false);
    }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishAuthor.trim() || !wishMessage.trim()) {
      showToast('Mohon lengkapi nama dan ucapan Anda', 'error');
      return;
    }

    setIsSubmittingWish(true);
    try {
      await weddingService.submitWish({
        invitation_id: invitationId,
        guest_id: guest?.id || null,
        guest_name: wishAuthor.trim(),
        message: wishMessage.trim(),
      });

      playEnvelopeChime();
      setWishSentSuccess(true);
      setWishMessage('');
      showToast('Doa restu Anda berhasil dikirimkan!', 'success');
      setTimeout(() => setWishSentSuccess(false), 4000);
      if (onRefreshData) onRefreshData();
    } catch {
      showToast('Terjadi kendala saat mengirim ucapan, silakan coba lagi.', 'error');
    } finally {
      setIsSubmittingWish(false);
    }
  };

  return (
    <div className="space-y-0 text-[#293522]">
      {/* 1. Tanda Kasih / Wedding Gifts */}
      {isGiftsEnabled && (
        <section id="fleur-gifts" className="relative py-20 sm:py-28 px-4 bg-[#FAF8F5] border-t border-[#BDA06C]/30 overflow-hidden text-center">
          <div className="max-w-3xl mx-auto relative z-10 space-y-4">
            <div className="space-y-2">
              <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#80683E] block">
                {giftSection?.subtitle || 'TANDA KASIH PERNIKAHAN'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#293522]">
                {giftSection?.title || 'Amplop Digital & Kado'}
              </h2>
              <p className="max-w-md mx-auto text-xs sm:text-sm font-serif text-[#66705A] leading-relaxed">
                Doa restu Anda adalah karunia terindah bagi kami. Namun bagi Anda yang berkenan memberikan tanda kasih, dapat disalurkan melalui:
              </p>
              <HeirloomDivider className="my-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto text-left">
              {displayGifts.map((gift) => (
                <div
                  key={gift.id}
                  className="bg-white border border-[#BDA06C]/60 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#BDA06C]/40 text-[10px] font-serif uppercase tracking-wider text-[#80683E] font-bold">
                      {gift.provider || gift.bank_name || (gift.type === 'address' ? 'Kado Fisik' : 'Bank Transfer')}
                    </span>
                    <p className="font-mono font-bold text-lg sm:text-xl text-[#293522] tracking-wider pt-2 select-all">
                      {gift.account_number}
                    </p>
                    <p className="text-xs font-serif text-[#66705A]">
                      a.n. {gift.account_name}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopyAccount(gift.account_number, gift.id)}
                    className="mt-4 w-full py-2 px-3 rounded-xl bg-[#293522] hover:bg-[#1F2E22] text-[#FAF8F5] text-xs font-serif uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedId === gift.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#BDA06C]" />
                        <span>Salin Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. RSVP (Konfirmasi Kehadiran) */}
      <section id="fleur-rsvp" className="relative py-20 sm:py-28 px-4 bg-[#F5F2EB] border-t border-[#BDA06C]/30 overflow-hidden scroll-mt-14">
        <div className="max-w-2xl mx-auto relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#80683E] block">
              KONFIRMASI KEHADIRAN
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#293522]">
              Reservasi Kehadiran (RSVP)
            </h2>
            <p className="max-w-md mx-auto text-xs sm:text-sm font-serif text-[#66705A] leading-relaxed">
              Mohon konfirmasi kehadiran Anda demi kelancaran dan kenyamanan jamuan kami.
            </p>
            <HeirloomDivider className="my-4" />
          </div>

          <div className="bg-white border-2 border-[#BDA06C]/70 rounded-3xl p-6 sm:p-10 shadow-[0_15px_35px_rgba(41,53,34,0.08)]">
            {rsvpSubmitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8 space-y-3"
              >
                <div className="w-14 h-14 rounded-full bg-[#293522] text-[#BDA06C] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#293522]">
                  Terima Kasih!
                </h3>
                <p className="text-xs sm:text-sm font-serif text-[#66705A] max-w-sm mx-auto">
                  Konfirmasi kehadiran Anda telah tercatat dengan baik. Sampai jumpa di hari bahagia kami!
                </p>
                <button
                  onClick={() => setRsvpSubmitted(false)}
                  className="mt-3 px-5 py-2 rounded-full border border-[#BDA06C]/60 text-xs font-serif uppercase tracking-wider text-[#80683E] hover:bg-[#FAF8F5] transition-colors"
                >
                  Ubah Data Kehadiran
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleRSVPSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#80683E] font-bold mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Contoh: Bpk. & Ibu Satrio"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#BDA06C]/60 text-sm font-serif text-[#293522] focus:outline-none focus:border-[#293522]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#80683E] font-bold mb-1.5">
                    Konfirmasi Kehadiran
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttendance('attending')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-serif uppercase tracking-wider transition-all cursor-pointer ${
                        attendance === 'attending'
                          ? 'bg-[#293522] text-[#FAF8F5] border-[#293522] font-bold shadow-xs'
                          : 'bg-white text-[#66705A] border-[#BDA06C]/40 hover:border-[#BDA06C]'
                      }`}
                    >
                      ✓ Hadir
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendance('not_attending')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-serif uppercase tracking-wider transition-all cursor-pointer ${
                        attendance === 'not_attending'
                          ? 'bg-stone-700 text-white border-stone-700 font-bold shadow-xs'
                          : 'bg-white text-[#66705A] border-[#BDA06C]/40 hover:border-[#BDA06C]'
                      }`}
                    >
                      ✕ Berhalangan
                    </button>
                  </div>
                </div>

                {attendance === 'attending' && (
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#80683E] font-bold mb-1">
                      Jumlah Hadir (Orang)
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#BDA06C]/60 text-sm font-serif text-[#293522] bg-white"
                    >
                      <option value={1}>1 Orang</option>
                      <option value={2}>2 Orang</option>
                      <option value={3}>3 Orang</option>
                      <option value={4}>4 Orang</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#80683E] font-bold mb-1">
                    Doa &amp; Ucapan
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpNote}
                    onChange={(e) => setRsvpNote(e.target.value)}
                    placeholder="Tuliskan ucapan selamat & doa restu Anda..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#BDA06C]/60 text-sm font-serif text-[#293522] focus:outline-none focus:border-[#293522]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingRSVP}
                  className="w-full py-3.5 rounded-full bg-[#293522] hover:bg-[#1F2E22] active:scale-95 text-[#FAF8F5] text-xs font-serif uppercase tracking-[0.2em] font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#BDA06C]" />
                  <span>{isSubmittingRSVP ? 'Mengirim...' : 'Kirim Konfirmasi Kehadiran'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. Untaian Doa Restu (Buku Tamu Feed) */}
      <section id="fleur-wishes" className="relative py-20 sm:py-28 px-4 bg-[#FAF8F5] border-t border-[#BDA06C]/30 overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#80683E] block">
              BUKU TAMU &amp; UNTAIAN DOA
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#293522]">
              Doa &amp; Ucapan Sahabat
            </h2>
            <HeirloomDivider className="my-3" />
          </div>

          {/* Quick Wish Input Form */}
          <div className="bg-white border border-[#BDA06C]/50 rounded-2xl p-5 shadow-xs space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#293522] flex items-center gap-1.5">
              <MessageSquareHeart className="w-4 h-4 text-[#BDA06C]" />
              <span>Kirim Doa Restu Tambahan</span>
            </h4>

            {wishSentSuccess && (
              <div className="p-2.5 rounded-lg bg-[#293522]/10 border border-[#293522]/30 text-xs font-serif text-[#293522] text-center">
                Doa restu Anda telah terkirim! Terima kasih. ♡
              </div>
            )}

            <form onSubmit={handleWishSubmit} className="space-y-3">
              <input
                type="text"
                required
                value={wishAuthor}
                onChange={(e) => setWishAuthor(e.target.value)}
                placeholder="Nama Anda..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#BDA06C]/50 text-xs font-serif text-[#293522]"
              />
              <textarea
                rows={2}
                required
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                placeholder="Tuliskan doa & harapan terbaik Anda..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#BDA06C]/50 text-xs font-serif text-[#293522]"
              />
              <button
                type="submit"
                disabled={isSubmittingWish}
                className="px-5 py-2 rounded-full bg-[#293522] hover:bg-[#1F2E22] text-[#FAF8F5] text-xs font-serif uppercase tracking-wider font-bold transition-colors cursor-pointer"
              >
                {isSubmittingWish ? 'Mengirim...' : 'Kirim Doa'}
              </button>
            </form>
          </div>

          {/* Wishes Stream Feed */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {wishes && wishes.length > 0 ? (
              wishes.map((w, idx) => (
                <div
                  key={w.id || idx}
                  className="bg-white border border-[#BDA06C]/40 rounded-2xl p-4 shadow-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#293522]">
                      {w.guest_name}
                    </span>
                    <span className="text-[10px] font-serif text-[#80683E]">
                      {w.created_at ? new Date(w.created_at).toLocaleDateString('id-ID') : 'Baru saja'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-serif text-[#66705A] leading-relaxed">
                    &ldquo;{w.message}&rdquo;
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-xs font-serif text-stone-400 py-6">
                Belum ada ucapan. Jadilah yang pertama mengirimkan doa restu!
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
