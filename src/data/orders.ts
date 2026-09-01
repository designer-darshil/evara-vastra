export interface OrderItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  fabric: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "Delivered" | "In Transit" | "Processing";
  total: number;
  paymentMethod: string;
  shippingAddress: string;
  trackingNumber: string;
  estimatedDelivery?: string;
  items: OrderItem[];
}

export const demoOrders: Order[] = [
  {
    id: "ord-1024",
    orderNumber: "DEMO-EV-9821",
    date: "18 Aug 2026",
    status: "Delivered",
    total: 14800,
    paymentMethod: "UPI / NetBanking",
    shippingAddress: "Bungalow 4, Pali Hill, Bandra West, Mumbai 400050",
    trackingNumber: "BLRD-99381029",
    items: [
      {
        id: "raga-silk-01",
        slug: "raga-silk-saree",
        title: "Raga Katan Silk Saree in Deep Wine",
        price: 14800,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
        fabric: "Pure Katan Silk",
      },
    ],
  },
  {
    id: "ord-1022",
    orderNumber: "DEMO-EV-7419",
    date: "04 Aug 2026",
    status: "Delivered",
    total: 15000,
    paymentMethod: "Credit Card (Visa ending 4120)",
    shippingAddress: "Apartment 1202, Regency Park, DLF Phase 4, Gurgaon 122002",
    trackingNumber: "DX-88271104",
    items: [
      {
        id: "meera-cotton-02",
        slug: "meera-cotton-saree",
        title: "Meera Handloom Mulmul Saree in Terracotta",
        price: 6800,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop",
        fabric: "Pure Mulmul Cotton",
      },
      {
        id: "aaroh-linen-05",
        slug: "aaroh-linen-saree",
        title: "Aaroh Organic Handloom Linen Saree",
        price: 8200,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=600&auto=format&fit=crop",
        fabric: "100% Organic Linen",
      },
    ],
  },
];
