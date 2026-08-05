import fs from "node:fs";
import path from "node:path";
import type { Product } from "@/types/product";
import { getCategoryPlaceholder } from "@/lib/product-image";

function publicFileExists(publicPath: string): boolean {
  if (!publicPath.startsWith("/")) return false;
  const absolute = path.join(process.cwd(), "public", publicPath);
  try {
    return fs.existsSync(absolute);
  } catch {
    return false;
  }
}

/** Prefer real product image, then category placeholder. Server-only. */
export function resolveProductImageSrc(product: Pick<Product, "image" | "category" | "gallery">): string {
  if (product.image && publicFileExists(product.image)) {
    return product.image;
  }
  for (const candidate of product.gallery ?? []) {
    if (candidate && publicFileExists(candidate) && candidate.startsWith("/images/products/")) {
      return candidate;
    }
  }
  return getCategoryPlaceholder(product.category);
}

export function resolveProductGallery(product: Pick<Product, "image" | "category" | "gallery">): string[] {
  const paths = [product.image, ...(product.gallery ?? [])].filter(Boolean);
  const unique: string[] = [];
  for (const candidate of paths) {
    if (!unique.includes(candidate) && publicFileExists(candidate)) {
      unique.push(candidate);
    }
  }
  if (unique.length === 0) {
    return [getCategoryPlaceholder(product.category)];
  }
  // Drop placeholders if at least one real product image exists
  const real = unique.filter((item) => item.startsWith("/images/products/"));
  return real.length > 0 ? real : unique;
}

export function hasRealProductImage(product: Pick<Product, "image" | "gallery">): boolean {
  if (product.image?.startsWith("/images/products/") && publicFileExists(product.image)) {
    return true;
  }
  return (product.gallery ?? []).some(
    (item) => item.startsWith("/images/products/") && publicFileExists(item),
  );
}
