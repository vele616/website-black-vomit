"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { Masonry, MasonryItem } from "@/components/custom/masonry";
import { artworks } from "@/data/artworks";
import type { ArtworkItem } from "@/types/artworks";

export function PortfolioGrid() {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkItem | null>(
    null,
  );
  const portraitFallbacks = ["4 / 5", "3 / 4", "5 / 7"];
  const squareFallbacks = ["1 / 1", "6 / 7"];
  const landscapeFallbacks = ["7 / 5", "3 / 2"];

  return (
    <>
      <section className="relative overflow-hidden bg-background">
        <div className="relative mx-auto max-w-350 px-4 pb-12 pt-16 lg:px-10">
          <div className="mt-10">
            <Masonry
              columnWidth={420}
              maxColumnCount={3}
              gap={{ column: 24, row: 24 }}
              className="min-h-[60vh]"
            >
              {artworks.map((artwork, index) => {
                const aspectRatioFallback =
                  artwork.aspectRatio === "square"
                    ? squareFallbacks[index % squareFallbacks.length]
                    : artwork.aspectRatio === "landscape"
                      ? landscapeFallbacks[index % landscapeFallbacks.length]
                      : portraitFallbacks[index % portraitFallbacks.length];
                const aspectRatio =
                  artwork.aspectRatioValue ?? aspectRatioFallback;

                return (
                  <MasonryItem
                    key={`${artwork.title}-${index}`}
                    className="focus:cursor-pointer"
                    asChild
                  >
                    <button
                      className="group relative w-full overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                      style={{ aspectRatio }}
                      onClick={() => setSelectedArtwork(artwork)}
                      aria-label={`View ${artwork.title}`}
                    >
                        <Image
                          src={artwork.src}
                          alt={artwork.alt}
                          fill
                          className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 94vw, (max-width: 1024px) 70vw, (max-width: 1400px) 48vw, 33vw"
                        />
                        <div className="pointer-events-none absolute inset-0 flex items-end bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                          <div className="p-4 text-left">
                            <p className="text-sm font-medium text-white">
                              {artwork.title}
                            </p>
                            <p className="text-xs text-white/70">
                              {artwork.medium}
                            </p>
                            <p className="text-xs text-white/60">
                              {artwork.year}
                            </p>
                          </div>
                        </div>
                    </button>
                  </MasonryItem>
                );
              })}
            </Masonry>
          </div>
        </div>
      </section>
      {selectedArtwork && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedArtwork(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Artwork: ${selectedArtwork.title}`}
        >
          <button
            className="absolute right-4 top-4 z-10 text-white/70 transition-colors hover:text-white"
            onClick={() => setSelectedArtwork(null)}
            aria-label="Close lightbox"
          >
            <X className="h-7 w-7" />
          </button>
          <div
            className="flex max-h-[90vh] max-w-5xl flex-col items-center gap-6 md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh] flex-1 overflow-hidden">
              <Image
                src={selectedArtwork.src}
                alt={selectedArtwork.alt}
                width={900}
                height={1200}
                className="max-h-[75vh] w-auto object-contain"
                sizes="90vw"
              />
            </div>
            <div className="shrink-0 text-center md:w-52 md:text-left">
              <h2 className="text-xl font-medium text-white">
                {selectedArtwork.title}
              </h2>
              <p className="mt-1 text-sm text-white/60">
                {selectedArtwork.medium}
              </p>
              <p className="mt-0.5 text-sm text-white/60">
                {selectedArtwork.year}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
