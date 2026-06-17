"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "gettranscript-theme";

interface ThemeContextValue {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialDark(): boolean {
  if (typeof window === "undefined") {
    return true;
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored !== "light";
}

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDarkState] = useState(getInitialDark);

  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  function setIsDark(value: boolean) {
    setIsDarkState(value);
    applyTheme(value);
  }

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
