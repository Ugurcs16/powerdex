"use client";

import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { primaryNavigation } from "@/data/categories";
import { brandClasses } from "@/lib/brand";

function isActive(pathname: string, slug: string) {
  if (slug === "/") return pathname === "/";
  return pathname.startsWith(slug);
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={`sticky top-0 z-50 border-b ${brandClasses.border} ${brandClasses.surface}/95 backdrop-blur-md`}
    >
      <div className="mx-auto flex h-[4.25rem] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <span
            className={`flex size-8 items-center justify-center rounded border ${brandClasses.border} ${brandClasses.card} text-xs font-bold ${brandClasses.accent}`}
          >
            P
          </span>
          <span className={`text-base font-semibold tracking-[0.18em] sm:text-lg ${brandClasses.text}`}>
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
                      : `${brandClasses.textMuted} hover:text-[#F5F5F5] hover:bg-[#20242A]/60`
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

        <button
          type="button"
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`rounded-md border ${brandClasses.border} ${brandClasses.card} p-2 ${brandClasses.text} lg:hidden`}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className={`border-t ${brandClasses.border} ${brandClasses.bg} px-4 py-3 lg:hidden`}>
          <nav className="space-y-2">
            {primaryNavigation.map((item) => (
              <div key={item.title} className={`rounded-lg border ${brandClasses.border} ${brandClasses.card} p-3`}>
                <Link
                  href={item.slug}
                  onClick={() => setIsOpen(false)}
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
                        onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
