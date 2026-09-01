import { media } from "./media";

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  editorialStatement: string;
  heroImage: string;
  story: string;
  season: string;
}

export const collections: Collection[] = [
  {
    id: "silk-edit",
    slug: "silk-edit",
    title: "The Silk Edit",
    subtitle: "Fluid silhouettes woven with pure mulberry silk and antique gold zari.",
    editorialStatement: "An ode to quiet luxury — weightless drapes crafted for modern celebrations.",
    heroImage: media.collections.silkEdit,
    story: "Designed in our Mumbai atelier and hand-spun in Karnataka and Varanasi, The Silk Edit balances timeless Indian draping tradition with sharp, modern color palettes.",
    season: "Autumn / Winter 2026",
  },
  {
    id: "royal-banarasi",
    slug: "royal-banarasi",
    title: "Varanasi Kadwa Archive",
    subtitle: "Heirloom brocades where each motif is hand-locked individually.",
    editorialStatement: "A three-week weaving journey in every six yards.",
    heroImage: media.collections.royalBanarasi,
    story: "Woven by 4th-generation master craftsmen in the narrow alleys of Varanasi using pure katan silk and tested gold zari. These sarees are crafted to be passed down through generations.",
    season: "Heritage Collection",
  },
  {
    id: "monsoon-cottons",
    slug: "monsoon-cottons",
    title: "Monsoon Cottons",
    subtitle: "High-count breathable mulmul and organic handspun cottons.",
    editorialStatement: "The effortless grace of crisp, airy, sun-kissed textiles.",
    heroImage: media.collections.monsoonCottons,
    story: "Lightweight, breathable sarees dyed with mineral and low-impact herbal pigments. Perfect for warm Indian afternoons and daily boardroom elegance.",
    season: "Spring / Summer 2026",
  },
  {
    id: "noor-organza",
    slug: "noor-organza",
    title: "Noor Organza",
    subtitle: "Translucent silk organza with delicate floral borders and scallop hems.",
    editorialStatement: "Weightless poetry in motion.",
    heroImage: media.collections.noorOrganza,
    story: "Crafted for summer weddings and intimate celebrations, our organza sarees weigh under 350 grams and drape like a whisper around the silhouette.",
    season: "Festive Soirée",
  },
  {
    id: "minimal-handlooms",
    slug: "minimal-handlooms",
    title: "Minimalist Handlooms",
    subtitle: "Clean selvedges, architectural borders, and unbleached organic yarns.",
    editorialStatement: "The modern voice of traditional Indian craft.",
    heroImage: media.collections.minimalHandlooms,
    story: "Stripping away excessive ornamentation to showcase the natural beauty of raw silk, linen, and handspun slub textures.",
    season: "Contemporary Essentials",
  },
];
