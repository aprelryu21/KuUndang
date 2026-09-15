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
  Gift,
  Award,
  Users,
  MessageSquareHeart,
  Image as ImageIcon,
  Eye,
  Instagram,
} from 'lucide-react';
import { FullInvitationData, Guest } from '../../../types/wedding';
import { weddingService } from '../../../services/weddingService';
import { useToast } from '../../../context/ToastContext';
import { marioAudio } from './marioAudio';

export interface MarioCloudInfoOverlayProps {
  currentZone: number; // 0 to 7
  playerGender: 'tuan' | 'nyonya';
  guestName: string;
  data: FullInvitationData;
  guest?: Guest | null;
  onJumpToZone: (zone: number) => void;
  onRefreshData?: () => void;
}

export const MarioCloudInfoOverlay: React.FC<MarioCloudInfoOverlayProps> = ({
  currentZone,
  playerGender,
  guestName,
  data,
  guest,
  onJumpToZone,
  onRefreshData,
}) => {
  const { invitation, bride, groom, events, stories, gifts, wishes, gallery } = data;
  const { showToast } = useToast();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'not_attending' | 'uncertain'>('attending');
  const [pax, setPax] = useState<number>(1);
  const [rsvpNote, setRsvpNote] = useState('');
  const [wishAuthor, setWishAuthor] = useState(guestName || '');
  const [wishMessage, setWishMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<{ url: string; title: string } | null>(null);

  const honorific = playerGender === 'tuan' ? 'Tuan' : 'Nyonya';
  const partnerRole = playerGender === 'tuan' ? 'Mempelai Wanita' : 'Mempelai Pria';
  const partnerName = playerGender === 'tuan' ? bride.full_name : groom.full_name;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    marioAudio.playCoin();
    showToast('Nomor berhasil disalin ke clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleOpenPhoto = (url: string, title: string) => {
    marioAudio.playPowerUp();
    setPreviewPhoto({ url, title });
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

      marioAudio.playCoin();
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

  // 8 Zones (World 1-1 s/d World 1-8)
  const dynamicZones = [
    { id: 0, key: 'hero', world: 'WORLD 1-1', title: getSec('hero')?.title || 'SAMBUTAN', subtitle: getSec('hero')?.subtitle || 'Prolog & Doa', icon: Sparkles },
    { id: 1, key: 'couple', world: 'WORLD 1-2', title: getSec('couple')?.title || 'MEMPELAI', subtitle: getSec('couple')?.subtitle || 'Sang Pasangan', icon: Users },
    { id: 2, key: 'story', world: 'WORLD 1-3', title: getSec('story')?.title || 'KISAH KASIH', subtitle: getSec('story')?.subtitle || 'Love Journey', icon: Heart },
    { id: 3, key: 'events', world: 'WORLD 1-4', title: getSec('events')?.title || 'RANGKAIAN ACARA', subtitle: getSec('events')?.subtitle || 'Save The Date', icon: Calendar },
    { id: 4, key: 'gallery', world: 'WORLD 1-5', title: getSec('gallery')?.title || 'GALERI FOTO', subtitle: getSec('gallery')?.subtitle || 'Kenangan Terindah', icon: ImageIcon },
    { id: 5, key: 'gifts', world: 'WORLD 1-6', title: getSec('gifts')?.title || 'TANDA KASIH', subtitle: getSec('gifts')?.subtitle || 'Amplop Digital', icon: Gift },
    { id: 6, key: 'rsvp', world: 'WORLD 1-7', title: getSec('rsvp')?.title || 'BUKU TAMU & RSVP', subtitle: getSec('rsvp')?.subtitle || 'Doa Restu', icon: MessageSquareHeart },
    { id: 7, key: 'closing', world: 'WORLD 1-8', title: getSec('closing')?.title || 'PELAMINAN IMPIAN', subtitle: getSec('closing')?.subtitle || 'Forever & Always', icon: Award },
  ];

  const currentCfg = dynamicZones[currentZone] || dynamicZones[0];

  // Gallery fallback photos if gallery is empty
  const displayGallery = gallery && gallery.length > 0
    ? gallery
    : [
        { id: 'g1', image_url: bride.photo_url || invitation.cover_image, caption: bride.nickname },
        { id: 'g2', image_url: groom.photo_url || invitation.hero_image, caption: groom.nickname },
        { id: 'g3', image_url: invitation.cover_image, caption: 'Momen Bahagia' },
        { id: 'g4', image_url: invitation.hero_image, caption: 'Janji Suci' },
      ].filter((item) => Boolean(item.image_url));

  return (
    <div className="absolute top-2 sm:top-4 inset-x-2 sm:inset-x-6 z-30 pointer-events-none flex flex-col items-center">
      {/* Authentic NES/SNES Mario Message Box Container */}
      <div className="w-full max-w-2xl pointer-events-auto transition-all duration-300">
        <motion.div
          layout
          className="relative bg-[#0F172A]/95 text-white border-4 border-white rounded-2xl shadow-[0_0_0_4px_#283D52,0_16px_40px_rgba(0,0,0,0.7)] overflow-hidden backdrop-blur-md"
        >
          {/* Pixel Corner Studs */}
          <div className="absolute top-1 left-1 w-2 h-2 bg-[#FFD166] border border-black pointer-events-none z-10" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-[#FFD166] border border-black pointer-events-none z-10" />
          <div className="absolute bottom-1 left-1 w-2 h-2 bg-[#FFD166] border border-black pointer-events-none z-10" />
          <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#FFD166] border border-black pointer-events-none z-10" />

          {/* Top Mario Style World Header Bar */}
          <div className="bg-[#1E293B] border-b-4 border-white/40 px-3 sm:px-5 py-2.5 flex items-center justify-between text-white select-none">
            <div className="flex items-center gap-2">
              <span className="bg-[#E60012] border-2 border-white px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-mono font-black tracking-wider shadow-xs">
                {currentCfg.world}
              </span>
              <span className="font-mono font-bold text-xs sm:text-sm tracking-wide text-[#FFD166] drop-shadow-sm">
                {currentCfg.title}
              </span>
            </div>

            {/* Quick Stage Minimap Dots */}
            <div className="flex items-center gap-1.5">
              <div className="hidden sm:flex items-center gap-1 mr-2">
                {dynamicZones.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => onJumpToZone(z.id)}
                    title={`${z.world}: ${z.title}`}
                    className={`w-2.5 h-2.5 rounded-full border border-white transition-transform cursor-pointer ${
                      currentZone === z.id
                        ? 'bg-[#FFD166] scale-125 ring-2 ring-[#E60012]'
                        : 'bg-white/30 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>

              {/* Collapse/Expand Toggle */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="bg-[#283D52] hover:bg-[#38526F] text-white px-2 py-0.5 rounded text-[11px] font-mono border border-white/40 cursor-pointer"
              >
                {isCollapsed ? '▲ BUKA KOTAK' : '▼ SEMBUNYIKAN'}
              </button>
            </div>
          </div>

          {/* Dialogue Message Body */}
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                key={currentZone}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-5 max-h-[46vh] sm:max-h-[50vh] overflow-y-auto text-stone-100"
              >
                {/* ZONE 0: SAMBUTAN (WORLD 1-1) */}
                {currentZone === 0 && (
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E293B] border-2 border-[#5C94FC] text-[#FFE082] text-xs font-mono font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-[#5C94FC]" />
                      <span>SUGENG RAWUH // WELCOME TO STAGE 1</span>
                    </div>

                    <h3 className="font-mono text-base sm:text-xl font-black text-[#FFD166]">
                      Kepada Yang Terhormat {honorific} {guestName || 'Tamu Istimewa'}
                    </h3>

                    <p className="text-xs sm:text-sm leading-relaxed text-stone-300 max-w-lg mx-auto">
                      {invitation.greeting_text ||
                        'Dengan penuh rasa syukur ke hadirat Tuhan Yang Maha Esa, kami mengundang Anda untuk merayakan momen bersejarah ikrar suci pernikahan kami.'}
                    </p>

                    {/* Button to view cover/hero photo if available */}
                    {(invitation.cover_image || invitation.hero_image) && (
                      <div className="pt-1">
                        <button
                          onClick={() =>
                            handleOpenPhoto(
                              invitation.cover_image || invitation.hero_image,
                              'Foto Sampul Undangan'
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#5C94FC] hover:bg-[#467DE0] active:scale-95 text-white text-xs font-mono font-bold rounded-xl border-2 border-white shadow-md cursor-pointer transition-transform"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Lihat Foto Sampul</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* ZONE 1: MEMPELAI (WORLD 1-2) */}
                {currentZone === 1 && (
                  <div className="space-y-3">
                    <div className="text-center mb-2">
                      <span className="text-[11px] font-mono font-bold text-[#FFD166] uppercase tracking-wider">
                        PASANGAN PENGANTIN
                      </span>
                      <h3 className="text-lg sm:text-xl font-mono font-black text-white">
                        {bride.full_name} &amp; {groom.full_name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Bride Card: Foto -> Nama -> Orang Tua -> Alamat -> Akun IG */}
                      <div className="bg-[#1E293B]/80 border-2 border-[#FF85A2] rounded-2xl p-3 text-center flex flex-col justify-between">
                        <div>
                          {/* 1. Foto Mempelai */}
                          {bride.photo_url && (
                            <div className="mx-auto w-20 h-24 rounded-xl overflow-hidden border-2 border-[#FF85A2] mb-2 bg-stone-900 shadow-xs relative group cursor-pointer"
                              onClick={() => handleOpenPhoto(bride.photo_url, `Foto ${bride.full_name}`)}
                            >
                              <img
                                src={bride.photo_url}
                                alt={bride.full_name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                          )}

                          <span className="inline-block px-2 py-0.5 bg-[#FF85A2] text-white text-[10px] font-mono font-bold rounded-md mb-1">
                            MEMPELAI WANITA
                          </span>

                          {/* 2. Nama Mempelai */}
                          <h4 className="font-bold text-sm text-[#FF85A2]">{bride.full_name}</h4>
                          {bride.nickname && (
                            <p className="text-[10px] text-stone-400 font-mono">({bride.nickname})</p>
                          )}

                          {/* 3. Putri dari Pasangan */}
                          <p className="text-[11px] text-stone-300 mt-1 leading-snug">
                            {bride.child_order ? `${bride.child_order} dari:` : 'Putri dari:'}
                            <br />
                            <strong className="text-white">{bride.father_name}</strong> &amp; <strong className="text-white">{bride.mother_name}</strong>
                          </p>

                          {/* 4. Alamat Mempelai */}
                          {(bride.address || bride.description) && (
                            <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-stone-400 font-mono">
                              <MapPin className="w-3 h-3 text-[#FF85A2] shrink-0" />
                              <span>{bride.address || bride.description}</span>
                            </div>
                          )}
                        </div>

                        {/* 5. Akun IG */}
                        {bride.instagram && (
                          <div className="mt-3">
                            <a
                              href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FF85A2] hover:bg-[#E04877] text-white rounded-lg text-[10px] font-mono font-bold border border-white shadow-xs"
                            >
                              <Instagram className="w-3 h-3" />
                              <span>@{bride.instagram.replace('@', '')}</span>
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Groom Card: Foto -> Nama -> Orang Tua -> Alamat -> Akun IG */}
                      <div className="bg-[#1E293B]/80 border-2 border-[#5C94FC] rounded-2xl p-3 text-center flex flex-col justify-between">
                        <div>
                          {/* 1. Foto Mempelai */}
                          {groom.photo_url && (
                            <div className="mx-auto w-20 h-24 rounded-xl overflow-hidden border-2 border-[#5C94FC] mb-2 bg-stone-900 shadow-xs relative group cursor-pointer"
                              onClick={() => handleOpenPhoto(groom.photo_url, `Foto ${groom.full_name}`)}
                            >
                              <img
                                src={groom.photo_url}
                                alt={groom.full_name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                          )}

                          <span className="inline-block px-2 py-0.5 bg-[#5C94FC] text-white text-[10px] font-mono font-bold rounded-md mb-1">
                            MEMPELAI PRIA
                          </span>

                          {/* 2. Nama Mempelai */}
                          <h4 className="font-bold text-sm text-[#5C94FC]">{groom.full_name}</h4>
                          {groom.nickname && (
                            <p className="text-[10px] text-stone-400 font-mono">({groom.nickname})</p>
                          )}

                          {/* 3. Putra dari Pasangan */}
                          <p className="text-[11px] text-stone-300 mt-1 leading-snug">
                            {groom.child_order ? `${groom.child_order} dari:` : 'Putra dari:'}
                            <br />
                            <strong className="text-white">{groom.father_name}</strong> &amp; <strong className="text-white">{groom.mother_name}</strong>
                          </p>

                          {/* 4. Alamat Mempelai */}
                          {(groom.address || groom.description) && (
                            <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-stone-400 font-mono">
                              <MapPin className="w-3 h-3 text-[#5C94FC] shrink-0" />
                              <span>{groom.address || groom.description}</span>
                            </div>
                          )}
                        </div>

                        {/* 5. Akun IG */}
                        {groom.instagram && (
                          <div className="mt-3">
                            <a
                              href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#5C94FC] hover:bg-[#467DE0] text-white rounded-lg text-[10px] font-mono font-bold border border-white shadow-xs"
                            >
                              <Instagram className="w-3 h-3" />
                              <span>@{groom.instagram.replace('@', '')}</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ZONE 2: KISAH KASIH (WORLD 1-3) */}
                {currentZone === 2 && (
                  <div className="space-y-3">
                    <div className="text-center mb-1">
                      <span className="text-[11px] font-mono font-bold text-[#FFD166] uppercase tracking-wider">
                        {getSec('story')?.subtitle || 'TIMELINE PERJALANAN CINTA'}
                      </span>
                      <h3 className="text-base sm:text-lg font-mono font-black text-white">
                        {getSec('story')?.title || 'Kisah Cinta Kami'}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {stories && stories.length > 0 ? (
                        stories.map((item, idx) => {
                          const photo = item.photo_url || item.image_url;
                          return (
                            <div
                              key={item.id || idx}
                              className="bg-[#1E293B]/80 border-2 border-stone-600 rounded-xl p-2.5 flex items-start justify-between gap-2.5"
                            >
                              <div className="flex items-start gap-2.5">
                                <span className="bg-[#E60012] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shrink-0 border border-white/50">
                                  {item.year || item.date || `CH ${idx + 1}`}
                                </span>
                                <div>
                                  <h5 className="font-bold text-xs text-[#FFD166]">{item.title}</h5>
                                  <p className="text-[11px] text-stone-300 mt-0.5 leading-snug">
                                    {item.description || (item as any).story}
                                  </p>
                                </div>
                              </div>

                              {photo && (
                                <button
                                  onClick={() => handleOpenPhoto(photo, item.title)}
                                  className="shrink-0 inline-flex items-center gap-1 px-2 py-1 bg-[#283D52] hover:bg-[#38526F] text-white rounded text-[10px] font-mono border border-white/40 cursor-pointer"
                                  title="Lihat Foto Cerita"
                                >
                                  <Eye className="w-3 h-3 text-[#FFD166]" />
                                  <span className="hidden sm:inline">Lihat</span>
                                </button>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-xs text-center text-stone-400 py-2 font-mono">
                          Dari awal pertemuan hingga ikrar suci pelaminan, cinta mempersatukan kami.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* ZONE 3: RANGKAIAN ACARA (WORLD 1-4) */}
                {currentZone === 3 && (
                  <div className="space-y-3">
                    <div className="text-center mb-1">
                      <span className="text-[11px] font-mono font-bold text-[#FFD166] uppercase tracking-wider">
                        WAKTU &amp; LOKASI PERNIKAHAN
                      </span>
                      <h3 className="text-base sm:text-lg font-mono font-black text-white">
                        Rangkaian Acara Pernikahan
                      </h3>
                    </div>

                    <div className="space-y-2.5">
                      {events.map((ev, idx) => (
                        <div
                          key={ev.id || idx}
                          className="bg-[#1E293B]/90 border-2 border-white/40 rounded-xl p-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="bg-[#FFD166] text-black border border-white px-2 py-0.2 text-[10px] font-mono font-bold rounded">
                                {ev.title}
                              </span>
                              <span className="text-xs font-bold text-white">
                                {ev.date || 'April 2026'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-stone-300 mt-1">
                              <Clock className="w-3 h-3 text-[#FF85A2]" />
                              <span>
                                {ev.start_time} - {ev.end_time}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-stone-300 mt-0.5">
                              <MapPin className="w-3 h-3 text-[#5C94FC]" />
                              <span className="truncate max-w-[280px]">{ev.venue} — {ev.address}</span>
                            </div>
                          </div>

                          {ev.maps_url && (
                            <a
                              href={ev.maps_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00A800] text-white rounded-lg text-xs font-mono font-bold border-2 border-white hover:bg-[#008A00] transition-colors shrink-0 shadow-xs"
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

                {/* ZONE 4: GALERI KENANGAN (WORLD 1-5) */}
                {currentZone === 4 && (
                  <div className="space-y-3">
                    <div className="text-center mb-1">
                      <span className="text-[11px] font-mono font-bold text-[#FFD166] uppercase tracking-wider">
                        {getSec('gallery')?.subtitle || 'MOMEN INDAH PERJALANAN KAMI'}
                      </span>
                      <h3 className="text-base sm:text-lg font-mono font-black text-white">
                        {getSec('gallery')?.title || 'Galeri Foto Kenangan'}
                      </h3>
                    </div>

                    {/* Small thumbnail photos grid inside canvas box */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {displayGallery.map((item, idx) => (
                        <button
                          key={item.id || idx}
                          onClick={() =>
                            handleOpenPhoto(
                              item.image_url,
                              item.caption || `Foto Galeri #${idx + 1}`
                            )
                          }
                          className="group relative aspect-square rounded-xl overflow-hidden border-2 border-white/60 hover:border-[#FFD166] transition-all hover:scale-103 shadow-md bg-stone-900 cursor-pointer"
                        >
                          <img
                            src={item.image_url}
                            alt={item.caption || 'Foto Galeri'}
                            className="w-full h-full object-cover group-hover:opacity-85 transition-opacity"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-[10px] font-mono font-bold text-white bg-[#E60012] px-1.5 py-0.5 rounded border border-white">
                              Lihat
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <p className="text-[10px] text-center text-stone-400 font-mono">
                      ★ Klik pada salah satu foto untuk melihat ukuran penuh ★
                    </p>
                  </div>
                )}

                {/* ZONE 5: TANDA KASIH / WEDDING GIFTS (WORLD 1-6) */}
                {currentZone === 5 && (
                  <div className="space-y-3">
                    <div className="text-center mb-1">
                      <span className="text-[11px] font-mono font-bold text-[#FFD166] uppercase tracking-wider">
                        AMPLOP DIGITAL &amp; KADO
                      </span>
                      <h3 className="text-base sm:text-lg font-mono font-black text-white">
                        Tanda Kasih Pernikahan
                      </h3>
                      <p className="text-[11px] text-stone-300 max-w-md mx-auto">
                        Doa restu Anda adalah anugerah terindah bagi kami. Bagi yang berkenan memberikan tanda kasih:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {gifts.map((gift) => (
                        <div
                          key={gift.id}
                          className="bg-[#1E293B]/90 border-2 border-white/40 rounded-xl p-3 flex flex-col justify-between shadow-xs"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-bold text-xs text-[#FFD166]">
                                {gift.provider || gift.bank_name || 'Transfer'}
                              </span>
                              <span className="text-[10px] text-stone-400 font-mono">
                                {gift.type === 'address' ? 'Kado Fisik' : 'Transfer Bank'}
                              </span>
                            </div>

                            <p className="font-mono text-sm font-bold text-white mt-1 break-all select-all">
                              {gift.account_number}
                            </p>
                            <p className="text-[11px] text-stone-300 font-medium">
                              a.n. {gift.account_name}
                            </p>
                          </div>

                          <button
                            onClick={() => handleCopy(gift.account_number, gift.id)}
                            className="mt-2.5 inline-flex items-center justify-center gap-1 px-2.5 py-1 bg-[#283D52] hover:bg-[#38526F] text-white rounded-md text-[11px] font-mono border border-white/40 cursor-pointer transition-colors"
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

                {/* ZONE 6: BUKU TAMU & RSVP (WORLD 1-7) */}
                {currentZone === 6 && (
                  <div className="space-y-3">
                    <div className="text-center mb-1">
                      <span className="text-[11px] font-mono font-bold text-[#FFD166] uppercase tracking-wider">
                        KONFIRMASI KEHADIRAN &amp; DOA
                      </span>
                      <h3 className="text-base sm:text-lg font-mono font-black text-white">
                        Buku Tamu Doa Restu
                      </h3>
                    </div>

                    <form onSubmit={handleRsvpSubmit} className="space-y-2.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-stone-300 mb-0.5">
                            Nama Tamu
                          </label>
                          <input
                            type="text"
                            value={wishAuthor}
                            onChange={(e) => setWishAuthor(e.target.value)}
                            placeholder="Tuliskan nama Anda..."
                            required
                            className="w-full px-3 py-1.5 text-xs bg-white text-black border-2 border-white rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#5C94FC] font-mono font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-stone-300 mb-0.5">
                            Konfirmasi Kehadiran
                          </label>
                          <select
                            value={rsvpStatus}
                            onChange={(e) => setRsvpStatus(e.target.value as any)}
                            className="w-full px-3 py-1.5 text-xs border-2 border-white rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#5C94FC] bg-white text-black font-mono font-bold"
                          >
                            <option value="attending">✓ Ya, Saya Akan Hadir</option>
                            <option value="uncertain">? Masih Ragu / Belum Pasti</option>
                            <option value="not_attending">✕ Maaf, Belum Bisa Hadir</option>
                          </select>
                        </div>
                      </div>

                      {rsvpStatus === 'attending' && (
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-stone-300 mb-0.5">
                            Jumlah Hadir (Pax)
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="8"
                            value={pax}
                            onChange={(e) => setPax(parseInt(e.target.value) || 1)}
                            className="w-24 px-3 py-1 text-xs border-2 border-white rounded-lg bg-white text-black font-mono font-bold"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-stone-300 mb-0.5">
                          Ucapan &amp; Doa Restu
                        </label>
                        <textarea
                          rows={2}
                          value={wishMessage}
                          onChange={(e) => setWishMessage(e.target.value)}
                          placeholder="Tuliskan doa dan harapan terbaik untuk kedua mempelai..."
                          className="w-full px-3 py-1.5 text-xs border-2 border-white rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#5C94FC] bg-white text-black font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 bg-[#E60012] text-white border-2 border-white rounded-xl text-xs font-mono font-bold hover:bg-[#CC0010] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmitting ? 'Mengirim...' : 'KIRIM RSVP & DOA RESTU'}</span>
                      </button>
                    </form>

                    {/* Wishes Stream */}
                    {wishes && wishes.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-white/20">
                        <span className="text-[10px] font-mono font-bold text-[#FFD166] uppercase">
                          Doa Dari Sahabat ({wishes.length})
                        </span>
                        <div className="mt-1.5 max-h-24 overflow-y-auto space-y-1.5 pr-1">
                          {wishes.slice(0, 5).map((w) => (
                            <div
                              key={w.id}
                              className="bg-[#1E293B]/70 border border-white/30 rounded-lg p-2 text-left"
                            >
                              <div className="flex items-center justify-between text-[10px] font-bold text-[#FFE082]">
                                <span>{w.guest_name}</span>
                                <Heart className="w-2.5 h-2.5 text-[#FF85A2] fill-[#FF85A2]" />
                              </div>
                              <p className="text-[11px] text-stone-200 mt-0.5 leading-snug">
                                {w.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ZONE 7: PELAMINAN IMPIAN & FINISH (WORLD 1-8) */}
                {currentZone === 7 && (
                  <div className="text-center space-y-2.5 py-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E60012]/80 border-2 border-white text-white text-xs font-mono font-bold">
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>STAGE CLEAR! YOU REACHED THE WEDDING ALTAR!</span>
                      <Heart className="w-3.5 h-3.5 fill-white" />
                    </div>

                    <h3 className="text-lg sm:text-2xl font-mono font-black text-[#FFD166]">
                      Pertemuan Indah Dengan {partnerRole}
                    </h3>
                    <p className="text-sm font-bold text-white">
                      {partnerName} menanti Anda di gerbang pelaminan!
                    </p>

                    <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                      &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
                    </p>

                    {invitation.closing_image && (
                      <div className="pt-1">
                        <button
                          onClick={() => handleOpenPhoto(invitation.closing_image!, 'Foto Pelaminan Impian')}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FF85A2] hover:bg-[#E04877] text-white rounded-lg text-xs font-mono font-bold border border-white shadow-xs cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Lihat Foto Pelaminan</span>
                        </button>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-center gap-2">
                      <button
                        onClick={() => onJumpToZone(0)}
                        className="px-3 py-1 bg-stone-700 hover:bg-stone-600 text-white text-xs font-mono rounded-lg border border-white/40 transition-colors cursor-pointer"
                      >
                        ↺ Ulangi Dari Awal
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dialogue Box Footer - Dynamic Walk Guide instead of Prev/Next buttons */}
          <div className="bg-[#1E293B] border-t-2 border-white/20 px-3 sm:px-4 py-1.5 flex items-center justify-between text-xs font-mono select-none text-stone-300">
            <div className="flex items-center gap-1.5 truncate">
              <span className="inline-block w-2 h-2 rounded-full bg-[#06D6A0] shrink-0 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] truncate">
                {currentZone === 7
                  ? '★ Selamat! Anda telah mencapai pelaminan! ★'
                  : '➔ Gerakkan karakter ke kanan untuk menuju sesi berikutnya...'}
              </span>
            </div>

            <span className="text-[10px] text-[#FFD166] font-bold shrink-0 ml-2">
              STAGE {currentZone + 1} / {dynamicZones.length}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Mario Style Photo Preview Modal */}
      <AnimatePresence>
        {previewPhoto && (
          <div
            onClick={() => setPreviewPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs select-none pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#1E293B] border-4 border-white rounded-2xl p-4 max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white font-mono space-y-3"
            >
              {/* Corner Studs */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-[#FFD166] border border-black pointer-events-none" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-[#FFD166] border border-black pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-2 h-2 bg-[#FFD166] border border-black pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#FFD166] border border-black pointer-events-none" />

              <div className="flex items-center justify-between border-b-2 border-white/20 pb-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FFD166] animate-pulse" />
                  <h4 className="font-bold text-xs sm:text-sm text-[#FFE082] truncate max-w-[200px]">
                    {previewPhoto.title}
                  </h4>
                </div>
                <button
                  onClick={() => setPreviewPhoto(null)}
                  className="px-2 py-0.5 bg-[#E60012] hover:bg-[#CC0010] text-white rounded-md text-xs font-bold border border-white cursor-pointer transition-colors"
                >
                  ✕ TUTUP
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border-2 border-[#FFD166] bg-black max-h-[60vh] flex items-center justify-center">
                <img
                  src={previewPhoto.url}
                  alt={previewPhoto.title}
                  className="max-h-[60vh] w-full object-contain"
                />
              </div>

              <div className="text-center">
                <span className="text-[10px] text-stone-400">
                  ★ Klik tombol Tutup atau area luar untuk kembali ke permainan ★
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
