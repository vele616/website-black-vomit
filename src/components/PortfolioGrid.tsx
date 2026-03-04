"use client";

import Image from "next/image";
import { type TouchEvent, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Masonry, MasonryItem } from "@/components/custom/masonry";
import { artworks } from "@/data/artworks";
import type { ArtworkItem } from "@/types/artworks";
import { FocusTrap } from "focus-trap-react";

export function PortfolioGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedArtwork: ArtworkItem | null =
    selectedIndex !== null ? artworks[selectedIndex] : null;

  const portraitFallbacks = ["4 / 5", "3 / 4", "5 / 7"];
  const squareFallbacks = ["1 / 1", "6 / 7"];
  const landscapeFallbacks = ["7 / 5", "3 / 2"];
  const touchStartX = useRef<number | null>(null);
  const textFadeInDelayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const swipeThreshold = 50;
  const [swipeAnimationClass, setSwipeAnimationClass] = useState("translate-x-0");
  const [textAnimationClass, setTextAnimationClass] = useState("opacity-100");
  const [textTransitionClass, setTextTransitionClass] = useState(
    "transition-opacity duration-[1000ms] ease-out",
  );

  const showPreviousArtwork = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) {
        return null;
      }

      return (current - 1 + artworks.length) % artworks.length;
    });
  }, []);

  const showNextArtwork = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) {
        return null;
      }

      return (current + 1) % artworks.length;
    });
  }, []);

  const animateSwipeTransition = useCallback((direction: "previous" | "next") => {
    const leavingClass =
      direction === "next" ? "-translate-x-full" : "translate-x-full";
    const enteringClass =
      direction === "next" ? "translate-x-full" : "-translate-x-full";

    setSwipeAnimationClass(leavingClass);
    setTextTransitionClass("transition-none");
    setTextAnimationClass("opacity-0");

    if (textFadeInDelayTimeoutRef.current) {
      clearTimeout(textFadeInDelayTimeoutRef.current);
    }

    setTimeout(() => {
      if (direction === "next") {
        showNextArtwork();
      } else {
        showPreviousArtwork();
      }

      setSwipeAnimationClass(enteringClass);
      setTextTransitionClass("transition-none");
      setTextAnimationClass("opacity-0");

      textFadeInDelayTimeoutRef.current = setTimeout(() => {
        setTextTransitionClass("transition-opacity duration-[1000ms] ease-out");
        requestAnimationFrame(() => {
          setTextAnimationClass("opacity-100");
        });
      }, 500);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSwipeAnimationClass("translate-x-0");
        });
      });
    }, 200);
  }, [showNextArtwork, showPreviousArtwork]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX;

    if (touchEndX === undefined) {
      touchStartX.current = null;
      return;
    }

    const deltaX = touchEndX - touchStartX.current;

    if (Math.abs(deltaX) >= swipeThreshold) {
      if (deltaX > 0) {
        animateSwipeTransition("previous");
      } else {
        animateSwipeTransition("next");
      }
    }

    touchStartX.current = null;
  };

  useEffect(() => {
    document.body.style.overflow = selectedArtwork ? "hidden" : "";
  }, [selectedArtwork]);

  useEffect(() => {
    return () => {
      if (textFadeInDelayTimeoutRef.current) {
        clearTimeout(textFadeInDelayTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!selectedArtwork) {
      return;
    }
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSwipeAnimationClass("translate-x-0");
        setTextTransitionClass("transition-none");
        setTextAnimationClass("opacity-100");
        if (textFadeInDelayTimeoutRef.current) {
          clearTimeout(textFadeInDelayTimeoutRef.current);
        }
        setSelectedIndex(null);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        animateSwipeTransition("previous");
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        animateSwipeTransition("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedArtwork, animateSwipeTransition]);

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
                      onClick={() => {
                        setSwipeAnimationClass("translate-x-0");
                        setTextTransitionClass("transition-none");
                        setTextAnimationClass("opacity-100");
                        if (textFadeInDelayTimeoutRef.current) {
                          clearTimeout(textFadeInDelayTimeoutRef.current);
                        }
                        setSelectedIndex(index);
                      }}
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
        <FocusTrap>
          <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => {
              setSwipeAnimationClass("translate-x-0");
              setTextTransitionClass("transition-none");
              setTextAnimationClass("opacity-100");
              if (textFadeInDelayTimeoutRef.current) {
                clearTimeout(textFadeInDelayTimeoutRef.current);
              }
              setSelectedIndex(null);
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`Artwork: ${selectedArtwork.title}`}
          >
            <button
              className="absolute right-4 top-4 z-10 text-white/70 transition-colors hover:text-white"
              onClick={() => {
                setSwipeAnimationClass("translate-x-0");
                setTextTransitionClass("transition-none");
                setTextAnimationClass("opacity-100");
                if (textFadeInDelayTimeoutRef.current) {
                  clearTimeout(textFadeInDelayTimeoutRef.current);
                }
                setSelectedIndex(null);
              }}
              aria-label="Close lightbox"
            >
              <X className="h-7 w-7" />
            </button>
            <button
              className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/30 bg-black/40 p-2 text-white/80 backdrop-blur transition-colors duration-200 hover:bg-white hover:text-black md:block"
              onClick={(event) => {
                event.stopPropagation();
                animateSwipeTransition("previous");
              }}
              aria-label="Previous artwork"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/30 bg-black/40 p-2 text-white/80 backdrop-blur transition-colors duration-200 hover:bg-white hover:text-black md:block"
              onClick={(event) => {
                event.stopPropagation();
                animateSwipeTransition("next");
              }}
              aria-label="Next artwork"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            <div
              className="flex max-h-[90vh] max-w-5xl flex-col items-center gap-6 md:flex-row"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative max-h-[75vh] flex-1 overflow-hidden">
                <div
                  className={`transition-transform duration-300 ease-in-out ${swipeAnimationClass}`}
                >
                  <Image
                    src={selectedArtwork.src}
                    alt={selectedArtwork.alt}
                    width={900}
                    height={1200}
                    className="max-h-[75vh] w-auto object-contain"
                    sizes="90vw"
                  />
                </div>
              </div>
              <div
                className={`shrink-0 text-center md:w-52 md:text-left ${textTransitionClass} ${textAnimationClass}`}
              >
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
        </FocusTrap>
      )}
    </>
  );
}
