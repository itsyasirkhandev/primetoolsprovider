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

  // Smooth drag-to-scroll state with momentum
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastX, setLastX] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(0);

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
    // Remove passive: true to prevent the warning
    el.addEventListener("scroll", checkScroll);
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

  // Improved mouse wheel scroll - always prevent page scroll when hovering over carousel
  const handleWheel = useCallback((e: WheelEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    const deltaX = e.deltaX;
    const deltaY = e.deltaY;
    const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;

    // Always prevent default so the page doesn't scroll
    e.preventDefault();

    // Scroll the carousel if possible, otherwise do nothing
    el.scrollBy({ left: delta, behavior: "auto" });
  }, []);

  // Add native wheel event listener with passive: false to properly prevent page scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  // Smooth momentum animation - use ref-based pattern to avoid hoisting issues
  const animateMomentumRef = useRef<(() => void) | null>(null);

  const animateMomentum = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Apply friction to slow down the momentum
    const friction = 0.95;
    const newVelocity = velocity * friction;

    if (Math.abs(newVelocity) < 0.1) {
      setVelocity(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    setVelocity(newVelocity);
    el.scrollLeft -= newVelocity;

    animationRef.current = requestAnimationFrame(animateMomentumRef.current!);
  }, [velocity]);

  // Update the ref whenever the callback changes
  useEffect(() => {
    animateMomentumRef.current = animateMomentum;
  }, [animateMomentum]);

  // Start drag
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    
    // Cancel any ongoing momentum animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setVelocity(0);
    
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
    setLastX(e.pageX);
    lastTimestampRef.current = performance.now();
    
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
    el.style.overscrollBehavior = "x contain";
  };

  // During drag - smooth movement with velocity tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const el = scrollRef.current;
    if (!el) return;
    
    e.preventDefault();
    
    const x = e.pageX;
    const walk = x - lastX;
    
    // Calculate velocity based on mouse movement speed
    const now = performance.now();
    const delta = now - lastTimestampRef.current;
    if (delta > 0) {
      setVelocity(walk);
      lastTimestampRef.current = now;
    }
    
    // Direct scroll for instant feedback
    el.scrollLeft = scrollLeft - (x - startX);
    setLastX(x);
  };

  // End drag - start momentum
  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const el = scrollRef.current;
    if (el) {
      el.style.cursor = "grab";
      el.style.userSelect = "";
      el.style.overscrollBehavior = "";
    }
    
    // Start momentum if there was enough velocity
    if (Math.abs(velocity) > 1) {
      animationRef.current = requestAnimationFrame(animateMomentum);
    } else {
      setVelocity(0);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Touch swipe support with momentum
  const [touchVelocity, setTouchVelocity] = useState(0);
  const touchAnimationRef = useRef<number | null>(null);
  const lastTouchRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    lastTouchRef.current = e.touches[0].clientX;
    
    // Cancel any ongoing touch momentum
    if (touchAnimationRef.current) {
      cancelAnimationFrame(touchAnimationRef.current);
      touchAnimationRef.current = null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    
    const touchEnd = e.touches[0].clientX;
    const diff = lastTouchRef.current - touchEnd;
    
    // Calculate velocity
    setTouchVelocity(diff);
    lastTouchRef.current = touchEnd;
    
    el.scrollLeft += diff;
  };

  const handleTouchEnd = () => {
    // Apply momentum after touch ends
    if (Math.abs(touchVelocity) > 2) {
      const animateTouchMomentum = () => {
        const el = scrollRef.current;
        if (!el) return;
        
        const friction = 0.92;
        const newVelocity = touchVelocity * friction;
        
        if (Math.abs(newVelocity) < 0.1) {
          setTouchVelocity(0);
          if (touchAnimationRef.current) {
            cancelAnimationFrame(touchAnimationRef.current);
            touchAnimationRef.current = null;
          }
          return;
        }
        
        setTouchVelocity(newVelocity);
        el.scrollLeft += newVelocity;
        
        touchAnimationRef.current = requestAnimationFrame(animateTouchMomentum);
      };
      
      touchAnimationRef.current = requestAnimationFrame(animateTouchMomentum);
    } else {
      setTouchVelocity(0);
    }
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

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (touchAnimationRef.current) {
        cancelAnimationFrame(touchAnimationRef.current);
      }
    };
  }, []);

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
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
              className="shrink-0 snap-center"
            >
              <button
                onClick={() => setSelectedImage(url)}
                aria-label={`View client feedback screenshot ${i + 1} of ${feedbackScreenshots.length}`}
                aria-current={i === currentIndex ? "true" : undefined}
                className="group cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-2xl"
              >
                <div className="relative w-50 h-90 md:w-55 md:h-100 rounded-2xl overflow-hidden border border-border bg-surface-light transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] group-focus:border-accent/60">
                  <Image
                    src={url}
                    alt={`Client feedback screenshot ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="220px"
                    quality={60}
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
              className={`min-w-[44px] min-h-[44px] rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 flex items-center justify-center ${
                i === currentIndex
                  ? "bg-accent w-6"
                  : "bg-border hover:bg-accent/50 w-2"
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
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
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
            className="relative w-full max-w-90 h-[80vh] rounded-2xl overflow-hidden"
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
