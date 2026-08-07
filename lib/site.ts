import { company } from "@/config/company";

export const siteConfig = {
  name: company.name,
  url: "https://powerdex.vercel.app",
} as const;

export function getPrimaryWhatsApp() {
  return company.whatsapp.primary;
}

/** Builds wa.me URL with optional encoded text query. */
export function getWhatsAppUrl(message?: string, href?: string): string {
  const base = href ?? getPrimaryWhatsApp().href;
  if (!message) return base;
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppMessage(): string {
  return "Merhaba, Powerdex ürünleri hakkında bilgi almak istiyorum.";
}

export function getWholesaleWhatsAppMessage(): string {
  return "Merhaba, Powerdex ürünleri için toptan satış hakkında bilgi almak istiyorum.";
}

/** Product detail page WhatsApp message: SKU + product name */
export function getProductWhatsAppMessage(product: { name: string; sku?: string }): string {
  if (product.sku?.trim()) {
    return `Merhaba, ${product.sku.trim()} ${product.name} hakkında bilgi almak istiyorum.`;
  }
  return `Merhaba, ${product.name} hakkında bilgi almak istiyorum.`;
}

/** Product card WhatsApp message: SKU-focused */
export function getProductCardWhatsAppMessage(product: { name: string; sku?: string }): string {
  if (product.sku?.trim()) {
    return `Merhaba, ${product.sku.trim()} ürünü hakkında bilgi almak istiyorum.`;
  }
  return `Merhaba, ${product.name} hakkında bilgi almak istiyorum.`;
}

export function buildContactMailto(payload: {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const body = [
    `Ad Soyad: ${payload.name}`,
    `Telefon: ${payload.phone}`,
    `E-posta: ${payload.email}`,
    `Konu: ${payload.subject}`,
    "",
    payload.message,
  ].join("\n");

  return `${company.email.href}?subject=${encodeURIComponent(`Powerdex İletişim — ${payload.subject}`)}&body=${encodeURIComponent(body)}`;
}
