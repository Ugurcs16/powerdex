"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Car, HardHat, Shield, Tent, Wrench } from "lucide-react";
import { useCases, type UseCaseIcon } from "@/data/useCases";
import { brandClasses } from "@/lib/brand";

const iconMap: Record<UseCaseIcon, typeof Car> = {
  car: Car,
  wrench: Wrench,
  shield: Shield,
  "hard-hat": HardHat,
  tent: Tent,
  alert: AlertTriangle,
};

export function UseCaseSection() {
  return (
    <section className={`border-y ${brandClasses.border} ${brandClasses.surface}/80 py-20`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className={`text-xs font-medium uppercase tracking-[0.14em] ${brandClasses.accent}`}>
          Kullanım Senaryoları
        </p>
        <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${brandClasses.text}`}>Her İş İçin Doğru Işık</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.article
                key={item.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.3 }}
                className={brandClasses.cardSurface + " p-5"}
              >
                <Icon className={`size-5 ${brandClasses.accent}`} />
                <h3 className={`mt-3 text-lg font-semibold ${brandClasses.text}`}>{item.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${brandClasses.textMuted}`}>
                  {item.description}
                </p>
                <span
                  className={`mt-4 inline-block rounded border ${brandClasses.border} ${brandClasses.bg} px-2 py-1 text-xs ${brandClasses.textMuted}`}
                >
                  {item.productTag}
                </span>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
