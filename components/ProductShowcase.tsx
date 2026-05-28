"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { products, type Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-white sm:text-4xl">En Cok One Cikan Urunler</h2>
      <p className="mt-3 max-w-3xl text-zinc-400">
        Gercek kullanim ihtiyaclarina gore secilen, performans ve dayaniklilik odakli urunler.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onQuickView={setSelectedProduct} />
        ))}
      </div>

      {selectedProduct ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProduct.name} quick view`}
        >
          <div className="w-full max-w-xl rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-lime-400">
                  {selectedProduct.category}
                </p>
                <h3 className="mt-1 text-2xl font-bold text-zinc-100">{selectedProduct.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label="Quick view kapat"
                className="rounded-lg border border-zinc-700 p-2 text-zinc-200"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="mt-4 text-zinc-300">{selectedProduct.shortDescription}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              {selectedProduct.features.slice(0, 5).map((feature) => (
                <li key={feature}>- {feature}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
