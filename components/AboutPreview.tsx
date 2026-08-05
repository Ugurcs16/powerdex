import Link from "next/link";
import { company } from "@/config/company";
import { brandClasses } from "@/lib/brand";

export function AboutPreview() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className={`${brandClasses.cardSurface} p-8 sm:p-12`}>
        <p className={`text-sm uppercase tracking-[0.14em] ${brandClasses.accent}`}>Hakkımızda</p>
        <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${brandClasses.text}`}>
          {company.foundedYear}
          ’den gelen ticaret tecrübesi
        </h2>
        <p className={`mt-5 max-w-4xl leading-relaxed ${brandClasses.textMuted}`}>
          Powerdex’in temelleri {company.foundedYear} yılında kurulan {company.legalBackground} ile
          atıldı. {company.trademarkYear} marka tescilinin ardından metal el fenerleri, kafa
          lambaları ve profesyonel aydınlatma çözümlerine odaklandık.
        </p>
        <Link
          href="/hakkimizda"
          className={`mt-6 inline-flex rounded-lg px-5 py-3 text-sm font-semibold ${brandClasses.accentBg}`}
        >
          Kurumsal Profili İncele
        </Link>
      </div>
    </section>
  );
}
