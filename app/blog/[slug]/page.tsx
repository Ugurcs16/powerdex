import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";

type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) return { title: "Yazi Bulunamadi" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: "Powerdex" },
    publisher: { "@type": "Organization", name: "Powerdex" },
    datePublished: post.publishedAt,
  };

  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Script id="article-schema" type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </Script>
      <p className="text-xs uppercase tracking-wide text-lime-400">{post.category}</p>
      <h1 className="mt-2 text-4xl font-bold text-white">{post.title}</h1>
      <p className="mt-3 text-zinc-400">{post.readTime} okuma</p>
      <div className="mt-8 space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 leading-relaxed text-zinc-300">
        {post.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
