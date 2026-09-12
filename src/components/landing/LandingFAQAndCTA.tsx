import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronDown, Heart, ArrowRight, ExternalLink, ShieldCheck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LandingFAQAndCTAProps {
  onOpenAdminLogin: () => void;
}

export const LandingFAQAndCTA: React.FC<LandingFAQAndCTAProps> = ({ onOpenAdminLogin }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Bagaimana cara membagikan undangan dengan nama tamu yang berbeda-beda?',
      a: 'Sangat mudah! Setiap tamu memiliki parameter nama unik (misal: /april-siti?to=NamaTamu). Anda dapat membuat puluhan atau ratusan link tamu sekaligus dari dasbor admin, lengkap dengan template pesan WhatsApp siap kirim yang santun dan rapi.',
    },
    {
      q: 'Apakah lagu pengiring dapat diputar secara otomatis di ponsel tamu?',
      a: 'Ya, saat tamu menekan tombol "Buka Undangan", alunan musik romantis akan otomatis diputar dengan lembut. Kami juga menyediakan floating controller di sudut layar sehingga tamu bebas menjeda (pause) atau memutar kembali musik kapan saja.',
    },
    {
      q: 'Bagaimana sistem amplop digital dan QRIS bekerja?',
      a: 'Tamu dapat langsung menyalin nomor rekening bank (BCA, Mandiri, dll) dengan tombol salin 1-klik, atau memindai kode QRIS standar nasional yang tampil langsung di layar. Tamu juga dapat mengisi form konfirmasi transfer.',
    },
    {
      q: 'Apakah teks undangan dapat diterjemahkan ke Basa Jawa Krama atau Bahasa Inggris?',
      a: 'Tentu saja. KU UNDANG menyediakan fitur 5 Bahasa bawaan (Bahasa Indonesia, Basa Jawa Krama Inggil, English, 日本語, dan 中文). Tamu dapat mengganti bahasa kapan saja melalui selektor bendera di kanan atas tanpa perlu me-refresh halaman.',
    },
    {
      q: 'Berapa lama masa aktif undangan digital KU UNDANG?',
      a: 'Undangan digital aktif tanpa batas waktu, sehingga tautan kenangan pernikahan Anda dapat terus dibuka dan dikenang selamanya oleh keluarga serta sahabat tercinta.',
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#F7F2EA] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FAQ Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFCF7] border border-[#C2A56B]/40 text-xs font-semibold uppercase tracking-[0.2em] text-[#C2A56B] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tanya Jawab</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#283D52] tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#768692] font-sans">
            Informasi penting seputar fitur, kemudahan pengoperasian, dan keistimewaan KU UNDANG.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-20">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="rounded-2xl border border-[#C2A56B]/30 bg-[#FFFCF7] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer select-none gap-4"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-[#283D52]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C2A56B] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-[#768692] leading-relaxed border-t border-[#C2A56B]/15">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Big Premium Banner CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-[#283D52] p-8 sm:p-12 md:p-16 text-center text-[#FFFCF7] relative overflow-hidden shadow-2xl border-2 border-[#C2A56B]/40"
        >
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#C2A56B]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#DFBFC1]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#C2A56B]/60 text-xs font-semibold uppercase tracking-[0.2em] text-[#EAD99B]">
              <Sparkles className="w-3.5 h-3.5 text-[#C2A56B]" />
              <span>Mulai Hari Bahagia Anda</span>
            </div>

            <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Hadirkan Pengalaman Undangan Digital Mewah untuk Tamu Tercinta
            </h3>

            <p className="text-sm sm:text-base text-[#FFFCF7]/80 leading-relaxed font-sans">
              Nikmati keanggunan frame arch sinematik, harmoni musik latar, dan kemudahan manajemen tamu
              dalam satu platform terintegrasi.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link
                  to="/april-siti"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#C2A56B] via-[#E8C288] to-[#C2A56B] text-[#1C2D27] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl hover:brightness-105 transition-all cursor-pointer group"
                >
                  <span>Lihat Contoh Undangan Sekarang</span>
                  <Heart className="w-4 h-4 text-[#8A0B1E] fill-[#8A0B1E] group-hover:scale-110 transition-transform" />
                </Link>
              </motion.div>
            </div>

            <div className="pt-4 flex items-center justify-center gap-6 text-xs text-[#FFFCF7]/80 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C2A56B]" /> Tanpa Batas Masa Aktif
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C2A56B]" /> 100% Mobile & Desktop Friendly
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C2A56B]" /> Dukungan Multi-Bahasa Lengkap
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
