"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Shield, Zap, Globe, BookOpen, LayoutDashboard, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

// ── Navigation structure ──
const navLinks = [
  {
    label: "Platform",
    href: "/platform",
    icon: Shield,
  },
  {
    label: "Solutions",
    href: "/solutions",
    icon: Zap,
    children: [
      { label: "Enterprise Security", href: "/solutions#enterprise", description: "End-to-end threat protection for large organizations" },
      { label: "Cloud Native", href: "/solutions#cloud", description: "Intelligent security for cloud-first environments" },
      { label: "OT/IoT Security", href: "/solutions#iot", description: "Protect operational technology and connected devices" },
      { label: "Zero Trust", href: "/solutions#zero-trust", description: "Identity-centric, continuous verification architecture" },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
    icon: Globe,
  },
  {
    label: "About",
    href: "/about",
    icon: Globe,
  },
  {
    label: "Blog",
    href: "/blog",
    icon: BookOpen,
  },
];

// ── Logo ──
function AinaLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label="AINA Home">
      {/* Animated icon mark */}
      <div className="relative w-8 h-8">
        <motion.div
          className="absolute inset-0 rounded-sm bg-[#00ff85] opacity-20 group-hover:opacity-40 transition-opacity"
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div className="relative w-full h-full rounded-sm border border-[#00ff85]/40 flex items-center justify-center">
          <motion.div
            className="w-2 h-2 rounded-full bg-[#00ff85]"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Wordmark */}
      <span
        className="text-[1.35rem] font-bold tracking-[0.12em] text-white group-hover:text-[#00ff85] transition-colors duration-300"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        AINA
      </span>
    </Link>
  );
}

// ── Desktop nav link ──
interface NavLinkProps {
  label: string;
  href: string;
  isActive: boolean;
  children?: { label: string; href: string; description: string }[];
}

function DesktopNavLink({ label, href, isActive, children }: NavLinkProps) {
  const [open, setOpen] = useState(false);

  if (children) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          className={cn(
            "flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-md transition-all duration-200",
            "text-[#94a3b8] hover:text-white",
            isActive && "text-white"
          )}
          id={`nav-${label.toLowerCase()}`}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {label}
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-2 w-72 glass rounded-xl border border-[#0f2942] shadow-2xl shadow-black/50 p-2 z-50"
            >
              {children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-3 rounded-lg hover:bg-[#0f2942] transition-colors group/item"
                >
                  <div className="text-sm font-medium text-white group-hover/item:text-[#00ff85] transition-colors">
                    {child.label}
                  </div>
                  <div className="text-xs text-[#64748b] mt-0.5 leading-relaxed">
                    {child.description}
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      href={href}
      id={`nav-${label.toLowerCase()}`}
      className={cn(
        "relative text-sm font-medium px-3 py-2 rounded-md transition-all duration-200",
        "text-[#94a3b8] hover:text-white",
        isActive && "text-white"
      )}
    >
      {label}
      {/* Active underline */}
      <motion.span
        className="absolute bottom-0 left-3 right-3 h-px bg-[#00ff85]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
}

// ── Mobile nav item ──
function MobileNavItem({
  label,
  href,
  children,
  onClose,
}: NavLinkProps & { onClose: () => void }) {
  const [expanded, setExpanded] = useState(false);

  if (children) {
    return (
      <div>
        <button
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[#94a3b8] hover:text-white transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          {label}
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              expanded && "rotate-180"
            )}
          />
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pl-4 pb-2 space-y-1">
                {children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    className="block px-4 py-2 text-sm text-[#64748b] hover:text-[#00ff85] rounded-lg hover:bg-[#0f2942] transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClose}
      className="block px-4 py-3 text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-[#0f2942] rounded-lg transition-colors"
    >
      {label}
    </Link>
  );
}

// ── Main Navbar ──
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass border-b border-[#0f2942] shadow-lg shadow-black/30"
            : "bg-transparent"
        )}
        role="banner"
      >
        <Container>
          <nav
            className="flex items-center justify-between h-[72px]"
            aria-label="Primary navigation"
          >
            {/* Logo */}
            <AinaLogo />

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1" role="menubar">
              {navLinks.map((link) => (
                <DesktopNavLink
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  isActive={
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href)
                  }
                  children={link.children}
                />
              ))}
            </div>

            {/* Dashboard link — desktop only */}
            <Link
              href="/dashboard"
              id="nav-dashboard-link"
              className={cn(
                "hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-md transition-all duration-200",
                pathname.startsWith("/dashboard")
                  ? "text-[#f97316]"
                  : "text-[#f97316]/70 hover:text-[#f97316]"
              )}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </Link>

            {/* Upload APK CTA — desktop only */}
            <Link
              href="/upload"
              id="nav-upload-link"
              className={cn(
                "hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 border",
                pathname.startsWith("/upload")
                  ? "bg-[#f97316] text-white border-[#f97316] shadow-[0_0_16px_rgba(249,115,22,0.35)]"
                  : "bg-[#f97316]/10 text-[#f97316] border-[#f97316]/30 hover:bg-[#f97316]/20"
              )}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              Upload APK
            </Link>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              {/* Contact link — desktop only */}
              <Link
                href="/contact"
                id="nav-contact-link"
                className="hidden lg:block text-sm font-medium text-[#94a3b8] hover:text-white transition-colors px-3 py-2"
              >
                Contact
              </Link>

              {/* Primary CTA */}
              <Link
                href="/platform"
                id="nav-get-started"
                className={cn(
                  "hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold",
                  "bg-[#00ff85] text-[#020817] hover:bg-[#00ff85]/90",
                  "glow-green-sm hover:glow-green",
                  "transition-all duration-300 transform hover:-translate-y-0.5"
                )}
              >
                Get Started
              </Link>

              {/* Mobile hamburger */}
              <button
                id="nav-mobile-toggle"
                className="lg:hidden p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#0f2942] transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] glass border-l border-[#0f2942] flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#0f2942]">
                <AinaLogo />
                <button
                  className="p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#0f2942] transition-colors"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
                {navLinks.map((link) => (
                  <MobileNavItem
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    isActive={
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href)
                    }
                    children={link.children}
                    onClose={() => setMobileOpen(false)}
                  />
                ))}
                <MobileNavItem
                  label="Careers"
                  href="/careers"
                  isActive={pathname.startsWith("/careers")}
                  onClose={() => setMobileOpen(false)}
                />
                <MobileNavItem
                  label="Contact"
                  href="/contact"
                  isActive={pathname.startsWith("/contact")}
                  onClose={() => setMobileOpen(false)}
                />
                <Link
                  href="/dashboard"
                  id="mobile-nav-dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#f97316] hover:bg-[#f97316]/5 rounded-lg transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  href="/upload"
                  id="mobile-nav-upload"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-[#f97316] bg-[#f97316]/5 border border-[#f97316]/20 rounded-lg transition-colors hover:bg-[#f97316]/10 mx-2"
                >
                  <UploadCloud className="w-4 h-4" />
                  Upload APK
                </Link>
              </nav>

              {/* Drawer CTA */}
              <div className="p-6 border-t border-[#0f2942]">
                <Link
                  href="/platform"
                  id="mobile-nav-cta"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center py-3 px-6 rounded-lg bg-[#00ff85] text-[#020817] font-semibold text-sm glow-green-sm hover:glow-green transition-all duration-300"
                >
                  Get Started
                </Link>
                <Link
                  href="/contact"
                  id="mobile-nav-demo"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 block w-full text-center py-3 px-6 rounded-lg border border-[#0f2942] text-[#94a3b8] hover:text-white hover:border-[#00ff85]/30 font-medium text-sm transition-all duration-300"
                >
                  Request Demo
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
