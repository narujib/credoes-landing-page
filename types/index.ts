import * as React from "react";

/** Supported application locales */
export type Locale = "id" | "en";

/** Social media link definition */
export interface SocialLink {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  label: string;
}
