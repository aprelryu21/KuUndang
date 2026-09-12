import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { weddingService } from '../../services/weddingService';
import { Invitation } from '../../types/wedding';
import {
  Heart,
  Users,
  CheckCircle2,
  XCircle,
  MessageSquareHeart,
  Calendar,
  Plus,
  ExternalLink,
  Edit3,
  Copy,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminDashboardPage: React.FC = () => {
  const { showToast } = useToast();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [stats, setStats] = useState({
    totalInvitations: 1,
    totalGuests: 5,
    totalRSVPs: 4,
    attending: 4,
    notAttending: 0,
    totalAttendanceCount: 11,
    totalWishes: 4,
  });
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    weddingService.init();
    const invs = await weddingService.getAllInvitations();
    setInvitations(invs);

    const st = await weddingService.getStats();
    setStats(st);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#283D52]">
            Dashboard Studio
          </h1>
          <p className="text-xs sm:text-sm text-[#768692] mt-0.5">
            Ringkasan status undangan digital, rekap tamu hadir, dan doa restu.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/invitations"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Kelola Undangan</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Invitations */}
        <div className="p-5 rounded-3xl bg-[#FFFCF7] border border-[#283D52]/10 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#768692]">
              Total Undangan
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#283D52]/10 flex items-center justify-center text-[#283D52]">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 font-heading text-3xl font-bold text-[#283D52]">
            {stats.totalInvitations}
          </p>
          <p className="mt-1 text-[11px] text-[#768692]">Templat aktif dalam sistem</p>
        </div>

        {/* Total Guests */}
        <div className="p-5 rounded-3xl bg-[#FFFCF7] border border-[#283D52]/10 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#768692]">
              Daftar Tamu
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#C2A56B]/20 flex items-center justify-center text-[#C2A56B]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 font-heading text-3xl font-bold text-[#283D52]">
            {stats.totalGuests}
          </p>
          <p className="mt-1 text-[11px] text-[#768692]">Tamu terdaftar dengan kode unik</p>
        </div>

        {/* Total Attending Guests */}
        <div className="p-5 rounded-3xl bg-[#FFFCF7] border border-[#283D52]/10 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#768692]">
              Konfirmasi Hadir
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 font-heading text-3xl font-bold text-[#283D52]">
            {stats.attending}{' '}
            <span className="text-xs font-normal text-[#768692]">
              ({stats.totalAttendanceCount} orang)
            </span>
          </p>
          <p className="mt-1 text-[11px] text-[#768692]">
            {stats.notAttending} tamu berhalangan hadir
          </p>
        </div>

        {/* Total Wishes */}
        <div className="p-5 rounded-3xl bg-[#FFFCF7] border border-[#283D52]/10 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#768692]">
              Doa & Ucapan
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#DFBFC1]/40 flex items-center justify-center text-[#283D52]">
              <MessageSquareHeart className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 font-heading text-3xl font-bold text-[#283D52]">
            {stats.totalWishes}
          </p>
          <p className="mt-1 text-[11px] text-[#768692]">Ucapan tersimpan di guestbook</p>
        </div>
      </div>

      {/* Invitations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#283D52]">Undangan Pernikahan</h2>
            <p className="text-xs text-[#768692]">
              Pilih undangan untuk mengubah konten, tema, atau mengelola tamu
            </p>
          </div>
          <Link
            to="/admin/invitations"
            className="text-xs font-semibold text-[#C2A56B] hover:text-[#283D52] flex items-center gap-1"
          >
            <span>Lihat Semua</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {invitations.map((inv) => (
            <div
              key={inv.id}
              className="bg-[#FFFCF7] rounded-3xl border border-[#283D52]/10 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      inv.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : inv.status === 'draft'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    {inv.status}
                  </span>

                  <span className="text-xs text-[#768692] flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#C2A56B]" />
                    {inv.wedding_date}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-[#283D52]">
                  {inv.title}
                </h3>
                <p className="text-xs text-[#768692] mt-1">
                  URL Publik: <code className="text-[#283D52] font-mono">/{inv.slug}</code>
                </p>

                <div className="mt-4 pt-4 border-t border-[#EFE8DE] flex items-center gap-4 text-xs text-[#768692]">
                  <span>Mempelai: <strong className="text-[#24313A]">{inv.groom_nickname} & {inv.bride_nickname}</strong></span>
                  <span>•</span>
                  <span>Tema: <strong className="text-[#24313A]">{inv.theme_config?.font_heading || 'Luxury Whimsical'}</strong></span>
                </div>
              </div>

              <div className="px-6 py-4 bg-[#F7F2EA] border-t border-[#283D52]/10 flex items-center justify-between gap-2">
                <Link
                  to={`/admin/invitations/${inv.id}/edit`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Konten</span>
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/preview/${inv.id}`}
                    target="_blank"
                    className="p-2 rounded-xl bg-[#FFFCF7] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-[#283D52] text-xs font-medium transition-colors"
                    title="Pratinjau Undangan"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <a
                    href={`/${inv.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-[#FFFCF7] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-xs font-medium text-[#283D52] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Buka Publik</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
