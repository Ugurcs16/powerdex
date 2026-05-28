export type CategoryItem = {
  name: string;
  slug: string;
  description: string;
  image: string;
};

export type NavCategory = {
  title: string;
  slug: string;
  items?: { name: string; slug: string }[];
};

export const primaryNavigation: NavCategory[] = [
  { title: "Ana Sayfa", slug: "/" },
  {
    title: "Outdoor Aydinlatma",
    slug: "/kategori/outdoor-aydinlatma",
    items: [
      { name: "El Fenerleri", slug: "el-fenerleri" },
      { name: "Kafa Lambalari", slug: "kafa-lambalari" },
      { name: "Kamp Lambalari", slug: "kamp-lambalari" },
      { name: "Solar Aydinlatma", slug: "solar-aydinlatma" },
    ],
  },
  {
    title: "Piller & Sarj",
    slug: "/kategori/piller-sarj",
    items: [
      { name: "18650 Piller", slug: "18650-piller" },
      { name: "Sarjli Piller", slug: "sarjli-piller" },
      { name: "USB / Type-C Sarjli Urunler", slug: "usb-type-c-sarjli-urunler" },
    ],
  },
  {
    title: "Kisisel Bakim",
    slug: "/kategori/kisisel-bakim",
    items: [
      { name: "Tiras Makineleri", slug: "tiras-makineleri" },
      { name: "Berber Makaslari", slug: "berber-makaslari" },
      { name: "Fon Makinesi", slug: "fon-makinesi" },
      { name: "Sac Duzlestirici", slug: "sac-duzlestirici" },
    ],
  },
  {
    title: "Profesyonel Kullanim",
    slug: "/kategori/profesyonel-kullanim",
    items: [
      { name: "Guvenlik", slug: "guvenlik" },
      { name: "Kamp & Outdoor", slug: "kamp-outdoor" },
      { name: "Arac / Tamir", slug: "arac-tamir" },
      { name: "Acil Durum", slug: "acil-durum" },
    ],
  },
  { title: "Hakkimizda", slug: "/hakkimizda" },
  { title: "Iletisim", slug: "/iletisim" },
];

export const featuredCategories: CategoryItem[] = [
  {
    name: "El Fenerleri",
    slug: "el-fenerleri",
    description: "Kompakt, guclu ve her an hazir aydinlatma.",
    image: "/images/products/placeholder-product.svg",
  },
  {
    name: "Kafa Lambalari",
    slug: "kafa-lambalari",
    description: "Eller serbest kullanim icin hafif ve guclu cozumler.",
    image: "/images/products/placeholder-product.svg",
  },
  {
    name: "Kamp Lambalari",
    slug: "kamp-lambalari",
    description: "Cadir, masa ve acik alan icin uzun sureli isik.",
    image: "/images/products/placeholder-product.svg",
  },
  {
    name: "Solar Urunler",
    slug: "solar-aydinlatma",
    description: "Gunes enerjisi destekli pratik aydinlatma.",
    image: "/images/products/placeholder-product.svg",
  },
  {
    name: "Piller & Sarj",
    slug: "piller-sarj",
    description: "Sarjli kullanim ve yedek enerji cozumleri.",
    image: "/images/products/placeholder-product.svg",
  },
  {
    name: "Kisisel Bakim",
    slug: "kisisel-bakim",
    description: "Gunluk kullanim icin pratik bakim urunleri.",
    image: "/images/products/placeholder-product.svg",
  },
];
