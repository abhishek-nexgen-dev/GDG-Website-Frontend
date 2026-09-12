import React, { useState } from "react";
import GalleryHero from "../Components/GalleryHero";
import { GalleryFilterBar } from "../Components/GalleryFilterBar";
import { RecentHighlights } from "../Components/RecentHighlights";
import { YearlyGallery } from "../Components/YearlyGallery";
import { GalleryCTA } from "../Components/GalleryCTA";
import type { GalleryCardType } from "../types/Gallery.type";

// --- Dummy Data ---
const dummyRecentAlbums: GalleryCardType[] = [
  { _id: "r1", title: "DevFest Ranchi 2024", albumImageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", imageCount: 120, slug: "devfest-2024", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2024-12-21T00:00:00.000Z", updatedAt: "", __v: 0 },
  { _id: "r2", title: "Cloud Study Jam", albumImageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", imageCount: 85, slug: "cloud-jam-2024", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2024-10-26T00:00:00.000Z", updatedAt: "", __v: 0 },
  { _id: "r3", title: "AI for Bharat Workshop", albumImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", imageCount: 64, slug: "ai-bharat-2024", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2024-09-12T00:00:00.000Z", updatedAt: "", __v: 0 },
  { _id: "r4", title: "Community Meetup", albumImageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80", imageCount: 92, slug: "meetup-aug-2024", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2024-08-18T00:00:00.000Z", updatedAt: "", __v: 0 },
];

const dummy2024Albums: GalleryCardType[] = [
  { _id: "41", title: "Ideathon 2024", albumImageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", imageCount: 45, slug: "ideathon-2024", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2024-06-15T00:00:00.000Z", updatedAt: "", __v: 0 },
  { _id: "42", title: "Web Dev Bootcamp", albumImageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", imageCount: 32, slug: "web-dev-2024", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2024-05-10T00:00:00.000Z", updatedAt: "", __v: 0 },
  { _id: "43", title: "Google I/O Extended", albumImageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=800&q=80", imageCount: 150, slug: "io-extended-2024", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2024-04-20T00:00:00.000Z", updatedAt: "", __v: 0 },
  { _id: "44", title: "Women Techmakers", albumImageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80", imageCount: 78, slug: "wtm-2024", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2024-03-08T00:00:00.000Z", updatedAt: "", __v: 0 },
  { _id: "45", title: "Flutter Festival", albumImageUrl: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80", imageCount: 65, slug: "flutter-fest-2024", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2024-02-14T00:00:00.000Z", updatedAt: "", __v: 0 },
];

const dummy2023Albums: GalleryCardType[] = [
  { _id: "31", title: "DevFest 2023", albumImageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", imageCount: 210, slug: "devfest-2023", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2023-11-20T00:00:00.000Z", updatedAt: "", __v: 0 },
  { _id: "32", title: "Firebase Summit", albumImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", imageCount: 95, slug: "firebase-2023", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2023-09-15T00:00:00.000Z", updatedAt: "", __v: 0 },
  { _id: "33", title: "Android Study Jams", albumImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", imageCount: 54, slug: "android-jams-2023", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2023-07-10T00:00:00.000Z", updatedAt: "", __v: 0 },
  { _id: "34", title: "GCP Next", albumImageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80", imageCount: 112, slug: "gcp-next-2023", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2023-05-22T00:00:00.000Z", updatedAt: "", __v: 0 },
  { _id: "35", title: "ML Study Camp", albumImageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80", imageCount: 48, slug: "ml-camp-2023", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2023-03-18T00:00:00.000Z", updatedAt: "", __v: 0 },
];

const dummy2022Albums: GalleryCardType[] = [
  { _id: "21", title: "First GDG Meetup", albumImageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80", imageCount: 30, slug: "first-meetup-2022", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2022-10-05T00:00:00.000Z", updatedAt: "", __v: 0 },
  { _id: "22", title: "Code Lab Series", albumImageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80", imageCount: 42, slug: "codelab-2022", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2022-08-12T00:00:00.000Z", updatedAt: "", __v: 0 },
  { _id: "23", title: "Design Sprint", albumImageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80", imageCount: 28, slug: "design-sprint-2022", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2022-06-25T00:00:00.000Z", updatedAt: "", __v: 0 },
  { _id: "24", title: "Tech Talk: Web3", albumImageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80", imageCount: 65, slug: "web3-talk-2022", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2022-04-10T00:00:00.000Z", updatedAt: "", __v: 0 },
  { _id: "25", title: "Hackathon Prep", albumImageUrl: "https://images.unsplash.com/photo-1504384764586-bb4cdc1705b0?auto=format&fit=crop&w=800&q=80", imageCount: 50, slug: "hack-prep-2022", description: "", event: "", visibility: "public", status: "published", uploadedBy: "", isDeleted: false, createdAt: "2022-02-18T00:00:00.000Z", updatedAt: "", __v: 0 },
];

const GalleryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All Photos");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative min-h-screen text-white overflow-hidden pb-10">
      
      {/* Background Ambient Lights */}
      <div className="absolute left-[-20%] top-[-10%] h-[800px] w-[800px] rounded-full bg-[#EA4335]/10 blur-[150px] pointer-events-none" />
      <div className="absolute right-[-20%] top-[20%] h-[600px] w-[600px] rounded-full bg-[#4285F4]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[#34A853]/10 blur-[150px] pointer-events-none" />



      {/* 1. Hero Section */}
      <GalleryHero />

      {/* 2. Filter Bar */}
      <GalleryFilterBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      {/* 3. Recent Highlights */}
      {(activeTab === "All Photos" || activeTab === "Events") && (
        <RecentHighlights albums={dummyRecentAlbums} />
      )}

      {/* 4. Yearly Galleries */}
      <div className="mt-10 flex flex-col gap-10">
        <YearlyGallery year={2024} albums={dummy2024Albums} color="bg-[#4285F4]" />
        <YearlyGallery year={2023} albums={dummy2023Albums} color="bg-[#a142f4]" />
        <YearlyGallery year={2022} albums={dummy2022Albums} color="bg-[#34A853]" />
      </div>

      {/* 5. CTA Banner */}
      <GalleryCTA />

    </div>
  );
};

export default GalleryPage;
