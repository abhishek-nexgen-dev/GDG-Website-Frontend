import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { Logo } from "./Logo";
import { MobileDrawer } from "./MobileDrawer";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { showJoinCommunityModal } from "../utils/communityAlert";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Tracks", href: "/#tracks" },
  { label: "Speakers", href: "/#speakers" },
  { label: "Events", href: "/events" },
  { label: "Community", href: "/#community" },
  { label: "FAQs", href: "/#faq" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const activeLink = location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 sm:px-6 lg:px-8">
        <div
          className={clsx(
            "pointer-events-auto mx-auto w-full max-w-7xl transition-all duration-300 ease-out",
            scrolled ? "pt-3 sm:pt-4" : "pt-4 sm:pt-6",
          )}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="min-w-0 shrink-0">
              <Logo size="md" />
            </Link>

            {/* Desktop Capsule Nav — Centered Pill */}
            <nav
              className="hidden items-center justify-center lg:flex rounded-full border border-white/10 bg-black/60 px-2 py-1.5 backdrop-blur-xl shadow-2xl"
              aria-label="Main navigation"
            >
              <ul className="flex items-center gap-1">
                {navItems.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? activeLink === "/"
                      : activeLink.startsWith(link.href);

                  return (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className={clsx(
                          "relative block rounded-full px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap transition-all duration-200",
                          isActive
                            ? "border border-white/20 bg-white/10 text-white shadow-sm"
                            : "text-white/60 hover:text-white hover:bg-white/[0.04]",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* CTA: Yellow Button + mobile menu */}
            <div className="flex shrink-0 items-center justify-end gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={showJoinCommunityModal}
                className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[#FBBC04] hover:bg-[#f5b200] text-black font-bold px-5 py-2 text-xs sm:text-[13px] shadow-[0_0_20px_rgba(251,188,4,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Join Community</span>
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-white/25 hover:bg-white/10 lg:hidden cursor-pointer"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <MobileDrawer onClose={closeMobile} activeLink={activeLink} onNavigate={() => setMobileOpen(false)} />
      )}
    </>
  );
}

export default Nav;
