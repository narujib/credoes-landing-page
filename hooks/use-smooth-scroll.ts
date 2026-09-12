"use client";

import * as React from "react";

/**
 * Custom hook for smooth-scroll navigation within the same page.
 * Consolidates duplicated handleNavClick logic from Navbar, MobileMenu, Footer, HeroSection.
 */
export function useSmoothScroll(locale: string) {
  const handleNavClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (typeof window === "undefined") return;

      const isHomePage =
        window.location.pathname === `/${locale}` ||
        window.location.pathname === `/${locale}/` ||
        window.location.pathname === "/";

      if (!isHomePage) return;

      if (href === "") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", `/${locale}`);
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
