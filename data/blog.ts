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
    title: "El feneri secerken nelere dikkat edilmeli?",
    slug: "el-feneri-secerken-nelere-dikkat-edilmeli",
    excerpt:
      "Dogru el fenerini secmek icin lumen, batarya, govde malzemesi ve kullanim senaryolarini birlikte degerlendirin.",
    category: "Urun Rehberi",
    readTime: "4 dk",
    publishedAt: "2026-05-28",
    content: [
      "El feneri seciminde ilk kriter kullanim amacidir. Kamp, arac veya guvenlik icin farkli isik karakterleri gerekir.",
      "Lumen degeri kadar isik odagi ve mod cesitliligi de onemlidir.",
      "Saglam govde, sarj tipi ve suya dayanim gibi faktorler urunun uzun omurlu olmasini saglar.",
    ],
  },
  {
    title: "Lumen nedir, ne kadar lumen yeterlidir?",
    slug: "lumen-nedir-ne-kadar-lumen-yeterlidir",
    excerpt:
      "Lumen degeri isik siddetini ifade eder; ama ideal lumen ihtiyaci kullanim senaryosuna gore degisir.",
    category: "Teknik Bilgi",
    readTime: "3 dk",
    publishedAt: "2026-05-28",
    content: [
      "Lumen, cihazin uretebildigi toplam isik miktaridir.",
      "Kapali alanlarda orta seviye lumen yeterli olabilirken, outdoor kullanimda daha yuksek lumen gerekir.",
      "Yuksek lumen ile batarya suresi arasinda denge kurmak optimum secim icin kritik oneme sahiptir.",
    ],
  },
  {
    title: "Kamp lambasi mi kafa lambasi mi?",
    slug: "kamp-lambasi-mi-kafa-lambasi-mi",
    excerpt:
      "Kamp lambasi alan aydinlatmada, kafa lambasi ise hareketli gorevlerde one cikar.",
    category: "Karsilastirma",
    readTime: "4 dk",
    publishedAt: "2026-05-28",
    content: [
      "Kamp lambalari genis acili aydinlatma saglar ve ortak kullanim alanlari icin idealdir.",
      "Kafa lambalari eller serbest calismaya izin verdigi icin tamir ve yuruyus aktivitelerinde avantajlidir.",
      "Iki urun tipi birlikte kullanildiginda daha guvenli bir outdoor deneyimi elde edilir.",
    ],
  },
  {
    title: "18650 pil nedir?",
    slug: "18650-pil-nedir",
    excerpt:
      "18650 piller, yuksek enerji yogunlugu ve tekrar sarj edilebilir yapiyla tasinabilir cihazlarda yaygin kullanilir.",
    category: "Pil Rehberi",
    readTime: "3 dk",
    publishedAt: "2026-05-28",
    content: [
      "18650 pil, adini fiziksel olculerinden alir ve bircok performans odakli urunde kullanilir.",
      "Dogru sarj cihazi ile kullanildiginda guvenli ve uzun omurlu bir enerji cozumudur.",
      "Marka guvencesi ve kalite kontrolu pil performansinda belirleyicidir.",
    ],
  },
  {
    title: "Acil durum cantasinda hangi aydinlatma urunleri olmali?",
    slug: "acil-durum-cantasinda-hangi-aydinlatma-urunleri-olmali",
    excerpt:
      "Acil durumlar icin cok modlu el feneri, kafa lambasi ve yedek sarj cozumleri mutlaka bulundurulmalidir.",
    category: "Acil Durum",
    readTime: "5 dk",
    publishedAt: "2026-05-28",
    content: [
      "Acil durum cantasi icin temel urunler guclu bir el feneri ve eller serbest kullanim sunan kafa lambasidir.",
      "Powerbank ozellikli veya USB Type-C sarj destekli urunler sureklilik saglar.",
      "Yedek pil ve coklu isik modu sayesinde farkli senaryolara hizli adapte olunabilir.",
    ],
  },
];
