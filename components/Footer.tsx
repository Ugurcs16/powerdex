import Link from "next/link";
import { Globe, ShieldCheck, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <p className="text-lg font-bold tracking-[0.2em] text-white">POWERDEX</p>
          <p className="mt-4 max-w-md text-sm text-zinc-400">
            Outdoor aydinlatma, sarjli urunler ve kisisel bakim kategorilerinde premium
            ve guvenilir urun deneyimi.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="rounded-md border border-zinc-700 p-2 text-zinc-300">
              <Globe className="size-4" />
            </a>
            <a href="#" aria-label="Facebook" className="rounded-md border border-zinc-700 p-2 text-zinc-300">
              <ShieldCheck className="size-4" />
            </a>
            <a href="#" aria-label="YouTube" className="rounded-md border border-zinc-700 p-2 text-zinc-300">
              <MessageCircle className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-100">Kategoriler</h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            <li><Link href="/kategori/el-fenerleri">El Fenerleri</Link></li>
            <li><Link href="/kategori/kafa-lambalari">Kafa Lambalari</Link></li>
            <li><Link href="/kategori/kamp-lambalari">Kamp Lambalari</Link></li>
            <li><Link href="/kategori/solar-aydinlatma">Solar Urunler</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-100">Kurumsal</h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            <li><Link href="/hakkimizda">Hakkimizda</Link></li>
            <li><Link href="/iletisim">Iletisim</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-100">Musteri Hizmetleri</h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            <li><Link href="/garanti-iade-kargo">Garanti</Link></li>
            <li><Link href="/garanti-iade-kargo">Iade Politikasi</Link></li>
            <li><Link href="/garanti-iade-kargo">Kargo Bilgisi</Link></li>
            <li><Link href="#">KVKK</Link></li>
            <li><Link href="#">Mesafeli Satis</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-800">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 text-xs text-zinc-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Powerdex. Tum haklari saklidir.</p>
          <form className="flex w-full max-w-sm gap-2">
            <input
              type="email"
              placeholder="E-posta aboneligi"
              aria-label="E-posta aboneligi"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100"
            />
            <button type="submit" className="rounded-lg bg-lime-400 px-3 py-2 font-semibold text-zinc-950">
              Abone Ol
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
