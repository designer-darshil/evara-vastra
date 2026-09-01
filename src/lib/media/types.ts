// ==========================================================
// EVARA VASTRA — ADMIN MEDIA & STORAGE TYPES
// ==========================================================

export type MediaSourceType = "UPLOAD" | "URL";
export type MediaType = "image" | "video" | "document";

export interface ManagedMediaItem {
  id: string;
  url: string;
  source: MediaSourceType;
  type: MediaType;
  alt?: string;
  title?: string;
  fileName?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  width?: number;
  height?: number;
  sortOrder: number;
  createdAt: string;
  storageProvider?: "local_browser" | "s3" | "cloudinary" | "direct_url";
}

export interface MediaUploadValidation {
  isValid: boolean;
  error?: string;
}

export interface StorageUploadResult {
  success: boolean;
  mediaItem?: ManagedMediaItem;
  error?: string;
}
