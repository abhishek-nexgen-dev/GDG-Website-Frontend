import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { navLinks } from "../data/navigation";
import clsx from "clsx";
import { Link } from "react-router-dom";

interface MobileDrawerProps {
  onClose: () => void;
  activeLink: string;
  onNavigate: (href: string) => void;
}

export function MobileDrawer({ onClose, activeLink, onNavigate }: MobileDrawerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close menu"
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 320 }}
        className="absolute top-0 right-0 flex h-full w-full max-w-[min(100%,320px)] flex-col bg-bg-secondary p-5 sm:max-w-sm sm:p-6"
      >
        <div className="mb-6 flex items-center justify-between gap-3">
          <Logo size="sm" />
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-white transition-colors hover:bg-white/5"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={link.href}
                onClick={() => {
                  onNavigate(link.href);
                  onClose();
                }}
                className={clsx(
                  "block rounded-xl px-4 py-3.5 text-[16px] font-medium transition-colors",
                  activeLink === link.href
                    ? "bg-white/5 text-white"
                    : "text-text-secondary hover:bg-bg-tertiary hover:text-white",
                )}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <Link
          to="/login"
          onClick={onClose}
          className="mt-4 w-full rounded-xl bg-white/5 px-4 py-3.5 text-center text-[16px] font-medium text-white transition-colors hover:bg-white/10"
        >
          Login
        </Link>
      </motion.div>
    </motion.div>
  );
}