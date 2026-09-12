import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";
import type { EventResponse } from "../type/Event.type";

export const fallbackUpcomingEvents: EventResponse[] = [
  {
    _id: "upcoming-1",
    Slug: "devfest-ranchi-2026",
    title: "DevFest Ranchi 2026",
    shortDescription:
      "The biggest developer gathering in Jharkhand featuring technical sessions, hands-on workshops, and community networking.",
    descriptionMarkdown:
      "DevFest Ranchi 2026 is an annual decentralized tech conference hosted by Google Developer Groups.",
    tags: ["Conference", "Cloud", "AI", "Android"],
    category: "Conference",
    visibility: "public",
    status: "REGISTRATION_OPEN",
    coverImageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
    registrationStartAt: "2026-11-20T09:00:00.000Z",
    registrationEndAt: "2026-11-22T18:00:00.000Z",
    venue: {
      mode: "OFFLINE",
      venueName: "Shardaynand Hall",
      address: "Main Road",
      city: "Ranchi",
      state: "Jharkhand",
      country: "India",
    },
    timeline: [],
    rules: [],
    requirements: [],
  },
  {
    _id: "upcoming-2",
    Slug: "google-cloud-study-jam",
    title: "Google Cloud Study Jam 2026",
    shortDescription:
      "Interactive hands-on session exploring Google Cloud Platform, Vertex AI, and modern microservices architecture.",
    descriptionMarkdown: "Learn cloud computing and generative AI on Google Cloud.",
    tags: ["Workshop", "Cloud", "GCP"],
    category: "Workshop",
    visibility: "public",
    status: "REGISTRATION_OPEN",
    coverImageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    registrationStartAt: "2026-10-15T10:00:00.000Z",
    registrationEndAt: "2026-10-15T16:00:00.000Z",
    venue: {
      mode: "OFFLINE",
      venueName: "Ranchi Tech Hub",
      address: "Circular Road",
      city: "Ranchi",
      state: "Jharkhand",
      country: "India",
    },
    timeline: [],
    rules: [],
    requirements: [],
  },
  {
    _id: "upcoming-3",
    Slug: "android-dev-bootcamp",
    title: "Modern Android with Jetpack Compose",
    shortDescription:
      "Build declarative, reactive user interfaces for modern Android devices using Jetpack Compose and Kotlin.",
    descriptionMarkdown: "Comprehensive bootcamp on Jetpack Compose and Material 3.",
    tags: ["Hands-on", "Android", "Mobile"],
    category: "Hands-on",
    visibility: "public",
    status: "REGISTRATION_OPEN",
    coverImageUrl:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&auto=format&fit=crop&q=80",
    registrationStartAt: "2026-12-05T09:30:00.000Z",
    registrationEndAt: "2026-12-05T17:30:00.000Z",
    venue: {
      mode: "OFFLINE",
      venueName: "BIT Lalpur Extension",
      address: "Lalpur",
      city: "Ranchi",
      state: "Jharkhand",
      country: "India",
    },
    timeline: [],
    rules: [],
    requirements: [],
  },
];

const useFetchUpcomingEvent = () => {
  return useQuery({
    queryKey: ["upcomingEvent"],
    queryFn: async () => {
      try {
        let res = await api.get("/api/v1/find/upcomingEvents");
        if (res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          return res.data.data;
        }
        return fallbackUpcomingEvents;
      } catch {
        console.warn("[GDG Ranchi] Live upcoming events API offline, using fallback data.");
        return fallbackUpcomingEvents;
      }
    },
  });
};

export default useFetchUpcomingEvent;
