import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalogProducts, getProductBySlug, getSimilarProducts } from "@/data/products";
import { getCategoryLabel } from "@/data/categories";
import { resolveProductGallery, resolveProductImageSrc } from "@/lib/product-image.server";
import { getProductWhatsAppMessage, getWhatsAppUrl, siteConfig } from "@/lib/site";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { brandClasses } from "@/lib/brand";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return catalogProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Ürün Bulunamadı" };
  }

  const titleCore = product.name.replace(/^Powerdex\s+/i, "");
  const title = product.sku
    ? `Powerdex ${product.sku} ${titleCore.replace(new RegExp(`^${product.sku}\\s*`, "i"), "")}`.trim()
    : product.name;

  return {
    title,
    description: product.shortDescription,
    alternates: {
      canonical: `${siteConfig.url}/urun/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const similarProducts = getSimilarProducts(product, 3);
  const categoryLabel = getCategoryLabel(product.category);
  const gallery = resolveProductGallery(product);
  const whatsappHref = getWhatsAppUrl(getProductWhatsAppMessage(product));

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: "Powerdex" },
    image: gallery.map((item) => `${siteConfig.url}${item}`),
    category: categoryLabel,
    sku: product.sku || undefined,
    url: `${siteConfig.url}/urun/${product.slug}`,
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Script id="product-schema" type="application/ld+json">
        {JSON.stringify(productSchema)}
      </Script>

      <nav className={`mb-6 text-xs ${brandClasses.textMuted}`}>
        <Link href="/" className="hover:text-[#F5F5F5]">
          Ana Sayfa
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/kategori/${product.category}`} className="hover:text-[#F5F5F5]">
          {categoryLabel}
        </Link>
        <span className="mx-2">/</span>
        <span className={brandClasses.text}>{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={gallery} alt={product.name} category={product.category} />

        <div className="space-y-6">
          <p className={`text-xs uppercase tracking-[0.15em] ${brandClasses.accent}`}>{categoryLabel}</p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{product.name}</h1>
          {product.sku ? <p className={`text-sm ${brandClasses.textMuted}`}>SKU: {product.sku}</p> : null}

          <p className={`leading-relaxed ${brandClasses.textMuted}`}>{product.shortDescription}</p>

          {product.highlights.length > 0 ? (
            <ul className={`list-none space-y-2 border-t ${brandClasses.border} pt-4 text-sm ${brandClasses.textMuted}`}>
              {product.highlights.map((item) => (
                <li key={item}>{item.replace(/^[-—–\s]+/, "")}</li>
              ))}
            </ul>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-lg px-5 py-3 font-semibold ${brandClasses.accentBg}`}
            >
              WhatsApp ile Bilgi / Teklif Al
            </a>
            <Link
              href="/iletisim"
              className="rounded-lg border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-100"
            >
              İletişim Formu
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className={`${brandClasses.cardSurface} p-6`}>
          <h2 className="text-xl font-semibold text-zinc-100">Teknik Özellikler</h2>
          {Object.keys(product.specifications).length > 0 ? (
            <dl className="mt-4 space-y-3 text-sm">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className={`flex items-start justify-between gap-4 border-b ${brandClasses.border} pb-2`}>
                  <dt className={brandClasses.textMuted}>{key}</dt>
                  <dd className="text-right text-zinc-200">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className={`mt-3 text-sm ${brandClasses.textMuted}`}>
              Bu ürün için teknik özellikler resmi katalog ile doğrulanacaktır.
            </p>
          )}
        </article>

        <article className={`${brandClasses.cardSurface} p-6`}>
          <h2 className="text-xl font-semibold text-zinc-100">Kullanım Alanları</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {product.useCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className={`${brandClasses.cardSurface} p-6`}>
          <h2 className="text-xl font-semibold text-zinc-100">Kutu İçeriği</h2>
          {product.boxContents.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {product.boxContents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className={`mt-3 text-sm ${brandClasses.textMuted}`}>Kutu içeriği resmi katalogda doğrulanacaktır.</p>
          )}
        </article>

        <article className={`${brandClasses.cardSurface} p-6`}>
          <h2 className="text-xl font-semibold text-zinc-100">Uyarılar</h2>
          {product.warnings.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {product.warnings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className={`mt-3 text-sm ${brandClasses.textMuted}`}>
              Ürünü kullanmadan önce kılavuzdaki güvenlik uyarılarını okuyun.
            </p>
          )}
        </article>
      </div>

      {product.description && product.description !== product.shortDescription ? (
        <article className={`mt-8 ${brandClasses.cardSurface} p-6`}>
          <h2 className="text-xl font-semibold text-zinc-100">Açıklama</h2>
          <p className={`mt-3 text-sm leading-relaxed ${brandClasses.textMuted}`}>{product.description}</p>
        </article>
      ) : null}

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-zinc-100">Benzer Ürünler</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {similarProducts.map((item) => (
            <ProductCard key={item.id} product={item} imageSrc={resolveProductImageSrc(item)} />
          ))}
        </div>
        {similarProducts.length === 0 ? (
          <p className={`mt-4 text-sm ${brandClasses.textMuted}`}>Bu kategoride başka ürün bulunamadı.</p>
        ) : null}
      </section>
    </section>
  );
}
