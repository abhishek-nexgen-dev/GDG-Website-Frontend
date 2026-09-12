import { ArrowRight, Camera, Users, Heart, Star, UploadCloud } from "lucide-react";
import { Link } from "react-router-dom";

const GalleryHero = () => {
  return (
    <section className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-28 lg:pt-36 pb-16 lg:pb-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Content */}
        <div className="relative z-10 max-w-2xl">
          <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-6">
            Event Gallery
          </p>

          <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
            Moments<br />
            That Build<br />
            <span className="text-primary">
              Community
            </span>
          </h1>

          <p className="text-lg text-zinc-400 mb-10 max-w-lg leading-relaxed">
            Photos, memories and stories from our events, workshops, and community meetups at GDG Ranchi.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link 
              to="/events" 
              className="group flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105"
            >
              Explore Events 
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="group flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/40">
              <UploadCloud size={18} className="text-zinc-400 transition-colors group-hover:text-white" />
              Contribute Photos
            </button>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-6 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4285F4]/10">
                <Camera className="text-[#4285F4]" size={20} />
              </div>
              <div>
                <p className="text-lg font-bold text-white leading-none">2K+</p>
                <p className="text-xs text-zinc-500 mt-1">Photos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#34A853]/10">
                <Users className="text-[#34A853]" size={20} />
              </div>
              <div>
                <p className="text-lg font-bold text-white leading-none">25+</p>
                <p className="text-xs text-zinc-500 mt-1">Events Covered</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EA4335]/10">
                <Heart className="text-[#EA4335]" size={20} />
              </div>
              <div>
                <p className="text-lg font-bold text-white leading-none">500+</p>
                <p className="text-xs text-zinc-500 mt-1">Community Members</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#a142f4]/10">
                <Star className="text-[#a142f4]" size={20} />
              </div>
              <div>
                <p className="text-lg font-bold text-white leading-none">∞</p>
                <p className="text-xs text-zinc-500 mt-1">Memories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - 3D Collage */}
        <div className="hidden lg:block relative h-[600px] w-full perspective-1000 mt-10">
          
          {/* Top Image */}
          <div className="absolute top-[2%] right-[10%] w-[280px] h-[180px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-[8deg] z-10 opacity-90 hover:opacity-100 hover:scale-105 hover:z-50 transition-all duration-500">
             <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Gallery" className="w-full h-full object-cover" />
          </div>

          {/* Middle Image (Main) */}
          <div className="absolute top-[32%] left-[10%] w-[380px] h-[240px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl -rotate-[3deg] z-20 hover:scale-105 hover:z-50 transition-all duration-500">
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" alt="Gallery" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white font-bold text-lg leading-tight">Google Developer Group</h3>
              <p className="text-zinc-300 text-sm">Ranchi</p>
            </div>
          </div>

          {/* Bottom Left Image */}
          <div className="absolute bottom-[2%] left-[2%] w-[240px] h-[160px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-[12deg] z-30 opacity-90 hover:opacity-100 hover:scale-105 hover:z-50 transition-all duration-500">
             <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" alt="Gallery" className="w-full h-full object-cover" />
          </div>

          {/* Bottom Right Image */}
          <div className="absolute bottom-[8%] right-[5%] w-[320px] h-[200px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl -rotate-[6deg] z-30 opacity-90 hover:opacity-100 hover:scale-105 hover:z-50 transition-all duration-500">
             <img src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80" alt="Gallery" className="w-full h-full object-cover" />
          </div>

          {/* Floating Text Accents */}
          
          {/* People Ideas Progress */}
          <div className="absolute top-[8%] left-[25%] z-40 rotate-[15deg]">
            <p className="font-caveat text-3xl font-medium text-white drop-shadow-md leading-tight">
              People<br/>Ideas<br/>Progress
            </p>
          </div>

          {/* Build Learn Belong */}
          <div className="absolute bottom-[18%] left-[10%] z-40 rotate-[-12deg]">
            <p className="font-caveat text-4xl font-bold text-[#34A853] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
              Build<br/>Learn<br/>Belong
            </p>
          </div>

          {/* A Stronger Developer Community */}
          <div className="absolute bottom-[35%] right-[2%] z-40 rotate-[-5deg]">
            <p className="font-caveat text-[26px] font-bold text-[#4285F4] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
              A Stronger<br/>Developer<br/>Community
            </p>
          </div>

          {/* Glow effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#4285F4]/20 blur-[100px] rounded-full z-0 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default GalleryHero;
