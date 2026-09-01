import React from "react";
import { HeroSection } from "../components/home/HeroSection";
import { EditorialMarquee } from "../components/home/EditorialMarquee";
import { CategoriesSection } from "../components/home/CategoriesSection";
import { FeaturedCollectionSection } from "../components/home/FeaturedCollectionSection";
import { BrandStorySection } from "../components/home/BrandStorySection";
import { FabricDiscoverySection } from "../components/home/FabricDiscoverySection";
import { OccasionGridSection } from "../components/home/OccasionGridSection";
import { LookbookTeaserSection } from "../components/home/LookbookTeaserSection";
import { CustomerNotesSection } from "../components/home/CustomerNotesSection";

export const HomePage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  return (
    <div className="animate-fade-in">
      <HeroSection onNavigate={onNavigate} />
      <EditorialMarquee />
      <CategoriesSection onNavigate={onNavigate} />
      <FeaturedCollectionSection onNavigate={onNavigate} />
      <BrandStorySection onNavigate={onNavigate} />
      <FabricDiscoverySection onNavigate={onNavigate} />
      <OccasionGridSection onNavigate={onNavigate} />
      <LookbookTeaserSection onNavigate={onNavigate} />
      <CustomerNotesSection />
    </div>
  );
};
