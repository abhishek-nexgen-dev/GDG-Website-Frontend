export type ImageFormat = "JPG" | "PNG" | "WEBP";

export interface ImageItem {
  id: string;
  fileName: string;
  url: string;
  albumName: string;
  eventName: string;
  eventShort: string;
  uploader: string;
  timeAgo: string;
  size: string;
  format: ImageFormat;
  dimensions?: string;
  tags?: string[];
  createdDate?: string;
}

export interface ImageStats {
  totalImages: { value: string; trend: string };
  totalAlbums: { value: number; trend: string };
  totalEvents: { value: number; trend: string };
  storageUsed: { value: string; trend: string };
  avgImageSize: { value: string; trend: string };
}

export const initialImageStats: ImageStats = {
  totalImages: { value: "2,856", trend: "▲ 156 this month" },
  totalAlbums: { value: 42, trend: "▲ 6 this month" },
  totalEvents: { value: 24, trend: "▲ 4 this month" },
  storageUsed: { value: "12.4 GB", trend: "▲ 1.3 GB this month" },
  avgImageSize: { value: "4.2 MB", trend: "▼ 0.3 MB this month" },
};

export const initialImagesList: ImageItem[] = [
  {
    id: "img-1",
    fileName: "jts2026_keynote.jpg",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
    albumName: "Jharkhand Tech Summit 2026",
    eventName: "Jharkhand Tech Summit 2026",
    eventShort: "JTS 2026",
    uploader: "Abhishek Gupta",
    timeAgo: "2 min ago",
    size: "4.2 MB",
    format: "JPG",
    dimensions: "3840 x 2160",
    tags: ["Keynote", "Summit", "Auditorium"],
  },
  {
    id: "img-2",
    fileName: "team_hackathon.jpg",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
    albumName: "Jharkhand Tech Summit 2026",
    eventName: "Jharkhand Tech Summit 2026",
    eventShort: "JTS 2026",
    uploader: "Priya Sharma",
    timeAgo: "5 min ago",
    size: "3.8 MB",
    format: "JPG",
    dimensions: "3000 x 2000",
    tags: ["Hackathon", "Team", "Students"],
  },
  {
    id: "img-3",
    fileName: "coding_session.png",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
    albumName: "Jharkhand Tech Summit 2026",
    eventName: "Jharkhand Tech Summit 2026",
    eventShort: "JTS 2026",
    uploader: "Rohit Verma",
    timeAgo: "8 min ago",
    size: "5.1 MB",
    format: "PNG",
    dimensions: "2560 x 1440",
    tags: ["Coding", "Laptops", "Devs"],
  },
  {
    id: "img-4",
    fileName: "speaker_session.jpg",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=80",
    albumName: "MERN Stack Workshop",
    eventName: "MERN Stack Workshop",
    eventShort: "MERN Workshop",
    uploader: "Abhishek Gupta",
    timeAgo: "1 hour ago",
    size: "3.2 MB",
    format: "PNG",
    dimensions: "4000 x 2667",
    tags: ["Speaker", "Stage", "Talk"],
  },
  {
    id: "img-5",
    fileName: "audience.jpg",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80",
    albumName: "Dev Connect Meetup",
    eventName: "Dev Connect Meetup",
    eventShort: "Dev Connect",
    uploader: "Sneha Gupta",
    timeAgo: "2 hours ago",
    size: "2.9 MB",
    format: "JPG",
    dimensions: "3200 x 2133",
    tags: ["Audience", "Meetup", "Crowd"],
  },
  {
    id: "img-6",
    fileName: "winners.jpg",
    url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&auto=format&fit=crop&q=80",
    albumName: "Jharkhand Tech Summit 2026",
    eventName: "Jharkhand Tech Summit 2026",
    eventShort: "JTS 2026",
    uploader: "Priya Sharma",
    timeAgo: "3 hours ago",
    size: "3.6 MB",
    format: "JPG",
    dimensions: "3600 x 2400",
    tags: ["Winners", "Awards", "Ceremony"],
  },
  {
    id: "img-7",
    fileName: "ai_talk.jpg",
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=80",
    albumName: "AI in Action - Tech Talk",
    eventName: "AI in Action - Tech Talk",
    eventShort: "AI Talk",
    uploader: "Abhishek Gupta",
    timeAgo: "5 hours ago",
    size: "4.7 MB",
    format: "JPG",
    dimensions: "3840 x 2160",
    tags: ["AI", "Stage", "Presentation"],
  },
  {
    id: "img-8",
    fileName: "workshop_day2.jpg",
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80",
    albumName: "MERN Stack Workshop",
    eventName: "MERN Stack Workshop",
    eventShort: "MERN Workshop",
    uploader: "Rohit Verma",
    timeAgo: "1 day ago",
    size: "3.4 MB",
    format: "JPG",
    dimensions: "3000 x 2000",
    tags: ["Workshop", "Classroom", "Learning"],
  },
  {
    id: "img-9",
    fileName: "venue_outside.jpg",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
    albumName: "Jharkhand Tech Summit 2026",
    eventName: "Jharkhand Tech Summit 2026",
    eventShort: "JTS 2026",
    uploader: "Abhishek Gupta",
    timeAgo: "1 day ago",
    size: "2.1 MB",
    format: "JPG",
    dimensions: "4000 x 2500",
    tags: ["Campus", "Building", "Exterior"],
  },
  {
    id: "img-10",
    fileName: "booth_area.png",
    url: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&auto=format&fit=crop&q=80",
    albumName: "Dev Connect Meetup",
    eventName: "Dev Connect Meetup",
    eventShort: "Dev Connect",
    uploader: "Priya Sharma",
    timeAgo: "1 day ago",
    size: "2.8 MB",
    format: "PNG",
    dimensions: "2800 x 1867",
    tags: ["Booth", "Swag", "Community"],
  },
  {
    id: "img-11",
    fileName: "panel_discussion.jpg",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=80",
    albumName: "AI in Action - Tech Talk",
    eventName: "AI in Action - Tech Talk",
    eventShort: "AI Talk",
    uploader: "Abhishek Gupta",
    timeAgo: "2 days ago",
    size: "3.9 MB",
    format: "JPG",
    dimensions: "3840 x 2160",
    tags: ["Panel", "Discussion", "Speakers"],
  },
  {
    id: "img-12",
    fileName: "organizers_team.jpg",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
    albumName: "MERN Stack Workshop",
    eventName: "MERN Stack Workshop",
    eventShort: "MERN Workshop",
    uploader: "Sneha Gupta",
    timeAgo: "2 days ago",
    size: "3.3 MB",
    format: "JPG",
    dimensions: "3200 x 2133",
    tags: ["Organizers", "Team", "Volunteers"],
  },
];
