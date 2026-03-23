import Image from "next/image";
import { ImageOff } from "lucide-react";

export function HeroBanner({ poster }: { poster?: string | null }) {
  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800 group">
      {poster ? (
        <>
           <Image
            src={poster}
            alt="Event Poster"
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            priority
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          {/* Enhanced Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
          
          {/* Subtle border glow effect */}
          <div className="absolute inset-0 border-2 border-white/5 rounded-2xl pointer-events-none" />
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 gap-3 bg-gradient-to-br from-gray-900 to-gray-800">
           <div className="p-4 bg-gray-800/50 rounded-2xl border border-white/5">
             <ImageOff className="w-12 h-12 opacity-50" />
           </div>
           <span className="text-sm font-semibold">No Poster Available</span>
        </div>
      )}
    </div>
  );
}