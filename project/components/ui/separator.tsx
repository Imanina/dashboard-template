import * as React from "react";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export function Separator({ orientation = "horizontal", className = "", ...props }: SeparatorProps) {
  return (
    <div
      role="separator"
      className={
        orientation === "vertical"
          ? `w-px h-6 bg-border ${className}`
          : `h-px w-full bg-border ${className}`
      }
      {...props}
    />
  );
} 