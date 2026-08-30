import React from "react";
import useGalleryFetch from "../hooks/useGalleryFetch";
import GalleryCard from "../Components/GalleryCard";
import GalleryHero from "../Components/GalleryHero";

const GalleryPage: React.FC = () => {
  const { data, error, isLoading } = useGalleryFetch();

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#010101] text-white">
        <div className="text-xl font-medium animate-pulse">Loading galleries...</div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#010101] text-white">
        <div className="text-center text-red-400">
          <h2 className="text-2xl font-bold">Error loading galleries</h2>
          <p className="mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  // 3. No Data State
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="relative min-h-screen bg-[#010101] text-white">
        <GalleryHero />
        <div className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-400">No galleries found</h3>
          <p className="mt-2 text-gray-500">Check back later for new events and photos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-[#010101] text-white">
      {/* Background Blur Effects */}
      <div className="absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-[#EA4335]/20 blur-[120px]" />
      <div className="absolute right-[-100px] top-40 h-96 w-96 rounded-full bg-[#4285F4]/20 blur-[150px]" />
      <div className="absolute bottom-[-150px] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#34A853]/15 blur-[150px]" />
      <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#34A853]/15 blur-[150px]" />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Hero Section */}
      <GalleryHero />

      {/* Gallery Grid */}
      <section className="relative z-10 px-6 py-16 sm:px-10 md:px-16 lg:px-[8%] lg:py-20 xl:px-[10%]">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
          {data.data.map((item) => (
            <GalleryCard key={item._id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;