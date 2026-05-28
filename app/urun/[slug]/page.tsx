import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return { title: "Urun Bulunamadi" };
  }

  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const similarProducts = products
    .filter((item) => item.categorySlug === product.categorySlug && item.id !== product.id)
    .slice(0, 3);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: "Powerdex" },
    image: `https://www.powerdex.com.tr${product.image}`,
    category: product.category,
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Script id="product-schema" type="application/ld+json">
        {JSON.stringify(productSchema)}
      </Script>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative h-[380px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="relative h-24 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                <Image src={product.image} alt={`${product.name} galeri ${item}`} fill className="object-cover" />
              </div>
            ))}
          </div>
          {product.video ? (
            <video controls className="w-full rounded-2xl border border-zinc-800" preload="metadata">
              <source src={product.video} type="video/mp4" />
            </video>
          ) : null}
        </div>

        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.15em] text-lime-400">{product.category}</p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{product.name}</h1>
          <p className="leading-relaxed text-zinc-300">{product.shortDescription}</p>

          <div className="grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:grid-cols-2">
            {Object.entries(product.technicalSpecs).map(([key, value]) => (
              <div key={key}>
                <p className="text-xs uppercase text-zinc-500">{key}</p>
                <p className="text-sm text-zinc-200">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-lg bg-lime-400 px-5 py-3 font-semibold text-zinc-950">
              {product.priceLabel}
            </button>
            <Link
              href="/iletisim"
              className="rounded-lg border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-100"
            >
              Teklif Al
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-zinc-100">Kullanim Alanlari</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {product.usageAreas.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-zinc-100">Kutu Icerigi</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {product.boxContents.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-zinc-100">Guvenlik / Kullanim Uyarisi</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {product.warnings.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-zinc-100">SSS</h2>
          <div className="mt-3 space-y-3 text-sm text-zinc-300">
            {product.faq.map((item) => (
              <div key={item.question}>
                <p className="font-semibold text-zinc-100">{item.question}</p>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-zinc-100">Benzer Urunler</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {similarProducts.map((item) => (
            <Link key={item.id} href={`/urun/${item.slug}`} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-sm text-lime-400">{item.category}</p>
              <p className="mt-2 font-semibold text-zinc-100">{item.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
