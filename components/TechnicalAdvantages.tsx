import { Bolt, BatteryCharging, Shield, Magnet, Lightbulb, HardHat } from "lucide-react";
import { brandClasses } from "@/lib/brand";

const advantageItems = [
  { icon: Shield, text: "Dayanıklı metal ve sağlam gövde yapısı" },
  { icon: Bolt, text: "Güçlü ve kontrollü ışık performansı" },
  { icon: BatteryCharging, text: "Şarjlı kullanım ve uzun süreli çalışma" },
  { icon: HardHat, text: "Profesyonel kullanım senaryolarına uygun tasarım" },
  { icon: Magnet, text: "Pratik montaj ve taşıma çözümleri" },
  { icon: Lightbulb, text: "Zorlu koşullarda güvenilir aydınlatma" },
];

export function TechnicalAdvantages() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <p className={`text-xs font-medium uppercase tracking-[0.14em] ${brandClasses.accent}`}>
        Teknik Üstünlükler
      </p>
      <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${brandClasses.text}`}>
        Profesyonel Kullanımda Fark Yaratan Detaylar
      </h2>
      <p className={`mt-3 max-w-2xl ${brandClasses.textMuted}`}>
        Metal el fenerleri ve kafa lambalarında odaklanmış mühendislik ve saha odaklı ürün yaklaşımı.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {advantageItems.map((item) => (
          <article key={item.text} className={brandClasses.cardSurface + " p-5"}>
            <item.icon className={`size-5 ${brandClasses.accent}`} />
            <p className={`mt-3 text-sm ${brandClasses.textMuted}`}>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
