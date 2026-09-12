import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";

export interface EventNameItem {
  _id?: string;
  title: string;
}

export interface FetchEventNamesResponse {
  success: boolean;
  message?: string;
  data: EventNameItem[];
}

export const useFetchAllEventNamesQuery = () => {
  return useQuery<EventNameItem[], Error>({
    queryKey: ["allEventNames"],
    queryFn: async () => {
      const response = await api.get<FetchEventNamesResponse>("/api/v1/findAllEventName");
      return response.data?.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export default useFetchAllEventNamesQuery;
