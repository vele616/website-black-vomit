import Link from "next/link";
import { InstagramIcon } from "./icons/InstagramIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { Mail } from "lucide-react";

const socialLinks = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/blackvomit.art",
    label: "Instagram",
  },
  { icon: Mail, href: "mailto:bv.design@hotmail.com", label: "Email" },
  { icon: TwitterIcon, href: "https://x.com/blackvomi7", label: "Twitter" },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((social) => {
        const isExternal = Boolean(social.href?.startsWith("http"));
        return (
          <Link
            key={social.label}
            href={social.href}
            className="inline-flex items-center justify-center text-foreground transition-colors hover:text-foreground"
            aria-label={social.label}
            target={isExternal ? "_blank" : undefined}
          >
            {social.label === "Email" ? (
              <social.icon className="h-8 w-8" strokeWidth={1.7} />
            ) : (
              <social.icon className="h-6 w-6" strokeWidth={1.5} />
            )}
          </Link>
        );
      })}
    </div>
  );
}
