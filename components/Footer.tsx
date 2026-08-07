import Link from "next/link";
import { footerMainLinks, footerOtherProducts } from "@/data/categories";
import { company } from "@/config/company";
import { getGeneralWhatsAppMessage, getPrimaryWhatsApp, getWhatsAppUrl } from "@/lib/site";
import { brandClasses } from "@/lib/brand";

export function Footer() {
  const primaryWhatsApp = getPrimaryWhatsApp();

  return (
    <footer className={`border-t ${brandClasses.border} ${brandClasses.bg}`}>
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <p className={`text-lg font-semibold tracking-[0.18em] ${brandClasses.text}`}>{company.name}</p>
          <p className={`mt-4 max-w-md text-sm leading-relaxed ${brandClasses.textMuted}`}>
            Profesyonel aydınlatma sistemleri: metal el fenerleri, kafa lambaları ve saha odaklı
            aydınlatma çözümleri.
          </p>
          <ul className={`mt-5 space-y-2 text-sm ${brandClasses.textMuted}`}>
            <li>
              <a href={company.phone.href} className="hover:text-[#F5F5F5]">
                Telefon: {company.phone.display}
              </a>
            </li>
            <li>
              <a href={company.email.href} className="hover:text-[#F5F5F5]">
                E-posta: {company.email.display}
              </a>
            </li>
            <li>
              <a
                href={getWhatsAppUrl(getGeneralWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5F5F5]"
              >
                WhatsApp: {primaryWhatsApp.display}
              </a>
            </li>
            <li>
              <a
                href={company.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5F5F5]"
              >
                Instagram: {company.instagram.display}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className={`text-sm font-semibold uppercase tracking-wide ${brandClasses.text}`}>Ürünler</h3>
          <ul className={`mt-4 space-y-2 text-sm ${brandClasses.textMuted}`}>
            {footerMainLinks.map((link) => (
              <li key={link.slug}>
                <Link
                  href={"href" in link && link.href ? link.href : `/kategori/${link.slug}`}
                  className="hover:text-[#F5F5F5]"
                >
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
              <Link href="/garanti-iade-kargo" className="hover:text-[#F5F5F5]">
                İade Politikası
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#F5F5F5]">
                KVKK
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#F5F5F5]">
                Mesafeli Satış
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
          <div className="flex flex-wrap items-center gap-3">
            <Link href="#" className="hover:text-[#F5F5F5]">
              KVKK
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="#" className="hover:text-[#F5F5F5]">
              Mesafeli Satış
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/garanti-iade-kargo" className="hover:text-[#F5F5F5]">
              İade Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
