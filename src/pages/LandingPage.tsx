import React, { useState, useEffect } from 'react';
import { LandingHeader } from '../components/landing/LandingHeader';
import { LandingHero } from '../components/landing/LandingHero';
import { LandingFeatures } from '../components/landing/LandingFeatures';
import { LandingInvitationSnippet } from '../components/landing/LandingInvitationSnippet';
import { LandingMultiLangShowcase } from '../components/landing/LandingMultiLangShowcase';
import { LandingTemplatesGallery } from '../components/landing/LandingTemplatesGallery';
import { LandingHowItWorks } from '../components/landing/LandingHowItWorks';
import { LandingFAQAndCTA } from '../components/landing/LandingFAQAndCTA';
import { LandingFooter } from '../components/landing/LandingFooter';
import { AdminLoginModal } from '../components/admin/AdminLoginModal';

export const LandingPage: React.FC = () => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Global keyboard shortcut for PC: Ctrl + Shift + A, Cmd + Shift + A, Alt + Shift + A
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const isAKey = e.key.toLowerCase() === 'a' || e.code === 'KeyA';
      const isCtrlShift = (e.ctrlKey || e.metaKey) && e.shiftKey && isAKey;
      const isAltShift = e.altKey && e.shiftKey && isAKey;

      if (isCtrlShift || isAltShift) {
        e.preventDefault();
        setIsAdminModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    document.title = 'KU UNDANG — Platform Undangan Pernikahan Digital Elegan & Modern';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F2EA] text-[#283D52] font-sans antialiased selection:bg-[#C2A56B]/30 selection:text-[#283D52]">
      {/* Top Navigation */}
      <LandingHeader onOpenAdminLogin={() => setIsAdminModalOpen(true)} />

      {/* Main Sections */}
      <main>
        {/* 1. Hero with Live Personal Invitation Simulator & Arch Mockup */}
        <LandingHero />

        {/* 2. Key Features of KU UNDANG */}
        <LandingFeatures />

        {/* 3. Interactive Snippet / Live Invitation Breakdown */}
        <LandingInvitationSnippet />

        {/* 4. Multilingual 5-Language Live Showcase */}
        <LandingMultiLangShowcase />

        {/* 5. Custom SVG Illustration & Template Aesthetics */}
        <LandingTemplatesGallery />

        {/* 6. How it Works (4 Steps) */}
        <LandingHowItWorks />

        {/* 7. FAQ Accordion & Big Invitation CTA */}
        <LandingFAQAndCTA onOpenAdminLogin={() => setIsAdminModalOpen(true)} />
      </main>

      {/* Footer with Secret & Mobile Disguised Login Triggers */}
      <LandingFooter onOpenAdminLogin={() => setIsAdminModalOpen(true)} />

      {/* Secret / Camouflaged Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};
