export const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://stophy.dev"
).replace(/\/$/, "");

export const siteName = "gettranscript";

export const siteDescription =
  "Paste a YouTube link, get the full transcript with timestamps. Copy it or download as TXT, SRT, or JSON. No account.";

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteOrigin}${normalized}`;
}
