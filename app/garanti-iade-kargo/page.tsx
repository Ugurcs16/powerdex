import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Garanti, Iade ve Kargo",
  description: "Powerdex garanti, iade ve kargo surec bilgileri.",
};

const infoBlocks = [
  {
    title: "Kargo Bilgisi",
    text: "Siparisleriniz stok durumuna gore hizli sekilde kargoya teslim edilir. Kargo takip bilgileri SMS veya e-posta ile iletilir.",
  },
  {
    title: "Iade / Degisim Destegi",
    text: "Urun tesliminden sonra belirlenen sure icinde iade ve degisim talepleriniz degerlendirilir.",
  },
  {
    title: "Garanti Destegi",
    text: "Urun bazli garanti kapsaminda teknik inceleme ve destek sureci kurumsal servis standartlarina gore yonetilir.",
  },
  {
    title: "Musteri Memnuniyeti",
    text: "Tum sureclerde ulasilabilir destek ve cozum odakli iletisim ilkesiyle hareket edilir.",
  },
];

export default function PolicyPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white">Garanti / Iade / Kargo</h1>
      <div className="mt-8 grid gap-4">
        {infoBlocks.map((block) => (
          <article key={block.title} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold text-zinc-100">{block.title}</h2>
            <p className="mt-3 text-zinc-300">{block.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
