import Link from "next/link";
import { InstagramIcon } from "./icons/InstagramIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { Mail } from "lucide-react";

const socialLinks = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: Mail, href: "#", label: "Email" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
];

export function SocialLinks() {
  return (
    <div className="flex gap-4">
      {socialLinks.map((social) => (
        <Link
        key={social.label}
        href={social.href}
        className="text-foreground transition-colors hover:text-foreground"
        aria-label={social.label}
        >
          <social.icon className="h-6 w-6" strokeWidth={1.5} />
        </Link>
      ))}
    </div>
  );
}
