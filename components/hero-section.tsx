"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Terminal } from "lucide-react";
import Link from "next/link";

import { MotionHero } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { easeOut } from "@/lib/motion";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="flex w-full flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-3">
        <MotionHero>
          <h1 className="flex flex-col items-center gap-2 font-bold text-5xl text-foreground tracking-tight sm:text-6xl lg:text-7xl">
            <motion.span
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              Free YouTube
            </motion.span>
            <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <motion.span
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                className="inline-block rounded-2xl bg-foreground px-4 py-1 text-background"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.08, ease: easeOut }}
              >
                transcript
              </motion.span>
              <motion.span
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.16, ease: easeOut }}
              >
                generator
              </motion.span>
            </span>
          </h1>
        </MotionHero>
      </div>

      <MotionHero delay={0.2}>
        <p className="max-w-2xl font-mono text-muted-foreground text-sm leading-relaxed sm:text-base">
          Paste a link, get the full transcript with timestamps. Copy it or save
          as TXT, SRT, or JSON.
        </p>
      </MotionHero>

      <MotionHero delay={0.3}>
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
      </MotionHero>
    </section>
  );
}
