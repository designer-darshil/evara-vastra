import { media } from "./media";

export interface FabricInfo {
  id: string;
  name: string;
  feel: string;
  appearance: string;
  typicalUse: string;
  care: string;
  image: string;
}

export const fabrics: FabricInfo[] = [
  {
    id: "silk",
    name: "Pure Katan & Mulberry Silk",
    feel: "Rich, supple, with a liquid fluid drape and natural temperature-regulating breathability.",
    appearance: "Subtle luminous sheen without synthetic gloss, structured fall.",
    typicalUse: "Weddings, festive celebrations, evening soirées, family heirlooms.",
    care: "Dry clean only. Store wrapped in pure unbleached muslin fabric.",
    image: media.fabrics.silk,
  },
  {
    id: "cotton",
    name: "Mulmul & Khadi Cotton",
    feel: "Featherlight, soft against the skin, gets softer with every wash.",
    appearance: "Matte, organic slub texture with clean crisp borders.",
    typicalUse: "Daily boardroom wear, summer gatherings, art gallery openings, travel.",
    care: "Gentle cold hand wash with mild eco-detergent. Line dry in shade.",
    image: media.fabrics.cotton,
  },
  {
    id: "linen",
    name: "Pure Handloom Linen",
    feel: "Cool to the touch, breathable, durable, with a structured crisp fall.",
    appearance: "Earthy, textural cross-weave with refined selvedges.",
    typicalUse: "Workwear, summer brunches, destination weddings, smart-casual occasions.",
    care: "Dry clean recommended for first wash; subsequently gentle hand wash.",
    image: media.fabrics.linen,
  },
  {
    id: "organza",
    name: "Silk Organza",
    feel: "Crisp, airy, featherweight under 350 grams.",
    appearance: "Translucent sheer glow with delicate scallop borders and hand embroidery.",
    typicalUse: "Cocktail parties, day weddings, sangeet celebrations, festive gatherings.",
    care: "Dry clean only. Roll rather than fold to prevent permanent creasing.",
    image: media.fabrics.organza,
  },
  {
    id: "chanderi",
    name: "Chanderi Silk-Cotton",
    feel: "Lightweight with a subtle crisp bounce and comfortable breathability.",
    appearance: "Semi-sheer with delicate gold zari butis woven into the warp and weft.",
    typicalUse: "Poojas, daytime festive events, intimate dinner parties.",
    care: "Dry clean only to maintain gold zari brilliance.",
    image: media.fabrics.chanderi,
  },
  {
    id: "banarasi",
    name: "Banarasi Handloom Brocade",
    feel: "Substantial, royal, structured drape with soft underside Kadwa finish.",
    appearance: "Intricate floral jaal and antique gold/silver zari motifs.",
    typicalUse: "Bridal, grand festive rituals, heirloom gifts.",
    care: "Professional dry clean only. Air out twice a year.",
    image: media.fabrics.banarasiKatan,
  },
];
