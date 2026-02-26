import Link from "next/link";
import { Instagram, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex max-w-350 flex-col items-center justify-between gap-4 px-6 py-8 lg:px-10">
        <div className="flex items-center gap-5">
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Twitter"
          >
            <Twitter className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
        <p className="text-xs text-muted-foreground tracking-wide">
          {"© 2026 BV Dizajn. All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
