export interface TranscriptSegment {
  duration: number;
  start: number;
  text: string;
}

export interface TranscriptResult {
  author?: string;
  language: string;
  plainText: string;
  segments: TranscriptSegment[];
  thumbnailUrl: string;
  title?: string;
  videoId: string;
  videoUrl: string;
}
