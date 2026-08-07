import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import type { Product } from "@/types/product";
import { getCategoryLabel } from "@/data/categories";
import { getCategoryPlaceholder } from "@/lib/product-image";
import { getProductCardWhatsAppMessage, getWhatsAppUrl } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { ProductImage } from "@/components/ProductImage";
import { brandClasses } from "@/lib/brand";

type ProductCardProps = {
  product: Product;
  /** Server-resolved image when available. */
  imageSrc?: string;
  priority?: boolean;
};

export function ProductCard({ product, imageSrc, priority = false }: ProductCardProps) {
  const categoryLabel = getCategoryLabel(product.category);
  const src =
    imageSrc ??
    (product.image?.startsWith("/images/products/")
      ? product.image
      : getCategoryPlaceholder(product.category));
  const whatsappHref = getWhatsAppUrl(getProductCardWhatsAppMessage(product));
  const mobileHighlights = product.highlights.slice(0, 2);
  const desktopHighlights = product.highlights.slice(0, 3);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border ${brandClasses.border} bg-[#20242A] shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-shadow hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] md:rounded-[20px]`}
    >
      <div
        className={`relative aspect-square overflow-hidden border-b ${brandClasses.border} bg-[#151922] sm:aspect-[4/5] md:aspect-[4/3]`}
      >
        <ProductImage
          src={src}
          alt={product.name}
          category={product.category}
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-2.5 transition-transform duration-300 group-hover:scale-[1.03] sm:p-3 md:p-5"
        />
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-3 md:p-5">
        <div>
          <p className={`text-[10px] uppercase tracking-wide ${brandClasses.accent} md:text-xs`}>
            {categoryLabel}
          </p>
          <h3
            className={`mt-1 line-clamp-2 text-sm font-medium leading-snug ${brandClasses.text} md:text-lg md:font-semibold`}
          >
            {product.name}
          </h3>
          {product.sku ? (
            <p className={`mt-1 text-[11px] ${brandClasses.textMuted} md:text-xs`}>SKU: {product.sku}</p>
          ) : null}
        </div>

        <ul
          className={`mt-2 hidden list-none space-y-1 border-t ${brandClasses.border} pt-2 text-xs ${brandClasses.textMuted} md:mt-3 md:block md:space-y-1.5 md:pt-3 md:text-sm`}
        >
          {desktopHighlights.map((feature) => {
            const cleanFeature = feature.replace(/^[-—–\s]+/, "");
            return (
              <li key={feature} className="line-clamp-1">
                {cleanFeature}
              </li>
            );
          })}
        </ul>

        <ul
          className={`mt-2 list-none space-y-0.5 border-t ${brandClasses.border} pt-2 text-xs ${brandClasses.textMuted} md:hidden`}
        >
          {mobileHighlights.map((feature) => {
            const cleanFeature = feature.replace(/^[-—–\s]+/, "");
            return (
              <li key={feature} className="line-clamp-1">
                {cleanFeature}
              </li>
            );
          })}
        </ul>

        <div className="mt-auto flex gap-1.5 pt-3 md:gap-2 md:pt-4">
          <Link
            href={`/urun/${product.slug}`}
            className={buttonVariants({
              size: "sm",
              className: `min-w-0 flex-1 px-2 text-xs font-semibold md:h-8 md:text-sm ${brandClasses.accentBg}`,
            })}
          >
            Ürünü İncele
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${product.name} için WhatsApp teklif`}
            className={buttonVariants({
              variant: "outline",
              size: "icon-sm",
              className: `shrink-0 border-[#2A2E35] ${brandClasses.text} hover:bg-[#1A1D21] md:hidden`,
            })}
          >
            <MessageCircleMore className="size-3.5" />
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: `hidden flex-1 border-[#2A2E35] text-xs ${brandClasses.text} hover:bg-[#1A1D21] md:inline-flex md:text-sm`,
            })}
          >
            WhatsApp Teklif
          </a>
        </div>
      </div>
    </article>
  );
}
