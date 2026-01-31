import { ReactNode } from "react";
import { Info, AlertTriangle, XCircle, CheckCircle } from "lucide-react";

const VALID_TYPES = ["info", "warning", "danger", "success", "error"] as const;
type CalloutType = (typeof VALID_TYPES)[number];

interface CalloutProps {
  type?: string; // Accept any string to enable validation
  title?: string;
  children: ReactNode;
}

function normalizeType(type: string): "info" | "warning" | "danger" | "success" {
  const normalized = type.toLowerCase();
  // Support "error" as an alias for "danger"
  if (normalized === "error") {
    return "danger";
  }
  if (normalized === "info" || normalized === "warning" || normalized === "danger" || normalized === "success") {
    return normalized;
  }
  return "info"; // fallback, but we'll show an error
}

function isValidType(type: string): boolean {
  const normalized = type.toLowerCase();
  return VALID_TYPES.includes(normalized as CalloutType);
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const styles = {
    info: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
    warning:
      "bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100",
    danger:
      "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100",
    success:
      "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
  };

  const icons = {
    info: Info,
    warning: AlertTriangle,
    danger: XCircle,
    success: CheckCircle,
  };

  const defaultTitles = {
    info: "Info",
    warning: "Warning",
    danger: "Danger",
    success: "Success",
  };

  // Validate the type and show a helpful error if invalid
  if (!isValidType(type)) {
    return (
      <div className="my-4 rounded-lg border-2 border-dashed border-red-500 bg-red-50 p-4 dark:bg-red-950/50">
        <div className="flex gap-3">
          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
          <div className="min-w-0 flex-1">
            <div className="mb-1 font-semibold text-red-700 dark:text-red-300">
              Invalid Callout Type
            </div>
            <div className="text-sm text-red-600 dark:text-red-400">
              <p className="mb-2">
                Received <code className="rounded bg-red-100 px-1 py-0.5 font-mono dark:bg-red-900">type=&quot;{type}&quot;</code> but expected one of:
              </p>
              <ul className="ml-4 list-disc">
                <li><code className="rounded bg-red-100 px-1 py-0.5 font-mono dark:bg-red-900">info</code></li>
                <li><code className="rounded bg-red-100 px-1 py-0.5 font-mono dark:bg-red-900">warning</code></li>
                <li><code className="rounded bg-red-100 px-1 py-0.5 font-mono dark:bg-red-900">danger</code> (or <code className="rounded bg-red-100 px-1 py-0.5 font-mono dark:bg-red-900">error</code>)</li>
                <li><code className="rounded bg-red-100 px-1 py-0.5 font-mono dark:bg-red-900">success</code></li>
              </ul>
              <p className="mt-2 text-xs">
                Note: Types are case-sensitive and must be lowercase.
              </p>
            </div>
            {children && (
              <div className="mt-3 border-t border-red-300 pt-3 dark:border-red-700">
                <div className="text-xs font-medium text-red-600 dark:text-red-400">Original content:</div>
                <div className="mt-1 text-red-700 dark:text-red-300">{children}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const normalizedType = normalizeType(type);
  const Icon = icons[normalizedType];
  const displayTitle = title || defaultTitles[normalizedType];

  return (
    <div className={`my-4 rounded-r-lg border-l-4 p-4 ${styles[normalizedType]}`}>
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
