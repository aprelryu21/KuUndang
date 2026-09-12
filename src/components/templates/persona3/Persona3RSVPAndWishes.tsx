import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Check, Copy, Heart, Shield, Gift, MessageSquare, CreditCard, Sparkles } from 'lucide-react';
import { GiftAccount, Wish } from '../../../types/wedding';
import { weddingService } from '../../../services/weddingService';

interface Persona3RSVPAndWishesProps {
  invitationId: string;
  defaultGuestName?: string;
  guestId?: string | null;
  gifts: GiftAccount[];
  wishes: Wish[];
  onRSVPSubmitted?: () => void;
  onWishAdded?: () => void;
}

export const Persona3RSVPAndWishes: React.FC<Persona3RSVPAndWishesProps> = ({
  invitationId,
  defaultGuestName = '',
  guestId = null,
  gifts,
  wishes,
  onRSVPSubmitted,
  onWishAdded,
}) => {
  // RSVP Form state
  const [name, setName] = useState(defaultGuestName);
  const [attendance, setAttendance] = useState<'attending' | 'not_attending'>('attending');
  const [guestCount, setGuestCount] = useState(1);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [submittingRSVP, setSubmittingRSVP] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Wishes Form state
  const [wishName, setWishName] = useState(defaultGuestName);
  const [wishMessage, setWishMessage] = useState('');
  const [submittingWish, setSubmittingWish] = useState(false);
  const [wishSuccess, setWishSuccess] = useState(false);

  // Copied account number feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmittingRSVP(true);
    try {
      await weddingService.submitRSVP({
        invitation_id: invitationId,
        guest_id: guestId,
        guest_name: name.trim(),
        attendance,
        guest_count: attendance === 'attending' ? guestCount : 0,
        message: rsvpMessage.trim(),
      });

      // Note: submitRSVP automatically creates a wish if message is provided
      setRsvpSuccess(true);
      if (onRSVPSubmitted) onRSVPSubmitted();
    } catch (err) {
      console.error('RSVP submit error:', err);
    } finally {
      setSubmittingRSVP(false);
    }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishMessage.trim()) return;

    setSubmittingWish(true);
    try {
      await weddingService.submitWish({
        invitation_id: invitationId,
        guest_name: wishName.trim(),
        message: wishMessage.trim(),
      });
      setWishMessage('');
      setWishSuccess(true);
      setTimeout(() => setWishSuccess(false), 3000);
      if (onWishAdded) onWishAdded();
    } catch (err) {
      console.error('Wish submit error:', err);
    } finally {
      setSubmittingWish(false);
    }
  };

  const approvedWishes = wishes.filter((w) => w.status !== 'hidden');

  return (
    <div className="bg-[#050B18] text-[#F0F8FF] border-t-2 border-[#00D2FF]/30">
      {/* 1. VELVET ROOM TITHE & WEDDING GIFTS */}
      <section id="amplop" className="py-20 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#0B1A3D] border border-[#00D2FF] text-xs font-mono font-bold tracking-[0.25em] text-[#00D2FF] mb-3 transform -skew-x-12 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
            <Gift className="w-3.5 h-3.5 text-[#FFE600]" />
            <span>VELVET ROOM // WEDDING GIFT & TRIBUTE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Tanda Kasih & Amplop Digital
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A0C4E2] font-mono">
            // TRANSFER REKENING & ALAMAT KIRIM KADO PERNIKAHAN
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gifts.map((gift) => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-[#081226] border-2 border-[#00D2FF]/60 hover:border-[#FFE600] p-6 shadow-[0_0_20px_rgba(0,210,255,0.15)] flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#00D2FF]/30 pb-3 mb-4">
                  <span className="px-2 py-0.5 rounded-xs bg-[#00D2FF] text-[#050B18] text-[10px] font-mono font-black uppercase tracking-wider">
                    {gift.provider}
                  </span>
                  <CreditCard className="w-4 h-4 text-[#FFE600]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#A0C4E2] block uppercase tracking-wider">
                    ATAS NAMA
                  </span>
                  <p className="text-base font-bold text-white font-sans">
                    {gift.account_name}
                  </p>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-[#050B18] border border-[#00D2FF]/40">
                  <span className="text-[9px] font-mono text-[#00D2FF] block uppercase tracking-wider">
                    {gift.type === 'address' ? 'ALAMAT PENERIMA' : 'NOMOR REKENING'}
                  </span>
                  <p className="font-mono text-sm sm:text-base font-bold text-[#FFE600] break-all select-all">
                    {gift.account_number}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(gift.id, gift.account_number)}
                className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1E42] hover:bg-[#FFE600] hover:text-[#050B18] text-[#00D2FF] border border-[#00D2FF]/40 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                {copiedId === gift.id ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span>BERHASIL DISALIN!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>SALIN {gift.type === 'address' ? 'ALAMAT' : 'NO. REKENING'}</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. S.E.E.S. TACTICAL RSVP & BATTLE CONFIRMATION */}
      <section id="rsvp" className="py-20 sm:py-24 bg-[#070E22] border-t-2 border-[#00D2FF]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#0B1A3D] border border-[#00D2FF] text-xs font-mono font-bold tracking-[0.25em] text-[#00D2FF] mb-3 transform -skew-x-12 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
              <Shield className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>BATTLE CONFIRMATION // RSVP PROTOCOL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
              Konfirmasi Kehadiran
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#A0C4E2] font-mono">
              // S.E.E.S. SQUAD DEPLOYMENT STATUS
            </p>
          </div>

          <div className="rounded-3xl bg-[#081226] border-2 border-[#00D2FF] p-6 sm:p-10 shadow-[0_0_30px_rgba(0,210,255,0.25)]">
            {rsvpSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#00D2FF]/20 border-2 border-[#FFE600] flex items-center justify-center mx-auto text-[#FFE600] animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black font-sans text-white uppercase">
                  Konfirmasi Berhasil Diterima!
                </h3>
                <p className="text-sm font-mono text-[#A0C4E2] max-w-md mx-auto">
                  Terima kasih atas konfirmasi kehadiran Anda. Kehadiran dan doa restu Anda adalah kehormatan besar bagi April & Siti.
                </p>
                <button
                  type="button"
                  onClick={() => setRsvpSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#00D2FF] text-[#050B18] font-mono text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  Ubah Konfirmasi
                </button>
              </div>
            ) : (
              <form onSubmit={handleRSVPSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#00D2FF] font-bold mb-2">
                    NAMA TAMU UNDANGAN
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama lengkap Anda..."
                    className="w-full px-4 py-3 rounded-xl bg-[#050B18] border-2 border-[#00D2FF]/60 text-white font-sans text-sm focus:outline-hidden focus:border-[#FFE600] transition-colors"
                  />
                </div>

                {/* Persona 3 Battle Command Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#00D2FF] font-bold mb-2">
                    STATUS KEHADIRAN // BATTLE ACTION
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setAttendance('attending')}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                        attendance === 'attending'
                          ? 'bg-[#00D2FF] text-[#050B18] border-[#00D2FF] shadow-[0_0_20px_rgba(0,210,255,0.6)]'
                          : 'bg-[#050B18] text-[#A0C4E2] border-[#00D2FF]/30 hover:border-[#00D2FF]'
                      }`}
                    >
                      <span>&gt; ATTACK: SAYA AKAN HADIR</span>
                      <Check className={`w-4 h-4 ${attendance === 'attending' ? 'opacity-100' : 'opacity-0'}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttendance('not_attending')}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                        attendance === 'not_attending'
                          ? 'bg-[#FFE600] text-[#050B18] border-[#FFE600] shadow-[0_0_20px_rgba(255,230,0,0.6)]'
                          : 'bg-[#050B18] text-[#A0C4E2] border-[#00D2FF]/30 hover:border-[#FFE600]'
                      }`}
                    >
                      <span>&gt; DEFEND: MAAF BERHALANGAN</span>
                      <Check className={`w-4 h-4 ${attendance === 'not_attending' ? 'opacity-100' : 'opacity-0'}`} />
                    </button>
                  </div>
                </div>

                {attendance === 'attending' && (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-[#00D2FF] font-bold mb-2">
                      JUMLAH PERSONEL TAMU (TERMASUK ANDA)
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-[#050B18] border-2 border-[#00D2FF]/60 text-white font-sans text-sm focus:outline-hidden focus:border-[#FFE600]"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} Orang
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#00D2FF] font-bold mb-2">
                    PESAN / DOA RESTU (OPSIONAL)
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    placeholder="Tuliskan ucapan dan doa terbaik Anda untuk kedua mempelai..."
                    className="w-full px-4 py-3 rounded-xl bg-[#050B18] border-2 border-[#00D2FF]/60 text-white font-sans text-sm focus:outline-hidden focus:border-[#FFE600] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingRSVP}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-[#00D2FF] via-[#38BDF8] to-[#00D2FF] hover:from-[#FFE600] hover:via-[#FACC15] hover:to-[#FFE600] text-[#050B18] font-mono text-sm font-black uppercase tracking-widest shadow-[0_0_25px_rgba(0,210,255,0.4)] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submittingRSVP ? 'MENGIRIMKAN DATA...' : 'KIRIM KONFIRMASI RSVP'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. S.E.E.S. COGNITIVE MESSENGER & RESTU LOG (WISHES) */}
      <section id="doa" className="py-20 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#0B1A3D] border border-[#00D2FF] text-xs font-mono font-bold tracking-[0.25em] text-[#00D2FF] mb-3 transform -skew-x-12 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
            <MessageSquare className="w-3.5 h-3.5 text-[#FFE600]" />
            <span>COGNITIVE LOG // WISHES & BLESSINGS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Ucapan & Doa Restu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A0C4E2] font-mono">
            // TRANSMISSION FEED DARI KELUARGA & SAHABAT
          </p>
        </div>

        {/* Quick Wish Input Form */}
        <form onSubmit={handleWishSubmit} className="mb-12 p-6 rounded-2xl bg-[#081226] border-2 border-[#00D2FF]/60 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              required
              value={wishName}
              onChange={(e) => setWishName(e.target.value)}
              placeholder="Nama pengirim..."
              className="sm:col-span-1 px-4 py-2.5 rounded-xl bg-[#050B18] border border-[#00D2FF]/40 text-white text-xs font-sans focus:outline-hidden focus:border-[#FFE600]"
            />
            <input
              type="text"
              required
              value={wishMessage}
              onChange={(e) => setWishMessage(e.target.value)}
              placeholder="Tuliskan ucapan selamat & doa restu..."
              className="sm:col-span-2 px-4 py-2.5 rounded-xl bg-[#050B18] border border-[#00D2FF]/40 text-white text-xs font-sans focus:outline-hidden focus:border-[#FFE600]"
            />
          </div>

          <div className="flex justify-between items-center">
            {wishSuccess ? (
              <span className="text-xs font-mono text-green-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Doa restu Anda berhasil diunggah!
              </span>
            ) : (
              <span className="text-[10px] font-mono text-[#A0C4E2]">
                PESAN AKAN TERTAMPIL DI FEED KELUARGA & SAHABAT
              </span>
            )}
            <button
              type="submit"
              disabled={submittingWish}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#00D2FF] hover:bg-[#FFE600] text-[#050B18] font-mono text-xs font-black uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submittingWish ? 'Mengirim...' : 'KIRIM DOA RESTU'}</span>
            </button>
          </div>
        </form>

        {/* Wishes List Feed */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {approvedWishes.length === 0 ? (
            <div className="text-center py-10 text-xs font-mono text-[#A0C4E2]">
              BELUM ADA TRANSMISI DOA. JADILAH YANG PERTAMA MENGIRIMKAN RESTU!
            </div>
          ) : (
            approvedWishes.map((w, idx) => (
              <motion.div
                key={w.id || idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-xl bg-[#081226] border border-[#00D2FF]/40 hover:border-[#FFE600] transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono border-b border-[#00D2FF]/20 pb-2 mb-2">
                  <span className="font-bold text-[#FFE600] uppercase font-sans">
                    {w.guest_name}
                  </span>
                  <span className="text-[10px] text-[#A0C4E2]">
                    {new Date(w.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#D0E2F5] font-sans">
                  "{w.message}"
                </p>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
