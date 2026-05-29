import Link from "next/link";
import { brandClasses } from "@/lib/brand";

export function AboutPreview() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className={`${brandClasses.cardSurface} p-8 sm:p-12`}>
        <p className={`text-sm uppercase tracking-[0.2em] ${brandClasses.accent}`}>Hakkımızda</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Profesyonel aydınlatmada güvenilir marka
        </h2>
        <p className={`mt-5 max-w-4xl leading-relaxed ${brandClasses.textMuted}`}>
          Powerdex, 2008&apos;de temelleri atılan Uğur İthalat tecrübesiyle; metal el fenerleri,
          kafa lambaları ve profesyonel kullanım aydınlatmalarında dayanıklı gövde, pratik kullanım
          ve uzun süreli performans odaklı çözümler sunar.
        </p>
        <Link
          href="/hakkimizda"
          className={`mt-6 inline-flex rounded-lg px-5 py-3 text-sm font-semibold ${brandClasses.accentBg} hover:brightness-95`}
        >
          Kurumsal Profili İncele
        </Link>
      </div>
    </section>
  );
}
