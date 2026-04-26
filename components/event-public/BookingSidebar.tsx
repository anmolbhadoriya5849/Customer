"use client";

import { Calendar, Clock, MapPin, Ticket, AlertCircle, Sparkles, Building2 } from "lucide-react";
import { format } from "date-fns";
import { useRouter, useParams, useSearchParams } from "next/navigation";

type BookingEvent = {
  name: string;
  startDate?: string | null;
  city?: string | null;
  venueName?: string | null;
};

// hi there

export function BookingSidebar({
  event,
  minPrice,
  mode,
}: {
  event: BookingEvent;
  minPrice: number;
  mode: string;
}) {
   const adjustedDate = event.startDate ? new Date(new Date(event.startDate).getTime() - 5.5 * 60 * 60 * 1000) : null;
   const formattedDate = adjustedDate ? format(adjustedDate, "EEEE, dd MMMM yyyy") : "TBA";
   const formattedTime = adjustedDate ? format(adjustedDate, "h:mm a") : "TBA";

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const eventId = params.eventId as string;
  const distributorId = searchParams.get("d");

  const isDistributor = mode === "distributor";
  const isPreview = mode === "preview";
  const checkoutParams = new URLSearchParams();

  if (distributorId) {
    checkoutParams.set("d", distributorId);
  }

  if (isDistributor) {
    checkoutParams.set("mode", "distributor");
  }

  const checkoutHref = checkoutParams.toString()
    ? `/events/${eventId}/sell?${checkoutParams.toString()}`
    : `/events/${eventId}/sell`;

    const GST_RATE = 0.18; // 18% GST
    const platformFee = Math.round(minPrice * 0.05);
    const adjustedMinPrice = Math.round(minPrice + platformFee + (platformFee * GST_RATE));

  return (
    <div className="relative w-full z-10 p-6 sm:p-8 font-sans">
       {/* Subtle background glow inside the card */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[40px] rounded-full pointer-events-none" />

       <div className="relative z-10">
         
         {/* Price Section */}
         <div className="flex items-start justify-between mb-8">
            <div>
               <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1.5">
                 Tickets from
               </p>
               <div className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent leading-none">
                 ₹{adjustedMinPrice.toLocaleString()}
               </div>
               <p className="text-xs text-slate-500 mt-2 font-medium">Inclusive of all taxes and fees</p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold tracking-widest uppercase text-cyan-400">
               Live Event
            </div>
         </div>

         <hr className="border-white/5 my-6" />
         
         {/* Meta Details List */}
         <div className="flex flex-col gap-5 mb-8">
            
            <div className="flex items-start gap-4">
               <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5 text-cyan-400">
                  <Calendar className="w-5 h-5" />
               </div>
               <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">Date</div>
                  <div className="text-base font-bold text-white leading-none">{formattedDate}</div>
               </div>
            </div>

            <div className="flex items-start gap-4">
               <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5 text-blue-400">
                  <Clock className="w-5 h-5" />
               </div>
               <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">Time</div>
                  <div className="text-base font-bold text-white leading-none">{formattedTime} Onwards</div>
               </div>
            </div>

            <div className="flex items-start gap-4">
               <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5 text-violet-400">
                  <Building2 className="w-5 h-5" />
               </div>
               <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">Venue</div>
                  <div className="text-base font-bold text-white leading-none truncate">{event.venueName || "Venue TBA"}</div>
                  <div className="text-xs text-slate-400 mt-1 truncate">{event.city}</div>
               </div>
            </div>

         </div>

         {/* DYNAMIC BUTTON BASED ON MODE */}
         <div>
            {isPreview ? (
               <button disabled className="w-full py-4 rounded-2xl bg-white/[0.05] border border-white/10 text-slate-400 font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                  <AlertCircle className="w-5 h-5" /> Preview Mode
               </button>
            ) : isDistributor ? (
               <button onClick={() => router.push(checkoutHref)} className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(6,182,212,0.3)] transition-all hover:-translate-y-0.5 active:scale-95 border-0">
                  <Ticket className="w-5 h-5" /> Sell Passes Now
               </button>
            ) : (
               <button onClick={() => router.push(checkoutHref)} className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(6,182,212,0.3)] transition-all hover:-translate-y-0.5 active:scale-95 border-0">
                  <Ticket className="w-5 h-5" /> Book Tickets
               </button>
            )}
         </div>
       </div>
    </div>
  );
}