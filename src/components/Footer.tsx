import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex max-w-350 flex-col items-center justify-between gap-4 px-6 py-8 lg:px-10">
        <SocialLinks/>
        <p className="text-xs text-muted-foreground tracking-wide">
          {"© 2026 BV Dizajn. All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
