"use client";

import { BatteryCharging, Flashlight, Headset, LampDesk, Shield, Sun } from "lucide-react";
import { brandClasses } from "@/lib/brand";

type ProductVisualFallbackProps = {
  name: string;
  category: string;
  className?: string;
};

function getCategoryIcon(category: string) {
  const value = category.toLowerCase();
  if (value.includes("metal") || value.includes("fener")) return "flashlight";
  if (value.includes("kafa")) return "headlamp";
  if (value.includes("solar")) return "sun";
  if (value.includes("pil") || value.includes("şarj") || value.includes("sarj")) return "battery";
  if (value.includes("kamp")) return "lamp";
  return "shield";
}

export function ProductVisualFallback({ name, category, className = "" }: ProductVisualFallbackProps) {
  const iconName = getCategoryIcon(category);

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-gradient-to-br from-[#111315] via-[#1A1D21] to-[#20242A] ${className}`}
    >
      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A6C74A]/5 blur-3xl" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[#2A2E35] to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
        <div className={`rounded-xl border ${brandClasses.border} ${brandClasses.card} p-4`}>
          {iconName === "flashlight" ? <Flashlight className={`size-8 ${brandClasses.accent}`} /> : null}
          {iconName === "headlamp" ? <Headset className={`size-8 ${brandClasses.accent}`} /> : null}
          {iconName === "sun" ? <Sun className={`size-8 ${brandClasses.accent}`} /> : null}
          {iconName === "battery" ? <BatteryCharging className={`size-8 ${brandClasses.accent}`} /> : null}
          {iconName === "lamp" ? <LampDesk className={`size-8 ${brandClasses.accent}`} /> : null}
          {iconName === "shield" ? <Shield className={`size-8 ${brandClasses.accent}`} /> : null}
        </div>
        <p className={`line-clamp-2 text-sm font-medium ${brandClasses.text}`}>{name}</p>
      </div>
    </div>
  );
}
