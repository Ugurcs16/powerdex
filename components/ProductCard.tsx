"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/data/products";
import { buttonVariants } from "@/components/ui/button";
import { ProductVisualFallback } from "@/components/ProductVisualFallback";
import { brandClasses } from "@/lib/brand";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22 }}
      className={`group ${brandClasses.cardSurface} overflow-hidden transition-shadow hover:shadow-[0_16px_48px_rgba(0,0,0,0.45)]`}
    >
      <div className="relative h-56 overflow-hidden border-b border-[#252A33] bg-[#0B0D10]">
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(184,255,44,0.14),transparent_58%)] opacity-90 transition group-hover:opacity-100" />
        {!imageFailed ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <ProductVisualFallback name={product.name} category={product.category} />
        )}
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className={`text-xs uppercase tracking-wide ${brandClasses.accent}`}>{product.category}</p>
          <h3 className="mt-1 text-lg font-semibold leading-snug text-white">{product.name}</h3>
        </div>

        <ul className="space-y-1.5 border-t border-[#252A33] pt-3 text-sm text-zinc-400">
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="text-[#B8FF2C]">—</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {product.usageTags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[#252A33] bg-[#0B0D10] px-2 py-1 text-xs text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/urun/${product.slug}`}
          className={buttonVariants({
            className: `w-full ${brandClasses.accentBg} hover:brightness-95`,
          })}
        >
          Detayları Gör
        </Link>
      </div>
    </motion.article>
  );
}
