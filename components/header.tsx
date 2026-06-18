"use client";

import { ArrowRight, Moon, Sun } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { useTheme } from "@/components/theme-provider";
import { Tip } from "@/components/tip";
import { cn } from "@/lib/utils";

export function Header() {
  const { isDark, setIsDark } = useTheme();

  return (
    <header className="relative border-border/50 border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6 lg:px-10">
        <Link
          className="inline-flex items-center gap-2 font-mono font-semibold text-foreground text-sm tracking-tight"
          href="/"
        >
          <Logo size={18} />
          gettranscript
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="flex items-center gap-3 sm:gap-4">
            <Link
              className="font-mono text-muted-foreground text-xs transition-colors hover:text-foreground"
              href="/#faq"
            >
              FAQ
            </Link>
            <Link
              className="font-mono text-muted-foreground text-xs transition-colors hover:text-foreground"
              href="/#how-it-works"
            >
              How it works
            </Link>
            <a
              className="inline-flex items-center gap-1 font-mono text-muted-foreground text-xs transition-colors hover:text-foreground"
              href="https://stophy.dev"
              rel="noopener noreferrer"
              target="_blank"
            >
              Powered by Stophy
              <ArrowRight className="size-3" />
            </a>
          </nav>

          <div className="flex items-center gap-1 rounded-full border border-border/45 bg-muted/30 p-1">
            <Tip label="Light mode">
              <button
                aria-label="Light mode"
                aria-pressed={!isDark}
                className={cn(
                  "cursor-pointer rounded-full p-1.5 transition-colors",
                  isDark
                    ? "text-muted-foreground hover:text-foreground"
                    : "bg-background text-foreground shadow-xs"
                )}
                onClick={() => setIsDark(false)}
                type="button"
              >
                <Sun className="size-3.5" data-icon />
              </button>
            </Tip>
            <Tip label="Dark mode">
              <button
                aria-label="Dark mode"
                aria-pressed={isDark}
                className={cn(
                  "cursor-pointer rounded-full p-1.5 transition-colors",
                  isDark
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setIsDark(true)}
                type="button"
              >
                <Moon className="size-3.5" data-icon />
              </button>
            </Tip>
          </div>
        </div>
      </div>
    </header>
  );
}
