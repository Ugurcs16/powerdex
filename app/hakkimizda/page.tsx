import type { Metadata } from "next";
import { brandClasses } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Powerdex profesyonel aydınlatma markası ve kurumsal yaklaşım.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${brandClasses.accent}`}>
        Kurumsal
      </p>
      <h1 className="mt-3 text-4xl font-bold text-white">Hakkımızda</h1>
      <div className={`mt-8 space-y-6 ${brandClasses.cardSurface} p-8 leading-relaxed ${brandClasses.textMuted}`}>
        <p>
          Powerdex, 2008 yılında kurulan Uğur İthalat&apos;ın sahadaki ticari birikimiyle şekillenen bir
          aydınlatma markasıdır. 2017&apos;de marka tescilinin alınmasıyla birlikte profesyonel ürün
          portföyü ve e-ticaret altyapısı güçlendirilmiştir.
        </p>
        <p>
          Odak alanlarımız metal el fenerleri, kafa lambaları ve profesyonel kullanım
          aydınlatmalarıdır. Ürün geliştirmede dayanıklı gövde, pratik kullanım ve uzun süreli
          performans önceliklidir.
        </p>
        <p>
          Hedefimiz; teknik ihtiyaçları net karşılayan, güvenilir ve kurumsal standartlarda bir
          alışveriş deneyimi sunmaktır.
        </p>
      </div>
    </section>
  );
}
