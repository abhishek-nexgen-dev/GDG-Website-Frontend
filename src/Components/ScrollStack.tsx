import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  gap?: number;
  topOffset?: number;
}

interface ScrollStackItemProps {
  children: ReactNode;
  className?: string;
}

export const ScrollStackItem = ({ children, className = "" }: ScrollStackItemProps) => {
  return <div className={`scroll-stack-item mt-[6vh]  w-full ${className}`}>{children}</div>;
};

const ScrollStack = ({ children, className = "" }: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".scroll-stack-item", container);

      cards.forEach((card, index) => {
        // Each next card stays above previous card
        gsap.set(card, {
          zIndex: index + 1,
          transformOrigin: "center top",
        });

        // First card doesn't need entry animation
        if (index === 0) return;

        const cardContent = card.firstElementChild as HTMLElement;

        if (!cardContent) return;

        // Card enters smoothly from bottom
        gsap.fromTo(
          cardContent,
          {
            y: 120,
            opacity: 0.7,
          },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 35%",
              scrub: 1,
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        paddingBottom: "30vh",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollStack;
