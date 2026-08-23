import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import clsx from "clsx";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", showArrow = false, className, children, href, ...props },
    ref,
  ) => {
    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-accent text-[#0a0a0a] font-semibold border border-accent hover:shadow-glow hover:brightness-110 transition-all duration-300",
      outline:
        "bg-transparent text-white border border-border-strong hover:border-white/25 hover:bg-white/[0.03] transition-all duration-300",
      ghost: "bg-transparent text-accent hover:text-white transition-all duration-300",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "px-5 py-2.5 text-[13px] gap-1.5",
      md: "px-7 py-3 text-sm gap-2",
      lg: "px-8 py-3.5 text-[15px] gap-2",
    };

    const sharedClasses = clsx(
      "inline-flex items-center justify-center rounded-full font-medium cursor-pointer",
      variants[variant],
      sizes[size],
      className,
    );

    if (href) {
      return (
        <motion.a
          ref={ref as any}
          href={href}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className={sharedClasses}
          {...(props as any)}
        >
          {children}
          {showArrow && <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={2} />}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={sharedClasses}
        {...(props as any)}
      >
        {children}
        {showArrow && <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={2} />}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
