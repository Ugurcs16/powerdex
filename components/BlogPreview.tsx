import Link from "next/link";
import { blogPosts } from "@/data/blog";

export function BlogPreview() {
  return (
    <section className="bg-zinc-900/60 py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Blog / Rehber</h2>
            <p className="mt-2 text-zinc-400">Aydinlatma secimi ve kullanim ipuclariyla SEO guclu icerik merkezi.</p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-lime-400">
            Tum yazilar
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 5).map((post) => (
            <article key={post.slug} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-xs uppercase tracking-wide text-lime-400">{post.category}</p>
              <h3 className="mt-2 text-xl font-semibold text-zinc-100">{post.title}</h3>
              <p className="mt-3 text-sm text-zinc-400">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-zinc-100">
                Devamini Oku
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
