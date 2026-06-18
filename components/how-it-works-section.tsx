"use client";

import {
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
} from "@/components/motion";
import { howItWorks } from "@/lib/how-it-works";

export function HowItWorksSection() {
  return (
    <section
      className="relative border-border/50 border-t px-6 py-16 lg:px-10"
      id="how-it-works"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col items-center gap-6 text-center">
        <MotionReveal>
          <h2 className="font-medium font-mono text-muted-foreground text-sm uppercase tracking-wider">
            How it works
          </h2>
        </MotionReveal>

        <MotionStagger className="grid w-full gap-6 sm:grid-cols-3">
          {howItWorks.map((item) => (
            <MotionStaggerItem key={item.step}>
              <div className="flex h-full flex-col gap-2 rounded-2xl border border-border/45 bg-card p-5 text-left">
                <h3 className="font-mono font-semibold text-base">
                  <span className="text-muted-foreground">{item.step}</span>
                  <span className="mx-2 text-muted-foreground">·</span>
                  {item.title}
                </h3>
                <p className="font-mono text-muted-foreground text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
