"use client";

import { ReactNode } from "react";
import {
  Info,
  AlertTriangle,
  XCircle,
  CheckCircle,
  GraduationCap,
} from "lucide-react";
import { useMessages } from "@/lib/hooks/useMessages";

interface CalloutProps {
  type?:
    | "info"
    | "warning"
    | "danger"
    | "success"
    | "lvl_beginner"
    | "lvl_intermediate"
    | "lvl_advanced";
  title?: string;
  children: ReactNode;
}

const styles = {
  info: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
  warning:
    "bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100",
  danger:
    "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100",
  success:
    "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
  lvl_beginner:
    "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100",
  lvl_intermediate:
    "bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100",
  lvl_advanced:
    "bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100",
};

const icons = {
  info: Info,
  warning: AlertTriangle,
  danger: XCircle,
  success: CheckCircle,
  lvl_beginner: GraduationCap,
  lvl_intermediate: GraduationCap,
  lvl_advanced: GraduationCap,
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const messages = useMessages();

  const defaultTitles = {
    info: messages.callout.defaultTitles.info,
    warning: messages.callout.defaultTitles.warning,
    danger: messages.callout.defaultTitles.danger,
    success: messages.callout.defaultTitles.success,
    lvl_beginner: messages.callout.defaultTitles.lvl_beginner,
    lvl_intermediate: messages.callout.defaultTitles.lvl_intermediate,
    lvl_advanced: messages.callout.defaultTitles.lvl_advanced,
  };

  const Icon = icons[type];
  const displayTitle = title || defaultTitles[type];

  if (!Icon) {
    throw new Error(`Invalid callout type: ${type}`);
  }

  return (
    <div className={`my-4 rounded-r-lg border-l-4 p-4 ${styles[type]}`}>
      <div className="flex gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="mb-1 font-semibold">{displayTitle}</div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
