import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

export function BackgroundWatermark() {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  // Radius animation
  const radius = useMotionValue(0);

  // Opacity animation
  const opacity = useMotionValue(0);

  // Slower, smoother spring
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
          rgba(255,255,255,.75) 55%,
          rgba(255,255,255,.35) 72%,
          transparent 100%
      )
  `;

  return (
    <section
      className="relative flex h-[260px] items-center justify-center overflow-hidden select-none"
      onMouseEnter={() => {
        animate(radius, 220, {
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
      {/* Outline */}
      <span
        className="
          gdg-ranchi-txt
          absolute
          whitespace-nowrap
          text-[90px]
          sm:text-[140px]
          lg:text-[200px]
          font-black
          tracking-[-0.05em]
          leading-none
          text-transparent
          pointer-events-none
          antialiased

        "
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,.09)",
          fontKerning: "normal",
          textRendering: "geometricPrecision",
        }}
      >
        GDG RANCHI
      </span>

      {/* Reveal */}
      <motion.span
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          opacity,
          fontKerning: "normal",
          textRendering: "geometricPrecision",
        }}
        className="
          gdg-ranchi-txt
          absolute
          whitespace-nowrap
          text-[90px]
          sm:text-[140px]
          lg:text-[200px]
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
          pointer-events-none
          antialiased
          drop-shadow-[0_0_20px_rgba(66,133,244,.18)]
        "
      >
        GDG RANCHI
      </motion.span>
    </section>
  );
}