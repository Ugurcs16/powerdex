import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkimizda",
  description: "Powerdex marka hikayesi ve kurumsal yaklasim.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white">Hakkimizda</h1>
      <div className="mt-8 space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 leading-relaxed text-zinc-300">
        <p>
          Powerdex, 2008 yilinda kurulan Ugur Ithalat&apos;in sahadaki ticari birikimiyle sekillenen
          bir markadir. 2017 yilinda marka tescilinin alinmasiyla birlikte e-ticaret altyapisini
          guclendirerek daha ulasilabilir bir urun deneyimi sunmaya baslamistir.
        </p>
        <p>
          Outdoor aydinlatma, tasinabilir enerji ve kisisel bakim kategorilerinde odagimiz;
          dayanikli urun, net teknik bilgi ve guvenilir hizmet standardidir.
        </p>
        <p>
          Her urun serisinde kullanici odakli tasarim, sahada pratik kullanim ve erisilebilir
          fiyat-performans dengesi oncelegimizdir.
        </p>
      </div>
    </section>
  );
}
