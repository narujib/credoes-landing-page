"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher({
  currentLocale,
  onToggle,
}: {
  currentLocale?: string;
  onToggle?: () => void;
}) {
  const localeFromHook = useLocale();
  const activeLocale = currentLocale || localeFromHook || "id";
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const handleToggleLocale = () => {
    const nextLocale = activeLocale === "id" ? "en" : "id";
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
    onToggle?.();
  };

  return (
    <Button
      variant="ghost"
      disabled={isPending}
      onClick={handleToggleLocale}
      aria-label={`Switch language from ${activeLocale.toUpperCase()}`}
      className="flex items-center gap-1.5 px-3 py-1.5 h-9 rounded-lg transition-all duration-300 ease-in-out hover:bg-primary-foreground/15 text-primary-foreground cursor-pointer"
    >
      <Globe
        className={`h-5 w-5 transition-transform duration-300 ${isPending ? "animate-spin" : ""}`}
      />
      <span className="font-heading text-xs font-bold tracking-wider uppercase">
        {activeLocale}
      </span>
    </Button>
  );
}
