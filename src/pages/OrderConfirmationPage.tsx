import React from "react";
import { Breadcrumbs } from "../components/common/Breadcrumbs";

interface OrderConfirmationPageProps {
  orderId?: string;
  onNavigate?: (href: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderId, onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="bg-secondary/50 py-10 border-b border-border">
        <div className="container">
          <Breadcrumbs items={[{ label: "Order Confirmation" }]} onNavigate={onNavigate} />
          <h1 className="font-serif text-3xl md:text-4xl mt-4">Order Received</h1>
        </div>
      </div>
      <div className="container mt-10 text-center">
        <h2 className="text-xl font-bold">Thank you for your purchase!</h2>
        <p className="text-muted-foreground mt-4">Order ID: {orderId}</p>
        <p className="text-muted-foreground mt-2">Confirmation details will be displayed here.</p>
      </div>
    </div>
  );
};
