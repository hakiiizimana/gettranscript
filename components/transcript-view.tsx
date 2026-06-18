"use client";

import { ExternalLink } from "lucide-react";
import { useState } from "react";

import { Tip } from "@/components/tip";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { formatTimestampMs, youtubeTimestampUrl } from "@/lib/formats";
import type { TranscriptResult } from "@/lib/types";

interface TranscriptViewProps {
  transcript: TranscriptResult;
}

export function TranscriptView({ transcript }: TranscriptViewProps) {
  const [timestampMode, setTimestampMode] = useState(true);

  return (
    <div className="overflow-hidden rounded-2xl border border-border/45 bg-card transition-colors hover:border-border/70">
      <div className="flex flex-wrap items-center justify-between gap-3 border-border/45 border-b px-5 py-4">
        <p className="font-mono font-semibold text-sm leading-snug">
          Transcript
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={timestampMode}
              id="timestamp-mode"
              onCheckedChange={setTimestampMode}
            />
            <Label
              className="cursor-pointer font-mono text-muted-foreground text-xs"
              htmlFor="timestamp-mode"
            >
              {timestampMode ? "Timestamps on" : "Plain text"}
            </Label>
          </div>
          <p className="font-mono text-muted-foreground text-xs">
            {transcript.segments.length} lines · {transcript.language}
          </p>
        </div>
      </div>

      <div className="scrollbar-none max-h-[32rem] overflow-y-auto sm:max-h-[36rem]">
        {timestampMode ? (
          <ol className="divide-y divide-border/35">
            {transcript.segments.map((seg) => {
              const time = formatTimestampMs(seg.start);
              const href = youtubeTimestampUrl(transcript.videoUrl, seg.start);

              return (
                <li
                  className="group flex gap-3 px-5 py-3.5 transition-colors hover:bg-muted/25 sm:gap-4 sm:py-4"
                  key={`${seg.start}-${seg.duration}-${seg.text}`}
                >
                  <Tip label={`Open at ${time} on YouTube`}>
                    <a
                      className="flex shrink-0 cursor-pointer items-start gap-1 rounded-md bg-foreground px-2 py-1 font-medium font-mono text-background text-xs tabular-nums transition-opacity hover:opacity-80"
                      href={href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {time}
                      <ExternalLink className="mt-px size-2.5 opacity-60" />
                    </a>
                  </Tip>
                  <p className="min-w-0 flex-1 pt-0.5 font-mono text-foreground text-sm leading-relaxed">
                    {seg.text}
                  </p>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="px-5 py-4">
            <p className="font-mono text-foreground text-sm leading-relaxed">
              {transcript.plainText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
