import { ArrowRight } from "lucide-react";

export const EventsCTA = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
      <div className="relative overflow-hidden rounded-[24px] border border-[#0d4f54] bg-[#020b0d] px-8 py-10 md:px-12 md:py-12">

        {/* Background Swoop Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 hidden md:block">
          <svg width="100%" height="100%" viewBox="0 0 1200 200" fill="none" preserveAspectRatio="none">
            <path d="M400,0 C500,100 450,200 600,200 C750,200 800,50 900,0" stroke="#34A853" strokeWidth="1" />
            <path d="M500,-50 C600,50 550,150 700,150 C850,150 900,0 1000,-50" stroke="#4285F4" strokeWidth="1" />
            <path d="M300,-100 C400,0 450,100 600,100 C750,100 800,-50 900,-100" stroke="#34A853" strokeWidth="1" />
            {/* Small abstract shape */}
            <path d="M550,60 L580,40 L570,80 Z" stroke="#34A853" strokeWidth="1.5" fill="transparent" />
            <path d="M580,40 L600,50 L570,80" stroke="#34A853" strokeWidth="1.5" fill="transparent" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">

          {/* Left Text */}
          <div className="md:w-5/12 lg:w-1/2">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 mb-3">
              DON'T JUST ATTEND. BELONG.
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Be Part of <span className="text-[#4285F4]">What's</span> <span className="text-[#34A853]">Next</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
              Join GDG Ranchi and get notified about upcoming events, early access, and exclusive community experiences.
            </p>
          </div>

          {/* Far Right Handwritten Text */}
          <div className="md:w-3/12 flex justify-end relative h-32 w-full mt-6 md:mt-0">
            {/* 4-point star */}
            <div className="absolute left-0 bottom-4 text-[#4285F4]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </div>

            <div className="relative">
              {/* Dark blue skewed box */}
              <div className="absolute inset-0 bg-[#0a1329] transform rotate-[-8deg] -skew-x-6 rounded-lg opacity-80" />

              {/* Text and Underline */}
              <div className="relative z-10 px-6 py-4 rotate-[-8deg] flex flex-col items-start">
                <div className="font-caveat text-3xl lg:text-4xl text-[#669df6] leading-none">Build</div>
                <div className="font-caveat text-3xl lg:text-4xl text-[#669df6] leading-none ml-3">Learn</div>
                <div className="font-caveat text-3xl lg:text-4xl text-[#669df6] leading-none ml-6">Belong</div>
                {/* Green underline */}
                <div className="w-20 h-1 bg-[#34A853] mt-1 rounded-full transform rotate-3 ml-6 shadow-[0_0_8px_#34A853]" />
              </div>
            </div>
          </div>
          {/* Center Button and Avatars */}
          <div className="md:w-4/12 flex flex-col items-start md:items-end gap-5">
            <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#0a192f] transition hover:bg-zinc-200">
              Join the Community <ArrowRight size={16} className="text-[#0a192f]" />
            </button>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="user" className="h-9 w-9 rounded-full border-2 border-[#020b0d] bg-zinc-800" />
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="user" className="h-9 w-9 rounded-full border-2 border-[#020b0d] bg-zinc-800" />
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" alt="user" className="h-9 w-9 rounded-full border-2 border-[#020b0d] bg-zinc-800" />
              </div>
              <p className="text-[11px] text-zinc-300 font-medium leading-snug">
                3K+ developers<br />already joined
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
