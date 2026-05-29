"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { brandClasses } from "@/lib/brand";

export function HeroVideo() {
  const [videoErrored, setVideoErrored] = useState(false);
  const [posterSrc, setPosterSrc] = useState("/images/hero/powerdex-hero-poster.jpg");
  const [fallbackImageErrored, setFallbackImageErrored] = useState(false);

  const showGradientOnly = videoErrored && fallbackImageErrored;

  const handlePosterError = () => {
    if (posterSrc.endsWith(".jpg")) {
      setPosterSrc("/images/hero/powerdex-hero-poster.svg");
      return;
    }
    setFallbackImageErrored(true);
  };

  return (
    <section className="relative isolate min-h-[90vh] overflow-hidden bg-[#0B0D10]">
      {!videoErrored ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoErrored(true)}
        >
          <source src="/videos/powerdex-hero.mp4" type="video/mp4" />
        </video>
      ) : showGradientOnly ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0D10] via-[#151922] to-[#0B0D10]">
          <div className="absolute left-[20%] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#B8FF2C]/12 blur-3xl" />
          <div className="absolute right-[15%] top-[30%] h-48 w-48 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-[#B8FF2C]/40 to-transparent" />
        </div>
      ) : (
        <Image
          src={posterSrc}
          alt="Powerdex profesyonel aydınlatma"
          fill
          priority
          className="object-cover"
          onError={handlePosterError}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />

      <div className="relative z-10 mx-auto grid min-h-[90vh] w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p
            className={`mb-4 inline-flex rounded-full border ${brandClasses.accentBorder} bg-[#151922]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#B8FF2C] backdrop-blur`}
          >
            PROFESYONEL AYDINLATMA SİSTEMLERİ
          </p>
          <h1 className="text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Karanlıkta Güvenilir Güç.
          </h1>
          <p className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${brandClasses.textMuted}`}>
            Powerdex; metal el fenerleri, kafa lambaları ve profesyonel kullanım için geliştirilmiş
            dayanıklı aydınlatma çözümleri sunar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kategori/metal-el-fenerleri"
              className={buttonVariants({
                size: "lg",
                className: `${brandClasses.accentBg} ${brandClasses.accentGlow} hover:brightness-95`,
              })}
            >
              Metal Fenerleri İncele
            </Link>
            <Link
              href="/kategori/kafa-lambalari"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "border-[#252A33] bg-[#151922]/60 text-white hover:bg-[#1c2230]",
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
          className="flex flex-col gap-4 lg:items-end"
        >
          <article className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/5 p-5 text-white shadow-2xl backdrop-blur-xl lg:ml-auto">
            <p className={`text-xs uppercase tracking-[0.14em] ${brandClasses.accent}`}>Öne Çıkan</p>
            <h3 className="mt-2 text-xl font-bold">Metal El Feneri</h3>
            <ul className={`mt-3 space-y-1.5 text-sm ${brandClasses.textMuted}`}>
              <li>Alüminyum gövde</li>
              <li>Güçlü ışık</li>
              <li>Şarjlı kullanım</li>
            </ul>
          </article>
          <article className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/5 p-5 text-white shadow-2xl backdrop-blur-xl lg:ml-auto">
            <p className={`text-xs uppercase tracking-[0.14em] ${brandClasses.accent}`}>Öne Çıkan</p>
            <h3 className="mt-2 text-xl font-bold">Kafa Lambası</h3>
            <ul className={`mt-3 space-y-1.5 text-sm ${brandClasses.textMuted}`}>
              <li>Eller serbest kullanım</li>
              <li>Uzun süreli performans</li>
              <li>Outdoor ve teknik işler</li>
            </ul>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
