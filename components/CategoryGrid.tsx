"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { featuredCategories } from "@/data/categories";
import { buttonVariants } from "@/components/ui/button";
import { brandClasses } from "@/lib/brand";

export function CategoryGrid() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <h2 className={`text-3xl font-bold sm:text-4xl ${brandClasses.text}`}>Öne Çıkan Kategoriler</h2>
      <p className={`mt-3 max-w-2xl ${brandClasses.textMuted}`}>
        Metal el fenerleri ve kafa lambalarında Powerdex uzmanlığı.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
        {featuredCategories.map((category) => (
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            key={String(category.slug)}
            className={`overflow-hidden rounded-2xl border ${brandClasses.border} bg-[#20242A]`}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#15181C]">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain p-4 md:object-cover md:p-0"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : null}
            </div>
            <div className="space-y-3 p-5">
              <h3 className={`text-xl font-semibold ${brandClasses.text}`}>{category.name}</h3>
              <p className={`text-sm ${brandClasses.textMuted}`}>{category.description}</p>
              <Link
                href={`/kategori/${category.slug}`}
                className={buttonVariants({
                  className: brandClasses.accentBg,
                })}
              >
                İncele
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
