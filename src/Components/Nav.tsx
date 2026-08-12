import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { MobileDrawer } from "./MobileDrawer";
import { navLinks } from "../data/navigation";
import clsx from "clsx";
import { Link } from "react-router";

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-[var(--page-gutter)]">
        <div
          className={clsx(
            "pointer-events-auto mx-auto w-full max-w-[var(--page-max)] transition-all duration-300 ease-out",
            scrolled ? "mt-3 sm:mt-4" : "mt-0 pt-4 sm:pt-5 lg:pt-6",
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-[1fr_auto] items-center gap-3 transition-all duration-300 ease-out lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]",
              scrolled
                ? "rounded-[17px] border-b border-white/10 bg-black/40 px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-5 sm:py-2.5"
                : "px-0 py-0 rounded-[17px]",
            )}
          >
            {/* Logo */}
            <Link to="/" className="min-w-0 justify-self-start">
              <Logo size={scrolled ? "sm" : "md"} />
            </Link>

            {/* Desktop nav — centered */}
            <nav
              className="hidden items-center justify-center lg:flex"
              aria-label="Main navigation"
            >
              <ul className="flex items-center gap-0.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={() => setActiveLink(link.href)}
                      className={clsx(
                        "relative block rounded-lg px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 xl:px-4 xl:text-[14px]",
                        activeLink === link.href
                          ? "text-white"
                          : "text-text-muted hover:text-text-secondary",
                      )}
                    >
                      {link.label}
                      {activeLink === link.href && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-accent"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA + mobile menu */}
            <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
              <Link to="/login" className="hidden lg:block">
                <Button variant="outline" size="sm" showArrow href="#community">
                  Login
                </Button>
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-white transition-colors hover:border-white/20 hover:bg-white/5 lg:hidden"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileDrawer onClose={closeMobile} activeLink={activeLink} onNavigate={setActiveLink} />
        )}
      </AnimatePresence>
    </>
  );
}

export default Nav;
