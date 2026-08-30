export type Visibility = "public" | "private";





export interface AlbumFormData {
  title: string;
  EventName: string;
  albumImageUrl: string;
  description: string;
  tags: string[];
  visibility: "public" | "private";
  status: "draft" | "published";
  isDeleted: boolean;
}



export interface Manage_Albums_Card {
  _id: string;
  title: string;
  albumImageUrl: string;
  imageCount: number;
  slug: string;
  description: string;
  event: {
    _id: string;
    title: string;
    registrationStartAt: string;
    registrationEndAt: string;
  };
  visibility: 'public' | 'private';
  status: 'published' | 'draft' | 'archived';
  uploadedBy: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}