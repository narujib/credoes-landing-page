"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Mail, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import {
  ContactInfoCard,
  type ContactDetail,
} from "@/components/sections/contact/ContactInfoCard";

export function ContactInfoPanel() {
  const t = useTranslations("Contact");

  const contactDetails: ContactDetail[] = [
    {
      icon: MapPin,
      title: t("headOffice"),
      value: t("headOfficeVal"),
      href: "https://maps.google.com/?q=Assati+Garden+House+BSD",
    },
    {
      icon: MapPin,
      title: t("salesOffice"),
      value: t("salesOfficeVal"),
      href: "https://maps.google.com/?q=SOHO+Brooklyn+Alam+Sutera",
    },
    {
      icon: Mail,
      title: t("emailLabel"),
      value: t("emailVal"),
      href: `mailto:${t("emailVal")}`,
    },
    {
      icon: WhatsAppIcon,
      title: t("phoneLabel"),
      value: t("phoneVal"),
      href: "https://wa.me/628118076807",
    },
  ];

  return (
    <div className="lg:col-span-5 flex flex-col justify-between space-y-4 h-full">
      <div className="space-y-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-foreground leading-tight">
            {t.rich("infoTitle", {
              primary: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-2">
            {t("infoDesc")}
          </p>
        </div>

        <div className="space-y-3 pt-1">
          {contactDetails.map((detail, idx) => (
            <ContactInfoCard key={idx} detail={detail} />
          ))}
        </div>
      </div>
    </div>
  );
}
