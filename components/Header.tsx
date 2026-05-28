"use client";

import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { primaryNavigation } from "@/data/categories";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/70 bg-zinc-950/65 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold tracking-[0.2em] text-white">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-lime-400 shadow-[0_0_14px_rgba(132,204,22,0.9)]" />
          POWERDEX
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {primaryNavigation.map((item) => (
            <div key={item.title} className="group relative">
              <Link
                href={item.slug}
                className="flex items-center gap-1 text-sm font-medium text-zinc-200 transition hover:text-lime-400"
              >
                {item.title}
                {item.items?.length ? <ChevronDown className="size-4" /> : null}
              </Link>
              {item.items?.length ? (
                <div className="invisible absolute left-0 top-full mt-3 min-w-52 rounded-xl border border-zinc-800 bg-zinc-950 p-2 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:opacity-100">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.slug}
                      href={`/kategori/${subItem.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-lime-400"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <Link
            href="/iletisim"
            className={buttonVariants({
              className:
                "bg-lime-400 text-zinc-950 shadow-[0_0_24px_rgba(132,204,22,0.35)] hover:bg-lime-300",
            })}
          >
            Teklif Al
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Menuyu kapat" : "Menuyu ac"}
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md border border-zinc-700 bg-zinc-900/80 p-2 text-zinc-100 lg:hidden"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-zinc-800 bg-zinc-950 px-4 py-3 lg:hidden">
          <nav className="space-y-2">
            {primaryNavigation.map((item) => (
              <div key={item.title} className="rounded-lg border border-zinc-800 p-3">
                <Link
                  href={item.slug}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-semibold text-zinc-100"
                >
                  {item.title}
                </Link>
                {item.items?.length ? (
                  <div className="mt-2 space-y-1 border-t border-zinc-800 pt-2">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.slug}
                        href={`/kategori/${subItem.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-zinc-400"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
