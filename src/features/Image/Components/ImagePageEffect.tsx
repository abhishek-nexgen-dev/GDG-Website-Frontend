
const ImagePageEffect = () => {
  return (
    <>
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

      <div className="absolute left-0 top-[0%] -translate-y-1/2 overflow-visible">
        {/* Layer 1: Deep Blue Base */}
        <div className="absolute -left-10 top-0 h-[400px] w-[400px] rounded-full bg-blue-600 blur-[90px] opacity-40 animate-pulse"></div>

        {/* Layer 2: Red/Pink Accent for GDG vibrancy */}
        <div className="absolute -right-10 top-10 h-[350px] w-[350px] rounded-full bg-red-500 blur-[80px] opacity-30 mix-blend-screen animate-pulse delay-300"></div>

        {/* Layer 3: Yellow/Green Highlight */}
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400 blur-[70px] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="absolute right-[-2%] top-0 h-80 w-80 rounded-full bg-gradient-to-r from-[#EA4335]/30 via-[#FBBC04]/20 to-[#34A853]/30 blur-[100px]" />

      <div className="absolute right-[-2%] top-0 h-80 w-80 rounded-full bg-gradient-to-r from-purple-400 via-[#FBBC04]/20 to-[#34A853]/30 blur-[100px]  " />

      <div className="absolute right-0 top-[40%] -translate-y-1/2 overflow-visible">
        {/* Layer 1: Deep Blue Base */}
        <div className="absolute -left-10 top-0 h-[400px] w-[400px] rounded-full bg-blue-600 blur-[90px] opacity-40 animate-pulse"></div>

        {/* Layer 2: Red/Pink Accent for GDG vibrancy */}
        <div className="absolute -right-10 top-10 h-[350px] w-[350px] rounded-full bg-red-500 blur-[80px] opacity-30 mix-blend-screen animate-pulse delay-300"></div>

        {/* Layer 3: Yellow/Green Highlight */}
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400 blur-[70px] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="absolute left-0 bottom-[25%] -translate-y-1/2 overflow-visible">
        {/* Layer 1: Deep Blue Base */}
        <div className="absolute -left-10 top-0 h-[400px] w-[400px] rounded-full bg-blue-600 blur-[90px] opacity-40 animate-pulse"></div>

        {/* Layer 2: Red/Pink Accent for GDG vibrancy */}
        <div className="absolute -right-10 top-10 h-[350px] w-[350px] rounded-full bg-red-500 blur-[80px] opacity-30 mix-blend-screen animate-pulse delay-300"></div>

        {/* Layer 3: Yellow/Green Highlight */}
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400 blur-[70px] opacity-20 mix-blend-overlay"></div>
      </div>
    </>
  );
};

export default ImagePageEffect;
