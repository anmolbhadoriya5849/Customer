'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/lib/useAuth';
import {
  Calendar,
  MapPin,
  Ticket,
  Building2,
  ChevronRight,
  Loader2,
  Sparkles,
  LayoutDashboard,
  LogOut,
  ArrowRight
} from 'lucide-react';

type Event = {
  id: string;
  name: string;
  startDate: string;
  city?: string | null;
  venue?: string | null;
  posterUrl?: string | null;
  organizer?: {
    companyName?: string;
  };
};

function CustomerPublicContent() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API = process.env.NEXT_PUBLIC_API_URL;
  const isAuthenticated = Boolean(user);

  function handleLogin() {
    // Simply redirect to login, then back to home
    router.push('/login?next=/');
  }

  async function handleLogout() {
    try {
      await logout();
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  function handleEventClick(eventId: string) {
    const destination = `/events/${eventId}`;

    if (authLoading) return;

    // If not logged in, send to login and then to the event page
    if (!isAuthenticated) {
      router.push(`/login?next=${encodeURIComponent(destination)}`);
      return;
    }

    // If logged in, just go straight to the event page
    router.push(destination);
  }

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await axios.get(`${API}/distributor/customer/events`);
        setEvents(res.data.events || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [API]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Loading Experiences</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-sm p-8 bg-red-500/5 border border-red-500/10 rounded-3xl backdrop-blur-md">
          <div className="inline-flex p-3 rounded-full bg-red-500/10 text-red-400 mb-2">
            <Ticket className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Unable to Load Events</h3>
          <p className="text-red-300/60 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-24">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Sparkles className="w-3.5 h-3.5" /> Official Box Office
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Upcoming <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
              Experiences
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-md">
            Secure your spot at the most exclusive events, hackathons, and shows happening near you.
          </p>
        </div>

        {/* User Status / Auth Controls Card */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-2 sm:p-2 sm:pl-6 rounded-[2rem] sm:rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-xl shadow-2xl">
          <div className="text-sm font-medium text-slate-300 flex items-center gap-3 w-full sm:w-auto px-4 sm:px-0 pt-4 sm:pt-0">
            <div className={`w-2 h-2 rounded-full ${isAuthenticated ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-slate-600'} animate-pulse`} />
            {authLoading
              ? 'Verifying...'
              : isAuthenticated
                ? <span className="truncate max-w-[150px]">{user?.email}</span>
                : 'Guest Access'}
          </div>

          <div className="flex w-full sm:w-auto gap-2 p-2 sm:p-0">
            {user ? (
              <>
                <button
                  className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/5 py-2.5 px-5 text-sm font-semibold text-white transition-all shadow-sm"
                  onClick={() => router.push('/dashboard')}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => void handleLogout()}
                  className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 rounded-full bg-red-500/10 hover:bg-red-500/20 py-2.5 px-5 text-sm font-semibold text-red-400 transition-all"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                Log In <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Events Grid */}
{/* Events Grid */}
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 rounded-[2.5rem] bg-white/[0.02] border border-white/5 border-dashed">
          <Ticket className="w-12 h-12 text-slate-700 mb-4" />
          <p className="text-slate-400 text-lg font-medium">No upcoming experiences found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((ev) => (
            <div
              key={ev.id}
              onClick={() => handleEventClick(ev.id)}
              className="group flex flex-col bg-[#0A0C10] border border-white/5 rounded-3xl overflow-hidden cursor-pointer hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              {/* ── FIXED POSTER AREA ── */}
              <div className="relative aspect-[4/3] sm:aspect-[4/5] w-full bg-[#050608] overflow-hidden shrink-0">
                {ev.posterUrl ? (
                  <>
                    {/* 1. Ambient Blurred Background */}
                    <Image
                      src={ev.posterUrl}
                      alt={`${ev.name} background`}
                      fill
                      className="object-cover blur-2xl opacity-40 scale-125 transition-transform duration-700 group-hover:scale-[1.35] z-0"
                    />
                    
                    {/* 2. Uncropped Crisp Foreground */}
                    <Image
                      src={ev.posterUrl}
                      alt={ev.name}
                      fill
                      className="object-contain p-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-[1.05] z-10"
                    />
                    
                    {/* Bottom Protection Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent z-20 pointer-events-none" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 gap-3 bg-gradient-to-br from-[#12151c] to-[#0A0C10] z-10">
                    <Ticket className="w-10 h-10 opacity-50" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">No Poster Available</span>
                  </div>
                )}

                {/* Organizer Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-black/50 z-30">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                    {ev.organizer?.companyName ?? 'Organizer'}
                  </span>
                </div>
              </div>

              {/* Card Content Area */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow z-30 relative bg-[#0A0C10]">
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug line-clamp-2 mb-6 group-hover:text-cyan-400 transition-colors">
                  {ev.name}
                </h2>

                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.05] border border-white/5 text-cyan-400 shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-slate-300">{new Date(ev.startDate).toDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.05] border border-white/5 text-violet-400 shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate font-medium text-slate-300">{ev.city || ev.venue || "Phoenix Citadel Mall"}</span>
                  </div>
                </div>

                <div className="w-full py-3.5 px-4 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 text-white text-sm font-bold transition-all flex items-center justify-center gap-2">
                  Get Tickets <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default function CustomerPublicPage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-[#0A0C10]" />}>
      <CustomerPublicContent />
    </Suspense>
  );
}