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
      className="relative flex h-[320px] items-center justify-center overflow-hidden select-none z-50 bg-transparent"
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

      {/* Outline */}
      <div
        className="
    absolute inset-0
    flex
    items-center justify-center
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
    absolute inset-0
    flex
    items-center justify-center
    gap-5
    whitespace-nowrap
    pointer-events-none
    bg-transparent
  "
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
      text-[#4285F4]
      drop-shadow-[0_0_25px_rgba(66,133,244,.3)]
    "
        >
          GDG RANCHI
        </span>
      </motion.div>
    </section>
  );
}
