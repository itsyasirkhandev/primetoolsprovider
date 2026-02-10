"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const feedbackScreenshots = [
  "https://i.postimg.cc/vZsgCBq3/Whats-App-Image-2026-02-10-at-7-06-11-PM.jpg",
  "https://i.postimg.cc/52SYJVT8/Whats-App-Image-2026-02-10-at-7-06-20-PM.jpg",
  "https://i.postimg.cc/vZtgysk7/Whats-App-Image-2026-02-10-at-7-06-21-PM.jpg",
  "https://i.postimg.cc/Sxf24h3G/Whats-App-Image-2026-02-10-at-7-06-22-PM.jpg",
  "https://i.postimg.cc/g2HXpWQq/Whats-App-Image-2026-02-10-at-7-06-22-PM-(1).jpg",
  "https://i.postimg.cc/Z5xBmS2r/Whats-App-Image-2026-02-10-at-7-06-22-PM-(2).jpg",
  "https://i.postimg.cc/fRftsNpC/Whats-App-Image-2026-02-10-at-7-06-23-PM.jpg",
  "https://i.postimg.cc/52SYJVT3/Whats-App-Image-2026-02-10-at-7-06-24-PM.jpg",
  "https://i.postimg.cc/3xF4hTVf/Whats-App-Image-2026-02-10-at-7-06-25-PM.jpg",
  "https://i.postimg.cc/sg4Qzrqw/Whats-App-Image-2026-02-10-at-7-06-25-PM-(1).jpg",
  "https://i.postimg.cc/sg4Qzrqn/Whats-App-Image-2026-02-10-at-7-06-25-PM-(2).jpg",
  "https://i.postimg.cc/nhGjxJgw/Whats-App-Image-2026-02-10-at-7-06-26-PM.jpg",
  "https://i.postimg.cc/52SYJVTR/Whats-App-Image-2026-02-10-at-7-06-28-PM.jpg",
];

export default function FeedbackCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = dir === "left" ? -280 : 280;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative">
        {/* Scroll Buttons - hidden on mobile, shown on larger */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-surface-light border border-border items-center justify-center hover:border-accent/50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-surface-light border border-border items-center justify-center hover:border-accent/50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="scroll-container flex gap-4 overflow-x-auto px-1 py-4 snap-x snap-mandatory"
        >
          {feedbackScreenshots.map((url, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(url)}
              className="flex-shrink-0 snap-center group cursor-pointer"
            >
              <div className="relative w-[200px] h-[360px] md:w-[220px] md:h-[400px] rounded-2xl overflow-hidden border border-border bg-surface-light transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.1)]">
                <Image
                  src={url}
                  alt={`Client feedback screenshot ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="220px"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Scroll hint on mobile */}
        <div className="flex md:hidden justify-center mt-2 gap-1">
          <span className="text-muted text-xs">Swipe to see more</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-light/80 flex items-center justify-center z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="relative w-full max-w-[360px] h-[80vh] rounded-2xl overflow-hidden">
            <Image
              src={selectedImage}
              alt="Feedback screenshot"
              fill
              className="object-contain"
              sizes="360px"
            />
          </div>
        </div>
      )}
    </>
  );
}
