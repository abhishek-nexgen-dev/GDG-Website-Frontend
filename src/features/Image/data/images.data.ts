import type { ImageFormData } from "../types/image.type";
export type ImageFormat = "JPG" | "PNG" | "WEBP";

export interface ImageItem {
  id: string;
  fileName: string;
  url: string;
  albumName: string;
  eventName: string;
  eventShort: string;
  uploader: string;
  timeAgo: string;
  size: string;
  format: ImageFormat;
  dimensions?: string;
  tags?: string[];
  createdDate?: string;
  albumSlug?: string;
  galleryId?: string;
  publicId?: string;
}

export interface ImageStats {
  totalImages: { value: string; trend: string };
  totalAlbums: { value: number; trend: string };
  totalEvents: { value: number; trend: string };
  storageUsed: { value: string; trend: string };
  avgImageSize: { value: string; trend: string };
}

export const initialImageStats: ImageStats = {
  totalImages: { value: "0", trend: "0 total images" },
  totalAlbums: { value: 0, trend: "0 total albums" },
  totalEvents: { value: 0, trend: "0 total events" },
  storageUsed: { value: "0 MB", trend: "No storage used" },
  avgImageSize: { value: "0 MB", trend: "—" },
};

export const initialImagesList: ImageItem[] = [];

export const initialImageFormData: ImageFormData = {
  title: "",
  caption: "",
  event: "",
  album: "",
  tags: [],
  visibility: "PUBLIC",
  altText: "",
  displayOrder: 1,
  allowDownload: true,
  imageUrl: "",
};

export const eventOptions: string[] = [];

export const albumOptions: string[] = [];
