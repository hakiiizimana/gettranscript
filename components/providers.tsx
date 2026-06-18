"use client";

import { SmoothHashScroll } from "@/components/smooth-hash-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delay={200}>
      <ThemeProvider>
        <SmoothHashScroll />
        {children}
      </ThemeProvider>
    </TooltipProvider>
  );
}
