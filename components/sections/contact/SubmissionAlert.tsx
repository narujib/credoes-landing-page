"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface SubmissionAlertProps {
  status: "success" | "error";
  message: string;
}

export function SubmissionAlert({ status, message }: SubmissionAlertProps) {
  const isSuccess = status === "success";

  return (
    <div
      role={isSuccess ? "status" : "alert"}
      className={
        isSuccess
          ? "mb-4 flex items-start gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-800 dark:text-emerald-300"
          : "mb-4 flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-destructive"
      }
    >
      {isSuccess ? (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
      ) : (
        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
      )}
      <p className="text-xs font-medium leading-relaxed">{message}</p>
    </div>
  );
}
