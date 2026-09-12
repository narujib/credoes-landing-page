import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import type { Locale } from "@/types";

export const routing = defineRouting({
  locales: ["id", "en"] as Locale[],
  defaultLocale: "id",
  localeDetection: true,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
