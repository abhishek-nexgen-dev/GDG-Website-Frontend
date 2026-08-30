export type AlbumVisibility = "public" | "private";
export type AlbumStatus = "Published" | "Draft" | "Unpublished";

export interface AlbumItem {
  id: string;
  title: string;
  description: string;
  eventName: string;
  eventDate: string;
  imagesCount: number;
  visibility: AlbumVisibility;
  createdOn: string;
  createdBy: string;
  status: AlbumStatus;
  thumbnail: string;
  tags?: string[];
}

export interface AlbumStats {
  totalAlbums: { value: number; trend: string };
  totalImages: { value: string; trend: string };
  publicAlbums: { value: number; percentage: string };
  privateAlbums: { value: number; percentage: string };
  storageUsed: { value: string; trend: string };
}

export const initialAlbumStats: AlbumStats = {
  totalAlbums: { value: 42, trend: "▲ 6 this month" },
  totalImages: { value: "2,856", trend: "▲ 156 this month" },
  publicAlbums: { value: 28, percentage: "67% of total" },
  privateAlbums: { value: 14, percentage: "33% of total" },
  storageUsed: { value: "12.4 GB", trend: "▲ 1.3 GB this month" },
};

