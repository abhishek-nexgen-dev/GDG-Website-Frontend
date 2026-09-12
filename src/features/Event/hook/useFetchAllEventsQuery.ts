import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";

export interface EventSummary {
  _id: string;
  title: string;
  category?: string;
  status?: string;
  venue?: {
    venueName?: string;
    city?: string;
  };
  coverImageUrl?: string;
  registrationStartAt?: string;
  registrationEndAt?: string;
}

export interface FetchAllEventsResponse {
  success: boolean;
  message?: string;
  data: EventSummary[];
}

export const useFetchAllEventsQuery = (page = 1, limit = 10) => {
  return useQuery<EventSummary[], Error>({
    queryKey: ["allEvents", page, limit],
    queryFn: async () => {
      const response = await api.get<FetchAllEventsResponse>(
        `/api/v1/find/AllEvent?Limit=${limit}&Page=${page}`
      );
      return response.data?.data || [];
    },
    staleTime: 60 * 1000,
  });
};

export default useFetchAllEventsQuery;
