import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Palette, Edit3, ImagePlus, Share2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingHowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Pilih Format & Tema Desain',
      desc: 'Tentukan gaya estetika undangan Anda, mulai dari Classic Arch Royal, Modern Luxury, hingga Adat Tradisional Jawa Inggil.',
      icon: Palette,
      color: '#C2A56B',
      detail: 'Preset warna Navy-Gold, Emerald, Rose Gold & Champagne',
    },
    {
      step: '02',
      title: 'Lengkapi Data Mempelai & Acara',
      desc: 'Masukkan nama kedua pengantin, orang tua, jadwal Akad Nikah, Resepsi, titik Google Maps, dan kisah cinta Anda.',
      icon: Edit3,
      color: '#283D52',
      detail: 'Tersedia pilihan 5 bahasa otomatis tanpa repot translate',
    },
    {
      step: '03',
      title: 'Unggah Foto & Nomor Rekening',
      desc: 'Atur foto prewedding resolusi tinggi untuk frame arch pembuka, galeri kenangan, serta rekening bank & QRIS tanda kasih.',
      icon: ImagePlus,
      color: '#DFBFC1',
      detail: 'Mendukung BCA, Mandiri, BRI, BNI & QRIS Nasional',
    },
    {
      step: '04',
      title: 'Sebar Link Personalisasi Tamu',
      desc: 'Buat link undangan unik untuk masing-masing tamu secara instan, siap dibagikan ke WhatsApp dengan salam santun otomatis.',
      icon: Share2,
      color: '#C2A56B',
      detail: 'Nama tamu otomatis tercetak elegan di layar cover',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F7F2EA] relative overflow-hidden">
      {/* Subtle Background Geometry */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFCF7] border border-[#C2A56B]/40 text-xs font-semibold uppercase tracking-[0.2em] text-[#C2A56B] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alur Praktis & Cepat</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#283D52] tracking-tight">
            Buat Undangan Digital Impian Hanya dalam 4 Langkah
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#768692] font-sans">
            Kelola seluruh konten undangan secara mandiri lewat dasbor studio yang intuitif, cepat, dan responsif.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl p-7 bg-[#FFFCF7] border border-[#C2A56B]/30 hover:border-[#C2A56B] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                {/* Step Number Watermark */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F2EA] border border-[#C2A56B]/40 flex items-center justify-center text-[#283D52] group-hover:scale-110 group-hover:text-[#C2A56B] transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="font-heading font-black text-3xl text-[#C2A56B]/30 group-hover:text-[#C2A56B]/60 transition-colors">
                    {item.step}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-bold text-[#283D52] mb-2.5 group-hover:text-[#C2A56B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#768692] leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C2A56B]/20 flex items-start gap-2 text-xs font-medium text-[#283D52]">
                  <CheckCircle2 className="w-4 h-4 text-[#C2A56B] shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-tight text-[#768692]">{item.detail}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Link
              to="/april-siti"
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-[#C2A56B]" />
              <span>Eksplorasi Undangan Nyata April & Siti</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
