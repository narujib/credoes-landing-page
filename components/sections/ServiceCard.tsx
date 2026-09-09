import * as React from "react";
import { LucideIcon, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  tag?: string;
}

interface ServiceCardProps {
  service: ServiceItem;
  locale?: string;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden border border-border/80 bg-card/80 backdrop-blur-xs p-2 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
      <CardHeader className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
            <Icon className="h-6 w-6" />
          </div>
          {service.tag && (
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
              {service.tag}
            </span>
          )}
        </div>
        <CardTitle className="text-xl font-bold tracking-tight text-card-foreground group-hover:text-primary transition-colors flex items-center justify-between">
          <span>{service.title}</span>
          <ArrowUpRight className="h-4 w-4 opacity-0 transition-all -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-primary" />
        </CardTitle>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          {service.description}
        </p>
      </CardHeader>
      <CardContent className="p-6 pt-0 border-t border-border/40 mt-auto">
        <ul className="flex flex-col space-y-2 pt-4">
          {service.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center text-xs sm:text-sm text-muted-foreground"
            >
              <div className="mr-2.5 h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
