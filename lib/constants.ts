import { extractVideoId } from "@/lib/youtube";

export const DEMO_VIDEO_ID = "A-IJ5QmeXpk";
export const DEMO_VIDEO_URL = "https://www.youtube.com/watch?v=A-IJ5QmeXpk";

export function isDemoVideoUrl(url: string): boolean {
  return extractVideoId(url) === DEMO_VIDEO_ID;
}
