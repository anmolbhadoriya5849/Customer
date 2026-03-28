import { Loader2, Ticket } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#0A0C10] flex flex-col items-center justify-center p-6 font-sans">

            {/* Background glow to match the premium vibe */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col items-center gap-6 relative z-10">
                <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-cyan-500/5 border border-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                    {/* The spinning ring */}
                    <Loader2 className="w-10 h-10 text-cyan-400 animate-spin absolute" />
                    {/* The static ticket in the middle */}
                    <Ticket className="w-5 h-5 text-cyan-500/50" />
                </div>

                <div className="flex flex-col items-center gap-2 text-center">
                    <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
                        Wait To Buy Tickets of Your Favourite Event
                    </h2>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">
                        Secure Connection
                    </p>
                </div>
            </div>

        </div>
    );
}