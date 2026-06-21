import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PlaceholderSection } from "@/components/layout/PlaceholderSection";
import { Cpu, Network, Eye, BarChart3, Shield, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Explore the AINA platform — AI-native threat detection, autonomous response, and full-stack security operations in a single pane of glass.",
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="The Platform"
        title="One Platform."
        titleHighlight="Total Visibility."
        description="AINA's unified security platform gives you AI-powered detection, real-time intelligence, and autonomous response — all in one place."
        variant="green"
      />

      <PlaceholderSection
        id="platform-core"
        heading="Core Capabilities"
        subheading="Every layer of your environment, protected by purpose-built AI."
        variant="grid"
        accent="green"
        columns={3}
        cards={[
          {
            title: "AI Detection Engine",
            description:
              "Multi-modal AI combining behavioral analysis, graph neural networks, and LLM-based log reasoning for unprecedented detection accuracy.",
            icon: <Cpu className="w-5 h-5" />,
          },
          {
            title: "Network Intelligence",
            description:
              "Deep packet inspection and flow analysis across on-prem, hybrid, and multi-cloud environments without agent dependencies.",
            icon: <Network className="w-5 h-5" />,
          },
          {
            title: "Cloud Workload Protection",
            description:
              "Runtime protection for containers, serverless functions, and VMs with drift detection and automatic policy enforcement.",
            icon: <Layers className="w-5 h-5" />,
          },
          {
            title: "Threat Intelligence Graph",
            description:
              "A live knowledge graph of 50M+ threat actors, TTPs, campaigns, and IOCs updated every 60 seconds from global sensors.",
            icon: <Eye className="w-5 h-5" />,
          },
          {
            title: "Security Analytics",
            description:
              "Interactive dashboards, risk scoring, trend analysis, and board-ready reporting for CISOs and executive stakeholders.",
            icon: <BarChart3 className="w-5 h-5" />,
          },
          {
            title: "Policy & Compliance",
            description:
              "Pre-built policy libraries for CIS Benchmarks, NIST, PCI-DSS, HIPAA, and SOC 2 with automated gap analysis.",
            icon: <Shield className="w-5 h-5" />,
          },
        ]}
      />

      <PlaceholderSection
        id="platform-integrations"
        heading="Integrates With Your Stack"
        subheading="300+ pre-built integrations. Deploy in minutes, not months."
        variant="dots"
        accent="teal"
        columns={4}
        cards={[
          { title: "AWS", description: "Native CloudTrail, GuardDuty, and VPC Flow Log integration." },
          { title: "Microsoft Azure", description: "Sentinel sync, AAD, and Defender for Cloud connectors." },
          { title: "Google Cloud", description: "Security Command Center and Chronicle integration." },
          { title: "Okta & IAM", description: "Identity event correlation across all major IdP providers." },
          { title: "CrowdStrike", description: "Bidirectional alert sync and shared threat intelligence." },
          { title: "Splunk", description: "Forward events to AINA or pull context into Splunk." },
          { title: "Palo Alto", description: "Cortex XSOAR playbook integration for automated response." },
          { title: "ServiceNow", description: "Bi-directional ticket creation and incident management." },
        ]}
      />
    </>
  );
}
