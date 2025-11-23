"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 rounded-full bg-orange-300 data-[orientation=horizontal]:h-1 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
