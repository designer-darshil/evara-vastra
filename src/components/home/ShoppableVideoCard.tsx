import React, { useState, useRef, useEffect } from "react";
import { ShoppableVideo } from "../../types";
import { Play, Pause, Volume2, VolumeX, ArrowRight } from "lucide-react";

interface ShoppableVideoCardProps {
  video: ShoppableVideo;
  onNavigate: (href: string) => void;
  onOpenModal: (video: ShoppableVideo) => void;
}

export const ShoppableVideoCard: React.FC<ShoppableVideoCardProps> = ({
  video,
  onNavigate,
  onOpenModal,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const posterImage = video.thumbnailUrl || video.posterUrl || "";
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(video.productPrice);

  // Lazy loading observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (!entry.isIntersecting && videoRef.current && isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current || hasVideoError) {
      onOpenModal(video);
      return;
    }

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If autoplay/inline play is blocked, open full modal player
          onOpenModal(video);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={() => onOpenModal(video)}
      className="group relative w-full aspect-[9/16] rounded-sm overflow-hidden bg-neutral-900 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
    >
      {/* HTML5 Video Element */}
      {isInView && !hasVideoError && video.videoUrl && (
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={posterImage}
          playsInline
          muted={isMuted}
          loop
          preload="metadata"
          onError={() => setHasVideoError(true)}
          onEnded={() => setIsPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Poster Image Fallback / Initial Display */}
      {(!isInView || !isPlaying || hasVideoError) && (
        <img
          src={posterImage}
          alt={video.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}

      {/* Dark Vignette Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

      {/* Top Bar (Audio toggle + "Shoppable" Badge) */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/85 text-[10px] font-bold uppercase tracking-wider text-white rounded-xs border border-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#734E06] animate-pulse" />
          Featured Look
        </span>

        {isPlaying && !hasVideoError && (
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-black/85 text-white flex items-center justify-center border border-white/20 hover:bg-black transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Center Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <button
          onClick={togglePlay}
          className={`pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 text-[#734E06] flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white ${
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-90"
          }`}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          )}
        </button>
      </div>

      {/* Bottom Product Details Drawer */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 text-white z-10 flex flex-col gap-2">
        <h4 className="font-serif text-sm sm:text-base font-medium leading-snug line-clamp-2 m-0 text-white drop-shadow-sm">
          {video.title}
        </h4>

        {/* Product price & CTA row */}
        <div className="pt-2 border-t border-white/20 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/70 block">
              Atelier Piece
            </span>
            <span className="font-bold text-xs sm:text-sm text-white">
              {formattedPrice}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(video.ctaUrl || `/products/${video.productSlug}`);
            }}
            className="px-3 py-1.5 bg-white text-[#734E06] hover:bg-white/90 text-xs font-bold rounded-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>{video.ctaText || "Shop Look"}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
