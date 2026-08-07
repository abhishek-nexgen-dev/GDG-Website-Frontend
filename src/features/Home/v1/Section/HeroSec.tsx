import Stack from "../../../../Components/Stack";

const images = [
  "https://hacktoskill.com/home-cdn/3p.webp",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
];

const HeroSec = () => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-16 px-6 py-20 lg:px-12">
        {/* Left */}
        <div className="max-w-xl">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur">
            Google Developer Groups • Ranchi
          </span>

          <h1 className="mt-8 text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Learn.
            <br />
            Build.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-yellow-300 bg-clip-text text-transparent">
              Connect.
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-white/65">
            Join a thriving community of developers. Learn modern technologies,
            build real-world projects, participate in workshops, hackathons, and
            grow together with Google technologies.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-xl bg-white px-7 py-3 font-semibold text-black transition hover:scale-105">
              Join Community
            </button>

            <button className="rounded-xl border border-white/10 bg-white/5 px-7 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10">
              Explore Events
            </button>
          </div>

          
        </div>

        {/* Right */}
        <div className="flex flex-1 items-center justify-center">
          <div className="h-[520px] w-[550px] ml-[5vw]">
            <Stack
              randomRotation={false}
              sensitivity={1500}
              sendToBackOnClick
              autoplay
              autoplayDelay={2500}
              pauseOnHover

              cards={images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`card-${index}`}
                  className="h-full w-full rounded-3xl object-cover shadow-2xl"
                />
              ))}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSec;