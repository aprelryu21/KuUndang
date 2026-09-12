import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Share2,
  ExternalLink,
  Copy,
  Check,
  Navigation,
  Compass,
  Car,
  Info,
} from 'lucide-react';
import { WeddingEvent } from '../../types/wedding';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { MapPinFloralIllustration, VintageDivider } from './WeddingDecorations';

interface LocationSectionProps {
  events: WeddingEvent[];
}

export const LocationSection: React.FC<LocationSectionProps> = ({ events }) => {
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fallback default venues if none exist
  const displayEvents = events.length > 0 ? events : [
    {
      id: 'default-loc-01',
      invitation_id: 'default',
      title: 'Akad Nikah',
      event_type: 'akad' as const,
      date: '2026-09-28',
      start_time: '07.00 WIB',
      venue: "Masjid Jami' Al-Hikmah Kandangan",
      address: 'Jl. Raya Kandangan No. 45, Kandangan, Kediri, Jawa Timur',
      maps_url: 'https://maps.google.com/?q=Kandangan,+Kediri',
      sort_order: 1,
    },
    {
      id: 'default-loc-02',
      invitation_id: 'default',
      title: 'Resepsi Pernikahan',
      event_type: 'reception' as const,
      date: '2026-09-28',
      start_time: '09.00 WIB',
      venue: 'Kediaman Mempelai Pria',
      address: 'Dusun Medowo, Desa Medowo, Kec. Kandangan, Kabupaten Kediri, Jawa Timur',
      maps_url: 'https://maps.google.com/?q=Medowo,+Kandangan,+Kediri',
      sort_order: 2,
    },
  ];

  const handleCopyAddress = (event: WeddingEvent) => {
    const textToCopy = `${event.venue}\n${event.address}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(event.id);
    showToast(t.addressCopied, 'success');
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const handleShareLocation = async (event: WeddingEvent) => {
    const mapsLink = event.maps_url || `https://maps.google.com/?q=${encodeURIComponent(`${event.venue}, ${event.address}`)}`;
    const shareData = {
      title: `Lokasi ${event.title} - Shofwan & Allya`,
      text: `Lokasi ${event.title}:\n${event.venue}\n${event.address}\n\nPetunjuk Peta:`,
      url: mapsLink,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        showToast('Lokasi berhasil dibagikan! ♡', 'success');
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          navigator.clipboard.writeText(`${shareData.text} ${mapsLink}`);
          showToast('Link peta disalin ke clipboard! ♡', 'success');
        }
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${mapsLink}`);
      showToast('Link peta disalin ke clipboard! ♡', 'success');
    }
  };

  return (
    <section id="location" className="py-20 px-4 sm:px-6 bg-[#F7F2EA] text-[#24313A] relative overflow-hidden">
      {/* Subtle background ornamentation */}
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-[#DFBFC1]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-[#C2A56B]/15 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-center"
        >
          <div className="mb-3">
            <MapPinFloralIllustration className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>

          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#768692] mb-1">
            <Compass className="w-3.5 h-3.5 text-[#C2A56B]" />
            <span>Venue & Navigation</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-wide uppercase text-[#283D52] font-semibold">
            {t.locationTitle}
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-xs sm:text-sm text-[#768692] leading-relaxed">
            {t.locationSubtitle}
          </p>
          <div className="w-16 h-[1.5px] bg-[#C2A56B]/40 mx-auto mt-5" />
        </motion.div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {displayEvents.map((event, index) => {
            const isCopied = copiedId === event.id;
            const mapsUrl =
              event.maps_url ||
              `https://maps.google.com/?q=${encodeURIComponent(`${event.venue}, ${event.address}`)}`;
            const encodedQuery = encodeURIComponent(`${event.venue}, ${event.address}`);
            const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col justify-between bg-[#FFFCF7] rounded-3xl p-6 sm:p-7 border border-[#C2A56B]/40 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div>
                  {/* Event Type Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DFBFC1]/20 text-[#283D52] text-[11px] font-semibold uppercase tracking-wider border border-[#DFBFC1]/40">
                      <MapPin className="w-3 h-3 text-[#C2A56B]" />
                      <span>{event.title}</span>
                    </span>

                    <span className="text-[11px] font-medium text-[#768692]">
                      {event.start_time}
                    </span>
                  </div>

                  {/* Venue Name */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#283D52] tracking-wide mt-1">
                    {event.venue}
                  </h3>

                  {/* Full Written Address */}
                  <p className="mt-2.5 text-xs sm:text-sm text-[#24313A]/85 leading-relaxed bg-[#F7F2EA]/80 p-3.5 rounded-2xl border border-[#283D52]/10">
                    {event.address}
                  </p>

                  {/* Interactive Map Thumbnail / Embed */}
                  <div className="relative mt-4 w-full h-52 sm:h-56 rounded-2xl overflow-hidden border border-[#C2A56B]/30 shadow-inner bg-[#EFE8DE] group-hover:border-[#C2A56B] transition-colors">
                    <iframe
                      title={`Peta Lokasi ${event.venue}`}
                      src={mapEmbedUrl}
                      className="w-full h-full border-0 grayscale contrast-[0.95] hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />

                    {/* Quick overlay link */}
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#283D52]/90 hover:bg-[#283D52] text-[#FFFCF7] text-[11px] font-semibold backdrop-blur-xs shadow-md transition-transform hover:scale-105"
                    >
                      <Navigation className="w-3 h-3 text-[#DFBFC1]" />
                      <span>Buka Rute</span>
                    </a>
                  </div>
                </div>

                {/* Action Buttons: Open in Maps, Share, Copy */}
                <div className="mt-6 pt-5 border-t border-[#EFE8DE] space-y-2.5">
                  {/* Open in Maps App Button */}
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-2xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-[#DFBFC1]" />
                    <span>{t.openInMapsApp}</span>
                  </a>

                  {/* Secondary actions: Share & Copy Address */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Share Button */}
                    <button
                      type="button"
                      onClick={() => handleShareLocation(event)}
                      className="py-2.5 px-3 rounded-xl bg-[#F7F2EA] hover:bg-[#EFE8DE] text-[#283D52] text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-[#283D52]/15 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#C2A56B]" />
                      <span>{t.shareLocation}</span>
                    </button>

                    {/* Copy Address Button */}
                    <button
                      type="button"
                      onClick={() => handleCopyAddress(event)}
                      className="py-2.5 px-3 rounded-xl bg-[#F7F2EA] hover:bg-[#EFE8DE] text-[#283D52] text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-[#283D52]/15 transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">{t.copiedSuccess}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#C2A56B]" />
                          <span>{t.copyAddress}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Route Guide Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 max-w-2xl mx-auto p-5 rounded-2xl bg-[#FFFCF7] border border-[#C2A56B]/30 flex items-center gap-4 text-left shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-[#283D52] flex items-center justify-center text-[#FFFCF7] shrink-0 shadow-xs">
            <Car className="w-5 h-5 text-[#DFBFC1]" />
          </div>
          <div>
            <h4 className="font-heading text-base font-bold text-[#283D52]">
              {t.routeGuide}
            </h4>
            <p className="text-xs text-[#768692] mt-0.5 leading-relaxed">
              {t.routeGuideText}
            </p>
          </div>
        </motion.div>

        {/* Vintage Divider */}
        <div className="mt-12">
          <VintageDivider className="w-48 sm:w-64 h-6 opacity-70" />
        </div>
      </div>
    </section>
  );
};
