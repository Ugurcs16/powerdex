import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/config/company";
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from "@/lib/site";
import { brandClasses } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Powerdex Hakkımızda | 2008’den Beri Ticaret Tecrübesi",
  description:
    "Powerdex’in 2008’de başlayan ticaret yolculuğunu, marka geçmişini ve profesyonel aydınlatma alanındaki uzmanlığını keşfedin.",
};

const timeline = [
  {
    year: "2008",
    title: "Uğur İthalat’ın kuruluşu",
  },
  {
    year: "2017",
    title: "POWERDEX marka tescili ve e-ticaret faaliyetlerinin başlaması",
  },
  {
    year: "Bugün",
    title: "Profesyonel aydınlatma ve taşınabilir teknoloji ürünlerinde büyüyen ürün portföyü",
  },
];

const values = [
  "Güvenilirlik",
  "Dayanıklılık",
  "Müşteri odaklılık",
  "Sürekli gelişim",
  "Satış sonrası destek",
];

const expertise = [
  "Metal El Fenerleri",
  "Kafa Lambaları",
  "Kamp Aydınlatmaları",
  "Şarjlı ve taşınabilir aydınlatma",
  "Profesyonel kullanım ürünleri",
];

export default function AboutPage() {
  const whatsappHref = getWhatsAppUrl(getGeneralWhatsAppMessage());

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className={`${brandClasses.cardSurface} p-8 sm:p-12`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${brandClasses.accent}`}>
          Kurumsal
        </p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Powerdex Hakkında</h1>
        <p className={`mt-4 max-w-3xl text-lg leading-relaxed ${brandClasses.textMuted}`}>
          2008’den gelen ticaret tecrübesini, profesyonel aydınlatma çözümleriyle buluşturuyoruz.
        </p>
      </div>

      <div className={`mt-8 space-y-5 ${brandClasses.cardSurface} p-8 leading-relaxed ${brandClasses.textMuted}`}>
        <p>
          Powerdex’in temelleri, {company.foundedYear} yılında kurulan {company.legalBackground} ile
          atıldı. Toptan satış ve mağazacılık alanında kazanılan deneyimin ardından {company.name}{" "}
          marka tescili {company.trademarkYear} yılında alınarak e-ticaret faaliyetlerine başlandı.
        </p>
        <p>
          Bugün Powerdex; metal el fenerleri, kafa lambaları, kamp aydınlatmaları ve profesyonel
          kullanım için geliştirilen taşınabilir aydınlatma çözümlerine odaklanmaktadır. Ürün
          seçiminde dayanıklılık, pratik kullanım ve erişilebilirlik temel önceliklerimizdir.
        </p>
        <p>
          Müşterilerimize yalnızca ürün sunmayı değil; satış öncesi bilgilendirme, hızlı iletişim ve
          satış sonrası destek süreçlerinde de güvenilir bir deneyim sağlamayı hedefliyoruz.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <article className={`${brandClasses.cardSurface} p-6 lg:col-span-1`}>
          <h2 className="text-xl font-semibold text-white">Tarihçe</h2>
          <ul className="mt-5 space-y-4">
            {timeline.map((item) => (
              <li key={item.year} className={`border-l ${brandClasses.border} pl-4`}>
                <p className={`text-sm font-semibold ${brandClasses.accent}`}>{item.year}</p>
                <p className={`mt-1 text-sm ${brandClasses.textMuted}`}>{item.title}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className={`${brandClasses.cardSurface} p-6`}>
          <h2 className="text-xl font-semibold text-white">Değerlerimiz</h2>
          <ul className={`mt-5 space-y-2 text-sm ${brandClasses.textMuted}`}>
            {values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </article>

        <article className={`${brandClasses.cardSurface} p-6`}>
          <h2 className="text-xl font-semibold text-white">Uzmanlık alanlarımız</h2>
          <ul className={`mt-5 space-y-2 text-sm ${brandClasses.textMuted}`}>
            {expertise.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className={`mt-10 ${brandClasses.cardSurface} p-8 sm:p-10`}>
        <h2 className="text-2xl font-bold text-white">Ürünlerimiz hakkında bilgi alın</h2>
        <p className={`mt-3 max-w-2xl text-sm ${brandClasses.textMuted}`}>
          Katalogumuzu inceleyebilir veya WhatsApp üzerinden hızlıca bizimle iletişime geçebilirsiniz.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/urunler"
            className={`rounded-lg px-5 py-3 text-sm font-semibold ${brandClasses.accentBg}`}
          >
            Ürünleri İncele
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-lg border ${brandClasses.border} px-5 py-3 text-sm font-semibold ${brandClasses.text} hover:bg-[#1A1D21]`}
          >
            WhatsApp’tan Bize Ulaşın
          </a>
        </div>
      </div>
    </section>
  );
}
