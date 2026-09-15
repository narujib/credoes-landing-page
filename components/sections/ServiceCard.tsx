import * as React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/types/services";

interface ServiceCardProps {
  service: ServiceItem;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const waUrl = new URL(siteConfig.contact.whatsappUrl);
  if (service.waMessage) {
    waUrl.searchParams.set("text", service.waMessage);
  }

  return (
    <Card
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden border border-border/50 bg-background p-5 md:p-6 transition-all duration-300 ease-in-out hover:border-primary/40 hover:shadow-sm hover:ring-1 hover:ring-primary/20 h-full rounded-xl",
        className,
      )}
    >
      {/* Background Shape */}
      <div className="absolute top-0 right-0 w-[60%] h-full pointer-events-none opacity-30 dark:opacity-10 z-0 group-hover:opacity-70 dark:group-hover:opacity-20 transition-opacity duration-300">
        <Image
          src="/images/hero-shape-1.svg"
          alt=""
          fill
          className="object-cover object-left rotate-10 scale-130"
        />
      </div>

      <div className="flex-1 flex flex-col relative z-10">
        {/* Icon */}
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-xl bg-[#0e7452]/0 transition-all duration-700 ease-out group-hover:bg-[#0e7452] group-hover:shadow-md -ml-2 -mt-2">
          <div
            className="w-12 h-12 md:w-14 md:h-14 transition-colors duration-700 ease-out bg-[#0e7452] group-hover:bg-white"
            style={{
              maskImage: `url(${service.iconSrc})`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskImage: `url(${service.iconSrc})`,
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
            }}
          />
        </div>

        {/* Text */}
        <h3 className="text-xl md:text-2xl font-heading font-bold tracking-tight text-foreground leading-tight mb-2.5">
          {service.title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </div>

      <div className="mt-auto relative z-10">
        {/* Dotted separator */}
        <div className="w-full border-t-[2px] border-dotted border-[#0e7452]/40 mt-0 mb-3.5" />

        {/* WhatsApp CTA Button */}
        <a
          href={waUrl.toString()}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: '"Agency FB", sans-serif' }}
          className="flex w-full items-center justify-center rounded bg-[#0e7452] px-3 py-2 text-[15px] md:px-4 md:py-2.5 md:text-[17px] tracking-wide text-white transition-colors hover:bg-[#0e7452]/90 shadow-sm"
        >
          {service.ctaText}
          <ChevronRight className="ml-1 md:ml-1.5 h-3.5 w-3.5 md:h-4 md:w-4" />
        </a>
      </div>
    </Card>
  );
}
