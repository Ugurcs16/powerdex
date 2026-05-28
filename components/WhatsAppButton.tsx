import Link from "next/link";
import { MessageCircleMore } from "lucide-react";

export function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/905555555555"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp destek"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-lime-400 px-4 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-lime-900/40 transition hover:bg-lime-300"
    >
      <MessageCircleMore className="size-4" />
      WhatsApp Destek
    </Link>
  );
}
