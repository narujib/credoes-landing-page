import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  titlePart1: string;
  titleHighlight: string;
  description: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  titlePart1,
  titleHighlight,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-4 mb-10 md:mb-12 animate-fade-in-up",
        align === "center" ? "max-w-3xl mx-auto text-center" : "text-left",
        className,
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {titlePart1} <span className="text-primary">{titleHighlight}</span>
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
