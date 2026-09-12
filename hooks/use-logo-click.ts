"use client";

import * as React from "react";
import { useLocale } from "next-intl";

/**
 * Hook that provides a click handler for the site logo.
 * If the user is already on the homepage, clicking the logo triggers a full reload.
 */
export function useLogoClick() {
  const locale = useLocale();

  const handleLogoClick = React.useCallback(() => {
    if (
      typeof window !== "undefined" &&
      (window.location.pathname === `/${locale}` ||
        window.location.pathname === `/${locale}/`)
    ) {
      window.location.reload();
    }
  }, [locale]);

  return { handleLogoClick };
}
