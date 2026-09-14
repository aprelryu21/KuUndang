import React, { useState } from 'react';
import { Check, Copy, MessageSquare, Flame, Gift, Send, Zap } from 'lucide-react';
import { GiftAccount, Wish, SectionSetting } from '../../../types/wedding';
import { weddingService } from '../../../services/weddingService';
import { useToast } from '../../../context/ToastContext';
import { useLanguage } from '../../../context/LanguageContext';

interface Persona5RSVPAndWishesProps {
  invitationId: string;
  gifts: GiftAccount[];
  wishes: Wish[];
  defaultGuestName: string;
  guestId?: string | null;
  giftSection?: SectionSetting;
  isGiftsEnabled?: boolean;
  onRefreshData?: () => void;
}

export const Persona5RSVPAndWishes: React.FC<Persona5RSVPAndWishesProps> = ({
  invitationId,
  gifts,
  wishes,
  defaultGuestName,
  guestId,
  giftSection,
  isGiftsEnabled = true,
  onRefreshData,
}) => {
  const { showToast } = useToast();
  const { t, language } = useLanguage();
  const p5Translations = t.p5;

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

  const handleCopyAccount = (id: string, num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedId(id);
    showToast(t.numberCopied || 'Nomor rekening berhasil disalin! ♡', 'success');
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) {
      showToast(t.nameRequired || 'Harap masukkan nama Anda', 'error');
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
        message: rsvpMessage.trim() || undefined,
      });

      setRsvpSubmitted(true);
      showToast(t.rsvpSuccess || 'Status konfirmasi kehadiran berhasil dikirim!', 'success');
      if (onRefreshData) onRefreshData();
    } catch {
      showToast(t.rsvpError || 'Gagal mengirim RSVP, silakan coba lagi', 'error');
    } finally {
      setIsSubmittingRSVP(false);
    }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishMessage.trim()) {
      showToast(t.nameRequired || 'Harap lengkapi nama dan doa restu Anda', 'error');
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
      showToast(t.wishSuccess || 'Doa restu Anda berhasil dikirim!', 'success');
      if (onRefreshData) onRefreshData();
    } catch {
      showToast(t.wishError || 'Gagal mengirim ucapan, silakan coba lagi', 'error');
    } finally {
      setIsSubmittingWish(false);
    }
  };

  return (
    <section id="p5-rsvp" className="py-20 sm:py-28 bg-[#000000] text-[#FFFFFF] relative overflow-hidden border-t-4 border-[#E60012]">
      {/* Halftone Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#E60012 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        {/* 1. VELVET ROOM TRIBUTE / REKENING DIGITAL */}
        {isGiftsEnabled && gifts && gifts.length > 0 && (
          <div>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E60012] text-white text-xs font-black uppercase tracking-[0.2em] -skew-x-12 mb-3">
                <Gift className="w-3.5 h-3.5 text-[#FFF000] skew-x-12" />
                <span className="skew-x-12">
                  {p5Translations?.tributeHeader || 'VELVET ROOM DIGITAL TRIBUTE'}
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight text-[#FFFFFF]">
                {giftSection?.title ? (
                  giftSection.title.toUpperCase()
                ) : t.weddingGift ? (
                  t.weddingGift.toUpperCase()
                ) : (
                  <>AMPLOP DIGITAL &amp; <span className="text-[#E60012] not-italic">TANDA KASIH</span></>
                )}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-[#FFFFFF]/70 mt-2 max-w-xl mx-auto">
                {giftSection?.subtitle ||
                  t.giftDescription ||
                  'Doa restu Anda adalah hadiah terindah. Bagi yang ingin memberikan tanda kasih secara cashless:'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {gifts.map((gf) => {
                const isCopied = copiedId === gf.id;
                const providerName = gf.provider || (gf as any).bank_name || (gf.type === 'address' ? 'KADO FISIK' : 'BANK');
                const accountHolder = gf.account_name || (gf as any).account_holder || '';
                const isAddress = gf.type === 'address';

                return (
                  <div
                    key={gf.id}
                    className="bg-[#141418] border-4 border-white p-6 -skew-x-2 shadow-[8px_8px_0px_0px_#E60012] text-left relative"
                  >
                    <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
                      <span className="bg-[#E60012] text-white text-xs font-black uppercase tracking-wider px-2 py-0.5 -skew-x-6">
                        {providerName}
                      </span>
                      <span className="text-[10px] font-mono text-[#FFF000] uppercase font-bold">
                        {isAddress ? 'PHYSICAL DELIVERY' : 'OFFICIAL REPOSITORY'}
                      </span>
                    </div>

                    <div className="space-y-1 my-3">
                      <p className="text-[11px] font-mono text-[#FFFFFF]/60 uppercase">
                        {isAddress ? 'ALAMAT PENGIRIMAN:' : t.accountNumber || 'NOMOR REKENING'}:
                      </p>
                      <div className={isAddress ? "text-sm sm:text-base font-mono font-bold text-white leading-relaxed" : "text-xl sm:text-2xl font-mono font-black text-white tracking-widest"}>
                        {gf.account_number}
                      </div>
                      <p className="text-xs font-mono text-[#FFF000] uppercase font-bold mt-1">
                        {isAddress ? 'PENERIMA: ' : 'A.N. '} {accountHolder}
                      </p>
                      {gf.description && (
                        <p className="text-[11px] font-mono text-white/70 italic mt-2">
                          {gf.description}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyAccount(gf.id, gf.account_number)}
                      className="w-full mt-4 py-2.5 bg-[#000000] hover:bg-[#E60012] text-white text-xs font-mono font-black uppercase tracking-wider transition-colors border border-white flex items-center justify-center gap-2 -skew-x-6 cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#FFF000] skew-x-6" />
                          <span className="skew-x-6 text-[#FFF000]">{t.numberCopied || 'BERHASIL DISALIN!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 skew-x-6" />
                          <span className="skew-x-6">{isAddress ? 'SALIN ALAMAT' : t.copyNumber || 'SALIN NOMOR REKENING'}</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. BATTLE COMMAND RSVP */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF000] text-black text-xs font-black uppercase tracking-[0.2em] -skew-x-12 mb-3">
              <Zap className="w-3.5 h-3.5 text-black skew-x-12" />
              <span className="skew-x-12">
                {p5Translations?.tacticalBattle || 'TACTICAL BATTLE COMMAND'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tight text-[#FFFFFF]">
              {p5Translations?.rsvpTitle ? (
                p5Translations.rsvpTitle
              ) : (
                <>KONFIRMASI KEHADIRAN <span className="text-[#E60012] not-italic">// RSVP</span></>
              )}
            </h2>
          </div>

          <div className="bg-[#141418] border-4 border-[#E60012] p-6 sm:p-8 -skew-x-2 shadow-[10px_10px_0px_0px_#FFFFFF]">
            {rsvpSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-[#E60012] text-white mx-auto flex items-center justify-center border-2 border-white -skew-x-6">
                  <Check className="w-8 h-8 text-[#FFF000] skew-x-6" />
                </div>
                <h3 className="text-xl font-black uppercase text-white">
                  MISSION LOG REGISTERED!
                </h3>
                <p className="text-xs font-mono text-[#FFFFFF]/80 max-w-md mx-auto">
                  {t.rsvpSuccessMessage ||
                    'Terima kasih atas konfirmasi kehadiran Anda. Kami menantikan kehadiran Anda di hari bahagia kami!'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleRSVPSubmit} className="space-y-4 text-left">
                <div>
                  <label htmlFor="p5-rsvp-name" className="block text-xs font-mono font-bold text-[#FFF000] uppercase mb-1">
                    {t.yourName || 'NAMA LENGKAP TAMU'}:
                  </label>
                  <input
                    id="p5-rsvp-name"
                    type="text"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    required
                    placeholder={t.guestNamePlaceholder || 'Contoh: Bpk. Ahmad Pratama'}
                    className="w-full px-3.5 py-2.5 bg-black border-2 border-white/40 text-white text-xs font-mono focus:border-[#E60012] focus:outline-none"
                  />
                </div>

                {/* Persona 5 Battle Action Selector */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#FFF000] uppercase mb-2">
                    {p5Translations?.battleAction || 'PILIH TINDAKAN PERTEMPURAN (ACTION):'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttendance('attending')}
                      className={`p-3 text-xs font-black uppercase tracking-wider border-2 -skew-x-6 cursor-pointer transition-all ${
                        attendance === 'attending'
                          ? 'bg-[#E60012] text-white border-white shadow-[4px_4px_0px_0px_#FFF000]'
                          : 'bg-black text-white/60 border-white/20 hover:border-white'
                      }`}
                    >
                      <span className="skew-x-6 inline-block">
                        {p5Translations?.allOutAttackHadir || '⚔ ALL-OUT ATTACK (HADIR)'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttendance('not_attending')}
                      className={`p-3 text-xs font-black uppercase tracking-wider border-2 -skew-x-6 cursor-pointer transition-all ${
                        attendance === 'not_attending'
                          ? 'bg-[#E60012] text-white border-white shadow-[4px_4px_0px_0px_#FFF000]'
                          : 'bg-black text-white/60 border-white/20 hover:border-white'
                      }`}
                    >
                      <span className="skew-x-6 inline-block">
                        {p5Translations?.escapeBerhalangan || '🛡 ESCAPE (BERHALANGAN)'}
                      </span>
                    </button>
                  </div>
                </div>

                {attendance === 'attending' && (
                  <div>
                    <label htmlFor="p5-rsvp-guest-count" className="block text-xs font-mono font-bold text-[#FFF000] uppercase mb-1">
                      {t.guestCount || 'JUMLAH PERSONIL (TAMU)'}:
                    </label>
                    <select
                      id="p5-rsvp-guest-count"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-black border-2 border-white/40 text-white text-xs font-mono focus:border-[#E60012] focus:outline-none"
                    >
                      <option value={1}>1 {t.person || 'Orang'}</option>
                      <option value={2}>2 {t.person || 'Orang'}</option>
                      <option value={3}>3 {t.person || 'Orang'}</option>
                      <option value={4}>4 {t.person || 'Orang'}</option>
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="p5-rsvp-msg" className="block text-xs font-mono font-bold text-[#FFF000] uppercase mb-1">
                    {t.notesLabel || 'PESAN TAMBAHAN (OPSIONAL)'}:
                  </label>
                  <textarea
                    id="p5-rsvp-msg"
                    rows={2}
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    placeholder={t.notesPlaceholder || 'Catatan untuk kedua mempelai...'}
                    className="w-full px-3.5 py-2.5 bg-black border-2 border-white/40 text-white text-xs font-mono focus:border-[#E60012] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingRSVP}
                  className="w-full py-3.5 bg-[#E60012] hover:bg-[#FF0019] text-white text-sm font-black uppercase tracking-wider transition-colors border-2 border-white -skew-x-6 shadow-[4px_4px_0px_0px_#FFF000] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4 text-[#FFF000] skew-x-6" />
                  <span className="skew-x-6">
                    {isSubmittingRSVP ? 'TRANSMITTING...' : p5Translations?.sendRsvp || t.sendRsvp || 'EXECUTE RSVP COMMAND'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 3. PHAN-SITE COGNITIVE TRANSMISSION (BUKU TAMU & DOA RESTU) */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E60012] text-white text-xs font-black uppercase tracking-[0.2em] -skew-x-12 mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-[#FFF000] skew-x-12" />
              <span className="skew-x-12">
                {p5Translations?.phanSiteForum || 'PHAN-SITE FORUM // APPROVAL: 100% LOVE'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tight text-[#FFFFFF]">
              {t.wishesTitle ? (
                t.wishesTitle.toUpperCase()
              ) : (
                <>DOA RESTU & <span className="text-[#E60012] not-italic">TRANSMISI PESAN</span></>
              )}
            </h2>
          </div>

          {/* New Wish Form */}
          <div className="bg-[#141418] border-4 border-white p-6 -skew-x-2 shadow-[8px_8px_0px_0px_#E60012] mb-8 text-left">
            <form onSubmit={handleWishSubmit} className="space-y-3">
              <div>
                <label htmlFor="p5-wish-name" className="block text-xs font-mono font-bold text-[#FFF000] uppercase mb-1">
                  {t.yourName || 'NAMA ANDA'}:
                </label>
                <input
                  id="p5-wish-name"
                  type="text"
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                  required
                  placeholder={t.guestNamePlaceholder || 'Nama pemberi doa...'}
                  className="w-full px-3.5 py-2 bg-black border border-white/40 text-white text-xs font-mono focus:border-[#E60012] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="p5-wish-msg" className="block text-xs font-mono font-bold text-[#FFF000] uppercase mb-1">
                  {t.wishPlaceholder || 'UNTAIAN DOA & UCAPAN SELAMAT'}:
                </label>
                <textarea
                  id="p5-wish-msg"
                  rows={3}
                  value={wishMessage}
                  onChange={(e) => setWishMessage(e.target.value)}
                  required
                  placeholder={t.wishPlaceholder || 'Tuliskan doa restu tulus untuk kedua mempelai...'}
                  className="w-full px-3.5 py-2 bg-black border border-white/40 text-white text-xs font-mono focus:border-[#E60012] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingWish}
                className="w-full py-2.5 bg-[#E60012] hover:bg-[#FF0019] text-white text-xs font-mono font-black uppercase tracking-wider transition-colors border border-white -skew-x-6 cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 skew-x-6" />
                <span className="skew-x-6">
                  {isSubmittingWish ? 'POSTING TRANSMISSION...' : p5Translations?.sendWish || t.sendWish || 'KIRIM DOA RESTU KE PHAN-SITE'}
                </span>
              </button>
            </form>
          </div>

          {/* Wishes Stream Feed */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-none text-left">
            {wishes
              .filter((w) => w.status !== 'hidden')
              .map((w) => (
                <div
                  key={w.id}
                  className="bg-black border-2 border-white/40 hover:border-[#E60012] p-4 -skew-x-2 transition-colors relative"
                >
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#E60012] text-white flex items-center justify-center text-xs font-black -skew-x-6">
                        P
                      </span>
                      <span className="text-xs font-black uppercase text-white tracking-wide">
                        {w.guest_name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#FFF000]">
                      {new Date(w.created_at).toLocaleDateString(language === 'JP' ? 'ja-JP' : language === 'CN' ? 'zh-CN' : language === 'EN' ? 'en-US' : 'id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#FFFFFF]/80 leading-relaxed pl-8">
                    &quot;{w.message}&quot;
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
