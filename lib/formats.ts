import type { TranscriptResult } from "@/lib/types";

function pad(n: number, len = 2): string {
  return String(n).padStart(len, "0");
}

function toSrtTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds % 1) * 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms, 3)}`;
}

export function toTxt(transcript: TranscriptResult): string {
  return transcript.plainText;
}

export function toSrt(transcript: TranscriptResult): string {
  return transcript.segments
    .map((seg, i) => {
      const end = seg.start + seg.duration;
      return `${i + 1}\n${toSrtTime(seg.start)} --> ${toSrtTime(end)}\n${seg.text}\n`;
    })
    .join("\n");
}

export function toJson(transcript: TranscriptResult): string {
  return JSON.stringify(transcript, null, 2);
}

export function formatTimestamp(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) {
    return `${h}:${pad(m)}:${pad(s)}`;
  }
  return `${m}:${pad(s)}`;
}

export function formatTimestampMs(seconds: number): string {
  const base = formatTimestamp(seconds);
  const ms = Math.floor((seconds % 1) * 100);
  return ms > 0 ? `${base}.${pad(ms)}` : base;
}

export function youtubeTimestampUrl(videoUrl: string, seconds: number): string {
  const url = new URL(videoUrl);
  url.searchParams.set("t", `${Math.floor(seconds)}s`);
  return url.toString();
}
