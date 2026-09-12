import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  titlePart1: string;
  titleHighlight: string;
  description: string;
  badgeVariant?: "default" | "muted";
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  badge,
  badgeIcon: BadgeIcon,
  titlePart1,
  titleHighlight,
  description,
  badgeVariant = "default",
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
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1 text-xs font-semibold shadow-xs transition-all duration-300 ease-in-out hover:scale-105",
            badgeVariant === "default"
              ? "bg-background text-primary"
              : "bg-muted/60 text-primary",
          )}
        >
          {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5" />}
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {titlePart1} <span className="text-primary">{titleHighlight}</span>
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
