"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flashlight, Headset } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { brandClasses } from "@/lib/brand";

const focusCards = [
  {
    title: "Metal El Fenerleri",
    slug: "metal-el-fenerleri",
    description:
      "Zorlu koşullar, teknik işler, araç kullanımı ve güvenlik ihtiyaçları için güçlü gövde yapısına sahip el fenerleri.",
    features: ["Metal gövde", "Güçlü ışık", "Şarjlı kullanım", "Kompakt tasarım"],
    cta: "Metal Fenerleri İncele",
    icon: Flashlight,
  },
  {
    title: "Kafa Lambaları",
    slug: "kafa-lambalari",
    description:
      "Eller serbest kullanım gerektiren kamp, tamir, servis, güvenlik ve outdoor senaryoları için pratik çözümler.",
    features: [
      "Eller serbest kullanım",
      "Uzun çalışma süresi",
      "Hafif yapı",
      "Çoklu ışık modu",
    ],
    cta: "Kafa Lambalarını Gör",
    icon: Headset,
  },
];

export function FocusCategories() {
  return (
    <section className={`${brandClasses.bg} py-20`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${brandClasses.accent}`}>
          Uzmanlık Alanlarımız
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Uzman Olduğumuz Ürünler</h2>
        <p className={`mt-3 max-w-2xl ${brandClasses.textMuted}`}>
          Powerdex&apos;in en güçlü olduğu alanlar: metal el fenerleri ve kafa lambaları.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {focusCards.map((card) => (
            <motion.article
              key={card.slug}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className={`group overflow-hidden ${brandClasses.cardSurface}`}
            >
              <div className="relative h-56 overflow-hidden border-b border-[#252A33] bg-gradient-to-br from-[#0B0D10] via-[#151922] to-[#1a2030]">
                <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B8FF2C]/10 blur-3xl transition group-hover:bg-[#B8FF2C]/18" />
                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[#B8FF2C]/50 to-transparent" />
                <card.icon className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 text-[#B8FF2C]/90" />
              </div>
              <div className="space-y-4 p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                <p className={`text-sm leading-relaxed ${brandClasses.textMuted}`}>{card.description}</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {card.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-zinc-300 before:size-1.5 before:rounded-full before:bg-[#B8FF2C]"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/kategori/${card.slug}`}
                  className={buttonVariants({
                    className: `${brandClasses.accentBg} ${brandClasses.accentGlow} hover:brightness-95`,
                  })}
                >
                  {card.cta}
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
