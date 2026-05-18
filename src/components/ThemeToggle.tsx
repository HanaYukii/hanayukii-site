"use client";

import { useEffect, useState } from "react";

type Theme = "stationery" | "dark";

const storageKey = "hanayukii-theme";

function getCurrentTheme(): Theme {
  if (typeof document === "undefined") {
    return "dark";
  }

  return document.documentElement.dataset.theme === "dark" ? "dark" : "stationery";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  const currentTheme = theme ?? "dark";
  const nextTheme: Theme = currentTheme === "dark" ? "stationery" : "dark";

  function switchTheme() {
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(storageKey, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={switchTheme}
      className="rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted transition-colors hover:border-primary hover:text-primary"
      aria-label={`Switch to ${nextTheme} theme`}
    >
      {currentTheme === "dark" ? "Dark" : "Paper"}
    </button>
  );
}
