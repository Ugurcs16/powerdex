import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { brandClasses } from "@/lib/brand";

export function BlogPreview() {
  return (
    <section className={`border-y ${brandClasses.border} ${brandClasses.surface}/60 py-20`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={`text-xs font-medium uppercase tracking-[0.14em] ${brandClasses.accent}`}>
              Rehber
            </p>
            <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${brandClasses.text}`}>Blog / Teknik Rehber</h2>
            <p className={`mt-2 max-w-xl ${brandClasses.textMuted}`}>
              Metal el feneri ve kafa lambası seçiminde teknik bilgi ve kullanım önerileri.
            </p>
          </div>
          <Link href="/blog" className={`text-sm font-medium ${brandClasses.accent} hover:underline`}>
            Tüm yazılar
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <article key={post.slug} className={brandClasses.cardSurface + " p-5"}>
              <p className={`text-xs uppercase tracking-wide ${brandClasses.accent}`}>{post.category}</p>
              <h3 className={`mt-2 text-xl font-semibold ${brandClasses.text}`}>{post.title}</h3>
              <p className={`mt-3 text-sm ${brandClasses.textMuted}`}>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className={`mt-4 inline-block text-sm font-medium ${brandClasses.text}`}>
                Devamını oku →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
