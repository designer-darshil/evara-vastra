import React from "react";
import { useData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Truck, RefreshCw, Mail, Phone, MapPin } from "lucide-react";

export const Footer: React.FC<{ onNavigate?: (href: string) => void }> = ({ onNavigate }) => {
  const { siteSettings, activeCategories } = useData();
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground pt-24 pb-12 border-t border-border">
      <div className="container">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 pb-16 border-b border-border">
          {/* Col 1: Brand & Atelier Contact */}
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-[11px] font-bold tracking-[0.26em] uppercase text-primary block mb-1.5">
                CONTEMPORARY INDIAN WOMENSWEAR
              </span>
              <h3 className="font-serif text-3xl tracking-widest text-foreground leading-none m-0">
                {siteSettings.name}
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground m-0">
              Surat-crafted Sarees, Designer Co-Ord Sets, Chinon Kurti Palazzo Ensembles, and Festive Anarkali Gowns designed for modern living.
            </p>

            <div className="text-[13px] text-muted-foreground flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>{siteSettings.atelierAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>Customer Care: {siteSettings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>Email: {siteSettings.email}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-5">
              Shop By Category
            </h4>
            <ul className="flex flex-col gap-3">
              {activeCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleNav(`/shop/${cat.slug}`)}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav("/shop?filter=newArrival")}
                  className="text-sm font-semibold text-brand hover:underline transition-colors mt-1 text-left"
                >
                  ★ New Season Drops
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-5">
              Customer Care & Policies
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Track Your Order", href: "/account/orders" },
                { label: "Shipping Policy", href: "/shipping-policy" },
                { label: "Replacement & Exchange", href: "/replacement-exchange-policy" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Contact Us", href: "/contact" },
                { label: "FAQs & Help Center", href: "/faq" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Assurance Badges */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-5">
              The Evara Promise
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Truck className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[13px] text-foreground block font-semibold">Free Pan-India Delivery</strong>
                  <span className="text-[12px] text-muted-foreground">Insured delivery to 28,000+ pin codes.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[13px] text-foreground block font-semibold">COD & 10% Prepaid Off</strong>
                  <span className="text-[12px] text-muted-foreground">Instant savings on UPI and card orders.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RefreshCw className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[13px] text-foreground block font-semibold">7-Day Easy Exchange</strong>
                  <span className="text-[12px] text-muted-foreground">Doorstep reverse pickup assistance.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-10 flex flex-wrap justify-between items-center gap-4 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} EVARA VASTRA. ALL RIGHTS RESERVED. SURAT, GUJARAT, INDIA.
          </div>
          <div className="flex gap-6">
            <button onClick={() => handleNav("/privacy-policy")} className="hover:text-brand transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleNav("/terms-of-service")} className="hover:text-brand transition-colors">
              Terms of Service
            </button>
            <button onClick={() => handleNav("/shipping-policy")} className="hover:text-brand transition-colors">
              Shipping & Delivery
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
