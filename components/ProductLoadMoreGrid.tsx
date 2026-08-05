"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { brandClasses } from "@/lib/brand";

const PAGE_SIZE = 24;

type ProductLoadMoreGridProps = {
  products: Product[];
  /** Optional pre-resolved image map by product id */
  imageSrcById?: Record<string, string>;
  /** Reset key — change when filters/search change */
  resetKey?: string;
  emptyMessage?: string;
  className?: string;
};

export function ProductLoadMoreGrid({
  products,
  imageSrcById,
  resetKey = "",
  emptyMessage = "Ürün bulunamadı.",
  className = "",
}: ProductLoadMoreGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [seenKey, setSeenKey] = useState(resetKey);

  if (resetKey !== seenKey) {
    setSeenKey(resetKey);
    setVisibleCount(PAGE_SIZE);
  }

  const visible = useMemo(() => products.slice(0, visibleCount), [products, visibleCount]);
  const hasMore = visibleCount < products.length;

  if (products.length === 0) {
    return (
      <div
        className={`mt-8 rounded-xl border border-dashed ${brandClasses.border} ${brandClasses.card} p-8 text-center text-sm ${brandClasses.textMuted}`}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
        {visible.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            imageSrc={imageSrcById?.[product.id] ?? product.image}
            priority={index < 4}
          />
        ))}
      </div>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className={`rounded-lg border ${brandClasses.border} bg-[#151922] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#20242A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6C74A]`}
          >
            Daha Fazla Göster
            <span className={`ml-2 font-normal ${brandClasses.textMuted}`}>
              +{Math.min(PAGE_SIZE, products.length - visibleCount)}
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
