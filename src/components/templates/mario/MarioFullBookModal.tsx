import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, ExternalLink, Copy, Check, Heart } from 'lucide-react';
import { FullInvitationData } from '../../../types/wedding';
import { useToast } from '../../../context/ToastContext';

export interface MarioFullBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: FullInvitationData;
  guestName: string;
}

export const MarioFullBookModal: React.FC<MarioFullBookModalProps> = ({
  isOpen,
  onClose,
  data,
  guestName,
}) => {
  const { invitation, bride, groom, events, gifts, stories } = data;
  const { showToast } = useToast();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Nomor berhasil disalin!', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs select-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl max-h-[85vh] bg-white border-4 border-[#283D52] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#283D52]"
        >
          {/* Header */}
          <div className="bg-[#5C94FC] text-white px-4 py-3 flex items-center justify-between border-b-4 border-[#283D52]">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#E60012] text-[10px] font-mono font-bold rounded">
                BUKU RESMI
              </span>
              <h3 className="font-mono font-bold text-sm sm:text-base">
                Ringkasan Lengkap Undangan Pernikahan
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 bg-[#283D52] rounded-lg text-white hover:bg-[#1A2837] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
            {/* Greeting */}
            <div className="text-center pb-4 border-b border-stone-200">
              <h4 className="font-mono text-xl font-black text-[#E60012]">
                {bride.full_name} &amp; {groom.full_name}
              </h4>
              <p className="text-xs text-stone-600 mt-1 font-mono">
                {invitation.wedding_date || '18 & 26 April 2026'}
              </p>
              <p className="mt-2 text-stone-700 leading-relaxed italic max-w-md mx-auto">
                &ldquo;{invitation.greeting_text}&rdquo;
              </p>
            </div>

            {/* Couple Profiles */}
            <div>
              <h5 className="font-mono font-bold text-stone-900 border-l-4 border-[#5C94FC] pl-2 mb-3">
                KEDUA MEMPELAI
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#FFF0F5] border border-[#FF85A2] rounded-xl p-3">
                  <span className="text-[10px] font-mono font-bold text-[#E03164]">
                    MEMPELAI WANITA
                  </span>
                  <h6 className="font-bold text-sm text-[#283D52]">{bride.full_name}</h6>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Putri dari Bpk. {bride.father_name} &amp; Ibu {bride.mother_name}
                  </p>
                  <p className="text-[11px] text-stone-500 font-mono mt-1">
                    📍 Balonggarut, Krembung, Sidoarjo
                  </p>
                </div>

                <div className="bg-[#EBF4FF] border border-[#5C94FC] rounded-xl p-3">
                  <span className="text-[10px] font-mono font-bold text-[#1D4ED8]">
                    MEMPELAI PRIA
                  </span>
                  <h6 className="font-bold text-sm text-[#283D52]">{groom.full_name}</h6>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Putra dari Bpk. {groom.father_name} &amp; Ibu {groom.mother_name}
                  </p>
                  <p className="text-[11px] text-stone-500 font-mono mt-1">
                    📍 Kandangan, Kediri, Jawa Timur
                  </p>
                </div>
              </div>
            </div>

            {/* Events */}
            <div>
              <h5 className="font-mono font-bold text-stone-900 border-l-4 border-[#00A800] pl-2 mb-3">
                JADWAL RANGKAIAN ACARA
              </h5>
              <div className="space-y-2.5">
                {events.map((ev, idx) => (
                  <div
                    key={ev.id || idx}
                    className="bg-stone-50 border border-stone-300 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#FFD166] text-[#283D52] px-2 py-0.5 text-[10px] font-mono font-bold rounded">
                          {ev.title}
                        </span>
                        <span className="font-bold text-stone-800">{ev.date}</span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1">
                        ⏰ {ev.start_time} - {ev.end_time}
                      </p>
                      <p className="text-xs text-stone-600">
                        📍 {ev.venue} — {ev.address}
                      </p>
                    </div>

                    {ev.maps_url && (
                      <a
                        href={ev.maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00A800] text-white rounded-lg text-xs font-mono font-bold hover:bg-[#008A00] transition-colors shrink-0"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Gifts */}
            <div>
              <h5 className="font-mono font-bold text-stone-900 border-l-4 border-[#FFD166] pl-2 mb-3">
                AMPLOP DIGITAL &amp; TANDA KASIH
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {gifts.map((gift) => (
                  <div
                    key={gift.id}
                    className="border border-stone-200 rounded-xl p-3 bg-white flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#E60012]">
                        {gift.provider}
                      </span>
                      <p className="font-mono font-bold text-sm text-[#283D52] mt-0.5 select-all">
                        {gift.account_number}
                      </p>
                      <p className="text-xs text-stone-600">a.n. {gift.account_name}</p>
                    </div>

                    <button
                      onClick={() => handleCopy(gift.account_number, gift.id)}
                      className="mt-2 inline-flex items-center justify-center gap-1 px-2.5 py-1 bg-[#283D52] text-white rounded-md text-xs font-mono hover:bg-[#1A2837] transition-colors"
                    >
                      {copiedId === gift.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Nomor</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-stone-100 px-4 py-2.5 border-t border-stone-300 text-center">
            <button
              onClick={onClose}
              className="px-6 py-1.5 bg-[#283D52] text-white font-mono font-bold text-xs rounded-xl hover:bg-[#1A2837] transition-colors"
            >
              KEMBALI KE PERMAINAN
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
