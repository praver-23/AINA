import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FileText, Shield, Cookie, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "AINA legal documents — Privacy Policy, Terms of Service, Cookie Policy, and Security disclosures.",
};

const sections = [
  {
    id: "privacy",
    icon: Lock,
    title: "Privacy Policy",
    lastUpdated: "January 15, 2026",
    content: [
      {
        heading: "Information We Collect",
        body: "We collect information you provide directly to us — such as your name, email address, company, and any messages you send. We also collect usage data, log files, and device information when you use our platform.",
      },
      {
        heading: "How We Use Your Information",
        body: "We use the information we collect to operate and improve our services, communicate with you, send security alerts and product updates, and comply with legal obligations.",
      },
      {
        heading: "Data Retention",
        body: "We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time by contacting privacy@aina.ai.",
      },
    ],
  },
  {
    id: "terms",
    icon: FileText,
    title: "Terms of Service",
    lastUpdated: "January 15, 2026",
    content: [
      {
        heading: "Acceptance of Terms",
        body: "By accessing or using AINA's services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you may not use our services.",
      },
      {
        heading: "Permitted Use",
        body: "You may use AINA's services only for lawful purposes and in accordance with these Terms. You may not use the services to violate any applicable laws or regulations.",
      },
      {
        heading: "Limitation of Liability",
        body: "To the fullest extent permitted by law, AINA shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the services.",
      },
    ],
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookie Policy",
    lastUpdated: "January 15, 2026",
    content: [
      {
        heading: "What Are Cookies",
        body: "Cookies are small text files stored on your device that help us recognize you, remember your preferences, and understand how you use our platform.",
      },
      {
        heading: "Types of Cookies We Use",
        body: "We use essential cookies (required for the platform to function), analytics cookies (to understand usage patterns), and preference cookies (to remember your settings).",
      },
    ],
  },
  {
    id: "security",
    icon: Shield,
    title: "Security Policy",
    lastUpdated: "March 1, 2026",
    content: [
      {
        heading: "Responsible Disclosure",
        body: "We take security seriously. If you discover a vulnerability in our platform, please report it to security@aina.ai. We commit to responding within 24 hours and resolving critical issues within 48 hours.",
      },
      {
        heading: "Our Security Certifications",
        body: "AINA maintains SOC 2 Type II certification, ISO 27001 accreditation, and undergoes annual penetration testing by independent third parties. Certificates are available upon request.",
      },
    ],
  },
];

export default function LegalPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Policies &"
        titleHighlight="Disclosures"
        description="Everything you need to know about how AINA operates, protects your data, and upholds its commitments to customers and regulators."
        variant="teal"
      />

      <Section id="legal-docs" variant="grid" fullHeight={false} className="py-24">
        <Container className="max-w-4xl">
          {/* Quick nav */}
          <div className="flex flex-wrap gap-2 mb-16">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                id={`legal-nav-${s.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0f2942] text-sm text-[#94a3b8] hover:text-[#00b4d8] hover:border-[#00b4d8]/30 transition-colors"
              >
                <s.icon className="w-3.5 h-3.5" />
                {s.title}
              </a>
            ))}
          </div>

          {/* Document sections */}
          <div className="space-y-20">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-[#0f2942] flex items-center justify-center text-[#00b4d8]">
                    <section.icon className="w-4.5 h-4.5" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                </div>
                <p className="text-xs text-[#64748b] mb-8 ml-12">
                  Last updated: {section.lastUpdated}
                </p>

                <div className="ml-0 space-y-8 border-l border-[#0f2942] pl-6">
                  {section.content.map((block) => (
                    <div key={block.heading}>
                      <h3 className="text-base font-semibold text-white mb-2">{block.heading}</h3>
                      <p className="text-sm text-[#94a3b8] leading-relaxed">{block.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact for legal queries */}
          <div className="mt-20 p-8 rounded-2xl border border-[#0f2942] bg-[#0a1628] text-center">
            <h3 className="text-lg font-bold text-white mb-2">Questions About Our Policies?</h3>
            <p className="text-sm text-[#64748b] mb-4">
              Contact our legal team at{" "}
              <a id="legal-email" href="mailto:legal@aina.ai" className="text-[#00b4d8] hover:underline">
                legal@aina.ai
              </a>{" "}
              or our privacy team at{" "}
              <a id="privacy-email" href="mailto:privacy@aina.ai" className="text-[#00b4d8] hover:underline">
                privacy@aina.ai
              </a>.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
