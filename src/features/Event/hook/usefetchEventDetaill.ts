import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";

function usefetchEventDetaill(slug: string) {
  return useQuery({
    queryKey: ["findSingleEvent", { slug }],
    queryFn: async () => {
      const response = await api.get(`/api/v1/event/${slug}`);
      return response.data.data[0];
    },
  });
}

export default usefetchEventDetaill;
