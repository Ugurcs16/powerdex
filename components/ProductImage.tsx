"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductCategory } from "@/types/product";
import { getCategoryPlaceholder } from "@/lib/product-image";
import { ProductVisualFallback } from "@/components/ProductVisualFallback";

type ProductImageProps = {
  src: string;
  alt: string;
  category: ProductCategory | string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

type ImageStage = "primary" | "placeholder" | "fallback";

export function ProductImage({
  src,
  alt,
  category,
  className = "object-contain p-4",
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  priority = false,
}: ProductImageProps) {
  const placeholder = getCategoryPlaceholder(category);
  const [stage, setStage] = useState<ImageStage>(() =>
    src === placeholder ? "placeholder" : "primary",
  );
  const [loaded, setLoaded] = useState(false);

  if (stage === "fallback") {
    return <ProductVisualFallback name={alt} category={category} />;
  }

  const currentSrc = stage === "primary" ? src : placeholder;

  return (
    <>
      {!loaded ? (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#151922] via-[#1A1D21] to-[#20242A]" />
      ) : null}
      <Image
        src={currentSrc}
        alt={alt}
        fill
        priority={priority}
        className={`transition-transform duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setLoaded(false);
          setStage((prev) => {
            if (prev === "primary" && src !== placeholder) return "placeholder";
            return "fallback";
          });
        }}
      />
    </>
  );
}
