
import GalleryCard from "../Components/GalleryCard";
import GalleryHero from "../Components/GalleryHero";

const GalleryPage = () => {
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

      {/* Gallery */}
      <section className="relative z-10 grid grid-cols-1  gap-12 px-6 py-16 sm:grid-cols-3 sm:px-10 md:px-16 lg:px-[8%] lg:py-20 xl:px-[10%]">
        <GalleryCard />

        <GalleryCard image="https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_500,h_500,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/blob_AsZi2f5" />

        <GalleryCard image="https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_500,h_500,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/Web3%20logo_9WYq9up.png" />

        <GalleryCard image="https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_500,h_500,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/ICON%20DEVFEST_iU4JbWT.png" />
      </section>
    </div>
  );
};

export default GalleryPage;
