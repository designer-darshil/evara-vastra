import React from "react";
import { Category } from "../../types";
import { ArrowRight } from "lucide-react";

interface MasterCategoryCardProps {
  category: Category;
  onNavigate: (href: string) => void;
  aspectRatio?: string;
}

export const MasterCategoryCard: React.FC<MasterCategoryCardProps> = ({
  category,
  onNavigate,
  aspectRatio = "aspect-[4/5]",
}) => {
  return (
    <div
      onClick={() => onNavigate(`/shop/${category.slug}`)}
      data-cursor="EXPLORE"
      className="group cursor-pointer bg-card border border-border/70 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:border-brand/40"
    >
      {/* Normalized 4:5 Aspect Ratio Image Container */}
      <div className={`relative w-full ${aspectRatio} overflow-hidden bg-muted`}>
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle Gradient Shadow at bottom for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Structured Card Content */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-card">
        <div>
          <h3 className="font-serif text-lg sm:text-xl text-foreground font-normal tracking-tight line-clamp-1 mb-1 group-hover:text-brand transition-colors duration-200">
            {category.name}
          </h3>
          {category.shortDescription && (
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed m-0">
              {category.shortDescription}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-3.5 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-brand">
          <span>Explore Weave</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};
