export const ErrorCode = {
  EMPTY_URL: "EMPTY_URL",
  INVALID_URL: "INVALID_URL",
  NO_CAPTIONS: "NO_CAPTIONS",
  VIDEO_NOT_FOUND: "VIDEO_NOT_FOUND",
  RATE_LIMITED: "RATE_LIMITED",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  DEMO_UNAVAILABLE: "DEMO_UNAVAILABLE",
  BAD_REQUEST: "BAD_REQUEST",
  UNKNOWN: "UNKNOWN",
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  EMPTY_URL: "Paste a YouTube link first.",
  INVALID_URL:
    "That doesn't look like a YouTube link. Try a watch URL, Shorts, or youtu.be.",
  NO_CAPTIONS: "No captions on this video. Try another one.",
  VIDEO_NOT_FOUND: "Can't find that video. Check the link and try again.",
  RATE_LIMITED: "Too many requests today. Try again tomorrow.",
  SERVICE_UNAVAILABLE: "Transcripts are down for a minute. Try again soon.",
  DEMO_UNAVAILABLE: "Demo isn't loading right now. Try again in a bit.",
  BAD_REQUEST: "Something's off with that link. Check it and retry.",
  UNKNOWN: "Couldn't fetch the transcript. Try again.",
};

export class AppError extends Error {
  code: ErrorCode;
  status: number;

  constructor(code: ErrorCode, status = 400) {
    super(ERROR_MESSAGES[code]);
    this.code = code;
    this.status = status;
  }
}

export function fromStophyCode(code: string): AppError {
  switch (code) {
    case "INVALID_INPUT":
      return new AppError(ErrorCode.NO_CAPTIONS, 400);
    case "NOT_FOUND":
      return new AppError(ErrorCode.VIDEO_NOT_FOUND, 400);
    case "BAD_REQUEST":
      return new AppError(ErrorCode.BAD_REQUEST, 400);
    case "CONCURRENCY_LIMITED":
      return new AppError(ErrorCode.RATE_LIMITED, 429);
    case "INSUFFICIENT_CREDITS":
      return new AppError(ErrorCode.SERVICE_UNAVAILABLE, 503);
    case "UNAUTHORIZED":
    case "INTERNAL_ERROR":
      return new AppError(ErrorCode.SERVICE_UNAVAILABLE, 500);
    default:
      return new AppError(ErrorCode.UNKNOWN, 500);
  }
}

export function errorResponse(error: AppError) {
  return { error: error.message, code: error.code };
}
