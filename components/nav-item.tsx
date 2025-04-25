// components/nav-item.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // shadcn's classNames util

interface NavItemProps {
  href: string;
  label: string;
}

export function NavItem({ href, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors text-muted-foreground hover:text-foreground",
        "hover:underline underline-offset-8",
        isActive && "text-foreground underline font-semibold"
      )}
    >
      {label}
    </Link>
  );
}
