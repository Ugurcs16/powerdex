import type { Metadata } from "next";
import { Bolt, BatteryCharging, SunMedium, Magnet, Lightbulb, BriefcaseBusiness } from "lucide-react";
import { HeroVideo } from "@/components/HeroVideo";
import { TrustBar } from "@/components/TrustBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { UseCaseSection } from "@/components/UseCaseSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ComparisonTable } from "@/components/ComparisonTable";
import { BlogPreview } from "@/components/BlogPreview";
import { AboutPreview } from "@/components/AboutPreview";

const advantageItems = [
  { icon: BatteryCharging, text: "Sarjli kullanim" },
  { icon: Bolt, text: "Uzun calisma suresi" },
  { icon: SunMedium, text: "Solar destekli modeller" },
  { icon: Magnet, text: "Miknatisli ve askili kullanim" },
  { icon: Lightbulb, text: "Coklu isik modlari" },
  { icon: BriefcaseBusiness, text: "Kamp, arac ve guvenlik icin pratik tasarim" },
];

export const metadata: Metadata = {
  title: "Powerdex | Outdoor Aydinlatma, El Feneri, Kamp Lambasi ve Sarjli Urunler",
  description:
    "Powerdex; el feneri, kafa lambasi, kamp lambasi, solar aydinlatma, pil ve kisisel bakim urunlerinde dayanikli ve pratik cozumler sunar.",
};

export default function Home() {
  return (
    <>
      <HeroVideo />
      <TrustBar />
      <CategoryGrid />
      <UseCaseSection />
      <ProductShowcase />
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Powerdex&apos;i Farkli Kilan Detaylar</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantageItems.map((item) => (
            <article key={item.text} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <item.icon className="size-5 text-lime-400" />
              <p className="mt-3 text-sm text-zinc-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <ComparisonTable />
      <BlogPreview />
      <AboutPreview />
    </>
  );
}
