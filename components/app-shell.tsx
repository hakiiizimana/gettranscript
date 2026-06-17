export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.9_0_0/0.45)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.9_0_0/0.45)_1px,transparent_1px)] bg-size-[48px_48px] dark:bg-[linear-gradient(to_right,oklch(0.28_0_0/0.55)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.28_0_0/0.55)_1px,transparent_1px)]"
      />
      <div className="relative flex min-h-full flex-1 flex-col">{children}</div>
    </div>
  );
}
