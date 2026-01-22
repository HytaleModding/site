"use client";

import { ChevronDown } from "lucide-react";
import Link from "fumadocs-core/link";
import { cva } from "class-variance-authority";
import { cn } from "../lib/cn";
import { type ReactNode, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export interface ParameterNode {
  name: string;
  description: ReactNode;
}

export interface TypeNode {
  /**
   * Additional description of the field
   */
  description?: ReactNode;

  /**
   * type signature (short)
   */
  type: ReactNode;

  /**
   * type signature (full)
   */
  typeDescription?: ReactNode;

  /**
   * Optional `href` for the type
   */
  typeDescriptionLink?: string;

  default?: ReactNode;

  required?: boolean;
  deprecated?: boolean;

  parameters?: ParameterNode[];

  returns?: ReactNode;
}

const keyVariants = cva("text-fd-primary", {
  variants: {
    deprecated: {
      true: "line-through text-fd-primary/50",
    },
  },
});

const fieldVariants = cva("text-fd-muted-foreground not-prose pe-2");

export function TypeTable({ type }: { type: Record<string, TypeNode> }) {
  return (
    <div className="bg-fd-card text-fd-card-foreground @container my-6 flex flex-col overflow-hidden rounded-2xl border p-1 text-sm">
      <div className="not-prose text-fd-muted-foreground flex items-center px-3 py-1 font-medium">
        <p className="w-[25%]">Prop</p>
        <p className="@max-xl:hidden">Type</p>
      </div>
      {Object.entries(type).map(([key, value]) => (
        <Item key={key} name={key} item={value} />
      ))}
    </div>
  );
}

function Item({
  name,
  item: {
    parameters = [],
    description,
    required = false,
    deprecated,
    typeDescription,
    default: defaultValue,
    type,
    typeDescriptionLink,
    returns,
  },
}: {
  name: string;
  item: TypeNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn(
        "overflow-hidden rounded-xl border transition-all",
        open
          ? "bg-fd-background shadow-sm not-last:mb-2"
          : "border-transparent",
      )}
    >
      <CollapsibleTrigger className="group not-prose hover:bg-fd-accent relative flex w-full flex-row items-center px-3 py-2 text-start">
        <code
          className={cn(
            keyVariants({
              deprecated,
              className: "w-[25%] min-w-fit pe-2 font-medium",
            }),
          )}
        >
          {name}
          {!required && "?"}
        </code>
        {typeDescriptionLink ? (
          <Link href={typeDescriptionLink} className="underline @max-xl:hidden">
            {type}
          </Link>
        ) : (
          <span className="@max-xl:hidden">{type}</span>
        )}
        <ChevronDown className="text-fd-muted-foreground absolute end-2 size-4 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="fd-scroll-container grid grid-cols-[1fr_3fr] gap-y-4 overflow-auto border-t p-3 text-sm">
          <div className="prose prose-no-margin col-span-full text-sm empty:hidden">
            {description}
          </div>
          {typeDescription && (
            <>
              <p className={cn(fieldVariants())}>Type</p>
              <p className="not-prose my-auto">{typeDescription}</p>
            </>
          )}
          {defaultValue && (
            <>
              <p className={cn(fieldVariants())}>Default</p>
              <p className="not-prose my-auto">{defaultValue}</p>
            </>
          )}
          {parameters.length > 0 && (
            <>
              <p className={cn(fieldVariants())}>Parameters</p>
              <div className="flex flex-col gap-2">
                {parameters.map((param) => (
                  <div
                    key={param.name}
                    className="inline-flex flex-wrap items-center gap-1"
                  >
                    <p className="not-prose font-medium text-nowrap">
                      {param.name} -
                    </p>
                    <div className="prose prose-no-margin text-sm">
                      {param.description}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {returns && (
            <>
              <p className={cn(fieldVariants())}>Returns</p>
              <div className="prose prose-no-margin my-auto text-sm">
                {returns}
              </div>
            </>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
