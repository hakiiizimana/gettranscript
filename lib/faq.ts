export interface FaqItem {
  answer: string;
  question: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "How do I get a transcript from a YouTube video?",
    answer:
      "Paste any public YouTube URL into gettranscript and click Get transcript. We fetch the captions and show them with timestamps. You can copy the text or download a file.",
  },
  {
    question: "Is gettranscript free?",
    answer:
      "Yes. The web tool is free with no account required. Paste a link, read the transcript, and export it at no cost.",
  },
  {
    question: "What download formats are supported?",
    answer:
      "You can export transcripts as plain TXT, subtitle SRT, or structured JSON. All three include the caption text from the video.",
  },
  {
    question: "Does it work with YouTube Shorts and youtu.be links?",
    answer:
      "Yes. Watch URLs, Shorts, and short youtu.be links are supported as long as the video has captions available.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is needed. Open the site, paste a YouTube link, and get your transcript immediately.",
  },
  {
    question: "Can I use the transcript in my own project or app?",
    answer:
      "Yes. gettranscript is powered by Stophy, which offers an API, CLI, and MCP server for fetching YouTube transcripts at scale in your own code.",
  },
];
