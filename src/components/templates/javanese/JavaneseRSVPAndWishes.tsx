import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GiftAccount, Wish, RSVP } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import { weddingService } from '../../../services/weddingService';
import {
  JavaneseDivider,
  JavaneseCornerFlourish,
  BatikKawungPattern,
} from './javaneseAssets';
import {
  CreditCard,
  Copy,
  Check,
  Heart,
  Send,
  UserCheck,
  UserX,
  Sparkles,
  MessageSquare,
} from 'lucide-react';

interface JavaneseRSVPAndWishesProps {
  invitationId: string;
  defaultGuestName: string;
  gifts?: GiftAccount[];
  wishes: Wish[];
  onRefreshData?: () => void;
}

export const JavaneseRSVPAndWishes: React.FC<JavaneseRSVPAndWishesProps> = ({
  invitationId,
  defaultGuestName,
  gifts = [],
  wishes = [],
  onRefreshData,
}) => {
  const { t, language } = useLanguage();

  // Amplop digital state
  const [copiedBankId, setCopiedBankId] = useState<string | null>(null);

  // RSVP state
  const [rsvpName, setRsvpName] = useState(defaultGuestName || '');
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'declined'>('attending');
  const [guestCount, setGuestCount] = useState(2);
  const [rsvpWish, setRsvpWish] = useState('');
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Standalone Wish state
  const [wishAuthor, setWishAuthor] = useState(defaultGuestName || '');
  const [wishMessage, setWishMessage] = useState('');
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);
  const [wishSuccessMsg, setWishSuccessMsg] = useState(false);

  // Default gifts accounts if none provided
  const displayGifts =
    gifts && gifts.length > 0
      ? gifts
      : [
          {
            id: 'gift-1',
            invitation_id: invitationId,
            bank_name: 'BCA',
            account_number: '0181928371',
            account_holder: 'Mempelai Wanita',
            is_active: true,
          },
          {
            id: 'gift-2',
            invitation_id: invitationId,
            bank_name: 'Bank Mandiri',
            account_number: '1420019283746',
            account_holder: 'Mempelai Pria',
            is_active: true,
          },
        ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBankId(id);
    setTimeout(() => setCopiedBankId(null), 2500);
  };

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    setIsSubmittingRsvp(true);
    try {
      await weddingService.createRSVP({
        invitation_id: invitationId,
        guest_name: rsvpName.trim(),
        attendance: rsvpStatus === 'attending' ? 'attending' : 'not_attending',
        guest_count: rsvpStatus === 'attending' ? Number(guestCount) : 0,
        message: rsvpWish.trim() || undefined,
      });

      if (rsvpWish.trim()) {
        await weddingService.createWish({
          invitation_id: invitationId,
          guest_name: rsvpName.trim(),
          message: rsvpWish.trim(),
        });
      }

      setRsvpSubmitted(true);
      if (onRefreshData) onRefreshData();
    } catch (err) {
      console.error('RSVP submission error:', err);
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishAuthor.trim() || !wishMessage.trim()) return;

    setIsSubmittingWish(true);
    try {
      await weddingService.createWish({
        invitation_id: invitationId,
        guest_name: wishAuthor.trim(),
        message: wishMessage.trim(),
      });
      setWishMessage('');
      setWishSuccessMsg(true);
      setTimeout(() => setWishSuccessMsg(false), 3000);
      if (onRefreshData) onRefreshData();
    } catch (err) {
      console.error('Wish submission error:', err);
    } finally {
      setIsSubmittingWish(false);
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. Tali Asih / Kado Digital (Gifts) */}
      <section
        id="javanese-gifts"
        className="py-20 sm:py-24 px-4 bg-[#1E110A] text-[#FAF6EE] relative overflow-hidden border-t border-[#D4AF37]/30"
      >
        <BatikKawungPattern className="absolute inset-0 pointer-events-none opacity-8" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-14 space-y-3">
            <p className="text-xs font-serif tracking-[0.25em] text-[#D4AF37] uppercase">
              {language === 'JW' ? 'TANDA TRESNA & TALI ASIH' : 'TANDA KASIH & AMPLOP DIGITAL'}
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-[#FAF6EE]">
              {language === 'JW' ? 'Pasugatan Tali Asih' : 'Kado Pernikahan & Doa Restu'}
            </h2>
            <p className="max-w-xl mx-auto text-xs sm:text-sm font-serif text-[#FAF6EE]/75 leading-relaxed">
              {language === 'JW'
                ? 'Donga pangestu panjenengan sedaya sampun dados kabingahan tumrap kula sakeluwarga. Nanging menawi kepareng maringi tanda tresna, saged lumantar rekening ing andhap menika.'
                : 'Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila berkenan memberikan tanda kasih, dapat disalurkan melalui rekening berikut.'}
            </p>
            <JavaneseDivider className="my-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {displayGifts.map((gift) => (
              <div
                key={gift.id}
                className="bg-[#24160E]/90 border-2 border-[#D4AF37]/60 rounded-2xl p-6 relative shadow-[0_6px_20px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                <div className="absolute top-2 right-2">
                  <CreditCard className="w-5 h-5 text-[#D4AF37]/60" />
                </div>

                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#1A1009] border border-[#D4AF37]/40 text-[11px] font-serif font-bold text-[#E5C158] uppercase mb-3">
                    {gift.bank_name}
                  </div>
                  <p className="font-mono text-xl sm:text-2xl font-bold text-[#FAF6EE] tracking-wider my-2">
                    {gift.account_number}
                  </p>
                  <p className="font-serif text-xs text-[#FAF6EE]/70">
                    a.n. <span className="font-bold text-[#E5C158]">{gift.account_holder}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(gift.account_number, gift.id)}
                  className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#1A1009] hover:bg-[#2C1810] border border-[#D4AF37]/60 text-[#E5C158] font-serif text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  {copiedBankId === gift.id ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-300">Nomer Rekening Kasalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#D4AF37]" />
                      <span>Salin Nomer Rekening</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Serat Rawuh (RSVP) */}
      <section
        id="javanese-rsvp"
        className="py-20 sm:py-24 px-4 bg-[#180E07] text-[#FAF6EE] relative overflow-hidden border-t border-[#D4AF37]/30"
      >
        <BatikKawungPattern className="absolute inset-0 pointer-events-none opacity-8" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12 space-y-3">
            <p className="text-xs font-serif tracking-[0.25em] text-[#D4AF37] uppercase">
              {language === 'JW' ? 'SERAT RAWUH TAMU' : 'KONFIRMASI KEHADIRAN (RSVP)'}
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-[#FAF6EE]">
              {language === 'JW' ? 'Konfirmasi Rawuh' : 'Konfirmasi Kehadiran'}
            </h2>
            <p className="max-w-xl mx-auto text-xs sm:text-sm font-serif text-[#FAF6EE]/75 leading-relaxed">
              {language === 'JW'
                ? 'Nyuwun tulung konfirmasi rawuh panjenengan supados kula sakeluwarga saged nyawisaken pasugatan kanthi prayogi.'
                : 'Mohon kesediaan Bapak/Ibu/Saudara/i untuk mengonfirmasi kehadiran demi kenyamanan dan kelancaran jamuan bersama.'}
            </p>
            <JavaneseDivider className="my-4" />
          </div>

          <div className="bg-[#24160E]/90 border-2 border-[#D4AF37]/70 rounded-2xl p-6 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.7)] relative">
            <div className="absolute top-2 left-2">
              <JavaneseCornerFlourish className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div className="absolute top-2 right-2 rotate-90">
              <JavaneseCornerFlourish className="w-6 h-6 text-[#D4AF37]" />
            </div>

            {rsvpSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-[#E5C158]">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#E5C158]">
                  {language === 'JW' ? 'Matur Nuwun Sanget!' : 'Terima Kasih Banyak!'}
                </h3>
                <p className="font-serif text-xs sm:text-sm text-[#FAF6EE]/80 max-w-md mx-auto leading-relaxed">
                  {language === 'JW'
                    ? `Konfirmasi rawuh panjenengan (${rsvpName}) sampun kacathet kanthi sae. Mugi tansah pinaringan karaharjan.`
                    : `Konfirmasi kehadiran Anda (${rsvpName}) telah tersimpan dalam daftar tamu kami. Sampai jumpa di hari bahagia kami!`}
                </p>
                <button
                  type="button"
                  onClick={() => setRsvpSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-xl bg-[#1A1009] border border-[#D4AF37]/60 text-[#D4AF37] font-serif text-xs uppercase tracking-wider hover:bg-[#2C1810]"
                >
                  {language === 'JW' ? 'Ubah Konfirmasi' : 'Ubah Data Kehadiran'}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleRSVPSubmit} className="space-y-6">
                {/* Guest Name */}
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#D4AF37] mb-1.5 font-semibold">
                    {language === 'JW' ? 'Asma Jangkep Panjenengan' : 'Nama Lengkap Anda'}
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Contoh: Bpk. Bambang & Ibu"
                    className="w-full px-4 py-3 rounded-xl bg-[#1A1009] border border-[#D4AF37]/50 text-[#FAF6EE] text-sm font-serif focus:outline-none focus:border-[#E5C158] transition-colors"
                  />
                </div>

                {/* Attendance Status Choice */}
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#D4AF37] mb-2 font-semibold">
                    {language === 'JW' ? 'Kepareng Rawuh?' : 'Konfirmasi Kehadiran'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('attending')}
                      className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2.5 font-serif text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        rsvpStatus === 'attending'
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#FFF2B2] font-bold shadow-md'
                          : 'bg-[#1A1009] border-[#D4AF37]/30 text-[#FAF6EE]/70 hover:border-[#D4AF37]/60'
                      }`}
                    >
                      <UserCheck className="w-4 h-4 text-[#D4AF37]" />
                      <span>{language === 'JW' ? 'InshaAllah Kula Rawuh' : 'Hadir'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRsvpStatus('declined')}
                      className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2.5 font-serif text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        rsvpStatus === 'declined'
                          ? 'bg-red-950/30 border-red-500/70 text-red-200 font-bold shadow-md'
                          : 'bg-[#1A1009] border-[#D4AF37]/30 text-[#FAF6EE]/70 hover:border-[#D4AF37]/60'
                      }`}
                    >
                      <UserX className="w-4 h-4 text-red-400" />
                      <span>
                        {language === 'JW' ? 'Nyuwun Pangapunten Mboten Saged' : 'Tidak Dapat Hadir'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Number of Guests */}
                {rsvpStatus === 'attending' && (
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#D4AF37] mb-1.5 font-semibold">
                      {language === 'JW' ? 'Cacahing Rawuh (Jumlah Tamu)' : 'Jumlah Tamu Hadir'}
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1009] border border-[#D4AF37]/50 text-[#FAF6EE] text-sm font-serif focus:outline-none focus:border-[#E5C158]"
                    >
                      <option value={1}>1 Orang</option>
                      <option value={2}>2 Orang</option>
                      <option value={3}>3 Orang</option>
                      <option value={4}>4 Orang</option>
                    </select>
                  </div>
                )}

                {/* Wishes Note */}
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#D4AF37] mb-1.5 font-semibold">
                    {language === 'JW' ? 'Donga Pangestu / Ucapan' : 'Doa & Ucapan untuk Pengantin'}
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpWish}
                    onChange={(e) => setRsvpWish(e.target.value)}
                    placeholder={
                      language === 'JW'
                        ? 'Kula sakeluwarga nderek mangayubagya, mugi pinanganten kekalih tansah ayom ayem tentrem...'
                        : 'Selamat menempuh hidup baru, semoga menjadi keluarga sakinah mawaddah warahmah...'
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#1A1009] border border-[#D4AF37]/50 text-[#FAF6EE] text-sm font-serif focus:outline-none focus:border-[#E5C158]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmittingRsvp}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#9C7A1D] via-[#D4AF37] to-[#9C7A1D] hover:from-[#B58E23] hover:via-[#E5C158] hover:to-[#B58E23] text-[#1A1009] font-serif font-bold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4 text-[#1A1009]" />
                  <span>
                    {isSubmittingRsvp
                      ? 'Ngirim Serat...'
                      : language === 'JW'
                      ? 'KIRIM SERAT RAWUH (RSVP)'
                      : 'KIRIM KONFIRMASI (RSVP)'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. Pasugatan Donga Pangestu (Buku Tamu / Wishes Feed) */}
      <section
        id="javanese-wishes"
        className="py-20 sm:py-24 px-4 bg-[#1E110A] text-[#FAF6EE] relative overflow-hidden border-t border-[#D4AF37]/30"
      >
        <BatikKawungPattern className="absolute inset-0 pointer-events-none opacity-8" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-14 space-y-3">
            <p className="text-xs font-serif tracking-[0.25em] text-[#D4AF37] uppercase">
              {language === 'JW' ? 'UNTAIAN DONGA PANGESTU' : 'BUKU TAMU & DOA RESTU'}
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-[#FAF6EE]">
              {language === 'JW' ? 'Pasugatan Donga' : 'Untaian Doa & Harapan'}
            </h2>
            <p className="max-w-xl mx-auto text-xs sm:text-sm font-serif text-[#FAF6EE]/75 leading-relaxed">
              {language === 'JW'
                ? 'Matur nuwun sanget awit sedaya donga pangestu ingkang sampun kaaturaken dening para rawuh sedaya.'
                : 'Ungkapan doa tulus dan restu terbaik dari segenap sanak saudara, kerabat, dan sahabat tercinta.'}
            </p>
            <JavaneseDivider className="my-4" />
          </div>

          {/* New Wish Form */}
          <div className="bg-[#24160E]/80 border border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 mb-10 shadow-md">
            <h3 className="font-serif text-lg font-bold text-[#E5C158] mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              <span>{language === 'JW' ? 'Serat Donga Pangestu' : 'Kirim Doa Restu Anda'}</span>
            </h3>

            {wishSuccessMsg && (
              <div className="mb-4 p-3 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37] text-xs font-serif text-[#FFF2B2] text-center">
                Matur nuwun! Donga pangestu panjenengan sampun kasimpen kanthi sae. ♡
              </div>
            )}

            <form onSubmit={handleWishSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={wishAuthor}
                  onChange={(e) => setWishAuthor(e.target.value)}
                  placeholder="Asma Panjenengan (Nama Anda)"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1A1009] border border-[#D4AF37]/50 text-[#FAF6EE] text-xs sm:text-sm font-serif focus:outline-none focus:border-[#E5C158]"
                />
                <button
                  type="submit"
                  disabled={isSubmittingWish}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#9C7A1D] to-[#D4AF37] text-[#1A1009] font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:brightness-110"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmittingWish ? 'Ngirim...' : 'KIRIM DONGA'}</span>
                </button>
              </div>

              <textarea
                rows={2}
                required
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                placeholder="Serat donga pangestu dhumateng pinanganten kekalih..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#1A1009] border border-[#D4AF37]/50 text-[#FAF6EE] text-xs sm:text-sm font-serif focus:outline-none focus:border-[#E5C158]"
              />
            </form>
          </div>

          {/* Wishes List Feed */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {wishes && wishes.length > 0 ? (
              wishes.map((w, idx) => (
                <div
                  key={w.id || idx}
                  className="bg-[#24160E]/90 border border-[#D4AF37]/40 rounded-xl p-4 sm:p-5 shadow-sm space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
                      <span className="font-serif font-bold text-sm text-[#E5C158]">
                        {w.guest_name}
                      </span>
                    </div>
                    <span className="text-[10px] font-serif text-[#FAF6EE]/50">
                      {w.created_at ? new Date(w.created_at).toLocaleDateString('id-ID') : 'Baru saja'}
                    </span>
                  </div>
                  <p className="font-serif text-xs sm:text-sm text-[#FAF6EE]/85 leading-relaxed pl-4">
                    “{w.message}”
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs font-serif text-[#FAF6EE]/60">
                Dereng wonten serat donga. Sumangga dados ingkang sepisanan ngirimaken donga.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
