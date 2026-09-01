// ==========================================================
// EVARA VASTRA — MEDIA STORAGE ABSTRACTION
// ==========================================================

import { ManagedMediaItem, MediaUploadValidation, StorageUploadResult, MediaType } from "./types";

export interface MediaStorageProvider {
  name: string;
  isConfigured: boolean;
  upload: (file: File, type: MediaType, alt?: string) => Promise<StorageUploadResult>;
  delete: (mediaId: string, url: string) => Promise<boolean>;
  getUrl: (key: string) => string;
}

const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];

const ALLOWED_VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/ogg",
];

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE_BYTES = 100 * 1024 * 1024; // 100MB

/**
 * Validates a file before upload.
 */
export function validateMediaFile(file: File, type: MediaType = "image"): MediaUploadValidation {
  if (!file) {
    return { isValid: false, error: "No file selected." };
  }

  if (type === "image") {
    if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type.toLowerCase())) {
      return {
        isValid: false,
        error: "Please upload a valid image (JPEG, PNG, WEBP, AVIF, GIF).",
      };
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      return {
        isValid: false,
        error: "Image file size exceeds the 10MB limit.",
      };
    }
  } else if (type === "video") {
    if (!ALLOWED_VIDEO_MIME_TYPES.includes(file.type.toLowerCase())) {
      return {
        isValid: false,
        error: "Please upload a valid video (MP4, WebM, MOV).",
      };
    }
    if (file.size > MAX_VIDEO_SIZE_BYTES) {
      return {
        isValid: false,
        error: "Video file size exceeds the 100MB limit.",
      };
    }
  }

  return { isValid: true };
}

/**
 * Validates a remote URL string.
 */
export function validateMediaUrl(url: string, _type: MediaType = "image"): { isValid: boolean; error?: string } {
  if (!url || !url.trim()) {
    return { isValid: false, error: "Please enter a valid URL." };
  }

  const cleanUrl = url.trim();
  try {
    const parsed = new URL(cleanUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { isValid: false, error: "URL must use HTTP or HTTPS protocol." };
    }
  } catch {
    return { isValid: false, error: "The entered text is not a valid URL." };
  }

  return { isValid: true };
}

/**
 * Client storage abstraction supporting immediate preview & base64/blob storage
 * with clear production connectivity status.
 */
class BrowserLocalMediaStorage implements MediaStorageProvider {
  public name = "Local Client Storage (Production Cloud Pending)";
  public isConfigured = true;

  public async upload(file: File, type: MediaType = "image", alt?: string): Promise<StorageUploadResult> {
    const validation = validateMediaFile(file, type);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const mediaItem: ManagedMediaItem = {
          id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          url: dataUrl,
          source: "UPLOAD",
          type,
          alt: alt || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
          fileName: file.name,
          fileSizeBytes: file.size,
          mimeType: file.type,
          sortOrder: 0,
          createdAt: new Date().toISOString(),
          storageProvider: "local_browser",
        };
        resolve({ success: true, mediaItem });
      };

      reader.onerror = () => {
        resolve({ success: false, error: "Failed to read file from your device." });
      };

      reader.readAsDataURL(file);
    });
  }

  public async delete(_mediaId: string, _url: string): Promise<boolean> {
    // In local storage client, deletion removes reference
    return true;
  }

  public getUrl(key: string): string {
    return key;
  }
}

export const mediaStorage: MediaStorageProvider = new BrowserLocalMediaStorage();
