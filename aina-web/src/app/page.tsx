import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";

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
    </>
  );
}
