import { Terminal } from "lucide-react";
import Link from "next/link";

import { ApiBand } from "@/components/api-band";
import { FaqSection } from "@/components/faq-section";
import { JsonLd } from "@/components/json-ld";
import { TranscriptCard } from "@/components/transcript-card";
import { Button } from "@/components/ui/button";
import { faqItems } from "@/lib/faq";
import {
  faqPageSchema,
  organizationEntity,
  organizationSchema,
} from "@/lib/seo";
import { absoluteUrl, siteDescription, siteName } from "@/lib/site";

const howItWorks = [
  {
    step: "01",
    title: "Paste a link",
    body: "Watch URLs, Shorts, youtu.be. Most YouTube links work.",
  },
  {
    step: "02",
    title: "Get the captions",
    body: "We pull the transcript with timestamps lined up.",
  },
  {
    step: "03",
    title: "Copy or save",
    body: "Read it here, copy it, or download TXT, SRT, or JSON.",
  },
] as const;

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
        <section className="flex w-full flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <h1 className="flex flex-col items-center gap-2 font-bold text-5xl text-foreground tracking-tight sm:text-6xl lg:text-7xl">
              <span>Free YouTube</span>
              <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <span className="inline-block rounded-2xl bg-foreground px-4 py-1 text-background">
                  transcript
                </span>
                <span>generator</span>
              </span>
            </h1>
          </div>

          <p className="max-w-2xl font-mono text-muted-foreground text-sm leading-relaxed sm:text-base">
            Paste a link, get the full transcript with timestamps. Copy it or
            save as TXT, SRT, or JSON.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              className="h-11 gap-2 rounded-full px-6 text-sm"
              nativeButton={false}
              render={<Link href="#get-transcript" />}
              size="lg"
            >
              <Terminal className="size-4" data-icon />
              Get transcript
            </Button>
            <Button
              className="h-11 rounded-full px-6 text-sm"
              nativeButton={false}
              render={<Link href="#how-it-works" />}
              size="lg"
              variant="outline"
            >
              How it works
            </Button>
          </div>
        </section>

        <section
          className="flex w-full max-w-3xl justify-center"
          id="get-transcript"
        >
          <TranscriptCard />
        </section>
      </main>

      <ApiBand />

      <section
        className="relative border-border/50 border-t px-6 py-16 lg:px-10"
        id="how-it-works"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <h2 className="font-medium font-mono text-muted-foreground text-sm uppercase tracking-wider">
            How it works
          </h2>
          <div className="grid w-full gap-6 sm:grid-cols-3">
            {howItWorks.map((item) => (
              <div
                className="flex flex-col gap-2 rounded-2xl border border-border/45 bg-card p-5 text-left"
                key={item.step}
              >
                <h3 className="font-mono font-semibold text-base">
                  <span className="text-muted-foreground">{item.step}</span>
                  <span className="mx-2 text-muted-foreground">·</span>
                  {item.title}
                </h3>
                <p className="font-mono text-muted-foreground text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />
    </>
  );
}
