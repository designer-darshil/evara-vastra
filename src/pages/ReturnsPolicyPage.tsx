import React from "react";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useData } from "../context/DataContext";
import { RefreshCw } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

export const ReturnsPolicyPage: React.FC<{ onNavigate?: (href: string) => void }> = ({ onNavigate }) => {
  const { siteSettings } = useData();

  return (
    <div className="animate-in fade-in duration-500 pt-10 pb-28">
      <div className="container max-w-[860px]">
        <Breadcrumbs items={[{ label: "Replacement & Exchange Policy" }]} onNavigate={onNavigate} />

        <div className="my-6 mb-14">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent block mb-1.5">
            PATRON ASSURANCE
          </span>
          <h1 className="font-serif text-[clamp(2.4rem,4vw,3.4rem)] text-foreground m-0 leading-tight">
            Replacement & Exchange Policy
          </h1>
          <p className="text-[15px] text-muted-foreground mt-2 m-0">
            We want you to love your purchase. If a size or piece isn't perfect, we are here to assist.
          </p>
        </div>

        {/* Highlight Card */}
        <Card className="bg-background shadow-sm border-border mb-12">
          <CardContent className="p-8 flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-[22px] m-0 mb-1 text-foreground">
                {siteSettings.returnWindowDays || 7}-Day Hassle-Free Exchange Window
              </h3>
              <p className="text-[13px] text-muted-foreground m-0">
                Initiate an exchange or replacement within 7 days of package delivery date.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Policy Details */}
        <div className="flex flex-col gap-8 text-[15px] leading-[1.7] text-muted-foreground">
          <div>
            <h3 className="font-serif text-2xl text-foreground m-0 mb-2">
              1. Eligibility for Exchange / Replacement
            </h3>
            <p className="m-0 mb-2">To be eligible for an exchange, your item must be:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 m-0 marker:text-muted-foreground">
              <li>Unused, unworn, unwashed, and undamaged.</li>
              <li>In the original brand packaging with all tags and labels intact.</li>
              <li>Sarees with unstitched blouse pieces must have the blouse fabric attached and uncut.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-foreground m-0 mb-2">
              2. Damaged or Defective Items
            </h3>
            <p className="m-0">
              Every garment undergoes a strict 3-stage quality check at our Surat atelier before dispatch. In the rare event that you receive a defective or damaged product, please notify us within <strong className="text-foreground">48 hours</strong> of delivery along with clear photos of the defect. We will arrange a complimentary priority replacement immediately.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-foreground m-0 mb-2">
              3. How to Request an Exchange
            </h3>
            <p className="m-0">
              Please send a WhatsApp message to <strong className="text-foreground">{siteSettings.phone}</strong> or email <strong className="text-foreground">{siteSettings.email}</strong> with:
            </p>
            <div className="bg-secondary/30 p-5 border-l-4 border-accent my-3 rounded-r-sm text-[13px]">
              <p className="m-0">
                1. Order Number (e.g. EV-84920)<br />
                2. Reason for exchange (e.g. Size exchange from M to L)<br />
                3. Photos of the product in original tags
              </p>
            </div>
            <p className="m-0">Our concierge will approve the request and schedule a doorstep reverse pickup.</p>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-foreground m-0 mb-2">
              4. Reverse Pickup & Processing
            </h3>
            <p className="m-0">
              Reverse pickups are conducted within 24–48 hours of approval. Once the returned item is received and inspected at our hub, the replacement will be dispatched within 2 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
