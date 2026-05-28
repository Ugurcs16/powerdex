"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BatteryCharging, Flashlight, Headset, LampDesk, Scissors, Sun } from "lucide-react";
import { featuredCategories } from "@/data/categories";
import { buttonVariants } from "@/components/ui/button";

const categoryIcons = {
  "el-fenerleri": Flashlight,
  "kafa-lambalari": Headset,
  "kamp-lambalari": LampDesk,
  "solar-aydinlatma": Sun,
  "piller-sarj": BatteryCharging,
  "kisisel-bakim": Scissors,
} as const;

export function CategoryGrid() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-white sm:text-4xl">One Cikan Kategoriler</h2>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Premium tasarimli, saha testli ve kullanim senaryosu odakli kategori secimi.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCategories.map((category) => (
          <motion.article
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            key={category.slug}
            className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
          >
            <div className="relative h-52 overflow-hidden border-b border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800">
              <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/20 blur-3xl" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-lime-300/70 to-transparent" />
              {(() => {
                const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] ?? Flashlight;
                return <Icon className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 text-lime-300" />;
              })()}
            </div>
            <div className="space-y-3 p-5">
              <h3 className="text-xl font-semibold text-zinc-100">{category.name}</h3>
              <p className="text-sm text-zinc-400">{category.description}</p>
              <Link
                href={`/kategori/${category.slug}`}
                className={buttonVariants({
                  variant: "secondary",
                  className: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
                })}
              >
                Incele
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
