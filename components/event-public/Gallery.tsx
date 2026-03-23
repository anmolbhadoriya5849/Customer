import Image from "next/image";
import { ImageIcon } from "lucide-react";

export function Gallery({ images }: { images: string[] }) {
  return (
    <section className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
          <ImageIcon className="w-6 h-6 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Gallery</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <div 
            key={i} 
            className="relative h-48 w-full rounded-xl overflow-hidden border border-white/10 group cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300"
          >
             <Image
                src={img}
                alt={`Gallery Image ${i + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 50vw, 25vw"
             />
             {/* Overlay with gradient */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
             
             {/* Image number indicator */}
             <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               {i + 1}/{images.length}
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}