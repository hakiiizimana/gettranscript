import Link from "next/link";

import { FormatEyebrow } from "@/components/format-eyebrow";
import { seoPages } from "@/lib/seo-pages";

export function Footer() {
  return (
    <footer className="relative border-border/50 border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-center lg:px-10">
        <nav className="flex flex-wrap items-center justify-center gap-2">
          {seoPages.map((page) => (
            <FormatEyebrow
              eyebrow={page.formatEyebrow}
              format={page.format}
              href={page.path}
              key={page.slug}
            />
          ))}
        </nav>
        <p className="font-mono text-muted-foreground text-xs">
          Built by{" "}
          <Link
            className="text-foreground transition-colors hover:underline"
            href="/"
          >
            gettranscript
          </Link>
          {" · "}
          Powered by{" "}
          <a
            className="text-foreground transition-colors hover:underline"
            href="https://stophy.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            Stophy
          </a>
        </p>
      </div>
    </footer>
  );
}
