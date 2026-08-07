import type { ProductCategory } from "@/types/product";

export type CategoryItem = {
  name: string;
  slug: ProductCategory | string;
  description: string;
  image?: string;
};

export type NavCategory = {
  title: string;
  slug: string;
  items?: { name: string; slug: string }[];
};

export const categoryLabels: Record<ProductCategory, string> = {
  "metal-el-fenerleri": "Metal El Fenerleri",
  "kafa-lambalari": "Kafa Lambaları",
  "kamp-lambalari": "Kamp Lambaları",
  "solar-aydinlatma": "Solar Aydınlatma",
  "piller-sarj": "Piller & Şarj",
  "masa-lambalari": "Masa Lambaları",
  "tiras-makineleri": "Tıraş Makineleri",
  "berber-makaslari": "Berber Makasları",
  "fon-makineleri": "Fön Makineleri",
  "sac-duzlestiriciler": "Saç Düzleştiriciler",
  "hesap-makineleri": "Hesap Makineleri",
  "jet-fan": "Jet Fan",
  diger: "Diğer Ürünler",
};

export const categoryDescriptions: Record<ProductCategory, string> = {
  "metal-el-fenerleri":
    "Zorlu koşullar, teknik işler ve profesyonel kullanım için dayanıklı metal gövdeli el fenerleri.",
  "kafa-lambalari":
    "Eller serbest kullanım gerektiren teknik, servis ve outdoor senaryoları için kafa lambaları.",
  "kamp-lambalari": "Kamp, açık alan ve acil durum kullanımına uygun taşınabilir aydınlatma çözümleri.",
  "solar-aydinlatma": "Güneş enerjili aydınlatma ve solar panel çözümleri.",
  "piller-sarj": "Powerdex orijinal piller ve şarj edilebilir enerji çözümleri.",
  "masa-lambalari": "Masaüstü ve iç mekan kullanımına uygun masa lambaları.",
  "tiras-makineleri": "Kişisel bakım ve profesyonel tıraş makineleri.",
  "berber-makaslari": "Berber ve kuaför kullanımına uygun makaslar.",
  "fon-makineleri": "Saç şekillendirme için fön makineleri.",
  "sac-duzlestiriciler": "Saç düzleştirici ve şekillendirme ürünleri.",
  "hesap-makineleri": "Ofis ve muhasebe kullanımına uygun hesap makineleri.",
  "jet-fan": "Saha ve genel kullanım için jet fan çözümleri.",
  diger: "Diğer Powerdex ürünleri.",
};

/** Maps alternate URL slugs to canonical ProductCategory */
export const categoryAliases: Record<string, ProductCategory> = {
  "kamp-aydinlatma": "kamp-lambalari",
  "fon-makinesi": "fon-makineleri",
  "sac-duzlestirici": "sac-duzlestiriciler",
  "hesap-makinesi": "hesap-makineleri",
};

export function resolveCategorySlug(slug: string): ProductCategory | null {
  if (slug in categoryLabels) return slug as ProductCategory;
  if (slug in categoryAliases) return categoryAliases[slug];
  return null;
}

export function getCategoryLabel(category: ProductCategory | string): string {
  if (category in categoryLabels) {
    return categoryLabels[category as ProductCategory];
  }
  return category;
}

/** Canonical focus/category card images — single source of truth. */
export const focusCategoryImages = {
  "metal-el-fenerleri": "/images/products/metalelfeneri.jpg",
  "kafa-lambalari": "/images/products/kafalambasi.jpg",
} as const;

/** Alias used by getCategoryImage / expertise cards. */
export const categoryImages: Partial<Record<ProductCategory, string>> = {
  ...focusCategoryImages,
};

export function getCategoryImage(slug: ProductCategory | string): string | undefined {
  return categoryImages[slug as ProductCategory];
}

export type ExpertiseCategory = {
  name: string;
  slug: ProductCategory;
  image: string;
  shortDescription: string;
  description: string;
  features: string[];
  cta: string;
  hint: string;
};

/** Shared Metal / Kafa category cards (homepage expertise + hero hints). */
export const expertiseCategories: ExpertiseCategory[] = [
  {
    name: "Metal El Fenerleri",
    slug: "metal-el-fenerleri",
    image: focusCategoryImages["metal-el-fenerleri"],
    shortDescription: "Güçlü ve dayanıklı modeller.",
    description:
      "Zorlu koşullar, teknik işler, araç kullanımı ve güvenlik ihtiyaçları için güçlü gövde yapısına sahip el fenerleri.",
    features: ["Metal gövde", "Güçlü ışık", "Şarjlı kullanım", "Kompakt tasarım"],
    cta: "Metal Fenerleri İncele",
    hint: "Güçlü ışık · Şarjlı",
  },
  {
    name: "Kafa Lambaları",
    slug: "kafa-lambalari",
    image: focusCategoryImages["kafa-lambalari"],
    shortDescription: "Eller serbest aydınlatma.",
    description:
      "Eller serbest kullanım gerektiren kamp, tamir, servis, güvenlik ve outdoor senaryoları için pratik çözümler.",
    features: [
      "Eller serbest kullanım",
      "Uzun çalışma süresi",
      "Hafif yapı",
      "Çoklu ışık modu",
    ],
    cta: "Kafa Lambalarını Gör",
    hint: "Eller serbest",
  },
];

export const allCategories: CategoryItem[] = (
  Object.keys(categoryLabels) as ProductCategory[]
).map((slug) => ({
  name: categoryLabels[slug],
  slug,
  description: categoryDescriptions[slug],
  image: getCategoryImage(slug),
}));

export const primaryNavigation: NavCategory[] = [
  { title: "Ana Sayfa", slug: "/" },
  { title: "Metal El Fenerleri", slug: "/kategori/metal-el-fenerleri" },
  { title: "Kafa Lambaları", slug: "/kategori/kafa-lambalari" },
  { title: "Kamp Aydınlatma", slug: "/kategori/kamp-lambalari" },
  { title: "Piller & Şarj", slug: "/kategori/piller-sarj" },
  {
    title: "Tüm Ürünler",
    slug: "/urunler",
    items: [
      { name: "Masa Lambaları", slug: "masa-lambalari" },
      { name: "Tıraş Makineleri", slug: "tiras-makineleri" },
      { name: "Berber Makasları", slug: "berber-makaslari" },
      { name: "Fön Makineleri", slug: "fon-makineleri" },
      { name: "Saç Düzleştiriciler", slug: "sac-duzlestiriciler" },
      { name: "Hesap Makineleri", slug: "hesap-makineleri" },
      { name: "Jet Fan", slug: "jet-fan" },
      { name: "Solar Aydınlatma", slug: "solar-aydinlatma" },
      { name: "Diğer Ürünler", slug: "diger" },
    ],
  },
  { title: "Hakkımızda", slug: "/hakkimizda" },
  { title: "İletişim", slug: "/iletisim" },
];

export const footerMainLinks: { name: string; slug: string; href?: string }[] = [
  { name: "Metal El Fenerleri", slug: "metal-el-fenerleri" },
  { name: "Kafa Lambaları", slug: "kafa-lambalari" },
  { name: "Kamp Aydınlatma", slug: "kamp-lambalari" },
  { name: "Piller & Şarj", slug: "piller-sarj" },
  { name: "Tüm Ürünler", slug: "urunler", href: "/urunler" },
];

export const footerOtherProducts = [
  { name: "Masa Lambaları", slug: "masa-lambalari" },
  { name: "Tıraş Makineleri", slug: "tiras-makineleri" },
  { name: "Berber Makasları", slug: "berber-makaslari" },
  { name: "Fön Makineleri", slug: "fon-makineleri" },
  { name: "Saç Düzleştiriciler", slug: "sac-duzlestiriciler" },
  { name: "Hesap Makineleri", slug: "hesap-makineleri" },
  { name: "Jet Fan", slug: "jet-fan" },
  { name: "Solar Aydınlatma", slug: "solar-aydinlatma" },
];

export const featuredCategories: CategoryItem[] = expertiseCategories.map((item) => ({
  name: item.name,
  slug: item.slug,
  description: item.shortDescription,
  image: item.image,
}));
