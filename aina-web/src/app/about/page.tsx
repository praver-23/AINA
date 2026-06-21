import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PlaceholderSection } from "@/components/layout/PlaceholderSection";
import { Users, Target, Award, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about AINA — our mission to make AI-powered security accessible to every organization, and the team building it.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="We Built AINA Because"
        titleHighlight="Breaches Shouldn't Happen"
        description="Founded by security researchers, AI engineers, and former practitioners — AINA exists to close the gap between the speed of attackers and the speed of defenders."
        variant="teal"
      />

      <PlaceholderSection
        id="about-mission"
        heading="Our Mission"
        subheading="To give every security team — regardless of size — the intelligence and automation needed to outpace modern adversaries."
        variant="grid"
        accent="teal"
        columns={2}
        cards={[
          {
            title: "Founded in 2022",
            description:
              "Born out of frustration with legacy SIEM tools that generated thousands of alerts but caught nothing meaningful.",
            icon: <Target className="w-5 h-5" />,
          },
          {
            title: "World-Class Team",
            description:
              "Our 200+ team members include alumni from NSA, CISA, Google, Microsoft Security, and top AI research labs.",
            icon: <Users className="w-5 h-5" />,
          },
          {
            title: "Industry Recognition",
            description:
              "Named a Gartner Cool Vendor, RSA Innovation Sandbox finalist, and Forbes AI 50 company in 2024.",
            icon: <Award className="w-5 h-5" />,
          },
          {
            title: "Global Presence",
            description:
              "Headquartered in San Francisco with offices in London, Singapore, Tel Aviv, and a remote-first culture.",
            icon: <MapPin className="w-5 h-5" />,
          },
        ]}
      />

      <PlaceholderSection
        id="about-values"
        heading="What We Stand For"
        subheading="Our values aren't a poster on the wall — they shape every product decision, every hire, and every customer interaction."
        variant="dots"
        accent="green"
        columns={3}
        cards={[
          {
            title: "Transparency First",
            description:
              "We explain every AI decision in plain language. Security teams deserve to understand why something was flagged.",
          },
          {
            title: "Defender Obsession",
            description:
              "Every feature is designed from the defender's perspective. We think like attackers to build better defenses.",
          },
          {
            title: "Relentless Accuracy",
            description:
              "False positives cost time. We obsess over precision so your team focuses on what matters.",
          },
        ]}
      />
    </>
  );
}
