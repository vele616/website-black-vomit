import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex max-w-350 flex-col gap-4 px-6 py-8 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:px-10">
        <div className="w-full max-w-md">
          <NewsletterForm />
        </div>

        <div className="flex w-full max-w-md flex-col items-center lg:ml-auto lg:self-stretch lg:items-end lg:text-right">
          <div className="flex w-full flex-col items-center gap-3 lg:h-full lg:items-end lg:justify-between lg:pb-5">
            <div className="flex w-full justify-center lg:justify-end">
              <SocialLinks />
            </div>
            <Link
              href="/privacy-policy"
              className="text-xs tracking-wide text-muted-foreground transition-colors hover:text-foreground lg:translate-y-2"
            >
              Privacy Policy
            </Link>
            <p className="text-xs tracking-wide text-muted-foreground">
              {"© 2026 Black Vomit. All rights reserved."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
