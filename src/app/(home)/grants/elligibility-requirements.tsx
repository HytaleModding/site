"use client";

import {
  GitPullRequestIcon,
  LocateFixedIcon,
  MapIcon,
  TrendingUpIcon,
} from "lucide-react";
import Image from "next/image";

import TreeParallaxLayer1 from "@/../public/grants/tree-parallax/tree_parallax_layer_1.svg";
import TreeParallaxLayer2 from "@/../public/grants/tree-parallax/tree_parallax_layer_2.svg";
import TreeParallaxLayer3 from "@/../public/grants/tree-parallax/tree_parallax_layer_3.svg";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export function ElligibilityRequirements() {
  return (
    <div className="flex flex-col gap-12 py-20">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Eligibility Requirements</h2>
        <p className="text-muted-foreground">
          In order to be eligible for the grant, your project must respect these
          four requirements.
        </p>
      </div>
      <div className="relative flex flex-col gap-4">
        <ElligibilityRequirementCard
          icon={<TrendingUpIcon />}
          title="Demonstrated Progress"
          description="Working prototype, demo, or public repo showing real progress."
        />
        <ElligibilityRequirementCard
          icon={<MapIcon />}
          title="Clear Project Scope"
          description="Clear project vision with defined audience and use case."
        />
        <ElligibilityRequirementCard
          icon={<LocateFixedIcon />}
          title="Development Roadmap"
          description="Current status overview with short and long-term milestones."
        />
        <ElligibilityRequirementCard
          icon={<GitPullRequestIcon />}
          title="Open Source Commitment"
          description="Open-sourced under an OSI-approved license with contribution support."
        />
        <ParallaxTreesDesktop />
      </div>
      <div className="relative h-48 xl:hidden">
        <ParallaxTreesMobile />
      </div>
    </div>
  );
}

function ElligibilityRequirementCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card flex items-center gap-4 rounded-md border px-16 py-6">
      <div className="bg-secondary flex aspect-square size-15 items-center justify-center rounded-full p-4">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function ParallaxTreesDesktop() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [75, -75]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 right-0 bottom-0 w-xl not-xl:hidden"
    >
      <div className="relative size-full">
        <div className="to-background from-background/50 absolute -top-24 -right-48 -bottom-24 left-0 rounded-full bg-linear-to-r to-55% blur-2xl" />
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div style={{ y: y1 }} className="absolute inset-0">
            <Image
              src={TreeParallaxLayer1}
              alt="Tree Parallax Layer 1"
              className="pointer-events-none object-none"
              fill
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div style={{ y: y2 }} className="absolute inset-0">
            <Image
              src={TreeParallaxLayer2}
              alt="Tree Parallax Layer 2"
              className="pointer-events-none object-none"
              fill
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 4,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div style={{ y: y3 }} className="absolute inset-0">
            <Image
              src={TreeParallaxLayer3}
              alt="Tree Parallax Layer 3"
              className="pointer-events-none object-none"
              fill
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function ParallaxTreesMobile() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [75, -75]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <div
      className="absolute -top-30 h-114 w-full mask-b-from-60"
      ref={containerRef}
    >
      <div className="relative h-128">
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div style={{ y: y1 }} className="absolute inset-0">
            <Image
              src={TreeParallaxLayer1}
              alt="Tree Parallax Layer 1"
              className="pointer-events-none object-none"
              fill
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div style={{ y: y2 }} className="absolute inset-0">
            <Image
              src={TreeParallaxLayer2}
              alt="Tree Parallax Layer 2"
              className="pointer-events-none object-none"
              fill
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 4,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div style={{ y: y3 }} className="absolute inset-0">
            <Image
              src={TreeParallaxLayer3}
              alt="Tree Parallax Layer 3"
              className="pointer-events-none object-none"
              fill
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
