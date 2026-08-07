import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { Container } from "./Layout";
import { ScrollReveal } from "./ScrollReveal";
import { socialIconMap } from "./SocialIcons";
import { footerExplore, footerResources, socialLinks } from "../data/navigation";
import clsx from "clsx";

function FooterAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border py-4 lg:border-0 lg:py-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-[14px] font-semibold text-white lg:pointer-events-none lg:mb-4"
      >
        {title}
        <ChevronDown
          className={clsx(
            "h-4 w-4 text-text-muted transition-transform lg:hidden",
            open && "rotate-180",
          )}
        />
      </button>
      <div className={clsx("mt-3 space-y-2.5 lg:mt-0", !open && "hidden lg:block")}>{children}</div>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-border bg-bg-secondary pt-16 pb-8 sm:pt-20"
    >
      {/* <div className="pointer-events-none absolute -bottom-6 left-0 overflow-hidden">
        <span className="block pl-[var(--page-gutter)] text-[110px] font-extrabold tracking-[-0.04em] text-white/[0.02] sm:text-[170px] lg:text-[220px]">
          GDG Ranchi
        </span>
      </div> */}

      <Container>
        <ScrollReveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Logo size="lg" />
              <p className="mt-5 max-w-[280px] text-[14px] leading-[1.7] text-text-muted">
                Google Developer Groups Ranchi is a community for developers to learn, connect, and
                build with Google technologies.
              </p>
              <div className="mt-6 flex gap-2.5">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-muted transition-colors hover:border-accent/30 hover:text-accent"
                    aria-label={social.label}
                  >
                    {socialIconMap[social.icon]}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="grid gap-0 sm:grid-cols-3 lg:col-span-5 lg:gap-8">
              <FooterAccordion title="Explore">
                {footerExplore.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-[14px] text-text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </FooterAccordion>

              <FooterAccordion title="Resources">
                {footerResources.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-[14px] text-text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </FooterAccordion>

              <FooterAccordion title="Contact">
                <p className="text-[14px] text-text-muted">
                  <span className="mb-1 block font-medium text-white">Location</span>
                  Ranchi, Jharkhand
                </p>
                <p className="text-[14px] text-text-muted">
                  <span className="mt-3 mb-1 block font-medium text-white">Email</span>
                  <a href="mailto:gdgranchi@gmail.com" className="hover:text-accent">
                    gdgranchi@gmail.com
                  </a>
                </p>
              </FooterAccordion>
            </div>

            <div className="lg:col-span-3">
              <h4 className="mb-2 text-[14px] font-semibold text-white">Join our community</h4>
              <p className="mb-5 text-[14px] leading-relaxed text-text-muted">
                Stay updated with the latest events and announcements.
              </p>
              <Button
                variant="primary"
                size="md"
                showArrow
                className="w-full sm:w-auto"
                href="#community"
              >
                Join Community
              </Button>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-7 sm:flex-row">
            <p className="text-[13px] text-text-muted">
              &copy; {new Date().getFullYear()} GDG Ranchi. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[13px] text-text-muted">
              <a href="#privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <span className="text-border-strong">|</span>
              <a href="#terms" className="transition-colors hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </footer>
  );
}
