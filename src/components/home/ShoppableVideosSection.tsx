import React, { useState, useEffect, useRef } from "react";
import { useData } from "../../context/DataContext";
import { Play, Volume2, VolumeX, X, ShoppingBag } from "lucide-react";
import { ShoppableVideo } from "../../types";
import { Section } from "../common/Section";
import { PageContainer } from "../common/PageContainer";
import { ShoppableVideoCard } from "./ShoppableVideoCard";

export const ShoppableVideosSection: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { publishedVideos } = useData();
  const [activeModalVideo, setActiveModalVideo] = useState<ShoppableVideo | null>(null);
  const [modalPlaying, setModalPlaying] = useState(true);
  const [modalMuted, setModalMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModalVideo) {
        setActiveModalVideo(null);
      }
      if (e.key === " " && activeModalVideo) {
        e.preventDefault();
        toggleModalPlay();
      }
    };

    if (activeModalVideo) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModalVideo, modalPlaying]);

  if (publishedVideos.length === 0) return null;

  const toggleModalPlay = () => {
    if (!modalVideoRef.current) return;
    if (modalVideoRef.current.paused) {
      modalVideoRef.current.play();
      setModalPlaying(true);
    } else {
      modalVideoRef.current.pause();
      setModalPlaying(false);
    }
  };

  const toggleModalMute = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalMuted;
    setModalMuted(!modalMuted);
  };

  const handleTimeUpdate = () => {
    if (modalVideoRef.current) {
      setVideoProgress(modalVideoRef.current.currentTime);
      setVideoDuration(modalVideoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (modalVideoRef.current) {
      modalVideoRef.current.currentTime = time;
      setVideoProgress(time);
    }
  };

  return (
    <Section spacing="lg" className="bg-secondary/40 border-y border-border/80">
      <PageContainer>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent block mb-1">
            REAL DRAPES & MOTION
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground m-0 mb-2">
            Shoppable Atelier Videos
          </h2>
          <p className="text-sm md:text-[15px] text-muted-foreground m-0">
            Witness the fluid drape, embroidery luster, and authentic weave in motion before choosing your piece.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {publishedVideos.map((video) => (
            <ShoppableVideoCard
              key={video.id}
              video={video}
              onNavigate={onNavigate}
              onOpenModal={(vid) => {
                setActiveModalVideo(vid);
                setModalPlaying(true);
                setModalMuted(false);
              }}
            />
          ))}
        </div>
      </PageContainer>

      {/* Interactive Modal Video Player */}
      {activeModalVideo && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/90 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveModalVideo(null)}
        >
          <div
            className="relative w-full max-w-[420px] aspect-[9/16] max-h-[85dvh] bg-black rounded-md overflow-hidden shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalVideo(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center border border-white/20 hover:bg-black transition-colors z-30"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Element */}
            <div className="relative flex-1 w-full h-full bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={modalVideoRef}
                src={activeModalVideo.videoUrl}
                poster={activeModalVideo.thumbnailUrl || activeModalVideo.posterUrl}
                autoPlay
                playsInline
                loop
                muted={modalMuted}
                onTimeUpdate={handleTimeUpdate}
                onClick={toggleModalPlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Center Play Overlay when Paused */}
              {!modalPlaying && (
                <div
                  onClick={toggleModalPlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-white text-[#734E06] flex items-center justify-center shadow-xl">
                    <Play className="w-7 h-7 ml-1 fill-current" />
                  </div>
                </div>
              )}
            </div>

            {/* Top Info Overlay */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="px-2.5 py-1 bg-black/85 text-[10px] font-bold uppercase tracking-wider text-white rounded-xs border border-white/20">
                Live Atelier Preview
              </span>
            </div>

            {/* Bottom Controls & Product Drawer */}
            <div className="relative z-20 bg-gradient-to-t from-black via-black/90 to-transparent p-4 sm:p-5 pt-8 text-white space-y-3">
              {/* Scrub / Progress Bar */}
              {videoDuration > 0 && (
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={videoDuration}
                    step={0.1}
                    value={videoProgress}
                    onChange={handleSeek}
                    className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#734E06]"
                  />
                  <button
                    onClick={toggleModalMute}
                    className="text-white/80 hover:text-white shrink-0 p-1"
                    title={modalMuted ? "Unmute" : "Mute"}
                  >
                    {modalMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {/* Product Information Card */}
              <div className="bg-neutral-900/95 p-3.5 rounded-sm border border-neutral-700 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={activeModalVideo.thumbnailUrl || activeModalVideo.posterUrl}
                    alt={activeModalVideo.productTitle}
                    className="w-11 h-14 object-cover rounded-xs border border-white/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="font-serif text-sm font-medium text-white truncate m-0">
                      {activeModalVideo.productTitle}
                    </h5>
                    <span className="font-bold text-sm text-white block mt-0.5">
                      ₹{activeModalVideo.productPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveModalVideo(null);
                    onNavigate(activeModalVideo.ctaUrl || `/products/${activeModalVideo.productSlug}`);
                  }}
                  className="px-3.5 py-2 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shrink-0 flex items-center gap-1.5 shadow-md"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};
