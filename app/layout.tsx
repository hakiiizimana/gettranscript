import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free YouTube Transcript Generator & Downloader | TXT, SRT, JSON",
  description:
    "Paste a YouTube link, get the full transcript with timestamps. Copy it or download as TXT, SRT, or JSON. No account.",
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
