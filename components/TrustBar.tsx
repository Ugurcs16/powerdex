import { ShieldCheck, Truck, RotateCcw, Building2, BriefcaseBusiness } from "lucide-react";

const trustItems = [
  "2008'den beri ticaret tecrubesi",
  "2017'den beri Powerdex markasi",
  "Hizli kargo",
  "Iade / degisim destegi",
  "Outdoor ve profesyonel kullanim",
];

const trustIcons = [Building2, ShieldCheck, Truck, RotateCcw, BriefcaseBusiness];

export function TrustBar() {
  return (
    <section className="border-y border-zinc-800 bg-zinc-900/70">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
        {trustItems.map((item, index) => {
          const Icon = trustIcons[index];
          return (
            <div key={item} className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
              <Icon className="size-4 text-lime-400" />
              <p className="text-xs text-zinc-300">{item}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
