"use client";

import { BatteryCharging, Flashlight, Headset, LampDesk, Shield, Sun } from "lucide-react";

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
      className={`relative h-full w-full overflow-hidden bg-gradient-to-br from-[#0B0D10] via-[#151922] to-[#1a2030] ${className}`}
    >
      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B8FF2C]/12 blur-3xl" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[#B8FF2C]/45 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
        <div className="rounded-2xl border border-[#252A33] bg-[#151922]/90 p-4">
          {iconName === "flashlight" ? <Flashlight className="size-8 text-[#B8FF2C]" /> : null}
          {iconName === "headlamp" ? <Headset className="size-8 text-[#B8FF2C]" /> : null}
          {iconName === "sun" ? <Sun className="size-8 text-[#B8FF2C]" /> : null}
          {iconName === "battery" ? <BatteryCharging className="size-8 text-[#B8FF2C]" /> : null}
          {iconName === "lamp" ? <LampDesk className="size-8 text-[#B8FF2C]" /> : null}
          {iconName === "shield" ? <Shield className="size-8 text-[#B8FF2C]" /> : null}
        </div>
        <p className="line-clamp-2 text-sm font-semibold text-white">{name}</p>
      </div>
    </div>
  );
}
