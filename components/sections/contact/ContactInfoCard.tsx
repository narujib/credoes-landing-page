"use client";

import * as React from "react";

export interface ContactDetail {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: string;
  href?: string;
}

interface ContactInfoCardProps {
  detail: ContactDetail;
}

export function ContactInfoCard({ detail }: ContactInfoCardProps) {
  const Icon = detail.icon;

  const content = (
    <div className="flex items-start gap-3.5 p-3 rounded-lg border border-border/60 bg-card hover:bg-muted/40 hover:border-primary/40 transition-colors duration-200 ease-in-out">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors duration-200 ease-in-out group-hover:bg-primary group-hover:text-primary-foreground mt-0.5">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {detail.title}
        </span>
        <span className="text-sm font-medium text-foreground break-words mt-0.5 whitespace-pre-line leading-relaxed">
          {detail.value}
        </span>
      </div>
    </div>
  );

  if (detail.href) {
    return (
      <a
        href={detail.href}
        target={detail.href.startsWith("http") ? "_blank" : undefined}
        rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block group"
        aria-label={`${detail.title}: ${detail.value}`}
      >
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}
