import { media } from "./media";

export interface LookbookItem {
  id: string;
  lookNumber: string;
  title: string;
  season: string;
  location: string;
  narrative: string;
  image: string;
  productSlug: string;
  productTitle: string;
  productPrice: number;
  productFabric: string;
  stylingDetails: string[];
}

export const lookbookItems: LookbookItem[] = [
  {
    id: "look-01",
    lookNumber: "01",
    title: "Varanasi Nocturne",
    season: "Autumn / Winter 2026",
    location: "Studio Evara, Mumbai",
    narrative: "A dramatic evening silhouette capturing the liquid shimmer of pure Katan silk against midnight candlelight.",
    image: media.hero,
    productSlug: "raga-silk-saree",
    productTitle: "Raga Katan Silk Saree in Deep Wine",
    productPrice: 14800,
    productFabric: "Pure Katan Silk",
    stylingDetails: [
      "Deep wine Kadwa silk drape with 6 wide front pleats",
      "Hand-carved brass temple earrings",
      "Minimalist sleeveless raw silk corset",
      "Untamed low chignon with fresh mogra",
    ],
  },
  {
    id: "look-02",
    lookNumber: "02",
    title: "Morning in Chettinad",
    season: "Spring / Summer 2026",
    location: "Heritage Courtyard",
    narrative: "Sun-drenched verandahs and unhurried mornings wrapped in organic 100-count earthen mulmul cotton.",
    image: media.lookbook[1].image,
    productSlug: "meera-cotton-saree",
    productTitle: "Meera Handloom Mulmul Saree in Terracotta",
    productPrice: 6800,
    productFabric: "Pure Mulmul Cotton",
    stylingDetails: [
      "Loose, casual seedha pallu drape",
      "Relaxed contemporary artisanal linen silhouette",
      "Vintage silver kadas and silver toe rings",
      "Barefoot morning tea aesthetic",
    ],
  },
  {
    id: "look-03",
    lookNumber: "03",
    title: "The Royal Mandap",
    season: "Heritage Collection",
    location: "Private Haveli, Jaipur",
    narrative: "Heirloom tested gold zari shimmering under canopy arches — a three-week testament to Varanasi's master loom artisans.",
    image: media.lookbook[2].image,
    productSlug: "kashi-gold-banarasi",
    productTitle: "Kashi Gold Kadwa Banarasi Brocade Saree",
    productPrice: 24500,
    productFabric: "Pure Katan Silk & Real Tested Zari",
    stylingDetails: [
      "Classic royal Nivi drape with pinned gold pallu",
      "Heavy uncut polki choker and heritage jhumkas",
      "Regal gold zari border detailing",
      "Crimson alta-stained fingertips",
    ],
  },
  {
    id: "look-04",
    lookNumber: "04",
    title: "Golden Hour Sheer",
    season: "Festive Soirée",
    location: "Sunset Terrace, Alibaug",
    narrative: "Translucent silk organza filtering the late afternoon ocean light with delicate hand-cut scallop borders.",
    image: media.lookbook[3].image,
    productSlug: "noor-organza-saree",
    productTitle: "Noor Sheer Silk Organza Saree in Dusty Rose",
    productPrice: 11200,
    productFabric: "Pure Silk Organza",
    stylingDetails: [
      "Single-pin floating shoulder pallu",
      "Pearl-embellished sweetheart bralette",
      "Baroque pearl drop earrings",
      "Dewy bronze makeup palette",
    ],
  },
  {
    id: "look-05",
    lookNumber: "05",
    title: "The Minimalist Loom",
    season: "Contemporary Essentials",
    location: "Art Foundation Gallery, Delhi",
    narrative: "Clean architectural selvedge, raw European flax, and the quiet dignity of unadorned natural yarn.",
    image: media.lookbook[4].image,
    productSlug: "aaroh-linen-saree",
    productTitle: "Aaroh Organic Handloom Linen Saree in Unbleached Ivory",
    productPrice: 8200,
    productFabric: "100% Organic European Flax Linen",
    stylingDetails: [
      "Straight column drape with crisp vertical folds",
      "Tailored charcoal linen blazer over shoulders",
      "Sculptural sterling silver cuffs",
      "Clean center-parted slicked hair",
    ],
  },
];
