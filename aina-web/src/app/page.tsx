import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ArchitectureSection } from "@/components/home/ArchitectureSection";
import { WorkflowSection } from "@/components/home/WorkflowSection";
import { RiskScoringSection } from "@/components/home/RiskScoringSection";
import { ThreatIntelligenceSection } from "@/components/home/ThreatIntelligenceSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { FAQSection } from "@/components/home/FAQSection";

export const metadata: Metadata = {
  title: "AINA — AI-Powered Malware Intelligence",
  description:
    "Reverse engineering, static analysis, dynamic analysis and explainable threat intelligence. AINA is the AI-native platform for deep malware analysis and real-time threat detection.",
  keywords: [
    "malware analysis",
    "APK analysis",
    "AI security",
    "threat intelligence",
    "reverse engineering",
    "static analysis",
    "dynamic analysis",
    "AINA",
  ],
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ArchitectureSection />
      <WorkflowSection />
      <RiskScoringSection />
      <ThreatIntelligenceSection />
      <ImpactSection />
      <FAQSection />
    </>
  );
}
