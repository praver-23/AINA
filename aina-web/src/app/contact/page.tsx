import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the AINA team — request a demo, ask a sales question, or reach out for partnership inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Let's Talk"
        titleHighlight="Security."
        description="Whether you're ready to buy, just exploring, or have a partnership idea — our team is here to help."
        variant="teal"
      />

      <Section id="contact-options" variant="grid" fullHeight={false} className="py-24">
        <Container>
          <ContactSection />
        </Container>
      </Section>
    </>
  );
}
