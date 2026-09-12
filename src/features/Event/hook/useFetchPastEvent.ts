import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";
import type { EventResponse } from "../type/Event.type";

export const fallbackPastEvents: EventResponse[] = [
  {
    _id: "past-1",
    Slug: "build-with-ai-ranchi",
    title: "Build with AI: Gemini Edition",
    shortDescription:
      "A hands-on hackathon and workshop diving deep into Gemini 1.5 Pro, multimodality, function calling, and full-stack generative AI solutions.",
    descriptionMarkdown: "Comprehensive workshop on Google's Gemini models and AI Studio.",
    tags: ["AI", "Gemini", "Workshop"],
    category: "Workshop",
    visibility: "public",
    status: "REGISTRATION_CLOSED",
    coverImageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80",
    registrationStartAt: "2025-11-01T10:00:00.000Z",
    registrationEndAt: "2025-11-01T18:00:00.000Z",
    venue: {
      mode: "OFFLINE",
      venueName: "Auditorium Hall",
      address: "Ranchi University",
      city: "Ranchi",
      state: "Jharkhand",
      country: "India",
    },
    timeline: [],
    rules: [],
    requirements: [],
  },
  {
    _id: "past-2",
    Slug: "google-io-extended-ranchi",
    title: "Google I/O Extended 2025",
    shortDescription:
      "Bringing the magic of Google I/O to Ranchi! Recap of key announcements across Android, Web, Cloud, AI, and developer tools.",
    descriptionMarkdown: "Google I/O Extended Ranchi community conference.",
    tags: ["Conference", "Google", "Keynote"],
    category: "Conference",
    visibility: "public",
    status: "REGISTRATION_CLOSED",
    coverImageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
    registrationStartAt: "2025-07-20T09:00:00.000Z",
    registrationEndAt: "2025-07-20T17:00:00.000Z",
    venue: {
      mode: "OFFLINE",
      venueName: "Hotel BNR Chanakya",
      address: "Station Road",
      city: "Ranchi",
      state: "Jharkhand",
      country: "India",
    },
    timeline: [],
    rules: [],
    requirements: [],
  },
  {
    _id: "past-3",
    Slug: "flutter-forward-extended",
    title: "Flutter Forward Jharkhand",
    shortDescription:
      "Explored multi-platform development with Flutter 3, custom shaders, WebAssembly support, and production state management patterns.",
    descriptionMarkdown: "Deep dive into cross-platform app engineering with Flutter.",
    tags: ["Flutter", "Dart", "Mobile"],
    category: "Workshop",
    visibility: "public",
    status: "REGISTRATION_CLOSED",
    coverImageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    registrationStartAt: "2025-04-12T10:00:00.000Z",
    registrationEndAt: "2025-04-12T16:00:00.000Z",
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

const useFetchPasrEvent = () => {
  return useQuery({
    queryKey: ["pastEvent"],
    queryFn: async () => {
      try {
        let res = await api.get("/api/v1/find/pastEvents");
        if (res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          return res.data.data;
        }
        return fallbackPastEvents;
      } catch {
        console.warn("[GDG Ranchi] Live past events API offline, using fallback data.");
        return fallbackPastEvents;
      }
    },
  });
};

export default useFetchPasrEvent;
