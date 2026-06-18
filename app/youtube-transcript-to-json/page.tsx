import { SeoLanding } from "@/components/seo-landing";
import { buildSeoPageMetadata } from "@/lib/seo";
import { getSeoPage } from "@/lib/seo-pages";

const page = getSeoPage("youtube-transcript-to-json");

export const metadata = buildSeoPageMetadata(page);

export default function YoutubeTranscriptToJsonPage() {
  return <SeoLanding page={page} />;
}
