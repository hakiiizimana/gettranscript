"use client";

import { Copy, Download, Eye, Flame, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Tip } from "@/components/tip";
import { TranscriptView } from "@/components/transcript-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DEMO_VIDEO_URL } from "@/lib/constants";
import { ERROR_MESSAGES, ErrorCode } from "@/lib/errors";
import { toJson, toSrt, toTxt } from "@/lib/formats";
import type { TranscriptResult } from "@/lib/types";
import { normalizeYouTubeUrl } from "@/lib/youtube";

function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function TranscriptCard() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptResult | null>(null);
  const [copied, setCopied] = useState(false);

  async function fetchTranscriptForUrl(rawUrl: string) {
    setLoading(true);
    setError(null);
    setTranscript(null);

    let videoUrl: string;
    try {
      videoUrl = normalizeYouTubeUrl(rawUrl);
      setUrl(videoUrl);
    } catch {
      setError(ERROR_MESSAGES[ErrorCode.INVALID_URL]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? ERROR_MESSAGES[ErrorCode.UNKNOWN]);
        return;
      }

      setTranscript(json.data);
    } catch {
      setError(ERROR_MESSAGES[ErrorCode.UNKNOWN]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) {
      setError(ERROR_MESSAGES[ErrorCode.EMPTY_URL]);
      return;
    }
    await fetchTranscriptForUrl(url.trim());
  }

  async function handleDemo() {
    await fetchTranscriptForUrl(DEMO_VIDEO_URL);
  }

  async function handleCopy() {
    if (!transcript) {
      return;
    }
    await navigator.clipboard.writeText(transcript.plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const baseName = transcript?.videoId ?? "transcript";

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Flame className="size-3.5 text-orange-500" />
          <span className="font-medium font-mono text-[11px] text-orange-600 uppercase tracking-wider">
            Free
          </span>
        </div>
        <CardAction>
          <Tip label="Try it with a sample video">
            <Button
              className="h-7 gap-1.5 rounded-full px-3 text-xs"
              disabled={loading}
              onClick={handleDemo}
              size="sm"
              type="button"
              variant="outline"
            >
              <Eye className="size-3" data-icon />
              Demo
            </Button>
          </Tip>
        </CardAction>
        <CardTitle className="text-center font-medium font-mono text-lg">
          Paste a link, get the transcript
        </CardTitle>
        <CardDescription className="text-center font-mono text-sm leading-relaxed">
          Drop a YouTube URL. Copy the text or download a file.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <form noValidate onSubmit={handleSubmit}>
          <FieldGroup>
            <Field data-invalid={!!error}>
              <FieldLabel className="sr-only" htmlFor="video-url">
                YouTube URL
              </FieldLabel>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  autoComplete="off"
                  className="h-10 flex-1 rounded-xl font-mono text-sm"
                  disabled={loading}
                  id="video-url"
                  inputMode="url"
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (error) {
                      setError(null);
                    }
                  }}
                  placeholder="https://www.youtube.com/watch?v=..."
                  spellCheck={false}
                  type="text"
                  value={url}
                />
                <Button
                  className="h-10 shrink-0 rounded-xl px-5 text-sm"
                  disabled={!url.trim() || loading}
                  size="lg"
                  type="submit"
                  variant="outline"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" data-icon />
                      One sec…
                    </>
                  ) : (
                    "Get transcript"
                  )}
                </Button>
              </div>
              {error && <FieldError>{error}</FieldError>}
            </Field>
          </FieldGroup>
        </form>

        {transcript && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <a
                className="relative block aspect-video w-20 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border/45 transition-opacity hover:opacity-90 sm:w-24"
                href={transcript.videoUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  alt={
                    transcript.title
                      ? `Thumbnail for ${transcript.title}`
                      : "YouTube video thumbnail"
                  }
                  className="object-cover"
                  fill
                  sizes="96px"
                  src={transcript.thumbnailUrl}
                />
              </a>

              <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
                <Tip label="Copy the full text">
                  <Button
                    className="h-8 gap-1.5 rounded-full px-3 text-xs"
                    onClick={handleCopy}
                    size="sm"
                    type="button"
                    variant="outline"
                  >
                    <Copy className="size-3" data-icon />
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </Tip>
                <Tip label="Save as plain text">
                  <Button
                    className="h-8 gap-1.5 rounded-full px-3 text-xs"
                    onClick={() =>
                      downloadFile(
                        toTxt(transcript),
                        `${baseName}.txt`,
                        "text/plain"
                      )
                    }
                    size="sm"
                    type="button"
                    variant="outline"
                  >
                    <Download className="size-3" data-icon />
                    .txt
                  </Button>
                </Tip>
                <Tip label="Save as subtitles">
                  <Button
                    className="h-8 gap-1.5 rounded-full px-3 text-xs"
                    onClick={() =>
                      downloadFile(
                        toSrt(transcript),
                        `${baseName}.srt`,
                        "text/plain"
                      )
                    }
                    size="sm"
                    type="button"
                    variant="outline"
                  >
                    <Download className="size-3" data-icon />
                    .srt
                  </Button>
                </Tip>
                <Tip label="Save as JSON">
                  <Button
                    className="h-8 gap-1.5 rounded-full px-3 text-xs"
                    onClick={() =>
                      downloadFile(
                        toJson(transcript),
                        `${baseName}.json`,
                        "application/json"
                      )
                    }
                    size="sm"
                    type="button"
                    variant="outline"
                  >
                    <Download className="size-3" data-icon />
                    .json
                  </Button>
                </Tip>
              </div>
            </div>

            <TranscriptView transcript={transcript} />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-border/40 border-t pt-4">
        <p className="font-mono text-muted-foreground text-xs">
          No account needed
        </p>
        <Badge className="font-mono font-normal text-[10px]" variant="soft">
          .txt · .srt · .json
        </Badge>
      </CardFooter>
    </Card>
  );
}
