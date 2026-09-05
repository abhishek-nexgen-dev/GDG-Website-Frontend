import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsYoutube,
} from "react-icons/bs";

const COLORS = {
  blue: "#4285F4",
  red: "#EA4335",
  yellow: "#FBBC05",
  green: "#34A853",
};

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#020611] text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="absolute inset-0">
        <img
          src="/404-bg.png"
          alt=""
          className="
            h-full
            w-full
            object-cover
            object-center
          "
        />

        {/* Premium cinematic vignette */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(
              ellipse_at_center,
              transparent_0%,
              rgba(2,6,17,0.08)_35%,
              rgba(2,6,17,0.45)_100%
            )]
          "
        />

        {/* subtle center readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020611]/25 via-transparent to-[#020611]/25" />
      </div>

      {/* =========================================================
          FLOATING AMBIENT LIGHT
      ========================================================= */}

      <motion.div
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [0.9, 1.15, 0.9],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[45%]
          h-[450px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#4285F4]/10
          blur-[150px]
        "
      />

      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <header
        className="
          relative z-30
          mx-auto
          flex
          w-full
          max-w-[80%]
          items-center
          justify-between
          px-5
          py-5
          sm:px-8
          lg:px-12
        "
      >
        {/* BRAND */}

        <Link to="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{
              rotate: 8,
              scale: 1.08,
            }}
            transition={{ type: "spring" }}
            className="h-10 w-10"
          >
            <img
              src="/GDG_Logo.svg"
              alt="GDG Ranchi"
              className="h-full w-full object-contain"
            />
          </motion.div>

          <div>
            <h2 className="text-base font-bold tracking-tight">
              GDG Ranchi
            </h2>

            <p className="mt-0.5 text-[8px] tracking-[0.28em] text-white/40">
              COMMUNITY × TECHNOLOGY × IMPACT
            </p>
          </div>
        </Link>

        {/* BACK */}

        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.96 }}
          className="
            group
            flex
            items-center
            gap-2
            text-sm
            text-white/60
             py-2
             px-4
             mr-8
            bg-black
            hover:text-white
          "
        >
          <ArrowLeft
            size={17}
            className="transition-transform group-hover:-translate-x-1 "
          />

          <span className="hidden sm:block">Go back</span>
        </motion.button>
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section
        className="
          relative z-20
          flex
          min-h-[calc(100vh-180px)]
          items-center
          justify-center
          px-5
          pb-28
          pt-8
          sm:px-8
          lg:px-12
        "
      >
        <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          {/* =====================================================
              ERROR INDICATOR
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="mb-5 flex items-center gap-3"
          >
            <motion.span
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="h-2 w-2 rounded-full bg-[#EA4335]"
            />

            <span className="text-[10px] font-semibold tracking-[0.45em] text-white/50 sm:text-xs">
              ERROR // 404
            </span>

            <div className="h-px w-8 bg-gradient-to-r from-[#EA4335] to-transparent" />
          </motion.div>

          {/* =====================================================
              404 NUMBER
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.75,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 90,
              damping: 16,
            }}
            className="
              relative
              flex
              items-center
              justify-center
              text-[110px]
              font-black
              leading-[0.8]
              tracking-[-0.09em]
              sm:text-[170px]
              md:text-[220px]
              lg:text-[270px]
            "
          >
            {/* BLUE 4 */}

            <motion.span
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                bg-gradient-to-b
                from-[#8AB4F8]
                via-[#4285F4]
                to-[#1A73E8]
                bg-clip-text
                text-transparent
                drop-shadow-[0_0_35px_rgba(66,133,244,0.45)]
              "
            >
              4
            </motion.span>

            {/* MULTICOLOR ZERO */}

            <motion.span
              animate={{
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                bg-[conic-gradient(
                  from_0deg,
                  #4285F4,
                  #EA4335,
                  #FBBC05,
                  #34A853,
                  #4285F4
                )]
                test-white
               
                drop-shadow-[0_0_45px_rgba(251,188,5,0.25)]
              "
            >
              0
            </motion.span>

            {/* GREEN 4 */}

            <motion.span
              animate={{
                y: [0, 4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="
                bg-gradient-to-b
                from-[#81C995]
                via-[#34A853]
                to-[#188038]
                bg-clip-text
                text-transparent
                drop-shadow-[0_0_35px_rgba(52,168,83,0.4)]
              "
            >
              4
            </motion.span>
          </motion.div>

          {/* =====================================================
              MAIN MESSAGE
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.45,
              duration: 0.7,
            }}
            className="mt-8"
          >
            <h1
              className="
                max-w-3xl
                text-3xl
                font-bold
                leading-[1.1]
                tracking-tight
                text-white
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
              "
            >
              You found a path{" "}

              <span className="relative inline-block">
                <span
                  className="
                    bg-gradient-to-r
                    from-[#4285F4]
                    via-[#FBBC05]
                    to-[#34A853]
                    bg-clip-text
                    text-transparent
                  "
                >
                  we haven't built yet.
                </span>
              </span>
            </h1>

            <p
              className="
                mx-auto
                mt-6
                max-w-xl
                text-sm
                leading-relaxed
                text-white/55
                sm:text-base
                md:text-lg
              "
            >
              Every great developer takes a few wrong turns.
              <br className="hidden sm:block" />
              This one just happens to lead somewhere unexpected.
            </p>
          </motion.div>

          {/* =====================================================
              BUTTONS
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.65,
              duration: 0.6,
            }}
            className="
              mt-9
              flex
              flex-col
              items-center
              gap-4
              sm:flex-row
            "
          >
            {/* PRIMARY */}

            <Link to="/">
              <motion.button
                whileHover={{
                  scale: 1.04,
                  y: -2,
                }}
                whileTap={{ scale: 0.97 }}
                className="
                  group
                  relative
                  flex
                  h-14
                  min-w-[210px]
                  items-center
                  justify-center
                  gap-3
                  overflow-hidden
                  rounded-full
                  bg-white
                  px-7
                  text-sm
                  font-bold
                  text-[#202124]
                  shadow-[0_15px_50px_rgba(66,133,244,0.3)]
                "
              >
                {/* Animated gradient */}

                <span
                  className="
                    absolute
                    inset-0
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                    bg-gradient-to-r
                    from-[#4285F4]/20
                    via-[#FBBC05]/20
                    to-[#34A853]/20
                  "
                />

                <Compass size={19} className="relative" />

                <span className="relative">
                  Explore GDG Ranchi
                </span>

                <ArrowRight
                  size={18}
                  className="
                    relative
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </motion.button>
            </Link>

            {/* SECONDARY */}

            <Link to="/events">
              <motion.button
                whileHover={{
                  scale: 1.04,
                  y: -2,
                }}
                whileTap={{ scale: 0.97 }}
                className="
                  group
                  flex
                  h-14
                  min-w-[190px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.04]
                  px-7
                  text-sm
                  font-semibold
                  text-white
                  backdrop-blur-xl
                  transition-all
                  hover:border-[#4285F4]/60
                  hover:bg-white/[0.08]
                "
              >
                <Sparkles
                  size={18}
                  className="text-[#FBBC05]"
                />

                Discover Events

                <ArrowRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </motion.button>
            </Link>
          </motion.div>

          {/* =====================================================
              COMMUNITY PATH
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="
              mt-10
              flex
              items-center
              justify-center
              gap-3
              text-[9px]
              font-medium
              tracking-[0.22em]
              text-white/35
              sm:gap-5
              sm:text-[10px]
            "
          >
            <span>LEARN</span>

            <span className="h-1.5 w-1.5 rounded-full bg-[#4285F4]" />

            <span>BUILD</span>

            <span className="h-1.5 w-1.5 rounded-full bg-[#FBBC05]" />

            <span>CONNECT</span>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          BOTTOM FLOATING FOOTER
      ========================================================= */}

      <motion.footer
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1,
          duration: 0.7,
        }}
        className="
          absolute
          bottom-0
          left-0
          z-30
          flex
          w-full
          items-end
          justify-between
          px-5
          py-5
          sm:px-8
          lg:px-12
        "
      >
        {/* LOCATION */}

        <div className="hidden items-center gap-2 text-white/40 sm:flex">
          <MapPin size={15} />

          <span className="text-xs">
            Ranchi, Jharkhand · India
          </span>
        </div>

        {/* SOCIAL */}

        <div className="ml-auto flex items-center gap-4">
          <SocialLink icon={<BsLinkedin />} />
          <SocialLink icon={<BsInstagram />} />
          <SocialLink icon={<BsGithub />} />
          <SocialLink icon={<BsYoutube />} />

          <div className="ml-2 hidden h-5 w-px bg-white/15 md:block" />

          <span className="hidden text-xs text-white/40 md:block">
            Let's build the future together.
          </span>
        </div>
      </motion.footer>

      {/* =========================================================
          AMBIENT PARTICLES
      ========================================================= */}

      <Star
        className="left-[28%] top-[25%]"
        color={COLORS.blue}
        delay={0}
      />

      <Star
        className="right-[30%] top-[35%]"
        color={COLORS.yellow}
        delay={1}
      />

      <Star
        className="left-[42%] bottom-[28%]"
        color={COLORS.green}
        delay={2}
      />
    </main>
  );
};

/* =============================================================
   SOCIAL LINK
============================================================= */

const SocialLink = ({
  icon,
}: {
  icon: React.ReactNode;
}) => {
  return (
    <motion.a
      href="#"
      whileHover={{
        y: -4,
        scale: 1.15,
      }}
      whileTap={{ scale: 0.9 }}
      className="
        text-sm
        text-white/45
        transition-colors
        hover:text-white
      "
    >
      {icon}
    </motion.a>
  );
};

/* =============================================================
   STAR PARTICLE
============================================================= */

const Star = ({
  className,
  color,
  delay,
}: {
  className: string;
  color: string;
  delay: number;
}) => {
  return (
    <motion.div
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [0.7, 1.4, 0.7],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      style={{
        backgroundColor: color,
        boxShadow: `0 0 18px ${color}`,
      }}
      className={`
        pointer-events-none
        absolute
        z-20
        h-1
        w-1
        rounded-full
        ${className}
      `}
    />
  );
};

export default NotFound;