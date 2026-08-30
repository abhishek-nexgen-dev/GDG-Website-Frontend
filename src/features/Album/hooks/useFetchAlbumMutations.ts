import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";

function useFetchAlbums(page: number = 1, limit: number = 2) {
  return useQuery({
    queryKey: ["findAllGallery", { page, limit }],
    queryFn: async () => {
      const response = await api.get("/api/v1/findAllGallery", {
        params: {
          Page: page,
          Limit: limit,
        },
      });
      return response.data.data;
    },
  });
}

export default useFetchAlbums;