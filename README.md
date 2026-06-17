# gettranscript

**Free YouTube transcript generator.** Paste a link, get the full transcript with timestamps. Copy it or download TXT, SRT, or JSON. No account.

Built with [Next.js](https://nextjs.org) and powered by [Stophy](https://stophy.dev).

---

## What it does

- Pulls YouTube captions from a URL (watch, Shorts, youtu.be)
- Shows timestamped lines you can click to jump on YouTube
- Copies plain text to clipboard
- Exports **TXT**, **SRT**, or **JSON**
- Includes a **Demo** button with a cached sample transcript

No signup wall on the tool. Just paste and go.

## Try it locally

```bash
bun install
cp .env.example .env.local   # add your Stophy key
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

```bash
# .env.local
STOPHY_API_KEY=st_your_key_here
```

Get a key at [stophy.dev](https://stophy.dev). The key stays server-side only.

## How it works

```
Browser → POST /api/transcript → rate limit → Stophy API → normalized transcript
```

1. Paste a YouTube URL
2. Server fetches captions via Stophy
3. You read, copy, or download the result

Demo requests skip Stophy and load from `data/demo-transcript.json`. Live requests are capped at **10 per IP per day**.

## Need this in your code?

gettranscript runs on **Stophy**, the API to search YouTube, get transcripts, read comments, and inspect channels at scale.

- [Stophy docs](https://docs.stophy.dev)
- API, CLI, and MCP server for agents and apps

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4, [elorm/ui](https://www.npmjs.com/package/elorm) |
| Transcripts | [Stophy](https://docs.stophy.dev) |
| Runtime | Bun |
| Lint / format | [Ultracite](https://ultracite.ai) + Biome |

## Scripts

```bash
bun dev          # local dev server
bun run build    # production build
bun run start    # run production build
bun run lint     # ultracite check
bun run fix      # format and auto-fix
```

## Project layout

```
app/
  page.tsx                    # landing page
  api/transcript/route.ts     # transcript API
components/
  transcript-card.tsx         # URL input + results
  transcript-view.tsx         # timestamped transcript
lib/
  stophy.ts                   # Stophy client
  rate-limit.ts               # per-IP limits
  formats.ts                  # txt / srt / json exports
```

