import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Swords, Sparkles, Heart, Instagram, Award, Flame, UserCheck } from 'lucide-react';
import { Couple } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';

interface Persona3StatusSectionProps {
  bride: Couple;
  groom: Couple;
}

export const Persona3StatusSection: React.FC<Persona3StatusSectionProps> = ({
  bride,
  groom,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');

  const characters = {
    groom: {
      role: 'GROOM / PENGANTIN PRIA',
      name: groom.full_name || groom.nickname || 'Mempelai Pria',
      nickname: groom.nickname || 'Groom',
      arcana: 'ARCANA IV: THE EMPEROR',
      persona: 'ORPHEUS OF DEVOTION',
      level: 'LV 99',
      hp: '999 / 999',
      sp: '999 / 999',
      parents: (groom.father_name || groom.mother_name)
        ? `Putra dari Bapak ${groom.father_name || ''} & Ibu ${groom.mother_name || ''}`
        : 'Putra tercinta dari kedua orang tua',
      address: groom.description || 'Kediaman Mempelai Pria',
      instagram: groom.instagram || '',
      photo: groom.photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
      skills: [
        { name: 'Enduring Love', desc: 'Passive: Mengarungi bahtera rumah tangga dengan kesetiaan abadi.' },
        { name: 'Sacred Vow', desc: 'Active: Ijab qabul teguh di hadapan penghulu dan saksi sakral.' },
        { name: 'Family Guardian', desc: 'Support: Melindungi keluarga dan anak keturunan dengan penuh tanggung jawab.' },
        { name: 'Pure Devotion', desc: 'Passive: Membawa restu leluhur dan keberkahan suci.' },
      ],
      stats: [
        { label: 'ST (Kekuatan)', val: 99 },
        { label: 'MA (Cinta)', val: 99 },
        { label: 'EN (Kesabaran)', val: 99 },
        { label: 'AG (Kecekatan)', val: 99 },
        { label: 'LU (Keberkahan)', val: 99 },
      ],
    },
    bride: {
      role: 'BRIDE / PENGANTIN WANITA',
      name: bride.full_name || bride.nickname || 'Mempelai Wanita',
      nickname: bride.nickname || 'Bride',
      arcana: 'ARCANA III: THE EMPRESS',
      persona: 'ISIS OF HARMONY',
      level: 'LV 99',
      hp: '999 / 999',
      sp: '999 / 999',
      parents: (bride.father_name || bride.mother_name)
        ? `Putri dari Bapak ${bride.father_name || ''} & Ibu ${bride.mother_name || ''}`
        : 'Putri tercinta dari kedua orang tua',
      address: bride.description || 'Kediaman Mempelai Wanita',
      instagram: bride.instagram || '',
      photo: bride.photo_url || 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1000&auto=format&fit=crop',
      skills: [
        { name: 'Graceful Heart', desc: 'Passive: Kelembutan budi pekerti yang menyejukkan sanubari.' },
        { name: 'Radiant Haven', desc: 'Support: Menghadirkan ketenteraman baiti jannati di rumah tangga.' },
        { name: 'Endless Empathy', desc: 'Passive: Pendamping setia suka dan duka selamanya.' },
        { name: 'Sidoarjo Grace', desc: 'Passive: Putri kebanggaan trah Balonggarut, Krembung.' },
      ],
      stats: [
        { label: 'ST (Kelembutan)', val: 99 },
        { label: 'MA (Kasih Sayang)', val: 99 },
        { label: 'EN (Ketabahan)', val: 99 },
        { label: 'AG (Keanggunan)', val: 99 },
        { label: 'LU (Kemuliaan)', val: 99 },
      ],
    },
  };

  const current = characters[activeTab];

  return (
    <section id="mempelai" className="py-20 sm:py-28 bg-[#050B18] text-[#F0F8FF] relative overflow-hidden border-t-2 border-[#00D2FF]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#0B1A3D] border border-[#00D2FF] text-xs font-mono font-bold tracking-[0.25em] text-[#00D2FF] mb-3 transform -skew-x-12 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
            <UserCheck className="w-3.5 h-3.5 text-[#FFE600]" />
            <span>PERSONA STATUS & PROFILES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Mempelai Pengantin
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A0C4E2] font-mono">
            // DATA DOSSIER & ARCANA S.E.E.S. SQUAD MEMBERS
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab('groom')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-black tracking-wider uppercase transition-all cursor-pointer transform -skew-x-6 ${
              activeTab === 'groom'
                ? 'bg-[#00D2FF] text-[#050B18] shadow-[0_0_20px_rgba(0,210,255,0.6)]'
                : 'bg-[#0B1A3D] text-[#A0C4E2] hover:text-white border border-[#00D2FF]/40'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>{groom.nickname || 'APRIL'} (GROOM)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bride')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-black tracking-wider uppercase transition-all cursor-pointer transform -skew-x-6 ${
              activeTab === 'bride'
                ? 'bg-[#FFE600] text-[#050B18] shadow-[0_0_20px_rgba(255,230,0,0.6)]'
                : 'bg-[#0B1A3D] text-[#A0C4E2] hover:text-white border border-[#FFE600]/40'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>{bride.nickname || 'SITI'} (BRIDE)</span>
          </button>
        </div>

        {/* Persona 3 Status Screen Card */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-[#081226] border-2 border-[#00D2FF] p-6 sm:p-10 shadow-[0_0_35px_rgba(0,210,255,0.2)] relative overflow-hidden"
        >
          {/* Top Status Header Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#00D2FF]/40 pb-5 mb-8">
            <div>
              <div className="text-xs font-mono font-bold text-[#FFE600] uppercase tracking-widest">
                {current.role} &bull; {current.arcana}
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white font-sans uppercase mt-1">
                {current.name}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-[#0E1E42] border border-[#00D2FF] text-right">
                <span className="text-[10px] font-mono text-[#00D2FF] block">HP</span>
                <span className="text-sm sm:text-base font-mono font-bold text-white">{current.hp}</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[#0E1E42] border border-[#FFE600] text-right">
                <span className="text-[10px] font-mono text-[#FFE600] block">SP</span>
                <span className="text-sm sm:text-base font-mono font-bold text-white">{current.sp}</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[#00D2FF] text-[#050B18] font-mono font-black text-sm">
                {current.level}
              </div>
            </div>
          </div>

          {/* Main Grid: Photo + Persona + Skills & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Photo Frame */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-full max-w-[280px] rounded-2xl overflow-hidden border-2 border-[#00D2FF] shadow-lg bg-[#050B18] group">
                <div className="aspect-3/4">
                  <img
                    src={current.photo}
                    alt={current.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 bg-[#0B1A3D] border-t border-[#00D2FF]/40 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D2FF] block font-bold">
                    SUMMONED PERSONA
                  </span>
                  <span className="text-xs font-mono font-black text-[#FFE600]">
                    {current.persona}
                  </span>
                </div>
              </div>

              {/* Instagram link */}
              {current.instagram && (
                <a
                  href={`https://instagram.com/${current.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B1A3D] hover:bg-[#00D2FF] hover:text-[#050B18] border border-[#00D2FF] text-xs font-mono font-bold text-[#00D2FF] transition-all cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@{current.instagram.replace('@', '')}</span>
                </a>
              )}
            </div>

            {/* Middle Col: Dossier & Persona Skills */}
            <div className="lg:col-span-5 space-y-6">
              {/* Bio & Origins */}
              <div className="p-4 rounded-xl bg-[#0E1E42] border border-[#00D2FF]/30 space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#FFE600] font-bold">
                  // ORIGIN & LINEAGE
                </div>
                <p className="text-xs sm:text-sm font-sans text-white font-medium">
                  {current.parents}
                </p>
                <p className="text-xs font-sans text-[#A0C4E2]">
                  {current.address}
                </p>
              </div>

              {/* Persona Skill Tree */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#00D2FF] uppercase tracking-wider mb-3">
                  <span>EQUIPPED WEDDING SKILLS</span>
                  <Flame className="w-3.5 h-3.5 text-[#FFE600]" />
                </div>
                <div className="space-y-2.5">
                  {current.skills.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#060D1F] border border-[#00D2FF]/30 hover:border-[#FFE600] transition-colors"
                    >
                      <div className="text-xs font-mono font-black text-[#FFE600]">
                        {s.name}
                      </div>
                      <div className="text-[11px] font-sans text-[#A0C4E2] mt-0.5">
                        {s.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Persona Attribute Parameters */}
            <div className="lg:col-span-3 p-4 rounded-xl bg-[#0E1E42] border border-[#00D2FF]/40 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#FFE600] uppercase tracking-wider border-b border-[#00D2FF]/30 pb-2">
                <span>PARAMETERS</span>
                <span>MAX 99</span>
              </div>

              <div className="space-y-3">
                {current.stats.map((st, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-[#D0E2F5]">
                      <span>{st.label}</span>
                      <span className="font-bold text-[#FFE600]">{st.val}</span>
                    </div>
                    <div className="w-full h-2 rounded-xs bg-[#050B18] overflow-hidden border border-[#00D2FF]/40">
                      <div
                        className="h-full bg-gradient-to-r from-[#00D2FF] to-[#FFE600] rounded-xs"
                        style={{ width: `${st.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center text-[10px] font-mono text-[#00D2FF]/80">
                STATUS: READY FOR THE SACRED VOW
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
