"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    if (segments[1] === "id" || segments[1] === "en") {
      segments[1] = newLocale;
      router.push(segments.join("/") || "/");
    } else {
      router.push(`/${newLocale}${pathname}`);
    }
  };

  const activeLocale =
    currentLocale || (pathname?.startsWith("/en") ? "en" : "id");

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
