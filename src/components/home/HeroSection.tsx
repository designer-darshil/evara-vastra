import React from "react";
import { useData } from "../../context/DataContext";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { MagneticButton } from "../common/MagneticButton";
import { Button } from "../ui/button";

interface HeroSectionProps {
  onNavigate?: (href: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { homepageCMS } = useData();

  const handleNav = (href: string) => {
    if (onNavigate) onNavigate(href);
  };

  return (
    <section className="relative min-h-[clamp(auto,70vh,calc(90vh-72px))] flex items-center overflow-hidden bg-background pt-10 pb-16">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Narrative Column */}
          <div className="flex flex-col gap-6 z-10">
            {/* Season Badge */}
            <div className="inline-flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> {homepageCMS.heroBadge || "AUTUMN / WINTER 2026"}
              </span>
              <span className="text-border/80">•</span>
              <span className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                100% PURE SILK MARK
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-[clamp(2.75rem,5.2vw,4.75rem)] leading-[1.05] text-foreground font-medium tracking-tight m-0">
              {homepageCMS.heroHeading}{" "}
              <span className="italic text-accent font-normal">
                {homepageCMS.heroAccentWord}
              </span>
            </h1>

            {/* Editorial Lead Paragraph */}
            <p className="text-[clamp(0.95rem,1.2vw,1.125rem)] leading-relaxed text-muted-foreground max-w-[520px] font-normal m-0">
              {homepageCMS.heroSubheading}
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 mt-2">
              <MagneticButton>
                <Button
                  onClick={() => handleNav(homepageCMS.primaryCtaLink || "/shop")}
                  className="px-7 sm:px-8 py-5 sm:py-6 text-xs sm:text-sm font-semibold rounded-sm bg-brand text-brand-foreground hover:bg-brand-hover tracking-wider uppercase"
                >
                  {homepageCMS.primaryCtaText || "Shop The Collection"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </MagneticButton>

              <Button
                variant="link"
                onClick={() => handleNav(homepageCMS.secondaryCtaLink || "/craftsmanship")}
                className="text-xs sm:text-sm px-0 h-auto font-semibold text-foreground hover:text-brand transition-colors tracking-wider uppercase"
              >
                {homepageCMS.secondaryCtaText || "Explore The Craft"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Trust Assurances */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-7 mt-4 sm:mt-6 pt-5 sm:pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand" />
                <span className="text-xs text-muted-foreground">
                  Pure Silk Mark Certified
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand text-sm">✦</span>
                <span className="text-xs text-muted-foreground">
                  Kadwa Pit Loom Weave
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-[3/4] border border-border overflow-hidden bg-secondary rounded-sm">
              <img
                src={homepageCMS.heroImage}
                alt="Evara Vastra Saree"
                fetchPriority="high"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
              />

              {/* Floating Craftsmanship Badge */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white p-4 sm:p-5 border border-border shadow-md rounded-sm">
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-brand block mb-1">
                  FEATURED DRAPE
                </span>
                <p className="font-serif text-base sm:text-[17px] text-foreground m-0 leading-snug">
                  Raga Katan Silk in Deep Wine
                </p>
                <span className="text-[11px] text-muted-foreground block mt-1">
                  18 days on handloom • Antique gold Kadwa zari
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
