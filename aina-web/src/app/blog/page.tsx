import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { PlaceholderSection } from "@/components/layout/PlaceholderSection";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Security insights, AI research, threat intelligence reports, and product news from the AINA team.",
};

const featuredPost = {
  category: "Threat Intelligence",
  date: "June 15, 2026",
  title: "The Rise of AI-Augmented Ransomware: What Security Teams Need to Know",
  description:
    "Ransomware operators are now using large language models to craft hyper-personalized phishing lures and automate lateral movement. We break down the tactics and how AINA detects them.",
  slug: "ai-augmented-ransomware-2026",
  readTime: "8 min read",
};

const posts = [
  {
    category: "Product",
    date: "June 10, 2026",
    title: "Introducing AINA's Autonomous Response Engine v2.0",
    description: "Faster containment, smarter playbooks, and new bi-directional integrations with leading ITSM platforms.",
    slug: "autonomous-response-v2",
    readTime: "4 min read",
  },
  {
    category: "Research",
    date: "May 28, 2026",
    title: "Graph Neural Networks for Lateral Movement Detection",
    description: "How we trained a GNN on enterprise network topology data to detect attacker pivoting with 40x fewer false positives.",
    slug: "gnn-lateral-movement",
    readTime: "12 min read",
  },
  {
    category: "Compliance",
    date: "May 20, 2026",
    title: "EU AI Act & Cybersecurity: What Changes in 2026",
    description: "A practical guide for security leaders navigating the intersection of the EU AI Act and existing NIS2 obligations.",
    slug: "eu-ai-act-cybersecurity",
    readTime: "6 min read",
  },
  {
    category: "Threat Intelligence",
    date: "May 12, 2026",
    title: "APT44 Campaign Analysis: Targeting Critical Infrastructure",
    description: "Our threat research team tracked a sophisticated nation-state campaign targeting energy providers across three continents.",
    slug: "apt44-campaign-analysis",
    readTime: "10 min read",
  },
  {
    category: "Product",
    date: "May 5, 2026",
    title: "AINA Now Supports OpenTelemetry Ingestion",
    description: "Stream observability data directly into AINA's detection engine for full-stack correlation without extra agents.",
    slug: "opentelemetry-support",
    readTime: "3 min read",
  },
];

const categoryColors: Record<string, string> = {
  "Threat Intelligence": "text-[#ff3b5c] border-[#ff3b5c]/20 bg-[#ff3b5c]/5",
  "Product": "text-[#00ff85] border-[#00ff85]/20 bg-[#00ff85]/5",
  "Research": "text-[#00b4d8] border-[#00b4d8]/20 bg-[#00b4d8]/5",
  "Compliance": "text-purple-400 border-purple-400/20 bg-purple-400/5",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="The AINA Blog"
        title="Intelligence."
        titleHighlight="Insight. Ideas."
        description="Threat research, product updates, and security perspectives from the team behind AINA."
        variant="teal"
      />

      {/* Featured post */}
      <Section id="blog-featured" variant="grid" fullHeight={false} className="py-20">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#64748b] mb-6">Featured</p>
          <Link
            href={`/blog/${featuredPost.slug}`}
            id={`blog-featured-${featuredPost.slug}`}
            className="group block"
          >
            <div className="relative rounded-2xl border border-[#0f2942] bg-[#0a1628] p-8 lg:p-12 hover:border-[#00b4d8]/30 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#00b4d8]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${categoryColors[featuredPost.category] ?? "text-[#64748b] border-[#0f2942]"}`}>
                    <Tag className="w-3 h-3" /> {featuredPost.category}
                  </span>
                  <span className="text-xs text-[#64748b]">{featuredPost.date} · {featuredPost.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#00b4d8] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-[#94a3b8] leading-relaxed max-w-2xl mb-6">{featuredPost.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#00b4d8] group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </Container>
      </Section>

      {/* Post grid */}
      <Section id="blog-posts" variant="dots" fullHeight={false} className="py-8 pb-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                id={`blog-post-${post.slug}`}
                className="group flex flex-col rounded-xl border border-[#0f2942] bg-[#0a1628] p-6 hover:border-[#00ff85]/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-medium ${categoryColors[post.category] ?? "text-[#64748b] border-[#0f2942]"}`}>
                    {post.category}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#00ff85] transition-colors leading-snug flex-1">
                  {post.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed mb-4 line-clamp-2">{post.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#0f2942]">
                  <span className="text-xs text-[#64748b]">{post.date}</span>
                  <span className="text-xs text-[#64748b]">{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
