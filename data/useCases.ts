export type UseCase = {
  title: string;
  slug: string;
  description: string;
};

export const useCases: UseCase[] = [
  {
    title: "Kamp & Doga",
    slug: "kamp-doga",
    description: "Gece kampinda guvenli ve dengeli gorus icin uzun sureli aydinlatma.",
  },
  {
    title: "Arac Tamiri",
    slug: "arac-tamiri",
    description: "Tamir sirasinda odakli isik ve eller serbest kullanim avantajlari.",
  },
  {
    title: "Guvenlik",
    slug: "guvenlik",
    description: "Devriye, kontrol ve saha gorevlerinde yuksek gorunurluk destegi.",
  },
  {
    title: "Balikcilik",
    slug: "balikcilik",
    description: "Su kenari kullanimina uygun pratik ve tasinabilir cozumler.",
  },
  {
    title: "Acil Durum",
    slug: "acil-durum",
    description: "Elektrik kesintisi ve beklenmeyen durumlarda hizli aydinlatma gucu.",
  },
  {
    title: "Ev & Atolye",
    slug: "ev-atolye",
    description: "Ev ici tamir ve atolye islerinde noktasal, kontrollu isik performansi.",
  },
];
