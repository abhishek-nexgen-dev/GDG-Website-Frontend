import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";

export interface BackendGalleryImage {
  _id: string;
  publicId?: string;
  url: string;
  caption?: string;
  featured?: boolean;
  galleryId: string;
  albumName: string;
  albumSlug: string;
  event?: string;
  uploadedBy?: string;
  createdAt?: string;
}

export const useFetchAllImagesQuery = (page: number = 1, limit: number = 100) => {
  return useQuery<BackendGalleryImage[], Error>({
    queryKey: ["allImages", { page, limit }],
    queryFn: async () => {
      const response = await api.get("/api/v1/findAllImages", {
        params: { Page: page, Limit: limit },
      });
      const data = response.data?.data;
      if (Array.isArray(data)) {
        return data;
      }
      return [];
    },
    staleTime: 60 * 1000,
  });
};

export default useFetchAllImagesQuery;
