import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { absoluteUrl, siteDescription, siteName } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Free YouTube Transcript Generator & Downloader | TXT, SRT, JSON";

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "youtube transcript",
    "youtube transcript generator",
    "youtube transcript downloader",
    "free youtube transcript",
    "youtube captions",
    "youtube subtitles",
    "txt srt json transcript",
    "youtube transcript tool",
    "youtube transcript to txt",
    "youtube transcript to srt",
    "youtube transcript to json",
  ],
  authors: [{ name: siteName, url: absoluteUrl("/") }],
  creator: "Stophy",
  publisher: "Stophy",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: absoluteUrl("/"),
    types: {
      "text/plain": absoluteUrl("/llms.txt"),
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName,
    title,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteDescription,
  },
  verification: googleSiteVerification
    ? { google: googleSiteVerification }
    : undefined,
  other: {
    "llms-txt": absoluteUrl("/llms.txt"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link
          href={absoluteUrl("/llms.txt")}
          rel="alternate"
          type="text/plain"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("gettranscript-theme");var d=t!=="light";if(d)document.documentElement.classList.add("dark");else document.documentElement.classList.remove("dark")}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Providers>
          <AppShell>
            <Header />
            {children}
            <Footer />
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
