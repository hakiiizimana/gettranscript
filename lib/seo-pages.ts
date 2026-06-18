export interface SeoPage {
  bullets: string[];
  cta: string;
  description: string;
  h1: string;
  intro: string;
  path: string;
  slug: string;
  title: string;
}

export const seoPages: SeoPage[] = [
  {
    slug: "youtube-transcript-to-txt",
    path: "/youtube-transcript-to-txt",
    title: "YouTube Transcript to TXT Converter",
    description:
      "Convert any YouTube video transcript to plain TXT. Paste a link, download caption text with one click. Free, no account.",
    h1: "YouTube transcript to TXT",
    intro:
      "Need the spoken words from a video as plain text? Paste a YouTube URL and download a .txt file you can paste into docs, notes, or AI tools.",
    bullets: [
      "Plain text output with no timing codes",
      "Works with watch URLs, Shorts, and youtu.be links",
      "Copy to clipboard or download instantly",
      "Free with no signup",
    ],
    cta: "Convert to TXT",
  },
  {
    slug: "youtube-transcript-to-srt",
    path: "/youtube-transcript-to-srt",
    title: "YouTube Transcript to SRT Converter",
    description:
      "Turn YouTube captions into SRT subtitle files. Paste a link, get timed subtitles ready for editors and players. Free, no account.",
    h1: "YouTube transcript to SRT",
    intro:
      "Download YouTube captions as an SRT subtitle file with timestamps. Ideal for video editors, players, and accessibility workflows.",
    bullets: [
      "Standard SRT format with start and end times",
      "Ready for Premiere, DaVinci, VLC, and other tools",
      "Pulls captions directly from the source video",
      "Free with no signup",
    ],
    cta: "Convert to SRT",
  },
  {
    slug: "youtube-transcript-to-json",
    path: "/youtube-transcript-to-json",
    title: "YouTube Transcript to JSON Exporter",
    description:
      "Export YouTube transcripts as structured JSON with segments and timestamps. Paste a link and download. Free, no account.",
    h1: "YouTube transcript to JSON",
    intro:
      "Get transcript data as structured JSON with segments, timestamps, and language metadata. Built for developers, scripts, and automation.",
    bullets: [
      "Segment-level start times, durations, and text",
      "Includes video ID and language fields",
      "Easy to parse in code or no-code tools",
      "Free with no signup",
    ],
    cta: "Export as JSON",
  },
];

export function getSeoPage(slug: string): SeoPage {
  const page = seoPages.find((entry) => entry.slug === slug);
  if (!page) {
    throw new Error(`Unknown SEO page: ${slug}`);
  }
  return page;
}

export const seoPagePaths = seoPages.map((page) => page.path);
