import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";
import type { GalleryCardType } from "../types/Gallery.type";



type GalleryFetchResponse = {

  data: GalleryCardType[];
};

const fetchGallery = async (): Promise<GalleryFetchResponse> => {
  const response = await api.get("/api/v1/findAllGallery"); 
  return response.data;
};

const useGalleryFetch = () => {
  return useQuery<GalleryFetchResponse, Error>({
    queryKey: ["gallery"],
    queryFn: fetchGallery,
  
  });
};

export default useGalleryFetch;
