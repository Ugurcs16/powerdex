import Link from "next/link";
import { getHomepageProducts } from "@/data/products";
import { FeaturedProductSlider } from "@/components/FeaturedProductSlider";
import { brandClasses } from "@/lib/brand";

export function ProductShowcase() {
  const showcaseProducts = getHomepageProducts();

  return (
    <section className={`${brandClasses.bg} py-12 sm:py-14 lg:py-20`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${brandClasses.accent}`}>
          Ürün Portföyü
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Öne Çıkan Ürünler</h2>
        <p className={`mt-3 max-w-3xl ${brandClasses.textMuted}`}>
          Seçilmiş featured modeller. Tüm katalog için ürünler sayfasını inceleyin.
        </p>

        <FeaturedProductSlider products={showcaseProducts} />

        <div className="mt-6 md:mt-8">
          <Link href="/urunler" className={`text-sm font-medium ${brandClasses.accent} hover:underline`}>
            Tüm ürünleri gör →
          </Link>
        </div>
      </div>
    </section>
  );
}
