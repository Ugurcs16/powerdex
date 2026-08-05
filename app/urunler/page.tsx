import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Tüm Ürünler",
  description: "Powerdex ürün kataloğu — metal el fenerleri, kafa lambaları ve diğer ürünler.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-sm text-zinc-400">Ürünler yükleniyor…</div>}>
      <ProductsClient />
    </Suspense>
  );
}
