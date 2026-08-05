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

export const allCategories: CategoryItem[] = (
  Object.keys(categoryLabels) as ProductCategory[]
).map((slug) => ({
  name: categoryLabels[slug],
  slug,
  description: categoryDescriptions[slug],
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

export const featuredCategories: CategoryItem[] = [
  {
    name: "Metal El Fenerleri",
    slug: "metal-el-fenerleri",
    description: "Dayanıklı gövde ve güçlü ışık performansı.",
    image: "/images/products/metalelfeneri.jpg",
  },
  {
    name: "Kafa Lambaları",
    slug: "kafa-lambalari",
    description: "Eller serbest profesyonel kullanım.",
    image: "/images/products/kafalambasi.jpg",
  },
];
