import React, { useState } from 'react';
import { motion } from 'motion/react';
import { WeddingEvent } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  JavaneseDivider,
  JavaneseCornerFlourish,
  BatikKawungPattern,
} from './javaneseAssets';
import { MapPin, Copy, Check, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';

interface JavaneseLocationSectionProps {
  events: WeddingEvent[];
}

export const JavaneseLocationSection: React.FC<JavaneseLocationSectionProps> = ({ events }) => {
  const { t, language } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const mainEvent = events[0] || {
    id: 'main',
    name: 'Akad & Resepsi Sidoarjo',
    venue_name: 'Kediaman Mempelai Putri',
    address: 'Desa Balonggarut RT 03 / RW 01, Kecamatan Krembung, Kabupaten Sidoarjo, Jawa Timur 61275',
    maps_url: 'https://maps.google.com/?q=Krembung,Sidoarjo',
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section
      id="javanese-location"
      className="py-20 sm:py-28 px-4 bg-[#180E07] text-[#FAF6EE] relative overflow-hidden border-t border-[#D4AF37]/30"
    >
      <BatikKawungPattern className="absolute inset-0 pointer-events-none opacity-8" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <p className="text-xs font-serif tracking-[0.25em] text-[#D4AF37] uppercase">
            {language === 'JW' ? 'PITEDAH MARGI & DENAH PAPAN' : 'LOKASI & PETUNJUK ARAH'}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-[#FAF6EE]">
            {language === 'JW' ? 'Papan Palakrama' : 'Denah & Alamat Acara'}
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm font-serif text-[#FAF6EE]/75 leading-relaxed">
            {language === 'JW'
              ? 'Pitedah papan jangkep lampahing ijab kabul kaliyan resepsi temanten supados gampil dipun padosi dening para rawuh sedaya.'
              : 'Petunjuk lokasi dan navigasi bagi para tamu undangan terhormat agar mudah menuju tempat pelaksanaan acara.'}
          </p>
          <JavaneseDivider className="my-4" />
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          {/* Card 1: Venue Details & Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#24160E]/90 border-2 border-[#D4AF37]/70 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.7)] relative"
          >
            <div className="absolute top-2 left-2">
              <JavaneseCornerFlourish className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div className="absolute top-2 right-2 rotate-90">
              <JavaneseCornerFlourish className="w-5 h-5 text-[#D4AF37]" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-serif text-[#D4AF37] uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>{language === 'JW' ? 'Papan Palakrama Utama' : 'Lokasi Utama Acara'}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#E5C158] mb-3">
                {mainEvent.venue_name || 'Kediaman Mempelai Putri'}
              </h3>

              <p className="font-serif text-xs sm:text-sm text-[#FAF6EE]/80 leading-relaxed mb-6">
                {mainEvent.address}
              </p>

              <div className="p-4 rounded-xl bg-[#1A1009] border border-[#D4AF37]/40 space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#E5C158]">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>{language === 'JW' ? 'Pitedah Parkir & Tata Krama' : 'Fasilitas & Parkir'}</span>
                </div>
                <p className="text-[11px] font-serif text-[#FAF6EE]/70 leading-relaxed">
                  {language === 'JW'
                    ? 'Kasedhiyakaken papan parkir ingkang prayogi. Nyuwun tulung derek pitedahipun pamong warga ing gapura mlebet dhusun.'
                    : 'Tersedia area parkir kendaraan roda 2 dan roda 4 yang nyaman. Silakan ikuti arahan panitia penunjuk arah di gerbang masuk.'}
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#D4AF37]/30">
              <button
                type="button"
                onClick={() => handleCopy(mainEvent.address, 'main-addr')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#2C1810] hover:bg-[#3A2012] border border-[#D4AF37]/60 text-[#E5C158] font-serif text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                {copiedId === 'main-addr' ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-300">
                      {t.addressCopied || 'Alamat Kasil Kasalin!'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#D4AF37]" />
                    <span>{t.copyAddress || 'SALIN ALAMAT LENGKAP'}</span>
                  </>
                )}
              </button>

              <a
                href={mainEvent.maps_url || 'https://maps.google.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#9C7A1D] to-[#D4AF37] hover:from-[#B58E23] hover:to-[#E5C158] text-[#1A1009] font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Navigation className="w-4 h-4 text-[#1A1009]" />
                <span>{t.openGoogleMaps || 'NAVIGASI GOOGLE MAPS'}</span>
              </a>
            </div>
          </motion.div>

          {/* Card 2: Interactive Styled Map View */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#24160E]/90 border-2 border-[#D4AF37]/70 rounded-2xl overflow-hidden flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
          >
            <div className="p-3 bg-[#1A1009] border-b border-[#D4AF37]/40 flex items-center justify-between text-xs font-serif text-[#E5C158]">
              <span className="font-bold">Google Maps — Sidoarjo & Kediri</span>
              <span className="text-[10px] text-[#FAF6EE]/60">GPS Coordinates</span>
            </div>

            <div className="relative flex-1 min-h-[300px] w-full bg-[#1A1009]">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.286348123062!2d112.59857!3d-7.48882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e050085a3a41%3A0x289745ba6df21a55!2sKrembung%2C%20Sidoarjo%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1690000000000!5m2!1sen!2sid"
                className="w-full h-full border-0 absolute inset-0 filter invert-[0.85] hue-rotate-[160deg] contrast-[1.1]"
                loading="lazy"
              />
            </div>

            <div className="p-4 bg-[#1A1009] border-t border-[#D4AF37]/30 text-center">
              <a
                href={mainEvent.maps_url || 'https://maps.google.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-serif text-[#D4AF37] hover:text-[#E5C158] transition-colors"
              >
                <span>{language === 'JW' ? 'Mirsani peta luwih jembar ing Google Maps' : 'Lihat peta ukuran penuh di aplikasi Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
