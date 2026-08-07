import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  variant?: "fade-up" | "split-text" | "perspective-card";
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 40,
  duration = 0.85,
  variant = "fade-up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (variant === "split-text") {
      const words = el.querySelectorAll(".reveal-word");
      gsap.set(words, { y: "105%", rotate: 2 });
      const tween = gsap.to(words, {
        y: "0%",
        rotate: 0,
        duration: 1.1,
        stagger: 0.04,
        ease: "power4.out",
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none none",
          once: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }

    if (variant === "perspective-card") {
      gsap.set(el, {
        opacity: 0,
        y: 80,
        rotationX: 14,
        transformPerspective: 1200,
        transformOrigin: "top center",
      });
      const tween = gsap.to(el, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.25,
        ease: "power4.out",
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
        onComplete: () => {
          gsap.set(el, { clearProps: "transform,rotationX,transformPerspective,transformOrigin" });
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }

    // Default: fade-up
    gsap.set(el, { opacity: 0, y });
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      clearProps: "transform",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true,
      },
      onComplete: () => el.classList.add("is-visible"),
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y, duration, variant]);

  if (variant === "split-text" && typeof children === "string") {
    const words = children.split(" ");
    return (
      <div ref={ref} className={clsx("flex flex-wrap overflow-hidden py-1.5", className)}>
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden mr-[0.22em] leading-none">
            <span className="inline-block reveal-word" style={{ display: "inline-block" }}>
              {word}
            </span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} data-reveal className={clsx(className)}>
      {children}
    </div>
  );
}

interface ScrollRevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  variant?: "fade-up" | "perspective-card";
}

export function ScrollRevealGroup({
  children,
  className,
  stagger = 0.1,
  variant = "fade-up",
}: ScrollRevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = gsap.utils.toArray<HTMLElement>(el.children);

    if (variant === "perspective-card") {
      gsap.set(items, {
        opacity: 0,
        y: 80,
        rotationX: 14,
        transformPerspective: 1200,
        transformOrigin: "top center",
      });
      const tween = gsap.to(items, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.25,
        stagger,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true,
        },
        onComplete: () => {
          gsap.set(items, {
            clearProps: "transform,rotationX,transformPerspective,transformOrigin",
          });
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }

    // Default: fade-up
    gsap.set(items, { opacity: 0, y: 36 });
    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger,
      ease: "power3.out",
      clearProps: "transform",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [stagger, variant]);

  return (
    <div ref={ref} className={clsx(className)}>
      {children}
    </div>
  );
}
