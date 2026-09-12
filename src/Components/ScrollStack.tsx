import React, {
  useLayoutEffect,
  useRef,
  type ReactNode,
  isValidElement,
  cloneElement,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  topOffset?: number;
  stackOffset?: number;
}

interface ScrollStackItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
  total?: number;
  topOffset?: number;
  stackOffset?: number;
}

export const ScrollStackItem = ({
  children,
  className = "",
  index = 0,
  total = 1,
  topOffset = 100,
  stackOffset = 24,
}: ScrollStackItemProps) => {
  const isLast = index === total - 1;

  return (
    <div
      className={`scroll-stack-item w-full ${className}`}
      data-card-index={index}
      style={{
        position: "sticky",
        top: `${topOffset + index * stackOffset}px`,
        zIndex: 10 + index,
        marginBottom: isLast ? "4rem" : "32vh",
      }}
    >
      <div className="scroll-stack-card-inner transition-transform duration-300 origin-top">
        {children}
      </div>
    </div>
  );
};

const ScrollStack = ({
  children,
  className = "",
  topOffset = 100,
  stackOffset = 24,
}: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const childrenArray = React.Children.toArray(children).filter(isValidElement);
  const total = childrenArray.length;

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".scroll-stack-item", container);

      items.forEach((item, index) => {
        const inner = item.querySelector(".scroll-stack-card-inner") as HTMLElement;
        if (!inner) return;

        // If not the last card, when next card scrolls over this card, scale down slightly & dim
        if (index < items.length - 1) {
          const nextItem = items[index + 1];

          gsap.to(inner, {
            scale: 0.95,
            opacity: 0.75,
            filter: "brightness(0.65)",
            ease: "none",
            scrollTrigger: {
              trigger: nextItem,
              start: "top 80%",
              end: "top 25%",
              scrub: true,
            },
          });
        }
      });

      ScrollTrigger.refresh();
    }, container);

    return () => {
      ctx.revert();
    };
  }, [total]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{
        paddingBottom: "10vh",
      }}
    >
      {childrenArray.map((child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child as React.ReactElement<ScrollStackItemProps>, {
            index,
            total,
            topOffset,
            stackOffset,
          });
        }
        return child;
      })}
    </div>
  );
};

export default ScrollStack;
