"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "relative",
        width: 60,
        height: 30,
        borderRadius: 15,
        background: resolvedTheme === "dark" ? "#374151" : "#e5e7eb",
        border: "none",
        cursor: "pointer",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        padding: 2,
      }}
      aria-label="Toggle theme"
    >
      <div
        style={{
          position: "absolute",
          left: resolvedTheme === "dark" ? 32 : 2,
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "white",
          transition: "left 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        {resolvedTheme === "dark" ? (
          <Moon size={14} color="#374151" />
        ) : (
          <Sun size={14} color="#374151" />
        )}
      </div>
    </button>
  );
} 