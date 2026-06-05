"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { brandClasses } from "@/lib/brand";

const METAL_FLASHLIGHT = "/images/products/metalelfeneri.jpg";
const HEADLAMP = "/images/products/kafalambasi.jpg";

export function HeroVideo() {
  return (
    <section className={`relative isolate min-h-[90vh] overflow-hidden ${brandClasses.bg}`}>
      {/* Blurred product backdrop */}
      <div className="absolute inset-0">
        <Image
          src={METAL_FLASHLIGHT}
          alt=""
          fill
          priority
          className="scale-110 object-cover opacity-25 blur-2xl"
          aria-hidden
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#111315]/98 via-[#111315]/88 to-[#111315]/55" />

      <div className="relative z-10 mx-auto grid min-h-[90vh] w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <p
            className={`mb-4 inline-flex rounded-md border ${brandClasses.border} ${brandClasses.surface} px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] ${brandClasses.accent}`}
          >
            PROFESYONEL AYDINLATMA SİSTEMLERİ
          </p>
          <h1 className={`text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl ${brandClasses.text}`}>
            Karanlıkta Güvenilir Güç.
          </h1>
          <p className={`mt-5 text-base leading-relaxed sm:text-lg ${brandClasses.textMuted}`}>
            Powerdex; metal el fenerleri ve kafa lambalarında profesyonel kullanıcıların tercih ettiği
            dayanıklı aydınlatma çözümleri sunar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kategori/metal-el-fenerleri"
              className={buttonVariants({
                size: "lg",
                className: `${brandClasses.accentBg} font-semibold`,
              })}
            >
              Metal Fenerleri İncele
            </Link>
            <Link
              href="/kategori/kafa-lambalari"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: `${brandClasses.border} ${brandClasses.surface} ${brandClasses.text} hover:bg-[#20242A]`,
              })}
            >
              Kafa Lambalarını Gör
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex flex-col gap-5"
        >
          {/* Primary product showcase */}
          <div
            className={`relative overflow-hidden rounded-[20px] border ${brandClasses.border} bg-[#151922] shadow-[0_20px_50px_rgba(0,0,0,0.45),0_0_40px_rgba(166,199,74,0.06)]`}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={METAL_FLASHLIGHT}
                alt="Powerdex Metal El Feneri"
                fill
                priority
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product highlights */}
          <div className="grid gap-4 sm:grid-cols-2">
            <article className={`rounded-[20px] border ${brandClasses.border} ${brandClasses.card} p-4`}>
              <div className="flex gap-3">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-[#151922]">
                  <Image src={METAL_FLASHLIGHT} alt="" fill className="object-contain p-1" sizes="56px" />
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${brandClasses.text}`}>Metal El Feneri</h3>
                  <ul className={`mt-2 space-y-1 text-xs ${brandClasses.textMuted}`}>
                    <li>Alüminyum Gövde</li>
                    <li>Güçlü Işık</li>
                    <li>Şarjlı Kullanım</li>
                  </ul>
                </div>
              </div>
            </article>
            <article className={`rounded-[20px] border ${brandClasses.border} ${brandClasses.card} p-4`}>
              <div className="flex gap-3">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-[#151922]">
                  <Image src={HEADLAMP} alt="" fill className="object-contain p-1" sizes="56px" />
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${brandClasses.text}`}>Kafa Lambası</h3>
                  <ul className={`mt-2 space-y-1 text-xs ${brandClasses.textMuted}`}>
                    <li>Eller Serbest Kullanım</li>
                    <li>Uzun Süreli Performans</li>
                    <li>Outdoor ve Teknik İşler</li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
