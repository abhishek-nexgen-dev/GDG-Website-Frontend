export type Visibility = "public" | "private" | "unlisted";

export type ViewPermission = "anyone" | "members" | "organizers" | "custom";

export type PhotoPermission = "anyone" | "members" | "organizers";

export interface AlbumFormData {
  title: string;
  eventId: string;
  shortDescription: string;

  coverImage: File | null;
  coverPreview: string;

  visibility: Visibility;
  category: string;

  tags: string[];
  tagInput: string;

  location: string;
  highlights: string;

  viewPermission: ViewPermission;
  photoPermission: PhotoPermission;
}
