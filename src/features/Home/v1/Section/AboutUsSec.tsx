import { Code2, Mic, Rocket, Users } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Community",
    description:
      "Connect with passionate developers, students, and professionals who love learning and sharing knowledge.",
    color: "#EA4335",
  },
  {
    icon: Code2,
    title: "Workshops",
    description:
      "Hands-on sessions to build practical skills with Google technologies and modern development tools.",
    color: "#34A853",
  },
  {
    icon: Mic,
    title: "Tech Talks",
    description:
      "Gain insights from Google Developer Experts and experienced industry professionals.",
    color: "#FBBC04",
  },
  {
    icon: Rocket,
    title: "Hackathons",
    description:
      "Collaborate, innovate, and build impactful solutions while solving real-world challenges.",
    color: "#4285F4",
  },
];

const AboutUsSec = () => {
  return (
    <section className="  w-full flex flex-col">
      {/* Content */}
      <div className="relative h-[70%] md:mt-[25vh] flex-1 px-6 py-16 sm:px-10 md:px-16 lg:px-[8%] lg:py-20 xl:px-[10%]">
        {/* Title */}
        <div className="mb-5 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#EA4335]" />
          <span className="h-3 w-3 rounded-full bg-[#FBBC04]" />
          <span className="h-3 w-3 rounded-full bg-[#34A853]" />
          <span className="h-3 w-3 rounded-full bg-[#4285F4]" />

          <span className="ml-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 sm:text-sm">
            About Us
          </span>
        </div>

        <div className="absolute right-0 bottom-0 w-[25%] ">
          <img src="/Ellipse 6.svg" className="w-full h-full object-cover" />
        </div>

        {/* Heading */}
        <h2 className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Building the next <br />
          <span className="bg-gradient-to-r from-[#EA4335] via-[#FBBC04] to-[#34A853] bg-clip-text text-transparent">
            generation of developers.
          </span>
        </h2>

        {/* Paragraph 1 */}
        <p className="mt-8 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
          GDG Ranchi is a vibrant developer community that brings together students, professionals,
          and technology enthusiasts who are passionate about learning, building, and growing with
          Google technologies. Through hands-on workshops, hackathons, technical talks, coding
          sessions, and networking events, we create opportunities to gain practical skills,
          exchange ideas, and stay up to date with the latest innovations in technology.
        </p>

        {/* Paragraph 2 */}
        <p className="mt-6 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
          Whether you're writing your first line of code or building production-ready applications,
          GDG Ranchi is a place where everyone is welcome. We believe that learning becomes more
          meaningful when it's shared, collaboration sparks innovation, and every challenge is an
          opportunity to grow. Join us to connect with like-minded people, explore new technologies,
          and build solutions that create a real impact in the community and beyond.
        </p>
      </div>

      {/* Features */}
      <div className="border-y h-[30%] bg-black/90  border-white/10 px-6 py-8 sm:px-10 md:px-16 lg:px-[8%] xl:px-[10%]  border-0">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${feature.color}20`,
                  }}
                >
                  <Icon size={28} style={{ color: feature.color }} />
                </div>

                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>

                <p className="mt-3 text-sm leading-7 text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSec;
