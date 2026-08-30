export type GalleryCardType = {
  _id: string;
  title: string,
  albumImageUrl: string;
  imageCount: number;
  slug: string;
  description: string;
  event: string;
  visibility: "public" | "private" | string;
  status: "published" | "draft" | string;
  uploadedBy: string;
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};