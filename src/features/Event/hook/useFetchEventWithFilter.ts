import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";
import type { PublicEvent } from "../type/Event.type";
import { singleEventData } from "../data/singleEventData";
import { fallbackUpcomingEvents } from "./useFetchUpcomingEvent";
import { fallbackPastEvents } from "./useFetchPastEvent";

export interface EventFilters {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  tags?: string;
  status?: string;
}

const allFallbackEvents: PublicEvent[] = [
  {
    _id: singleEventData._id || "event-jharkhand-tech-summit-2026",
    Slug: singleEventData.Slug || "jharkhand-tech-summit-2026",
    title: singleEventData.title,
    shortDescription: singleEventData.shortDescription,
    tags: singleEventData.tags,
    category: singleEventData.category,
    visibility: singleEventData.visibility,
    status: singleEventData.status,
    coverImageUrl: singleEventData.coverImageUrl,
    registrationStartAt: singleEventData.registrationStartAt,
    registrationEndAt: singleEventData.registrationEndAt,
    venue: singleEventData.venue,
    redirectUrl: singleEventData.redirectUrl,
  },
  ...fallbackUpcomingEvents.map((e, index) => ({
    _id: e._id || `upcoming-fallback-${index}`,
    Slug: e.Slug || `upcoming-event-${index}`,
    title: e.title,
    shortDescription: e.shortDescription,
    tags: e.tags,
    category: e.category,
    visibility: e.visibility,
    status: e.status,
    coverImageUrl: e.coverImageUrl,
    registrationStartAt: e.registrationStartAt,
    registrationEndAt: e.registrationEndAt,
    venue: e.venue,
    redirectUrl: e.redirectUrl,
  })),
  ...fallbackPastEvents.map((e, index) => ({
    _id: e._id || `past-fallback-${index}`,
    Slug: e.Slug || `past-event-${index}`,
    title: e.title,
    shortDescription: e.shortDescription,
    tags: e.tags,
    category: e.category,
    visibility: e.visibility,
    status: e.status,
    coverImageUrl: e.coverImageUrl,
    registrationStartAt: e.registrationStartAt,
    registrationEndAt: e.registrationEndAt,
    venue: e.venue,
    redirectUrl: e.redirectUrl,
  })),
];

function getFallbackFilteredEvents(filters: EventFilters) {
  let filtered = [...allFallbackEvents];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.shortDescription.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter(
      (e) => e.category.toLowerCase() === filters.category!.toLowerCase(),
    );
  }

  if (filters.status && filters.status !== "all") {
    filtered = filtered.filter(
      (e) => e.status.toLowerCase() === filters.status!.toLowerCase(),
    );
  }

  if (filters.tags) {
    const requestedTags = filters.tags.split(",").map((t) => t.trim().toLowerCase());
    filtered = filtered.filter((e) =>
      e.tags.some((t) => requestedTags.includes(t.toLowerCase())),
    );
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / filters.limit));
  const startIndex = (filters.page - 1) * filters.limit;
  const paginatedEvents = filtered.slice(startIndex, startIndex + filters.limit);

  return {
    events: paginatedEvents,
    pagination: {
      total,
      totalPages,
      hasNextPage: filters.page < totalPages,
      hasPreviousPage: filters.page > 1,
    },
  };
}

const useFetchEventWithFilter = (filters: EventFilters) => {
  return useQuery({
    queryKey: ["events", filters],
    queryFn: async () => {
      try {
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

        if (res.data?.data?.events) {
          return res.data.data;
        }
      } catch {
        console.warn("[GDG Ranchi] Live events filter API offline, using fallback data.");
      }

      return getFallbackFilteredEvents(filters);
    },

    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    staleTime: 30_000,
    // Keep previous data while loading new page (prevents UI flash)
    placeholderData: (previousData) => previousData,
  });
};

export default useFetchEventWithFilter;
