import { useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";
const STORAGE_KEY = "scorpius-theme";

function getInitial(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(getInitial());
    setMounted(true);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.classList.toggle("light", t === "light");
    root.classList.toggle("dark", t === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
    setThemeState(t);
    window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 500);
  }, []);

  const toggle = useCallback(() => {
    setTheme(getInitial() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggle, mounted };
}

/** Inline script to run pre-hydration and avoid FOUC. */
export const themeInitScript = `(function(){try{var s=localStorage.getItem('${STORAGE_KEY}');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches;var t=s||(m?'light':'dark');document.documentElement.classList.toggle('light',t==='light');document.documentElement.classList.toggle('dark',t==='dark');}catch(e){document.documentElement.classList.add('dark');}})();`;