"use client";

import { motion } from "framer-motion";
import { useCases } from "@/data/useCases";

export function UseCaseSection() {
  return (
    <section className="bg-zinc-900/60 py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Her Duruma Hazir Isik Gucu</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
            >
              <h3 className="text-xl font-semibold text-zinc-100">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
