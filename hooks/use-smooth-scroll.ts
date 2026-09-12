"use client";

import * as React from "react";
import { useLocale } from "next-intl";

/**
 * Custom hook for smooth-scroll navigation within the same page.
 * Consolidates duplicated handleNavClick logic from Navbar, MobileMenu, Footer, HeroSection.
 */
export function useSmoothScroll() {
  const locale = useLocale();

  const handleNavClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (typeof window === "undefined") return;

      const isHomePage =
        window.location.pathname === `/${locale}` ||
        window.location.pathname === `/${locale}/` ||
        window.location.pathname === "/";

      if (!isHomePage) return;

      if (href === "" || href === "/") {
        e.preventDefault();

        // Ensure both window and document.documentElement are scrolled
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.documentElement.scrollTo({ top: 0, behavior: "smooth" });

        // Remove hash from URL without triggering a full page reload or Next.js route change if it exists
        if (window.location.hash) {
          window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search,
          );
        }
        return;
      }

      const hashIndex = href.indexOf("#");
      if (hashIndex !== -1) {
        const targetId = href.slice(hashIndex + 1);
        const element = document.getElementById(targetId);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `/${locale}${href}`);
        }
      }
    },
    [locale],
  );

  return { handleNavClick };
}
