import React from "react";
import { useData } from "../../context/DataContext";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { MagneticButton } from "../common/MagneticButton";
import { Button } from "../ui/button";
import { PageContainer } from "../common/PageContainer";
import { FullBleedSection } from "../common/FullBleedSection";

interface HeroSectionProps {
  onNavigate?: (href: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { homepageCMS } = useData();

  const handleNav = (href: string) => {
    if (onNavigate) onNavigate(href);
  };

  const desktopImage =
    homepageCMS.heroImage ||
    "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753311.jpg?v=1788176983";
  const mobileImage =
    homepageCMS.heroMobileImage ||
    "https://cdn.shopify.com/s/files/1/0719/5974/0506/files/6073220371323753379.jpg?v=1788176378";

  return (
    <FullBleedSection
      as="section"
      aria-label="Featured Collection Hero"
      className="relative flex items-center min-h-[78dvh] sm:min-h-[85dvh] lg:min-h-[92dvh] max-h-[100dvh] bg-neutral-950 text-white select-none"
    >
      {/* ========================================================================= */}
      {/* 1. HERO MEDIA LAYER (Viewport Edge-to-Edge 100vw, Optimized High-Priority) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <picture>
          <source media="(max-width: 640px)" srcSet={mobileImage} />
          <img
            src={desktopImage}
            alt="Evara Vastra Contemporary Indian Womenswear Collection"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-[center_20%] sm:object-center brightness-[0.92] contrast-[1.03] transform-gpu scale-100 transition-transform duration-1000 ease-out will-change-transform motion-reduce:transform-none"
          />
        </picture>

        {/* Restrained Gradient Overlay for Contrast & Typography (No Blur / No Glassmorphism) */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/45 sm:to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO CONTENT LAYER (Aligned with Standard Site-Wide Page Container)   */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24">
        <PageContainer>
          <div className="max-w-xl md:max-w-2xl flex flex-col gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-3 duration-700 motion-reduce:animate-none">
            
            {/* Eyebrow / Season Badge */}
            <div className="inline-flex items-center gap-2 w-fit">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-white/10 text-white text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase border border-white/20">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                {homepageCMS.heroBadge || "NEW SEASON DROP • 2026"}
              </span>
              <span className="text-white/60 text-xs hidden xs:inline">•</span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.16em] uppercase text-white/80 hidden xs:inline">
                HANDCRAFTED IN SURAT
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.08] text-white font-normal tracking-tight m-0 drop-shadow-sm text-balance">
              {homepageCMS.heroHeading || "Contemporary Indian"}{" "}
              <span className="italic font-normal text-[#F4D06F] block sm:inline">
                {homepageCMS.heroAccentWord || "Womenswear"}
              </span>
            </h1>

            {/* Supporting Editorial Narrative */}
            <p className="text-sm sm:text-base md:text-[17px] leading-relaxed text-white/90 max-w-lg font-normal m-0 drop-shadow-xs">
              {homepageCMS.heroSubheading ||
                "Discover handcrafted sarees, designer co-ord sets, and festive kurta ensembles curated for effortless elegance."}
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <MagneticButton>
                <Button
                  onClick={() => handleNav(homepageCMS.primaryCtaLink || "/shop?filter=newArrival")}
                  className="px-6 sm:px-8 py-5 sm:py-6 text-xs sm:text-sm font-semibold rounded-sm bg-brand text-brand-foreground hover:bg-brand-hover tracking-wider uppercase shadow-md transition-all duration-200 min-h-[44px]"
                  style={{ backgroundColor: "#734E06", color: "#FFFFFF" }}
                >
                  {homepageCMS.primaryCtaText || "Shop New Arrivals"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </MagneticButton>

              <Button
                variant="outline"
                onClick={() => handleNav(homepageCMS.secondaryCtaLink || "/shop/sarees")}
                className="px-5 sm:px-7 py-5 sm:py-6 text-xs sm:text-sm font-semibold rounded-sm bg-white/10 hover:bg-white/20 text-white border-white/40 hover:border-white tracking-wider uppercase transition-colors min-h-[44px]"
              >
                {homepageCMS.secondaryCtaText || "Explore Sarees"}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 pt-4 sm:pt-6 border-t border-white/20 text-white/85 text-xs sm:text-[13px]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>100% Authentic Handloom & Silks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#D4AF37]">✦</span>
                <span>Free Express Delivery Pan-India</span>
              </div>
            </div>

          </div>
        </PageContainer>
      </div>
    </FullBleedSection>
  );
};
