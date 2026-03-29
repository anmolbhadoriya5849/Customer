import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { HeroBanner } from "@/components/event-public/HeroBanner";
import { AboutEvent } from "@/components/event-public/AboutEvent";
import { Gallery } from "@/components/event-public/Gallery";
import { BookingSidebar } from "@/components/event-public/BookingSidebar";
import {
  Calendar,
  MapPin,
  Mic2,
  Ticket,
  ArrowLeft,
  Clock,
  Building2,
} from "lucide-react";

type EventCategory = { price: number };

type EventArtist = {
  name: string;
  role?: string | null;
  image?: string | null;
};

type EventDetails = {
  name: string;
  posterUrl?: string | null;
  description?: string | null;
  startDate: string;
  city?: string | null;
  venueName?: string | null;
  categories?: EventCategory[];
  artists?: EventArtist[];
  galleryImages?: string[];
};

export default async function EventPage({
  params,
  searchParams,
}: {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ mode?: string; d?: string }>;
}) {
  const { mode = "public" } = await searchParams;
  const { eventId } = await params;

  let event: EventDetails | null = null;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/eventManager/events/${eventId}`,
      { withCredentials: true }
    );
    event = res.data.event;
  } catch {
    return <ErrorScreen message="Event not found or failed to load." />;
  }

  if (!event) return <ErrorScreen message="Event not found." />;

  const minPrice =
    event.categories && event.categories.length > 0
      ? Math.min(...event.categories.map((c) => c.price))
      : 0;

  const formattedDate = new Date(event.startDate).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = new Date(event.startDate).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-[#0A0C10] font-sans selection:bg-cyan-500/30">

      {/* Enables smooth scrolling for the "Book Now" anchor link */}
      <style>{`html { scroll-behavior: smooth; }`}</style>

      {/* ── AMBIENT BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      {/* ── RACING STRIPE ── */}
      <div className="h-[3px] w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 relative z-50 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />

      {/* ── TOP NAV ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0A0C10]/80 backdrop-blur-2xl border-b border-white/5 shadow-sm">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>
        <div className="text-2xl font-extrabold tracking-tight bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
          PassX
        </div>
        {/* Mobile ticket price pill */}
        <div className="lg:hidden bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 text-xs font-bold text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
          ₹{minPrice}+
        </div>
      </nav>

{/* ════════════════════════════════════════
          MOBILE HERO — Full-bleed cinematic
      ════════════════════════════════════════ */}
      <div className="lg:hidden relative w-full aspect-[16/9] min-h-[250px] bg-[#0A0C10] flex items-center justify-center overflow-hidden pt-16 pb-4">
        {event.posterUrl ? (
          <>
            {/* 1. Ambient Background Blur */}
            <Image 
              src={event.posterUrl} 
              alt={`${event.name} ambient`} 
              fill 
              className="object-cover blur-2xl opacity-50 scale-125 z-0" 
              priority 
            />
            {/* 2. Uncropped Crisp Foreground */}
            <Image 
              src={event.posterUrl} 
              alt={event.name} 
              fill 
              className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10 p-4" 
              priority 
            />
            {/* Bottom protection gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent z-20 pointer-events-none" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-[#0A0C10] flex items-center justify-center">
            <Ticket className="w-10 h-10 text-cyan-500/30" />
          </div>
        )}
        {/* Notice: I removed the overlapping text block here so the bottom sponsors stay 100% visible. 
            The mobile title is already handled perfectly in the main content grid below. */}
      </div>

      {/* ════════════════════════════════════════
          DESKTOP HERO — Cinematic full-width (Wide Banner Style)
      ════════════════════════════════════════ */}
      <div className="hidden lg:block relative w-full h-[60vh] min-h-[500px] max-h-[700px] overflow-hidden bg-[#0A0C10]">
        {event.posterUrl ? (
          <>
            {/* 1. MASSIVE BLURRED BACKGROUND: Fills the screen with the poster's colors */}
            <Image 
              src={event.posterUrl} 
              alt={`${event.name} ambient background`} 
              fill 
              className="object-cover blur-[80px] opacity-40 scale-110 z-0" 
              priority 
            />
            
            {/* 2. CRISP CENTERED BANNER: Shows the wide banner perfectly without cropping */}
            <div className="absolute inset-0 flex items-center justify-center max-w-7xl mx-auto px-12 pb-24 pt-12 z-10">
              <div className="relative w-full h-full">
                <Image 
                  src={event.posterUrl} 
                  alt={event.name} 
                  fill 
                  className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]" 
                  priority 
                />
              </div>
            </div>

            {/* 3. GRADIENTS: Ensures the desktop text at the bottom is perfectly readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/60 to-transparent z-10 pointer-events-none" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-[#0A0C10]" />
        )}

        {/* Desktop hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-12 pb-12 max-w-7xl mx-auto w-full z-20">
          <EyebrowLabel text="Live Experience" />
          <h1 className="text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mt-4 mb-6 drop-shadow-2xl max-w-4xl">
            {event.name}
          </h1>
          <div className="flex flex-wrap gap-3">
            <MetaPill icon={<Calendar className="w-4 h-4 text-cyan-400" />} text={formattedDate} large />
            <MetaPill icon={<Clock className="w-4 h-4 text-cyan-400" />} text={formattedTime} large />
            {event.city && <MetaPill icon={<MapPin className="w-4 h-4 text-cyan-400" />} text={event.city} large />}
            {event.venueName && <MetaPill icon={<Building2 className="w-4 h-4 text-cyan-400" />} text={event.venueName} large />}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          MAIN CONTENT GRID
      ════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-8 pt-8 pb-[140px] lg:pb-24 items-start">

          {/* ── LEFT / CONTENT COLUMN ── */}
          <div className="flex flex-col gap-6 w-full">

            {/* Mobile title block */}
            <div className="lg:hidden bg-white/[0.02] border border-white/5 rounded-3xl p-6">
              <EyebrowLabel text="Live Experience" />
              <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight mt-3">
                {event.name}
              </h1>
              <div className="flex flex-wrap gap-2 mt-4">
                <MetaPill icon={<Calendar className="w-3.5 h-3.5 text-cyan-400" />} text={formattedDate} />
                <MetaPill icon={<Clock className="w-3.5 h-3.5 text-cyan-400" />} text={formattedTime} />
                {event.city && <MetaPill icon={<MapPin className="w-3.5 h-3.5 text-cyan-400" />} text={event.city} />}
              </div>
            </div>

            {/* About */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8">
              <AboutEvent description={event.description} />
            </div>

            {/* Artist Lineup */}
            {event.artists && event.artists.length > 0 && (
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8">
                <SectionHeader icon={<Mic2 className="w-5 h-5 text-violet-400" />} title="Artist Lineup" count={event.artists.length} accent="violet" />
                <div className="grid grid-cols-2 min-[480px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                  {event.artists.map((artist, i) => (
                    <div key={i} className="group flex flex-col items-center text-center bg-white/[0.02] border border-white/5 hover:border-violet-500/30 hover:bg-white/[0.04] p-5 rounded-2xl transition-all cursor-default hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(139,92,246,0.1)]">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white/10 group-hover:border-violet-400 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all">
                        {artist.image ? (
                          <Image src={artist.image} alt={artist.name} fill className="object-cover" sizes="80px" />
                        ) : (
                          <div className="w-full h-full bg-violet-500/10 flex items-center justify-center">
                            <Mic2 className="w-6 h-6 text-violet-400/50" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-bold text-white mb-1.5 leading-tight">
                        {artist.name}
                      </p>
                      {artist.role && (
                        <span className="text-[9px] font-bold tracking-widest uppercase text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-full px-2.5 py-1">
                          {artist.role}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {event.galleryImages && event.galleryImages.length > 0 && (
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8">
                <SectionHeader icon={<GalleryIcon className="text-cyan-400 w-5 h-5" />} title="Gallery" count={event.galleryImages.length} accent="cyan" />
                <div className="mt-8">
                  <Gallery images={event.galleryImages} />
                </div>
              </div>
            )}

            {/* Venue */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8">
              <SectionHeader icon={<MapPin className="w-5 h-5 text-emerald-400" />} title="Venue" accent="emerald" />

              {/* Map placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-slate-900 to-[#0A0C10] rounded-2xl border border-white/5 mt-6 mb-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                <div className="flex flex-col items-center gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Map Coming Soon</span>
                </div>
              </div>

              {/* Venue details */}
              <div className="flex flex-col gap-3">
                {event.venueName && (
                  <div className="flex items-start gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                    <Building2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1">Venue</p>
                      <p className="text-sm font-bold text-white">{event.venueName}</p>
                    </div>
                  </div>
                )}
                {event.city && (
                  <div className="flex items-start gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                    <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1">City</p>
                      <p className="text-sm font-bold text-white">{event.city}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT / SIDEBAR COLUMN ── */}
          <div className="lg:sticky lg:top-24 w-full" id="booking-sidebar">
            <div className="bg-[#0A0C10]/95 backdrop-blur-2xl border border-cyan-500/20 rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8),_0_0_40px_rgba(6,182,212,0.1)] relative">
              {/* Card header accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />
              <div className="p-2">
                <BookingSidebar event={event} minPrice={minPrice} mode={mode} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════
          MOBILE STICKY BOTTOM BAR
      ════════════════════════════════════════ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#0A0C10]/95 backdrop-blur-2xl border-t border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-[9px] font-bold tracking-widest uppercase text-slate-400 mb-0.5">Starting From</p>
            <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              ₹{minPrice}
            </p>
          </div>
          <a href="#booking-sidebar" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white text-sm hover:opacity-90 transition-opacity shadow-[0_10px_20px_rgba(6,182,212,0.2)]">
            <Ticket className="w-4 h-4" />
            Book Now
          </a>
        </div>
      </div>

    </div>
  );
}

// ═══════════════════════════════════════════
//  SHARED UI ATOMS
// ═══════════════════════════════════════════

function EyebrowLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-400">
      <span className="block w-6 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
      {text}
    </div>
  );
}

function MetaPill({ icon, text, large }: { icon: React.ReactNode; text: string; large?: boolean }) {
  return (
    <div className={`inline-flex items-center bg-white/[0.05] border border-white/10 backdrop-blur-md rounded-full text-white shrink-0 shadow-sm ${large ? 'gap-2.5 px-4 py-2 text-sm font-semibold' : 'gap-1.5 px-3 py-1.5 text-xs font-medium'}`}>
      {icon}
      <span className="whitespace-nowrap">{text}</span>
    </div>
  );
}

function SectionHeader({ icon, title, accent = "cyan", count }: {
  icon: React.ReactNode;
  title: string;
  accent?: "cyan" | "violet" | "emerald";
  count?: number;
}) {
  const bgColors = {
    cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    violet: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  };
  const colorClass = bgColors[accent];

  return (
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-2xl border flex items-center justify-center ${colorClass}`}>
        {icon}
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight m-0">
        {title}
      </h2>
      {count !== undefined && (
        <span className={`ml-auto px-3 py-1 rounded-full border text-xs font-bold ${colorClass}`}>
          {count}
        </span>
      )}
    </div>
  );
}

function GalleryIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
// added stuff
function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-[#0A0C10] flex items-center justify-center p-6 font-sans">
      <div className="max-w-sm p-8 rounded-3xl border border-red-500/20 bg-red-500/5 text-center backdrop-blur-xl">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <Ticket className="w-5 h-5 text-red-500" />
        </div>
        <p className="text-red-400 font-bold mb-2 text-lg">Something went wrong</p>
        <p className="text-slate-500 text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
}