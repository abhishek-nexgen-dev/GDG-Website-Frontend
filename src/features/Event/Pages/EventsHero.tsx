import { ArrowRight, Target, Users, Globe } from "lucide-react";

export const EventsHero = () => {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36 pb-16 lg:pb-24">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-[#1a73e8]/10 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-[#ea4335]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="lg:w-1/2 flex flex-col items-start text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-6">
            EVENTS
          </p>
          <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
            Learn <br />
            <span className="text-[#4285F4]">Build</span> <br />
            Together
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-zinc-400 max-w-lg">
            Workshops, tech talks, hackathons and more — explore all GDG Ranchi events and be a part of our growing developer community.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90">
              Upcoming Events <ArrowRight size={16} />
            </button>
            <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
              Be a Part <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-10 border-t border-white/10 pt-8">
            <div>
              <div className="flex items-center gap-2 text-2xl font-bold text-white">
                <Target className="text-[#4285F4]" size={28} /> 25+
              </div>
              <p className="mt-1 text-sm text-zinc-500">Events Hosted</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-2xl font-bold text-white">
                <Users className="text-[#34A853]" size={28} /> 3K+
              </div>
              <p className="mt-1 text-sm text-zinc-500">Developers Reached</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-2xl font-bold text-white">
                <Globe className="text-[#1a73e8]" size={28} /> A Stronger
              </div>
              <p className="mt-1 text-sm text-zinc-500">Tech Community</p>
            </div>
          </div>
        </div>

        {/* Right Content - 3D Composition */}
        <div className="lg:w-1/2 relative h-[600px] w-full hidden md:block">
          {/* Card 1 (Back Left) */}
          <div className="absolute top-20 left-0 z-10 -rotate-12 transform hover:rotate-0 hover:z-50 hover:scale-105 transition-all duration-500">
            <div className="relative h-64 w-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" alt="Idea" className="h-full w-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <p className="font-caveat text-4xl text-white rotate-[-10deg]">Ideas<br />People<br />Impact</p>
              </div>
            </div>
          </div>

          {/* Card 2 (Center Primary) */}
          <div className="absolute top-10 left-1/4 z-30 transform hover:scale-105 transition-all duration-500">
            <div className="relative h-96 w-72 overflow-hidden rounded-[32px] border border-white/20 bg-black shadow-2xl">
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80" alt="Speaker" className="h-full w-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-6 left-6">
                <p className="font-sans text-3xl font-bold text-white/90 leading-tight">Build<br />Learn<br />Connect</p>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-[#4285F4] mb-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                  </div>
                  <p className="text-sm font-medium text-white">More than just events,<br />A community.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 (Right) */}
          <div className="absolute top-32 right-0 z-20 rotate-6 transform hover:rotate-0 hover:z-50 hover:scale-105 transition-all duration-500">
            <div className="relative h-72 w-56 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" alt="Networking" className="h-full w-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute top-[-30px] right-[-20px] rotate-12">
                <p className="font-caveat text-3xl text-zinc-300">Same<br />Community<br />Bigger<br />Possibilities</p>
              </div>
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center gap-2 bg-[#1a73e8]/20 text-[#4285F4] border border-[#1a73e8]/50 px-3 py-1 rounded-full text-xs font-bold mb-3 w-fit">
                  <span>&lt; &gt;</span> GDG Ranchi
                </div>
                <div className="font-caveat text-2xl text-white/80 rotate-[-5deg]">
                  #Build<br />#Learn<br />#Belong
                </div>
              </div>
            </div>
          </div>

          {/* Arrow Circle */}
          <div className="absolute top-0 right-10 z-0">
            <div className="flex items-center justify-center h-16 w-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition hover:bg-white/10">
              <ArrowRight size={24} className="text-white -rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
