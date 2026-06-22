"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ArrowUpRight } from "lucide-react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

// Inline SVG social icons (lucide-react v1 dropped Twitter/LinkedIn/GitHub)
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L2.064 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

// ── Footer link columns ──
const footerLinks = [
  {
    heading: "Platform",
    links: [
      { label: "Overview", href: "/platform" },
      { label: "Threat Detection", href: "/platform#detection" },
      { label: "AI Engine", href: "/platform#ai" },
      { label: "Integrations", href: "/platform#integrations" },
      { label: "Security Ops Center", href: "/platform#soc" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Enterprise", href: "/solutions#enterprise" },
      { label: "Cloud Security", href: "/solutions#cloud" },
      { label: "OT/IoT", href: "/solutions#iot" },
      { label: "Zero Trust", href: "/solutions#zero-trust" },
      { label: "Compliance", href: "/solutions#compliance" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal#privacy" },
      { label: "Terms of Service", href: "/legal#terms" },
      { label: "Cookie Policy", href: "/legal#cookies" },
      { label: "Security", href: "/legal#security" },
      { label: "Compliance", href: "/legal#compliance" },
    ],
  },
];

const socialLinks = [
  {
    label: "X (Twitter)",
    href: "https://twitter.com",
    Icon: XIcon,
    id: "footer-twitter",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    Icon: LinkedInIcon,
    id: "footer-linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    Icon: GitHubIcon,
    id: "footer-github",
  },
];

// ── Animated logo for footer ──
function FooterLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-7 h-7">
        <div className="w-full h-full rounded-sm border border-[#00ff85]/40 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00ff85]" />
        </div>
      </div>
      <span
        className="text-xl font-bold tracking-[0.12em] text-white"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        AINA
      </span>
    </div>
  );
}

// ── Column component ──
function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-[#64748b] mb-4">
        {heading}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              id={`footer-${heading.toLowerCase()}-${link.label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
              className={cn(
                "text-sm text-[#94a3b8] hover:text-white",
                "inline-flex items-center gap-1 group/link transition-colors duration-200"
              )}
            >
              {link.label}
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 group-hover/link:translate-y-0 transition-all duration-200" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Main Footer ──
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-[#0f2942] bg-[#020817]"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff85]/30 to-transparent" />

      {/* Main grid */}
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1 space-y-6">
            <FooterLogo />
            <p className="text-sm text-[#64748b] leading-relaxed max-w-xs">
              AI-native security intelligence that detects, analyzes, and responds to
              threats before they become breaches.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  id={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center",
                    "border border-[#0f2942] text-[#64748b]",
                    "hover:border-[#00ff85]/30 hover:text-[#00ff85] hover:bg-[#00ff85]/5",
                    "transition-all duration-200"
                  )}
                >
                  <social.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Security badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#0f2942] bg-[#0a1628]">
              <Shield className="w-3.5 h-3.5 text-[#00ff85]" />
              <span className="text-xs text-[#64748b]">SOC 2 Type II Certified</span>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerLinks.map((col) => (
              <FooterColumn key={col.heading} heading={col.heading} links={col.links} />
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-[#0f2942]">
        <Container className="py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-[#64748b] text-center sm:text-left">
              © {currentYear} AINA Technologies, Inc. All rights reserved.
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <motion.span
                className="w-2 h-2 rounded-full bg-[#00ff85]"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <a
                id="footer-status"
                href="https://status.aina.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#64748b] hover:text-[#00ff85] transition-colors"
              >
                All systems operational
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
