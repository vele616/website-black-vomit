"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { SocialLinks } from "./SocialLinks";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/propaganda" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-350 items-center justify-between px-6 py-5 lg:px-10">
        <Link
          href="/"
          className="text-lg font-bold tracking-[0.15em] text-foreground uppercase"
        >
          Black Vomit
        </Link>
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  isActive
                    ? "text-foreground underline underline-offset-4"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="flex items-center gap-4 border-l border-border pl-6">
            <SocialLinks />
          </div>
        </nav>

        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      {mobileOpen && (
        <nav
          className="fixed left-0 right-0 top-17 z-50 border-t border-border bg-background px-6 pb-6 pt-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col items-center gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`w-full text-center text-sm tracking-wide transition-colors ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
           <div className="mt-4 flex items-center justify-center gap-4 border-t border-border pt-4">
            <SocialLinks />
          </div>
        </nav>
      )}
    </header>
  );
}
