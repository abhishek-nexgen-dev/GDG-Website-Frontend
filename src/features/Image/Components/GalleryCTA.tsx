import { ArrowRight, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const GalleryCTA = () => {
  return (
    <section className="relative mx-auto max-w-7xl px-6 lg:px-8 mt-20 mb-20">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A0A] px-8 py-16 md:px-16 lg:py-20 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Abstract Background Elements */}
        <div className="absolute left-0 top-0 h-full w-full opacity-30 pointer-events-none">
          <div className="absolute top-[-50%] right-[10%] h-96 w-96 rounded-full bg-[#34A853] blur-[120px]" />
          <div className="absolute bottom-[-50%] right-[30%] h-64 w-64 rounded-full bg-[#FBBC04] blur-[100px]" />
          <div className="absolute -left-20 top-1/2 h-64 w-64 rounded-full bg-[#4285F4] blur-[100px]" />
        </div>

        {/* Left Content */}
        <div className="relative z-10 w-full md:w-3/5">
          <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-4">
            Be a part of more moments
          </p>
          <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-white leading-tight mb-6 tracking-tight">
            Many More <span className="text-[#34A853]">Stories</span> <span className="bg-gradient-to-r from-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent">to Capture</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Join our upcoming events and be a part of the next chapter.
          </p>
        </div>

        {/* Right Content / Buttons */}
        <div className="relative z-10 w-full md:w-2/5 flex flex-col items-start md:items-end gap-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-start md:justify-end">
            <Link 
              to="/events" 
              className="group flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105 shadow-xl shadow-primary/20"
            >
              View Upcoming Events 
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a 
              href="https://gdg.community.dev/gdg-ranchi/" 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/40"
            >
              <Users size={18} className="text-zinc-400 transition-colors group-hover:text-white" />
              Join GDG Ranchi
            </a>
          </div>

          {/* Floating Handwritten Text */}
          <div className="relative mt-8 md:mt-12 hidden md:block w-full">
            <div className="absolute right-0 rotate-[-8deg]">
              <Sparkles className="absolute -top-4 -left-6 text-[#4285F4] w-5 h-5 opacity-70" />
              <p className="font-caveat text-2xl text-zinc-300 whitespace-nowrap drop-shadow-md">
                Same Community<br/>Bigger Possibilities
              </p>
              <Sparkles className="absolute -bottom-6 -right-4 text-[#34A853] w-6 h-6 opacity-70" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
