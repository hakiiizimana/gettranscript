import { Braces, FileText, Subtitles } from "lucide-react";
import Link from "next/link";
import type { ExportFormat, SeoPage } from "@/lib/seo-pages";
import { seoPages } from "@/lib/seo-pages";
import { cn } from "@/lib/utils";

const formatIcons = {
  txt: FileText,
  srt: Subtitles,
  json: Braces,
} as const;

interface FormatEyebrowProps {
  active?: boolean;
  eyebrow: string;
  format: ExportFormat;
  href?: string;
}

export function FormatEyebrow({
  active = false,
  eyebrow,
  format,
  href,
}: FormatEyebrowProps) {
  const Icon = formatIcons[format];

  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-medium font-mono text-[11px] uppercase tracking-wider transition-colors",
        active
          ? "border-orange-500/30 bg-orange-500/10 text-orange-600"
          : "border-border/45 bg-muted/20 text-muted-foreground hover:border-border/70 hover:text-foreground"
      )}
    >
      <Icon className="size-3" />
      {eyebrow}
    </span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

interface FormatNavProps {
  current: SeoPage;
}

export function FormatNav({ current }: FormatNavProps) {
  return (
    <nav
      aria-label="Export formats"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {seoPages.map((page) => (
        <FormatEyebrow
          active={page.slug === current.slug}
          eyebrow={page.formatEyebrow}
          format={page.format}
          href={page.path}
          key={page.slug}
        />
      ))}
    </nav>
  );
}
