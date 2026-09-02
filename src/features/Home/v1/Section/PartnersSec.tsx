import { useRef, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  {
    id: 1,
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    id: 2,
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    id: 3,
    name: "Coca-Cola",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",
  },
  {
    id: 4,
    name: "Spotify",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
  },
  {
    id: 5,
    name: "Stripe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
  },
  {
    id: 6,
    name: "Slack",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
  },
  {
    id: 7,
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    id: 8,
    name: "GitHub",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
  },
  {
    id: 9,
    name: "Vercel",
    logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png",
  },
  {
    id: 10,
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    id: 11,
    name: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
  },
  {
    id: 12,
    name: "Uber",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
  },
  {
    id: 13,
    name: "Discord",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Discord_logo_wordmark_2021.svg",
  },
  {
    id: 14,
    name: "Figma",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  },
];

const PartnersSec = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useGSAP(
    () => {
      gsap.fromTo(
        ".partners-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      ref={containerRef}
      className="group relative overflow-hidden bg-[#050505] py-28"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Global Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="partners-header mb-16 flex flex-col items-center justify-between gap-6 sm:mb-20 sm:flex-row">
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur">
            ✦ PARTNERS & SPONSORS
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-8 text-center text-4xl font-black text-white sm:text-5xl lg:text-6xl">
          Backed by the <br className="md:hidden" />
          <span className="text-primary">Best in Tech</span>
        </h2>

        {/* Infinite Scrolling Marquees */}
        <div className="mt-20 flex flex-col gap-6 relative overflow-hidden mask-image-linear">
          {/* Row 1 - Scrolls Left */}
          <div className="flex w-full overflow-hidden">
            <motion.div
              className="flex w-max gap-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            >
              {[...partners.slice(0, 8), ...partners.slice(0, 8)].map((partner, index) => (
                <div
                  key={`r1-${index}`}
                  className="group/card relative flex h-32 w-64 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <motion.div
                    className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-300 group-hover/card:opacity-100"
                    style={{
                      background: useMotionTemplate`
                        radial-gradient(
                          300px circle at ${mouseX}px ${mouseY}px,
                          rgba(255,255,255,0.1),
                          transparent 80%
                        )
                      `,
                    }}
                  />
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="relative z-10 h-12 w-auto opacity-40 grayscale transition-all duration-500 group-hover/card:scale-110 group-hover/card:opacity-100 group-hover/card:grayscale-0 filter"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Scrolls Right */}
          <div className="flex w-full overflow-hidden">
            <motion.div
              className="flex w-max gap-6"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            >
              {[...partners.slice(7, 15), ...partners.slice(7, 15)].map((partner, index) => (
                <div
                  key={`r2-${index}`}
                  className="group/card relative flex h-32 w-64 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <motion.div
                    className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-300 group-hover/card:opacity-100"
                    style={{
                      background: useMotionTemplate`
                        radial-gradient(
                          300px circle at ${mouseX}px ${mouseY}px,
                          rgba(255,255,255,0.1),
                          transparent 80%
                        )
                      `,
                    }}
                  />
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="relative z-10 h-12 w-auto opacity-40 grayscale transition-all duration-500 group-hover/card:scale-110 group-hover/card:opacity-100 group-hover/card:grayscale-0 filter"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Edge Fades for the infinite scroll */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#050505] to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#050505] to-transparent z-20" />
    </section>
  );
};

export default PartnersSec;
