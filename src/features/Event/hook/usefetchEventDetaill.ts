import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";
import { singleEventData } from "../data/singleEventData";
import { fallbackUpcomingEvents } from "./useFetchUpcomingEvent";
import { fallbackPastEvents } from "./useFetchPastEvent";
import type { EventResponse } from "../type/Event.type";

function useFetchEventDetaill(slug: string) {
  return useQuery({
    queryKey: ["findSingleEvent", { slug }],
    queryFn: async () => {
      try {
        const response = await api.get(`/api/v1/event/${slug}`);
        if (response.data?.data?.[0]) {
          return response.data.data[0];
        }
      } catch {
        console.warn(`[GDG Ranchi] Failed to fetch live event for ${slug}, using fallback.`);
      }

      // Check known upcoming and past events
      const allEvents: EventResponse[] = [
        singleEventData,
        ...fallbackUpcomingEvents,
        ...fallbackPastEvents,
      ];

      const found = allEvents.find(
        (e) => e.Slug?.toLowerCase() === slug.toLowerCase() || e._id === slug,
      );

      if (found) {
        return {
          ...found,
          descriptionMarkdown: found.descriptionMarkdown || singleEventData.descriptionMarkdown,
          rules: found.rules?.length ? found.rules : singleEventData.rules,
          requirements: found.requirements?.length
            ? found.requirements
            : singleEventData.requirements,
          timeline: found.timeline?.length ? found.timeline : singleEventData.timeline,
        };
      }

      // Fallback with current slug
      return {
        ...singleEventData,
        Slug: slug,
        title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      };
    },
  });
}

export default useFetchEventDetaill;
