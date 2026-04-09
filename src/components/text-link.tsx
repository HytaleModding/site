import { cn } from "@/lib/cn";
import DynamicLink, { DynamicLinkProps } from "fumadocs-core/dynamic-link";

export function TextLink({ className, ...props }: DynamicLinkProps) {
  return (
    <DynamicLink
      className={cn("underline transition-all hover:font-bold", className)}
      {...props}
    />
  );
}
