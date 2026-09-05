import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Bell, Code2, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-[#4285F4]/30">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0  bg-[radial-gradient(circle_at_15%_20%,rgba(66,133,244,0.13),transparent_30%),radial-gradient(circle_at_75%_45%,rgba(52,168,83,0.07),transparent_25%),radial-gradient(circle_at_55%_100%,rgba(234,67,53,0.05),transparent_30%)]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.45) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.45) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />

        <div className="absolute left-[-15%] top-[25%] h-[450px] w-[450px] rounded-full bg-[#4285F4]/10 blur-[150px]" />

        <div className="absolute right-[-10%] top-[15%] h-[500px] w-[500px] rounded-full bg-[#FBBC04]/[0.06] blur-[160px]" />

        <div className="absolute bottom-[-20%] right-[15%] h-[450px] w-[450px] rounded-full bg-[#34A853]/10 blur-[170px]" />

        <div className="absolute left-[45%] top-[40%] h-[300px] w-[300px] rounded-full bg-[#EA4335]/[0.035] blur-[130px]" />
      </div>

      <div className="relative z-30 mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <img src="/GDG_Logo.svg" />
          </div>

          <div>
            <h2 className="text-base font-bold tracking-tight text-white sm:text-lg">GDG Ranchi</h2>

            <p className="text-[8px] font-medium tracking-[0.2em] text-white/35 sm:text-[9px]">
              LEARN · BUILD · CONNECT
            </p>
          </div>
        </Link>

        <button
          onClick={() => navigate(-1)}
          className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5 text-xs font-medium text-white/60 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white sm:px-5 sm:text-sm"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <ArrowLeft
            size={15}
            className="relative transition-transform duration-300 group-hover:-translate-x-1"
          />

          <span className="relative">Go Back</span>
        </button>
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-85px)] max-w-[1500px] items-center px-5 py-10 sm:px-8 lg:px-12 lg:py-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] xl:grid-cols-[0.82fr_1.18fr] xl:gap-6">
          <div className="relative z-20 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center gap-3 sm:mb-7"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FBBC04] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FBBC04] shadow-[0_0_10px_#FBBC04]" />
              </span>

              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FBBC04] sm:text-[11px] sm:tracking-[0.38em]">
                Page Under Development
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-black leading-[0.86] tracking-[-0.065em]"
            >
              <span className="block text-[3.5rem] sm:text-6xl md:text-7xl lg:text-[4.8rem] xl:text-[5.5rem]">
                Something
              </span>

              <span className="block bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] bg-clip-text text-[4.3rem] text-transparent sm:text-7xl md:text-8xl lg:text-[6rem] xl:text-[7rem]">
                Amazing
              </span>

              <span className="block text-[3rem] text-white sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.2rem]">
                is coming.
              </span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-7 flex origin-left items-center gap-3"
            >
              <div className="h-px w-24 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04]" />

              <div className="h-1.5 w-1.5 rounded-full bg-[#34A853] shadow-[0_0_10px_#34A853]" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-6 max-w-lg text-sm leading-7 text-white/45 sm:mt-7 sm:text-base sm:leading-8 lg:text-[17px]"
            >
              We're building something meaningful for the next generation of developers, creators,
              and innovators. A new experience is taking shape behind the scenes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 sm:mt-9"
            >
              <button className="group relative flex items-center gap-4 overflow-hidden rounded-full border border-white/[0.13] bg-white/[0.035] py-2 pl-2 pr-5 text-sm font-semibold text-white/85 backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-[#FBBC04]/40 hover:bg-white/[0.07] hover:shadow-[0_10px_40px_rgba(251,188,4,0.08)]">
                <span className="absolute inset-0 bg-gradient-to-r from-[#4285F4]/0 via-[#FBBC04]/[0.04] to-[#34A853]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#FBBC04] text-black shadow-[0_0_30px_rgba(251,188,4,0.3)] transition-transform duration-300 group-hover:rotate-12">
                  <Bell size={17} fill="currentColor" />
                </span>

                <span className="relative">Notify Me When It's Live</span>

                <ArrowRight
                  size={17}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-10 grid max-w-xl grid-cols-3 gap-2 sm:gap-3"
            >
              <Feature
                icon={<Code2 size={18} />}
                title="Learn"
                subtitle="New Skills"
                color="blue"
              />

              <Feature
                icon={<Sparkles size={18} />}
                title="Build"
                subtitle="Together"
                color="yellow"
              />

              <Feature
                icon={<ArrowRight size={18} />}
                title="Grow"
                subtitle="Bigger Impact"
                color="green"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative order-1 flex min-h-[360px] items-center justify-center sm:min-h-[500px] lg:order-2 lg:min-h-[650px]"
          >
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.5, 0.85, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute h-[65%] w-[65%] rounded-full bg-[#4285F4]/20 blur-[100px]"
            />

            <motion.div
              animate={{
                scale: [1.1, 0.95, 1.1],
                opacity: [0.25, 0.5, 0.25],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-[10%] top-[15%] h-[35%] w-[35%] rounded-full bg-[#FBBC04]/25 blur-[80px]"
            />

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[12%] left-[15%] h-[30%] w-[30%] rounded-full bg-[#34A853]/20 blur-[90px]"
            />

            <div className="absolute inset-[8%] rounded-full border border-white/[0.035]" />

            <div className="absolute inset-[16%] rounded-full border border-dashed border-white/[0.04]" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[10%] rounded-full border border-transparent border-t-[#4285F4]/20 border-r-[#34A853]/10"
            />

            <motion.div
              animate={{
                y: [0, -14, 0],
                rotate: [0, 1, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 flex w-full justify-center"
            >
              <img
                src="/coming-soon-illustration.png"
                alt="GDG Ranchi under development"
                className="w-full max-w-[500px] object-contain sm:max-w-[620px] lg:max-w-[720px] xl:max-w-[780px] drop-shadow-[0_35px_70px_rgba(0,0,0,0.8)]"
              />
            </motion.div>

            <motion.div
              animate={{
                y: [0, -8, 0],
                opacity: [0.35, 0.7, 0.35],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-[8%] top-[18%] h-2 w-2 rounded-full bg-[#FBBC04] shadow-[0_0_20px_8px_rgba(251,188,4,0.25)]"
            />

            <motion.div
              animate={{
                y: [0, 12, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute left-[12%] top-[35%] h-2 w-2 rounded-full bg-[#4285F4] shadow-[0_0_20px_8px_rgba(66,133,244,0.25)]"
            />

            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[22%] right-[15%] h-1.5 w-1.5 rounded-full bg-[#34A853] shadow-[0_0_18px_7px_rgba(52,168,83,0.3)]"
            />
          </motion.div>
        </div>
      </section>

      <footer className="relative z-20 mx-auto flex max-w-[1500px] flex-col justify-between gap-5 border-t border-white/[0.06] px-5 py-6 sm:flex-row sm:items-center sm:px-8 lg:px-12">
        <div>
          <p className="font-semibold text-white/70">GDG Ranchi</p>

          <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/30 sm:text-[10px]">
            Community × Technology × Impact
          </p>
        </div>

        <div className="flex items-center gap-5 text-white/40">
          <a
            href="#"
            className="transition-all duration-300 hover:-translate-y-0.5 hover:text-[#4285F4]"
          >
            <BsLinkedin size={17} />
          </a>

          <a
            href="#"
            className="transition-all duration-300 hover:-translate-y-0.5 hover:text-[#EA4335]"
          >
            <BsInstagram size={17} />
          </a>

          <a
            href="#"
            className="transition-all duration-300 hover:-translate-y-0.5 hover:text-[#FBBC04]"
          >
            <BsYoutube size={18} />
          </a>

          <div className="h-5 w-px bg-white/10" />

          <span className="text-sm text-white/45">See you soon! 👋</span>
        </div>
      </footer>
    </main>
  );
};

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: "blue" | "yellow" | "green";
}

const Feature = ({ icon, title, subtitle, color }: FeatureProps) => {
  const colors = {
    blue: {
      icon: "bg-[#4285F4]/10 text-[#4285F4]",
      glow: "group-hover:shadow-[0_0_25px_rgba(66,133,244,0.12)]",
    },
    yellow: {
      icon: "bg-[#FBBC04]/10 text-[#FBBC04]",
      glow: "group-hover:shadow-[0_0_25px_rgba(251,188,4,0.12)]",
    },
    green: {
      icon: "bg-[#34A853]/10 text-[#34A853]",
      glow: "group-hover:shadow-[0_0_25px_rgba(52,168,83,0.12)]",
    },
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.05] ${colors[color].glow} sm:p-4`}
    >
      <div
        className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${colors[color].icon}`}
      >
        {icon}
      </div>

      <p className="text-sm font-semibold text-white/80">{title}</p>

      <p className="mt-0.5 text-[9px] text-white/35 sm:text-xs">{subtitle}</p>
    </div>
  );
};

export default ComingSoon;
