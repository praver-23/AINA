import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { ArrowLeft, Tag, Clock, Calendar } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  // In a real app this would fetch from a CMS
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: title,
    description: `Read our latest insights on ${title} — from the AINA security research team.`,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <>
      {/* Article hero */}
      <Section id="blog-post-hero" variant="grid" className="pt-32 pb-16 min-h-[50vh]">
        <Container className="max-w-3xl">
          <Link
            href="/blog"
            id="blog-post-back"
            className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#00ff85] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#00b4d8]/20 bg-[#00b4d8]/5 text-[#00b4d8] text-xs font-medium">
              <Tag className="w-3 h-3" /> Threat Intelligence
            </span>
            <span className="flex items-center gap-1 text-xs text-[#64748b]">
              <Calendar className="w-3 h-3" /> June 15, 2026
            </span>
            <span className="flex items-center gap-1 text-xs text-[#64748b]">
              <Clock className="w-3 h-3" /> 8 min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {title}
          </h1>

          <p className="text-lg text-[#94a3b8] leading-relaxed">
            This is a placeholder blog post for the{" "}
            <span className="text-[#00b4d8] font-mono text-base">{slug}</span> route.
            In the final implementation, content will be sourced from a CMS or MDX files.
          </p>
        </Container>
      </Section>

      {/* Article body placeholder */}
      <Section id="blog-post-body" variant="default" fullHeight={false} className="pb-24">
        <Container className="max-w-3xl">
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="space-y-6 text-[#94a3b8] leading-relaxed">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  {i === 0 && (
                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">
                      Introduction
                    </h2>
                  )}
                  {i === 1 && (
                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">
                      Key Findings
                    </h2>
                  )}
                  {i === 2 && (
                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">
                      Technical Analysis
                    </h2>
                  )}
                  {i === 3 && (
                    <h2 className="text-2xl font-bold text-white mt-10 mb-4">
                      Recommendations
                    </h2>
                  )}
                  <p>
                    Placeholder content block {i + 1} of 4. This section will contain the
                    full article body when connected to a CMS or MDX pipeline. Each
                    paragraph will be rendered with full syntax highlighting for code blocks,
                    callout boxes for threat indicators, and embedded charts for statistical data.
                  </p>
                  <p>
                    The AINA platform detects the techniques described in this article
                    automatically using our AI detection engine. Customers on Professional
                    and Enterprise plans receive pre-built detection rules and response
                    playbooks aligned to the MITRE ATT&CK framework.
                  </p>
                </div>
              ))}
            </div>

            {/* CTA at end of article */}
            <div className="mt-16 p-8 rounded-2xl border border-[#00ff85]/20 bg-[#00ff85]/5">
              <h3 className="text-xl font-bold text-white mb-2">Protect Your Organization</h3>
              <p className="text-[#94a3b8] mb-4 text-sm">
                AINA automatically detects and responds to the threats covered in this article.
                Start your free 14-day trial today — no credit card required.
              </p>
              <Link
                href="/contact"
                id="blog-post-cta"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00ff85] text-[#020817] font-semibold text-sm glow-green-sm hover:glow-green transition-all duration-300"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
