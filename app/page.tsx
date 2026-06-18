import { ApiBand } from "@/components/api-band";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { JsonLd } from "@/components/json-ld";
import { TranscriptCard } from "@/components/transcript-card";
import { faqItems } from "@/lib/faq";
import { howItWorks } from "@/lib/how-it-works";
import {
  faqPageSchema,
  organizationEntity,
  organizationSchema,
} from "@/lib/seo";
import { absoluteUrl, siteDescription, siteName } from "@/lib/site";

export default function Home() {
  const pageUrl = absoluteUrl("/");

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteName,
            url: pageUrl,
            description: siteDescription,
            publisher: organizationEntity(),
          },
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: siteName,
            url: pageUrl,
            description: siteDescription,
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            browserRequirements: "Requires JavaScript",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            provider: {
              "@type": "Organization",
              name: "Stophy",
              url: "https://stophy.dev",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to get a YouTube transcript",
            description: siteDescription,
            step: howItWorks.map((item, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: item.title,
              text: item.body,
            })),
          },
          faqPageSchema(faqItems),
        ]}
      />

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-12 px-6 py-20 text-center lg:px-10 lg:py-28">
        <HeroSection />

        <section
          className="flex w-full max-w-3xl justify-center"
          id="get-transcript"
        >
          <TranscriptCard />
        </section>
      </main>

      <ApiBand />

      <HowItWorksSection />

      <FaqSection />
    </>
  );
}
