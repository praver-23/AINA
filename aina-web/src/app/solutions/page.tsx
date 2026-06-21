import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PlaceholderSection } from "@/components/layout/PlaceholderSection";
import { Building2, Cloud, Radio, Lock, CheckCircle, Server } from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "AINA security solutions for enterprise, cloud-native, OT/IoT, and zero-trust environments — tailored to your industry and risk profile.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Security Built for"
        titleHighlight="Your Environment"
        description="Whether you're protecting a global enterprise, a cloud-native startup, or critical infrastructure — AINA adapts to your threat model."
        variant="teal"
      />

      <PlaceholderSection
        id="solutions-enterprise"
        heading="Enterprise Security"
        subheading="End-to-end threat protection for complex, multi-site, and regulated organizations."
        variant="grid"
        accent="green"
        columns={3}
        cards={[
          {
            title: "Enterprise SOC",
            description: "Unified security operations with AI triage, analyst workflows, and executive reporting.",
            icon: <Building2 className="w-5 h-5" />,
          },
          {
            title: "M&A Risk Assessment",
            description: "Instant security posture assessment of acquired companies before integration begins.",
            icon: <CheckCircle className="w-5 h-5" />,
          },
          {
            title: "On-Prem + Hybrid",
            description: "Full coverage for on-prem infrastructure alongside cloud workloads with a single console.",
            icon: <Server className="w-5 h-5" />,
          },
        ]}
      />

      <PlaceholderSection
        id="solutions-cloud"
        heading="Cloud Native Security"
        subheading="AI security designed for ephemeral infrastructure, microservices, and DevSecOps pipelines."
        variant="dots"
        accent="teal"
        columns={3}
        cards={[
          {
            title: "Container Security",
            description: "Runtime protection and image scanning for Docker, Kubernetes, and ECS workloads.",
            icon: <Cloud className="w-5 h-5" />,
          },
          {
            title: "Shift-Left Security",
            description: "Embed security checks directly into CI/CD pipelines to catch issues before deployment.",
            icon: <CheckCircle className="w-5 h-5" />,
          },
          {
            title: "CSPM & CIEM",
            description: "Continuous cloud security posture and identity entitlement management across AWS, Azure, and GCP.",
            icon: <Lock className="w-5 h-5" />,
          },
        ]}
      />

      <PlaceholderSection
        id="solutions-iot"
        heading="OT/IoT Security"
        subheading="Protect operational technology, industrial control systems, and connected devices at scale."
        variant="grid"
        accent="purple"
        columns={3}
        cards={[
          {
            title: "Asset Discovery",
            description: "Passive discovery and fingerprinting of all connected OT and IoT devices without disrupting operations.",
            icon: <Radio className="w-5 h-5" />,
          },
          {
            title: "Protocol Analysis",
            description: "Deep inspection of industrial protocols including Modbus, DNP3, and OPC-UA for anomalies.",
            icon: <Server className="w-5 h-5" />,
          },
          {
            title: "Zero Trust for OT",
            description: "Micro-segmentation and least-privilege access policies for OT networks without performance impact.",
            icon: <Lock className="w-5 h-5" />,
          },
        ]}
      />
    </>
  );
}
