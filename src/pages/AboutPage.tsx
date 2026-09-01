import React from "react";
import { media } from "../data/media";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ArrowRight } from "lucide-react";

export const AboutPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: "7rem", paddingTop: "2.5rem" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "About EVARA VASTRA" }]} onNavigate={onNavigate} />

        {/* Hero Section */}
        <div style={{ maxWidth: "800px", margin: "1rem 0 4rem 0" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent-wine)",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            OUR STORY & ATELIER
          </span>
          <h1
            className="font-serif"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", color: "var(--text-primary)", lineHeight: 1.1 }}
          >
            Rooted in the living heritage of Indian handlooms. Designed for the modern silhouette.
          </h1>
        </div>

        {/* Narrative Grid 1 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "center",
            marginBottom: "6rem",
          }}
          className="about-grid"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h2 className="font-serif" style={{ fontSize: "2.2rem", color: "var(--text-primary)" }}>
              The Vision of Restraint
            </h2>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              EVARA VASTRA was conceived out of a profound admiration for the depth of Indian textile craftsmanship, coupled with a yearning for contemporary architectural restraint. For centuries, our handlooms produced the finest gossamer fabrics the world had ever seen — from the unspun mulmuls of Bengal to the dense Kadwa gold brocades of the ghats of Varanasi.
            </p>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              Our work bridges these two worlds. We preserve the rigorous manual discipline of pit loom and shuttle weaving, while curating quiet color palettes, minimalist selvedges, and fluid silhouettes tailored for today’s discerning global woman.
            </p>
          </div>

          <div style={{ aspectRatio: "4/5", overflow: "hidden", backgroundColor: "#EDE7DD", boxShadow: "var(--shadow-medium)" }}>
            <img src={media.craftHero} alt="Master Weaving Loom" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        {/* Core Principles */}
        <div
          style={{
            backgroundColor: "var(--bg-surface-subtle)",
            padding: "4.5rem 3rem",
            border: "1px solid var(--border-subtle)",
            marginBottom: "6rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent-gold)", fontWeight: 600 }}>
              OUR MANIFESTO
            </span>
            <h3 className="font-serif" style={{ fontSize: "2.4rem", color: "var(--text-primary)" }}>
              Three Pillars of Evara Vastra
            </h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem" }}>
            <div>
              <span className="font-serif" style={{ fontSize: "2.5rem", color: "var(--accent-wine)", display: "block", marginBottom: "0.5rem" }}>
                01
              </span>
              <h4 className="font-serif" style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                100% Unadulterated Natural Fibers
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                We work exclusively with pure mulberry silk, organic handspun cottons, wild forest tussars, and European flax linen. Zero synthetic polyester blends.
              </p>
            </div>

            <div>
              <span className="font-serif" style={{ fontSize: "2.5rem", color: "var(--accent-wine)", display: "block", marginBottom: "0.5rem" }}>
                02
              </span>
              <h4 className="font-serif" style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                Generational Master Artisans
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                We partner directly with traditional weaving clusters in Varanasi, Phulia, Chanderi, and Bhagalpur, ensuring transparent livelihoods and direct craft patronage.
              </p>
            </div>

            <div>
              <span className="font-serif" style={{ fontSize: "2.5rem", color: "var(--accent-wine)", display: "block", marginBottom: "0.5rem" }}>
                03
              </span>
              <h4 className="font-serif" style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                Timeless Modern Heirlooms
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Rejecting the rapid churn of trend cycles, our sarees are created with heirloom endurance — crafted to be worn with love today and passed on to daughters tomorrow.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
          <h3 className="font-serif" style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
            Discover the Ensemble That Speaks to You
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Explore our curated catalog of Sarees, Co-ord Sets, and Kurta ensembles handcrafted in Surat.
          </p>
          <button onClick={() => onNavigate("/shop")} className="btn btn-primary">
            Explore Full Catalog <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
