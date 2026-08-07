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

const textSizes = {
  sm: "text-[13px]",
  md: "text-[14px] sm:text-[15px]",
  lg: "text-base sm:text-lg",
} as const;

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const icon = iconSizes[size];

  return (
    <a
      href="#home"
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
        <span className={clsx("truncate font-semibold tracking-tight text-white", textSizes[size])}>
          GDG <span className="font-normal text-text-secondary">Ranchi</span>
        </span>
      )}
    </a>
  );
}
