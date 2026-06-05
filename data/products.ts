export type ProductPriority = "primary" | "secondary" | "other";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  image: string;
  video?: string;
  priceLabel: string;
  priority: ProductPriority;
  usageTags: string[];
  shortDescription: string;
  features: string[];
  technicalSpecs: Record<string, string>;
  usageAreas: string[];
  boxContents: string[];
  warnings: string[];
  faq: { question: string; answer: string }[];
  highlight: {
    lumen: string;
    runtime: string;
    chargingType: string;
    usage: string;
    weight: string;
    standout: string;
  };
};

export const products: Product[] = [
  {
    id: "pd-7007",
    slug: "powerdex-pd-7007-el-feneri",
    name: "Powerdex PD-7007 Metal El Feneri",
    category: "Metal El Fenerleri",
    categorySlug: "metal-el-fenerleri",
    image: "/images/products/metalelfeneri.jpg",
    priceLabel: "Teklif Al",
    priority: "primary",
    usageTags: ["Metal Gövde", "Şarjlı", "Araç/Tamir"],
    shortDescription:
      "Dayanıklı metal gövde, güçlü ışık çıkışı ve pratik taşıma yapısıyla araç, tamir ve acil durum senaryolarına uygun profesyonel el feneri.",
    features: [
      "Metal gövde",
      "Güçlü ışık",
      "Şarjlı kullanım",
      "Strobe / SOS modları",
      "Mıknatıslı montaj",
    ],
    technicalSpecs: {
      Gövde: "Metal / darbe dayanımlı",
      "Işık Modu": "Strobe / SOS / Sabit",
      "Şarj Tipi": "USB Type-C",
      Kullanım: "Araç, tamir, acil durum",
    },
    usageAreas: ["Araç tamiri", "Yol yardımı", "Güvenlik kontrolü"],
    boxContents: ["PD-7007 El Feneri", "USB şarj kablosu", "Kullanım kılavuzu"],
    warnings: [
      "Uzun süre doğrudan göze tutmayın.",
      "Cihazı yüksek ısıda bırakmayın.",
    ],
    faq: [
      {
        question: "Tam şarj ile ne kadar kullanılır?",
        answer: "Kullanım moduna göre değişir; orta modda günlük profesyonel kullanım için yeterli süre sunar.",
      },
    ],
    highlight: {
      lumen: "700 lm",
      runtime: "6 saat",
      chargingType: "Type-C",
      usage: "Araç / Acil Durum",
      weight: "190 gr",
      standout: "Metal gövde, kompakt tasarım",
    },
  },
  {
    id: "pd-8007",
    slug: "powerdex-pd-8007-zoomlu-cok-amacli-el-feneri",
    name: "Powerdex PD-8007 Zoomlu Metal El Feneri",
    category: "Metal El Fenerleri",
    categorySlug: "metal-el-fenerleri",
    image: "/images/products/metalelfeneri.jpg",
    priceLabel: "Teklif Al",
    priority: "primary",
    usageTags: ["Metal Gövde", "Güçlü Işık", "Outdoor"],
    shortDescription:
      "Zoom odaklı ışık yapısı ve çok modlu performansıyla teknik servis, güvenlik ve outdoor kullanım için tasarlanmış metal el feneri.",
    features: [
      "8 ışık modu",
      "Zoom odak",
      "Type-C şarj",
      "Mıknatıslı kullanım",
      "Profesyonel gövde",
    ],
    technicalSpecs: {
      "Işık Modları": "8 farklı mod",
      Odak: "Zoom ayarı",
      "Şarj Tipi": "USB Type-C",
      Kullanım: "Teknik servis, güvenlik, outdoor",
    },
    usageAreas: ["Teknik servis", "Şantiye", "Saha güvenliği"],
    boxContents: ["PD-8007 El Feneri", "Şarj kablosu", "Kullanım kılavuzu"],
    warnings: ["Ürünü suya tam batırmayın.", "Çocuklardan uzak tutun."],
    faq: [
      {
        question: "Zoom modu ne sağlar?",
        answer: "Uzaktaki noktaları veya geniş alanı kullanım ihtiyacına göre odaklayarak kontrollü aydınlatma sunar.",
      },
    ],
    highlight: {
      lumen: "900 lm",
      runtime: "8 saat",
      chargingType: "Type-C",
      usage: "Profesyonel / Outdoor",
      weight: "225 gr",
      standout: "8 mod + zoom odak",
    },
  },
  {
    id: "pd-1072",
    slug: "powerdex-pd-1072-kafa-lambasi",
    name: "Powerdex PD-1072 Kafa Lambası",
    category: "Kafa Lambaları",
    categorySlug: "kafa-lambalari",
    image: "/images/products/kafalambasi.jpg",
    priceLabel: "Teklif Al",
    priority: "primary",
    usageTags: ["Kafa Lambası", "Eller Serbest", "Outdoor"],
    shortDescription:
      "1000 lümen çıkış, hafif gövde ve uzun çalışma süresiyle teknik işler ve outdoor senaryolarda eller serbest aydınlatma sağlar.",
    features: [
      "1000 lümen",
      "2850 mAh batarya",
      "6 saat çalışma",
      "Yağmura dayanım",
      "210 gr",
    ],
    technicalSpecs: {
      Lümen: "1000 lm",
      Batarya: "2850 mAh",
      "Çalışma Süresi": "6 saat",
      Ağırlık: "210 gr",
      Dayanım: "Yağmur suyuna dayanımlı",
    },
    usageAreas: ["Teknik servis", "Kamp yürüyüşü", "Gece çalışmaları"],
    boxContents: ["PD-1072 Kafa Lambası", "Elastik kafa bandı", "Şarj kablosu"],
    warnings: ["Şarj esnasında kullanmayın.", "Bandı aşırı sıkmayın."],
    faq: [
      {
        question: "Band ayarı farklı baş ölçülerine uygun mu?",
        answer: "Evet, ayarlanabilir elastik bant ile farklı kullanımlara uyum sağlar.",
      },
    ],
    highlight: {
      lumen: "1000 lm",
      runtime: "6 saat",
      chargingType: "Type-C",
      usage: "Teknik / Outdoor",
      weight: "210 gr",
      standout: "Eller serbest yüksek performans",
    },
  },
  {
    id: "pd-8585",
    slug: "powerdex-pd-8585-solar-el-feneri-kamp-lambasi",
    name: "Powerdex PD-8585 Solar El Feneri ve Kamp Lambası",
    category: "Kamp Aydınlatma",
    categorySlug: "kamp-aydinlatma",
    image: "/images/products/pd-8585.jpg",
    priceLabel: "Teklif Al",
    priority: "secondary",
    usageTags: ["Outdoor", "Şarjlı", "Kamp"],
    shortDescription:
      "Solar ve USB destekli hibrit enerji yapısı ile açık alan kullanımında pratik ve sürdürülebilir aydınlatma sunar.",
    features: ["Solar şarj", "12 saat çalışma", "2000 mAh", "USB şarj", "Askı aparatı"],
    technicalSpecs: {
      "Enerji Kaynağı": "Solar + USB",
      Batarya: "2000 mAh",
      "Çalışma Süresi": "12 saat",
      Aparat: "Askı aparatı",
    },
    usageAreas: ["Kamp alanı", "Acil durum", "Bahçe kullanımı"],
    boxContents: ["PD-8585 gövde", "USB kablo", "Askı aparatı"],
    warnings: ["Paneli temiz tutun.", "Uzun süre kapalı alanda şarj etmeyin."],
    faq: [
      {
        question: "Yalnızca güneş enerjisi ile çalışır mı?",
        answer: "Hayır, USB ile de şarj edilerek farklı senaryolarda kullanılabilir.",
      },
    ],
    highlight: {
      lumen: "650 lm",
      runtime: "12 saat",
      chargingType: "Solar + USB",
      usage: "Kamp / Acil Durum",
      weight: "280 gr",
      standout: "Hibrit enerji sistemi",
    },
  },
  {
    id: "pd-3535",
    slug: "powerdex-pd-3535-solar-kamp-lambasi",
    name: "Powerdex PD-3535 Solar Kamp Lambası",
    category: "Kamp Aydınlatma",
    categorySlug: "kamp-aydinlatma",
    image: "/images/products/pd-3535.jpg",
    priceLabel: "Teklif Al",
    priority: "secondary",
    usageTags: ["Outdoor", "Kamp", "Şarjlı"],
    shortDescription:
      "Solar destek, güç göstergesi ve kademeli ışık ayarı ile kamp ve açık alan kullanımına uygun dengeli aydınlatma.",
    features: ["Solar destek", "Güç göstergesi", "Kademeli ışık", "265 gr"],
    technicalSpecs: {
      Destek: "Solar şarj",
      Gösterge: "Batarya göstergesi",
      Ayar: "Kademeli ışık seviyesi",
      Ağırlık: "265 gr",
    },
    usageAreas: ["Çadır içi", "Masa üstü", "Açık alan kamp"],
    boxContents: ["PD-3535 Kamp Lambası", "Şarj kablosu", "Kullanım rehberi"],
    warnings: ["Aşırı neme maruz bırakmayın.", "Yalnızca uygun adaptörle şarj edin."],
    faq: [
      {
        question: "Düşük ışık modunda ne kadar süre çalışır?",
        answer: "Düşük modda uzun süreli kullanım için optimize edilmiştir.",
      },
    ],
    highlight: {
      lumen: "500 lm",
      runtime: "10 saat",
      chargingType: "Solar + Type-C",
      usage: "Kamp",
      weight: "265 gr",
      standout: "Güç göstergeli kamp aydınlatması",
    },
  },
  {
    id: "pd-5555",
    slug: "powerdex-pd-5555-sarjli-kamp-lambasi",
    name: "Powerdex PD-5555 Şarjlı Kamp Lambası",
    category: "Kamp Aydınlatma",
    categorySlug: "kamp-aydinlatma",
    image: "/images/products/pd-5555.jpg",
    priceLabel: "Teklif Al",
    priority: "secondary",
    usageTags: ["Outdoor", "Şarjlı", "Kamp"],
    shortDescription:
      "IPX4 koruması, çok modlu ışık ve hızlı şarj ile kamp ve acil durum kullanımına uygun taşınabilir aydınlatma.",
    features: ["3 ışık modu", "IPX4", "12 saat düşük mod", "4 saat şarj"],
    technicalSpecs: {
      "Işık Modu": "3 farklı mod",
      Koruma: "IPX4",
      "Çalışma Süresi": "12 saat (düşük mod)",
      "Şarj Süresi": "4 saat",
    },
    usageAreas: ["Kamp", "Bahçe", "Acil durum"],
    boxContents: ["PD-5555 Kamp Lambası", "Type-C kablo", "Kullanım dokümanı"],
    warnings: ["Ürünü darbelerden koruyun.", "Yalnızca kuru bezle temizleyin."],
    faq: [
      {
        question: "IPX4 koruma ne ifade eder?",
        answer: "Su sıçrama direnci sağlar; tam su geçirmezlik anlamına gelmez.",
      },
    ],
    highlight: {
      lumen: "550 lm",
      runtime: "12 saat",
      chargingType: "Type-C",
      usage: "Kamp / Acil Durum",
      weight: "295 gr",
      standout: "IPX4 korumalı 3 modlu ışık",
    },
  },
];

const priorityOrder: Record<ProductPriority, number> = {
  primary: 0,
  secondary: 1,
  other: 2,
};

export function getHomepageProducts(): Product[] {
  return products
    .filter((p) => p.priority === "primary" || p.priority === "secondary")
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

export const comparisonRows = getHomepageProducts().map((product) => ({
  model: product.name,
  lumen: product.highlight.lumen,
  runtime: product.highlight.runtime,
  chargingType: product.highlight.chargingType,
  usage: product.highlight.usage,
  weight: product.highlight.weight,
  standout: product.highlight.standout,
}));
