import React from "react";
import { useData } from "../context/DataContext";
import { HeroSection } from "../components/home/HeroSection";
import { EditorialMarquee } from "../components/home/EditorialMarquee";
import { CategoriesSection } from "../components/home/CategoriesSection";
import { ShoppableVideosSection } from "../components/home/ShoppableVideosSection";
import { CustomerReviewsSection } from "../components/home/CustomerReviewsSection";
import { ProductCard } from "../components/common/ProductCard";
import { Section } from "../components/common/Section";
import { PageContainer } from "../components/common/PageContainer";
import { ArrowRight, Truck, Sparkles, Shield, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";

interface HomePageProps {
  onNavigate?: (href: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { homepageCMS, publishedProducts } = useData();
  const navigate = useNavigate();
  const vis = homepageCMS.sectionVisibility;

  const newArrivals = publishedProducts.slice(0, 8);
  const bestsellers = publishedProducts.filter((p) => p.bestseller).slice(0, 8);

  const handleNav = (href: string) => {
    if (onNavigate) onNavigate(href);
    else navigate(href);
  };

  return (
    <div className="animate-in fade-in duration-500 flex flex-col">
      {/* 1. Hero Section */}
      {vis.hero && <HeroSection onNavigate={handleNav} />}

      {/* 2. Marquee Ticker */}
      {vis.marquee && <EditorialMarquee />}

      {/* 3. Shop by Master Category Grid */}
      {vis.categories && <CategoriesSection onNavigate={handleNav} />}

      {/* 4. New Season Arrivals Grid */}
      {vis.newArrivals && (
        <Section spacing="lg" className="bg-secondary/40">
          <PageContainer>
            <div className="flex flex-wrap justify-between items-end mb-8 md:mb-10 pb-4 md:pb-5 border-b border-border gap-4">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent block mb-1">
                  FRESH ATELIER DROPS
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground m-0">
                  New Season Arrivals
                </h2>
              </div>

              <Button
                variant="link"
                onClick={() => handleNav("/shop?filter=newArrival")}
                className="text-sm font-semibold p-0 h-auto text-brand hover:text-brand-hover"
              >
                View All New In <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} onNavigate={handleNav} />
              ))}
            </div>
          </PageContainer>
        </Section>
      )}

      {/* 5. Shoppable Videos Feature */}
      {vis.shoppableVideos && <ShoppableVideosSection onNavigate={handleNav} />}

      {/* 6. Bestselling Curation */}
      {vis.featuredProducts && bestsellers.length > 0 && (
        <Section spacing="lg" className="bg-background">
          <PageContainer>
            <div className="flex flex-wrap justify-between items-end mb-8 md:mb-10 pb-4 md:pb-5 border-b border-border gap-4">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent block mb-1">
                  PATRON FAVORITES
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground m-0">
                  Bestselling Ensembles
                </h2>
              </div>

              <Button
                variant="link"
                onClick={() => handleNav("/shop?filter=bestseller")}
                className="text-sm font-semibold p-0 h-auto text-brand hover:text-brand-hover"
              >
                Explore Bestsellers <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {bestsellers.map((product) => (
                <ProductCard key={product.id} product={product} onNavigate={handleNav} />
              ))}
            </div>
          </PageContainer>
        </Section>
      )}

      {/* 7. Why Choose Us / Trust Signals */}
      {vis.whyChooseUs && (
        <Section spacing="lg" className="bg-secondary border-y border-border">
          <PageContainer>
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent block mb-1">
                THE EVARA ASSURANCE
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground m-0 mb-2">
                {homepageCMS.whyChooseUsTitle || "Why Shop With Evara Vastra"}
              </h2>
              <p className="text-sm md:text-[15px] text-muted-foreground m-0">
                {homepageCMS.whyChooseUsSubtitle || "Craftsmanship, trust, and exceptional service on every order."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center px-3 py-2">
                <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold mb-1.5 text-foreground">Free Shipping Pan India</h3>
                <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed m-0">
                  Enjoy complimentary express delivery on all orders across India without minimum cart constraints.
                </p>
              </div>

              <div className="text-center px-3 py-2">
                <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold mb-1.5 text-foreground">Extra 10% Off Prepaid + COD</h3>
                <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed m-0">
                  Instant 10% savings on UPI and card payments, plus reliable Cash on Delivery available nationwide.
                </p>
              </div>

              <div className="text-center px-3 py-2">
                <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold mb-1.5 text-foreground">High Quality Fabrics</h3>
                <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed m-0">
                  Hand-inspected Fendy satin, tissue silks, and soft pure cottons direct from our Surat textile atelier.
                </p>
              </div>

              <div className="text-center px-3 py-2">
                <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold mb-1.5 text-foreground">7-Day Easy Exchange</h3>
                <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed m-0">
                  Need a different size or shade? Request a quick doorstep replacement with our concierge team.
                </p>
              </div>
            </div>
          </PageContainer>
        </Section>
      )}

      {/* 8. Customer Reviews & Testimonials */}
      {vis.reviews && <CustomerReviewsSection onNavigate={handleNav} />}

      {/* 9. Newsletter VIP Invitation */}
      {vis.newsletter && (
        <Section spacing="lg" className="bg-secondary/70 border-t border-border">
          <PageContainer size="narrow" className="text-center">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent block mb-1">
              EXCLUSIVE ACCESS
            </span>

            <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-2.5">
              {homepageCMS.newsletterTitle || "Join The Evara Vastra Circle"}
            </h2>

            <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-6 max-w-lg mx-auto">
              {homepageCMS.newsletterSubtitle || "Be the first to access new collection drops, limited festival edits, and exclusive VIP offers."}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for joining the Evara Vastra circle!");
              }}
              className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
            >
              <Input
                type="email"
                required
                placeholder="Enter your email address..."
                className="flex-1 bg-background h-11"
              />
              <Button type="submit" className="whitespace-nowrap px-6 h-11 bg-brand hover:bg-brand-hover text-brand-foreground font-semibold">
                Join Circle
              </Button>
            </form>
          </PageContainer>
        </Section>
      )}
    </div>
  );
};
