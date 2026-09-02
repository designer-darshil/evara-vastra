import React, { useRef, useState, useEffect } from "react";
import { Maximize2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "../../lib/utils";

interface ProductGalleryProps {
  images: string[];
  title: string;
  discountPercent?: number;
  activeImageIndex: number;
  onSelectImage: (index: number) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  title,
  discountPercent = 0,
  activeImageIndex,
  onSelectImage,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isHorizontalSwipe = useRef(false);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active thumbnail into view in mobile scroller
  useEffect(() => {
    if (thumbnailScrollRef.current) {
      const container = thumbnailScrollRef.current;
      const activeEl = container.children[activeImageIndex] as HTMLElement;
      if (activeEl) {
        const left = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
        container.scrollTo({ left, behavior: "smooth" });
      }
    }
  }, [activeImageIndex]);

  // Touch gesture handling that preserves 100% native vertical page scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    // If vertical movement is greater, it is an intentional page scroll gesture: DO NOT prevent or capture!
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    // Only mark as horizontal swipe if movement exceeds threshold
    if (Math.abs(deltaX) > 12) {
      isHorizontalSwipe.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isHorizontalSwipe.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // Swiped Left -> Next Image
        onSelectImage((activeImageIndex + 1) % images.length);
      } else {
        // Swiped Right -> Previous Image
        onSelectImage(activeImageIndex > 0 ? activeImageIndex - 1 : images.length - 1);
      }
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectImage(activeImageIndex > 0 ? activeImageIndex - 1 : images.length - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectImage((activeImageIndex + 1) % images.length);
  };

  const currentImage = images[activeImageIndex] || images[0] || "";

  return (
    <div className="w-full flex flex-col">
      {/* ========================================================================= */}
      {/* 1. MOBILE PRODUCT GALLERY (< md breakpoint)                              */}
      {/* ========================================================================= */}
      <div className="md:hidden w-full flex flex-col">
        
        {/* Main Product Image Container with Native Vertical Touch Action */}
        <div
          className="relative w-full aspect-[3/4] bg-neutral-100 rounded-xs border border-neutral-200 overflow-hidden select-none"
          style={{ touchAction: "pan-y pinch-zoom" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Display Image */}
          <img
            src={currentImage}
            alt={`${title} - view ${activeImageIndex + 1}`}
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover select-none pointer-events-none transition-opacity duration-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src = images[0] || "";
            }}
          />

          {/* Discount Badge on Top-Left */}
          {discountPercent > 0 && (
            <div className="absolute top-3 left-3 z-10 bg-[#734E06] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs pointer-events-none">
              {discountPercent}% OFF
            </div>
          )}

          {/* Fullscreen / Expand Button on Top-Right (Cleanly away from thumbnails and counter) */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            aria-label="Open fullscreen image view"
            className="absolute top-3 right-3 z-10 w-9 h-9 min-h-[44px] min-w-[44px] rounded-full bg-white/90 text-neutral-800 shadow-sm flex items-center justify-center hover:bg-white hover:text-[#734E06] transition-colors cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Image Counter Badge on Bottom-Right of Main Image */}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 z-10 bg-black/70 text-white text-[11px] font-mono font-medium px-2.5 py-1 rounded-xs tracking-wider pointer-events-none shadow-xs">
              {activeImageIndex + 1} / {images.length}
            </div>
          )}

          {/* Subtle Navigation Arrows on Left & Right */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous product image"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 min-h-[44px] min-w-[44px] rounded-full bg-white/80 hover:bg-white text-neutral-800 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next product image"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 min-h-[44px] min-w-[44px] rounded-full bg-white/80 hover:bg-white text-neutral-800 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Dedicated Mobile Thumbnail Scroller (Contained horizontal scroll, no vertical interference) */}
        {images.length > 1 && (
          <div
            ref={thumbnailScrollRef}
            className="w-full max-w-full overflow-x-auto no-scrollbar pt-3 pb-1 flex gap-2.5 items-center"
            style={{ WebkitOverflowScrolling: "touch" }}
            aria-label="Product thumbnails"
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectImage(idx)}
                aria-label={`Select product image ${idx + 1}`}
                className={cn(
                  "aspect-[3/4] w-14 shrink-0 overflow-hidden rounded-xs cursor-pointer transition-all border-2",
                  activeImageIndex === idx
                    ? "border-[#734E06] ring-1 ring-[#734E06] opacity-100 shadow-xs"
                    : "border-neutral-200 opacity-60 hover:opacity-100"
                )}
              >
                <img
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover pointer-events-none"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP PRODUCT GALLERY (>= md breakpoint)                            */}
      {/* ========================================================================= */}
      <div className="hidden md:flex flex-row gap-4 items-start w-full">
        {/* Vertical Thumbnail Column */}
        {images.length > 1 && (
          <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[640px] no-scrollbar w-20 shrink-0 pr-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectImage(idx)}
                aria-label={`Select image ${idx + 1}`}
                className={cn(
                  "aspect-[3/4] w-full shrink-0 overflow-hidden rounded-xs cursor-pointer transition-all border-2",
                  activeImageIndex === idx
                    ? "border-[#734E06] ring-1 ring-[#734E06] opacity-100 shadow-xs"
                    : "border-neutral-200 opacity-65 hover:opacity-100"
                )}
              >
                <img
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main Stage View */}
        <div className="relative aspect-[3/4] flex-1 bg-neutral-100 overflow-hidden rounded-xs border border-neutral-200 group">
          <img
            src={currentImage}
            alt={title}
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Desktop Discount Tag */}
          {discountPercent > 0 && (
            <div className="absolute top-3 left-3 bg-[#734E06] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs shadow-xs">
              {discountPercent}% OFF
            </div>
          )}

          {/* Desktop Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[11px] font-mono px-2.5 py-1 rounded-xs tracking-wider pointer-events-none">
              {activeImageIndex + 1} / {images.length}
            </div>
          )}

          {/* Expand Fullscreen Button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            aria-label="Open image fullscreen"
            className="absolute bottom-3 right-3 w-10 h-10 min-h-[40px] min-w-[40px] rounded-full bg-white/90 text-neutral-800 shadow-sm flex items-center justify-center hover:bg-white hover:text-[#734E06] transition-colors cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. LIGHTBOX FULLSCREEN IMAGE VIEWER MODAL                                 */}
      {/* ========================================================================= */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/95 z-lightbox flex items-center justify-center p-4 sm:p-8"
          style={{ zIndex: 80 }}
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image viewer"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close fullscreen viewer"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-white/10 flex items-center justify-center border-none cursor-pointer hover:bg-white/20 transition-colors z-30"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-3 sm:left-6 text-white w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-white/10 flex items-center justify-center border-none cursor-pointer hover:bg-white/20 transition-colors z-30"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-3 sm:right-6 text-white w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-white/10 flex items-center justify-center border-none cursor-pointer hover:bg-white/20 transition-colors z-30"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Lightbox Main Image */}
          <img
            src={currentImage}
            alt={title}
            className="max-h-[85dvh] max-w-[90vw] object-contain transition-transform duration-200"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Lightbox Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 font-mono text-xs px-3 py-1 bg-white/10 rounded-sm">
              {activeImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
