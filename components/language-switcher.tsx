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

  const handleLocaleChange = (newLocale: "id" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            aria-label="Switch language"
            className="flex items-center gap-1.5 px-2.5 text-xs font-semibold uppercase tracking-wider"
          >
            <Globe className="h-4 w-4" />
            <span>{activeLocale}</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLocaleChange("id")}
          className={activeLocale === "id" ? "font-semibold text-primary" : ""}
        >
          Bahasa Indonesia (ID)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLocaleChange("en")}
          className={activeLocale === "en" ? "font-semibold text-primary" : ""}
        >
          English (EN)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
