import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PlaceholderSection } from "@/components/layout/PlaceholderSection";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the AINA team — we're hiring engineers, researchers, and security professionals who want to solve the hardest problems in AI security.",
};

const openRoles = [
  {
    title: "Senior ML Engineer — Threat Detection",
    team: "AI Research",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    id: "careers-role-ml-engineer",
  },
  {
    title: "Security Researcher — Adversarial AI",
    team: "Threat Intelligence",
    location: "Remote (US/EU)",
    type: "Full-time",
    id: "careers-role-security-researcher",
  },
  {
    title: "Staff Backend Engineer — Data Pipeline",
    team: "Platform Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    id: "careers-role-backend-engineer",
  },
  {
    title: "Product Designer — Security UX",
    team: "Design",
    location: "Remote",
    type: "Full-time",
    id: "careers-role-product-designer",
  },
  {
    title: "Enterprise Account Executive",
    team: "Sales",
    location: "New York, NY",
    type: "Full-time",
    id: "careers-role-account-exec",
  },
  {
    title: "Customer Success Manager — APAC",
    team: "Customer Success",
    location: "Singapore",
    type: "Full-time",
    id: "careers-role-csm-apac",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Join the Team"
        title="Build the Future of"
        titleHighlight="AI Security"
        description="We're a team of researchers, engineers, and security practitioners on a mission to make the digital world safer. Come do the best work of your career."
        variant="green"
      />

      <PlaceholderSection
        id="careers-why"
        heading="Why AINA?"
        subheading="More than a job — a chance to shape how the world defends itself."
        variant="grid"
        accent="green"
        columns={3}
        cards={[
          {
            title: "Meaningful Work",
            description:
              "Every line of code, every model we ship directly protects real organizations from real attacks. The impact is immediate and measurable.",
          },
          {
            title: "World-Class Team",
            description:
              "Work alongside researchers from top AI labs, former government security professionals, and experienced startup builders.",
          },
          {
            title: "Remote-First Culture",
            description:
              "We trust our people. Work from anywhere — our team spans 20+ countries with offices in SF, London, Singapore, and Tel Aviv.",
          },
          {
            title: "Competitive Compensation",
            description:
              "Top-of-market salary, meaningful equity, and comprehensive benefits including health, dental, vision, and 401k.",
          },
          {
            title: "Continuous Learning",
            description:
              "$3,000/year learning budget, conference attendance, and dedicated time to publish research and contribute to open source.",
          },
          {
            title: "Rapid Growth",
            description:
              "Headcount tripled in 18 months. Join now and grow your career alongside a company on an explosive trajectory.",
          },
        ]}
      />

      {/* Open roles */}
      <Section id="careers-roles" variant="dots" fullHeight={false} className="py-24">
        <Container>
          <h2 className="text-3xl font-bold text-white mb-3">Open Roles</h2>
          <p className="text-[#94a3b8] mb-10">
            Don&apos;t see a perfect fit?{" "}
            <Link href="/contact" className="text-[#00ff85] hover:underline">
              Send us your resume anyway.
            </Link>
          </p>
          <div className="space-y-4">
            {openRoles.map((role) => (
              <Link
                key={role.id}
                href={`/contact?role=${encodeURIComponent(role.title)}`}
                id={role.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-xl border border-[#0f2942] bg-[#0a1628] hover:border-[#00ff85]/30 hover:bg-[#00ff85]/5 transition-all duration-300"
              >
                <div className="mb-3 sm:mb-0">
                  <h3 className="text-base font-semibold text-white group-hover:text-[#00ff85] transition-colors mb-1">
                    {role.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-[#64748b]">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" /> {role.team}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {role.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {role.type}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#64748b] group-hover:text-[#00ff85] group-hover:translate-x-1 transition-all duration-200 shrink-0" />
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
