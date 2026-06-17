import { readFile } from "node:fs/promises";
import path from "node:path";

import { DEMO_VIDEO_ID } from "@/lib/constants";
import type { TranscriptResult } from "@/lib/types";

const CACHE_PATH = path.join(process.cwd(), "data", "demo-transcript.json");

let memoryCache: TranscriptResult | null = null;

export async function getDemoTranscript(): Promise<TranscriptResult> {
  if (memoryCache) {
    return memoryCache;
  }

  const raw = await readFile(CACHE_PATH, "utf-8");
  const parsed = JSON.parse(raw) as TranscriptResult;

  if (parsed.videoId !== DEMO_VIDEO_ID) {
    throw new Error("Demo cache video ID mismatch");
  }

  memoryCache = parsed;
  return parsed;
}
