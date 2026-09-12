import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Star, Instagram } from 'lucide-react';
import { Couple } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';

interface Persona5StatusSectionProps {
  bride: Couple;
  groom: Couple;
}

export const Persona5StatusSection: React.FC<Persona5StatusSectionProps> = ({ bride, groom }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');

  const defaultGroomSkills = [
    { name: 'Enduring Love', type: 'PASSIVE', desc: 'Meningkatkan kesabaran dan keikhlasan menghadapi setiap liku kehidupan.' },
    { name: 'Sacred Vow', type: 'SUPPORT', desc: 'Melindungi keharmonisan rumah tangga dengan fondasi syariat dan komitmen suci.' },
    { name: 'Graceful Heart', type: 'BUFF', desc: 'Memberikan ketenangan dan senyuman tulus di segala suasana.' },
    { name: 'Eternal Bond', type: 'SPECIAL', desc: 'Mengikat janji seumur hidup hingga ke surga-Nya.' },
  ];

  const defaultBrideSkills = [
    { name: 'Gentle Grace', type: 'PASSIVE', desc: 'Membawa keteduhan, kelembutan tutur kata, dan kasih sayang yang mendalam.' },
    { name: 'Patience Shield', type: 'SUPPORT', desc: 'Menghalau keraguan dengan kesetiaan dan ketulusan hati tiada batas.' },
    { name: 'Joyful Radiance', type: 'BUFF', desc: 'Menebar kebahagiaan dan kehangatan dalam keluarga tercinta.' },
    { name: 'Infinite Devotion', type: 'SPECIAL', desc: 'Sumpah setia mendampingi dalam suka maupun duka selamanya.' },
  ];

  const p5Translations = t.p5;
  const currentPerson = activeTab === 'groom' ? groom : bride;
  const currentSkills =
    activeTab === 'groom'
      ? p5Translations?.groomSkills || defaultGroomSkills
      : p5Translations?.brideSkills || defaultBrideSkills;

  const arcanaName = activeTab === 'groom' ? 'IV. THE EMPEROR' : 'III. THE EMPRESS';
  const codename = activeTab === 'groom' ? 'JOKER' : 'QUEEN';
  const roleTitle =
    activeTab === 'groom'
      ? p5Translations?.groomRole || t.theGroom || 'PENGANTIN PRIA'
      : p5Translations?.brideRole || t.theBride || 'PENGANTIN WANITA';

  // Social stats labels localized
  const statLabelsByLang: Record<string, string[]> = {
    ID: ['CHARM (PESONA)', 'KNOWLEDGE (PENGETAHUAN)', 'GUTS (KEBERANIAN)', 'PROFICIENCY (KEMAHIRAN)', 'KINDNESS (KASIH SAYANG)'],
    JW: ['CHARM (PANCAWARNA)', 'KNOWLEDGE (KAWRUH)', 'GUTS (KANDEGING MANAH)', 'PROFICIENCY (KASAMPURNAN)', 'KINDNESS (WELAS ASIH)'],
    EN: ['CHARM (CHARISMA)', 'KNOWLEDGE (WISDOM)', 'GUTS (COURAGE)', 'PROFICIENCY (SKILL)', 'KINDNESS (COMPASSION)'],
    JP: ['魅力 (CHARM)', '知識 (KNOWLEDGE)', '度胸 (GUTS)', '器用さ (PROFICIENCY)', '優しさ (KINDNESS)'],
    CN: ['魅力 (CHARM)', '知识 (KNOWLEDGE)', '胆量 (GUTS)', '灵巧 (PROFICIENCY)', '体贴 (KINDNESS)'],
  };
  const statLabels = statLabelsByLang[language] || statLabelsByLang.ID;

  return (
    <section id="p5-couple" className="py-20 sm:py-28 bg-[#0D0D0D] text-[#FFFFFF] relative overflow-hidden border-t-4 border-[#E60012]">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(45deg, #E60012 25%, transparent 25%), linear-gradient(-45deg, #E60012 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #E60012 75%), linear-gradient(-45deg, transparent 75%, #E60012 75%)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E60012] text-[#FFFFFF] text-xs font-black uppercase tracking-[0.2em] -skew-x-12 mb-3">
            <Star className="w-3.5 h-3.5 fill-[#FFF000] text-[#FFF000] skew-x-12" />
            <span className="skew-x-12">
              {p5Translations?.statusHeader || 'PHANTOM THIEVES STATUS ARCHIVE'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight text-[#FFFFFF]">
            {p5Translations?.statusArchive ? (
              p5Translations.statusArchive
            ) : (
              <>PROFILE & <span className="text-[#E60012] not-italic">STATUS SCREEN</span></>
            )}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#FFFFFF]/70 mt-2">
            {p5Translations?.statusSubtitle || 'Mempelai Pengantin dalam Arsip Persona 5 // Level 99 Confidant MAX'}
          </p>
        </div>

        {/* Character Switcher Tabs */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('groom')}
            className={`px-6 sm:px-8 py-3 font-black text-sm uppercase tracking-wider transition-all cursor-pointer -skew-x-6 border-2 ${
              activeTab === 'groom'
                ? 'bg-[#E60012] text-white border-white shadow-[6px_6px_0px_0px_#FFFFFF]'
                : 'bg-[#1A1A1E] text-[#FFFFFF]/70 border-white/20 hover:border-[#E60012]'
            }`}
          >
            <span className="skew-x-6 inline-block">
              {groom.nickname} // {p5Translations?.groomRole || t.theGroom || 'GROOM'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bride')}
            className={`px-6 sm:px-8 py-3 font-black text-sm uppercase tracking-wider transition-all cursor-pointer -skew-x-6 border-2 ${
              activeTab === 'bride'
                ? 'bg-[#E60012] text-white border-white shadow-[6px_6px_0px_0px_#FFFFFF]'
                : 'bg-[#1A1A1E] text-[#FFFFFF]/70 border-white/20 hover:border-[#E60012]'
            }`}
          >
            <span className="skew-x-6 inline-block">
              {bride.nickname} // {p5Translations?.brideRole || t.theBride || 'BRIDE'}
            </span>
          </button>
        </div>

        {/* Character Status Screen Card */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === 'groom' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#141418] border-4 border-[#FFFFFF] p-6 sm:p-8 shadow-[12px_12px_0px_0px_#E60012] -skew-x-1 relative"
        >
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-white/20">
            <div className="flex items-center gap-3">
              <span className="bg-[#E60012] text-white px-3 py-1 text-xs font-black uppercase tracking-widest -skew-x-6 border border-white">
                CODENAME: {codename}
              </span>
              <span className="bg-[#FFF000] text-black px-2.5 py-1 text-xs font-mono font-black uppercase tracking-wider skew-x-6">
                ARCANA: {arcanaName}
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#FFF000] font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E60012] animate-ping" />
              <span>STATUS: LEVEL 99 [MAX]</span>
            </div>
          </div>

          {/* Main Grid: Photo & Biography + Stats */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 mt-6">
            {/* Photo & Identity Box */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative aspect-[4/5] bg-black border-4 border-[#E60012] overflow-hidden -skew-x-2 shadow-lg group">
                <img
                  src={
                    currentPerson.photo_url ||
                    (activeTab === 'groom'
                      ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800'
                      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800')
                  }
                  alt={currentPerson.full_name}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] font-mono text-[#FFF000] uppercase tracking-widest font-bold">
                    {roleTitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase italic">
                    {currentPerson.full_name}
                  </h3>
                </div>
              </div>

              {/* Parents Lineage Details */}
              <div className="bg-black/60 border border-white/20 p-4 text-xs font-mono text-left space-y-1.5">
                <p className="text-[#FFF000] font-bold uppercase tracking-wider">
                  {p5Translations?.familyLineage || 'SILSILAH KELUARGA:'}
                </p>
                <p className="text-white">
                  {currentPerson.child_order || (activeTab === 'groom' ? t.sonOf : t.daughterOf)}:
                </p>
                <p className="text-white font-bold text-sm">
                  {currentPerson.father_name} & {currentPerson.mother_name}
                </p>
                <p className="text-[#FFFFFF]/70 text-[11px] pt-1 border-t border-white/10">
                  {currentPerson.description}
                </p>
              </div>

              {/* Instagram link */}
              {currentPerson.instagram && (
                <a
                  href={`https://instagram.com/${currentPerson.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#E60012] hover:bg-[#FF0019] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors border border-white -skew-x-6"
                >
                  <Instagram className="w-3.5 h-3.5 skew-x-6" />
                  <span className="skew-x-6">@{currentPerson.instagram}</span>
                </a>
              )}
            </div>

            {/* Persona 5 Radar / Attributes & Skills */}
            <div className="md:col-span-7 space-y-6 text-left">
              {/* Parameter Pentagram Simulation */}
              <div className="bg-black border-2 border-white/30 p-5 -skew-x-2">
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#FFF000] font-bold">
                  <span>★ SOCIAL STATS (PENTAGRAM MAX):</span>
                  <span className="text-white">RANK 5 / RANK 5</span>
                </div>

                <div className="space-y-2.5">
                  {statLabels.map((label, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-36 sm:w-44 text-[11px] font-mono font-bold text-white uppercase truncate">
                        {label}
                      </span>
                      <div className="flex-1 h-3 bg-[#222228] border border-white/20 overflow-hidden relative">
                        <div
                          className="h-full bg-gradient-to-r from-[#E60012] to-[#FFF000]"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#FFF000] w-14 text-right">
                        MAX 99
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipped Skills List */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono text-[#FFF000] font-bold uppercase">
                  <Zap className="w-4 h-4 text-[#FFF000]" />
                  <span>{p5Translations?.skillsTitle || 'DAFTAR KEAHLIAN / PASSIVE SKILLS:'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-[#1C1C22] border-2 border-[#E60012]/60 hover:border-[#E60012] p-3 -skew-x-2 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black uppercase text-white tracking-wide">
                          {skill.name}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#E60012] text-white uppercase font-bold">
                          {skill.type}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-[#FFFFFF]/70 leading-snug">
                        {skill.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
