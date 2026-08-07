"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { buttonVariants } from "@/components/ui/button";
import { expertiseCategories } from "@/data/categories";
import { brandClasses } from "@/lib/brand";

const HERO_POSTER = "/images/hero/powerdex-hero-poster.jpg";
const HERO_POSTER_FALLBACK = "/images/hero/powerdex-hero-poster.svg";
const HERO_VIDEO = "/videos/powerdex-hero.mp4";

const metalFlashlight = expertiseCategories.find((item) => item.slug === "metal-el-fenerleri")!;

type NetworkConnection = {
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkConnection;
  mozConnection?: NetworkConnection;
  webkitConnection?: NetworkConnection;
};

function getPreferPoster(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  const nav = navigator as NavigatorWithConnection;
  const connection = nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
  return Boolean(connection?.saveData);
}

function subscribePreferPoster(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  const nav = navigator as NavigatorWithConnection;
  const connection = nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
  connection?.addEventListener?.("change", onStoreChange);
  return () => {
    mq.removeEventListener("change", onStoreChange);
    connection?.removeEventListener?.("change", onStoreChange);
  };
}

function usePreferPoster() {
  return useSyncExternalStore(subscribePreferPoster, getPreferPoster, () => false);
}

function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterSrc, setPosterSrc] = useState(HERO_POSTER);
  const [videoReady, setVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const preferPoster = usePreferPoster();
  const allowVideo = !preferPoster;

  useEffect(() => {
    if (!allowVideo) return;

    const media = document.querySelector("[data-hero-media]");
    if (!media) {
      queueMicrotask(() => setVideoSrc(HERO_VIDEO));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVideoSrc(HERO_VIDEO);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(media);
    return () => observer.disconnect();
  }, [allowVideo]);

  useEffect(() => {
    if (!videoSrc || !videoRef.current) return;
    const video = videoRef.current;
    const play = () => {
      void video.play().catch(() => {
        /* Autoplay may be blocked; poster remains visible */
      });
    };
    if (video.readyState >= 2) play();
    else video.addEventListener("canplay", play, { once: true });
  }, [videoSrc]);

  const showPoster = !allowVideo || !videoReady;

  return (
    <div className="absolute inset-0" data-hero-media aria-hidden>
      <Image
        src={posterSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover object-[60%_center] transition-opacity duration-700 md:object-center ${
          showPoster ? "opacity-100" : "opacity-0"
        }`}
        onError={() => {
          if (posterSrc !== HERO_POSTER_FALLBACK) {
            setPosterSrc(HERO_POSTER_FALLBACK);
          }
        }}
      />

      {allowVideo ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-[60%_center] transition-opacity duration-700 md:object-center ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
        >
          {videoSrc ? <source src={videoSrc} type="video/mp4" /> : null}
        </video>
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/85 md:bg-gradient-to-r md:from-black/80 md:via-black/55 md:to-black/20" />
    </div>
  );
}

function CategoryHintCards() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {expertiseCategories.map((card) => (
        <article key={card.slug} className={`rounded-2xl border ${brandClasses.border} ${brandClasses.card} p-3`}>
          <div className="flex gap-2.5">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-[#151922]">
              <Image src={card.image} alt="" fill loading="lazy" className="object-contain p-1" sizes="48px" />
            </div>
            <div>
              <h3 className={`text-xs font-semibold sm:text-sm ${brandClasses.text}`}>{card.name}</h3>
              <p className={`mt-1 text-[11px] leading-snug ${brandClasses.textMuted}`}>{card.hint}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function HeroVideo() {
  return (
    <section
      className={`relative isolate min-h-[78svh] overflow-hidden sm:min-h-[82svh] lg:min-h-[88vh] ${brandClasses.bg}`}
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto grid min-h-[78svh] w-full max-w-7xl items-center gap-8 px-4 py-12 sm:min-h-[82svh] sm:px-6 sm:py-14 lg:min-h-[88vh] lg:grid-cols-[1fr_1fr] lg:gap-10 lg:px-8 lg:py-16">
        <div className="max-w-xl">
          <p
            className={`mb-3 inline-flex rounded-md border ${brandClasses.border} ${brandClasses.surface} px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] ${brandClasses.accent} sm:mb-4 sm:px-4 sm:text-xs`}
          >
            PROFESYONEL AYDINLATMA SİSTEMLERİ
          </p>
          <h1
            className={`text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.08] ${brandClasses.text}`}
          >
            Karanlıkta Güvenilir Güç.
          </h1>
          <p
            className={`mt-4 line-clamp-3 text-sm leading-relaxed sm:mt-5 sm:text-base md:text-lg ${brandClasses.textMuted}`}
          >
            Powerdex; metal el fenerleri ve kafa lambalarında profesyonel kullanıcıların tercih ettiği
            dayanıklı aydınlatma çözümleri sunar.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Link
              href="/kategori/metal-el-fenerleri"
              className={buttonVariants({
                size: "lg",
                className: `w-full font-semibold sm:w-auto ${brandClasses.accentBg}`,
              })}
            >
              Metal Fenerleri İncele
            </Link>
            <Link
              href="/kategori/kafa-lambalari"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: `w-full border-[#2A2E35] ${brandClasses.surface} ${brandClasses.text} hover:bg-[#20242A] sm:w-auto`,
              })}
            >
              Kafa Lambalarını Gör
            </Link>
          </div>

          <div className="mt-6 lg:hidden">
            <CategoryHintCards />
          </div>
        </div>

        <div className="hidden flex-col gap-5 lg:flex">
          <div
            className={`relative overflow-hidden rounded-[20px] border ${brandClasses.border} bg-[#151922] shadow-[0_20px_50px_rgba(0,0,0,0.45),0_0_40px_rgba(166,199,74,0.06)]`}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={metalFlashlight.image}
                alt={metalFlashlight.name}
                fill
                loading="lazy"
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {expertiseCategories.map((card) => (
              <article
                key={card.slug}
                className={`rounded-[20px] border ${brandClasses.border} ${brandClasses.card} p-4`}
              >
                <div className="flex gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-[#151922]">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      loading="lazy"
                      className="object-contain p-1"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold ${brandClasses.text}`}>{card.name}</h3>
                    <ul className={`mt-2 space-y-1 text-xs ${brandClasses.textMuted}`}>
                      {card.features.slice(0, 3).map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
