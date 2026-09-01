import React, { useState, useRef } from "react";
import {
  UploadCloud,
  Link2,
  Trash2,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  Tag,
  Star,
  Plus,
  Loader2,
} from "lucide-react";
import { ManagedMediaItem, MediaType } from "../../lib/media/types";
import { mediaStorage, validateMediaFile, validateMediaUrl } from "../../lib/media/storage";

interface AdminMediaInputProps {
  type?: MediaType;
  items: ManagedMediaItem[];
  onChange: (items: ManagedMediaItem[]) => void;
  maxItems?: number;
  label?: string;
  helperText?: string;
}

export const AdminMediaInput: React.FC<AdminMediaInputProps> = ({
  type = "image",
  items,
  onChange,
  maxItems = 10,
  label = "Product Imagery & Gallery",
  helperText = "Upload high-resolution photography from your device or paste verified CDN links.",
}) => {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [urlAltInput, setUrlAltInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Replace modal state
  const [replaceTargetIndex, setReplaceTargetIndex] = useState<number | null>(null);
  const [replaceUrlInput, setReplaceUrlInput] = useState("");

  // Edit Alt Modal state
  const [editingAltIndex, setEditingAltIndex] = useState<number | null>(null);
  const [tempAltText, setTempAltText] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  // File Upload Handlers
  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMessage(null);
    setIsUploading(true);

    const newItems: ManagedMediaItem[] = [...items];

    for (let i = 0; i < files.length; i++) {
      if (newItems.length >= maxItems) {
        setErrorMessage(`Maximum of ${maxItems} media items allowed.`);
        break;
      }

      const file = files[i];
      const validation = validateMediaFile(file, type);
      if (!validation.isValid) {
        setErrorMessage(validation.error || "Invalid file.");
        continue;
      }

      const result = await mediaStorage.upload(file, type);
      if (result.success && result.mediaItem) {
        result.mediaItem.sortOrder = newItems.length;
        newItems.push(result.mediaItem);
      } else {
        setErrorMessage(result.error || "Upload failed.");
      }
    }

    onChange(newItems);
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // URL Submission Handler
  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validation = validateMediaUrl(urlInput, type);
    if (!validation.isValid) {
      setErrorMessage(validation.error || "Invalid URL.");
      return;
    }

    if (items.length >= maxItems) {
      setErrorMessage(`Maximum of ${maxItems} media items allowed.`);
      return;
    }

    const newItem: ManagedMediaItem = {
      id: `media-url-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      url: urlInput.trim(),
      source: "URL",
      type,
      alt: urlAltInput.trim() || `Media asset ${items.length + 1}`,
      sortOrder: items.length,
      createdAt: new Date().toISOString(),
      storageProvider: "direct_url",
    };

    onChange([...items, newItem]);
    setUrlInput("");
    setUrlAltInput("");
  };

  // Reorder Actions
  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    // Update sortOrder values
    newItems.forEach((item, idx) => {
      item.sortOrder = idx;
    });

    onChange(newItems);
  };

  // Remove Action
  const removeItem = (index: number) => {
    const target = items[index];
    if (target) {
      mediaStorage.delete(target.id, target.url);
    }
    const newItems = items.filter((_, idx) => idx !== index);
    newItems.forEach((item, idx) => {
      item.sortOrder = idx;
    });
    onChange(newItems);
  };

  // Replace Action
  const handleReplaceFile = async (files: FileList | null) => {
    if (!files || files.length === 0 || replaceTargetIndex === null) return;
    const file = files[0];
    const validation = validateMediaFile(file, type);
    if (!validation.isValid) {
      setErrorMessage(validation.error || "Invalid replacement file.");
      return;
    }

    setIsUploading(true);
    const result = await mediaStorage.upload(file, type);
    if (result.success && result.mediaItem) {
      const newItems = [...items];
      result.mediaItem.sortOrder = replaceTargetIndex;
      result.mediaItem.alt = newItems[replaceTargetIndex].alt;
      newItems[replaceTargetIndex] = result.mediaItem;
      onChange(newItems);
      setReplaceTargetIndex(null);
    } else {
      setErrorMessage(result.error || "Replacement upload failed.");
    }
    setIsUploading(false);
  };

  const handleReplaceUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (replaceTargetIndex === null) return;
    const validation = validateMediaUrl(replaceUrlInput, type);
    if (!validation.isValid) {
      setErrorMessage(validation.error || "Invalid URL.");
      return;
    }

    const newItems = [...items];
    newItems[replaceTargetIndex] = {
      ...newItems[replaceTargetIndex],
      url: replaceUrlInput.trim(),
      source: "URL",
      storageProvider: "direct_url",
    };
    onChange(newItems);
    setReplaceTargetIndex(null);
    setReplaceUrlInput("");
  };

  // Alt Text Save
  const handleSaveAlt = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAltIndex === null) return;
    const newItems = [...items];
    newItems[editingAltIndex] = {
      ...newItems[editingAltIndex],
      alt: tempAltText.trim(),
    };
    onChange(newItems);
    setEditingAltIndex(null);
    setTempAltText("");
  };

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 m-0">
            {label} ({items.length}/{maxItems})
          </label>
          <span className="text-[11px] text-neutral-500 font-medium">
            First image is Primary Display
          </span>
        </div>
        {helperText && <p className="text-xs text-neutral-500 mt-0.5 m-0">{helperText}</p>}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Dual Input Mode Tabs */}
      <div className="bg-white border border-neutral-200 rounded-sm p-4 shadow-2xs space-y-4">
        <div className="flex border-b border-neutral-200">
          <button
            type="button"
            onClick={() => {
              setActiveTab("upload");
              setErrorMessage(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors -mb-[1px] min-h-[40px] ${
              activeTab === "upload"
                ? "border-[#734E06] text-[#734E06]"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <UploadCloud className="w-4 h-4" /> Option A: Upload File
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("url");
              setErrorMessage(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors -mb-[1px] min-h-[40px] ${
              activeTab === "url"
                ? "border-[#734E06] text-[#734E06]"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Link2 className="w-4 h-4" /> Option B: Remote URL
          </button>
        </div>

        {/* Tab A: Upload File (Drag & Drop + Mobile File/Gallery) */}
        {activeTab === "upload" && (
          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept={type === "image" ? "image/*" : "video/*"}
              multiple
              onChange={(e) => handleFilesSelected(e.target.files)}
              className="hidden"
              id="admin-file-upload-input"
            />
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFilesSelected(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-sm p-6 sm:p-8 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-[#734E06] bg-amber-50/50"
                  : "border-neutral-300 hover:border-neutral-400 bg-neutral-50/50"
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center justify-center gap-2 text-xs text-neutral-600">
                  <Loader2 className="w-6 h-6 animate-spin text-[#734E06]" />
                  <span>Processing & validating media file(s)...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-[#734E06]">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block">
                      Click to choose from device / gallery, or drag & drop here
                    </span>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">
                      Supports JPEG, PNG, WebP, AVIF up to 10MB each
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab B: Remote URL */}
        {activeTab === "url" && (
          <form onSubmit={handleAddUrl} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Verified Media URL *
                </label>
                <input
                  type="url"
                  required
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-white border border-neutral-300 text-neutral-900 text-xs rounded-sm focus:border-[#734E06] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Alt / Descriptive Label
                </label>
                <input
                  type="text"
                  value={urlAltInput}
                  onChange={(e) => setUrlAltInput(e.target.value)}
                  placeholder="e.g. Saree Pallu Close-up"
                  className="w-full px-3 py-2 bg-white border border-neutral-300 text-neutral-900 text-xs rounded-sm focus:border-[#734E06] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!urlInput.trim()}
              className="px-4 py-2 bg-[#734E06] hover:bg-[#5a3c04] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors disabled:opacity-50 flex items-center gap-1.5 min-h-[38px]"
            >
              <Plus className="w-4 h-4" /> Add Remote Media URL
            </button>
          </form>
        )}
      </div>

      {/* Gallery Cards & Reorder UI */}
      {items.length > 0 && (
        <div className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((item, index) => {
              const isPrimary = index === 0;

              return (
                <div
                  key={item.id}
                  className={`bg-white border rounded-sm overflow-hidden flex flex-col shadow-2xs transition-shadow relative ${
                    isPrimary ? "border-[#734E06] ring-1 ring-[#734E06]" : "border-neutral-200"
                  }`}
                >
                  {/* Primary Badge */}
                  {isPrimary && (
                    <div className="absolute top-2 left-2 z-10 bg-[#734E06] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-xs">
                      <Star className="w-3 h-3 fill-current" /> Primary
                    </div>
                  )}

                  {/* Source Badge */}
                  <div className="absolute top-2 right-2 z-10 bg-neutral-900/80 text-white text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-sm">
                    {item.source === "UPLOAD" ? "Uploaded" : "URL"}
                  </div>

                  {/* Media Preview Aspect Frame */}
                  <div className="aspect-square bg-neutral-100 relative overflow-hidden flex items-center justify-center">
                    {item.type === "video" ? (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.alt || "Product Asset"}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    )}
                  </div>

                  {/* Metadata & Actions */}
                  <div className="p-2.5 flex-1 flex flex-col justify-between space-y-2 bg-white">
                    <div className="text-[11px] text-neutral-600 truncate" title={item.alt || "No alt text"}>
                      <span className="font-bold text-neutral-800">Alt:</span> {item.alt || <em className="text-neutral-400">None set</em>}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100 gap-1">
                      {/* Reorder Buttons */}
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => moveItem(index, "up")}
                          disabled={index === 0}
                          aria-label="Move asset left / earlier"
                          className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-30 rounded-xs min-h-[32px] min-w-[32px] flex items-center justify-center"
                          title="Move Earlier"
                        >
                          <ArrowUp className="w-3.5 h-3.5 rotate-[-90deg] sm:rotate-0" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveItem(index, "down")}
                          disabled={index === items.length - 1}
                          aria-label="Move asset right / later"
                          className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-30 rounded-xs min-h-[32px] min-w-[32px] flex items-center justify-center"
                          title="Move Later"
                        >
                          <ArrowDown className="w-3.5 h-3.5 rotate-[-90deg] sm:rotate-0" />
                        </button>
                      </div>

                      {/* Replace, Alt, and Delete */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAltIndex(index);
                            setTempAltText(item.alt || "");
                          }}
                          className="p-1.5 text-neutral-600 hover:text-[#734E06] hover:bg-amber-50 rounded-xs min-h-[32px] min-w-[32px] flex items-center justify-center"
                          title="Edit Alt Text"
                        >
                          <Tag className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setReplaceTargetIndex(index);
                            setReplaceUrlInput("");
                          }}
                          className="p-1.5 text-neutral-600 hover:text-[#734E06] hover:bg-amber-50 rounded-xs min-h-[32px] min-w-[32px] flex items-center justify-center"
                          title="Replace Image"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xs min-h-[32px] min-w-[32px] flex items-center justify-center"
                          title="Remove Image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Replace Dialog Modal */}
      {replaceTargetIndex !== null && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-sm max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 m-0">
              Replace Image #{replaceTargetIndex + 1}
            </h3>
            <p className="text-xs text-neutral-500 m-0">
              Select a new file from your device or specify a new image URL.
            </p>

            <div className="space-y-3 pt-2">
              <input
                type="file"
                ref={replaceFileInputRef}
                accept="image/*"
                onChange={(e) => handleReplaceFile(e.target.files)}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => replaceFileInputRef.current?.click()}
                className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2"
              >
                <UploadCloud className="w-4 h-4" /> Choose New File from Device
              </button>

              <div className="relative text-center">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest bg-white px-2">
                  OR ENTER NEW URL
                </span>
              </div>

              <form onSubmit={handleReplaceUrl} className="space-y-2">
                <input
                  type="url"
                  value={replaceUrlInput}
                  onChange={(e) => setReplaceUrlInput(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-white border border-neutral-300 text-neutral-900 text-xs rounded-sm focus:border-[#734E06] outline-none"
                />
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReplaceTargetIndex(null)}
                    className="px-3 py-1.5 border border-neutral-300 text-neutral-700 text-xs rounded-sm hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!replaceUrlInput.trim()}
                    className="px-3 py-1.5 bg-[#734E06] text-white text-xs font-bold uppercase rounded-sm hover:bg-[#5a3c04] disabled:opacity-50"
                  >
                    Apply New URL
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Alt Modal */}
      {editingAltIndex !== null && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-sm max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 m-0">
              Edit Accessibility Alt Text
            </h3>
            <p className="text-xs text-neutral-500 m-0">
              Describe this image clearly for screen readers and search engines.
            </p>

            <form onSubmit={handleSaveAlt} className="space-y-3 pt-2">
              <input
                type="text"
                value={tempAltText}
                onChange={(e) => setTempAltText(e.target.value)}
                placeholder="e.g. Model wearing Royal Silk Saree in Crimson"
                className="w-full px-3 py-2 bg-white border border-neutral-300 text-neutral-900 text-xs rounded-sm focus:border-[#734E06] outline-none"
              />
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingAltIndex(null)}
                  className="px-3 py-1.5 border border-neutral-300 text-neutral-700 text-xs rounded-sm hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#734E06] text-white text-xs font-bold uppercase rounded-sm hover:bg-[#5a3c04]"
                >
                  Save Alt Text
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
