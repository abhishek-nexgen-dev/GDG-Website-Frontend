export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "/events/Gallery" },
  { label: "Team", href: "/teams" },
  { label: "About Us", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
] as const;

export const stripNavItems = [
  { label: "Home", href: "/" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "/events/Gallery" },
  { label: "Team", href: "/teams" },
  { label: "About Us", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
] as const;

export const footerExplore = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "Community", href: "#community" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
] as const;

export const footerResources = [
  { label: "About Us", href: "#about" },
  { label: "Code of Conduct", href: "#conduct" },
  { label: "FAQ", href: "#faq" },
  { label: "Privacy Policy", href: "#privacy" },
] as const;

export const socialLinks = [
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
] as const;
