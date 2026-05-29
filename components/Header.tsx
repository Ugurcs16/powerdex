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
      className={`sticky top-0 z-50 border-b ${brandClasses.border} bg-[#0B0D10]/85 backdrop-blur-xl`}
    >
      <div className="mx-auto flex h-[4.25rem] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-md border border-[#252A33] bg-[#151922] text-xs font-black text-[#B8FF2C]">
            P
          </span>
          <span className="text-base font-bold tracking-[0.22em] text-white sm:text-lg">POWERDEX</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNavigation.map((item) => {
            const active = isActive(pathname, item.slug);
            return (
              <div key={item.title} className="group relative">
                <Link
                  href={item.slug}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "text-[#B8FF2C]"
                      : "text-zinc-300 hover:bg-[#151922] hover:text-white"
                  }`}
                >
                  {item.title}
                  {item.items?.length ? <ChevronDown className="size-3.5 opacity-70" /> : null}
                </Link>
                {item.items?.length ? (
                  <div className="invisible absolute left-0 top-full z-50 mt-1 min-w-52 rounded-xl border border-[#252A33] bg-[#151922] p-2 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:opacity-100">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.slug}
                        href={`/kategori/${subItem.slug}`}
                        className="block rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-[#0B0D10] hover:text-[#B8FF2C]"
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
              className: `${brandClasses.accentBg} ${brandClasses.accentGlow} hover:brightness-95`,
            })}
          >
            Teklif Al
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg border border-[#252A33] bg-[#151922] p-2 text-zinc-100 lg:hidden"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className={`border-t ${brandClasses.border} bg-[#0B0D10] px-4 py-3 lg:hidden`}>
          <nav className="space-y-2">
            {primaryNavigation.map((item) => (
              <div key={item.title} className={`rounded-xl border ${brandClasses.border} bg-[#151922] p-3`}>
                <Link
                  href={item.slug}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-semibold text-white"
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
              className={`${buttonVariants({ className: `w-full ${brandClasses.accentBg}` })}`}
            >
              Teklif Al
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
