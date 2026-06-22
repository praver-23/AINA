"use client";

import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";

const contactOptions = [
  {
    icon: MessageSquare,
    title: "Sales Inquiry",
    description: "Talk to our team about plans, pricing, and custom enterprise agreements.",
    cta: "Chat with Sales",
    id: "contact-sales",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send a detailed message and we'll respond within one business day.",
    cta: "hello@aina.ai",
    id: "contact-email",
  },
  {
    icon: Phone,
    title: "Request a Demo",
    description: "Book a 30-minute live demo with a solutions engineer. No pitch, just product.",
    cta: "Schedule Demo",
    id: "contact-demo",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "100 Market Street, Suite 1200, San Francisco, CA 94105",
    cta: "Get Directions",
    id: "contact-directions",
  },
];

export function ContactSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Contact info cards */}
      <div className="space-y-4">
        {contactOptions.map((option) => (
          <div
            key={option.id}
            className="flex gap-4 p-5 rounded-xl border border-[#0f2942] bg-[#0a1628] hover:border-[#00b4d8]/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0f2942] flex items-center justify-center shrink-0 text-[#00b4d8]">
              <option.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">{option.title}</h3>
              <p className="text-sm text-[#64748b] mb-2">{option.description}</p>
              <button
                id={option.id}
                className="text-sm font-medium text-[#00b4d8] hover:text-white transition-colors"
              >
                {option.cta} →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact form */}
      <div className="glass-light rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>
        <form
          id="contact-form"
          className="space-y-4"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Contact form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-first-name" className="block text-xs font-medium text-[#94a3b8] mb-1.5">
                First Name
              </label>
              <input
                id="contact-first-name"
                type="text"
                placeholder="Jane"
                className="w-full px-4 py-2.5 rounded-lg border border-[#0f2942] bg-[#020817] text-white placeholder-[#64748b] text-sm focus:outline-none focus:border-[#00b4d8]/50 focus:ring-1 focus:ring-[#00b4d8]/20 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-last-name" className="block text-xs font-medium text-[#94a3b8] mb-1.5">
                Last Name
              </label>
              <input
                id="contact-last-name"
                type="text"
                placeholder="Doe"
                className="w-full px-4 py-2.5 rounded-lg border border-[#0f2942] bg-[#020817] text-white placeholder-[#64748b] text-sm focus:outline-none focus:border-[#00b4d8]/50 focus:ring-1 focus:ring-[#00b4d8]/20 transition-colors"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-xs font-medium text-[#94a3b8] mb-1.5">
              Work Email
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="jane@company.com"
              className="w-full px-4 py-2.5 rounded-lg border border-[#0f2942] bg-[#020817] text-white placeholder-[#64748b] text-sm focus:outline-none focus:border-[#00b4d8]/50 focus:ring-1 focus:ring-[#00b4d8]/20 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="contact-company" className="block text-xs font-medium text-[#94a3b8] mb-1.5">
              Company
            </label>
            <input
              id="contact-company"
              type="text"
              placeholder="Acme Corp"
              className="w-full px-4 py-2.5 rounded-lg border border-[#0f2942] bg-[#020817] text-white placeholder-[#64748b] text-sm focus:outline-none focus:border-[#00b4d8]/50 focus:ring-1 focus:ring-[#00b4d8]/20 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-xs font-medium text-[#94a3b8] mb-1.5">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={4}
              placeholder="Tell us about your security needs..."
              className="w-full px-4 py-2.5 rounded-lg border border-[#0f2942] bg-[#020817] text-white placeholder-[#64748b] text-sm focus:outline-none focus:border-[#00b4d8]/50 focus:ring-1 focus:ring-[#00b4d8]/20 transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            id="contact-submit"
            className="w-full py-3 px-6 rounded-lg bg-[#00b4d8] text-[#020817] font-semibold text-sm hover:bg-[#00b4d8]/90 glow-teal transition-all duration-300"
          >
            Send Message
          </button>
          <p className="text-xs text-[#64748b] text-center">
            By submitting, you agree to our{" "}
            <a href="/legal#privacy" className="text-[#00b4d8] hover:underline">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
}
