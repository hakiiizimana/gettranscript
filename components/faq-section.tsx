"use client";

import {
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
} from "@/components/motion";
import { faqItems } from "@/lib/faq";

export function FaqSection() {
  return (
    <section
      className="relative border-border/50 border-t px-6 py-16 lg:px-10"
      id="faq"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <MotionReveal className="text-center">
          <h2 className="font-medium font-mono text-muted-foreground text-sm uppercase tracking-wider">
            FAQ
          </h2>
          <p className="mt-3 font-mono text-muted-foreground text-sm leading-relaxed">
            Common questions about getting YouTube transcripts for free.
          </p>
        </MotionReveal>

        <MotionStagger className="flex flex-col gap-4">
          {faqItems.map((item) => (
            <MotionStaggerItem key={item.question}>
              <details className="group rounded-2xl border border-border/45 bg-card px-5 py-4 transition-colors hover:border-border/70">
                <summary className="cursor-pointer list-none font-mono font-semibold text-sm leading-snug marker:content-none">
                  <span className="flex items-start justify-between gap-4">
                    {item.question}
                    <span className="text-muted-foreground transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 font-mono text-muted-foreground text-sm leading-relaxed">
                  {item.answer}
                </p>
              </details>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
