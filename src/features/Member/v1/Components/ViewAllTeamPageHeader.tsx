import { Search, SlidersHorizontal, ShieldCheck, Users } from "lucide-react";
import { HiUserGroup } from "react-icons/hi2";
import DropDown from "../../../../Components/DropDown";
import { useState } from "react";

const ViewAllTeamPageHeader = () => {
  const [role, setRole] = useState("");

  return (
    <section className="relative z-10 md:px-16 lg:px-[8%] lg:py-[15vh] xl:px-[10%]">
      {/* Hero */}
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Left */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4285F4]/30 bg-[#4285F4]/10 px-5 py-2 text-sm font-medium uppercase tracking-wide text-[#8AB4F8] backdrop-blur-xl">
            <Users size={16} />
            Our Strength
          </div>

          {/* Heading */}
          <h1 className="mt-7 text-5xl font-extrabold leading-tight lg:text-6xl">
            {" "}
            Meet the <br />{" "}
            <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] bg-clip-text text-transparent">
              {" "}
              Amazing Team{" "}
            </span>{" "}
          </h1>

          {/* Gradient Line */}
          <div className="mt-6 h-1 w-56 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853]" />

          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400">
            Behind every successful event, workshop, hackathon, and community initiative is an
            incredible team of passionate volunteers dedicated to building an inclusive and thriving
            developer ecosystem at Google Developer Group Ranchi.
          </p>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-5">
            {/* Card */}
            <div className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-[#111111]/80 px-6 py-5 backdrop-blur-xl transition-all duration-300 hover:border-[#4285F4]/50 hover:bg-[#161616]">
              <div className="rounded-2xl bg-[#4285F4]/15 p-4 transition-transform duration-300 group-hover:scale-110">
                <HiUserGroup className="text-3xl text-[#4285F4]" />
              </div>

              <div>
                <h3 className="text-3xl font-bold">40+</h3>
                <p className="text-gray-400">Core Members</p>
              </div>
            </div>

            {/* Card */}
            <div className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-[#111111]/80 px-6 py-5 backdrop-blur-xl transition-all duration-300 hover:border-[#34A853]/50 hover:bg-[#161616]">
              <div className="rounded-2xl bg-[#34A853]/15 p-4 transition-transform duration-300 group-hover:scale-110">
                <ShieldCheck className="text-[#34A853]" size={28} />
              </div>

              <div>
                <h3 className="text-3xl font-bold">12</h3>
                <p className="text-gray-400">Active Teams</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative hidden h-[520px] items-center justify-center lg:flex">
          {/* Glow */}
          <div className="absolute h-[420px] w-[420px] rounded-full bg-gradient-to-r from-[#4285F4]/25 via-[#EA4335]/20 to-[#34A853]/25 blur-[120px]" />

          {/* Floating Dots */}
          <div className="absolute left-10 top-10 h-5 w-5 animate-pulse rounded-full bg-[#4285F4]" />
          <div className="absolute right-16 top-20 h-4 w-4 animate-pulse rounded-full bg-[#EA4335]" />
          <div className="absolute bottom-16 left-12 h-6 w-6 animate-pulse rounded-full bg-[#34A853]" />
          <div className="absolute bottom-8 right-10 h-5 w-5 animate-pulse rounded-full bg-[#FBBC04]" />

          {/* Main Glass Card */}
          <div className="relative flex h-[360px] w-[360px] items-center justify-center rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,.35)]">
            <HiUserGroup className="text-[180px] text-white/90" />

            {/* Floating Card */}
            <div className="absolute -left-10 top-8 rounded-2xl border border-white/10 bg-[#111111]/80 px-6 py-4 backdrop-blur-xl">
              <p className="text-sm text-gray-400">Volunteers</p>
              <h3 className="text-3xl font-bold">100%</h3>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 right-4 rounded-2xl border border-white/10 bg-[#111111]/80 px-6 py-4 backdrop-blur-xl">
              <p className="text-sm text-gray-400">Community First</p>
              <h3 className="text-2xl font-bold text-[#34A853]">Since 2023</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative mt-20">
        <div className="rounded-3xl  p-5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,.35)]">
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* Search */}
            <div className="flex h-16 flex-1 items-center rounded-2xl border border-white/10 bg-[#111111]/70 px-5 transition-all duration-300 focus-within:border-[#4285F4]">
              <Search size={20} className="text-gray-500" />

              <input
                type="text"
                placeholder="Search team members..."
                className="ml-4 w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
              />
            </div>

            {/* Filter */}
            <button className="flex h-16 min-w-[240px] items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#111111]/70 text-gray-300 transition-all duration-300 hover:border-[#4285F4] hover:bg-[#161616] hover:text-white">
              {/* <SlidersHorizontal size={18} /> */}
              <DropDown
                value={role}
                onChange={(value) => setRole(value)}
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "Organizer", value: "organizer" },
                  { label: "Member", value: "member" },
                ]}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewAllTeamPageHeader;
