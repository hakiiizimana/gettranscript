import { AppError, ErrorCode } from "@/lib/errors";

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "youtu.be",
]);

const PATH_ID_PATTERN = /^\/(shorts|embed|live|v)\/([^/?#]+)/;
const VIDEO_ID_PATTERN = /^[\w-]{11}$/;
const WWW_PREFIX = /^www\./;

function parseInputUrl(input: string): URL | null {
  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }

  try {
    return trimmed.startsWith("http")
      ? new URL(trimmed)
      : new URL(`https://${trimmed}`);
  } catch {
    return null;
  }
}

export function extractVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }

  if (VIDEO_ID_PATTERN.test(trimmed)) {
    return trimmed;
  }

  const parsed = parseInputUrl(trimmed);
  if (!parsed) {
    return null;
  }

  const host = parsed.hostname.replace(WWW_PREFIX, "");
  if (!YOUTUBE_HOSTS.has(host)) {
    return null;
  }

  if (host === "youtu.be") {
    const id = parsed.pathname.slice(1).split("/")[0];
    return id || null;
  }

  const fromQuery = parsed.searchParams.get("v");
  if (fromQuery) {
    return fromQuery;
  }

  const fromPath = parsed.pathname.match(PATH_ID_PATTERN);
  if (fromPath) {
    return fromPath[2];
  }

  return null;
}

export function isYouTubeUrl(input: string): boolean {
  return extractVideoId(input) !== null;
}

export function normalizeYouTubeUrl(input: string): string {
  const id = extractVideoId(input);
  if (!id) {
    throw new AppError(ErrorCode.INVALID_URL);
  }
  return `https://www.youtube.com/watch?v=${id}`;
}

export function getYouTubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
