import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItemType {
  question: string;
  answer: string;
}

interface FaqAccordionItemProps {
  item: FaqItemType;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const renderText = (str: string) => {
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const FaqAnswer = ({ text }: { text: string }) => {
  const segments = text.split("\n\n");
  return (
    <div className="space-y-4 px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-base leading-relaxed text-muted-foreground border-t border-border/40 pt-5">
      {segments.map((segment, idx) => {
        if (segment.trim().startsWith("- ")) {
          const items = segment.split("\n").filter((i) => i.trim() !== "");
          return (
            <ul
              key={idx}
              className="list-disc pl-5 space-y-2 marker:text-primary/70"
            >
              {items.map((item, i) => (
                <li key={i}>{renderText(item.replace(/^- /, "").trim())}</li>
              ))}
            </ul>
          );
        }
        if (segment.trim().match(/^\d+\.\s/)) {
          const items = segment.split("\n").filter((i) => i.trim() !== "");
          return (
            <ol
              key={idx}
              className="list-decimal pl-5 space-y-2 marker:text-primary/70"
            >
              {items.map((item, i) => (
                <li key={i}>
                  {renderText(item.replace(/^\d+\.\s/, "").trim())}
                </li>
              ))}
            </ol>
          );
        }
        return (
          <p key={idx} className="text-justify sm:text-left">
            {renderText(segment.trim())}
          </p>
        );
      })}
    </div>
  );
};

export function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: FaqAccordionItemProps) {
  const contentId = `faq-content-${index}`;
  const headerId = `faq-header-${index}`;

  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-200 bg-card overflow-hidden",
        isOpen
          ? "border-primary/40 shadow-sm ring-1 ring-primary/20"
          : "border-border/80 hover:border-border hover:shadow-xs",
      )}
    >
      <h3>
        <button
          id={headerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-4 p-5 md:p-6 text-left transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring hover:bg-muted/30"
        >
          <span className="font-heading text-base md:text-lg font-semibold text-card-foreground pt-0.5">
            {item.question}
          </span>
          <span
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180 bg-primary/10 text-primary",
            )}
            aria-hidden="true"
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <FaqAnswer text={item.answer} />
        </div>
      </div>
    </div>
  );
}
