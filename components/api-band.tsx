import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function ApiBand() {
  return (
    <section className="relative border-border/50 border-t px-6 py-14 lg:px-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
        <h2 className="font-mono font-semibold text-foreground text-lg tracking-tight sm:text-xl">
          Need this in your code?
        </h2>
        <p className="font-mono text-muted-foreground text-sm leading-relaxed sm:text-base">
          gettranscript runs on{" "}
          <a
            className="font-semibold text-foreground underline-offset-4 hover:underline"
            href="https://stophy.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            Stophy
          </a>
          , the API to search YouTube, get transcripts, read comments, and
          inspect channels at scale.
        </p>
        <Button
          className="h-11 gap-2 rounded-full px-6 text-sm"
          nativeButton={false}
          render={
            <Link
              href="https://docs.stophy.dev"
              rel="noopener noreferrer"
              target="_blank"
            />
          }
          size="lg"
        >
          Get the API
          <ArrowRight className="size-4" data-icon />
        </Button>
      </div>
    </section>
  );
}
