"use client";

import { BatteryCharging, Flashlight, Headset, LampDesk, Scissors, Shield, Sun, Wind } from "lucide-react";
import type { ProductCategory } from "@/types/product";
import { brandClasses } from "@/lib/brand";

type ProductVisualFallbackProps = {
  name: string;
  category: ProductCategory | string;
  className?: string;
};

function getCategoryIcon(category: string) {
  switch (category) {
    case "metal-el-fenerleri":
      return "flashlight";
    case "kafa-lambalari":
      return "headlamp";
    case "kamp-lambalari":
    case "masa-lambalari":
      return "lamp";
    case "solar-aydinlatma":
      return "sun";
    case "piller-sarj":
      return "battery";
    case "berber-makaslari":
      return "scissors";
    case "jet-fan":
      return "wind";
    default:
      return "shield";
  }
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
          {iconName === "scissors" ? <Scissors className={`size-8 ${brandClasses.accent}`} /> : null}
          {iconName === "wind" ? <Wind className={`size-8 ${brandClasses.accent}`} /> : null}
          {iconName === "shield" ? <Shield className={`size-8 ${brandClasses.accent}`} /> : null}
        </div>
        <p className={`line-clamp-2 text-sm font-medium ${brandClasses.text}`}>{name}</p>
      </div>
    </div>
  );
}
