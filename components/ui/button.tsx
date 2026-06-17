"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import {
  focusRing,
  pressable,
  softRadius,
  softShadow,
  surfaceSoft,
  surfaceSoftHover,
  transitionBase,
} from "@/lib/ui-styles";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium text-sm disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
    focusRing,
    pressable,
    transitionBase
  ),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-border/60 bg-muted/30 text-foreground hover:bg-muted/50 hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-foreground hover:bg-muted/60 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        soft: cn(
          softRadius,
          softShadow,
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg active:shadow-sm"
        ),
        "soft-outline": cn(
          softRadius,
          surfaceSoft,
          surfaceSoftHover,
          "text-foreground hover:border-border/60"
        ),
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-7 rounded-lg px-2.5 text-xs",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        soft: cn(softRadius, "h-11 px-6 text-sm"),
        icon: "size-9",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ variant, size, className }))}
      data-slot="button"
      {...props}
    />
  );
}

export { Button };
