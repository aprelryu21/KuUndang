import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Copy, Check, ExternalLink, Sparkles, Car, Shirt } from 'lucide-react';
import { WeddingEvent } from '../../../types/wedding';
import { useToast } from '../../../context/ToastContext';

interface PastelPopLocationSectionProps {
  events: WeddingEvent[];
}

export const PastelPopLocationSection: React.FC<PastelPopLocationSectionProps> = ({ events }) => {
  const { showToast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Group events by venue
  const venues = events.reduce((acc, ev) => {
    if (!acc.some((v) => v.venue_name === ev.venue_name)) {
      acc.push(ev);
    }
    return acc;
  }, [] as WeddingEvent[]);

  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeVenue = venues[selectedIdx] || events[0];

  const handleCopyAddress = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    showToast('Alamat berhasil disalin ke clipboard! ♡', 'success');
    setTimeout(() => setCopiedId(null), 3000);
  };

  const getGoogleMapsUrl = (ev: WeddingEvent) => {
    if (ev.latitude && ev.longitude) {
      return `https://www.google.com/maps/search/?api=1&query=${ev.latitude},${ev.longitude}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${ev.venue_name || ev.venue}, ${ev.address}`
    )}`;
  };

  return (
    <section id="cute-location" className="py-20 sm:py-28 bg-gradient-to-b from-[#FFE5EC]/40 via-white to-[#FFF9E6]/60 relative overflow-hidden">
      {/* Playful Doodles */}
      <div className="absolute top-12 left-6 text-3xl opacity-30 select-none animate-bounce" style={{ animationDuration: '3.6s' }}>
        🗺️
      </div>
      <div className="absolute bottom-12 right-6 text-3xl opacity-30 select-none animate-bounce" style={{ animationDuration: '4s' }}>
        🚗
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDF5FF] border-2 border-[#4D96FF] text-[#4D96FF] text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
          <MapPin className="w-3.5 h-3.5" />
          <span>LOKASI &amp; PETUNJUK ARAH</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-[#2B2D42] tracking-tight">
          Denah &amp; Lokasi Acara ♡
        </h2>
        <p className="text-xs sm:text-sm text-[#2B2D42]/70 mt-2 max-w-md mx-auto">
          Klik tombol petunjuk arah untuk langsung membuka Google Maps di smartphone Anda.
        </p>

        {/* Venue Selector Tabs (if multiple venues) */}
        {venues.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-8 mb-6">
            {venues.map((v, i) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedIdx(i)}
                className={`px-4 py-2 rounded-2xl text-xs font-black border-2 transition-all cursor-pointer ${
                  selectedIdx === i
                    ? 'bg-[#FF6B8B] text-white border-[#2B2D42] shadow-[3px_3px_0px_0px_#2B2D42]'
                    : 'bg-white text-[#2B2D42] border-slate-200 hover:border-[#FF6B8B]'
                }`}
              >
                📍 {v.venue_name}
              </button>
            ))}
          </div>
        )}

        {/* Venue Information Card */}
        {activeVenue && (
          <motion.div
            key={activeVenue.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 bg-white rounded-4xl border-4 border-[#2B2D42] shadow-[8px_8px_0px_0px_#FF6B8B] overflow-hidden text-left"
          >
            {/* Interactive Embedded Google Maps */}
            <div className="w-full h-72 sm:h-96 bg-slate-100 relative border-b-4 border-[#2B2D42]">
              <iframe
                title="Google Maps Venue"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  `${activeVenue.venue_name}, ${activeVenue.address}`
                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />

              {/* Floating cute pin pill */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full border-2 border-[#2B2D42] shadow-md flex items-center gap-2 text-xs font-black text-[#2B2D42]">
                <MapPin className="w-4 h-4 text-[#FF6B8B]" />
                <span>{activeVenue.venue_name}</span>
              </div>
            </div>

            {/* Venue Details & Buttons */}
            <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <span className="inline-block px-3 py-0.5 rounded-full bg-[#FFE5EC] text-[#FF6B8B] text-[10px] font-black uppercase mb-2">
                  LOKASI RESMI
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#2B2D42]">
                  {activeVenue.venue_name}
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2D42]/70 mt-1 leading-relaxed">
                  {activeVenue.address}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => handleCopyAddress(activeVenue.address, activeVenue.id)}
                  className="flex-1 md:flex-none px-4 py-3 rounded-2xl bg-[#FFF9E6] hover:bg-[#FFD166] text-[#2B2D42] border-2 border-[#2B2D42] text-xs font-black flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_#2B2D42] transition-all cursor-pointer"
                >
                  {copiedId === activeVenue.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#FF6B8B]" />
                      <span>Salin Alamat</span>
                    </>
                  )}
                </button>

                <a
                  href={getGoogleMapsUrl(activeVenue)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none px-5 py-3 rounded-2xl bg-[#06D6A0] hover:bg-[#05b88a] text-white border-2 border-[#2B2D42] text-xs font-black flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_#2B2D42] transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Buka Petunjuk Arah</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Travel & Dresscode Tips in Cute Cards */}
            <div className="bg-[#F7F9FC] border-t-2 border-[#2B2D42]/10 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
                <div className="w-8 h-8 rounded-xl bg-[#E8FBF5] text-[#06D6A0] flex items-center justify-center shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-black text-[#2B2D42]">Area Parkir Luas</p>
                  <p className="text-[#2B2D42]/70 text-[11px] mt-0.5">
                    Tersedia fasilitas parkir mobil dan motor dengan pengawasan petugas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
                <div className="w-8 h-8 rounded-xl bg-[#FFE5EC] text-[#FF6B8B] flex items-center justify-center shrink-0">
                  <Shirt className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-black text-[#2B2D42]">Dress Code: Pastel / Formal</p>
                  <p className="text-[#2B2D42]/70 text-[11px] mt-0.5">
                    Disarankan mengenakan busana ceria bernuansa pastel, batik, atau formal rapi.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
