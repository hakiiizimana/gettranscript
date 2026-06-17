"use client";

import type { ReactElement } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TipProps {
  children: ReactElement;
  label: string;
}

export function Tip({ label, children }: TipProps) {
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent className="rounded-full px-3 py-1.5 font-mono text-[11px] tracking-wide">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
