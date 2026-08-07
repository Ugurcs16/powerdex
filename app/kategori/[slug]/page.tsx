import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductLoadMoreGrid } from "@/components/ProductLoadMoreGrid";
import {
  allCategories,
  categoryAliases,
  categoryDescriptions,
  categoryLabels,
  getCategoryLabel,
  getCategoryVisual,
  resolveCategorySlug,
} from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { resolveProductImageSrc } from "@/lib/product-image.server";
import { brandClasses } from "@/lib/brand";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = resolveCategorySlug(slug);
  if (!category) {
    return { title: "Kategori Bulunamadı" };
  }

  return {
    title: getCategoryLabel(category),
    description: categoryDescriptions[category],
  };
}

export async function generateStaticParams() {
  const slugs = new Set<string>([
    ...Object.keys(categoryLabels),
    ...Object.keys(categoryAliases),
  ]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = resolveCategorySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(category);
  const name = getCategoryLabel(category);
  const description = categoryDescriptions[category];
  const coverImage = getCategoryVisual(category);
  const imageSrcById = Object.fromEntries(
    categoryProducts.map((product) => [product.id, resolveProductImageSrc(product)]),
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <nav className={`mb-6 text-xs ${brandClasses.textMuted}`}>
        <Link href="/" className="hover:text-[#F5F5F5]">
          Ana Sayfa
        </Link>
        <span className="mx-2">/</span>
        <Link href="/urunler" className="hover:text-[#F5F5F5]">
          Ürünler
        </Link>
        <span className="mx-2">/</span>
        <span className={brandClasses.text}>{name}</span>
      </nav>

      <div className={`${brandClasses.cardSurface} overflow-hidden`}>
        {coverImage ? (
          <div className="relative aspect-[21/9] min-h-[160px] w-full bg-[#15181C] sm:min-h-[200px]">
            <Image
              src={coverImage}
              alt={name}
              fill
              priority
              className="object-contain p-4 sm:object-cover sm:p-0"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111315]/90 via-[#111315]/25 to-transparent" />
          </div>
        ) : null}
        <div className="p-5 sm:p-8">
          <p className={`text-xs uppercase tracking-[0.2em] ${brandClasses.accent}`}>Kategori</p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{name}</h1>
          <p className={`mt-3 max-w-2xl text-sm sm:text-base ${brandClasses.textMuted}`}>{description}</p>
          <p className={`mt-4 text-sm ${brandClasses.textMuted}`}>{categoryProducts.length} ürün</p>
          {categoryProducts[0]?.useCases?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from(new Set(categoryProducts.flatMap((item) => item.useCases)))
                .slice(0, 6)
                .map((useCase) => (
                  <span
                    key={useCase}
                    className={`rounded border ${brandClasses.border} px-2 py-1 text-xs ${brandClasses.textMuted}`}
                  >
                    {useCase}
                  </span>
                ))}
            </div>
          ) : null}
        </div>
      </div>

      <ProductLoadMoreGrid
        products={categoryProducts}
        imageSrcById={imageSrcById}
        resetKey={category}
        emptyMessage="Bu kategoriye ait ürün bulunamadı."
      />

      <div className="mt-12 flex flex-wrap gap-3">
        {allCategories
          .filter((item) => item.slug !== category)
          .slice(0, 8)
          .map((item) => (
            <Link
              key={String(item.slug)}
              href={`/kategori/${item.slug}`}
              className={`rounded-md border ${brandClasses.border} px-3 py-1.5 text-xs ${brandClasses.textMuted} hover:text-[#F5F5F5]`}
            >
              {item.name}
            </Link>
          ))}
      </div>
    </section>
  );
}
