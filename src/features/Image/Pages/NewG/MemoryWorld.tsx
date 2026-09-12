import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import type { ExperimentalImage } from "../../data/newGalleryData";

type FloatingMemoryProps = {
  image: ExperimentalImage;
  index: number;
  total: number;
  cameraZ: MotionValue<number>;
  onImageClick: (img: ExperimentalImage) => void;
  viewportWidth: number;
  viewportHeight: number;
};

const FloatingMemory = ({ 
  image, 
  index, 
  
  cameraZ, 
  onImageClick,
  viewportWidth,
  viewportHeight
}: FloatingMemoryProps) => {
  
  // Z position: evenly spaced from -1000 to -24000
  const absoluteZ = -1000 - (index * 800);
  
  // X and Y positions (spread around the center)
  // We want to avoid everything being dead center, but some can be.
  
  
  // X from -40vw to +40vw
  // We use a deterministic pseudo-random spread
  const spreadX = ((index * 29) % 80) - 40; // -40 to 40
  const startX = (spreadX / 100) * viewportWidth;
  
  // Y from -35vh to +35vh
  const spreadY = ((index * 17) % 70) - 35; // -35 to 35
  const startY = (spreadY / 100) * viewportHeight;

  // Vary sizes
  const sizeClass = ["w-[45vw] md:w-[35vw]", "w-[30vw] md:w-[20vw]", "w-[50vw] md:w-[40vw]"][index % 3];
  const aspectClass = ["aspect-[4/3]", "aspect-[3/4]", "aspect-square"][index % 3];
  const rotate = ((index * 7) % 20) - 10; // -10 to +10 degrees

  // Dynamic Opacity & Blur based on distance to camera
  // cameraZ goes from 0 to 25000 (moving positively)
  // The photo's position relative to camera is: absoluteZ + cameraZ
  // If absoluteZ + cameraZ < 0, it's in front of us (far away).
  // If absoluteZ + cameraZ == 0, it's exactly at the camera.
  // If absoluteZ + cameraZ > 0, it's behind the camera (passed us).
  
  const distanceToCamera = useTransform(cameraZ, (cz) => absoluteZ + cz);
  
  const opacity = useTransform(distanceToCamera, (d) => {
    // d is negative when far away.
    // Fade in when it's within 3000px
    if (d < -3000) return 0;
    if (d < -2000) return 1 - ((-2000 - d) / 1000); // 0 to 1
    // Fade out very sharply when it passes the camera (d > 0)
    // Actually, CSS perspective naturally clips it when it passes Z=0 or Z > perspective
    // But we'll fade it out as it gets super close to avoid jarring clipping
    if (d > -200 && d < 200) return 1 - ((d + 200) / 400); 
    if (d >= 200) return 0;
    return 1;
  });

  const filter = useTransform(distanceToCamera, (d) => {
    // Blur when far away
    if (d < -2000) {
      const blurAmount = Math.min(10, Math.abs(d + 2000) / 200);
      return `blur(${blurAmount}px)`;
    }
    return "blur(0px)";
  });

  return (
    <motion.div 
      style={{ 
        x: startX, 
        y: startY, 
        z: absoluteZ, // Native CSS 3D Z position
        rotate, 
        opacity,
        filter,
        // center the origin so X/Y is properly centered in the viewport
        translateX: "-50%",
        translateY: "-50%"
      }}
      className={`absolute top-1/2 left-1/2 ${sizeClass} ${aspectClass} [transform-style:preserve-3d] cursor-pointer group`}
      onClick={() => onImageClick(image)}
    >
      <div className="relative w-full h-full rounded-md md:rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
        <img 
          src={image.src} 
          alt={image.alt || "GDG Ranchi Memory"}
          className="w-full h-full object-cover brightness-[0.8] group-hover:brightness-110 transition-all duration-700"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export const MemoryWorld = ({ 
  images,
  onImageClick 
}: { 
  images: ExperimentalImage[];
  onImageClick: (img: ExperimentalImage) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [viewport, setViewport] = useState({ w: 1000, h: 800 });

  useEffect(() => {
    const updateV = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    updateV();
    window.addEventListener("resize", updateV);
    
    // Scroll to the bottom on mount so the user can scroll UP to experience the journey
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);

    return () => window.removeEventListener("resize", updateV);
  }, []);

  // Map everything in reverse:
  // 1 = bottom of the page (start of journey)
  // 0 = top of the page (end of journey)
  
  // Title fades out as you start moving forward (scrolling up from 1 to 0.95)
  const titleOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);
  const titleZ = useTransform(scrollYProgress, [0.95, 1], [500, 0]); // Flies slightly towards you

  // Max Z depth of the journey
  const TOTAL_DEPTH = 28000;
  
  // The camera moves forward by translating the world towards the screen (positive Z)
  const cameraZ = useTransform(scrollYProgress, [0, 1], [TOTAL_DEPTH, 0]);

  // Final logo configuration
  const logoZ = - (TOTAL_DEPTH + 1000); // So at max scroll, it's 1000px away
  const logoDistance = useTransform(cameraZ, (cz) => logoZ + cz);
  
  const logoOpacity = useTransform(logoDistance, (d) => {
    // Start appearing when 4000px away
    if (d < -4000) return 0;
    if (d < -1000) return 1 - ((-1000 - d) / 3000); // fade in to 1
    return 1;
  });

  const logoFilter = useTransform(logoDistance, (d) => {
    if (d < -1000) {
      const blurAmount = Math.min(20, Math.abs(d + 1000) / 100);
      return `blur(${blurAmount}px)`;
    }
    return "blur(0px)";
  });

  return (
    <section ref={containerRef} style={{ height: "1500vh" }} className="relative w-full bg-[#000000]">
      {/* 
        The Scene:
        perspective: 1000px creates the 3D lens.
        overflow-hidden hides anything outside the 2D window bounds.
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#000000] perspective-[1000px]">
        
        {/* INITIAL TITLE (Static in the world, so we don't apply cameraZ, just manually fade/move it) */}
        <motion.div 
          style={{ opacity: titleOpacity, z: titleZ }}
          className="absolute top-[15%] left-[5%] md:left-[10%] max-w-xl z-20 pointer-events-none"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4">Memories</h1>
          <p className="text-zinc-400 text-sm md:text-base lg:text-lg max-w-sm">
            Moments from GDG Ranchi events and community.
          </p>
        </motion.div>

        {/* INITIAL SCROLL INDICATOR */}
        <motion.div 
          style={{ opacity: titleOpacity }}
          className="absolute bottom-12 left-[5%] md:left-[10%] flex flex-col items-center gap-3 text-zinc-500 font-mono text-[10px] tracking-widest uppercase pointer-events-none"
        >
          <span>Scroll Up</span>
          <div className="w-[1px] h-8 bg-zinc-700" />
        </motion.div>

        {/* 
          The 3D World:
          transform-style: preserve-3d ensures children are rendered in 3D space.
          We push the world towards the camera (positive Z) based on scroll.
        */}
        <motion.div 
          style={{ 
            z: cameraZ,
            transformStyle: "preserve-3d" 
          }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Images with pointer-events-auto so they can be clicked */}
          <div className="absolute inset-0 pointer-events-auto [transform-style:preserve-3d]">
            {images.map((img, index) => (
              <FloatingMemory 
                key={`${img.id}-${index}`} 
                image={img} 
                index={index} 
                total={images.length} 
                cameraZ={cameraZ} 
                onImageClick={onImageClick}
                viewportWidth={viewport.w}
                viewportHeight={viewport.h}
              />
            ))}
          </div>

          {/* FINAL EVENT BRANDING REVEAL (Anchored deep in the 3D world) */}
          <motion.div 
            style={{ 
              z: logoZ,
              opacity: logoOpacity,
              filter: logoFilter,
              translateX: "-50%",
              translateY: "-50%"
            }}
            className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center pointer-events-none [transform-style:preserve-3d]"
          >
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white text-center leading-none">
              GDG RANCHI <br/>
              <span className="text-zinc-500">MEMORIES</span>
            </h2>
            
            <div className="mt-16 flex gap-6 pointer-events-auto">
              {['X', 'Instagram', 'LinkedIn', 'YouTube', 'GitHub', 'Discord'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs text-white/70 hover:text-white hover:border-white/50 transition-colors">
                  <div className="w-3 h-3 bg-current rounded-sm" />
                </a>
              ))}
            </div>

            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-zinc-500 text-xs tracking-wider uppercase font-mono pointer-events-auto">
              <a href="#" className="hover:text-white transition-colors">Code of Conduct</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Lite Version</a>
            </div>
            
            <p className="mt-8 text-[10px] text-zinc-700 font-mono tracking-widest text-center">
              A community of builders, learners and changemakers.
            </p>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};
