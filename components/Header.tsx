"use client";

import Link from "next/link";
import { Menu, X, ChevronDown, MessageCircleMore } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { primaryNavigation } from "@/data/categories";
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from "@/lib/site";
import { brandClasses } from "@/lib/brand";

function isActive(pathname: string, slug: string) {
  if (slug === "/") return pathname === "/";
  return pathname.startsWith(slug);
}

export function Header() {
  const pathname = usePathname();
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const isOpen = openForPath === pathname;
  const whatsappHref = getWhatsAppUrl(getGeneralWhatsAppMessage());

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const closeMenu = () => setOpenForPath(null);
  const toggleMenu = () => setOpenForPath((prev) => (prev === pathname ? null : pathname));

  return (
    <header
      className={`sticky top-0 z-50 border-b ${brandClasses.border} ${brandClasses.surface}/95 backdrop-blur-md`}
    >
      <div className="mx-auto flex h-[4.25rem] w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex min-w-0 items-center gap-2.5" onClick={closeMenu}>
          <span
            className={`flex size-8 shrink-0 items-center justify-center rounded border ${brandClasses.border} ${brandClasses.card} text-xs font-bold ${brandClasses.accent}`}
          >
            P
          </span>
          <span className={`truncate text-base font-semibold tracking-[0.18em] sm:text-lg ${brandClasses.text}`}>
            POWERDEX
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {primaryNavigation.map((item) => {
            const active = isActive(pathname, item.slug);
            return (
              <div key={item.title} className="group relative">
                <Link
                  href={item.slug}
                  className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                    active
                      ? `${brandClasses.accent}`
                      : `${brandClasses.textMuted} hover:bg-[#20242A]/60 hover:text-[#F5F5F5]`
                  }`}
                >
                  {item.title}
                  {item.items?.length ? <ChevronDown className="size-3.5 opacity-60" /> : null}
                </Link>
                {item.items?.length ? (
                  <div
                    className={`invisible absolute left-0 top-full z-50 mt-1 min-w-52 rounded-lg border ${brandClasses.border} ${brandClasses.card} p-1.5 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100`}
                  >
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.slug}
                        href={`/kategori/${subItem.slug}`}
                        className={`block rounded-md px-3 py-2 text-sm ${brandClasses.textMuted} hover:bg-[#1A1D21] hover:text-[#F5F5F5]`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:flex">
          <Link
            href="/iletisim"
            className={buttonVariants({
              className: `${brandClasses.accentBg} font-semibold`,
            })}
          >
            Teklif Al
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp teklif"
            className={`inline-flex size-10 items-center justify-center rounded-md border ${brandClasses.border} ${brandClasses.card} ${brandClasses.text}`}
          >
            <MessageCircleMore className="size-5" />
          </Link>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
            onClick={toggleMenu}
            className={`rounded-md border ${brandClasses.border} ${brandClasses.card} p-2 ${brandClasses.text}`}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div
          id="mobile-nav"
          className={`max-h-[min(80svh,calc(100dvh-4.25rem))] overflow-y-auto border-t ${brandClasses.border} ${brandClasses.bg} px-4 py-3 lg:hidden`}
        >
          <nav className="space-y-2 pb-[env(safe-area-inset-bottom)]">
            {primaryNavigation.map((item) => (
              <div key={item.title} className={`rounded-lg border ${brandClasses.border} ${brandClasses.card} p-3`}>
                <Link
                  href={item.slug}
                  onClick={closeMenu}
                  className={`block text-sm font-semibold ${brandClasses.text}`}
                >
                  {item.title}
                </Link>
                {item.items?.length ? (
                  <div className={`mt-2 space-y-1 border-t ${brandClasses.border} pt-2`}>
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.slug}
                        href={`/kategori/${subItem.slug}`}
                        onClick={closeMenu}
                        className={`block text-sm ${brandClasses.textMuted}`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <Link
              href="/iletisim"
              onClick={closeMenu}
              className={buttonVariants({ className: `w-full ${brandClasses.accentBg} font-semibold` })}
            >
              Teklif Al
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
