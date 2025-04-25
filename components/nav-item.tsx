"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
}

export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ href, label, className, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        ref={ref}
        className={cn(
          "transition-colors text-muted-foreground hover:text-foreground",
          "hover:underline underline-offset-8",
          isActive && "text-foreground underline font-semibold",
          className
        )}
        {...props}
      >
        {label}
      </Link>
    );
  }
);

NavItem.displayName = "NavItem";
