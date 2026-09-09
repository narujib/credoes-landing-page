"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  items: NavItem[];
  locale?: string;
}

export function MobileMenu({ items, locale = "id" }: MobileMenuProps) {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("Navbar");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={t("menu")}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t("menu")}</span>
          </Button>
        }
      />
      <SheetContent side="right" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left font-bold text-lg">
            {t("menu")}
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-6">
          <nav
            className="flex flex-col space-y-3"
            aria-label="Mobile navigation"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
                aria-label={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="border-t pt-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {t("settings")}
            </span>
            <div className="flex items-center gap-2">
              <LanguageSwitcher currentLocale={locale} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
