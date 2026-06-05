import Link from "next/link";
import { footerMainLinks, footerOtherProducts } from "@/data/categories";
import { brandClasses } from "@/lib/brand";

export function Footer() {
  return (
    <footer className={`border-t ${brandClasses.border} ${brandClasses.bg}`}>
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <p className={`text-lg font-semibold tracking-[0.18em] ${brandClasses.text}`}>POWERDEX</p>
          <p className={`mt-4 max-w-md text-sm leading-relaxed ${brandClasses.textMuted}`}>
            Profesyonel aydınlatma sistemleri: metal el fenerleri, kafa lambaları ve saha odaklı
            aydınlatma çözümleri.
          </p>
        </div>

        <div>
          <h3 className={`text-sm font-semibold uppercase tracking-wide ${brandClasses.text}`}>Ürünler</h3>
          <ul className={`mt-4 space-y-2 text-sm ${brandClasses.textMuted}`}>
            {footerMainLinks.map((link) => (
              <li key={link.slug}>
                <Link href={`/kategori/${link.slug}`} className="hover:text-[#F5F5F5]">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={`text-sm font-semibold uppercase tracking-wide ${brandClasses.text}`}>Diğer Ürünler</h3>
          <ul className={`mt-4 space-y-2 text-sm ${brandClasses.textMuted}`}>
            {footerOtherProducts.map((link) => (
              <li key={link.slug}>
                <Link href={`/kategori/${link.slug}`} className="hover:text-[#F5F5F5]">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={`text-sm font-semibold uppercase tracking-wide ${brandClasses.text}`}>Kurumsal</h3>
          <ul className={`mt-4 space-y-2 text-sm ${brandClasses.textMuted}`}>
            <li>
              <Link href="/hakkimizda" className="hover:text-[#F5F5F5]">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="hover:text-[#F5F5F5]">
                İletişim
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#F5F5F5]">
                Blog / Rehber
              </Link>
            </li>
            <li>
              <Link href="/garanti-iade-kargo" className="hover:text-[#F5F5F5]">
                Garanti & Kargo
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={`border-t ${brandClasses.border}`}>
        <div
          className={`mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 text-xs sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 ${brandClasses.textMuted}`}
        >
          <p>© {new Date().getFullYear()} Powerdex. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="#">KVKK</Link>
            <Link href="#">Mesafeli Satış</Link>
            <Link href="/garanti-iade-kargo">İade Politikası</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
