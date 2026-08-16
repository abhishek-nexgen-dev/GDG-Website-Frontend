export type AlbumVisibility = "Public" | "Private";
export type AlbumStatus = "Published" | "Draft" | "Unpublished";

export interface AlbumItem {
  id: string;
  title: string;
  description: string;
  eventName: string;
  eventDate: string;
  imagesCount: number;
  visibility: AlbumVisibility;
  createdOn: string;
  createdBy: string;
  status: AlbumStatus;
  thumbnail: string;
  tags?: string[];
}

export interface AlbumStats {
  totalAlbums: { value: number; trend: string };
  totalImages: { value: string; trend: string };
  publicAlbums: { value: number; percentage: string };
  privateAlbums: { value: number; percentage: string };
  storageUsed: { value: string; trend: string };
}

export const initialAlbumStats: AlbumStats = {
  totalAlbums: { value: 42, trend: "▲ 6 this month" },
  totalImages: { value: "2,856", trend: "▲ 156 this month" },
  publicAlbums: { value: 28, percentage: "67% of total" },
  privateAlbums: { value: 14, percentage: "33% of total" },
  storageUsed: { value: "12.4 GB", trend: "▲ 1.3 GB this month" },
};

export const initialAlbumsList: AlbumItem[] = [
  {
    id: "alb-1",
    title: "Jharkhand Tech Summit 2026",
    description: "Glimpses from the 24-hour hackathon at BIT Mesra.",
    eventName: "Jharkhand Tech Summit 2026",
    eventDate: "15 - 16 Jul 2026",
    imagesCount: 256,
    visibility: "Public",
    createdOn: "16 Jul 2026",
    createdBy: "Abhishek Gupta",
    status: "Published",
    thumbnail:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=80",
    tags: ["Hackathon", "Keynote", "Awards"],
  },
  {
    id: "alb-2",
    title: "MERN Stack Workshop",
    description: "Hands-on workshop on MERN stack development.",
    eventName: "MERN Stack Workshop",
    eventDate: "22 Jun 2026",
    imagesCount: 182,
    visibility: "Public",
    createdOn: "22 Jun 2026",
    createdBy: "Abhishek Gupta",
    status: "Published",
    thumbnail:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&auto=format&fit=crop&q=80",
    tags: ["Workshop", "Coding", "React"],
  },
  {
    id: "alb-3",
    title: "Dev Connect Meetup",
    description: "Community meetup at Oorja Cafe, Ranchi.",
    eventName: "Dev Connect Meetup",
    eventDate: "5 Jun 2026",
    imagesCount: 98,
    visibility: "Public",
    createdOn: "5 Jun 2026",
    createdBy: "Priya Sharma",
    status: "Published",
    thumbnail:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&auto=format&fit=crop&q=80",
    tags: ["Networking", "Meetup", "Community"],
  },
  {
    id: "alb-4",
    title: "AI in Action – Tech Talk",
    description: "Talk on real-world AI applications in tech.",
    eventName: "AI in Action - Tech Talk",
    eventDate: "28 May 2026",
    imagesCount: 124,
    visibility: "Private",
    createdOn: "28 May 2026",
    createdBy: "Abhishek Gupta",
    status: "Draft",
    thumbnail:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&auto=format&fit=crop&q=80",
    tags: ["AI", "Talk", "Gemini"],
  },
  {
    id: "alb-5",
    title: "Cloud Native Bootcamp",
    description: "Learning cloud-native tools and deployment.",
    eventName: "Cloud Native Bootcamp",
    eventDate: "10 May 2026",
    imagesCount: 76,
    visibility: "Private",
    createdOn: "10 May 2026",
    createdBy: "Priya Sharma",
    status: "Unpublished",
    thumbnail:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format&fit=crop&q=80",
    tags: ["Cloud", "GCP", "Kubernetes"],
  },
  {
    id: "alb-6",
    title: "Flutter Forward Hands-on",
    description: "Multiplatform mobile app development using Flutter and Dart.",
    eventName: "Flutter Forward Hands-on",
    eventDate: "18 Apr 2026",
    imagesCount: 142,
    visibility: "Public",
    createdOn: "18 Apr 2026",
    createdBy: "Abhishek Gupta",
    status: "Published",
    thumbnail:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&auto=format&fit=crop&q=80",
    tags: ["Flutter", "Mobile", "Dart"],
  },
  {
    id: "alb-7",
    title: "Women Techmakers Summit",
    description: "Empowering and connecting women leaders in technology.",
    eventName: "WTM Ranchi Summit",
    eventDate: "08 Mar 2026",
    imagesCount: 210,
    visibility: "Public",
    createdOn: "08 Mar 2026",
    createdBy: "Priya Sharma",
    status: "Published",
    thumbnail:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    tags: ["WTM", "Diversity", "Leadership"],
  },
  {
    id: "alb-8",
    title: "Android 15 Architecture Deep Dive",
    description: "Exploring modern Jetpack Compose architecture and UI tooling.",
    eventName: "Android 15 Architecture",
    eventDate: "02 Feb 2026",
    imagesCount: 88,
    visibility: "Public",
    createdOn: "02 Feb 2026",
    createdBy: "Abhishek Gupta",
    status: "Published",
    thumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80",
    tags: ["Android", "Kotlin", "Architecture"],
  },
];
