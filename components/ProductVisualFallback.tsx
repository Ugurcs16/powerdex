"use client";

import { BatteryCharging, Flashlight, Scissors, Sun, LampDesk, Shield } from "lucide-react";

type ProductVisualFallbackProps = {
  name: string;
  category: string;
  className?: string;
};

function getCategoryIcon(category: string) {
  const value = category.toLowerCase();
  if (value.includes("fener")) return "flashlight";
  if (value.includes("solar")) return "sun";
  if (value.includes("pil") || value.includes("sarj")) return "battery";
  if (value.includes("bakim") || value.includes("makas") || value.includes("tiras")) return "scissors";
  if (value.includes("kamp")) return "lamp";
  return "shield";
}

export function ProductVisualFallback({ name, category, className = "" }: ProductVisualFallbackProps) {
  const iconName = getCategoryIcon(category);

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-xl border border-zinc-700 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 ${className}`}
    >
      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/20 blur-3xl" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-lime-300/70 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(132,204,22,0.22),transparent_45%)]" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
        <div className="rounded-2xl border border-zinc-600 bg-zinc-900/80 p-4 shadow-[0_0_35px_rgba(132,204,22,0.2)]">
          {iconName === "flashlight" ? <Flashlight className="size-8 text-lime-300" /> : null}
          {iconName === "sun" ? <Sun className="size-8 text-lime-300" /> : null}
          {iconName === "battery" ? <BatteryCharging className="size-8 text-lime-300" /> : null}
          {iconName === "scissors" ? <Scissors className="size-8 text-lime-300" /> : null}
          {iconName === "lamp" ? <LampDesk className="size-8 text-lime-300" /> : null}
          {iconName === "shield" ? <Shield className="size-8 text-lime-300" /> : null}
        </div>
        <p className="line-clamp-2 text-sm font-semibold text-zinc-100">{name}</p>
      </div>
    </div>
  );
}
