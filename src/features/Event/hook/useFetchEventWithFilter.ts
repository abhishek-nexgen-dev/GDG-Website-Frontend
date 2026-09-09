import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";

export interface EventFilters {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  tags?: string;
  status?: string;
}

const useFetchEventWithFilter = (filters: EventFilters) => {
  return useQuery({
    queryKey: ["events", filters],
    queryFn: async () => {
      const res = await api.get("/api/v1/events", {
        params: {
          page: filters.page,
          limit: filters.limit,
          search: filters.search,
          category: filters.category,
          tags: filters.tags,
          status: filters.status,
        },
      });

      return res.data.data;
    },

    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    staleTime: 30_000,
    // Keep previous data while loading new page (prevents UI flash)
    placeholderData: (previousData) => previousData,
  });
};

export default useFetchEventWithFilter;
