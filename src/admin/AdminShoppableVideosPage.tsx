import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  Plus,
  Trash2,
  Edit2,
  Play,
  Eye,
  EyeOff,
  Save,
  X,
  Video,
  ArrowUp,
  ArrowDown,
  ShoppingBag,
  UploadCloud,
  Link2,
  Loader2,
} from "lucide-react";
import { ShoppableVideo } from "../types";
import { Button } from "../components/ui/button";
import { mediaStorage, validateMediaFile } from "../lib/media/storage";

export const AdminShoppableVideosPage: React.FC<{ onNavigate?: (href: string) => void }> = ({
  onNavigate,
}) => {
  const {
    shoppableVideos,
    addShoppableVideo,
    updateShoppableVideo,
    deleteShoppableVideo,
    publishedProducts,
  } = useData();

  const [editingVideo, setEditingVideo] = useState<Partial<ShoppableVideo> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [productSearch, setProductSearch] = useState("");

  // Media input mode states
  const [videoInputMode, setVideoInputMode] = useState<"upload" | "url">("url");
  const [posterInputMode, setPosterInputMode] = useState<"upload" | "url">("url");
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const [isPosterUploading, setIsPosterUploading] = useState(false);
  const [videoUploadError, setVideoUploadError] = useState<string | null>(null);
  const [posterUploadError, setPosterUploadError] = useState<string | null>(null);

  const sortedVideos = [...shoppableVideos].sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleUploadVideoFile = async (files: FileList | null) => {
    if (!files || files.length === 0 || !editingVideo) return;
    const file = files[0];
    const validation = validateMediaFile(file, "video");
    if (!validation.isValid) {
      setVideoUploadError(validation.error || "Invalid video file.");
      return;
    }

    setVideoUploadError(null);
    setIsVideoUploading(true);
    const result = await mediaStorage.upload(file, "video");
    if (result.success && result.mediaItem) {
      setEditingVideo((prev) => (prev ? { ...prev, videoUrl: result.mediaItem!.url } : null));
    } else {
      setVideoUploadError(result.error || "Video upload failed.");
    }
    setIsVideoUploading(false);
  };

  const handleUploadPosterFile = async (files: FileList | null) => {
    if (!files || files.length === 0 || !editingVideo) return;
    const file = files[0];
    const validation = validateMediaFile(file, "image");
    if (!validation.isValid) {
      setPosterUploadError(validation.error || "Invalid poster file.");
      return;
    }

    setPosterUploadError(null);
    setIsPosterUploading(true);
    const result = await mediaStorage.upload(file, "image");
    if (result.success && result.mediaItem) {
      setEditingVideo((prev) =>
        prev ? { ...prev, thumbnailUrl: result.mediaItem!.url, posterUrl: result.mediaItem!.url } : null
      );
    } else {
      setPosterUploadError(result.error || "Poster upload failed.");
    }
    setIsPosterUploading(false);
  };

  const handleOpenNew = () => {
    setIsNew(true);
    const firstProduct = publishedProducts[0];
    setEditingVideo({
      title: "",
      description: "",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnailUrl: firstProduct?.images[0] || "",
      posterUrl: firstProduct?.images[0] || "",
      productId: firstProduct?.id || "",
      productTitle: firstProduct?.title || "",
      productPrice: firstProduct?.price || 2999,
      productSlug: firstProduct?.slug || "",
      ctaText: "Shop Look →",
      ctaUrl: firstProduct ? `/products/${firstProduct.slug}` : "",
      isPublished: true,
      order: shoppableVideos.length + 1,
      autoplay: true,
      muted: true,
    });
  };

  const handleOpenEdit = (vid: ShoppableVideo) => {
    setIsNew(false);
    setEditingVideo({ ...vid });
  };

  const handleProductSelect = (prodId: string) => {
    const prod = publishedProducts.find((p) => p.id === prodId);
    if (!prod || !editingVideo) return;

    setEditingVideo({
      ...editingVideo,
      productId: prod.id,
      productTitle: prod.title,
      productPrice: prod.price,
      productSlug: prod.slug,
      ctaUrl: `/products/${prod.slug}`,
      thumbnailUrl: editingVideo.thumbnailUrl || prod.images[0],
      posterUrl: editingVideo.posterUrl || prod.images[0],
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo || !editingVideo.title || !editingVideo.videoUrl) return;

    const matchedProduct = publishedProducts.find((p) => p.id === editingVideo.productId) || publishedProducts[0];

    const payload: Omit<ShoppableVideo, "id"> = {
      title: editingVideo.title,
      description: editingVideo.description || "",
      videoUrl: editingVideo.videoUrl,
      mobileVideoUrl: editingVideo.mobileVideoUrl || editingVideo.videoUrl,
      thumbnailUrl: editingVideo.thumbnailUrl || matchedProduct?.images[0] || "",
      posterUrl: editingVideo.posterUrl || editingVideo.thumbnailUrl || matchedProduct?.images[0] || "",
      productId: matchedProduct?.id || "ev-1",
      productTitle: matchedProduct?.title || "Signature Piece",
      productPrice: matchedProduct?.price || 2999,
      productSlug: matchedProduct?.slug || "signature-piece",
      ctaText: editingVideo.ctaText || "Shop Look →",
      ctaUrl: editingVideo.ctaUrl || (matchedProduct ? `/products/${matchedProduct.slug}` : "/shop"),
      isPublished: editingVideo.isPublished !== undefined ? editingVideo.isPublished : true,
      order: editingVideo.order || shoppableVideos.length + 1,
      autoplay: editingVideo.autoplay !== undefined ? editingVideo.autoplay : true,
      muted: editingVideo.muted !== undefined ? editingVideo.muted : true,
      createdAt: editingVideo.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isNew) {
      addShoppableVideo(payload);
    } else if (editingVideo.id) {
      updateShoppableVideo(editingVideo.id, payload);
    }

    setEditingVideo(null);
    setIsNew(false);
  };

  const handleMoveOrder = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === sortedVideos.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const current = sortedVideos[index];
    const target = sortedVideos[targetIndex];

    const tempOrder = current.order;
    updateShoppableVideo(current.id, { order: target.order });
    updateShoppableVideo(target.id, { order: tempOrder });
  };

  const filteredProducts = publishedProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Shoppable Videos CMS" }]}
            onNavigate={onNavigate}
          />
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 mt-1.5 m-0 flex items-center gap-2">
            <Video className="w-6 h-6 text-[#734E06]" />
            Shoppable Video CMS
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage interactive vertical video cards, playback streams, and linked storefront products.
          </p>
        </div>

        <Button
          onClick={handleOpenNew}
          className="bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 h-10 shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add New Video Reel
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-neutral-200 rounded-sm shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
            Total Video Reels
          </span>
          <span className="text-2xl font-serif font-bold text-neutral-900 block mt-1">
            {shoppableVideos.length}
          </span>
        </div>

        <div className="bg-white p-4 border border-neutral-200 rounded-sm shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
            Published Live
          </span>
          <span className="text-2xl font-serif font-bold text-emerald-700 block mt-1">
            {shoppableVideos.filter((v) => v.isPublished).length}
          </span>
        </div>

        <div className="bg-white p-4 border border-neutral-200 rounded-sm shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
            Unpublished / Drafts
          </span>
          <span className="text-2xl font-serif font-bold text-amber-700 block mt-1">
            {shoppableVideos.filter((v) => !v.isPublished).length}
          </span>
        </div>

        <div className="bg-white p-4 border border-neutral-200 rounded-sm shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
            Linked Products
          </span>
          <span className="text-2xl font-serif font-bold text-neutral-900 block mt-1">
            {new Set(shoppableVideos.map((v) => v.productId)).size}
          </span>
        </div>
      </div>

      {/* Video Cards Grid / Management Table */}
      {sortedVideos.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-sm p-12 text-center space-y-3">
          <Video className="w-12 h-12 text-neutral-300 mx-auto" />
          <h3 className="text-base font-bold text-neutral-900 m-0">No Shoppable Videos Added</h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            Create your first interactive video card to showcase fabric flow and styled looks on the homepage.
          </p>
          <Button onClick={handleOpenNew} className="bg-[#734E06] text-white text-xs">
            Create First Video
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {sortedVideos.map((vid, idx) => (
            <div
              key={vid.id}
              className={`bg-white border rounded-sm overflow-hidden shadow-xs flex flex-col justify-between transition-all ${
                vid.isPublished ? "border-neutral-200" : "border-amber-300 bg-amber-50/20"
              }`}
            >
              {/* Media Aspect Container */}
              <div className="relative aspect-[9/16] bg-neutral-900 overflow-hidden group">
                <img
                  src={vid.thumbnailUrl || vid.posterUrl}
                  alt={vid.title}
                  className="w-full h-full object-cover"
                />

                {/* Status Badges */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs ${
                      vid.isPublished ? "bg-emerald-600 text-white" : "bg-neutral-800 text-neutral-300"
                    }`}
                  >
                    {vid.isPublished ? "Live on Storefront" : "Draft (Hidden)"}
                  </span>

                  <span className="text-[10px] font-mono font-bold bg-black/60 text-white px-1.5 py-0.5 rounded-xs">
                    #{vid.order || idx + 1}
                  </span>
                </div>

                {/* Play Preview Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setVideoPreviewUrl(vid.videoUrl)}
                    className="w-10 h-10 rounded-full bg-white text-[#734E06] flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    title="Preview Video"
                  >
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </button>
                </div>
              </div>

              {/* Card Meta & Actions */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                <div>
                  <h4 className="font-serif text-sm font-bold text-neutral-900 line-clamp-2 m-0">
                    {vid.title}
                  </h4>

                  <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center gap-2">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#734E06] shrink-0" />
                    <span className="text-neutral-600 truncate font-semibold">
                      {vid.productTitle}
                    </span>
                  </div>

                  <span className="text-neutral-900 font-bold block mt-1">
                    ₹{vid.productPrice?.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Reorder and Edit Actions */}
                <div className="pt-3 border-t border-neutral-100 space-y-2">
                  {/* Order Up/Down */}
                  <div className="flex items-center justify-between text-[11px] text-neutral-500">
                    <span>Display Sequence:</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveOrder(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 border border-neutral-200 rounded-xs hover:bg-neutral-50 disabled:opacity-30"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleMoveOrder(idx, "down")}
                        disabled={idx === sortedVideos.length - 1}
                        className="p-1 border border-neutral-200 rounded-xs hover:bg-neutral-50 disabled:opacity-30"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateShoppableVideo(vid.id, { isPublished: !vid.isPublished })
                      }
                      className="text-[11px] h-7 px-1 flex items-center justify-center gap-1"
                      title={vid.isPublished ? "Hide from Storefront" : "Publish to Storefront"}
                    >
                      {vid.isPublished ? <EyeOff className="w-3 h-3 text-amber-700" /> : <Eye className="w-3 h-3 text-emerald-700" />}
                      {vid.isPublished ? "Hide" : "Publish"}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEdit(vid)}
                      className="text-[11px] h-7 px-1 flex items-center justify-center gap-1"
                    >
                      <Edit2 className="w-3 h-3 text-neutral-700" /> Edit
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteConfirmId(vid.id)}
                      className="text-[11px] h-7 px-1 text-red-700 border-red-200 hover:bg-red-50 flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Del
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Video Drawer Modal */}
      {editingVideo && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4"
          style={{ zIndex: 70 }}
          onClick={() => setEditingVideo(null)}
        >
          <div
            className="bg-white max-w-2xl w-full rounded-sm shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div>
                <h3 className="font-serif text-lg font-bold text-neutral-900 m-0">
                  {isNew ? "Create New Shoppable Video" : "Edit Shoppable Video Card"}
                </h3>
                <span className="text-xs text-neutral-500">
                  Configure streaming source, poster frame, and linked catalog garment.
                </span>
              </div>

              <button
                onClick={() => setEditingVideo(null)}
                className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-5 overflow-y-auto space-y-4 text-xs">
              {/* Title & Description */}
              <div className="space-y-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Reel Headline / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingVideo.title || ""}
                    onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                    placeholder="e.g. Fandy Silk Heavy Embroidery Kurti Set in Mehndi Green"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm font-semibold text-neutral-900 focus:bg-white focus:border-[#734E06] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Short Editorial Description
                  </label>
                  <input
                    type="text"
                    value={editingVideo.description || ""}
                    onChange={(e) =>
                      setEditingVideo({ ...editingVideo, description: e.target.value })
                    }
                    placeholder="e.g. Detailed drape of the Fandy silk co-ord kurti featuring intricate sequence work."
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900 focus:bg-white focus:border-[#734E06] outline-none"
                  />
                </div>
              </div>

              {/* Video Source (Upload vs URL) */}
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 m-0">
                    Video Stream Source (MP4 / WebM) *
                  </label>
                  <div className="flex bg-neutral-200 p-0.5 rounded-xs text-[10px] font-bold uppercase">
                    <button
                      type="button"
                      onClick={() => setVideoInputMode("upload")}
                      className={`px-2.5 py-1 rounded-xs transition-colors ${
                        videoInputMode === "upload" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
                      }`}
                    >
                      <UploadCloud className="w-3 h-3 inline mr-1" /> Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoInputMode("url")}
                      className={`px-2.5 py-1 rounded-xs transition-colors ${
                        videoInputMode === "url" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
                      }`}
                    >
                      <Link2 className="w-3 h-3 inline mr-1" /> URL
                    </button>
                  </div>
                </div>

                {videoUploadError && (
                  <div className="p-2 bg-red-50 border border-red-200 text-red-700 text-[11px] rounded-sm">
                    {videoUploadError}
                  </div>
                )}

                {videoInputMode === "upload" ? (
                  <div>
                    <label className="border border-dashed border-neutral-300 hover:border-neutral-400 bg-white rounded-sm p-4 text-center cursor-pointer flex flex-col items-center justify-center gap-1.5 transition-colors block">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleUploadVideoFile(e.target.files)}
                        className="hidden"
                      />
                      {isVideoUploading ? (
                        <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                          <Loader2 className="w-4 h-4 animate-spin text-[#734E06]" />
                          <span>Processing video file...</span>
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="w-5 h-5 text-[#734E06]" />
                          <span className="text-xs font-bold text-neutral-800">
                            Select video from device / gallery
                          </span>
                          <span className="text-[10px] text-neutral-500">MP4, WebM up to 100MB</span>
                        </>
                      )}
                    </label>
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      required
                      value={editingVideo.videoUrl || ""}
                      onChange={(e) =>
                        setEditingVideo({ ...editingVideo, videoUrl: e.target.value })
                      }
                      placeholder="https://commondatastorage.googleapis.com/.../video.mp4"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm font-mono text-[11px] text-neutral-900 focus:border-[#734E06] outline-none"
                    />
                  </div>
                )}

                {editingVideo.videoUrl && (
                  <div className="text-[11px] text-neutral-500 truncate">
                    <span className="font-bold text-neutral-700">Active Source:</span> {editingVideo.videoUrl}
                  </div>
                )}
              </div>

              {/* Poster Image (Upload vs URL) */}
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 m-0">
                    Poster / Thumbnail Image *
                  </label>
                  <div className="flex bg-neutral-200 p-0.5 rounded-xs text-[10px] font-bold uppercase">
                    <button
                      type="button"
                      onClick={() => setPosterInputMode("upload")}
                      className={`px-2.5 py-1 rounded-xs transition-colors ${
                        posterInputMode === "upload" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
                      }`}
                    >
                      <UploadCloud className="w-3 h-3 inline mr-1" /> Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => setPosterInputMode("url")}
                      className={`px-2.5 py-1 rounded-xs transition-colors ${
                        posterInputMode === "url" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
                      }`}
                    >
                      <Link2 className="w-3 h-3 inline mr-1" /> URL
                    </button>
                  </div>
                </div>

                {posterUploadError && (
                  <div className="p-2 bg-red-50 border border-red-200 text-red-700 text-[11px] rounded-sm">
                    {posterUploadError}
                  </div>
                )}

                {posterInputMode === "upload" ? (
                  <div>
                    <label className="border border-dashed border-neutral-300 hover:border-neutral-400 bg-white rounded-sm p-4 text-center cursor-pointer flex flex-col items-center justify-center gap-1.5 transition-colors block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadPosterFile(e.target.files)}
                        className="hidden"
                      />
                      {isPosterUploading ? (
                        <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                          <Loader2 className="w-4 h-4 animate-spin text-[#734E06]" />
                          <span>Processing image file...</span>
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="w-5 h-5 text-[#734E06]" />
                          <span className="text-xs font-bold text-neutral-800">
                            Select poster photo from device
                          </span>
                          <span className="text-[10px] text-neutral-500">JPEG, PNG, WebP up to 10MB</span>
                        </>
                      )}
                    </label>
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      required
                      value={editingVideo.thumbnailUrl || ""}
                      onChange={(e) =>
                        setEditingVideo({
                          ...editingVideo,
                          thumbnailUrl: e.target.value,
                          posterUrl: e.target.value,
                        })
                      }
                      placeholder="https://cdn.shopify.com/.../poster.jpg"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm text-neutral-900 focus:border-[#734E06] outline-none"
                    />
                  </div>
                )}

                {editingVideo.thumbnailUrl && (
                  <div className="flex items-center gap-2">
                    <img
                      src={editingVideo.thumbnailUrl}
                      alt="Thumbnail Preview"
                      className="w-12 h-12 object-cover rounded-xs border border-neutral-200"
                    />
                    <div className="text-[11px] text-neutral-500 truncate">
                      <span className="font-bold text-neutral-700">Preview:</span> {editingVideo.thumbnailUrl}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Association Selector */}
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-3">
                <label className="block font-bold uppercase tracking-wider text-neutral-700 m-0">
                  Linked Evara Vastra Product *
                </label>

                <input
                  type="text"
                  placeholder="Search catalog products..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded-sm text-xs"
                />

                <select
                  value={editingVideo.productId || ""}
                  onChange={(e) => handleProductSelect(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-sm font-semibold text-neutral-900 focus:border-[#734E06] outline-none cursor-pointer"
                >
                  {filteredProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} (₹{p.price.toLocaleString("en-IN")}) — {p.category}
                    </option>
                  ))}
                </select>

                {editingVideo.productId && (
                  <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-600">
                    <span>
                      Selected: <strong>{editingVideo.productTitle}</strong>
                    </span>
                    <span className="font-bold text-[#734E06]">
                      ₹{editingVideo.productPrice?.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>

              {/* Call to action & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={editingVideo.ctaText || "Shop Look →"}
                    onChange={(e) => setEditingVideo({ ...editingVideo, ctaText: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm font-semibold text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Sort Order Index
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingVideo.order || 1}
                    onChange={(e) =>
                      setEditingVideo({
                        ...editingVideo,
                        order: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-sm text-neutral-900"
                  />
                </div>
              </div>

              {/* Published Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedToggle"
                  checked={editingVideo.isPublished}
                  onChange={(e) =>
                    setEditingVideo({ ...editingVideo, isPublished: e.target.checked })
                  }
                  className="w-4 h-4 text-[#734E06] rounded-xs"
                />
                <label
                  htmlFor="publishedToggle"
                  className="text-neutral-900 font-bold uppercase tracking-wider text-[11px] cursor-pointer"
                >
                  Publish Immediately to Storefront
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-neutral-200 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingVideo(null)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Video Reel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/60 z-modal flex items-center justify-center p-4"
          style={{ zIndex: 70 }}
          onClick={() => setDeleteConfirmId(null)}
        >
          <div
            className="bg-white max-w-sm w-full p-5 rounded-sm shadow-xl space-y-4 text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-sm font-bold text-neutral-900 m-0">Confirm Reel Removal</h4>
            <p className="text-neutral-600 m-0 leading-relaxed">
              Are you sure you want to permanently delete this shoppable video card? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteConfirmId(null)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  deleteShoppableVideo(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="bg-red-700 hover:bg-red-800 text-white text-xs font-bold"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Live Video Preview Modal */}
      {videoPreviewUrl && (
        <div
          className="fixed inset-0 min-h-[100dvh] h-[100dvh] bg-black/80 z-modal flex items-center justify-center p-4"
          style={{ zIndex: 70 }}
          onClick={() => setVideoPreviewUrl(null)}
        >
          <div
            className="relative w-full max-w-[360px] aspect-[9/16] bg-black rounded-sm overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoPreviewUrl(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <video
              src={videoPreviewUrl}
              autoPlay
              controls
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};
