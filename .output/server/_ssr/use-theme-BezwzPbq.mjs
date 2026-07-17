import { a as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-theme-BezwzPbq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var STORAGE_KEY = "scorpius-theme";
function getInitial() {
	if (typeof document === "undefined") return "dark";
	return document.documentElement.classList.contains("light") ? "light" : "dark";
}
function useTheme() {
	const [theme, setThemeState] = (0, import_react.useState)("dark");
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setThemeState(getInitial());
		setMounted(true);
	}, []);
	const setTheme = (0, import_react.useCallback)((t) => {
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
	return {
		theme,
		setTheme,
		toggle: (0, import_react.useCallback)(() => {
			setTheme(getInitial() === "dark" ? "light" : "dark");
		}, [setTheme]),
		mounted
	};
}
/** Inline script to run pre-hydration and avoid FOUC. */
var themeInitScript = `(function(){try{var s=localStorage.getItem('${STORAGE_KEY}');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches;var t=s||(m?'light':'dark');document.documentElement.classList.toggle('light',t==='light');document.documentElement.classList.toggle('dark',t==='dark');}catch(e){document.documentElement.classList.add('dark');}})();`;
//#endregion
export { useTheme as n, themeInitScript as t };
