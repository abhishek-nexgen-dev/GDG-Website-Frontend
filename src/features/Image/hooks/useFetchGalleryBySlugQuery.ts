import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";

export interface GalleryDetailItem {
  _id: string;
  title: string;
  albumImageUrl?: string;
  imageCount?: number;
  slug: string;
  description?: string;
  event?: string;
  images?: Array<{
    _id?: string;
    url: string;
    caption?: string;
  }>;
  tags?: string[];
  visibility?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FetchGalleryBySlugResponse {
  success: boolean;
  message?: string;
  data: GalleryDetailItem | GalleryDetailItem[];
}

export const useFetchGalleryBySlugQuery = (slug?: string) => {
  return useQuery<GalleryDetailItem | null, Error>({
    queryKey: ["galleryBySlug", slug],
    queryFn: async () => {
      if (!slug) return null;
      try {
        const response = await api.get<FetchGalleryBySlugResponse>(
          `/api/v1/find/galleryBySlug/${encodeURIComponent(slug)}`
        );
        const data = response.data?.data;
        if (Array.isArray(data)) {
          return data[0] || null;
        }
        return data || null;
      } catch (err) {
        console.warn(`Could not fetch gallery for slug ${slug}, returning null:`, err);
        return null;
      }
    },
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
};

export default useFetchGalleryBySlugQuery;
