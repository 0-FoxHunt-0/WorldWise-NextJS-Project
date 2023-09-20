"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

function NavLink({ children, href, className }: NavLinkProps) {
  const activeSegment = useSelectedLayoutSegment();
  const isActive = href.split("/").at(-1) === activeSegment;

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? "active" : "inactive"}`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
