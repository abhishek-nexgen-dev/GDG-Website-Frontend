
import { ArrowRight, Users, Target } from "lucide-react";

const ViewAllTeamPageHeader = () => {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 pt-28 lg:pt-36 pb-16 lg:pb-24 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left Side Content */}
        <div>
          <h4 className="mb-4 text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
            Our Team
          </h4>
          <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
            People <br />
            Behind the <br />
            <span className="text-primary">
              Possibilities
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-gray-400">
            A diverse group of builders, learners, and changemakers working together to grow the developer community in Ranchi.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-transform hover:scale-105 hover:opacity-90">
              Join Our Team <ArrowRight size={18} />
            </button>
            <button className="flex items-center justify-center gap-2 rounded-full border border-gray-600 px-6 py-3 font-semibold text-white transition-colors hover:border-white hover:bg-white/5">
              Meet Our Community
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                <Users size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">20+</h3>
                <p className="text-xs text-gray-400">Team Members</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                <Users size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">6</h3>
                <p className="text-xs text-gray-400">Teams</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
                <Target size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">1</h3>
                <p className="text-xs text-gray-400">Mission</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Graphics (Polaroids) */}
        <div className="relative hidden h-[500px] w-full lg:block">
          {/* Top-Right Polaroid */}
          <div className="absolute right-0 top-0 z-20 h-64 w-80 rotate-[4deg] overflow-hidden rounded-xl border-4 border-white/10 bg-white/5 shadow-2xl transition-transform hover:rotate-0">
            <img
              src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_800,h_500,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/IMG_5730.JPG"
              alt="Team Event"
              className="h-full w-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 right-4 font-mono text-xl font-bold text-white opacity-80">
              {"</>"}
            </div>
          </div>

          {/* Bottom-Left Polaroid */}
          <div className="absolute bottom-10 left-10 z-30 h-40 w-60 rotate-[-6deg] overflow-hidden rounded-xl border-4 border-[#34A853]/30 bg-black shadow-[0_0_50px_rgba(52,168,83,0.2)] transition-transform hover:rotate-0 hover:scale-105">
            <img
              src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_800,h_500,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/IMG_5732.JPG"
              alt="Community"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Hand-drawn Text Overlay 1 */}
          <div className="absolute left-[20px] top-[40px] z-40 rotate-[-12deg] font-caveat text-2xl text-green-400">
            Same<br />People<br />Bigger<br />Impact
          </div>

          {/* Hand-drawn Text Overlay 2 */}
          <div className="absolute bottom-[20px] right-[-20px] z-40 rotate-[-8deg] font-caveat text-xl text-gray-300">
            Ideas<br />People<br />Community<br />Ranchi
          </div>
          
          {/* Abstract Shapes */}
          <div className="absolute bottom-20 right-20 -z-10 h-24 w-24 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 blur-sm rotate-12 opacity-80" />
          <div className="absolute left-32 top-32 -z-10 h-32 w-32 rounded-full bg-blue-500/30 blur-[40px]" />
        </div>
      </div>
    </section>
  );
};

export default ViewAllTeamPageHeader;
