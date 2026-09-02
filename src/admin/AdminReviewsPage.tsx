import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Star, Trash2, Check, X, Sparkles } from "lucide-react";
import { AdminPageHeader } from "../components/admin/ui/AdminPageHeader";
import { AdminCard } from "../components/admin/ui/AdminCard";
import { AdminBadge } from "../components/admin/ui/AdminBadge";
import { AdminEmptyState } from "../components/admin/ui/AdminEmptyState";

export const AdminReviewsPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const { reviews, updateReview, deleteReview } = useData();
  const [filter, setFilter] = useState<"all" | "approved" | "pending" | "rejected">("all");

  const filteredReviews = reviews.filter((r) => {
    if (filter === "approved") return r.status === "approved";
    if (filter === "pending") return r.status === "pending";
    if (filter === "rejected") return r.status === "rejected";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <AdminPageHeader
        title="Patron Reviews & Testimonials"
        description="Moderate shopper ratings, approve verified buyer feedback, and pin top reviews to the storefront testimonial carousel."
        breadcrumbs={
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Customer Reviews" }]}
            onNavigate={onNavigate}
          />
        }
        badge={
          <AdminBadge variant="brand" size="md">
            {reviews.length} Reviews
          </AdminBadge>
        }
        actions={
          <div className="flex bg-neutral-100 p-1 rounded-sm border border-neutral-200">
            {(["all", "pending", "approved", "rejected"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`h-9 px-3.5 text-xs font-semibold rounded-xs capitalize transition-colors ${
                  filter === tab
                    ? "bg-white text-neutral-900 shadow-2xs font-bold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {tab} ({reviews.filter((r) => (tab === "all" ? true : r.status === tab)).length})
              </button>
            ))}
          </div>
        }
      />

      {/* 2. Main Reviews Container */}
      <AdminCard noPadding>
        {/* Mobile View: Cards (< 768px) */}
        <div className="md:hidden divide-y divide-neutral-100">
          {filteredReviews.map((review) => (
            <div key={review.id} className="p-4 sm:p-5 space-y-3 bg-white">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <strong className="text-sm font-bold text-neutral-900 block">{review.customerName}</strong>
                  <span className="text-xs text-neutral-400 font-mono">{review.date}</span>
                </div>
                <div className="flex text-amber-500">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
              </div>

              <div>
                <strong className="text-sm text-neutral-900 block mb-1">{review.title}</strong>
                <p className="text-xs text-neutral-600 leading-relaxed m-0">"{review.comment}"</p>
                <span className="text-xs text-neutral-500 block mt-1.5 font-medium">
                  Product: {review.productTitle || "General Store Experience"}
                </span>
              </div>

              <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <AdminBadge
                    variant={review.status === "approved" ? "success" : review.status === "rejected" ? "danger" : "warning"}
                    size="sm"
                  >
                    {review.status}
                  </AdminBadge>

                  <button
                    onClick={() => updateReview(review.id, { isFeaturedOnHome: !review.isFeaturedOnHome })}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-sm border flex items-center gap-1 transition-colors ${
                      review.isFeaturedOnHome
                        ? "bg-[#734E06] text-white border-[#734E06]"
                        : "bg-neutral-50 text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                    }`}
                  >
                    <Sparkles className="w-3 h-3" /> Featured
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {review.status !== "approved" && (
                    <button
                      onClick={() => updateReview(review.id, { status: "approved" })}
                      className="p-1.5 bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 rounded-sm"
                      title="Approve Review"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  {review.status !== "rejected" && (
                    <button
                      onClick={() => updateReview(review.id, { status: "rejected" })}
                      className="p-1.5 bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 rounded-sm"
                      title="Reject Review"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="p-1.5 bg-red-50 text-red-700 border border-red-300 hover:bg-red-100 rounded-sm"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <AdminEmptyState
              icon={<Star className="w-8 h-8 text-neutral-400" />}
              title="No Reviews In This View"
              description="No customer reviews match your active filter tab."
            />
          )}
        </div>

        {/* Desktop View: Full Table (>= 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-neutral-50/80 text-xs font-bold text-neutral-600 uppercase tracking-wider border-b border-neutral-200">
                <th className="py-3.5 px-5 w-2/12">Patron & Date</th>
                <th className="py-3.5 px-4 w-1/12">Rating</th>
                <th className="py-3.5 px-4 w-5/12">Review Content & Product</th>
                <th className="py-3.5 px-4 text-center w-2/12">Status & Feature</th>
                <th className="py-3.5 px-5 text-right w-2/12">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
              {filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3.5 px-5">
                    <strong className="text-neutral-900 block font-semibold">{review.customerName}</strong>
                    <span className="text-xs text-neutral-400 font-mono">{review.date}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex text-amber-500">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <strong className="text-neutral-900 text-xs block mb-0.5">{review.title}</strong>
                    <p className="text-xs text-neutral-600 leading-relaxed m-0 line-clamp-2">
                      "{review.comment}"
                    </p>
                    <span className="text-xs text-neutral-400 block mt-1 font-mono">
                      {review.productTitle || "General Experience"}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <AdminBadge
                        variant={review.status === "approved" ? "success" : review.status === "rejected" ? "danger" : "warning"}
                        size="sm"
                      >
                        {review.status}
                      </AdminBadge>

                      <button
                        onClick={() => updateReview(review.id, { isFeaturedOnHome: !review.isFeaturedOnHome })}
                        className={`px-2 py-0.5 text-xs font-semibold rounded-xs border flex items-center gap-1 transition-colors ${
                          review.isFeaturedOnHome
                            ? "bg-[#734E06] text-white border-[#734E06]"
                            : "bg-neutral-50 text-neutral-600 border-neutral-300 hover:bg-neutral-100"
                        }`}
                      >
                        <Sparkles className="w-3 h-3" /> Featured
                      </button>
                    </div>
                  </td>

                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {review.status !== "approved" && (
                        <button
                          onClick={() => updateReview(review.id, { status: "approved" })}
                          className="p-1.5 bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 rounded-sm"
                          title="Approve"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      {review.status !== "rejected" && (
                        <button
                          onClick={() => updateReview(review.id, { status: "rejected" })}
                          className="p-1.5 bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 rounded-sm"
                          title="Reject"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="p-1.5 bg-red-50 text-red-700 border border-red-300 hover:bg-red-100 rounded-sm"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredReviews.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <AdminEmptyState
                      icon={<Star className="w-8 h-8 text-neutral-400" />}
                      title="No Reviews In This View"
                      description="No customer reviews match your active filter tab."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
};
