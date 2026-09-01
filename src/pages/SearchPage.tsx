import React from "react";
import { Breadcrumbs } from "../components/common/Breadcrumbs";

interface SearchPageProps {
  onNavigate?: (href: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="bg-secondary/50 py-10 border-b border-border">
        <div className="container">
          <Breadcrumbs items={[{ label: "Search" }]} onNavigate={onNavigate} />
          <h1 className="font-serif text-3xl md:text-4xl mt-4">Search Results</h1>
        </div>
      </div>
      <div className="container mt-10">
        <p className="text-muted-foreground">Search functionality will be implemented here.</p>
      </div>
    </div>
  );
};
