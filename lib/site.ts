import { company } from "@/config/company";

export const siteConfig = {
  name: company.name,
  url: "https://powerdex.vercel.app",
} as const;

export function getPrimaryWhatsApp() {
  return company.whatsapp.find((item) => item.primary) ?? company.whatsapp[0];
}

export function getWhatsAppUrl(message?: string, href?: string): string {
  const base = href ?? getPrimaryWhatsApp().href;
  if (!message) return base;
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppMessage(): string {
  return "Merhaba, Powerdex ürünleri hakkında bilgi almak istiyorum.";
}

export function getProductWhatsAppMessage(product: { name: string; sku?: string }): string {
  if (product.sku) {
    return `Merhaba, ${product.sku} ${product.name} hakkında bilgi almak istiyorum.`;
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
