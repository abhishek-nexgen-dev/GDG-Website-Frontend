export type ImageVisibility = "PUBLIC" | "PRIVATE" | "UNLISTED";

export interface ImageFormData {
  title: string;
  caption: string;
  event: string;
  album: string;
  tags: string[];
  visibility: ImageVisibility;
  altText: string;
  displayOrder: number;
  allowDownload: boolean;
  imageUrl: string;
}

export interface SelectedImageFile {
  file: File;
  previewUrl: string;
  name: string;
  size: string;
  dimensions?: string;
  format: string;
}
