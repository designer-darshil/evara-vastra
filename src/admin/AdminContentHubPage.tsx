import React from "react";
import { LayoutDashboard, Bell, Sparkles, Scissors, FileText, ArrowRight } from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminBadge } from "../components/admin/ui/AdminBadge";

export const AdminContentHubPage: React.FC<{ onNavigate: (href: string) => void }> = ({
  onNavigate,
}) => {
  const contentModules = [
    {
      title: "Homepage CMS",
      description: "Control hero banners, headline typography, featured collection spotlight, and section ordering.",
      href: "/admin/content/homepage",
      icon: LayoutDashboard,
      badge: "Core Storefront",
    },
    {
      title: "Website Notification Bar",
      description: "Manage the top announcement bar message, destination link, background theme, and priority.",
      href: "/admin/content/notification-bar",
      icon: Bell,
      badge: "Header Bar",
    },
    {
      title: "Lookbook Editor",
      description: "Create and publish high-fashion campaign looks, connect featured sarees, and edit styling notes.",
      href: "/admin/lookbook",
      icon: Sparkles,
      badge: "Editorial",
    },
    {
      title: "Craftsmanship & Atelier Story",
      description: "Edit generational handloom stories, Kadwa technique explanations, and workshop photography.",
      href: "/admin/content/craftsmanship",
      icon: Scissors,
      badge: "Heritage Page",
    },
    {
      title: "FAQ & Patron Knowledge Base",
      description: "Manage client questions regarding garment sizing, pure silk care, and express delivery.",
      href: "/admin/content/faq",
      icon: FileText,
      badge: "Support",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Content Management Hub"
        description="Centrally manage all customer-facing narratives, announcement ribbons, and visual assets without editing code."
      />

      {/* 2. Responsive Module Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {contentModules.map((mod, idx) => {
          const Icon = mod.icon;
          return (
            <AdminCard
              key={idx}
              className="flex flex-col justify-between cursor-pointer hover:border-[#734E06] hover:shadow-md transition-all group"
            >
              <div onClick={() => onNavigate(mod.href)}>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-sm bg-[#734E06]/10 text-[#734E06] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <AdminBadge variant="brand" size="sm">
                    {mod.badge}
                  </AdminBadge>
                </div>

                <h3 className="font-serif text-lg font-bold text-neutral-900 group-hover:text-[#734E06] transition-colors mb-2">
                  {mod.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed m-0">
                  {mod.description}
                </p>
              </div>

              <div
                onClick={() => onNavigate(mod.href)}
                className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#734E06] group-hover:translate-x-0.5 transition-transform"
              >
                <span>Configure Module</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </AdminCard>
          );
        })}
      </div>
    </div>
  );
};
