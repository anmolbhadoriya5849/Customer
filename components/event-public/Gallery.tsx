"use client";

import Image from "next/image";
import { ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export function Gallery({ images }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImage = (index: number) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length
    );
  }, [images.length]);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeImage();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden"; // prevent background scroll

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, goNext, goPrev]);

  return (
    <>
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => openImage(i)}
              className="relative h-48 w-full rounded-xl overflow-hidden border border-zinc-800 group cursor-pointer shadow-sm hover:border-zinc-600 transition-colors bg-zinc-950"
            >
              <Image
                src={img}
                alt={`Gallery Image ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-zinc-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 right-3 bg-zinc-950/80 backdrop-blur-sm text-zinc-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-sm">
                {i + 1}/{images.length}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIGHTBOX MODAL ── */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeImage}
        >
          {/* Close button */}
          <button
            onClick={closeImage}
            className="absolute top-5 right-5 z-10 p-2 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 text-zinc-300 text-xs font-semibold px-3 py-1.5 rounded-full">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* Prev button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 z-10 p-3 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Main Image */}
          <div
            className="relative w-full max-w-5xl mx-16 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt={`Gallery Image ${selectedIndex + 1}`}
              fill
              className="object-contain rounded-xl"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 z-10 p-3 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 rounded-2xl max-w-[90vw] overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                  className={`relative h-12 w-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${i === selectedIndex
                      ? "border-cyan-400 opacity-100 scale-105"
                      : "border-zinc-700 opacity-50 hover:opacity-80"
                    }`}
                >
                  <Image src={img} alt={`Thumb ${i + 1}`} fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}