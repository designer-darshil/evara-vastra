import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { Star, CheckCircle, MessageSquarePlus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Section } from "../common/Section";
import { PageContainer } from "../common/PageContainer";

export const CustomerReviewsSection: React.FC<{ onNavigate?: (href: string) => void }> = () => {
  const { featuredReviews, addReview, publishedProducts } = useData();
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState("");
  const [formComment, setFormComment] = useState("");
  const [formProduct, setFormProduct] = useState(publishedProducts[0]?.title || "");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    addReview({
      customerName: formName,
      rating: formRating,
      title: formTitle || "Delighted with my purchase",
      comment: formComment,
      isVerified: true,
      productTitle: formProduct,
      status: "approved",
      isFeaturedOnHome: true,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowModal(false);
      setFormName("");
      setFormTitle("");
      setFormComment("");
    }, 1800);
  };

  return (
    <Section spacing="lg" className="bg-secondary">
      <PageContainer>
        {/* Rating Header */}
        <div className="flex flex-wrap justify-between items-end mb-10 md:mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <span className="text-sm font-bold text-foreground">
                4.87 / 5.0
              </span>
              <span className="text-sm text-muted-foreground hidden sm:inline-block">
                (106+ Verified Patron Reviews)
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground m-0">
              Loved Across India
            </h2>
          </div>

          <Button
            onClick={() => setShowModal(true)}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <MessageSquarePlus className="w-4 h-4" /> Write a Review
          </Button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {featuredReviews.map((review) => (
            <Card key={review.id} className="bg-background shadow-sm h-full flex flex-col justify-between">
              <CardContent className="p-7 flex flex-col h-full">
                <div className="flex-1">
                  {/* Stars */}
                  <div className="flex text-amber-500 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>

                  <h3 className="font-serif text-[19px] text-foreground m-0 mb-2 leading-tight">
                    "{review.title}"
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed m-0 mb-5">
                    {review.comment}
                  </p>
                </div>

                <div className="pt-4 border-t border-border mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-foreground">
                      {review.customerName}
                    </span>
                    {review.isVerified && (
                      <span className="text-[11px] text-green-600 dark:text-green-400 flex items-center gap-1 font-semibold">
                        <CheckCircle className="w-3 h-3" /> Verified Buyer
                      </span>
                    )}
                  </div>
                  {review.productTitle && (
                    <span className="text-xs text-muted-foreground/70 block mt-1">
                      Item: {review.productTitle}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContainer>

      {/* Review Submission Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-background w-full max-w-[500px] p-8 rounded-sm shadow-xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                <h3 className="font-serif text-2xl mb-2">Thank You!</h3>
                <p className="text-muted-foreground text-sm">Your verified review has been published.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-serif text-2xl m-0 mb-2">Write a Customer Review</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Share your experience with fabric quality, drape, and delivery.
                </p>

                <div className="mb-4">
                  <label className="block text-xs font-semibold mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormRating(star)}
                        className="bg-transparent border-none cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star className={`w-6 h-6 ${star <= formRating ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold mb-1">Your Name *</label>
                  <Input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Pooja S."
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold mb-1">Product Purchased</label>
                  <select
                    value={formProduct}
                    onChange={(e) => setFormProduct(e.target.value)}
                    className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {publishedProducts.slice(0, 15).map((p) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold mb-1">Review Headline</label>
                  <Input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Loved the fabric softness and vibrant color!"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-semibold mb-1">Detailed Comments *</label>
                  <textarea
                    required
                    rows={4}
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    placeholder="Tell other patrons about the fit, zari work, packaging, and styling..."
                    className="flex w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Verified Review
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </Section>
  );
};
