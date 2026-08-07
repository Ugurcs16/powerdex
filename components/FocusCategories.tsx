import Image from "next/image";
import Link from "next/link";
import { expertiseCategories } from "@/data/categories";
import { brandClasses } from "@/lib/brand";

export function FocusCategories() {
  return (
    <section className={`${brandClasses.bg} py-12 sm:py-14 lg:py-20`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className={`text-xs font-medium uppercase tracking-[0.14em] ${brandClasses.accent}`}>
          Uzmanlık Alanlarımız
        </p>
        <h2 className={`mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl ${brandClasses.text}`}>
          Uzman Olduğumuz Ürünler
        </h2>
        <p className={`mt-3 max-w-2xl text-sm sm:text-base ${brandClasses.textMuted}`}>
          Powerdex&apos;in en güçlü olduğu alanlar: metal el fenerleri ve kafa lambaları.
        </p>

        <div className="mt-8 grid grid-cols-2 items-stretch gap-3 md:mt-10 md:gap-6">
          {expertiseCategories.map((card) => (
            <article
              key={card.slug}
              className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border ${brandClasses.border} bg-[#20242A] shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.45),0_0_30px_rgba(166,199,74,0.08)]`}
            >
              <Link
                href={`/kategori/${card.slug}`}
                className="relative block aspect-square overflow-hidden bg-[#15181C] md:aspect-[16/10]"
                aria-label={`${card.name} kategorisini incele`}
              >
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-contain p-3 transition-transform duration-500 md:object-cover md:p-0 md:group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 50vw"
                />
                <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-[#111315]/90 via-[#111315]/30 to-transparent md:block" />
                <h3
                  className={`pointer-events-none absolute bottom-4 left-5 hidden text-2xl font-bold lg:text-3xl ${brandClasses.text} md:block`}
                >
                  {card.name}
                </h3>
              </Link>

              <div className="flex flex-1 flex-col p-3 md:p-6 md:pt-5 lg:p-8">
                <h3
                  className={`line-clamp-2 text-sm font-semibold leading-tight ${brandClasses.text} md:hidden`}
                >
                  {card.name}
                </h3>

                <p className={`mt-1 line-clamp-2 text-xs leading-snug ${brandClasses.textMuted} md:hidden`}>
                  {card.shortDescription}
                </p>

                <p className={`mt-1 hidden text-sm leading-relaxed ${brandClasses.textMuted} md:mt-0 md:block`}>
                  {card.description}
                </p>

                <ul className="mt-4 hidden list-none gap-2 md:grid md:grid-cols-2">
                  {card.features.map((feature) => {
                    const cleanFeature = feature.replace(/^[-—–\s]+/, "");
                    return (
                      <li
                        key={feature}
                        className={`flex items-center gap-2 text-sm ${brandClasses.textMuted} before:size-1 before:rounded-full before:bg-[#2A2E35]`}
                      >
                        {cleanFeature}
                      </li>
                    );
                  })}
                </ul>

                <Link
                  href={`/kategori/${card.slug}`}
                  className={`mt-auto inline-flex items-center gap-1 pt-3 text-xs font-medium ${brandClasses.accent} transition hover:underline md:mt-6 md:inline-flex md:rounded-lg md:bg-[#A6C74A] md:px-4 md:py-3 md:text-sm md:font-semibold md:text-[#111315] md:no-underline md:hover:bg-[#B7D95A] md:hover:no-underline`}
                >
                  <span className="md:hidden">İncele →</span>
                  <span className="hidden md:inline">{card.cta}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
