"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import type { SlideImage } from "yet-another-react-lightbox";
import { Masonry, MasonryItem } from "@/components/custom/masonry";
import { artworks } from "@/data/artworks";

interface ArtworkSlide extends SlideImage {
  title: string;
  medium: string;
  year: string;
}

function LightboxMetadata({
  title,
  medium,
  year,
  delayMs,
  className,
}: {
  title: string;
  medium: string;
  year: string;
  delayMs: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delayMs, title, medium, year]);

  return (
    <div
      className={`text-center transition-opacity duration-[1400ms] ease-out md:text-left ${className ?? ""} ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <h2 className="text-xl font-medium text-white">{title}</h2>
      <p className="mt-1 text-sm text-white/60">{medium}</p>
      <p className="mt-0.5 text-sm text-white/60">{year}</p>
    </div>
  );
}

export function PortfolioGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const swipeTransitionDurationMs = 650;
  const metadataFadeBufferMs = 100;

  const portraitFallbacks = ["4 / 5", "3 / 4", "5 / 7"];
  const squareFallbacks = ["1 / 1", "6 / 7"];
  const landscapeFallbacks = ["7 / 5", "3 / 2"];

  const slides: ArtworkSlide[] = useMemo(
    () =>
      artworks.map((artwork) => ({
        src: artwork.src,
        alt: artwork.alt,
        width: artwork.width,
        height: artwork.height,
        title: artwork.title,
        medium: artwork.medium,
        year: artwork.year,
      })),
    [],
  );

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const getTabOrderButtons = () => {
      const closeButton = document.querySelector<HTMLButtonElement>(
        '.yarl__button[aria-label="Close"]',
      );
      const previousButton = document.querySelector<HTMLButtonElement>(
        '.yarl__button[aria-label="Previous"]',
      );
      const nextButton = document.querySelector<HTMLButtonElement>(
        '.yarl__button[aria-label="Next"]',
      );

      const candidates = [closeButton, previousButton, nextButton].filter(
        (button): button is HTMLButtonElement =>
          button !== null && !button.disabled && button.offsetParent !== null,
      );

      for (const button of candidates) {
        button.tabIndex = 0;
      }

      return candidates;
    };

    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const portal = document.querySelector<HTMLElement>(".yarl__portal_open");

      if (!portal) {
        return;
      }

      const tabOrderButtons = getTabOrderButtons().filter((button) =>
        portal.contains(button),
      );

      if (tabOrderButtons.length === 0) {
        return;
      }

      event.preventDefault();

      const active = document.activeElement as HTMLElement | null;
      const activeIndex = tabOrderButtons.findIndex((button) => button === active);

      if (activeIndex === -1) {
        const initialTarget = event.shiftKey
          ? tabOrderButtons[tabOrderButtons.length - 1]
          : tabOrderButtons[0];
        initialTarget.focus();
        return;
      }

      const nextIndex = event.shiftKey
        ? (activeIndex - 1 + tabOrderButtons.length) % tabOrderButtons.length
        : (activeIndex + 1) % tabOrderButtons.length;

      tabOrderButtons[nextIndex]?.focus();
    };

    document.addEventListener("keydown", keydownHandler, true);

    return () => {
      document.removeEventListener("keydown", keydownHandler, true);
    };
  }, [selectedIndex]);

  return (
    <>
      <section className="relative overflow-hidden bg-background py-10 lg:py-12">
        <div className="relative mx-auto max-w-350 px-4 pb-12 pt-0 lg:px-10">
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
                      className="group relative w-full cursor-pointer overflow-hidden bg-card shadow-sm"
                      style={{ aspectRatio }}
                      onClick={() => setSelectedIndex(index)}
                      aria-label={`View ${artwork.title}`}
                    >
                      <Image
                        src={artwork.src}
                        alt={artwork.alt}
                        fill
                        className="h-auto w-full object-cover"
                        sizes="(max-width: 640px) 94vw, (max-width: 1024px) 70vw, (max-width: 1400px) 48vw, 33vw"
                      />
                      <div className="pointer-events-none absolute inset-0 flex items-end bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-100 transition-opacity duration-[1100ms] ease-out sm:opacity-0 sm:group-hover:opacity-100">
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
      </section>
      <Lightbox
        open={selectedIndex !== null}
        index={selectedIndex ?? 0}
        close={closeLightbox}
        slides={slides}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          },
          button: {
            padding: "4px",
          },
        }}
        render={{
          slide: ({ slide, offset }) => {
            const artworkSlide = slide as ArtworkSlide;

            return (
              <div className="flex h-full w-full items-center justify-center px-4">
                <div className="flex max-h-[90vh] max-w-5xl flex-col items-center gap-6 md:flex-row">
                  <div className="relative max-h-[75vh] overflow-hidden">
                    <Image
                      src={artworkSlide.src}
                      alt={artworkSlide.alt ?? ""}
                      width={artworkSlide.width ?? 1200}
                      height={artworkSlide.height ?? 1200}
                      className="max-h-[75vh] w-auto max-w-full object-contain"
                      sizes="90vw"
                    />
                  </div>
                  <div className="w-full shrink-0 md:w-52">
                    {offset === 0 ? (
                      <LightboxMetadata
                        key={`${artworkSlide.src}-${selectedIndex ?? -1}`}
                        title={artworkSlide.title}
                        medium={artworkSlide.medium}
                        year={artworkSlide.year}
                        delayMs={swipeTransitionDurationMs + metadataFadeBufferMs}
                        className="w-full"
                      />
                    ) : (
                      <div className="invisible w-full text-center md:text-left" aria-hidden="true">
                        <h2 className="text-xl font-medium">{artworkSlide.title}</h2>
                        <p className="mt-1 text-sm">{artworkSlide.medium}</p>
                        <p className="mt-0.5 text-sm">{artworkSlide.year}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          },
        }}
        animation={{ swipe: swipeTransitionDurationMs }}
        carousel={{ finite: false }}
        on={{
          view: ({ index }) => {
            setSelectedIndex((current) => (current === index ? current : index));
          },
        }}
      />
    </>
  );
}
