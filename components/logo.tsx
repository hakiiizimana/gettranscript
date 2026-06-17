import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 16 }: LogoProps) {
  return (
    <svg
      aria-hidden
      className={cn("shrink-0", className)}
      fill="none"
      height={size}
      viewBox="0 0 32 32"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>gettranscript</title>
      <rect className="fill-foreground" height="32" rx="9" width="32" />
      <rect
        className="fill-background"
        height="3.5"
        rx="1.75"
        width="7"
        x="7"
        y="9"
      />
      <rect
        className="fill-background/80"
        height="3.5"
        rx="1.75"
        width="5.5"
        x="7"
        y="14.25"
      />
      <rect
        className="fill-background/60"
        height="3.5"
        rx="1.75"
        width="6.5"
        x="7"
        y="19.5"
      />
      <rect
        className="fill-background"
        height="1.75"
        rx="0.875"
        width="9"
        x="16"
        y="10.25"
      />
      <rect
        className="fill-background/75"
        height="1.75"
        rx="0.875"
        width="11"
        x="16"
        y="15.5"
      />
      <rect
        className="fill-background/55"
        height="1.75"
        rx="0.875"
        width="7.5"
        x="16"
        y="20.75"
      />
    </svg>
  );
}
