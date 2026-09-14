"use client";

import * as React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

/**
 * Reusable form field wrapper providing consistent label, error rendering,
 * and ARIA attributes for all contact form fields.
 */
export function FormField({ id, label, error, children }: FormFieldProps) {
  const errorId = `${id}-error`;

  const renderLabel = () => {
    if (label.endsWith("*")) {
      const text = label.slice(0, -1).trimEnd();
      return (
        <>
          {text} <span className="text-destructive font-bold ml-0.5">*</span>
        </>
      );
    }
    return label;
  };

  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="text-[11px] font-semibold uppercase tracking-wider text-foreground"
      >
        {renderLabel()}
      </label>
      {children}
      {error && (
        <p id={errorId} className="text-[11px] text-destructive mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}
