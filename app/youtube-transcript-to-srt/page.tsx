import { buildSeoPageMetadata, SeoLanding } from "@/components/seo-landing";
import { getSeoPage } from "@/lib/seo-pages";

const page = getSeoPage("youtube-transcript-to-srt");

export const metadata = buildSeoPageMetadata(page);

export default function YoutubeTranscriptToSrtPage() {
  return <SeoLanding page={page} />;
}
