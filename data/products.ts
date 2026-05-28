export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  image: string;
  video?: string;
  priceLabel: string;
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
    name: "Powerdex PD-7007 El Feneri",
    category: "El Fenerleri",
    categorySlug: "el-fenerleri",
    image: "/images/products/pd-7007.jpg",
    video: "/videos/powerdex-hero.mp4",
    priceLabel: "Teklif Al",
    shortDescription:
      "Kompakt govde tasarimi, mıknatisli kullanim yapisi ve cok modlu aydinlatmasiyla arac, tamir ve acil durum ihtiyaclarina hizli cozum sunar.",
    features: [
      "Kompakt govde",
      "Guclu mıknatis",
      "Strobe / SOS modlari",
      "Sarjli kullanim",
      "Arac ve acil durum uyumu",
    ],
    technicalSpecs: {
      "Isik Modu": "Strobe / SOS / Sabit",
      "Sarj Tipi": "USB Type-C",
      "Govde": "Darbe dayanimli kompozit",
      "Kullanim": "Arac, ev, acil durum",
    },
    usageAreas: ["Arac tamiri", "Acil durum cantasi", "Guvenlik kontrolu"],
    boxContents: ["PD-7007 El Feneri", "USB Sarj Kablosu", "Kullanim kilavuzu"],
    warnings: [
      "Uzun sure dogrudan goze tutmayin.",
      "Cihazi yuksek isida birakmayin.",
    ],
    faq: [
      {
        question: "Tam sarj ile ne kadar kullanilir?",
        answer: "Kullanim moduna gore degismekle birlikte orta modda gunluk kullanim icin yeterli sure sunar.",
      },
    ],
    highlight: {
      lumen: "700 lm",
      runtime: "6 saat",
      chargingType: "Type-C",
      usage: "Arac / Acil Durum",
      weight: "190 gr",
      standout: "Miknatisli kompakt govde",
    },
  },
  {
    id: "pd-8007",
    slug: "powerdex-pd-8007-zoomlu-cok-amacli-el-feneri",
    name: "Powerdex PD-8007 Zoomlu Cok Amacli El Feneri",
    category: "El Fenerleri",
    categorySlug: "el-fenerleri",
    image: "/images/products/pd-8007.jpg",
    priceLabel: "Teklif Al",
    shortDescription:
      "8 modlu isik yapisi, beyaz-kirmizi-mavi kombinasyonu ve zoom odagi ile kamp, tamir ve guvenlik kullanimina uygun profesyonel bir secenektir.",
    features: ["8 mod", "Beyaz / Kirmizi / Mavi isik", "Type-C sarj", "Miknatisli kullanim"],
    technicalSpecs: {
      "Isik Modlari": "8 farkli mod",
      "Odak": "Zoom ayari",
      "Sarj Tipi": "USB Type-C",
      "Kullanim": "Kamp, tamir, guvenlik",
    },
    usageAreas: ["Kamp", "Atolye", "Saha guvenligi"],
    boxContents: ["PD-8007 El Feneri", "Sarj kablosu", "Kullanim kilavuzu"],
    warnings: ["Urunu suya tam batirmayin.", "Cocuklardan uzak tutun."],
    faq: [
      {
        question: "Mavi isik modu ne icin kullanilir?",
        answer: "Saha icinde sinyal ve farkli gorunurluk ihtiyaclari icin tercih edilir.",
      },
    ],
    highlight: {
      lumen: "900 lm",
      runtime: "8 saat",
      chargingType: "Type-C",
      usage: "Kamp / Guvenlik",
      weight: "225 gr",
      standout: "8 mod + zoom odak",
    },
  },
  {
    id: "pd-1072",
    slug: "powerdex-pd-1072-kafa-lambasi",
    name: "Powerdex PD-1072 Kafa Lambasi",
    category: "Kafa Lambalari",
    categorySlug: "kafa-lambalari",
    image: "/images/products/pd-1072.jpg",
    priceLabel: "Sepete Ekle",
    shortDescription:
      "1000 lumen gucu, hafif govde yapisi ve 6 saate varan kullanim suresiyle eller serbest profesyonel aydinlatma saglar.",
    features: ["1000 lumen", "2850 mAh batarya", "6 saat calisma", "Yagmur suyuna dayanim", "210 gr"],
    technicalSpecs: {
      Lumen: "1000 lm",
      Batarya: "2850 mAh",
      "Calisma Suresi": "6 saat",
      Agirlik: "210 gr",
      Dayanim: "Yagmur suyuna dayanimli",
    },
    usageAreas: ["Kamp yuruyusu", "Tamir islemleri", "Gece calismalari"],
    boxContents: ["PD-1072 Kafa Lambasi", "Elastik kafa bandi", "Sarj kablosu"],
    warnings: ["Sarj esnasinda kullanmayin.", "Bandi cok sıkı ayarlamayin."],
    faq: [
      {
        question: "Band ayari farkli bas olculerine uygun mu?",
        answer: "Evet, ayarlanabilir elastik band ile farkli kullanimlara uyum saglar.",
      },
    ],
    highlight: {
      lumen: "1000 lm",
      runtime: "6 saat",
      chargingType: "Type-C",
      usage: "Kamp / Tamir",
      weight: "210 gr",
      standout: "Eller serbest yuksek performans",
    },
  },
  {
    id: "pd-8585",
    slug: "powerdex-pd-8585-solar-el-feneri-kamp-lambasi",
    name: "Powerdex PD-8585 Solar El Feneri ve Kamp Lambasi",
    category: "Solar Aydinlatma",
    categorySlug: "solar-aydinlatma",
    image: "/images/products/pd-8585.jpg",
    priceLabel: "Teklif Al",
    shortDescription:
      "Solar sarj ve USB destekli hibrit enerji yapisi ile acik alan kullaniminda enerji bagimsizligi saglar.",
    features: ["Solar sarj", "12 saat calisma", "2000 mAh batarya", "USB sarj", "Aski aparati"],
    technicalSpecs: {
      "Enerji Kaynagi": "Solar + USB",
      Batarya: "2000 mAh",
      "Calisma Suresi": "12 saat",
      Aparat: "Aski aparati",
    },
    usageAreas: ["Kamp alani", "Elektrik kesintileri", "Bahce kullanimi"],
    boxContents: ["PD-8585 Urun Govdesi", "USB kablo", "Aski aparati"],
    warnings: ["Paneli temiz tutun.", "Uzun sure kapali alanda sarj etmeyin."],
    faq: [
      {
        question: "Sadece gunes enerjisi ile calisir mi?",
        answer: "Hayir, USB ile de sarj edilerek her senaryoda kullanilabilir.",
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
    name: "Powerdex PD-3535 Solar Kamp Lambasi",
    category: "Kamp Lambalari",
    categorySlug: "kamp-lambalari",
    image: "/images/products/pd-3535.jpg",
    priceLabel: "Sepete Ekle",
    shortDescription:
      "Solar destekli yapisi, guc gostergesi ve kademeli isik ayari ile kamp kullanimi icin dengeli bir cozum sunar.",
    features: ["Solar destek", "Guc gostergesi", "Kademeli isik ayari", "265 gr"],
    technicalSpecs: {
      Destek: "Solar sarj destegi",
      Gosterge: "Batarya guc gostergesi",
      Ayar: "Kademeli isik seviyesi",
      Agirlik: "265 gr",
    },
    usageAreas: ["Cadir ici", "Masa ustu aydinlatma", "Dis mekan kamp"],
    boxContents: ["PD-3535 Kamp Lambasi", "Sarj kablosu", "Kullanim rehberi"],
    warnings: ["Asiri neme maruz birakmayin.", "Yalnizca uygun adaptorle sarj edin."],
    faq: [
      {
        question: "Dusuk isik modunda ne kadar sure calisir?",
        answer: "Dusuk modda uzun sureli kullanim icin optimize edilmistir.",
      },
    ],
    highlight: {
      lumen: "500 lm",
      runtime: "10 saat",
      chargingType: "Solar + Type-C",
      usage: "Kamp",
      weight: "265 gr",
      standout: "Guc gostergeli kamp aydinlatmasi",
    },
  },
  {
    id: "pd-5555",
    slug: "powerdex-pd-5555-sarjli-kamp-lambasi",
    name: "Powerdex PD-5555 Sarjli Kamp Lambasi",
    category: "Kamp Lambalari",
    categorySlug: "kamp-lambalari",
    image: "/images/products/pd-5555.jpg",
    priceLabel: "Sepete Ekle",
    shortDescription:
      "IPX4 LED korumasi, 3 farkli isik modu ve hizli sarj ozelligiyle kamp ve acil durum kullanimina uygundur.",
    features: ["3 isik modu", "IPX4 LED", "12 saat dusuk mod", "4 saat sarj suresi"],
    technicalSpecs: {
      "Isik Modu": "3 farkli mod",
      Koruma: "IPX4",
      "Calisma Suresi": "12 saat (dusuk mod)",
      "Sarj Suresi": "4 saat",
    },
    usageAreas: ["Kamp", "Bahce", "Acil durum"],
    boxContents: ["PD-5555 Kamp Lambasi", "Type-C kablo", "Kullanim dokumani"],
    warnings: ["Urunu darbelerden koruyun.", "Yalnizca kuru bezle temizleyin."],
    faq: [
      {
        question: "IPX4 koruma ne ifade eder?",
        answer: "Su sicrama direnci saglar; tam su gecirmezlik anlamina gelmez.",
      },
    ],
    highlight: {
      lumen: "550 lm",
      runtime: "12 saat",
      chargingType: "Type-C",
      usage: "Kamp / Acil Durum",
      weight: "295 gr",
      standout: "IPX4 korumali 3 modlu isik",
    },
  },
];

export const comparisonRows = products.map((product) => ({
  model: product.name,
  lumen: product.highlight.lumen,
  runtime: product.highlight.runtime,
  chargingType: product.highlight.chargingType,
  usage: product.highlight.usage,
  weight: product.highlight.weight,
  standout: product.highlight.standout,
}));
