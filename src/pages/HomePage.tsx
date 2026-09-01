import React from "react";
import { useData } from "../context/DataContext";
import { HeroSection } from "../components/home/HeroSection";
import { EditorialMarquee } from "../components/home/EditorialMarquee";
import { CategoriesSection } from "../components/home/CategoriesSection";
import { FeaturedCollectionSection } from "../components/home/FeaturedCollectionSection";
import { BrandStorySection } from "../components/home/BrandStorySection";
import { FabricDiscoverySection } from "../components/home/FabricDiscoverySection";
import { OccasionGridSection } from "../components/home/OccasionGridSection";
import { LookbookTeaserSection } from "../components/home/LookbookTeaserSection";
import { CustomerNotesSection } from "../components/home/CustomerNotesSection";
import { ArrowRight } from "lucide-react";

interface HomePageProps {
  onNavigate: (href: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { homepageCMS } = useData();
  const vis = homepageCMS.sectionVisibility;

  return (
    <div className="animate-fade-in">
      {/* 1. Hero Section */}
      {vis.hero && <HeroSection onNavigate={onNavigate} />}

      {/* 2. Craftsmanship Ticker Marquee */}
      {vis.marquee && <EditorialMarquee />}

      {/* 3. Categories Asymmetric Grid */}
      {vis.categories && <CategoriesSection onNavigate={onNavigate} />}

      {/* 4. Featured Collection Spotlight */}
      {vis.featuredCollection && <FeaturedCollectionSection onNavigate={onNavigate} />}

      {/* 5. Editorial Brand Story */}
      {vis.brandStory && <BrandStorySection onNavigate={onNavigate} />}

      {/* 6. Material Intelligence Fabric Discovery */}
      {vis.fabricDiscovery && <FabricDiscoverySection onNavigate={onNavigate} />}

      {/* 7. Occasion Shopping Grid */}
      {vis.occasionGrid && <OccasionGridSection onNavigate={onNavigate} />}

      {/* 8. Lookbook Teaser Anthology */}
      {vis.lookbookTeaser && <LookbookTeaserSection onNavigate={onNavigate} />}

      {/* 9. Patron Notes */}
      {vis.customerNotes && <CustomerNotesSection />}

      {/* 10. Evara Salon Newsletter Invitation */}
      {vis.newsletter && (
        <section
          style={{
            paddingTop: "5.5rem",
            paddingBottom: "5.5rem",
            backgroundColor: "var(--bg-surface-subtle)",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <div className="container" style={{ maxWidth: "680px", textAlign: "center" }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-wine)",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              PRIVATE PATRON INVITATION
            </span>

            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                color: "var(--text-primary)",
                lineHeight: 1.15,
                marginBottom: "0.75rem",
              }}
            >
              Join The Evara Vastra Salon
            </h2>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: "2rem",
              }}
            >
              Receive early access to seasonal handloom edits, limited-edition Kadwa archival drops, and private draping sessions at our Mumbai studio.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for joining the Evara Vastra Salon.");
              }}
              style={{
                display: "flex",
                gap: "0.5rem",
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              <div style={{ position: "relative", flex: 1 }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  style={{
                    width: "100%",
                    padding: "0.85rem 1.25rem",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--border-medium)",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />
              </div>

              <button type="submit" className="btn-wine" style={{ padding: "0.85rem 1.5rem" }}>
                <span>Join Salon</span> <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};
