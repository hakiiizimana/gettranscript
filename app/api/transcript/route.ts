import { NextResponse } from "next/server";

import { isDemoVideoUrl } from "@/lib/constants";
import { getDemoTranscript } from "@/lib/demo-cache";
import { AppError, ErrorCode, errorResponse } from "@/lib/errors";
import { checkRateLimit } from "@/lib/rate-limit";
import { fetchTranscript } from "@/lib/stophy";
import { isYouTubeUrl, normalizeYouTubeUrl } from "@/lib/youtube";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  let body: { videoUrl?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      errorResponse(new AppError(ErrorCode.BAD_REQUEST)),
      { status: 400 }
    );
  }

  const rawUrl = body.videoUrl?.trim();
  if (!rawUrl) {
    return NextResponse.json(errorResponse(new AppError(ErrorCode.EMPTY_URL)), {
      status: 400,
    });
  }

  if (!isYouTubeUrl(rawUrl)) {
    return NextResponse.json(
      errorResponse(new AppError(ErrorCode.INVALID_URL)),
      {
        status: 400,
      }
    );
  }

  let videoUrl: string;
  try {
    videoUrl = normalizeYouTubeUrl(rawUrl);
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(errorResponse(error), { status: error.status });
    }
    return NextResponse.json(
      errorResponse(new AppError(ErrorCode.INVALID_URL)),
      {
        status: 400,
      }
    );
  }

  if (isDemoVideoUrl(videoUrl)) {
    try {
      const transcript = await getDemoTranscript();
      return NextResponse.json(
        { success: true, data: transcript },
        { headers: { "Cache-Control": "public, max-age=31536000, immutable" } }
      );
    } catch (error) {
      console.error("Demo cache read failed:", error);
      return NextResponse.json(
        errorResponse(new AppError(ErrorCode.DEMO_UNAVAILABLE, 500)),
        { status: 500 }
      );
    }
  }

  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    const err = new AppError(ErrorCode.RATE_LIMITED, 429);
    return NextResponse.json(errorResponse(err), {
      status: 429,
      headers: { "Retry-After": String(rateLimit.retryAfter) },
    });
  }

  try {
    const transcript = await fetchTranscript(videoUrl);
    return NextResponse.json({ success: true, data: transcript });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(errorResponse(error), { status: error.status });
    }

    console.error("Transcript fetch failed:", error);
    return NextResponse.json(
      errorResponse(new AppError(ErrorCode.UNKNOWN, 500)),
      {
        status: 500,
      }
    );
  }
}
