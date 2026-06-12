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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22 }}
      className={`group overflow-hidden rounded-[20px] border ${brandClasses.border} bg-[#20242A] shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-shadow hover:shadow-[0_16px_40px_rgba(0,0,0,0.4),0_0_24px_rgba(166,199,74,0.06)]`}
    >
      <div className={`relative aspect-[4/3] overflow-hidden border-b ${brandClasses.border} bg-[#151922]`}>
        {!imageFailed ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <ProductVisualFallback name={product.name} category={product.category} />
        )}
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className={`text-xs uppercase tracking-wide ${brandClasses.accent}`}>{product.category}</p>
          <h3 className={`mt-1 text-lg font-semibold leading-snug ${brandClasses.text}`}>{product.name}</h3>
        </div>

        <ul className={`space-y-1.5 border-t ${brandClasses.border} pt-3 text-sm ${brandClasses.textMuted}`}>
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {product.usageTags.map((tag) => (
            <span
              key={tag}
              className={`rounded border ${brandClasses.border} ${brandClasses.surface} px-2 py-1 text-xs ${brandClasses.textMuted}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/urun/${product.slug}`}
          className={buttonVariants({
            className: `w-full ${brandClasses.accentBg} font-semibold`,
          })}
        >
          Detayları Gör
        </Link>
      </div>
    </motion.article>
  );
}
