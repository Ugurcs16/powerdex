export type UseCaseIcon =
  | "car"
  | "wrench"
  | "shield"
  | "hard-hat"
  | "tent"
  | "alert";

export type UseCase = {
  title: string;
  slug: string;
  description: string;
  icon: UseCaseIcon;
  productTag: string;
};

export const useCases: UseCase[] = [
  {
    title: "Araç ve Yol Yardımı",
    slug: "arac-yol-yardimi",
    description: "Yol kenarı ve araç içi müdahalelerde odaklı, güvenilir aydınlatma.",
    icon: "car",
    productTag: "Metal El Feneri",
  },
  {
    title: "Teknik Servis",
    slug: "teknik-servis",
    description: "Servis ve bakım alanlarında eller serbest veya elde taşınabilir ışık.",
    icon: "wrench",
    productTag: "Kafa Lambası",
  },
  {
    title: "Güvenlik",
    slug: "guvenlik",
    description: "Devriye, kontrol ve saha görevlerinde tutarlı görünürlük.",
    icon: "shield",
    productTag: "Profesyonel Kullanım",
  },
  {
    title: "Şantiye ve Atölye",
    slug: "santiye-atolye",
    description: "Zorlu çalışma ortamlarında dayanıklı gövde ve uzun süreli performans.",
    icon: "hard-hat",
    productTag: "Metal El Feneri",
  },
  {
    title: "Kamp ve Outdoor",
    slug: "kamp-outdoor",
    description: "Açık alan ve gece aktivitelerinde dengeli ve sürdürülebilir ışık.",
    icon: "tent",
    productTag: "Kamp Aydınlatma",
  },
  {
    title: "Acil Durum",
    slug: "acil-durum",
    description: "Kesinti ve beklenmeyen senaryolarda hızlı devreye alınabilir çözümler.",
    icon: "alert",
    productTag: "Şarjlı / Taşınabilir",
  },
];
