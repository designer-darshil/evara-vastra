import React from "react";
import { useData } from "../context/DataContext";
import { HeroSection } from "../components/home/HeroSection";
import { EditorialMarquee } from "../components/home/EditorialMarquee";
import { CategoriesSection } from "../components/home/CategoriesSection";
import { ShoppableVideosSection } from "../components/home/ShoppableVideosSection";
import { CustomerReviewsSection } from "../components/home/CustomerReviewsSection";
import { ProductCard } from "../components/product/ProductCard";
import { ArrowRight, Truck, Sparkles, Shield, RefreshCw } from "lucide-react";

interface HomePageProps {
  onNavigate: (href: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { homepageCMS, publishedProducts } = useData();
  const vis = homepageCMS.sectionVisibility;

  const newArrivals = publishedProducts.slice(0, 8);
  const bestsellers = publishedProducts.filter((p) => p.bestseller).slice(0, 8);

  return (
    <div className="animate-fade-in">
      {/* 1. Hero Section */}
      {vis.hero && <HeroSection onNavigate={onNavigate} />}

      {/* 2. Marquee Ticker */}
      {vis.marquee && <EditorialMarquee />}

      {/* 3. Shop by Category Grid */}
      {vis.categories && <CategoriesSection onNavigate={onNavigate} />}

      {/* 4. New Season Arrivals Grid */}
      {vis.newArrivals && (
        <section style={{ padding: "5rem 0", backgroundColor: "#FFFFFF" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "2.5rem",
                borderBottom: "1px solid var(--border-subtle)",
                paddingBottom: "1.25rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--accent-wine)",
                    display: "block",
                    marginBottom: "0.3rem",
                  }}
                >
                  FRESH ATELIER DROPS
                </span>
                <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "var(--text-primary)", margin: 0 }}>
                  New Season Arrivals
                </h2>
              </div>

              <button
                onClick={() => onNavigate("/shop?filter=newArrival")}
                className="btn-link"
                style={{ fontSize: "0.85rem", fontWeight: 600 }}
              >
                View All New In <ArrowRight size={14} />
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "2rem",
              }}
            >
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Shoppable Videos Feature */}
      {vis.shoppableVideos && <ShoppableVideosSection onNavigate={onNavigate} />}

      {/* 6. Bestselling Curation */}
      {vis.featuredProducts && bestsellers.length > 0 && (
        <section style={{ padding: "5rem 0", backgroundColor: "var(--bg-primary)" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "2.5rem",
                borderBottom: "1px solid var(--border-subtle)",
                paddingBottom: "1.25rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--accent-wine)",
                    display: "block",
                    marginBottom: "0.3rem",
                  }}
                >
                  PATRON FAVORITES
                </span>
                <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "var(--text-primary)", margin: 0 }}>
                  Bestselling Ensembles
                </h2>
              </div>

              <button
                onClick={() => onNavigate("/shop?filter=bestseller")}
                className="btn-link"
                style={{ fontSize: "0.85rem", fontWeight: 600 }}
              >
                Explore Bestsellers <ArrowRight size={14} />
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "2rem",
              }}
            >
              {bestsellers.map((product) => (
                <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Why Choose Us / Trust Signals */}
      {vis.whyChooseUs && (
        <section style={{ padding: "4.5rem 0", backgroundColor: "#FFFFFF", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 3rem auto" }}>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--accent-wine)",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                THE EVARA ASSURANCE
              </span>
              <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "var(--text-primary)", margin: "0 0 0.5rem 0" }}>
                {homepageCMS.whyChooseUsTitle || "Why Shop With Evara Vastra"}
              </h2>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", margin: 0 }}>
                {homepageCMS.whyChooseUsSubtitle || "Craftsmanship, trust, and exceptional service on every order."}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "2rem",
              }}
            >
              <div style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "var(--accent-wine-subtle)", color: "var(--accent-wine)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem auto" }}>
                  <Truck size={24} />
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}>Free Shipping Pan India</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                  Enjoy complimentary express delivery on all orders across India without minimum cart constraints.
                </p>
              </div>

              <div style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "var(--accent-wine-subtle)", color: "var(--accent-wine)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem auto" }}>
                  <Shield size={24} />
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}>Extra 10% Off Prepaid + COD</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                  Instant 10% savings on UPI and card payments, plus reliable Cash on Delivery available nationwide.
                </p>
              </div>

              <div style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "var(--accent-wine-subtle)", color: "var(--accent-wine)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem auto" }}>
                  <Sparkles size={24} />
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}>High Quality Fabrics</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                  Hand-inspected Fendy satin, tissue silks, and soft pure cottons direct from our Surat textile atelier.
                </p>
              </div>

              <div style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "var(--accent-wine-subtle)", color: "var(--accent-wine)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem auto" }}>
                  <RefreshCw size={24} />
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}>7-Day Easy Exchange</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                  Need a different size or shade? Request a quick doorstep replacement with our concierge team.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8. Customer Reviews & Testimonials */}
      {vis.reviews && <CustomerReviewsSection onNavigate={onNavigate} />}

      {/* 9. Newsletter VIP Invitation */}
      {vis.newsletter && (
        <section
          style={{
            padding: "5rem 0",
            backgroundColor: "var(--bg-surface-subtle)",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <div className="container" style={{ maxWidth: "620px", textAlign: "center" }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-wine)",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              EXCLUSIVE ACCESS
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
              {homepageCMS.newsletterTitle || "Join The Evara Vastra Circle"}
            </h2>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: "2rem",
              }}
            >
              {homepageCMS.newsletterSubtitle || "Be the first to access new collection drops, limited festival edits, and exclusive VIP offers."}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for joining the Evara Vastra circle!");
              }}
              style={{
                display: "flex",
                gap: "0.5rem",
                maxWidth: "460px",
                margin: "0 auto",
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="input-field"
                style={{
                  flex: 1,
                  backgroundColor: "#FFFFFF",
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  whiteSpace: "nowrap",
                  padding: "0 1.5rem",
                }}
              >
                Join Circle
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};
