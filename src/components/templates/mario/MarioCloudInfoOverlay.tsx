import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Heart,
  Send,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Gift,
  Award,
  Users,
  MessageSquareHeart,
} from 'lucide-react';
import { FullInvitationData, Guest } from '../../../types/wedding';
import { weddingService } from '../../../services/weddingService';
import { useToast } from '../../../context/ToastContext';

export interface MarioCloudInfoOverlayProps {
  currentZone: number; // 0 to 6
  playerGender: 'tuan' | 'nyonya';
  guestName: string;
  data: FullInvitationData;
  guest?: Guest | null;
  onJumpToZone: (zone: number) => void;
  onRefreshData?: () => void;
}

const ZONE_CONFIG = [
  { id: 0, world: 'WORLD 1-1', title: 'SAMBUTAN', subtitle: 'Prolog & Doa', icon: Sparkles },
  { id: 1, world: 'WORLD 1-2', title: 'MEMPELAI', subtitle: 'Sang Pasangan', icon: Users },
  { id: 2, world: 'WORLD 1-3', title: 'KISAH KASIH', subtitle: 'Love Journey', icon: Heart },
  { id: 3, world: 'WORLD 1-4', title: 'RANGKAIAN ACARA', subtitle: 'Save The Date', icon: Calendar },
  { id: 4, world: 'WORLD 1-5', title: 'TANDA KASIH', subtitle: 'Amplop Digital', icon: Gift },
  { id: 5, world: 'WORLD 1-6', title: 'BUKU TAMU & RSVP', subtitle: 'Doa Restu', icon: MessageSquareHeart },
  { id: 6, world: 'WORLD 1-7', title: 'PELAMINAN IMPIAN', subtitle: 'Forever & Always', icon: Award },
];

export const MarioCloudInfoOverlay: React.FC<MarioCloudInfoOverlayProps> = ({
  currentZone,
  playerGender,
  guestName,
  data,
  guest,
  onJumpToZone,
  onRefreshData,
}) => {
  const { invitation, bride, groom, events, stories, gifts, wishes } = data;
  const { showToast } = useToast();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'not_attending' | 'uncertain'>('attending');
  const [pax, setPax] = useState<number>(1);
  const [rsvpNote, setRsvpNote] = useState('');
  const [wishAuthor, setWishAuthor] = useState(guestName || '');
  const [wishMessage, setWishMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const honorific = playerGender === 'tuan' ? 'Tuan' : 'Nyonya';
  const partnerRole = playerGender === 'tuan' ? 'Mempelai Wanita' : 'Mempelai Pria';
  const partnerName = playerGender === 'tuan' ? bride.full_name : groom.full_name;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Nomor berhasil disalin ke clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishAuthor.trim()) {
      showToast('Mohon isi nama Anda', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      await weddingService.submitRSVP({
        invitation_id: invitation.id,
        guest_id: guest?.id || null,
        guest_name: wishAuthor.trim(),
        attendance: rsvpStatus,
        guest_count: pax,
        message: rsvpNote.trim() || undefined,
      });

      if (wishMessage.trim()) {
        await weddingService.submitWish({
          invitation_id: invitation.id,
          guest_id: guest?.id || null,
          guest_name: wishAuthor.trim(),
          message: wishMessage.trim(),
        });
      }

      showToast('Konfirmasi RSVP & doa restu berhasil dikirimkan!', 'success');
      setWishMessage('');
      setRsvpNote('');
      if (onRefreshData) onRefreshData();
    } catch {
      showToast('Terjadi kendala pengiriman, silakan coba kembali.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSec = (key: string) => data.sections?.find((s) => s.section_key === key);

  const dynamicZones = [
    { id: 0, key: 'hero', world: 'WORLD 1-1', title: getSec('hero')?.title || 'SAMBUTAN', subtitle: getSec('hero')?.subtitle || 'Prolog & Doa', icon: Sparkles },
    { id: 1, key: 'couple', world: 'WORLD 1-2', title: getSec('couple')?.title || 'MEMPELAI', subtitle: getSec('couple')?.subtitle || 'Sang Pasangan', icon: Users },
    { id: 2, key: 'story', world: 'WORLD 1-3', title: getSec('story')?.title || 'KISAH KASIH', subtitle: getSec('story')?.subtitle || 'Love Journey', icon: Heart },
    { id: 3, key: 'events', world: 'WORLD 1-4', title: getSec('events')?.title || 'RANGKAIAN ACARA', subtitle: getSec('events')?.subtitle || 'Save The Date', icon: Calendar },
    { id: 4, key: 'gifts', world: 'WORLD 1-5', title: getSec('gifts')?.title || 'TANDA KASIH', subtitle: getSec('gifts')?.subtitle || 'Amplop Digital', icon: Gift },
    { id: 5, key: 'rsvp', world: 'WORLD 1-6', title: getSec('rsvp')?.title || 'BUKU TAMU & RSVP', subtitle: getSec('rsvp')?.subtitle || 'Doa Restu', icon: MessageSquareHeart },
    { id: 6, key: 'closing', world: 'WORLD 1-7', title: getSec('closing')?.title || 'PELAMINAN IMPIAN', subtitle: getSec('closing')?.subtitle || 'Forever & Always', icon: Award },
  ];

  const currentCfg = dynamicZones[currentZone] || dynamicZones[0];

  return (
    <div className="absolute top-2 sm:top-4 inset-x-2 sm:inset-x-6 z-30 pointer-events-none flex flex-col items-center">
      {/* 8-Bit Sky Cloud Card Container */}
      <div className="w-full max-w-2xl pointer-events-auto transition-all duration-300">
        <motion.div
          layout
          className="relative bg-white/95 border-4 border-[#283D52] rounded-3xl shadow-[0_12px_36px_rgba(0,0,0,0.35)] overflow-hidden backdrop-blur-md"
        >
          {/* Top Mario Style World Header Bar */}
          <div className="bg-[#5C94FC] border-b-4 border-[#283D52] px-3 sm:px-5 py-2 flex items-center justify-between text-white select-none">
            <div className="flex items-center gap-2">
              <span className="bg-[#E60012] border-2 border-white px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-mono font-bold tracking-wider shadow-xs">
                {currentCfg.world}
              </span>
              <span className="font-mono font-bold text-xs sm:text-sm tracking-wide text-[#FFE082] drop-shadow-sm">
                {currentCfg.title}
              </span>
            </div>

            {/* Stage Quick Jump / Minimap Dots */}
            <div className="flex items-center gap-1">
              <div className="hidden sm:flex items-center gap-1 mr-2">
                {dynamicZones.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => onJumpToZone(z.id)}
                    title={`${z.world}: ${z.title}`}
                    className={`w-3 h-3 rounded-full border-2 border-[#283D52] transition-transform ${
                      currentZone === z.id
                        ? 'bg-[#FFD166] scale-125 ring-2 ring-white'
                        : 'bg-white/50 hover:bg-white'
                    }`}
                  />
                ))}
              </div>

              {/* Collapse/Expand Toggle */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="bg-[#283D52] text-white px-2 py-0.5 rounded text-[11px] font-mono hover:bg-[#1A2837] transition-colors"
              >
                {isCollapsed ? '▲ BUKA AWAN' : '▼ MINIMALIS'}
              </button>
            </div>
          </div>

          {/* Cloud Info Body */}
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                key={currentZone}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
                className="p-4 sm:p-5 max-h-[46vh] sm:max-h-[50vh] overflow-y-auto text-[#283D52]"
              >
                {/* ZONE 0: SAMBUTAN & KEHORMATAN */}
                {currentZone === 0 && (
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4FF] border-2 border-[#5C94FC] text-[#283D52] text-xs font-mono font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-[#5C94FC]" />
                      <span>SUGENG RAWUH // WELCOME TO STAGE 1</span>
                    </div>

                    <h3 className="font-mono text-base sm:text-xl font-black text-[#E60012]">
                      Kepada Yang Terhormat {honorific} {guestName || 'Tamu Istimewa'}
                    </h3>

                    <p className="text-xs sm:text-sm leading-relaxed text-stone-700 max-w-lg mx-auto">
                      {invitation.greeting_text ||
                        'Dengan penuh rasa syukur ke hadirat Tuhan Yang Maha Esa, kami mengundang Anda untuk merayakan momen bersejarah pernikahan kami.'}
                    </p>

                    <div className="bg-[#FFF9EB] border-2 border-[#FFD166] rounded-xl p-3 text-xs text-stone-800 text-left flex items-start gap-2.5">
                      <div className="text-xl">🎮</div>
                      <div>
                        <strong className="block text-[#D35400] font-mono">PETUNJUK BERJALAN:</strong>
                        <span>
                          Gunakan tombol <strong>Kiri &amp; Kanan</strong> (atau D-Pad layar) untuk berjalan menyusuri undangan, dan tombol <strong>Spasi / A</strong> untuk melompat memukul kotak hadiah!
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ZONE 1: MEMPELAI (THE COUPLE) */}
                {currentZone === 1 && (
                  <div className="space-y-3">
                    <div className="text-center mb-2">
                      <span className="text-[11px] font-mono font-bold text-[#E60012] uppercase tracking-wider">
                        PASANGAN PENGANTIN
                      </span>
                      <h3 className="text-lg sm:text-xl font-mono font-black text-[#283D52]">
                        {bride.full_name} &amp; {groom.full_name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Bride Card */}
                      <div className="bg-[#FFF0F5] border-2 border-[#FF85A2] rounded-2xl p-3 text-center">
                        <span className="inline-block px-2 py-0.5 bg-[#FF85A2] text-white text-[10px] font-mono font-bold rounded-md mb-1">
                          MEMPELAI WANITA
                        </span>
                        <h4 className="font-bold text-sm text-[#E03164]">{bride.full_name}</h4>
                        <p className="text-[11px] text-stone-600 mt-0.5">
                          Putri dari {bride.father_name} &amp; {bride.mother_name}
                        </p>
                        <p className="text-[10px] text-stone-500 font-mono mt-1">
                          📍 Balonggarut, Krembung, Sidoarjo
                        </p>
                      </div>

                      {/* Groom Card */}
                      <div className="bg-[#EBF4FF] border-2 border-[#5C94FC] rounded-2xl p-3 text-center">
                        <span className="inline-block px-2 py-0.5 bg-[#5C94FC] text-white text-[10px] font-mono font-bold rounded-md mb-1">
                          MEMPELAI PRIA
                        </span>
                        <h4 className="font-bold text-sm text-[#1D4ED8]">{groom.full_name}</h4>
                        <p className="text-[11px] text-stone-600 mt-0.5">
                          Putra dari {groom.father_name} &amp; {groom.mother_name}
                        </p>
                        <p className="text-[10px] text-stone-500 font-mono mt-1">
                          📍 Kandangan, Kediri, Jawa Timur
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ZONE 2: OUR LOVE STORY */}
                {currentZone === 2 && (
                  <div className="space-y-3">
                    <div className="text-center mb-1">
                      <span className="text-[11px] font-mono font-bold text-[#E60012] uppercase tracking-wider">
                        {getSec('story')?.subtitle || 'TIMELINE PERJALANAN CINTA'}
                      </span>
                      <h3 className="text-base sm:text-lg font-mono font-black text-[#283D52]">
                        {getSec('story')?.title || 'Kisah Cinta Kami'}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {stories && stories.length > 0 ? (
                        stories.map((item, idx) => (
                          <div
                            key={item.id || idx}
                            className="bg-[#F8F9FA] border-2 border-stone-300 rounded-xl p-2.5 flex items-start gap-2.5"
                          >
                            <span className="bg-[#E60012] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shrink-0">
                              {(item as any).year || item.date || `CH ${idx + 1}`}
                            </span>
                            <div>
                              <h5 className="font-bold text-xs text-[#283D52]">{item.title}</h5>
                              <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                                {item.description || (item as any).story}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-center text-stone-500 py-2">
                          Dari awal pertemuan hingga ikrar suci pelaminan, cinta mempersatukan kami.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* ZONE 3: RANGKAIAN ACARA (EVENTS & MAPS) */}
                {currentZone === 3 && (
                  <div className="space-y-3">
                    <div className="text-center mb-1">
                      <span className="text-[11px] font-mono font-bold text-[#E60012] uppercase tracking-wider">
                        WAKTU &amp; LOKASI PERNIKAHAN
                      </span>
                      <h3 className="text-base sm:text-lg font-mono font-black text-[#283D52]">
                        Rangkaian Acara Pernikahan
                      </h3>
                    </div>

                    <div className="space-y-2.5">
                      {events.map((ev, idx) => (
                        <div
                          key={ev.id || idx}
                          className="bg-white border-2 border-[#283D52] rounded-xl p-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="bg-[#FFD166] text-[#283D52] border border-[#283D52] px-2 py-0.2 text-[10px] font-mono font-bold rounded">
                                {ev.title}
                              </span>
                              <span className="text-xs font-bold text-stone-800">
                                {ev.date || 'April 2026'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-stone-600 mt-1">
                              <Clock className="w-3 h-3 text-[#E60012]" />
                              <span>
                                {ev.start_time} - {ev.end_time}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-stone-600 mt-0.5">
                              <MapPin className="w-3 h-3 text-[#5C94FC]" />
                              <span className="truncate max-w-[280px]">{ev.venue} — {ev.address}</span>
                            </div>
                          </div>

                          {ev.maps_url && (
                            <a
                              href={ev.maps_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00A800] text-white rounded-lg text-xs font-mono font-bold border-2 border-[#005800] hover:bg-[#008000] transition-colors shrink-0 shadow-xs"
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              <span>Petunjuk Arah</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ZONE 4: TANDA KASIH / WEDDING GIFTS */}
                {currentZone === 4 && (
                  <div className="space-y-3">
                    <div className="text-center mb-1">
                      <span className="text-[11px] font-mono font-bold text-[#E60012] uppercase tracking-wider">
                        AMPLOP DIGITAL &amp; KADO
                      </span>
                      <h3 className="text-base sm:text-lg font-mono font-black text-[#283D52]">
                        Tanda Kasih Pernikahan
                      </h3>
                      <p className="text-[11px] text-stone-600 max-w-md mx-auto">
                        Doa restu Anda adalah anugerah terindah bagi kami. Bagi yang berkenan memberikan tanda kasih:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {gifts.map((gift) => (
                        <div
                          key={gift.id}
                          className="bg-[#FFFDF7] border-2 border-[#283D52] rounded-xl p-3 flex flex-col justify-between shadow-xs"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-bold text-xs text-[#E60012]">
                                {gift.provider}
                              </span>
                              <span className="text-[10px] text-stone-500 font-mono">
                                {gift.type === 'address' ? 'Kado Fisik' : 'Transfer Bank'}
                              </span>
                            </div>

                            <p className="font-mono text-sm font-bold text-[#283D52] mt-1 break-all select-all">
                              {gift.account_number}
                            </p>
                            <p className="text-[11px] text-stone-600 font-medium">
                              a.n. {gift.account_name}
                            </p>
                          </div>

                          <button
                            onClick={() => handleCopy(gift.account_number, gift.id)}
                            className="mt-2.5 inline-flex items-center justify-center gap-1 px-2.5 py-1 bg-[#283D52] text-white rounded-md text-[11px] font-mono hover:bg-[#1A2837] transition-colors"
                          >
                            {copiedId === gift.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Berhasil Disalin!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Salin Nomor</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ZONE 5: BUKU TAMU & RSVP */}
                {currentZone === 5 && (
                  <div className="space-y-3">
                    <div className="text-center mb-1">
                      <span className="text-[11px] font-mono font-bold text-[#E60012] uppercase tracking-wider">
                        KONFIRMASI KEHADIRAN &amp; DOA
                      </span>
                      <h3 className="text-base sm:text-lg font-mono font-black text-[#283D52]">
                        Buku Tamu Doa Restu
                      </h3>
                    </div>

                    <form onSubmit={handleRsvpSubmit} className="space-y-2.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-stone-700 mb-0.5">
                            Nama Tamu
                          </label>
                          <input
                            type="text"
                            value={wishAuthor}
                            onChange={(e) => setWishAuthor(e.target.value)}
                            placeholder="Tuliskan nama Anda..."
                            required
                            className="w-full px-3 py-1.5 text-xs border-2 border-[#283D52] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#5C94FC]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-stone-700 mb-0.5">
                            Konfirmasi Kehadiran
                          </label>
                          <select
                            value={rsvpStatus}
                            onChange={(e) => setRsvpStatus(e.target.value as any)}
                            className="w-full px-3 py-1.5 text-xs border-2 border-[#283D52] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#5C94FC] bg-white"
                          >
                            <option value="attending">✓ Ya, Saya Akan Hadir</option>
                            <option value="uncertain">? Masih Ragu / Belum Pasti</option>
                            <option value="not_attending">✕ Maaf, Belum Bisa Hadir</option>
                          </select>
                        </div>
                      </div>

                      {rsvpStatus === 'attending' && (
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-stone-700 mb-0.5">
                            Jumlah Hadir (Pax)
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="8"
                            value={pax}
                            onChange={(e) => setPax(parseInt(e.target.value) || 1)}
                            className="w-24 px-3 py-1 text-xs border-2 border-[#283D52] rounded-lg"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-stone-700 mb-0.5">
                          Ucapan &amp; Doa Restu
                        </label>
                        <textarea
                          rows={2}
                          value={wishMessage}
                          onChange={(e) => setWishMessage(e.target.value)}
                          placeholder="Tuliskan untaian doa dan harapan terbaik untuk kedua mempelai..."
                          className="w-full px-3 py-1.5 text-xs border-2 border-[#283D52] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#5C94FC]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 bg-[#E60012] text-white border-2 border-[#990000] rounded-xl text-xs font-mono font-bold hover:bg-[#CC0010] transition-colors flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmitting ? 'Mengirim...' : 'KIRIM RSVP & DOA RESTU'}</span>
                      </button>
                    </form>

                    {/* Wishes Stream */}
                    {wishes && wishes.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-stone-200">
                        <span className="text-[10px] font-mono font-bold text-stone-500 uppercase">
                          Doa Dari Sahabat ({wishes.length})
                        </span>
                        <div className="mt-1.5 max-h-24 overflow-y-auto space-y-1.5 pr-1">
                          {wishes.slice(0, 5).map((w) => (
                            <div
                              key={w.id}
                              className="bg-stone-50 border border-stone-200 rounded-lg p-2 text-left"
                            >
                              <div className="flex items-center justify-between text-[10px] font-bold text-[#283D52]">
                                <span>{w.guest_name}</span>
                                <Heart className="w-2.5 h-2.5 text-[#E60012] fill-[#E60012]" />
                              </div>
                              <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                                {w.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ZONE 6: FINISH / REUNION WITH PARTNER */}
                {currentZone === 6 && (
                  <div className="text-center space-y-2.5 py-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE4EC] border-2 border-[#FF85A2] text-[#E03164] text-xs font-mono font-bold">
                      <Heart className="w-3.5 h-3.5 fill-[#E03164]" />
                      <span>STAGE CLEAR! YOU REACHED THE WEDDING ALTAR!</span>
                      <Heart className="w-3.5 h-3.5 fill-[#E03164]" />
                    </div>

                    <h3 className="text-lg sm:text-2xl font-mono font-black text-[#E60012]">
                      Pertemuan Indah Dengan {partnerRole}
                    </h3>
                    <p className="text-sm font-bold text-[#283D52]">
                      {partnerName} menanti Anda di gerbang pelaminan!
                    </p>

                    <p className="text-xs text-stone-700 max-w-md mx-auto leading-relaxed">
                      &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
                    </p>

                    <div className="pt-2 flex items-center justify-center gap-2">
                      <button
                        onClick={() => onJumpToZone(0)}
                        className="px-3 py-1 bg-stone-200 text-stone-800 text-xs font-mono rounded-lg hover:bg-stone-300 transition-colors"
                      >
                        ↺ Ulangi Dari Awal
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Stage Navigation Buttons */}
          <div className="bg-stone-100 border-t-2 border-stone-300 px-3 py-1.5 flex items-center justify-between text-xs font-mono select-none">
            <button
              onClick={() => onJumpToZone(Math.max(0, currentZone - 1))}
              disabled={currentZone === 0}
              className="inline-flex items-center gap-1 text-[#283D52] hover:text-[#E60012] disabled:opacity-30 disabled:hover:text-[#283D52] font-bold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>SEBELUMNYA</span>
            </button>

            <span className="text-[11px] text-stone-500 font-mono">
              STAGE {currentZone + 1} / {ZONE_CONFIG.length}
            </span>

            <button
              onClick={() => onJumpToZone(Math.min(ZONE_CONFIG.length - 1, currentZone + 1))}
              disabled={currentZone === ZONE_CONFIG.length - 1}
              className="inline-flex items-center gap-1 text-[#283D52] hover:text-[#E60012] disabled:opacity-30 disabled:hover:text-[#283D52] font-bold"
            >
              <span>SELANJUTNYA</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
