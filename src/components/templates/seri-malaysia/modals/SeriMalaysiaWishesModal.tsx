import React, { useState, useEffect } from 'react';
import { X, Send, Heart, CheckCircle2, MessageSquare, Users, Sparkles } from 'lucide-react';
import { WeddingInvitation, Wish } from '../../../../types/wedding';
import { weddingService } from '../../../../services/weddingService';

interface SeriMalaysiaWishesModalProps {
  wedding: WeddingInvitation;
  guestName?: string;
  onClose: () => void;
}

export const SeriMalaysiaWishesModal: React.FC<SeriMalaysiaWishesModalProps> = ({
  wedding,
  guestName: defaultGuestName = '',
  onClose,
}) => {
  const [name, setName] = useState(defaultGuestName);
  const [status, setStatus] = useState<'attending' | 'declined'>('attending');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>(wedding.wishes || []);

  useEffect(() => {
    if (wedding.id) {
      weddingService.getWishes(wedding.id).then((res) => {
        if (res && res.length > 0) {
          setWishes(res);
        }
      });
    }
  }, [wedding.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await weddingService.submitRSVP({
        invitation_id: wedding.id,
        guest_name: name.trim(),
        attendance_status: status,
        guest_count: guestCount,
        message: message.trim(),
      });

      const newWish: Wish = {
        id: 'wish-' + Date.now(),
        invitation_id: wedding.id,
        sender_name: name.trim(),
        message: message.trim(),
        attendance_status: status,
        created_at: new Date().toISOString(),
      };

      setWishes((prev) => [newWish, ...prev]);
      setIsSuccess(true);
      setMessage('');
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (err) {
      console.error('Error submitting RSVP:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FFFCF3] border-4 border-[#D7BB83] shadow-2xl p-6 sm:p-8 text-[#2A1713]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#4C030A] hover:bg-[#4C030A]/10 rounded-full transition-colors"
          aria-label="Tutup Modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#4C030A]/10 text-[#4C030A] text-xs font-semibold uppercase tracking-wider mb-2">
            <span>✉️ Kotak Doa & Konfirmasi Tamu</span>
          </div>
          <h2 
            className="text-3xl sm:text-4xl text-[#4C030A] font-serif font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Buku Tamu & Doa Restu
          </h2>
          <p className="text-xs sm:text-sm text-[#7A634F] mt-1">
            Untaian doa tulus dari Anda adalah bingkisan terindah bagi awal bahtera suci kami
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D7BB83] to-transparent mx-auto mt-3" />
        </div>

        {/* RSVP Form */}
        <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-white/90 border border-[#D7BB83]/40 shadow-sm space-y-4 mb-8">
          {isSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Terima kasih! Doa restu dan konfirmasi kehadiran Anda berhasil dikirimkan.</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#4C030A] mb-1">
              Nama Lengkap Anda
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Bpk. Ahmad Syahrul"
              className="w-full px-4 py-2.5 rounded-xl border border-[#D7BB83]/60 bg-[#FFFCF3] text-sm focus:outline-none focus:ring-2 focus:ring-[#8A1B26]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4C030A] mb-1">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('attending')}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-colors ${
                    status === 'attending'
                      ? 'bg-[#4C030A] text-[#FFFCF3] border-[#4C030A]'
                      : 'bg-[#FFFCF3] text-[#5A3F30] border-[#D7BB83]/60 hover:bg-[#D7BB83]/10'
                  }`}
                >
                  ✓ Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('declined')}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-colors ${
                    status === 'declined'
                      ? 'bg-[#8A1B26] text-[#FFFCF3] border-[#8A1B26]'
                      : 'bg-[#FFFCF3] text-[#5A3F30] border-[#D7BB83]/60 hover:bg-[#D7BB83]/10'
                  }`}
                >
                  ✕ Berhalangan
                </button>
              </div>
            </div>

            {status === 'attending' && (
              <div>
                <label className="block text-xs font-semibold text-[#4C030A] mb-1">
                  Jumlah Tamu
                </label>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#8A1B26]" />
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#D7BB83]/60 bg-[#FFFCF3] text-sm focus:outline-none focus:ring-2 focus:ring-[#8A1B26]"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4C030A] mb-1">
              Doa & Ucapan Selamat
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan selamat dan doa restu terbaik untuk kedua mempelai..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#D7BB83]/60 bg-[#FFFCF3] text-sm focus:outline-none focus:ring-2 focus:ring-[#8A1B26] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#4C030A] to-[#8A1B26] text-[#FFFCF3] font-semibold text-xs tracking-wider uppercase hover:opacity-95 transition-opacity shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4 text-[#D7BB83]" />
            <span>{isSubmitting ? 'Mengirim Doa...' : 'Kirim Ucapan & Doa Restu'}</span>
          </button>
        </form>

        {/* Wishes Feed List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#4C030A] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#8A1B26]" />
              <span>Untaian Doa Dari Sahabat ({wishes.length})</span>
            </h3>
            <Sparkles className="w-4 h-4 text-[#D7BB83]" />
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {wishes.length > 0 ? (
              wishes.map((w, idx) => (
                <div
                  key={w.id || idx}
                  className="p-3.5 rounded-xl bg-white border border-[#D7BB83]/30 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <strong className="text-xs font-bold text-[#4C030A]">
                      {w.sender_name || 'Tamu Undangan'}
                    </strong>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        w.attendance_status === 'attending'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {w.attendance_status === 'attending' ? 'Hadir' : 'Berhalangan'}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A3F30] leading-relaxed">
                    {w.message}
                  </p>
                  {w.created_at && (
                    <span className="text-[10px] text-[#A38C5E] mt-1 block">
                      {new Date(w.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-xs text-[#7A634F] py-6 italic">
                Belum ada ucapan doa. Jadilah yang pertama mengirimkan doa restu!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
