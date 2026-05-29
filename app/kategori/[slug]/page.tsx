import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { brandClasses } from "@/lib/brand";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const categoryInfo: Record<string, { name: string; description: string }> = {
  "metal-el-fenerleri": {
    name: "Metal El Fenerleri",
    description:
      "Zorlu koşullar, teknik işler ve profesyonel kullanım için dayanıklı metal gövdeli el fenerleri.",
  },
  "kafa-lambalari": {
    name: "Kafa Lambaları",
    description:
      "Eller serbest kullanım gerektiren teknik, servis ve outdoor senaryoları için kafa lambaları.",
  },
  "kamp-aydinlatma": {
    name: "Kamp Aydınlatma",
    description: "Kamp, açık alan ve acil durum kullanımına uygun taşınabilir aydınlatma çözümleri.",
  },
  "kamp-lambalari": {
    name: "Kamp Lambaları",
    description: "Çadır, masa ve açık alan için uzun süreli kamp aydınlatması.",
  },
  "profesyonel-kullanim": {
    name: "Profesyonel Kullanım",
    description: "Güvenlik, araç, şantiye ve acil durum için saha odaklı aydınlatma seçimi.",
  },
  guvenlik: {
    name: "Güvenlik",
    description: "Devriye ve saha kontrolü için güvenilir aydınlatma ürünleri.",
  },
  "arac-tamir": {
    name: "Araç / Tamir",
    description: "Araç içi ve tamir alanlarında odaklı ışık performansı.",
  },
  santiye: {
    name: "Şantiye",
    description: "Şantiye ve atölye ortamlarında dayanıklı kullanım için ürünler.",
  },
  "kamp-outdoor": {
    name: "Kamp & Outdoor",
    description: "Açık alan ve gece aktiviteleri için dengeli aydınlatma.",
  },
  "acil-durum": {
    name: "Acil Durum",
    description: "Kesinti ve beklenmeyen senaryolar için hazır çözümler.",
  },
  "tiras-makineleri": { name: "Tıraş Makineleri", description: "Diğer ürün kategorisi." },
  "berber-makaslari": { name: "Berber Makasları", description: "Diğer ürün kategorisi." },
  "fon-makinesi": { name: "Fön Makinesi", description: "Diğer ürün kategorisi." },
  "sac-duzlestirici": { name: "Saç Düzleştirici", description: "Diğer ürün kategorisi." },
  "hesap-makinesi": { name: "Hesap Makinesi", description: "Diğer ürün kategorisi." },
};

function getCategoryProducts(slug: string) {
  if (slug === "metal-el-fenerleri") {
    return products.filter((p) => p.categorySlug === "metal-el-fenerleri");
  }
  if (slug === "kafa-lambalari") {
    return products.filter((p) => p.categorySlug === "kafa-lambalari");
  }
  if (slug === "kamp-aydinlatma" || slug === "kamp-lambalari") {
    return products.filter((p) => p.categorySlug === "kamp-aydinlatma");
  }
  if (slug === "profesyonel-kullanim") {
    return products.filter((p) => p.priority !== "other");
  }
  if (["guvenlik", "arac-tamir", "santiye", "kamp-outdoor", "acil-durum"].includes(slug)) {
    return products.filter(
      (p) =>
        p.categorySlug === "metal-el-fenerleri" ||
        p.categorySlug === "kafa-lambalari" ||
        p.categorySlug === "kamp-aydinlatma",
    );
  }
  return [];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryInfo[slug];
  if (!category) {
    return { title: "Kategori Bulunamadı" };
  }

  return {
    title: `${category.name}`,
    description: `${category.name} — Powerdex profesyonel aydınlatma ürünleri.`,
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

  const categoryProducts = getCategoryProducts(slug);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className={`${brandClasses.cardSurface} p-8`}>
        <p className={`text-xs uppercase tracking-[0.2em] ${brandClasses.accent}`}>
          Profesyonel Aydınlatma
        </p>
        <h1 className="mt-2 text-4xl font-bold text-white">{category.name}</h1>
        <p className={`mt-3 max-w-2xl ${brandClasses.textMuted}`}>{category.description}</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {categoryProducts.length === 0 ? (
        <div
          className={`mt-8 rounded-xl border border-dashed ${brandClasses.border} bg-[#151922] p-6 text-sm ${brandClasses.textMuted}`}
        >
          Bu kategoriye ait ürünler yakında eklenecektir.
        </div>
      ) : null}
    </section>
  );
}
