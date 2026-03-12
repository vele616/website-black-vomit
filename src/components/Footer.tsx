import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex max-w-350 flex-col items-center justify-between gap-4 px-6 py-8 lg:px-10">
        <NewsletterForm />
        <SocialLinks/>
        <Link
          href="/privacy-policy"
          className="text-xs tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        >
          Privacy Policy
        </Link>
        <p className="text-xs text-muted-foreground tracking-wide">
          {"© 2026 Black Vomit. All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
