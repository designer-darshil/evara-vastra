export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "shipping" | "craft" | "care" | "returns" | "blouse";
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
    category: "blouse",
    question: "Is the blouse piece included with the saree?",
    answer: "Yes, all our sarees include an unstitched matching or complementary blouse piece (0.8m to 1.0m in length) attached to the end of the drape, unless explicitly specified otherwise in the product details. We also offer bespoke blouse tailoring services upon request through our concierge.",
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
    answer: "We offer a 7-day hassle-free exchange and return window for unstitched, unworn sarees in their original packaging with intact security tags. Simply initiate a return from your Account page or email concierge@evarasarees.com.",
  },
  {
    id: "faq-7",
    category: "shipping",
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "Yes, Cash on Delivery is available for domestic orders up to ₹25,000 across serviceable pin codes in India.",
  },
  {
    id: "faq-8",
    category: "craft",
    question: "Can I customize a saree or order bespoke bridal weaves?",
    answer: "Our master weaving ateliers in Varanasi accept custom bridal commissions with a minimum lead time of 6 to 8 weeks. You can book an appointment with our Creative Director via our Contact page or WhatsApp Concierge.",
  },
];
