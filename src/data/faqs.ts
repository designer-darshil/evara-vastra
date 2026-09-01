export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "shipping" | "craft" | "care" | "returns" | "sizing";
}

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    category: "shipping",
    question: "How long does delivery take across India?",
    answer: "Standard domestic deliveries typically arrive within 3 to 5 business days. Express shipping takes 1 to 2 business days to major metropolitan cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata). All parcels are sent via insured courier with tracking details sent by email and SMS upon dispatch.",
  },
  {
    id: "faq-2",
    category: "shipping",
    question: "Do you ship internationally?",
    answer: "Yes, EVARA ships worldwide to over 45 countries including the USA, UK, UAE, Canada, Singapore, and Australia. International delivery takes 5 to 8 business days via DHL Express. Shipping rates and any applicable local duties are calculated transparently at checkout.",
  },
  {
    id: "faq-3",
    category: "sizing",
    question: "How do I choose the correct size for co-ord and kurta sets?",
    answer: "Our ready-to-wear kurta and co-ord sets follow standard Indian sizing (S to 3XL) with comfortable ease. Please refer to the size measurements listed on each product page or connect with our concierge for styling guidance.",
  },
  {
    id: "faq-4",
    category: "craft",
    question: "How do I know the sarees are authentic handlooms?",
    answer: "Every EVARA saree arrives with an artisan authentication card detailing the weave cluster, loom type (pit loom or frame loom), pure silk/cotton test certifications, and the approximate number of days dedicated to crafting that specific piece.",
  },
  {
    id: "faq-5",
    category: "care",
    question: "How should I store and care for my pure silk and zari sarees?",
    answer: "We recommend storing silk and Banarasi sarees wrapped in clean, breathable cotton or muslin fabric in a dark, dry space. Avoid direct contact with perfume sprays or moisture. Professional dry cleaning is advised. We also recommend unfolding and changing the fold lines every six months to prevent creasing at the gold zari joints.",
  },
  {
    id: "faq-6",
    category: "returns",
    question: "What is your return and exchange policy?",
    answer: "We offer a 7-day hassle-free exchange and replacement window for unworn garments in their original packaging with intact security tags. Simply initiate an exchange from your Account page or contact care@evaravastra.com.",
  },
  {
    id: "faq-7",
    category: "shipping",
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "Yes, Cash on Delivery is available for domestic orders across serviceable pin codes in India.",
  },
  {
    id: "faq-8",
    category: "craft",
    question: "Can I customize a saree or order bespoke bridal weaves?",
    answer: "Our master weaving ateliers accept custom commissions with advance notice. You can book an appointment with our team via our Contact page or WhatsApp Concierge.",
  },
];
