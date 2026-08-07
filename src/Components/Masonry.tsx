import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof window === "undefined") return defaultValue;
    return values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
  };

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () => queries.forEach((q) => matchMedia(q).removeEventListener("change", handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

interface ImageDimensions {
  width: number;
  height: number;
}

// Preload images and dynamically capture their natural intrinsic dimensions
const preloadImagesWithDimensions = async (
  urls: string[],
): Promise<Record<string, ImageDimensions>> => {
  const dimensionsMap: Record<string, ImageDimensions> = {};

  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            dimensionsMap[src] = {
              width: img.naturalWidth || 800,
              height: img.naturalHeight || 1000,
            };
            resolve();
          };
          img.onerror = () => {
            dimensionsMap[src] = { width: 800, height: 1000 };
            resolve();
          };
        }),
    ),
  );

  return dimensionsMap;
};

interface Item {
  id: string;
  img: string;
  url: string;
  title?: string;
  category?: string;
  height?: number;
  width?: number;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  showOverlay?: boolean;
  showTitle?: boolean;
  showCategory?: boolean;
  enableGrayscale?: boolean;
  enableHoverZoom?: boolean;
  enableHoverShadow?: boolean;
  openInNewTab?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = "power3.out",
  duration = 0.8,
  stagger = 0.08,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 1.06,
  blurToFocus = true,
  colorShiftOnHover = false,
  showOverlay = true,

  enableGrayscale = true,
  enableHoverZoom = true,
  enableHoverShadow = true,
  openInNewTab = true,
}) => {
  const columns = useMedia(
    ["(min-width: 1536px)", "(min-width: 1280px)", "(min-width: 1024px)", "(min-width: 640px)"],
    [5, 4, 3, 2],
    1,
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [dimensions, setDimensions] = useState<Record<string, ImageDimensions>>({});
  const [imagesReady, setImagesReady] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const hasMounted = useRef(false);

  // Dynamically load images and automatically infer aspect ratio
  useEffect(() => {
    setImagesReady(false);
    preloadImagesWithDimensions(items.map((i) => i.img)).then((dims) => {
      setDimensions(dims);
      setImagesReady(true);
    });
  }, [items]);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === "random") {
      const dirs = ["top", "bottom", "left", "right"];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  const { grid, totalHeight } = useMemo(() => {
    if (!width || width <= 0) return { grid: [], totalHeight: 0 };

    const colHeights = new Array(columns).fill(0);
    const gap = 20;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = Math.max(0, (width - totalGaps) / columns);

    const computedGrid: GridItem[] = items.map((child) => {
      // Image original size
      const imgDim = dimensions[child.img];

      const naturalWidth = imgDim?.width || child.width || 800;
      const naturalHeight = imgDim?.height || child.height || 1000;

      // Scale image so it fits inside the column
      const scale = Math.min(columnWidth / naturalWidth, 1);

      const finalWidth = naturalWidth * scale;
      const finalHeight = naturalHeight * scale;

      // Find the shortest column
      const col = colHeights.indexOf(Math.min(...colHeights));

      // Center image inside its column
      const x = col * (columnWidth + gap) + (columnWidth - finalWidth) / 2;

      const y = colHeights[col];

      colHeights[col] += finalHeight + gap;

      return {
        ...child,
        x,
        y,
        w: finalWidth,
        h: finalHeight,
      };
    });

    const calculatedTotalHeight = Math.max(...colHeights, 0);

    return { grid: computedGrid, totalHeight: calculatedTotalHeight };
  }, [columns, items, width, dimensions]);

  useLayoutEffect(() => {
    if (!imagesReady || grid.length === 0) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            scale: 0.9,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(12px)" }),
          },
          {
            opacity: 1,
            scale: 1,
            ...animProps,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration,
            ease,
            delay: index * stagger,
            force3D: true,
          },
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: "auto",
          force3D: true,
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (element: HTMLElement) => {
    const img = element.querySelector("img");
    const overlay = element.querySelector(".card-overlay");
    const colorOverlay = element.querySelector(".color-overlay");
    const text = element.querySelector(".card-text");

    if (scaleOnHover && enableHoverZoom && img) {
      gsap.to(img, {
        scale: hoverScale,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (enableGrayscale && img) {
      gsap.to(img, {
        filter: "grayscale(0%)",
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover && colorOverlay) {
      gsap.to(colorOverlay, { opacity: 0.3, duration: 0.3 });
    }

    if (showOverlay && overlay) {
      gsap.to(overlay, { opacity: 0.4, duration: 0.3 });
    }

    if (text) {
      gsap.to(text, { y: -4, opacity: 1, duration: 0.3 });
    }
  };

  const handleMouseLeave = (element: HTMLElement) => {
    const img = element.querySelector("img");
    const overlay = element.querySelector(".card-overlay");
    const colorOverlay = element.querySelector(".color-overlay");
    const text = element.querySelector(".card-text");

    if (scaleOnHover && enableHoverZoom && img) {
      gsap.to(img, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (enableGrayscale && img) {
      gsap.to(img, {
        filter: "grayscale(100%)",
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover && colorOverlay) {
      gsap.to(colorOverlay, { opacity: 0, duration: 0.3 });
    }

    if (showOverlay && overlay) {
      gsap.to(overlay, { opacity: 0.8, duration: 0.3 });
    }

    if (text) {
      gsap.to(text, { y: 0, opacity: 0.9, duration: 0.3 });
    }
  };

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleClick = (url: string) => {
    if (!url) return;
    if (openInNewTab) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: totalHeight > 0 ? `${totalHeight}px` : "auto" }}
    >
      {grid.map((item) => {
        const isLoaded = loadedImages[item.id];

        return (
          <div
            key={item.id}
            data-key={item.id}
            className={`absolute left-0 top-0 cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-xl transition-all duration-300 ${
              enableHoverShadow ? "hover:border-white/20 hover:shadow-2xl" : ""
            }`}
            style={{
              willChange: "transform, width, height, opacity",
              transform: `translate3d(${item.x}px, ${item.y}px, 0px)`,
            }}
            onClick={() => handleClick(item.url)}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            {/* Gray Skeleton */}
            {!isLoaded && <div className="absolute inset-0 z-10 animate-pulse bg-neutral-800" />}

            {/* Natural Aspect-Ratio Matched Image */}
            <img
              src={item.img}
              alt={item.title || "GDG Ranchi Gallery Image"}
              loading="lazy"
              decoding="async"

              onLoad={() => handleImageLoad(item.id)}
              className={`h-full w-full object-cover transition-opacity duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{
                filter: enableGrayscale ? "grayscale(100%)" : "none",
                willChange: "transform, filter",
              }}
            />

            {/* Gradient Overlay */}
            {showOverlay && (
              <div
                className="card-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300"
                style={{ opacity: 0.8 }}
              />
            )}

            {/* Optional Color Shift Overlay */}
            {colorShiftOnHover && (
              <div className="color-overlay pointer-events-none absolute inset-0 bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 transition-opacity duration-300" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;
