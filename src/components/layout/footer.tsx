import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const footerLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Inventory",
    href: "/#products",
  },
  {
    label: "Financing",
    href: "/#financing",
  },
  {
    label: "Blog",
    href: "/#blog",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: FaTwitter,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: FaYoutube,
  },
];

export default function Footer() {
  return (
  <footer className="bg-[#0F172A] text-white">
    <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-5 px-5 py-7 text-center md:grid md:min-h-32 md:grid-cols-[1fr_auto_1fr] md:gap-8 md:px-8 md:py-8 md:text-left">
      <div>
        <Link
          href="/"
          className="text-sm font-bold tracking-tight text-white md:text-lg"
        >
          TJERMIN
        </Link>

        <p className="mt-2 text-[9px] text-slate-400 md:text-xs">
          © 2026 Tjermin Marketplace. All rights reserved.
        </p>
      </div>

      <nav
        aria-label="Footer navigation"
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
      >
        {footerLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-[9px] text-slate-400 transition-colors hover:text-white md:text-xs"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center justify-center gap-3 md:justify-end">
        {socialLinks.map((social) => {
          const Icon = social.icon;

          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-[#17365f] md:h-8 md:w-8"
            >
              <Icon size={12} />
            </a>
          );
        })}
      </div>
    </div>
  </footer>
);
}