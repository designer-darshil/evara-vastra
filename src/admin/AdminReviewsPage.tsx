import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Star, CheckCircle, Trash2, Check, X, Sparkles } from "lucide-react";

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Customer Reviews" }]}
            onNavigate={onNavigate}
          />
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 mt-1.5 m-0">
            Customer Reviews & Testimonials ({reviews.length})
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Moderate shopper ratings, approve verified buyer feedback, and pin top reviews to the homepage.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-neutral-100 p-1 rounded-sm border border-neutral-200 self-start sm:self-auto">
          {(["all", "pending", "approved", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm capitalize transition-colors ${
                filter === tab
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {tab} ({reviews.filter((r) => (tab === "all" ? true : r.status === tab)).length})
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white border border-neutral-200 rounded-sm shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-neutral-50 text-[11px] font-bold text-neutral-500 uppercase tracking-wider border-b border-neutral-200">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Review Content</th>
                <th className="py-3 px-4">Product Context</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Home Feature</th>
                <th className="py-3 px-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              {filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-neutral-900 block">{review.customerName}</span>
                    <span className="text-[11px] text-neutral-400 font-mono">{review.date}</span>
                    {review.isVerified && (
                      <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                        <CheckCircle className="w-3 h-3" /> Verified Buyer
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex text-amber-500">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                  </td>

                  <td className="py-3 px-4 max-w-xs">
                    <strong className="font-semibold text-neutral-900 block mb-0.5">
                      {review.title}
                    </strong>
                    <p className="text-neutral-600 text-xs leading-relaxed line-clamp-2 m-0" title={review.comment}>
                      "{review.comment}"
                    </p>
                  </td>

                  <td className="py-3 px-4 text-neutral-700 font-medium">
                    {review.productTitle || "General Experience"}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
                        review.status === "approved"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : review.status === "rejected"
                          ? "bg-red-50 text-red-800 border-red-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      {review.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => updateReview(review.id, { isFeaturedOnHome: !review.isFeaturedOnHome })}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-sm border flex items-center gap-1 mx-auto transition-colors ${
                        review.isFeaturedOnHome
                          ? "bg-brand text-brand-foreground border-brand"
                          : "bg-neutral-50 text-neutral-600 border-neutral-300 hover:bg-neutral-100"
                      }`}
                      title="Toggle showcase on homepage testimonial carousel"
                    >
                      <Sparkles className="w-3 h-3" />
                      {review.isFeaturedOnHome ? "Featured" : "Pin to Home"}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {review.status !== "approved" && (
                        <button
                          onClick={() => updateReview(review.id, { status: "approved" })}
                          className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-sm transition-colors"
                          title="Approve Review"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      {review.status !== "rejected" && (
                        <button
                          onClick={() => updateReview(review.id, { status: "rejected" })}
                          className="p-1.5 text-amber-700 hover:bg-amber-50 rounded-sm transition-colors"
                          title="Reject Review"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-sm transition-colors"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredReviews.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    No customer reviews found matching the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
