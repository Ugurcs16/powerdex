import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iletisim",
  description: "Powerdex kurumsal iletisim, teklif ve destek kanallari.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white">Iletisim</h1>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Kurumsal talep, urun sorulari ve is birligi gorusmeleri icin bize ulasin.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <form className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-zinc-100">Kurumsal Form</h2>
          <input className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-3" placeholder="Ad Soyad" />
          <input className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-3" placeholder="Sirket" />
          <input className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-3" placeholder="E-posta" />
          <textarea
            className="h-32 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-3"
            placeholder="Mesajiniz"
          />
          <button type="submit" className="rounded-lg bg-lime-400 px-5 py-3 font-semibold text-zinc-950">
            Gonder
          </button>
        </form>

        <div className="space-y-4">
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-lg font-semibold text-zinc-100">WhatsApp CTA</h3>
            <p className="mt-2 text-zinc-400">Hizli destek icin WhatsApp hatti uzerinden aninda iletisime gecin.</p>
          </article>
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-lg font-semibold text-zinc-100">E-posta</h3>
            <p className="mt-2 text-zinc-300">info@powerdex.com.tr</p>
          </article>
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-lg font-semibold text-zinc-100">Adres Placeholder</h3>
            <p className="mt-2 text-zinc-300">Istanbul / Turkiye</p>
          </article>
          <article className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 p-6">
            <h3 className="text-lg font-semibold text-zinc-100">Harita Placeholder</h3>
          </article>
        </div>
      </div>

      <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold text-zinc-100">Sik Sorulan Sorular</h2>
        <div className="mt-4 space-y-3 text-zinc-300">
          <p>- Siparis takibi nasil yapilir?</p>
          <p>- Garanti kapsaminda nasil destek alabilirim?</p>
          <p>- Toplu alim teklif sureci nasil ilerler?</p>
        </div>
      </section>
    </section>
  );
}
