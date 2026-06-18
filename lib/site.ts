export const siteOrigin = "https://www.gettranscript.xyz";

export const siteName = "gettranscript";

export const siteDescription =
  "Paste a YouTube link, get the full transcript with timestamps. Copy it or download as TXT, SRT, or JSON. No account.";

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteOrigin}${normalized}`;
}
