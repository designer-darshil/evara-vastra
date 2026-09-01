import React from "react";
import { useData } from "../../context/DataContext";
import { ArrowRight } from "lucide-react";
import { Section } from "../common/Section";
import { PageContainer } from "../common/PageContainer";
import { MasterCategoryCard } from "../common/MasterCategoryCard";
import { Button } from "../ui/button";

export const CategoriesSection: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { activeCategories } = useData();

  if (activeCategories.length === 0) return null;

  return (
    <Section spacing="lg" className="bg-background">
      <PageContainer>
        {/* Consistent Section Header */}
        <div className="flex flex-wrap justify-between items-end mb-8 md:mb-10 pb-4 md:pb-5 border-b border-border gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent block mb-1">
              EXPLORE BY WEAVE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground m-0">
              The Master Categories
            </h2>
          </div>

          <Button
            variant="link"
            onClick={() => onNavigate("/shop")}
            className="text-sm font-semibold p-0 h-auto text-brand hover:text-brand-hover"
          >
            View Complete Catalog ({activeCategories.length} Categories){" "}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Normalized Master Category Grid with Equal Card Dimensions */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {activeCategories.map((cat) => (
            <MasterCategoryCard
              key={cat.id}
              category={cat}
              onNavigate={onNavigate}
              aspectRatio="aspect-[4/5]"
            />
          ))}
        </div>
      </PageContainer>
    </Section>
  );
};
