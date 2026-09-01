# Admin Media Management & Storage Architecture

**Application**: EVARA VASTRA Atelier Administration Suite  
**Document Version**: 1.0.0  
**Updated**: September 2026  

---

## 1. Overview

The administrative media management system provides a unified, production-ready interface for uploading, validating, reordering, and replacing media assets (images, videos, and poster frames) across products, shoppable video feeds, curated collections, and CMS content hubs.

---

## 2. Core Capabilities

1. **Dual Ingestion Paths**:
   - **Option A (Device Upload)**: Direct file upload supporting drag & drop on desktop and native device file/gallery/camera selection on mobile.
   - **Option B (Remote URL)**: Direct CDN/HTTP link entry with real-time protocol and syntax validation.
2. **Unified Data Model**: All media records standardize on `ManagedMediaItem`:
   - `id`: Unique asset identifier.
   - `url`: Direct or blob/object storage URL.
   - `source`: `"UPLOAD" | "URL"`.
   - `type`: `"image" | "video" | "document"`.
   - `alt`: Accessibility description.
   - `sortOrder`: Explicit ordinal index.
   - `storageProvider`: Provider origin metadata.
3. **Ergonomic Media Reordering**:
   - Touch-friendly directional arrow controls (`Up` / `Down` buttons) for mobile devices.
   - Drag & drop support for desktop curation.
   - First image automatically assumes `Primary` display status.
4. **In-place Replacement**:
   - Replace any individual asset directly with a new upload or URL without losing alt tags or positional sorting order.

---

## 3. Storage Provider Abstraction (`src/lib/media/storage.ts`)

```typescript
export interface MediaStorageProvider {
  name: string;
  isConfigured: boolean;
  upload: (file: File, type: MediaType, alt?: string) => Promise<StorageUploadResult>;
  delete: (mediaId: string, url: string) => Promise<boolean>;
  getUrl: (key: string) => string;
}
```

### Storage Status
- **Client Storage Mode**: Uses browser-native FileReader / Data URLs for instant client-side rendering and testing.
- **Production Cloud Readiness**: Clear hooks for Amazon S3 / Cloudinary / Google Cloud Storage without requiring UI refactoring.

---

## 4. Media Validation Rules

- **Images**: Allowed MIME types (`image/jpeg`, `image/png`, `image/webp`, `image/avif`, `image/gif`), Max size: 10MB.
- **Videos**: Allowed MIME types (`video/mp4`, `video/webm`, `video/quicktime`), Max size: 100MB.
- **URLs**: Strictly requires `http:` or `https:` protocol and valid URI format.
