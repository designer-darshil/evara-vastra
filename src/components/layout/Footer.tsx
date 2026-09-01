import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Truck,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Instagram,
  Facebook,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { PageContainer } from "../common/PageContainer";

export const Footer: React.FC<{ onNavigate?: (href: string) => void }> = ({ onNavigate }) => {
  const { siteSettings, activeCategories } = useData();
  const navigate = useNavigate();

  // Mobile Accordion State (all closed by default to keep mobile footer super compact)
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleNav = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    } else {
      navigate(href);
    }
  };

  const instagramUrl = siteSettings.instagramUrl || "https://instagram.com/evaravastra";
  const facebookUrl = siteSettings.facebookUrl || "https://facebook.com/evaravastra";

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border pt-12 sm:pt-16 md:pt-20 pb-10">
      <PageContainer>
        {/* ========================================================= */}
        {/* DESKTOP FOOTER LAYOUT (Hidden on Mobile <768px)          */}
        {/* ========================================================= */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-border">
          {/* Col 1: Brand Wordmark, Story & Socials */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary block mb-1">
                CONTEMPORARY INDIAN LUXURY
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl tracking-widest text-foreground leading-none m-0">
                {siteSettings.name}
              </h3>
            </div>

            <p className="text-xs lg:text-[13px] leading-relaxed text-muted-foreground m-0">
              Surat-crafted Sarees, Designer Co-Ord Sets, Chinon Kurti Palazzo Ensembles, and Festive Anarkali Gowns designed for modern living.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Evara Vastra on Instagram"
                  className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:text-brand hover:border-brand transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Evara Vastra on Facebook"
                  className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:text-brand hover:border-brand transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Shop Categories */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-4">
              Shop Weaves & Styles
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs lg:text-[13px]">
              {activeCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleNav(`/shop/${cat.slug}`)}
                    className="text-muted-foreground hover:text-brand transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav("/shop?filter=newArrival")}
                  className="font-semibold text-brand hover:underline transition-colors mt-0.5 text-left"
                >
                  ★ New Season Drops
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-4">
              Customer Care
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs lg:text-[13px]">
              {[
                { label: "Track Your Order", href: "/account/orders" },
                { label: "Shipping & Dispatch", href: "/shipping-policy" },
                { label: "7-Day Exchange & Returns", href: "/replacement-exchange-policy" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Help & FAQs", href: "/faq" },
                { label: "Contact Atelier", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className="text-muted-foreground hover:text-brand transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Atelier Contacts & Assurance */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-4">
              Atelier & Concierge
            </h4>
            <div className="flex flex-col gap-3 text-xs text-muted-foreground">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{siteSettings.atelierAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>Customer Care: {siteSettings.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>Email: {siteSettings.email}</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border/80 flex flex-col gap-2.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand shrink-0" />
                <span>Complimentary Express Pan-India Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
                <span>100% Authentic Handloom Silk Mark</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MOBILE FOOTER ACCORDION (Visible only on Mobile <768px)  */}
        {/* ========================================================= */}
        <div className="md:hidden flex flex-col space-y-4 pb-8 border-b border-border">
          {/* Mobile Brand & Social Block */}
          <div className="space-y-3">
            <div>
              <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-primary block mb-0.5">
                CONTEMPORARY INDIAN LUXURY
              </span>
              <h3 className="font-serif text-2xl tracking-widest text-foreground leading-none m-0">
                {siteSettings.name}
              </h3>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed m-0">
              Surat-crafted Sarees, Designer Co-Ord Sets, and Silk Ensembles for festive celebrations.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:text-brand"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:text-brand"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Quick Contact Line */}
            <div className="pt-2 border-t border-border flex flex-col gap-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{siteSettings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{siteSettings.email}</span>
              </div>
            </div>
          </div>

          {/* Accordion 1: Shop By Weave */}
          <div className="border-t border-border pt-3">
            <button
              onClick={() => toggleSection("shop")}
              className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-foreground text-left"
            >
              <span>Shop Collections</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform duration-200",
                  openSection === "shop" && "rotate-180"
                )}
              />
            </button>
            {openSection === "shop" && (
              <ul className="flex flex-col gap-2 pt-2 pb-3 text-xs pl-1">
                {activeCategories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleNav(`/shop/${cat.slug}`)}
                      className="text-muted-foreground hover:text-brand text-left py-0.5"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handleNav("/shop?filter=newArrival")}
                    className="font-semibold text-brand text-left py-0.5"
                  >
                    ★ New Season Drops
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* Accordion 2: Customer Care & Policies */}
          <div className="border-t border-border pt-3">
            <button
              onClick={() => toggleSection("care")}
              className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-foreground text-left"
            >
              <span>Customer Care & Policies</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform duration-200",
                  openSection === "care" && "rotate-180"
                )}
              />
            </button>
            {openSection === "care" && (
              <ul className="flex flex-col gap-2 pt-2 pb-3 text-xs pl-1">
                {[
                  { label: "Track Your Order", href: "/account/orders" },
                  { label: "Shipping Policy", href: "/shipping-policy" },
                  { label: "Replacement & Exchange", href: "/replacement-exchange-policy" },
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms of Service", href: "/terms-of-service" },
                  { label: "Contact Us", href: "/contact" },
                  { label: "FAQs & Help", href: "/faq" },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleNav(item.href)}
                      className="text-muted-foreground hover:text-brand text-left py-0.5"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Accordion 3: Atelier Information */}
          <div className="border-t border-border pt-3">
            <button
              onClick={() => toggleSection("atelier")}
              className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-foreground text-left"
            >
              <span>Atelier Information</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform duration-200",
                  openSection === "atelier" && "rotate-180"
                )}
              />
            </button>
            {openSection === "atelier" && (
              <div className="pt-2 pb-3 text-xs text-muted-foreground space-y-2 pl-1">
                <p className="m-0 leading-relaxed">{siteSettings.atelierAddress}</p>
                <div className="pt-2 flex flex-col gap-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-brand" />
                    <span>Free Shipping Across India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand" />
                    <span>Pure Handloom Silk Mark</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-brand" />
                    <span>7-Day Easy Doorstep Exchange</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM COPYRIGHT & LEGAL BAR                              */}
        {/* ========================================================= */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] sm:text-xs text-muted-foreground text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} EVARA VASTRA. ALL RIGHTS RESERVED. SURAT, GUJARAT, INDIA.
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <button onClick={() => handleNav("/privacy-policy")} className="hover:text-brand transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleNav("/terms-of-service")} className="hover:text-brand transition-colors">
              Terms of Service
            </button>
            <button onClick={() => handleNav("/shipping-policy")} className="hover:text-brand transition-colors">
              Shipping Policy
            </button>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
};
