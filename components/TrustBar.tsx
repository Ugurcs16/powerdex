import { ShieldCheck, Truck, RotateCcw, Building2, BriefcaseBusiness } from "lucide-react";
import { brandClasses } from "@/lib/brand";

const trustItems = [
  "2008'den beri ticaret tecrübesi",
  "2017'den beri Powerdex markası",
  "Hızlı kargo",
  "İade / değişim desteği",
  "Profesyonel kullanım odaklı ürünler",
];

const trustIcons = [Building2, ShieldCheck, Truck, RotateCcw, BriefcaseBusiness];

export function TrustBar() {
  return (
    <section className={`border-y ${brandClasses.border} bg-[#151922]`}>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
        {trustItems.map((item, index) => {
          const Icon = trustIcons[index];
          return (
            <div
              key={item}
              className={`flex items-center gap-3 rounded-lg border ${brandClasses.border} bg-[#0B0D10] p-3`}
            >
              <Icon className={`size-4 shrink-0 ${brandClasses.accent}`} />
              <p className="text-xs text-zinc-300">{item}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
