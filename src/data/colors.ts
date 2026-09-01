export interface ColorFilter {
  id: string;
  name: string;
  hex: string;
  count?: number;
}

export const colors: ColorFilter[] = [
  { id: "wine", name: "Deep Wine / Maroon", hex: "#7C2430" },
  { id: "gold", name: "Antique Gold / Mustard", hex: "#B18A52" },
  { id: "emerald", name: "Deep Emerald Green", hex: "#234E3E" },
  { id: "ivory", name: "Warm Ivory / Cream", hex: "#F3EDE2" },
  { id: "rust", name: "Burnt Rust / Terracotta", hex: "#9E482B" },
  { id: "rose", name: "Dusty Rose / Blush", hex: "#C78C90" },
  { id: "indigo", name: "Deep Indigo / Royal Blue", hex: "#223354" },
  { id: "charcoal", name: "Obsidian / Charcoal", hex: "#2A2825" },
];

export interface OccasionFilter {
  id: string;
  name: string;
  tagline: string;
}

export const occasions: OccasionFilter[] = [
  { id: "wedding", name: "Wedding & Bridal", tagline: "Heirloom silks and zari brocades for grand moments" },
  { id: "festive", name: "Festive Soirée", tagline: "Celebratory hues woven with delicate luster" },
  { id: "everyday", name: "Everyday Handloom", tagline: "Effortless breathable drapes for daily comfort" },
  { id: "evening", name: "Evening & Cocktail", tagline: "Modern silhouettes in sheer organzas and fluid silks" },
  { id: "work", name: "Work & Boardroom", tagline: "Crisp linens and understated Chanderis" },
  { id: "gifting", name: "Heirloom Gifting", tagline: "Thoughtfully packaged pure craft treasures" },
];
