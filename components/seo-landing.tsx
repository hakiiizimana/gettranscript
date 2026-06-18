"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Terminal } from "lucide-react";
import Link from "next/link";

import { FormatEyebrow, FormatNav } from "@/components/format-eyebrow";
import { JsonLd } from "@/components/json-ld";
import {
  MotionHero,
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
} from "@/components/motion";
import { Button } from "@/components/ui/button";
import { easeOut } from "@/lib/motion";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo";
import type { SeoPage } from "@/lib/seo-pages";

interface SeoLandingProps {
  page: SeoPage;
}

export function SeoLanding({ page }: SeoLandingProps) {
  const reduceMotion = useReducedMotion();

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

      <main className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-20 text-center lg:px-10 lg:py-24">
        <div className="flex flex-col items-center gap-6">
          <MotionHero>
            <FormatEyebrow
              active
              eyebrow={page.formatEyebrow}
              format={page.format}
            />
          </MotionHero>

          <MotionHero delay={0.06}>
            <h1 className="flex flex-col items-center gap-2 font-bold text-4xl text-foreground tracking-tight sm:text-5xl lg:text-6xl">
              <motion.span
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                transition={{ duration: 0.5, ease: easeOut }}
              >
                {page.headline}
              </motion.span>
              <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <motion.span
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  transition={{ duration: 0.5, delay: 0.08, ease: easeOut }}
                >
                  to
                </motion.span>
                <motion.span
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  className="inline-block rounded-2xl bg-foreground px-4 py-1 text-background"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  transition={{ duration: 0.5, delay: 0.14, ease: easeOut }}
                >
                  {page.formatPill}
                </motion.span>
              </span>
            </h1>
          </MotionHero>

          <MotionHero delay={0.18}>
            <FormatNav current={page} />
          </MotionHero>

          <MotionHero delay={0.24}>
            <p className="max-w-2xl font-mono text-muted-foreground text-sm leading-relaxed sm:text-base">
              {page.intro}
            </p>
          </MotionHero>

          <MotionHero className="flex justify-center" delay={0.3}>
            <Button
              className="h-11 gap-2 rounded-full px-6 text-sm"
              nativeButton={false}
              render={<Link href="/#get-transcript" />}
              size="lg"
            >
              <Terminal className="size-4" data-icon />
              {page.cta}
            </Button>
          </MotionHero>
        </div>

        <MotionReveal>
          <section className="rounded-2xl border border-border/45 bg-card p-6 text-left">
            <h2 className="font-mono font-semibold text-base">What you get</h2>
            <MotionStagger className="mt-4 flex flex-col gap-3">
              {page.bullets.map((bullet) => (
                <MotionStaggerItem key={bullet}>
                  <p className="font-mono text-muted-foreground text-sm leading-relaxed">
                    {bullet}
                  </p>
                </MotionStaggerItem>
              ))}
            </MotionStagger>
          </section>
        </MotionReveal>

        <MotionReveal>
          <p className="font-mono text-muted-foreground text-sm leading-relaxed">
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
        </MotionReveal>
      </main>
    </>
  );
}
