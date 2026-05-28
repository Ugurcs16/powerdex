import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog / Rehber",
  description: "Powerdex urun rehberleri ve teknik bilgi icerikleri.",
};

export default function BlogPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white">Blog / Rehber</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs uppercase tracking-wide text-lime-400">{post.category}</p>
            <h2 className="mt-2 text-xl font-semibold text-zinc-100">{post.title}</h2>
            <p className="mt-3 text-sm text-zinc-400">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-zinc-100">
              Yaziyi Ac
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
