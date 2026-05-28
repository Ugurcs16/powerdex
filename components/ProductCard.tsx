"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/data/products";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProductVisualFallback } from "@/components/ProductVisualFallback";

type ProductCardProps = {
  product: Product;
  onQuickView?: (product: Product) => void;
};

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.28)] transition-shadow hover:shadow-[0_20px_55px_rgba(132,204,22,0.12)]"
    >
      <div className="relative h-56 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(132,204,22,0.24),transparent_55%)] opacity-80 transition-opacity group-hover:opacity-100" />
        {!imageFailed ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <ProductVisualFallback name={product.name} category={product.category} />
        )}
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-lime-400">{product.category}</p>
            <h3 className="text-lg font-semibold leading-snug text-zinc-100">{product.name}</h3>
          </div>
          <button
            type="button"
            aria-label={`${product.name} favorilere ekle`}
            className="rounded-lg border border-zinc-700 p-2 text-zinc-300 hover:text-lime-400"
          >
            <Heart className="size-4" />
          </button>
        </div>

        <ul className="space-y-1 text-sm text-zinc-400">
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature}>- {feature}</li>
          ))}
        </ul>

        <div className="flex gap-2">
          <Link
            href={`/urun/${product.slug}`}
            className={buttonVariants({
              className: "flex-1 bg-lime-400 text-zinc-950 hover:bg-lime-300",
            })}
          >
            Detaylari Gor
          </Link>
          <Button
            type="button"
            variant="outline"
            onClick={() => onQuickView?.(product)}
            className="border-zinc-700 text-zinc-100 hover:bg-zinc-800"
          >
            Quick View
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
