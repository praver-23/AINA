import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorSpotlight } from "@/components/fx/CursorSpotlight";
import { FloatingParticles } from "@/components/fx/FloatingParticles";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "AINA — AI-Powered Security Intelligence",
    template: "%s | AINA",
  },
  description:
    "AINA is an AI-native security intelligence platform that detects, analyzes, and responds to threats in real time — built for the modern enterprise.",
  keywords: ["AI security", "threat intelligence", "cybersecurity", "AINA", "network security"],
  authors: [{ name: "AINA Team" }],
  metadataBase: new URL("https://aina.ai"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "AINA — AI-Powered Security Intelligence",
    description:
      "AI-native security intelligence platform. Detect, analyze, and respond to threats in real time.",
    siteName: "AINA",
  },
  twitter: {
    card: "summary_large_image",
    title: "AINA — AI-Powered Security Intelligence",
    description: "AI-native security intelligence that never sleeps.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col bg-[#020817] text-[#e2e8f0] antialiased overflow-x-hidden">
        <CursorSpotlight />
        <FloatingParticles count={55} speed={0.16} />
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
