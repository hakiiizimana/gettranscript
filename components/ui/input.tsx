import type * as React from "react";
import { focusRing, surfaceInput, transitionBase } from "@/lib/ui-styles";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-9 w-full rounded-lg border px-3 py-1 text-base shadow-xs file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        surfaceInput,
        focusRing,
        transitionBase,
        className
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export { Input };
