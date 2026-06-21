import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { PlaceholderSection } from "@/components/layout/PlaceholderSection";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Check, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "AINA pricing plans — Starter, Professional, and Enterprise. Transparent, usage-based security intelligence for every organization.",
};

const plans = [
  {
    name: "Starter",
    price: "$1,200",
    period: "/month",
    description: "For growing teams starting their security journey.",
    accent: "border-[#0f2942]",
    badge: null,
    features: [
      "Up to 500 endpoints",
      "Cloud workload monitoring",
      "Core threat detection",
      "Email & Slack alerts",
      "30-day log retention",
      "Community support",
    ],
    cta: { label: "Start Free Trial", href: "/contact", id: "pricing-starter-cta" },
  },
  {
    name: "Professional",
    price: "$4,800",
    period: "/month",
    description: "For security-first teams that need advanced AI and automation.",
    accent: "border-[#00ff85]/30",
    badge: "Most Popular",
    features: [
      "Up to 5,000 endpoints",
      "Full cloud + hybrid coverage",
      "Advanced AI detection engine",
      "Autonomous response workflows",
      "Threat intelligence graph",
      "90-day log retention",
      "Priority support + SLA",
      "Compliance reporting (SOC 2, ISO)",
    ],
    cta: { label: "Start Free Trial", href: "/contact", id: "pricing-pro-cta" },
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large enterprises, critical infrastructure, and regulated industries.",
    accent: "border-[#0f2942]",
    badge: null,
    features: [
      "Unlimited endpoints",
      "Dedicated AI model fine-tuning",
      "Custom data residency",
      "On-prem deployment option",
      "Unlimited log retention",
      "White-glove onboarding",
      "24/7 dedicated CSM",
      "Custom integrations & SLA",
    ],
    cta: { label: "Contact Sales", href: "/contact", id: "pricing-enterprise-cta" },
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple, Transparent"
        titleHighlight="Pricing"
        description="No per-alert fees. No surprise overages. One plan that grows with your organization."
        variant="green"
      />

      {/* Pricing cards */}
      <Section id="pricing-plans" variant="grid" fullHeight={false} className="py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border bg-[#0a1628] p-8 transition-all duration-300 hover:-translate-y-1 ${plan.accent}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00ff85] text-[#020817] text-xs font-bold">
                      <Zap className="w-3 h-3" /> {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-[#64748b] mb-4">{plan.description}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && (
                      <span className="text-[#64748b] mb-1">{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-[#00ff85] mt-0.5 shrink-0" />
                      <span className="text-[#94a3b8]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.cta.href}
                  id={plan.cta.id}
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    plan.badge
                      ? "bg-[#00ff85] text-[#020817] glow-green-sm hover:glow-green hover:-translate-y-0.5"
                      : "border border-[#0f2942] text-[#94a3b8] hover:text-white hover:border-[#00ff85]/30"
                  }`}
                >
                  {plan.cta.label}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <PlaceholderSection
        id="pricing-faq"
        heading="Frequently Asked Questions"
        subheading="Have more questions? Talk to our team — we'll find the right plan for you."
        variant="dots"
        accent="teal"
        columns={2}
        cards={[
          {
            title: "Is there a free trial?",
            description:
              "Yes — all plans include a 14-day free trial with full feature access and no credit card required.",
          },
          {
            title: "How is usage measured?",
            description:
              "Plans are based on endpoint count. Cloud workloads and log volume are included without additional per-event charges.",
          },
          {
            title: "Can I change plans?",
            description:
              "Absolutely. Upgrade, downgrade, or switch to Enterprise at any time. Changes take effect at the next billing cycle.",
          },
          {
            title: "Do you offer discounts?",
            description:
              "We offer annual prepay discounts, non-profit pricing, and startup programs. Contact our sales team for details.",
          },
        ]}
      />
    </>
  );
}
