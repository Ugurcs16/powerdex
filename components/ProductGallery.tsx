"use client";

import { useState } from "react";
import type { ProductCategory } from "@/types/product";
import { ProductImage } from "@/components/ProductImage";
import { brandClasses } from "@/lib/brand";

type ProductGalleryProps = {
  images: string[];
  alt: string;
  category: ProductCategory | string;
};

export function ProductGallery({ images, alt, category }: ProductGalleryProps) {
  const unique = images.filter((item, index) => images.indexOf(item) === index);
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const current = unique[Math.min(active, unique.length - 1)] ?? unique[0];
  const showThumbs = unique.length > 1;

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setZoomed(true)}
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-[20px] border ${brandClasses.border} bg-[#151922] shadow-[0_12px_40px_rgba(0,0,0,0.35)]`}
        aria-label={`${alt} görselini büyüt`}
      >
        <ProductImage
          src={current}
          alt={alt}
          category={category}
          className="object-contain p-6"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </button>

      {showThumbs ? (
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {unique.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={`relative aspect-[4/3] min-w-[5.5rem] flex-shrink-0 overflow-hidden rounded-[16px] border bg-[#151922] ${
                index === active ? "border-[#A6C74A]" : brandClasses.border
              }`}
              aria-label={`${alt} görsel ${index + 1}`}
            >
              <ProductImage
                src={image}
                alt={`${alt} ${index + 1}`}
                category={category}
                className="object-contain p-2"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      ) : null}

      {zoomed ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Büyütülmüş ürün görseli"
          onClick={() => setZoomed(false)}
        >
          <div
            className={`relative h-[min(80vh,720px)] w-full max-w-4xl overflow-hidden rounded-2xl border ${brandClasses.border} bg-[#111315]`}
            onClick={(event) => event.stopPropagation()}
          >
            <ProductImage
              src={current}
              alt={alt}
              category={category}
              className="object-contain p-8"
              sizes="100vw"
            />
            <button
              type="button"
              onClick={() => setZoomed(false)}
              className="absolute right-4 top-4 rounded-md border border-[#2A2E35] bg-[#1A1D21] px-3 py-1.5 text-sm text-white"
            >
              Kapat
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
