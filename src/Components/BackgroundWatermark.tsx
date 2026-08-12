import { animate, motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export function BackgroundWatermark() {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const radius = useMotionValue(0);
  const opacity = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 90,
    damping: 22,
    mass: 0.9,
  });

  const y = useSpring(mouseY, {
    stiffness: 90,
    damping: 22,
    mass: 0.9,
  });

  const r = useSpring(radius, {
    stiffness: 120,
    damping: 20,
  });

  const mask = useMotionTemplate`
    radial-gradient(
      ${r}px circle at ${x}px ${y}px,
      rgba(255,255,255,1) 0%,
      rgba(255,255,255,.95) 35%,
      rgba(255,255,255,.7) 60%,
      rgba(255,255,255,.2) 80%,
      transparent 100%
    )
  `;

  return (
    <section
      className="relative flex h-[320px] items-center justify-center overflow-hidden select-none z-50"
      onMouseEnter={() => {
        animate(radius, 240, {
          duration: 0.45,
          ease: "easeOut",
        });

        animate(opacity, 1, {
          duration: 0.35,
        });
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => {
        animate(radius, 0, {
          duration: 0.5,
          ease: "easeInOut",
        });

        animate(opacity, 0, {
          duration: 0.45,
        });
      }}
    >
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-[420px] w-[420px] rounded-full bg-google-blue/10 blur-[140px]"
      />

      {/* Outline */}
      <div
        className="
    absolute
    flex
    items-center
    gap-5
    whitespace-nowrap
    pointer-events-none
  "
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,.08)",
        }}
      >
        <span
          className="
      gdg-ranchi-txt
      text-[72px]
      sm:text-[120px]
      lg:text-[180px]
      xl:text-[220px]
      font-black
      tracking-[-0.05em]
      leading-none
      text-transparent
    "
        >
          GDG RANCHI
        </span>
      </div>

      {/* Spotlight Reveal */}
      <motion.div
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          opacity,
        }}
        className="
    absolute
    flex
    items-center
    gap-5
    whitespace-nowrap
    pointer-events-none
  "
      >
        <span
          className="
      gdg-ranchi-txt
      text-[72px]
      border-white
      sm:text-[120px]
      lg:text-[180px]
      xl:text-[220px]
      font-black
      tracking-[-0.05em]
      leading-none
      bg-gradient-to-r
      from-google-blue
      via-google-red
      via-50%
      to-google-green
      bg-clip-text
      text-transparent
      drop-shadow-[0_0_25px_rgba(66,133,244,.3)]
    "
        >
          GDG RANCHI
        </span>
      </motion.div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 h-24 w-full bg-gradient-to-t from-black via-black/40 to-transparent" />
    </section>
  );
}
