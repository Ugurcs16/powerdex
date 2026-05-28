"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";

export function HeroVideo() {
  const [videoErrored, setVideoErrored] = useState(false);
  const [fallbackImageErrored, setFallbackImageErrored] = useState(false);

  return (
    <section className="relative isolate min-h-[90vh] overflow-hidden">
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
      ) : fallbackImageErrored ? (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
          <div className="absolute left-1/4 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-lime-400/30 blur-3xl" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-lime-300/70 to-transparent" />
          <div className="absolute right-[18%] top-[25%] h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        </div>
      ) : (
        <Image
          src="/images/hero/flashlight-hero.jpg"
          alt="Outdoor flashlight hero"
          fill
          priority
          className="object-cover"
          onError={() => setFallbackImageErrored(true)}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />

      <div className="relative z-10 mx-auto grid min-h-[90vh] w-full max-w-7xl items-center gap-8 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-4 inline-flex rounded-full border border-lime-300/35 bg-zinc-900/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-lime-300 backdrop-blur">
            KALITEYI BIZIMLE HISSEDIN
          </p>
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Geceyi Kontrol Et.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg">
            Powerdex; kamp, guvenlik, arac, tamir ve acil durumlar icin guclu
            aydinlatma ve tasinabilir enerji cozumleri sunar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kategori/el-fenerleri"
              className={buttonVariants({
                size: "lg",
                className: "bg-lime-400 text-zinc-950 shadow-[0_0_25px_rgba(132,204,22,0.35)] hover:bg-lime-300",
              })}
            >
              Urunleri Kesfet
            </Link>
            <Link
              href="/kategori/profesyonel-kullanim"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "border-zinc-300/40 bg-zinc-950/40 text-zinc-100 hover:bg-zinc-800",
              })}
            >
              Dogru Urunu Bul
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="hidden justify-self-end lg:block"
        >
          <article className="w-80 rounded-2xl border border-white/20 bg-white/10 p-6 text-zinc-100 shadow-2xl backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.16em] text-lime-300">One Cikan Model</p>
            <h3 className="mt-2 text-2xl font-bold">PD-1072 Kafa Lambasi</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-200">
              <li>1000 Lumen</li>
              <li>6 Saat Calisma</li>
              <li>2850 mAh Batarya</li>
            </ul>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
