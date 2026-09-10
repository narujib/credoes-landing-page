"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale?: string;
}) {
  const localeFromHook = useLocale();
  const activeLocale = currentLocale || localeFromHook || "id";
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const handleLocaleChange = (newLocale: "id" | "en") => {
    if (newLocale === activeLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            disabled={isPending}
            aria-label="Switch language"
            className="flex items-center gap-1.5 px-3 py-1.5 h-9 rounded-lg font-heading text-base md:text-lg font-bold tracking-wider uppercase transition-all duration-300 ease-in-out hover:bg-primary-foreground/15 text-primary-foreground cursor-pointer"
          >
            <Globe className="h-4.5 w-4.5" />
            <span>{activeLocale}</span>
          </Button>
        }
      />
      <DropdownMenuContent
        align="end"
        className="animate-in fade-in-50 zoom-in-95 duration-200"
      >
        <DropdownMenuItem
          disabled={isPending}
          onClick={() => handleLocaleChange("id")}
          className={`cursor-pointer transition-colors duration-200 ${
            activeLocale === "id" ? "font-semibold text-primary" : ""
          }`}
        >
          Bahasa Indonesia (ID)
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isPending}
          onClick={() => handleLocaleChange("en")}
          className={`cursor-pointer transition-colors duration-200 ${
            activeLocale === "en" ? "font-semibold text-primary" : ""
          }`}
        >
          English (EN)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
