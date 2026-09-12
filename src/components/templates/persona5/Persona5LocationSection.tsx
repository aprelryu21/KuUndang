import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, ExternalLink, Copy, Check, Car, Crosshair } from 'lucide-react';
import { WeddingEvent } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';

interface Persona5LocationSectionProps {
  events: WeddingEvent[];
}

export const Persona5LocationSection: React.FC<Persona5LocationSectionProps> = ({ events }) => {
  const { t, language } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const displayEvents =
    events.length > 0
      ? events
      : [
          {
            id: 'p5-loc-01',
            invitation_id: 'default',
            title: 'Akad Nikah',
            event_type: 'akad' as const,
            date: '2021-09-17',
            start_time: '08:00 WIB',
            venue: 'Kediaman Mempelai Wanita (Sidoarjo)',
            address: 'Desa Balonggarut RT 03 / RW 01, Kec. Krembung, Kab. Sidoarjo, Jawa Timur',
            maps_url: 'https://maps.google.com/?q=Balonggarut,+Krembung,+Sidoarjo',
            sort_order: 1,
          },
          {
            id: 'p5-loc-02',
            invitation_id: 'default',
            title: 'Resepsi Pernikahan',
            event_type: 'reception' as const,
            date: '2021-09-17',
            start_time: '10:00 WIB',
            venue: 'Kediaman Mempelai Wanita (Sidoarjo)',
            address: 'Desa Balonggarut RT 03 / RW 01, Kec. Krembung, Kab. Sidoarjo, Jawa Timur',
            maps_url: 'https://maps.google.com/?q=Balonggarut,+Krembung,+Sidoarjo',
            sort_order: 2,
          },
        ];

  const handleCopy = (ev: WeddingEvent) => {
    const text = `${ev.venue}\n${ev.address}`;
    navigator.clipboard.writeText(text);
    setCopiedId(ev.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const p5Translations = t.p5;

  const routeGuideByLang: Record<string, { title: string; desc: string }> = {
    ID: {
      title: 'PETUNJUK RUTE & KANTONG PARKIR (TACTICAL NAVIGATION)',
      desc: 'Lokasi acara berada di jalan desa yang dapat diakses oleh kendaraan roda 2 maupun roda 4. Tersedia area parkir yang memadai dan petugas yang mengarahkan tamu saat tiba di lokasi.',
    },
    JW: {
      title: 'PITUDUH DALAN & PAPAN PARKIR (TACTICAL NAVIGATION)',
      desc: 'Papan adicara saged dipun ampiri kendharaan roda 2 lan roda 4. Sumadya papan parkir ingkang cekap lan wonten petugas ingkang nuntun rawuhipun para tamu.',
    },
    EN: {
      title: 'ROUTE GUIDANCE & PARKING AREA (TACTICAL NAVIGATION)',
      desc: 'The event location is accessible by both 2-wheeled and 4-wheeled vehicles. Adequate parking space is available with attendants ready to direct guests upon arrival.',
    },
    JP: {
      title: 'ルート案内＆駐車場 (TACTICAL NAVIGATION)',
      desc: '会場は二輪車および四輪車の両方でアクセス可能です。十分な駐車スペースが完備されており、到着時にスタッフが誘導いたします。',
    },
    CN: {
      title: '路线指引与停车区域 (TACTICAL NAVIGATION)',
      desc: '活动地点适合两轮及四轮机动车辆通行。现场设有宽敞的停车区域，并有工作人员在您抵达时提供指引。',
    },
  };

  const currentGuide = routeGuideByLang[language] || routeGuideByLang.ID;

  return (
    <section
      id="p5-location"
      className="py-20 sm:py-28 bg-[#0D0D0D] text-[#FFFFFF] relative overflow-hidden border-t-4 border-[#E60012]"
    >
      {/* Background Graphic Slices */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#E60012 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF000] text-black text-xs font-black uppercase tracking-[0.2em] -skew-x-12 mb-3">
            <Crosshair className="w-3.5 h-3.5 text-black skew-x-12" />
            <span className="skew-x-12">
              {p5Translations?.locationHeader || 'COGNITIVE RADAR // VENUE COORDINATES'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight text-[#FFFFFF]">
            {p5Translations?.targetLocation ? (
              p5Translations.targetLocation
            ) : (
              <>TARGET <span className="text-[#E60012] not-italic">LOCATION</span></>
            )}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#FFFFFF]/70 mt-2">
            {p5Translations?.locationSubtitle || 'Panduan Rute dan Navigasi GPS Menuju Lokasi Acara Pernikahan'}
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayEvents.map((ev, idx) => {
            const isCopied = copiedId === ev.id;
            const mapsUrl =
              ev.maps_url ||
              `https://maps.google.com/?q=${encodeURIComponent(`${ev.venue}, ${ev.address}`)}`;
            const encodedQuery = encodeURIComponent(`${ev.venue}, ${ev.address}`);
            const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#141418] border-2 border-[#FFFFFF]/60 hover:border-[#E60012] p-5 -skew-x-2 shadow-[6px_6px_0px_0px_#E60012] flex flex-col justify-between transition-colors text-left"
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-3 border-b border-white/20 pb-2">
                    <span className="bg-[#E60012] text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 -skew-x-6">
                      LOC-0{idx + 1} // {ev.title}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#FFF000]">
                      {ev.start_time}
                    </span>
                  </div>

                  {/* Venue Name */}
                  <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-wide">
                    {ev.venue}
                  </h3>

                  {/* Full Address */}
                  <p className="mt-2 text-xs font-mono text-[#FFFFFF]/80 leading-relaxed bg-black/50 p-2.5 border border-white/20">
                    {ev.address}
                  </p>

                  {/* Interactive Map Embed */}
                  <div className="mt-4 w-full h-44 border-2 border-[#FFFFFF]/40 relative overflow-hidden bg-black group">
                    <iframe
                      title={`Peta ${ev.venue}`}
                      src={mapEmbedUrl}
                      className="w-full h-full border-0 contrast-125 hover:contrast-100 transition-all"
                      loading="lazy"
                    />
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-2 right-2 px-2.5 py-1 bg-[#E60012] text-white text-[10px] font-black font-mono uppercase -skew-x-6 flex items-center gap-1 shadow-md hover:bg-[#FF0019]"
                    >
                      <Navigation className="w-3 h-3 skew-x-6" />
                      <span className="skew-x-6">MAPS</span>
                    </a>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-5 pt-4 border-t border-white/20 space-y-2">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#E60012] hover:bg-[#FF0019] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 -skew-x-6 shadow-[3px_3px_0px_0px_#FFFFFF] cursor-pointer transition-transform hover:scale-[1.02]"
                  >
                    <ExternalLink className="w-3.5 h-3.5 skew-x-6" />
                    <span className="skew-x-6">{t.openMaps || 'BUKA GOOGLE MAPS'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(ev)}
                    className="w-full py-2 bg-[#000000] hover:bg-[#1A1A1E] text-white text-[11px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-white/40 -skew-x-6 transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#FFF000] skew-x-6" />
                        <span className="text-[#FFF000] skew-x-6">{t.addressCopied || 'KOORDINAT TERSALIN!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-white skew-x-6" />
                        <span className="skew-x-6">{t.copyAddress || 'SALIN ALAMAT'}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Route Guide Box */}
        <div className="mt-12 bg-[#000000] border-2 border-[#FFF000] p-4 sm:p-5 -skew-x-2 max-w-3xl mx-auto flex items-center gap-4 text-left shadow-[6px_6px_0px_0px_#E60012]">
          <div className="w-12 h-12 bg-[#E60012] text-white flex items-center justify-center -skew-x-6 shrink-0 shadow-md">
            <Car className="w-6 h-6 skew-x-6" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase text-[#FFF000] tracking-wider">
              {currentGuide.title}
            </h4>
            <p className="text-xs font-mono text-[#FFFFFF]/80 mt-1 leading-relaxed">
              {currentGuide.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
