import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import ButtonBG from "@/../public/grants/button-decoration.svg";
import { cn } from "@/lib/utils";

const BisectButtonVariants = {
  primary:
    "border-[#1B57C4] bg-[#0C46B0]! hover:border-[#89E6C4CC]! hover:bg-[#2278E9]! text-white hover:text-white",
  alternative:
    "border-[#E0EBFF] bg-white! hover:bg-[#CEDFFF]! hover:border-[#ACC9FF]! text-[#0C46B0] hover:text-[#0C46B0]",
  secondary:
    "dark:border-white/20 bg-white/5! hover:bg-white/15! dark:hover:border-white/50! dark:text-white! border-[#E0EBFF] hover:border-[#ACC9FF]!",
};

export function BisectButton({
  href,
  variant = "primary",
  children,
  className,
}: {
  href: string;
  variant?: keyof typeof BisectButtonVariants;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button asChild className={cn("border-2", BisectButtonVariants[variant])}>
      <Link href={href} className={cn("relative", className)}>
        {children}
        {variant !== "alternative" && (
          <Image
            src={ButtonBG}
            alt="Button Decoration"
            fill
            className="object-cover"
          />
        )}
      </Link>
    </Button>
  );
}
