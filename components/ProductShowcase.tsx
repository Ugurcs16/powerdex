"use client";

import { getHomepageProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { brandClasses } from "@/lib/brand";

export function ProductShowcase() {
  const showcaseProducts = getHomepageProducts();

  return (
    <section className={`${brandClasses.bg} py-20`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${brandClasses.accent}`}>
          Ürün Portföyü
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Öne Çıkan Ürünler</h2>
        <p className={`mt-3 max-w-3xl ${brandClasses.textMuted}`}>
          Metal el fenerleri, kafa lambaları ve kamp aydınlatma çözümlerinde öncelikli modeller.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {showcaseProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
