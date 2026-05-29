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
  { title: "Metal El Fenerleri", slug: "/kategori/metal-el-fenerleri" },
  { title: "Kafa Lambaları", slug: "/kategori/kafa-lambalari" },
  { title: "Kamp Aydınlatma", slug: "/kategori/kamp-aydinlatma" },
  {
    title: "Profesyonel Kullanım",
    slug: "/kategori/profesyonel-kullanim",
    items: [
      { name: "Güvenlik", slug: "guvenlik" },
      { name: "Araç / Tamir", slug: "arac-tamir" },
      { name: "Şantiye", slug: "santiye" },
      { name: "Kamp & Outdoor", slug: "kamp-outdoor" },
      { name: "Acil Durum", slug: "acil-durum" },
    ],
  },
  { title: "Hakkımızda", slug: "/hakkimizda" },
  { title: "İletişim", slug: "/iletisim" },
];

export const footerMainLinks = [
  { name: "Metal El Fenerleri", slug: "metal-el-fenerleri" },
  { name: "Kafa Lambaları", slug: "kafa-lambalari" },
  { name: "Kamp Aydınlatma", slug: "kamp-aydinlatma" },
  { name: "Profesyonel Kullanım", slug: "profesyonel-kullanim" },
];

export const footerOtherProducts = [
  { name: "Tıraş Makineleri", slug: "tiras-makineleri" },
  { name: "Berber Makasları", slug: "berber-makaslari" },
  { name: "Fön Makinesi", slug: "fon-makinesi" },
  { name: "Saç Düzleştirici", slug: "sac-duzlestirici" },
  { name: "Hesap Makinesi", slug: "hesap-makinesi" },
];

/** Eski geniş kategori grid — ana sayfada kullanılmıyor */
export const featuredCategories: CategoryItem[] = [
  {
    name: "Metal El Fenerleri",
    slug: "metal-el-fenerleri",
    description: "Dayanıklı gövde ve güçlü ışık performansı.",
    image: "/images/products/pd-7007.jpg",
  },
  {
    name: "Kafa Lambaları",
    slug: "kafa-lambalari",
    description: "Eller serbest profesyonel kullanım.",
    image: "/images/products/pd-1072.jpg",
  },
];
