import logoSrc from "../assets/favicon.svg";
import clsx from "clsx";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const iconSizes = {
  sm: 26,
  md: 32,
  lg: 38,
} as const;

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const icon = iconSizes[size];

  return (
    <span
      className={clsx("inline-flex min-w-0 items-center gap-2 sm:gap-2.5", className)}
      aria-label="GDG Ranchi — Home"
    >
      <img
        src={logoSrc}
        alt=""
        width={icon}
        height={icon}
        className="shrink-0 object-contain"
        decoding="async"
        fetchPriority="high"
      />
      {showText && (
        <div className="flex flex-col leading-tight min-w-0">
          <span className="text-xs sm:text-[13px] font-semibold text-white tracking-tight leading-none">
            Google Developer Groups
          </span>
          <span className="text-[11px] sm:text-xs text-white/60 font-medium tracking-tight mt-0.5">
            Ranchi
          </span>
        </div>
      )}
    </span>
  );
}
