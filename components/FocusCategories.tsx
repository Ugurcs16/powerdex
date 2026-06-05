"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { brandClasses } from "@/lib/brand";

const focusCards = [
  {
    title: "Metal El Fenerleri",
    slug: "metal-el-fenerleri",
    image: "/images/products/metalelfeneri.jpg",
    description:
      "Zorlu koşullar, teknik işler, araç kullanımı ve güvenlik ihtiyaçları için güçlü gövde yapısına sahip el fenerleri.",
    features: ["Metal gövde", "Güçlü ışık", "Şarjlı kullanım", "Kompakt tasarım"],
    cta: "Metal Fenerleri İncele",
  },
  {
    title: "Kafa Lambaları",
    slug: "kafa-lambalari",
    image: "/images/products/kafalambasi.jpg",
    description:
      "Eller serbest kullanım gerektiren kamp, tamir, servis, güvenlik ve outdoor senaryoları için pratik çözümler.",
    features: [
      "Eller serbest kullanım",
      "Uzun çalışma süresi",
      "Hafif yapı",
      "Çoklu ışık modu",
    ],
    cta: "Kafa Lambalarını Gör",
  },
];

export function FocusCategories() {
  return (
    <section className={brandClasses.bg + " py-20"}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className={`text-xs font-medium uppercase tracking-[0.14em] ${brandClasses.accent}`}>
          Uzmanlık Alanlarımız
        </p>
        <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${brandClasses.text}`}>Uzman Olduğumuz Ürünler</h2>
        <p className={`mt-3 max-w-2xl ${brandClasses.textMuted}`}>
          Powerdex&apos;in en güçlü olduğu alanlar: metal el fenerleri ve kafa lambaları.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {focusCards.map((card) => (
            <motion.article
              key={card.slug}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className={`group overflow-hidden rounded-[20px] border ${brandClasses.border} bg-[#20242A] shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.45),0_0_30px_rgba(166,199,74,0.08)]`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#151922]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111315]/90 via-[#111315]/30 to-transparent" />
                <h3 className={`absolute bottom-4 left-5 text-2xl font-bold ${brandClasses.text}`}>
                  {card.title}
                </h3>
              </div>
              <div className="space-y-4 p-6 sm:p-8">
                <p className={`text-sm leading-relaxed ${brandClasses.textMuted}`}>{card.description}</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {card.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-2 text-sm ${brandClasses.textMuted} before:size-1 before:rounded-full before:bg-[#2A2E35]`}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/kategori/${card.slug}`}
                  className={buttonVariants({
                    className: `${brandClasses.accentBg} font-semibold`,
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
