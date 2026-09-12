import React from "react";

interface MarqueeWallProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speedSeconds?: number;
  pauseOnHover?: boolean;
  className?: string;
  gapClass?: string;
}

export const MarqueeWall: React.FC<MarqueeWallProps> = ({
  children,
  direction = "left",
  speedSeconds = 35,
  pauseOnHover = true,
  className = "",
  gapClass = "gap-4 sm:gap-6",
}) => {
  const animationClass =
    direction === "right" ? "animate-marquee-right" : "animate-marquee-left";

  return (
    <div
      className={`relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${className}`}
    >
      <div
        className={`${animationClass} ${gapClass} py-2 ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        }`}
        style={
          {
            "--marquee-duration": `${speedSeconds}s`,
          } as React.CSSProperties
        }
      >
        <div className={`flex shrink-0 items-center ${gapClass}`}>{children}</div>
        <div className={`flex shrink-0 items-center ${gapClass}`} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MarqueeWall;
