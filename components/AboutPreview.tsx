import Link from "next/link";

export function AboutPreview() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 sm:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-lime-400">Hakkimizda</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">2008&apos;den gelen ticari birikim, 2017&apos;den beri guclu bir marka</h2>
        <p className="mt-5 max-w-4xl leading-relaxed text-zinc-300">
          Powerdex, 2008&apos;de temelleri atilan Ugur Ithalat tecrubesiyle, 2017&apos;den bu yana
          aydinlatma, tasinabilir enerji ve kisisel bakim urunlerinde kullanici odakli
          cozumler sunar. Hedefimiz; dayanikli, erisilebilir ve pratik urunlerle
          musterilerimize guvenilir bir alisveris deneyimi saglamaktir.
        </p>
        <Link
          href="/hakkimizda"
          className="mt-6 inline-flex rounded-lg bg-lime-400 px-5 py-3 text-sm font-semibold text-zinc-950"
        >
          Markayi Yakindan Taniyin
        </Link>
      </div>
    </section>
  );
}
