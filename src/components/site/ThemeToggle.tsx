import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { springSnappy } from "@/lib/motion";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle, mounted } = useTheme();
  const isLight = mounted && theme === "light";

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      aria-pressed={isLight}
      className={`relative grid h-10 w-10 place-items-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface)] text-[color:var(--t1)] transition-colors duration-300 hover:border-[color:var(--border-teal)] hover:text-[color:var(--cyan)] focus-visible:outline-2 focus-visible:outline-[color:var(--teal)] focus-visible:outline-offset-2 ${className}`}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      transition={springSnappy}
    >
      <Sun
        className={`absolute h-4 w-4 transition-all duration-500 ${
          isLight ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-500 ${
          isLight ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
    </motion.button>
  );
}