"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { brandClasses } from "@/lib/brand";

type FeaturedProductSliderProps = {
  products: Product[];
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function FeaturedProductSlider({ products }: FeaturedProductSliderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, [products, updateArrows]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({
      left: direction * amount,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="relative mt-8 md:mt-10">
      <div className="mb-3 hidden justify-end gap-2 md:flex">
        <button
          type="button"
          aria-label="Önceki ürünler"
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
          className={`inline-flex size-10 items-center justify-center rounded-full border ${brandClasses.border} bg-[#151922] text-white transition hover:bg-[#20242A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6C74A] disabled:cursor-not-allowed disabled:opacity-40`}
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Sonraki ürünler"
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
          className={`inline-flex size-10 items-center justify-center rounded-full border ${brandClasses.border} bg-[#151922] text-white transition hover:bg-[#20242A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6C74A] disabled:cursor-not-allowed disabled:opacity-40`}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        role="region"
        aria-label="Öne çıkan ürünler kaydırıcısı"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 scrollbar-hide outline-none focus-visible:ring-2 focus-visible:ring-[#A6C74A]/60 sm:gap-4 md:gap-5"
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            data-slide
            className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-[24%]"
          >
            <ProductCard product={product} imageSrc={product.image} priority={index < 2} />
          </div>
        ))}
      </div>
    </div>
  );
}
