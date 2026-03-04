"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Masonry, MasonryItem } from "@/components/custom/masonry";
import { artworks } from "@/data/artworks";
import Lightbox, { type SlideImage } from "yet-another-react-lightbox";

export function PortfolioGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const portraitFallbacks = ["4 / 5", "3 / 4", "5 / 7"];
  const squareFallbacks = ["1 / 1", "6 / 7"];
  const landscapeFallbacks = ["7 / 5", "3 / 2"];
  const slides = useMemo<SlideImage[]>(
    () =>
      artworks.map((artwork) => ({
        src: artwork.src,
        alt: artwork.alt,
        width: artwork.width,
        height: artwork.height,
        title: artwork.title,
      })),
    [],
  );

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
                      className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                      style={{ aspectRatio }}
                      onClick={() => setSelectedIndex(index)}
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
      <Lightbox
        open={selectedIndex !== null}
        close={() => setSelectedIndex(null)}
        index={selectedIndex ?? 0}
        slides={slides}
        animation={{ fade: 250, swipe: 500 }}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
        on={{ view: ({ index }) => setSelectedIndex(index) }}
      />
    </>
  );
}
