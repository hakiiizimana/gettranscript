"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const HASH_PREFIX = /^#/;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToHash(hash: string) {
  const id = hash.replace(HASH_PREFIX, "");
  if (!id) {
    return;
  }

  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

function isSamePageHashLink(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href");
  if (!href?.includes("#")) {
    return false;
  }

  const url = new URL(href, window.location.href);
  return url.pathname === window.location.pathname && url.hash.length > 1;
}

export function SmoothHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      return;
    }

    const currentPath = pathname;
    const timer = window.setTimeout(() => {
      if (window.location.pathname === currentPath) {
        scrollToHash(hash);
      }
    }, 50);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (
        !(anchor instanceof HTMLAnchorElement && isSamePageHashLink(anchor))
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      event.preventDefault();
      scrollToHash(url.hash);
      window.history.pushState(null, "", `${url.pathname}${url.hash}`);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
