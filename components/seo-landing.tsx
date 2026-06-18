import { Terminal } from "lucide-react";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { breadcrumbSchema, buildPageMetadata, webPageSchema } from "@/lib/seo";
import type { SeoPage } from "@/lib/seo-pages";

interface SeoLandingProps {
  page: SeoPage;
}

export function buildSeoPageMetadata(page: SeoPage) {
  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

export function SeoLanding({ page }: SeoLandingProps) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: page.title,
            description: page.description,
            path: page.path,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: page.title, path: page.path },
          ]),
        ]}
      />

      <main className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-20 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-5 text-center">
          <p className="font-mono text-muted-foreground text-xs uppercase tracking-wider">
            <Link className="hover:text-foreground hover:underline" href="/">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>{page.h1}</span>
          </p>
          <h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
            {page.h1}
          </h1>
          <p className="font-mono text-muted-foreground text-sm leading-relaxed sm:text-base">
            {page.intro}
          </p>
          <div className="flex justify-center">
            <Button
              className="h-11 gap-2 rounded-full px-6 text-sm"
              nativeButton={false}
              render={<Link href="/#get-transcript" />}
              size="lg"
            >
              <Terminal className="size-4" data-icon />
              {page.cta}
            </Button>
          </div>
        </div>

        <section className="rounded-2xl border border-border/45 bg-card p-6 text-left">
          <h2 className="font-mono font-semibold text-base">What you get</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {page.bullets.map((bullet) => (
              <li
                className="font-mono text-muted-foreground text-sm leading-relaxed"
                key={bullet}
              >
                {bullet}
              </li>
            ))}
          </ul>
        </section>

        <p className="text-center font-mono text-muted-foreground text-sm leading-relaxed">
          Open the{" "}
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/#get-transcript"
          >
            transcript tool
          </Link>
          , paste your YouTube URL, then copy or download the file in your
          chosen format.
        </p>
      </main>
    </>
  );
}
