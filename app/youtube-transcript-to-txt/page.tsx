import { buildSeoPageMetadata, SeoLanding } from "@/components/seo-landing";
import { getSeoPage } from "@/lib/seo-pages";

const page = getSeoPage("youtube-transcript-to-txt");

export const metadata = buildSeoPageMetadata(page);

export default function YoutubeTranscriptToTxtPage() {
  return <SeoLanding page={page} />;
}
