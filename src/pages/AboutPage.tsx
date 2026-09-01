import React from "react";
import { media } from "../data/media";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export const AboutPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    if (onNavigate) onNavigate(href);
    else navigate(href);
  };

  return (
    <div className="animate-in fade-in duration-500 pt-10 pb-28">
      <div className="container">
        <Breadcrumbs items={[{ label: "About EVARA VASTRA" }]} onNavigate={onNavigate} />

        {/* Hero Section */}
        <div className="max-w-[800px] my-4 mb-16">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent block mb-2">
            OUR STORY & ATELIER
          </span>
          <h1 className="font-serif text-[clamp(2.4rem,4.5vw,3.8rem)] text-foreground leading-[1.1] m-0">
            Rooted in the living heritage of Indian handlooms. Designed for the modern silhouette.
          </h1>
        </div>

        {/* Narrative Grid 1 */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-[clamp(2rem,5vw,5rem)] items-center mb-24">
          <div className="flex flex-col gap-6">
            <h2 className="font-serif text-3xl md:text-[2.2rem] text-foreground m-0">
              The Vision of Restraint
            </h2>
            <p className="text-[15px] text-muted-foreground leading-[1.7] m-0">
              EVARA VASTRA was conceived out of a profound admiration for the depth of Indian textile craftsmanship, coupled with a yearning for contemporary architectural restraint. For centuries, our handlooms produced the finest gossamer fabrics the world had ever seen — from the unspun mulmuls of Bengal to the dense Kadwa gold brocades of the ghats of Varanasi.
            </p>
            <p className="text-[15px] text-muted-foreground leading-[1.7] m-0">
              Our work bridges these two worlds. We preserve the rigorous manual discipline of pit loom and shuttle weaving, while curating quiet color palettes, minimalist selvedges, and fluid silhouettes tailored for today’s discerning global woman.
            </p>
          </div>

          <div className="aspect-[4/5] overflow-hidden bg-[#EDE7DD] shadow-md rounded-sm">
            <img src={media.craftHero} alt="Master Weaving Loom" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Core Principles */}
        <div className="bg-secondary/30 p-8 md:p-14 lg:p-[4.5rem_3rem] border border-border mb-24 rounded-sm">
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-[0.2em] uppercase text-primary font-bold">
              OUR MANIFESTO
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-foreground mt-2 m-0">
              Three Pillars of Evara Vastra
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <span className="font-serif text-4xl text-accent block mb-2">
                01
              </span>
              <h4 className="font-serif text-[22px] mb-2 m-0">
                100% Unadulterated Natural Fibers
              </h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed m-0">
                We work exclusively with pure mulberry silk, organic handspun cottons, wild forest tussars, and European flax linen. Zero synthetic polyester blends.
              </p>
            </div>

            <div>
              <span className="font-serif text-4xl text-accent block mb-2">
                02
              </span>
              <h4 className="font-serif text-[22px] mb-2 m-0">
                Generational Master Artisans
              </h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed m-0">
                We partner directly with traditional weaving clusters in Varanasi, Phulia, Chanderi, and Bhagalpur, ensuring transparent livelihoods and direct craft patronage.
              </p>
            </div>

            <div>
              <span className="font-serif text-4xl text-accent block mb-2">
                03
              </span>
              <h4 className="font-serif text-[22px] mb-2 m-0">
                Timeless Modern Heirlooms
              </h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed m-0">
                Rejecting the rapid churn of trend cycles, our sarees are created with heirloom endurance — crafted to be worn with love today and passed on to daughters tomorrow.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center max-w-[600px] mx-auto">
          <h3 className="font-serif text-[2rem] mb-3 m-0 text-foreground">
            Discover the Ensemble That Speaks to You
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Explore our curated catalog of Sarees, Co-ord Sets, and Kurta ensembles handcrafted in Surat.
          </p>
          <Button onClick={() => handleNav("/shop")} size="lg">
            Explore Full Catalog <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
