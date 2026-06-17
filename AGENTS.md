# gettranscript

Free YouTube transcript tool. Paste a URL, get captions with timestamps. Copy or download TXT, SRT, or JSON. No signup.

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, Bun
- [Stophy](https://docs.stophy.dev) for transcripts — server-side only, never scrape YouTube

## Architecture

```
app/page.tsx                 # Landing + transcript card
app/api/transcript/route.ts  # Rate limit → Stophy → respond
lib/stophy.ts                # Stophy client
lib/rate-limit.ts            # 10 requests / day per IP
lib/formats.ts               # txt, srt, json exports
components/transcript-card.tsx
components/transcript-view.tsx
```

- `STOPHY_API_KEY` in `.env` — never expose to the client
- Demo video bypasses rate limit and Stophy (cached in `data/demo-transcript.json`)
- Map Stophy errors to friendly messages in `lib/errors.ts`

## Commands

```bash
bun dev
bun run build
bun run lint      # ultracite check
bun run fix       # ultracite fix
```

Run `bun run fix` before committing. `components/ui/` is elorm-generated — don't hand-edit unless needed.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) with a scope:

```
feat(ui): add transcript download buttons
fix(api): handle rate limit retry header
chore(deps): bump next
```

**Types:** `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`

**Scopes:** `ui`, `api`, `lib`, `config`, `deps`

Examples:
- `feat(ui): ...` — pages, components, styling
- `fix(api): ...` — route handlers, Stophy integration
- `chore(config): ...` — biome, tailwind, env

Only commit when the user asks. Never commit secrets.

## Conventions

- Functional components, Tailwind utilities, minimal deps
- Human copy, no em dashes
- SEO: clear H1, meta in `layout.tsx`, fast landing page

## Out of scope

Accounts, billing, bulk channel extraction, AI summarization.

<!-- BEGIN:nextjs-agent-rules -->
## Next.js

This is NOT the Next.js you know. Read `node_modules/next/dist/docs/` before writing Next.js code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
