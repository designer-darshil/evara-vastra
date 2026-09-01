import { media } from "./media";

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  image: string;
  itemCount: number;
}

export const categories: Category[] = [
  {
    id: "silk",
    slug: "silk",
    name: "Pure Silk",
    shortDescription: "Hand-spun mulberry and katan silks with lustrous drapes.",
    image: media.categories.silk,
    itemCount: 5,
  },
  {
    id: "banarasi",
    slug: "banarasi",
    name: "Royal Banarasi",
    shortDescription: "Timeless Kadwa brocades woven on pit looms in Varanasi.",
    image: media.categories.banarasi,
    itemCount: 4,
  },
  {
    id: "cotton",
    slug: "cotton",
    name: "Mulmul & Cotton",
    shortDescription: "Featherlight, breathable weaves crafted for all-day comfort.",
    image: media.categories.cotton,
    itemCount: 4,
  },
  {
    id: "organza",
    slug: "organza",
    name: "Sheer Organza",
    shortDescription: "Ethereal silk organza with delicate hand-drawn borders.",
    image: media.categories.organza,
    itemCount: 3,
  },
  {
    id: "linen",
    slug: "linen",
    name: "Pure Linen",
    shortDescription: "Contemporary unbleached European flax spun on Indian handlooms.",
    image: media.categories.linen,
    itemCount: 3,
  },
  {
    id: "handloom",
    slug: "handloom",
    name: "Artisan Handloom",
    shortDescription: "Direct-from-weaver textiles with organic selvedge finishes.",
    image: media.categories.handloom,
    itemCount: 6,
  },
  {
    id: "chanderi",
    slug: "chanderi",
    name: "Chanderi Silk-Cotton",
    shortDescription: "Sheer texture, luxurious feel, with fine zari butis.",
    image: media.categories.chanderi,
    itemCount: 2,
  },
];
