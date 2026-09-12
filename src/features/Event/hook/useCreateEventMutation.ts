import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";

export interface CreateEventPayload {
  communityId?: string;
  title: string;
  shortDescription: string;
  descriptionMarkdown?: string;
  redirectUrl?: string;
  tags?: string[];
  category: string;
  visibility?: "PUBLIC" | "PRIVATE";
  status?: "REGISTRATION_OPEN" | "REGISTRATION_CLOSED" | "DRAFT" | "COMPLETED";
  coverImageUrl?: string;
  introVideoUrl?: string;
  registrationStartAt?: string;
  registrationEndAt?: string;
  venue?: {
    mode?: "OFFLINE" | "ONLINE" | "HYBRID";
    venueName?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
  };
  timeline?: Array<{
    title: string;
    description?: string;
    startAt: string;
    endAt: string;
  }>;
  rules?: string[];
  requirements?: string[];
}

export interface CreateEventResponse {
  success: boolean;
  message: string;
  data: any;
}

export const useCreateEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateEventResponse, Error, CreateEventPayload>({
    mutationFn: async (eventData) => {
      const response = await api.post<CreateEventResponse>(
        "/api/v1/create/newEvent",
        eventData
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate relevant event queries so UI refreshes automatically
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["upcomingEvents"] });
      queryClient.invalidateQueries({ queryKey: ["pastEvents"] });
      queryClient.invalidateQueries({ queryKey: ["allEvents"] });
    },
  });
};

export default useCreateEventMutation;
