import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { FullInvitationData, Guest, SectionKey, SectionSetting } from '../types/wedding';
import { weddingService } from '../services/weddingService';
import { OpeningCover } from '../components/public-wedding/OpeningCover';
import { FloatingMusicPlayer } from '../components/public-wedding/FloatingMusicPlayer';
import { PersonalGreeting } from '../components/public-wedding/PersonalGreeting';
import { HeroSection } from '../components/public-wedding/HeroSection';
import { CountdownSection } from '../components/public-wedding/CountdownSection';
import { CoupleSection } from '../components/public-wedding/CoupleSection';
import { EventsSection } from '../components/public-wedding/EventsSection';
import { LocationSection } from '../components/public-wedding/LocationSection';
import { StorySection } from '../components/public-wedding/StorySection';
import { GallerySection } from '../components/public-wedding/GallerySection';
import { RSVPSection } from '../components/public-wedding/RSVPSection';
import { WishesSection } from '../components/public-wedding/WishesSection';
import { GiftSection } from '../components/public-wedding/GiftSection';
import { ClosingSection } from '../components/public-wedding/ClosingSection';
import { FloatingNav } from '../components/public-wedding/FloatingNav';
import { Persona5WeddingView } from '../components/templates/persona5/Persona5WeddingView';
import { JavaneseWeddingView } from '../components/templates/javanese/JavaneseWeddingView';
import { CuteFloralWeddingView } from '../components/templates/cute-floral/CuteFloralWeddingView';
import { MarioWeddingView } from '../components/templates/mario/MarioWeddingView';
import { FleurBotanicaWeddingView } from '../components/templates/fleur-botanica/FleurBotanicaWeddingView';
import { RpgTamanWeddingView } from '../components/templates/rpg-taman/RpgTamanWeddingView';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import { AdminLoginModal } from '../components/admin/AdminLoginModal';
import { Heart, ArrowLeft, Eye, RefreshCw } from 'lucide-react';

interface PublicWeddingPageProps {
  isPreview?: boolean;
}

export const PublicWeddingPage: React.FC<PublicWeddingPageProps> = ({ isPreview = false }) => {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();
  const [searchParams] = useSearchParams();
  const guestCode = searchParams.get('to');
  const navigate = useNavigate();

  const [data, setData] = useState<FullInvitationData | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [guestName, setGuestName] = useState('');
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [musicStarted, setMusicStarted] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Global keyboard shortcut to open Admin Login Modal (Ctrl + Shift + A or Cmd + Shift + A or Alt + Shift + A)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const isAKey = (e.key || '').toLowerCase() === 'a' || e.code === 'KeyA';
      const isCtrlShift = (e.ctrlKey || e.metaKey) && e.shiftKey && isAKey;
      const isAltShift = e.altKey && e.shiftKey && isAKey;
      const isCtrlAlt = e.ctrlKey && e.altKey && isAKey;

      if (isCtrlShift || isAltShift || isCtrlAlt) {
        e.preventDefault();
        setIsAdminModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Load invitation data
  const loadData = async () => {
    setLoading(true);
    weddingService.init();

    let fullData: FullInvitationData | null = null;
    const rawKey = id || slug;
    const targetKey = rawKey ? decodeURIComponent(rawKey).trim() : null;

    if (targetKey) {
      // 1. Try by ID first
      fullData = await weddingService.getInvitationById(targetKey);

      // 2. If not found, try by Slug
      if (!fullData) {
        fullData = await weddingService.getInvitationBySlug(targetKey);
      }

      // 3. If still not found, check all local & remote invitations for slug/title/id match
      if (!fullData) {
        const allInvs = await weddingService.getAllInvitations();
        const matched = allInvs.find(
          (inv) =>
            inv.id.toLowerCase() === targetKey.toLowerCase() ||
            inv.slug.toLowerCase() === targetKey.toLowerCase()
        );
        if (matched) {
          fullData = await weddingService.getFullInvitationData(matched.id, matched);
        }
      }
    } else {
      // No targetKey provided (e.g. visiting /preview directly)
      // Pick the latest user-created invitation, or fallback to demo
      const allInvs = await weddingService.getAllInvitations();
      const userCreatedInv = allInvs.find(
        (inv) => inv.id !== 'inv-demo-1' && inv.slug !== 'april-siti'
      );
      if (userCreatedInv) {
        fullData = await weddingService.getFullInvitationData(userCreatedInv.id, userCreatedInv);
      } else {
        fullData = await weddingService.getInvitationBySlug('april-siti');
      }
    }

    if (fullData) {
      setData(fullData);

      // Dynamic document title
      document.title = `${fullData.invitation.groom_nickname} & ${fullData.invitation.bride_nickname} — Wedding Invitation`;

      // Check for guest code ?to=...
      if (guestCode) {
        const matchedGuest = await weddingService.getGuestByCode(fullData.invitation.id, guestCode);
        if (matchedGuest) {
          setGuest(matchedGuest);
          setGuestName(matchedGuest.name);
          localStorage.setItem('wedding_guest_name', matchedGuest.name);
        }
      } else {
        // Retrieve last stored guest name from localStorage
        const storedName = localStorage.getItem('wedding_guest_name');
        if (storedName) {
          setGuestName(storedName);
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    window.scrollTo(0, 0);

    // Ensure clean URL without leftover #hashes like #pilihan-tema
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [slug, id, isPreview, guestCode]);

  // Handle open invitation
  const handleOpenInvitation = async (enteredName: string) => {
    const finalName = enteredName || guestName || 'Tamu Terhormat';
    setGuestName(finalName);
    localStorage.setItem('wedding_guest_name', finalName);

    if (data && guestCode) {
      await weddingService.markGuestOpened(data.invitation.id, guestCode);
    }

    setIsCoverOpen(false);
    setMusicStarted(true);
  };

  const handleBackToCover = () => {
    setIsCoverOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F2EA] text-[#283D52]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#C2A56B] border-t-transparent animate-spin" />
          <div className="font-heading text-xl tracking-widest uppercase text-[#283D52]">
            Loading Invitation...
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F7F2EA] text-[#24313A] text-center">
        <div className="w-16 h-16 rounded-full bg-[#DFBFC1]/30 flex items-center justify-center mb-4 text-[#283D52]">
          <Heart className="w-8 h-8 text-[#DFBFC1] fill-[#DFBFC1]" />
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl text-[#283D52] font-semibold">
          404 — Invitation Not Found
        </h1>
        <p className="mt-3 text-sm text-[#768692] max-w-md">
          Undangan yang Anda cari mungkin telah diarsipkan, belum dipublikasikan, atau URL telah berubah.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate('/april-siti')}
            className="px-5 py-2.5 rounded-xl bg-[#283D52] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider shadow-sm hover:bg-[#1E2E3E] transition-colors"
          >
            Buka Undangan Demo
          </button>
          <Link
            to="/admin"
            className="px-5 py-2.5 rounded-xl bg-[#FFFCF7] border border-[#283D52]/20 text-[#283D52] text-xs font-semibold uppercase tracking-wider hover:bg-[#EFE8DE] transition-colors"
          >
            Admin Studio
          </Link>
        </div>
      </div>
    );
  }

  const { invitation, bride, groom, events, stories, gallery, gifts, sections, wishes } = data;
  const theme = invitation.theme_config;

  // Custom CSS variables style applied to root
  const themeStyle = {
    '--color-primary': theme?.primary_color || '#283D52',
    '--color-accent': theme?.accent_color || '#C2A56B',
    '--color-background': theme?.background_color || '#F7F2EA',
    '--color-secondary-bg': theme?.secondary_bg || '#EFE8DE',
    '--color-text': theme?.text_color || '#24313A',
    '--color-muted': theme?.muted_color || '#768692',
    '--color-gold': theme?.gold_color || '#C2A56B',
    '--color-blush': theme?.blush_color || '#DFBFC1',
  } as React.CSSProperties;

  // Ensure location section exists in list if not already present
  const allSections = [...sections];
  if (!allSections.some((s) => s.section_key === 'location')) {
    const eventsIndex = allSections.findIndex((s) => s.section_key === 'events');
    const locationSection: SectionSetting = {
      id: 'sec-location-auto',
      invitation_id: invitation.id,
      section_key: 'location',
      title: 'Alamat & Lokasi Acara',
      subtitle: 'Petunjuk arah navigasi Google Maps menuju lokasi acara',
      enabled: true,
      sort_order: eventsIndex !== -1 ? allSections[eventsIndex].sort_order + 0.5 : 6.5,
    };
    allSections.push(locationSection);
  }

  // Sort sections by sort_order
  const sortedSections = allSections
    .filter((s) => s.enabled && s.section_key !== 'cover')
    .sort((a, b) => a.sort_order - b.sort_order);

  // Render individual sections according to admin order & enabled status
  const renderSection = (sec: SectionSetting) => {
    switch (sec.section_key) {
      case 'greeting':
        return (
          <PersonalGreeting
            key="greeting"
            guestName={guestName}
            greetingText={invitation.greeting_text}
          />
        );
      case 'hero':
        return <HeroSection key="hero" invitation={invitation} />;
      case 'countdown':
        return <CountdownSection key="countdown" weddingDate={invitation.wedding_date} />;
      case 'couple':
        return <CoupleSection key="couple" bride={bride} groom={groom} section={sec} />;
      case 'events':
        return <EventsSection key="events" events={events} invitation={invitation} section={sec} />;
      case 'location':
        return <LocationSection key="location" events={events} section={sec} />;
      case 'story':
        return <StorySection key="story" stories={stories} section={sec} />;
      case 'gallery':
        return <GallerySection key="gallery" gallery={gallery} section={sec} />;
      case 'rsvp':
        return (
          <RSVPSection
            key="rsvp"
            invitationId={invitation.id}
            defaultGuestName={guestName}
            guestId={guest?.id}
            section={sec}
            onRSVPSubmitted={loadData}
          />
        );
      case 'wishes':
        return (
          <WishesSection
            key="wishes"
            wishes={wishes}
            invitationId={invitation.id}
            defaultGuestName={guestName}
            section={sec}
            onWishAdded={loadData}
          />
        );
      case 'gifts':
        return <GiftSection key="gifts" gifts={gifts} section={sec} />;
      case 'closing':
        return <ClosingSection key="closing" invitation={invitation} onBackToCover={handleBackToCover} />;
      default:
        return null;
    }
  };

  // Check template: query parameter override (?template=cute-pink-floral or ?template=javanese-royal or ?template=persona-5) or database setting
  const templateQuery = searchParams.get('template');
  const normalizedQuery =
    templateQuery === 'javanese-royal' || templateQuery === 'jawa' || templateQuery === 'adat-jawa'
      ? 'javanese-royal'
      : templateQuery === 'persona-5' || templateQuery === 'persona-3'
      ? 'persona-5'
      : templateQuery === 'cute-pink-floral' ||
        templateQuery === 'cute-pink' ||
        templateQuery === 'cute' ||
        templateQuery === 'pastel-pop' ||
        templateQuery === 'pink'
      ? 'cute-pink-floral'
      : templateQuery === 'super-mario' ||
        templateQuery === 'mario' ||
        templateQuery === '8bit' ||
        templateQuery === 'pixel'
      ? 'super-mario'
      : templateQuery === 'fleur-botanica' ||
        templateQuery === 'botanica' ||
        templateQuery === 'botanical' ||
        templateQuery === 'fleur' ||
        templateQuery === 'fleur-de-brume'
      ? 'fleur-botanica'
      : templateQuery === 'seri-malaysia' ||
        templateQuery === '2d-rpg-taman' ||
        templateQuery === 'rpg-taman' ||
        templateQuery === '2d-rpg' ||
        templateQuery === 'taman' ||
        templateQuery === 'malaysia' ||
        templateQuery === 'laman-seri' ||
        templateQuery === 'garden-quest' ||
        templateQuery === 'pixel-quest'
      ? 'seri-malaysia'
      : templateQuery;

  const activeTemplate =
    normalizedQuery ||
    invitation.template_id ||
    (data as any).theme?.template_id ||
    (data as any).template_id ||
    'royal-arch';

  // Render 2D RPG Taman (Interactive 2D Wedding Garden Quest) Template
  if (activeTemplate === 'seri-malaysia') {
    return (
      <div className="relative min-h-screen bg-[#1A1015]">
        {/* Admin Preview Mode Floating Bar */}
        {isPreview && (
          <div className="fixed top-0 inset-x-0 z-50 bg-[#4C030A] text-[#D7BB83] border-b border-[#D7BB83]/40 px-4 py-2 flex items-center justify-between text-xs shadow-md font-serif">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#D7BB83]" />
              <span>
                PREVIEW [2D RPG TAMAN WEDDING QUEST] — {invitation.title} ({(invitation.status || 'published').toUpperCase()})
              </span>
            </div>
            <Link
              to={`/admin/invitations/${invitation.id}/edit`}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#D7BB83] text-[#4C030A] rounded-md font-serif font-bold text-[11px] hover:bg-[#C4A76E] transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Pengaturan Undangan</span>
            </Link>
          </div>
        )}

        <RpgTamanWeddingView
          data={data}
          guest={guest}
          guestName={guestName}
          isPreview={isPreview}
          onRefreshData={loadData}
        />
      </div>
    );
  }

  // Render Fleur Botanica (Modern Botanical Conservatory) Template
  if (activeTemplate === 'fleur-botanica') {
    return (
      <div className="relative min-h-screen bg-[#FAF8F5]">
        {/* Admin Preview Mode Floating Bar */}
        {isPreview && (
          <div className="fixed top-0 inset-x-0 z-50 bg-[#293522] text-[#BDA06C] border-b border-[#BDA06C]/40 px-4 py-2 flex items-center justify-between text-xs shadow-md font-serif">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#BDA06C]" />
              <span>
                PREVIEW [FLEUR BOTANICA CONSERVATORY] — {invitation.title} ({(invitation.status || 'published').toUpperCase()})
              </span>
            </div>
            <Link
              to={`/admin/invitations/${invitation.id}/edit`}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#BDA06C] text-[#293522] rounded-md font-serif font-bold text-[11px] hover:bg-[#A88B57] transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Pengaturan Undangan</span>
            </Link>
          </div>
        )}

        <FleurBotanicaWeddingView
          data={data}
          guest={guest}
          guestName={guestName}
          isPreview={isPreview}
          onRefreshData={loadData}
        />
      </div>
    );
  }

  // Render Super Mario 8-Bit Platformer Template
  if (activeTemplate === 'super-mario') {
    return (
      <div className="relative min-h-screen bg-[#5C94FC]">
        {/* Admin Preview Mode Floating Bar */}
        {isPreview && (
          <div className="fixed top-0 inset-x-0 z-50 bg-[#283D52] text-[#FFE082] border-b-2 border-white px-4 py-2 flex items-center justify-between text-xs shadow-md font-mono">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#FFD166]" />
              <span>
                PREVIEW [TEMA 8-BIT SUPER MARIO PLATFORMER] — {invitation.title} ({(invitation.status || 'published').toUpperCase()})
              </span>
            </div>
            <Link
              to={`/admin/invitations/${invitation.id}/edit`}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#E60012] text-white rounded-md font-mono font-bold text-[11px] hover:bg-[#CC0010] transition-colors border border-white"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Pengaturan Undangan</span>
            </Link>
          </div>
        )}

        <MarioWeddingView
          data={data}
          guest={guest}
          guestName={guestName}
          isPreview={isPreview}
          onRefreshData={loadData}
        />
      </div>
    );
  }

  // Render Javanese Royal Heritage Template
  if (activeTemplate === 'javanese-royal') {
    return (
      <div className="relative min-h-screen bg-[#1A1009]">
        {/* Admin Preview Mode Floating Bar */}
        {isPreview && (
          <div className="fixed top-0 inset-x-0 z-50 bg-[#24160E] text-[#FAF6EE] border-b-2 border-[#D4AF37] px-4 py-2 flex items-center justify-between text-xs shadow-md">
            <div className="flex items-center gap-2 font-serif">
              <Eye className="w-4 h-4 text-[#D4AF37]" />
              <span>
                PREVIEW [TEMA ADAT JAWA SAKRAL & GAMELAN] — {invitation.title} ({(invitation.status || 'published').toUpperCase()})
              </span>
            </div>
            <Link
              to={`/admin/invitations/${invitation.id}/edit`}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37] text-[#1A1009] rounded-lg font-serif font-bold text-[11px] hover:bg-[#E5C158] transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Pengaturan Undangan</span>
            </Link>
          </div>
        )}

        <JavaneseWeddingView
          data={data}
          guest={guest}
          guestName={guestName}
          isPreview={isPreview}
          onRefreshData={loadData}
        />
      </div>
    );
  }

  // Render Persona 5 Template
  if (activeTemplate === 'persona-5') {
    return (
      <div className="relative min-h-screen bg-[#0D0D0D]">
        {/* Admin Preview Mode Floating Bar */}
        {isPreview && (
          <div className="fixed top-0 inset-x-0 z-50 bg-[#16161A] text-[#FFFFFF] border-b-2 border-[#E60012] px-4 py-2 flex items-center justify-between text-xs shadow-md">
            <div className="flex items-center gap-2 font-mono">
              <Eye className="w-4 h-4 text-[#FFF000]" />
              <span>
                PREVIEW [PERSONA 5 STYLISTIC TEMPLATE] — {invitation.title} ({(invitation.status || 'published').toUpperCase()})
              </span>
            </div>
            <Link
              to={`/admin/invitations/${invitation.id}/edit`}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#E60012] text-white rounded-none font-mono font-bold text-[11px] hover:bg-[#FF0019] transition-colors -skew-x-6"
            >
              <ArrowLeft className="w-3 h-3 skew-x-6" />
              <span className="skew-x-6">Pengaturan Undangan</span>
            </Link>
          </div>
        )}

        <Persona5WeddingView
          data={data}
          guest={guest}
          guestName={guestName}
          isPreview={isPreview}
          onRefreshData={loadData}
        />
      </div>
    );
  }

  // Render Cute Pink Floral (Pastel Bloom) Template
  if (activeTemplate === 'cute-pink-floral') {
    return (
      <div className="relative min-h-screen bg-[#FFF0F5]">
        {/* Admin Preview Mode Floating Bar */}
        {isPreview && (
          <div className="fixed top-0 inset-x-0 z-50 bg-[#FFE4EC] text-[#4A2E35] border-b-2 border-[#FF85A2] px-4 py-2 flex items-center justify-between text-xs shadow-md">
            <div className="flex items-center gap-2 font-sans font-bold">
              <Eye className="w-4 h-4 text-[#FF5C8D]" />
              <span>
                PREVIEW [TEMA MERAH MUDA CERIA &amp; BUNGA LUCU] — {invitation.title} ({(invitation.status || 'published').toUpperCase()})
              </span>
            </div>
            <Link
              to={`/admin/invitations/${invitation.id}/edit`}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#FF5C8D] text-white rounded-full font-sans font-bold text-[11px] hover:bg-[#E03164] transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Pengaturan Undangan</span>
            </Link>
          </div>
        )}

        <CuteFloralWeddingView
          data={data}
          guest={guest}
          guestName={guestName}
          isPreview={isPreview}
          onRefreshData={loadData}
        />
      </div>
    );
  }

  return (
    <div style={themeStyle} className="relative min-h-screen bg-[#F7F2EA] text-[#24313A]">
      {/* Admin Preview Mode Floating Bar */}
      {isPreview && (
        <div className="fixed top-0 inset-x-0 z-50 bg-[#283D52] text-[#FFFCF7] px-4 py-2 flex items-center justify-between text-xs shadow-md">
          <div className="flex items-center gap-2 font-medium">
            <Eye className="w-4 h-4 text-[#DFBFC1]" />
            <span>MODAL PREVIEW — Undangan: {invitation.title} ({(invitation.status || 'published').toUpperCase()})</span>
          </div>
          <Link
            to={`/admin/invitations/${invitation.id}/edit`}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#FFFCF7] text-[#283D52] rounded-md font-semibold text-[11px] hover:bg-[#DFBFC1] transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Kembali ke Editor</span>
          </Link>
        </div>
      )}

      {/* Opening Fullscreen Cover */}
      <OpeningCover
        invitation={invitation}
        initialGuestName={guestName}
        isOpen={isCoverOpen}
        onOpen={handleOpenInvitation}
        onTriggerAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Language Switcher for Inside Invitation (Top-Right) */}
      {!isCoverOpen && (
        <div
          id="invitation-language-selector"
          className={`fixed right-3 sm:right-6 z-40 transition-all ${
            isPreview ? 'top-14' : 'top-3 sm:top-5'
          }`}
        >
          <LanguageSwitcher theme="light" />
        </div>
      )}

      {/* Main Wedding Content */}
      <main className={`transition-opacity duration-1000 ${isCoverOpen ? 'opacity-0' : 'opacity-100'}`}>
        {sortedSections.map((sec) => renderSection(sec))}
      </main>

      {/* Floating Background Music Player */}
      <FloatingMusicPlayer
        musicUrl={invitation.music_url}
        musicTitle={invitation.music_title}
        musicArtist={invitation.music_artist}
        enabled={invitation.music_enabled}
        autoPlayTrigger={musicStarted}
      />

      {/* Floating Bottom Navigation for Quick Jump */}
      {!isCoverOpen && <FloatingNav enabledKeys={sortedSections.map((s) => s.section_key)} />}

      {/* Secret Admin Login Modal (Triggered by Ctrl+Shift+A or Heart badge) */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};
