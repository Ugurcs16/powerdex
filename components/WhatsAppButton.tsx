import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { brandClasses } from "@/lib/brand";

export function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/905555555555"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp destek"
      className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold ${brandClasses.accentBg} shadow-lg shadow-black/30 transition hover:brightness-95`}
    >
      <MessageCircleMore className="size-4" />
      WhatsApp Destek
    </Link>
  );
}
