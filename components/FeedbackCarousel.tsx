"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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
  const scrollRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Check scroll position to show/hide navigation buttons
  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  // Scroll function
  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = dir === "left" ? -280 : 280;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  // Mouse wheel scroll support
  const handleWheel = useCallback((e: React.WheelEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    
    // Only handle horizontal scroll when mouse is over the carousel
    // Prevent vertical scrolling when horizontal scrolling is possible
    if (e.deltaY !== 0) {
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "smooth" });
    } else if (e.deltaX !== 0) {
      e.preventDefault();
      el.scrollBy({ left: e.deltaX, behavior: "smooth" });
    }
  }, []);

  // Drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust multiplier for faster/slower drag
    el.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const el = scrollRef.current;
    if (el) {
      el.style.cursor = "grab";
      el.style.userSelect = "";
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    const el = scrollRef.current;
    if (el) {
      el.style.cursor = "grab";
      el.style.userSelect = "";
    }
  };

  // Touch swipe support
  const [touchStart, setTouchStart] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;
    el.scrollLeft += diff;
    setTouchStart(touchEnd);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        scroll("left");
        break;
      case "ArrowRight":
        e.preventDefault();
        scroll("right");
        break;
      case "Home":
        e.preventDefault();
        el.scrollTo({ left: 0, behavior: "smooth" });
        break;
      case "End":
        e.preventDefault();
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
        break;
    }
  };

  // Update current index based on scroll position
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    
    // Calculate which item is most visible
    const itemWidth = 220 + 16; // width + gap
    const newIndex = Math.round(el.scrollLeft / itemWidth);
    setCurrentIndex(Math.max(0, Math.min(newIndex, feedbackScreenshots.length - 1)));
  }, [checkScroll]);

  // Navigate to specific slide
  const goToSlide = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const itemWidth = 220 + 16;
    el.scrollTo({ left: index * itemWidth, behavior: "smooth" });
    setCurrentIndex(index);
  };

  // Navigate in lightbox
  const navigateLightbox = (direction: "prev" | "next") => {
    const currentIndex = feedbackScreenshots.indexOf(selectedImage!);
    if (direction === "prev") {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : feedbackScreenshots.length - 1;
      setSelectedImage(feedbackScreenshots[newIndex]);
    } else {
      const newIndex = currentIndex < feedbackScreenshots.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(feedbackScreenshots[newIndex]);
    }
  };

  // Lightbox keyboard navigation
  const handleLightboxKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSelectedImage(null);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      navigateLightbox("prev");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      navigateLightbox("next");
    }
  };

  return (
    <>
      <div 
        className="relative"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client feedback screenshots carousel"
      >
        {/* Scroll Buttons - hidden on mobile, shown on larger */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            aria-label="Previous feedback screenshots"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-surface-light border border-border items-center justify-center hover:border-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            aria-label="Next feedback screenshots"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-surface-light border border-border items-center justify-center hover:border-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {/* Scroll Container */}
        <ul
          ref={scrollRef}
          className="scroll-container flex gap-4 overflow-x-auto px-1 py-4 snap-x snap-mandatory list-none m-0 cursor-grab active:cursor-grabbing"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          role="list"
          tabIndex={0}
          aria-live="polite"
          aria-atomic="true"
        >
          {feedbackScreenshots.map((url, i) => (
            <li
              key={i}
              role="listitem"
              className="flex-shrink-0 snap-center"
            >
              <button
                onClick={() => setSelectedImage(url)}
                aria-label={`View client feedback screenshot ${i + 1} of ${feedbackScreenshots.length}`}
                aria-current={i === currentIndex ? "true" : undefined}
                className="group cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-2xl"
              >
                <div className="relative w-[200px] h-[360px] md:w-[220px] md:h-[400px] rounded-2xl overflow-hidden border border-border bg-surface-light transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] group-focus:border-accent/60">
                  <Image
                    src={url}
                    alt={`Client feedback screenshot ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="220px"
                    draggable={false}
                  />
                </div>
              </button>
            </li>
          ))}
        </ul>

        {/* Pagination dots */}
        <div className="flex justify-center mt-4 gap-2" role="tablist" aria-label="Feedback screenshots pagination">
          {feedbackScreenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to screenshot ${i + 1} of ${feedbackScreenshots.length}`}
              aria-selected={i === currentIndex}
              role="tab"
              className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                i === currentIndex
                  ? "bg-accent w-6"
                  : "bg-border hover:bg-accent/50"
              }`}
            />
          ))}
        </div>

        {/* Scroll hint on mobile */}
        <div className="flex md:hidden justify-center mt-2 gap-1">
          <span className="text-muted text-xs">Swipe to see more</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
          onKeyDown={handleLightboxKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          tabIndex={-1}
        >
          <button
            onClick={() => setSelectedImage(null)}
            aria-label="Close image viewer"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-light/80 flex items-center justify-center z-10 focus:outline-none focus:ring-2 focus:ring-accent/50 hover:bg-surface-light"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          
          {/* Previous button in lightbox */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-surface-light/80 flex items-center justify-center z-10 focus:outline-none focus:ring-2 focus:ring-accent/50 hover:bg-surface-light"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div 
            className="relative w-full max-w-[360px] h-[80vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt={`Feedback screenshot ${feedbackScreenshots.indexOf(selectedImage) + 1} of ${feedbackScreenshots.length}`}
              fill
              className="object-contain"
              sizes="360px"
            />
          </div>

          {/* Next button in lightbox */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-surface-light/80 flex items-center justify-center z-10 focus:outline-none focus:ring-2 focus:ring-accent/50 hover:bg-surface-light"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
