import type { ProductCategory } from "@/types/product";

export const categoryPlaceholders: Record<ProductCategory, string> = {
  "metal-el-fenerleri": "/images/placeholders/flashlight.jpg",
  "kafa-lambalari": "/images/placeholders/headlamp.jpg",
  "kamp-lambalari": "/images/placeholders/camping-lantern.jpg",
  "solar-aydinlatma": "/images/placeholders/solar-lantern.jpg",
  "piller-sarj": "/images/placeholders/battery.jpg",
  "masa-lambalari": "/images/placeholders/desk-lamp.jpg",
  "tiras-makineleri": "/images/placeholders/shaver.jpg",
  "berber-makaslari": "/images/placeholders/scissors.jpg",
  "fon-makineleri": "/images/placeholders/hair-dryer.jpg",
  "sac-duzlestiriciler": "/images/placeholders/straightener.jpg",
  "hesap-makineleri": "/images/placeholders/calculator.jpg",
  "jet-fan": "/images/placeholders/jet-fan.jpg",
  diger: "/images/placeholders/flashlight.jpg",
};

export function getCategoryPlaceholder(category: ProductCategory | string): string {
  if (category in categoryPlaceholders) {
    return categoryPlaceholders[category as ProductCategory];
  }
  return categoryPlaceholders.diger;
}
