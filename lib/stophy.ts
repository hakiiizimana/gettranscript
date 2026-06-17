import { AppError, ErrorCode, fromStophyCode } from "@/lib/errors";
import type { TranscriptResult } from "@/lib/types";
import { getYouTubeThumbnailUrl, normalizeYouTubeUrl } from "@/lib/youtube";

const STOPHY_URL = "https://api.stophy.dev/v1/video";

type StophyRequestType = "transcript" | "details";

interface StophySegment {
  duration: number;
  start: number;
  text: string;
}

interface StophyTranscriptData {
  language?: { code?: string; name?: string };
  segments?: StophySegment[];
  videoId: string;
}

interface StophyDetailsData {
  video: {
    id: string;
    videoUrl: string;
    title: string;
    author: string;
    description: string | null;
  };
}

interface StophySuccess<T> {
  data: T;
  success: true;
}

interface StophyError {
  code?: string;
  error?: string;
  success: false;
}

async function callStophy<T>(
  videoUrl: string,
  type: StophyRequestType,
  retry = true
): Promise<StophySuccess<T>> {
  const apiKey = process.env.STOPHY_API_KEY;
  if (!apiKey) {
    console.error("STOPHY_API_KEY is not configured");
    throw new AppError(ErrorCode.SERVICE_UNAVAILABLE, 500);
  }

  const res = await fetch(STOPHY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoUrl, type }),
  });

  let json: StophySuccess<T> | StophyError;
  try {
    json = (await res.json()) as StophySuccess<T> | StophyError;
  } catch {
    throw new AppError(ErrorCode.UNKNOWN, 500);
  }

  if (!(res.ok && json.success)) {
    const err = json as StophyError;
    const code = err.code ?? "INTERNAL_ERROR";

    if (retry && code === "CONCURRENCY_LIMITED") {
      await new Promise((r) => setTimeout(r, 600));
      return callStophy(videoUrl, type, false);
    }

    console.error("Stophy error:", code, err.error);
    throw fromStophyCode(code);
  }

  return json;
}

function normalizeTranscript(
  transcript: StophyTranscriptData,
  details: StophyDetailsData,
  canonicalUrl: string
): TranscriptResult {
  const segments = transcript.segments ?? [];
  const { video } = details;

  return {
    videoId: transcript.videoId,
    videoUrl: canonicalUrl || video.videoUrl,
    title: video.title,
    author: video.author,
    thumbnailUrl: getYouTubeThumbnailUrl(transcript.videoId),
    language:
      transcript.language?.code ?? transcript.language?.name ?? "unknown",
    plainText: segments
      .map((s) => s.text)
      .join(" ")
      .trim(),
    segments,
  };
}

export async function fetchTranscript(
  inputUrl: string
): Promise<TranscriptResult> {
  const videoUrl = normalizeYouTubeUrl(inputUrl);
  const transcriptResult = await callStophy<StophyTranscriptData>(
    videoUrl,
    "transcript"
  );
  const detailsResult = await callStophy<StophyDetailsData>(
    videoUrl,
    "details"
  );
  return normalizeTranscript(
    transcriptResult.data,
    detailsResult.data,
    videoUrl
  );
}
