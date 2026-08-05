"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { categoryLabels, getCategoryLabel } from "@/data/categories";
import { catalogProducts } from "@/data/products";
import type { Product, ProductCategory } from "@/types/product";
import { brandClasses } from "@/lib/brand";

const categoryOptions = Object.keys(categoryLabels) as ProductCategory[];

type SortOption = "featured" | "sku" | "alpha";

function sortProducts(list: Product[], sort: SortOption): Product[] {
  const copy = [...list];
  if (sort === "sku") {
    return copy.sort((a, b) => (a.sku || a.name).localeCompare(b.sku || b.name, "tr"));
  }
  if (sort === "alpha") {
    return copy.sort((a, b) => a.name.localeCompare(b.name, "tr"));
  }
  return copy.sort((a, b) => {
    const af = a.featured ? 0 : 1;
    const bf = b.featured ? 0 : 1;
    if (af !== bf) return af - bf;
    const ap = a.priority === "primary" ? 0 : a.priority === "secondary" ? 1 : 2;
    const bp = b.priority === "primary" ? 0 : b.priority === "secondary" ? 1 : 2;
    if (ap !== bp) return ap - bp;
    return a.name.localeCompare(b.name, "tr");
  });
}

export default function ProductsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("kategori") ?? "all";
  const sort = ((searchParams.get("sirala") as SortOption) || "featured") as SortOption;

  const updateParams = useCallback(
    (patch: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (!value || value === "all" || (key === "sirala" && value === "featured")) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      const next = params.toString();
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr-TR");
    const list = catalogProducts.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (!q) return true;
      const haystack = `${product.name} ${product.sku} ${getCategoryLabel(product.category)}`.toLocaleLowerCase(
        "tr-TR",
      );
      return haystack.includes(q);
    });
    return sortProducts(list, sort);
  }, [query, category, sort]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className={`${brandClasses.cardSurface} p-8`}>
        <p className={`text-xs uppercase tracking-[0.2em] ${brandClasses.accent}`}>Katalog</p>
        <h1 className="mt-2 text-4xl font-bold text-white">Tüm Ürünler</h1>
        <p className={`mt-3 max-w-2xl ${brandClasses.textMuted}`}>
          Powerdex ürün kataloğu. Gerçek ürün görselleri SKU ile eşleştirilmiştir.
        </p>
      </div>

      <div className="mt-6 lg:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen((prev) => !prev)}
          className={`w-full rounded-lg border ${brandClasses.border} bg-[#151922] px-4 py-3 text-sm text-white`}
        >
          {filtersOpen ? "Filtreleri Gizle" : "Filtreleri Göster"}
        </button>
      </div>

      <div className={`mt-4 grid gap-4 lg:mt-8 lg:grid-cols-[1.4fr_1fr_1fr] ${filtersOpen ? "" : "hidden lg:grid"}`}>
        <label className="space-y-2 text-sm">
          <span className={brandClasses.textMuted}>Ürün adı veya SKU ara</span>
          <input
            value={query}
            onChange={(event) => updateParams({ q: event.target.value || null })}
            placeholder="Örn. PD-1072 veya kafa lambası"
            className={`w-full rounded-lg border ${brandClasses.border} bg-[#151922] px-4 py-3 text-sm text-white outline-none focus:border-[#A6C74A]`}
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className={brandClasses.textMuted}>Kategori</span>
          <select
            value={category}
            onChange={(event) => updateParams({ kategori: event.target.value })}
            className={`w-full rounded-lg border ${brandClasses.border} bg-[#151922] px-4 py-3 text-sm text-white outline-none focus:border-[#A6C74A]`}
          >
            <option value="all">Tüm kategoriler</option>
            {categoryOptions.map((slug) => (
              <option key={slug} value={slug}>
                {categoryLabels[slug]}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm">
          <span className={brandClasses.textMuted}>Sıralama</span>
          <select
            value={sort}
            onChange={(event) => updateParams({ sirala: event.target.value })}
            className={`w-full rounded-lg border ${brandClasses.border} bg-[#151922] px-4 py-3 text-sm text-white outline-none focus:border-[#A6C74A]`}
          >
            <option value="featured">Öne çıkanlar</option>
            <option value="sku">Ürün kodu</option>
            <option value="alpha">Alfabetik</option>
          </select>
        </label>
      </div>

      <p className={`mt-4 text-sm ${brandClasses.textMuted}`}>{filtered.length} ürün listeleniyor</p>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} imageSrc={product.image} />
          ))}
        </div>
      ) : (
        <div
          className={`mt-8 rounded-xl border border-dashed ${brandClasses.border} ${brandClasses.card} p-8 text-center text-sm ${brandClasses.textMuted}`}
        >
          Aramanızla eşleşen ürün bulunamadı. Filtreleri temizleyip tekrar deneyin.
        </div>
      )}
    </section>
  );
}
