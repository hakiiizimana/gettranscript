import { absoluteUrl, siteDescription, siteName } from "@/lib/site";

export function getLlmsTxt(): string {
  const home = absoluteUrl("/");

  return `# ${siteName}

> ${siteDescription}

Free YouTube transcript generator by Stophy. Paste a watch, Shorts, or youtu.be link and get timestamped captions you can copy or export as TXT, SRT, or JSON.

## Pages

- [${siteName}](${home}): Main transcript tool with URL input, live preview, copy, and download

## Features

- YouTube transcript extraction from public video URLs
- Timestamped transcript view with optional plain-text mode
- Export formats: TXT, SRT, JSON
- Demo mode with a cached sample transcript
- No account required for the web tool

## Powered by

- [Stophy](https://stophy.dev): YouTube data API for transcripts, search, comments, and channels
- [Stophy docs](https://docs.stophy.dev): API reference, CLI, and MCP server

## Crawling

- Sitemap: ${absoluteUrl("/sitemap.xml")}
- Robots: ${absoluteUrl("/robots.txt")}
`;
}
