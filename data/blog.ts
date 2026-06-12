export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    title: "El feneri seçerken nelere dikkat edilmeli?",
    slug: "el-feneri-secerken-nelere-dikkat-edilmeli",
    excerpt:
      "Doğru el fenerini seçmek için lümen, batarya, gövde malzemesi ve kullanım senaryolarını birlikte değerlendirin.",
    category: "Ürün Rehberi",
    readTime: "4 dk",
    publishedAt: "2026-05-28",
    content: [
      "El feneri seçiminde ilk kriter kullanım amacıdır. Kamp, araç veya güvenlik için farklı ışık karakterleri gerekir.",
      "Lümen değeri kadar ışık odağı ve mod çeşitliliği de önemlidir.",
      "Sağlam gövde, şarj tipi ve suya dayanım gibi faktörler ürünün uzun ömürlü olmasını sağlar.",
    ],
  },
  {
    title: "Lümen nedir, ne kadar lümen yeterlidir?",
    slug: "lumen-nedir-ne-kadar-lumen-yeterlidir",
    excerpt:
      "Lümen değeri ışık şiddetini ifade eder; ama ideal lümen ihtiyacı kullanım senaryosuna göre değişir.",
    category: "Teknik Bilgi",
    readTime: "3 dk",
    publishedAt: "2026-05-28",
    content: [
      "Lümen, cihazın üretebildiği toplam ışık miktarıdır.",
      "Kapalı alanlarda orta seviye lümen yeterli olabilirken, outdoor kullanımda daha yüksek lümen gerekir.",
      "Yüksek lümen ile batarya süresi arasında denge kurmak optimum seçim için kritik öneme sahiptir.",
    ],
  },
  {
    title: "Kamp lambası mı kafa lambası mı?",
    slug: "kamp-lambasi-mi-kafa-lambasi-mi",
    excerpt:
      "Kamp lambası alan aydınlatmada, kafa lambası ise hareketli görevlerde öne çıkar.",
    category: "Karşılaştırma",
    readTime: "4 dk",
    publishedAt: "2026-05-28",
    content: [
      "Kamp lambaları geniş açılı aydınlatma sağlar ve ortak kullanım alanları için idealdir.",
      "Kafa lambaları eller serbest çalışmaya izin verdiği için tamir ve yürüyüş aktivitelerinde avantajlıdır.",
      "İki ürün tipi birlikte kullanıldığında daha güvenli bir outdoor deneyimi elde edilir.",
    ],
  },
  {
    title: "18650 pil nedir?",
    slug: "18650-pil-nedir",
    excerpt:
      "18650 piller, yüksek enerji yoğunluğu ve tekrar şarj edilebilir yapıyla taşınabilir cihazlarda yaygın kullanılır.",
    category: "Pil Rehberi",
    readTime: "3 dk",
    publishedAt: "2026-05-28",
    content: [
      "18650 pil, adını fiziksel ölçülerinden alır ve birçok performans odaklı üründe kullanılır.",
      "Doğru şarj cihazı ile kullanıldığında güvenli ve uzun ömürlü bir enerji çözümüdür.",
      "Marka güvencesi ve kalite kontrolü pil performansında belirleyicidir.",
    ],
  },
  {
    title: "Acil durum çantasında hangi aydınlatma ürünleri olmalı?",
    slug: "acil-durum-cantasinda-hangi-aydinlatma-urunleri-olmali",
    excerpt:
      "Acil durumlar için çok modlu el feneri, kafa lambası ve yedek şarj çözümleri mutlaka bulundurulmalıdır.",
    category: "Acil Durum",
    readTime: "5 dk",
    publishedAt: "2026-05-28",
    content: [
      "Acil durum çantası için temel ürünler güçlü bir el feneri ve eller serbest kullanım sunan kafa lambasıdır.",
      "Powerbank özellikli veya USB Type-C şarj destekli ürünler süreklilik sağlar.",
      "Yedek pil ve çoklu ışık modu sayesinde farklı senaryolara hızlı adapte olunabilir.",
    ],
  },
];
