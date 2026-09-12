import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe2, Sparkles, Heart, Check, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingMultiLangShowcase: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'id' | 'en' | 'jw' | 'ja' | 'zh'>('jw');

  const languages = [
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', label: 'Resmi & Santun' },
    { code: 'jw', name: 'Basa Jawa (Krama)', flag: '🌿', label: 'Adat Luhur Jawa' },
    { code: 'en', name: 'English', flag: '🇬🇧', label: 'International' },
    { code: 'ja', name: '日本語 (Japanese)', flag: '🇯🇵', label: 'Tradisional & Modern' },
    { code: 'zh', name: '中文 (Mandarin)', flag: '🇨🇳', label: 'Elegan Oriental' },
  ] as const;

  const demoPhrases = {
    id: {
      weddingOf: 'PERNIKAHAN DARI',
      dearGuest: 'Kepada Yth. Bapak/Ibu/Saudara/i',
      honoredGuest: 'Tamu Terhormat',
      openBtn: 'BUKA UNDANGAN',
      loveStory: 'Kisah Cinta Kami',
      gallery: 'Galeri Kenangan',
      rsvp: 'Konfirmasi Kehadiran',
      quote: 'Dua jiwa berjanji merajut takdir bersama dengan cinta dan ketulusan.',
    },
    jw: {
      weddingOf: 'DHABUHAN SUCI SAKING',
      dearGuest: 'Katur Dhumateng Panjenenganipun',
      honoredGuest: 'Para Rawuh Ingkang Minulyo',
      openBtn: 'BIKAK SERAT SEDHAHAN',
      loveStory: 'Lelampahan Tresna',
      gallery: 'Galeri Kenangan',
      rsvp: 'Konfirmasi Rawuh',
      quote: 'Nyuwun donga pangestu dhumateng Gusti Kang Akarya Jagad.',
    },
    en: {
      weddingOf: 'THE WEDDING CELEBRATION OF',
      dearGuest: 'Cordially Invited To',
      honoredGuest: 'Honored Guest',
      openBtn: 'OPEN INVITATION',
      loveStory: 'Our Love Story',
      gallery: 'Photo Gallery',
      rsvp: 'RSVP & Attendance',
      quote: 'Two souls joined together in love, bound by destiny and eternity.',
    },
    ja: {
      weddingOf: '結婚式のご案内',
      dearGuest: 'ご招待申し上げます',
      honoredGuest: '大切なお客様',
      openBtn: '招待状を開く',
      loveStory: '二人の歩み',
      gallery: 'フォトギャラリー',
      rsvp: '出席のご連絡',
      quote: '二つの心がひとつとなり、永遠の愛を誓い合います。',
    },
    zh: {
      weddingOf: '婚礼盛典',
      dearGuest: '谨定于',
      honoredGuest: '尊贵的贵宾',
      openBtn: '开启请柬',
      loveStory: '爱情故事',
      gallery: '甜蜜光影',
      rsvp: '参加回执',
      quote: '两姓联姻，一堂缔约，良缘永结，匹配同称。',
    },
  };

  const current = demoPhrases[activeLang];

  return (
    <section id="bahasa" className="py-20 sm:py-28 bg-[#FFFCF7] border-b border-[#C2A56B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Language Selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFE8DE] border border-[#C2A56B]/40 text-xs font-semibold uppercase tracking-[0.2em] text-[#C2A56B]">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Multi-Bahasa Terintegrasi</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#283D52] tracking-tight">
              Sapa Tamu dari Berbagai Latar Belakang & Tradisi
            </h2>

            <p className="text-base sm:text-lg text-[#768692] font-sans">
              Setiap tamu dapat memilih bahasa yang mereka sukai langsung dari tombol bendera di pojok atas layar.
              Kamus kosakata telah disesuaikan dengan ragam bahasa baku dan ungkapan adat yang santun.
            </p>

            {/* Language Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {languages.map((lang) => {
                const isSelected = activeLang === lang.code;
                return (
                  <motion.button
                    key={lang.code}
                    type="button"
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveLang(lang.code)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#283D52] text-[#FFFCF7] border-[#C2A56B] shadow-md scale-[1.02]'
                        : 'bg-[#F7F2EA] text-[#283D52] border-[#C2A56B]/30 hover:border-[#C2A56B]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <p className="text-xs sm:text-sm font-bold">{lang.name}</p>
                        <p className={`text-[11px] ${isSelected ? 'text-[#C2A56B]' : 'text-[#768692]'}`}>
                          {lang.label}
                        </p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#C2A56B]" />}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Live Simulated Preview Card in Active Language */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex justify-center"
          >
            <motion.div
              key={activeLang}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md rounded-3xl bg-[#F7F2EA] border-2 border-[#C2A56B]/60 p-6 sm:p-8 shadow-xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#C2A56B] to-transparent" />

              {/* Language Indicator Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFCF7] border border-[#C2A56B]/40 text-xs font-bold text-[#283D52] mb-4">
                <span>{languages.find((l) => l.code === activeLang)?.flag}</span>
                <span>{languages.find((l) => l.code === activeLang)?.name} Mode</span>
              </div>

              <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C2A56B] font-semibold">
                {current.weddingOf}
              </p>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-[#283D52] my-1">
                April <span className="font-accent text-2xl sm:text-3xl text-[#C2A56B] lowercase font-normal">&</span> Siti
              </h3>

              <div className="my-5 p-4 rounded-2xl bg-[#FFFCF7] border border-[#C2A56B]/40 shadow-sm text-center">
                <p className="text-xs text-[#768692] italic font-serif mb-1">{current.dearGuest}:</p>
                <p className="font-heading text-lg font-bold text-[#283D52]">Keluarga Besar Bpk. Wiryawan</p>
                <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-[#DFBFC1]/30 text-[10px] font-semibold text-[#283D52]">
                  {current.honoredGuest}
                </span>
              </div>

              <p className="text-xs text-[#768692] italic font-serif px-4 mb-5">
                "{current.quote}"
              </p>

              <div className="grid grid-cols-3 gap-2 text-center text-xs mb-6">
                <div className="p-2 rounded-xl bg-[#FFFCF7] border border-[#C2A56B]/20">
                  <p className="text-[9px] text-[#768692]">Kisah</p>
                  <p className="font-bold text-[#283D52] truncate">{current.loveStory}</p>
                </div>
                <div className="p-2 rounded-xl bg-[#FFFCF7] border border-[#C2A56B]/20">
                  <p className="text-[9px] text-[#768692]">Galeri</p>
                  <p className="font-bold text-[#283D52] truncate">{current.gallery}</p>
                </div>
                <div className="p-2 rounded-xl bg-[#FFFCF7] border border-[#C2A56B]/20">
                  <p className="text-[9px] text-[#768692]">Buku Tamu</p>
                  <p className="font-bold text-[#283D52] truncate">{current.rsvp}</p>
                </div>
              </div>

              <Link
                to="/april-siti"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#C2A56B] via-[#E8C288] to-[#C2A56B] text-[#1C2D27] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-105 transition-all"
              >
                <span>{current.openBtn}</span>
                <Heart className="w-3.5 h-3.5 text-[#8A0B1E] fill-[#8A0B1E]" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
