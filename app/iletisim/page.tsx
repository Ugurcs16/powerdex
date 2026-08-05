import type { Metadata } from "next";
import { Mail, MessageCircleMore, Phone, AtSign } from "lucide-react";
import { company } from "@/config/company";
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import { brandClasses } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Powerdex İletişim | Telefon, WhatsApp ve E-posta",
  description:
    "Powerdex ürünleri, toptan ve perakende satış, sipariş ve destek konularında telefon, WhatsApp veya e-posta ile bize ulaşın.",
};

export default function ContactPage() {
  const contactCards = [
    {
      title: "Telefon",
      display: company.phone.display,
      href: company.phone.href,
      icon: Phone,
      external: false,
    },
    {
      title: company.whatsapp[0].label,
      display: company.whatsapp[0].display,
      href: getWhatsAppUrl(getGeneralWhatsAppMessage(), company.whatsapp[0].href),
      icon: MessageCircleMore,
      external: true,
    },
    {
      title: company.whatsapp[1].label,
      display: company.whatsapp[1].display,
      href: getWhatsAppUrl(getGeneralWhatsAppMessage(), company.whatsapp[1].href),
      icon: MessageCircleMore,
      external: true,
    },
    {
      title: "E-posta",
      display: company.email.display,
      href: company.email.href,
      icon: Mail,
      external: false,
    },
    {
      title: "Instagram",
      display: company.instagram.display,
      href: company.instagram.href,
      icon: AtSign,
      external: true,
    },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className={`${brandClasses.cardSurface} p-8 sm:p-10`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${brandClasses.accent}`}>
          İletişim
        </p>
        <h1 className="mt-3 text-4xl font-bold text-white">Bizimle İletişime Geçin</h1>
        <p className={`mt-4 max-w-3xl ${brandClasses.textMuted}`}>
          Ürünler, toptan ve perakende satış, siparişler ve satış sonrası destek konularında bize
          ulaşabilirsiniz.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {contactCards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.title}
              href={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noopener noreferrer" : undefined}
              className={`${brandClasses.cardSurface} p-5 transition hover:border-[#A6C74A]/40`}
            >
              <div className="flex items-center gap-3">
                <span className={`rounded-lg border ${brandClasses.border} p-2`}>
                  <Icon className={`size-4 ${brandClasses.accent}`} />
                </span>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-white">{card.title}</h2>
              </div>
              <p className={`mt-4 text-base ${brandClasses.textMuted}`}>{card.display}</p>
            </a>
          );
        })}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <ContactForm />

        <div className={`space-y-4 ${brandClasses.cardSurface} p-6`}>
          <h2 className="text-xl font-semibold text-white">Hızlı Destek</h2>
          <p className={`text-sm leading-relaxed ${brandClasses.textMuted}`}>
            Acil ürün soruları ve sipariş desteği için WhatsApp hatlarımızdan bize yazabilirsiniz.
            Mesai saatlerinde mümkün olan en kısa sürede dönüş sağlanır.
          </p>
          <div className="flex flex-col gap-3">
            {company.whatsapp.map((item) => (
              <a
                key={item.href}
                href={getWhatsAppUrl(getGeneralWhatsAppMessage(), item.href)}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-lg px-4 py-3 text-sm font-semibold ${
                  item.primary ? brandClasses.accentBg : `border ${brandClasses.border} ${brandClasses.text}`
                }`}
              >
                {item.label}: {item.display}
              </a>
            ))}
          </div>
        </div>
      </div>

      {company.address ? (
        <section className={`mt-10 ${brandClasses.cardSurface} p-6`}>
          <h2 className="text-xl font-semibold text-white">Adres</h2>
          <p className={`mt-3 text-sm ${brandClasses.textMuted}`}>{company.address.display}</p>
        </section>
      ) : null}
    </section>
  );
}
