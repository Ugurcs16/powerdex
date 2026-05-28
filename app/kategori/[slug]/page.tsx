import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { featuredCategories } from "@/data/categories";
import { products } from "@/data/products";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const categoryInfo: Record<string, { name: string; description: string }> = {
  "el-fenerleri": {
    name: "El Fenerleri",
    description: "Kompakt, guclu ve her an hazir aydinlatma.",
  },
  "kafa-lambalari": {
    name: "Kafa Lambalari",
    description: "Eller serbest kullanim icin hafif ve guclu cozumler.",
  },
  "kamp-lambalari": {
    name: "Kamp Lambalari",
    description: "Cadir, masa ve acik alan icin uzun sureli isik.",
  },
  "solar-aydinlatma": {
    name: "Solar Aydinlatma",
    description: "Gunes enerjisi destekli pratik aydinlatma.",
  },
  "outdoor-aydinlatma": {
    name: "Outdoor Aydinlatma",
    description: "Outdoor saha ihtiyaclari icin guvenilir aydinlatma cozumleri.",
  },
  "piller-sarj": {
    name: "Piller & Sarj",
    description: "18650 piller, sarjli piller ve Type-C uyumlu enerji urunleri.",
  },
  "18650-piller": {
    name: "18650 Piller",
    description: "Yuksek enerji yogunlugu sunan 18650 pil cozumleri.",
  },
  "sarjli-piller": {
    name: "Sarjli Piller",
    description: "Tekrar kullanilabilir sarjli pil secenekleri.",
  },
  "usb-type-c-sarjli-urunler": {
    name: "USB / Type-C Sarjli Urunler",
    description: "Hizli sarj ve tasinabilir enerji odakli urunler.",
  },
  "kisisel-bakim": {
    name: "Kisisel Bakim",
    description: "Gunluk kullanim ve profesyonel ihtiyaclar icin secili bakim urunleri.",
  },
  "profesyonel-kullanim": {
    name: "Profesyonel Kullanim",
    description: "Guvenlik, kamp, arac ve acil durum icin sahaya uygun urun secimi.",
  },
  guvenlik: {
    name: "Guvenlik",
    description: "Saha kontrol ve devriye kullanimina uygun urunler.",
  },
  "kamp-outdoor": {
    name: "Kamp & Outdoor",
    description: "Doga ve acik alan kullanimina uygun urun secimleri.",
  },
  "arac-tamir": {
    name: "Arac / Tamir",
    description: "Arac ici ve tamir senaryolari icin odakli aydinlatma.",
  },
  "acil-durum": {
    name: "Acil Durum",
    description: "Kesinti ve acil senaryolar icin hazir cozumler.",
  },
  "tiras-makineleri": {
    name: "Tiras Makineleri",
    description: "Gunluk kullanim icin pratik tiras cozumleri.",
  },
  "berber-makaslari": {
    name: "Berber Makaslari",
    description: "Profesyonel kesim icin dengeli ve dayanikli makaslar.",
  },
  "fon-makinesi": {
    name: "Fon Makinesi",
    description: "Guclu hava akisiyla hizli sekillendirme cozumleri.",
  },
  "sac-duzlestirici": {
    name: "Sac Duzlestirici",
    description: "Gunluk duzlestirme ihtiyaci icin pratik urunler.",
  },
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryInfo[slug];
  if (!category) {
    return { title: "Kategori Bulunamadi" };
  }

  return {
    title: `${category.name} Urunleri`,
    description: `${category.name} kategorisindeki Powerdex urunlerini kesfedin.`,
  };
}

export async function generateStaticParams() {
  return Object.keys(categoryInfo).map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryInfo[slug];

  if (!category) {
    notFound();
  }

  const featuredCategorySlugs = featuredCategories.map((item) => item.slug);
  const categoryProducts = products.filter((product) => {
    if (featuredCategorySlugs.includes(slug)) return product.categorySlug === slug;
    if (slug === "outdoor-aydinlatma") {
      return ["el-fenerleri", "kafa-lambalari", "kamp-lambalari", "solar-aydinlatma"].includes(
        product.categorySlug,
      );
    }
    if (slug === "piller-sarj") return true;
    if (slug === "kisisel-bakim") return false;
    if (slug === "profesyonel-kullanim") return true;
    return false;
  });

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="text-4xl font-bold text-white">{category.name}</h1>
        <p className="mt-3 max-w-2xl text-zinc-400">{category.description}</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryProducts.map((product) => (
          <article key={product.id} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="relative h-52 overflow-hidden rounded-xl">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-zinc-100">{product.name}</h2>
            <p className="mt-2 text-sm text-zinc-400">{product.shortDescription}</p>
            <Link
              href={`/urun/${product.slug}`}
              className="mt-4 inline-block rounded-md bg-lime-400 px-4 py-2 text-sm font-semibold text-zinc-950"
            >
              Detaylari Gor
            </Link>
          </article>
        ))}
      </div>
      {categoryProducts.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-zinc-700 bg-zinc-900 p-6 text-sm text-zinc-400">
          Bu kategoriye ait urunler yakinda eklenecektir.
        </div>
      ) : null}
    </section>
  );
}
