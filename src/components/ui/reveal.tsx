"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps, Transition } from "motion/react";
import { cn } from "@/lib/utils";

const EASE_OUT: Transition["ease"] = [0.21, 0.47, 0.32, 0.98];

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  y = 24,
  x = 0,
  ...props
}: HTMLMotionProps<"div"> & {
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
