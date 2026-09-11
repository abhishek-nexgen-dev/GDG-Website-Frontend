import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";
import type { GalleryCardType } from "../types/Gallery.type";

type GalleryFetchResponse = {
  data: GalleryCardType[];
};

export const fallbackGalleries: GalleryCardType[] = [
  {
    _id: "gallery-1",
    title: "DevFest Ranchi 2025 Moments",
    albumImageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
    imageCount: 48,
    slug: "devfest-ranchi-2025",
    description:
      "Memories, keynotes, code labs, and community networking from DevFest Ranchi 2025.",
    event: "DevFest Ranchi 2025",
    visibility: "public",
    status: "published",
    uploadedBy: "GDG Ranchi Team",
    isDeleted: false,
    createdAt: "2025-11-20T10:00:00.000Z",
    updatedAt: "2025-11-20T10:00:00.000Z",
    __v: 0,
  },
  {
    _id: "gallery-2",
    title: "Build with AI & Gemini Workshop",
    albumImageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80",
    imageCount: 32,
    slug: "build-with-ai-workshop",
    description:
      "Hands-on hackathon building multimodal applications with the Gemini API and AI Studio.",
    event: "Build with AI",
    visibility: "public",
    status: "published",
    uploadedBy: "GDG Ranchi Team",
    isDeleted: false,
    createdAt: "2025-09-15T12:00:00.000Z",
    updatedAt: "2025-09-15T12:00:00.000Z",
    __v: 0,
  },
  {
    _id: "gallery-3",
    title: "Google Cloud Community Day",
    albumImageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    imageCount: 26,
    slug: "cloud-community-day",
    description:
      "Deep dive sessions into Kubernetes, BigQuery, Serverless architectures, and GCP certifications.",
    event: "Google Cloud Community Day",
    visibility: "public",
    status: "published",
    uploadedBy: "GDG Ranchi Team",
    isDeleted: false,
    createdAt: "2025-07-10T14:00:00.000Z",
    updatedAt: "2025-07-10T14:00:00.000Z",
    __v: 0,
  },
  {
    _id: "gallery-4",
    title: "Women Techmakers Ranchi Meetup",
    albumImageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80",
    imageCount: 19,
    slug: "wtm-ranchi-meetup",
    description:
      "Celebrating women in tech with inspiring keynote talks, career panels, and mentorship circles.",
    event: "WTM Ranchi",
    visibility: "public",
    status: "published",
    uploadedBy: "GDG Ranchi Team",
    isDeleted: false,
    createdAt: "2025-03-08T11:00:00.000Z",
    updatedAt: "2025-03-08T11:00:00.000Z",
    __v: 0,
  },
];

const fetchGallery = async (): Promise<GalleryFetchResponse> => {
  try {
    const response = await api.get("/api/v1/findAllGallery");
    if (response.data?.data && response.data.data.length > 0) {
      return response.data;
    }
    return { data: fallbackGalleries };
  } catch {
    console.warn("[GDG Ranchi] Gallery API offline, using fallback galleries.");
    return { data: fallbackGalleries };
  }
};

const useGalleryFetch = () => {
  return useQuery<GalleryFetchResponse, Error>({
    queryKey: ["gallery"],
    queryFn: fetchGallery,
  });
};

export default useGalleryFetch;
