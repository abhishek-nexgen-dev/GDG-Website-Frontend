import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const IntroPreloader: React.FC = () => {
  const [phase, setPhase] = useState<"text" | "fadeOut" | "rotate" | "splitOpen" | "done">("text");

  useEffect(() => {
    // Lock scroll during intro
    document.body.style.overflow = "hidden";

    // Step 1: Text reveal & hold -> Step 2: Fade out text (~1.4s)
    const t1 = setTimeout(() => {
      setPhase("fadeOut");
    }, 1400);

    // Step 2 -> Step 3: Rotate horizontal line to vertical (~1.85s)
    const t2 = setTimeout(() => {
      setPhase("rotate");
    }, 1850);

    // Step 3 -> Step 4: Clean split open without grey lines (~2.35s)
    const t3 = setTimeout(() => {
      setPhase("splitOpen");
    }, 2350);

    // Step 5: Animation complete, unmount (~3.05s)
    const t4 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 3050);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] pointer-events-none select-none flex items-center justify-center overflow-hidden"
        style={{
          fontFamily:
            "'Google Sans', 'Product Sans', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* ================= LEFT HALF CURTAIN (NO GREY BORDER) ================= */}
        <motion.div
          initial={{ x: "0%" }}
          animate={
            phase === "splitOpen"
              ? {
                  x: "-100%",
                  transition: {
                    duration: 0.75,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }
              : { x: "0%" }
          }
          style={{
            willChange: "transform",
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
          }}
          className="absolute inset-y-0 left-0 w-[50.5%] bg-[#050505] transform-gpu z-10"
        />

        {/* ================= RIGHT HALF CURTAIN (NO GREY BORDER) ================= */}
        <motion.div
          initial={{ x: "0%" }}
          animate={
            phase === "splitOpen"
              ? {
                  x: "100%",
                  transition: {
                    duration: 0.75,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }
              : { x: "0%" }
          }
          style={{
            willChange: "transform",
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
          }}
          className="absolute inset-y-0 right-0 w-[50.5%] bg-[#050505] transform-gpu z-10"
        />

        {/* ================= CENTER TYPOGRAPHY CONTAINER ================= */}
        <div className="relative z-20 flex flex-col items-center justify-center px-4 transform-gpu">
          
          {/* Top Text: "Google Developer Groups" (Slides UP with Overflow Mask) */}
          <div className="overflow-hidden pb-1 sm:pb-2">
            <motion.div
              initial={{ y: "130%", opacity: 0 }}
              animate={
                phase === "text"
                  ? { y: "0%", opacity: 1 }
                  : { y: "130%", opacity: 0 }
              }
              transition={{
                duration: 0.65,
                delay: phase === "text" ? 0.2 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
              className="text-center text-xs sm:text-sm lg:text-base font-semibold tracking-[0.28em] uppercase text-white/85 transform-gpu"
            >
              Google Developer Groups
            </motion.div>
          </div>

          {/* Central Line: Scales horizontally -> Rotates 90° -> Dissolves on Split */}
          <motion.div
            initial={{ scaleX: 0, rotate: 0 }}
            animate={
              phase === "text"
                ? { scaleX: 1, rotate: 0, width: "19rem", height: "1.5px", opacity: 1 }
                : phase === "fadeOut"
                  ? { scaleX: 1, rotate: 0, width: "19rem", height: "1.5px", opacity: 1 }
                  : phase === "rotate"
                    ? {
                        rotate: 90,
                        scaleX: 1,
                        width: "16rem",
                        height: "2px",
                        opacity: 1,
                        boxShadow: "0 0 24px rgba(66, 133, 244, 0.8)",
                      }
                    : {
                        // splitOpen phase: line smoothly dissolves as curtains open
                        rotate: 90,
                        scaleX: 1.5,
                        opacity: 0,
                      }
            }
            transition={{
              duration: phase === "text" ? 0.6 : phase === "rotate" ? 0.45 : phase === "splitOpen" ? 0.3 : 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              willChange: "transform, width, height, opacity",
              transformOrigin: "center center",
              transform: "translateZ(0)",
            }}
            className="bg-gradient-to-r from-transparent via-white to-transparent my-1 sm:my-2 rounded-full transform-gpu"
          />

          {/* Bottom Text: "Ranchi." (Slides DOWN with Overflow Mask) */}
          <div className="overflow-hidden pt-1 sm:pt-2">
            <motion.div
              initial={{ y: "-130%", opacity: 0 }}
              animate={
                phase === "text"
                  ? { y: "0%", opacity: 1 }
                  : { y: "-130%", opacity: 0 }
              }
              transition={{
                duration: 0.65,
                delay: phase === "text" ? 0.25 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
              className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white flex items-baseline justify-center transform-gpu"
            >
              <span>Ranchi</span>
              <span className="text-[#4285F4] ml-0.5 inline-block animate-pulse">.</span>
            </motion.div>
          </div>

          {/* Google 4-Color Accent Micro Dots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              phase === "text"
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.6 }
            }
            transition={{
              duration: 0.4,
              delay: phase === "text" ? 0.55 : 0,
            }}
            className="mt-5 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] shadow-[0_0_8px_rgba(66,133,244,0.8)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335] shadow-[0_0_8px_rgba(234,67,53,0.8)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC04] shadow-[0_0_8px_rgba(251,188,4,0.8)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] shadow-[0_0_8px_rgba(52,168,83,0.8)]" />
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default IntroPreloader;
