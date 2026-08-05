import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from "@/lib/site";
import { brandClasses } from "@/lib/brand";

export function WhatsAppButton() {
  return (
    <Link
      href={getWhatsAppUrl(getGeneralWhatsAppMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp destek"
      className={`fixed z-50 inline-flex items-center gap-2 rounded-full ${brandClasses.accentBg} shadow-lg shadow-black/30 transition hover:brightness-95 right-[max(0.75rem,env(safe-area-inset-right))] bottom-[calc(1.25rem+env(safe-area-inset-bottom))] size-11 justify-center px-0 text-sm font-semibold sm:right-5 sm:bottom-[calc(1.25rem+env(safe-area-inset-bottom))] sm:size-auto sm:px-4 sm:py-3`}
    >
      <MessageCircleMore className="size-4 sm:size-4" />
      <span className="hidden sm:inline">WhatsApp Destek</span>
      <span className="sr-only sm:hidden">Destek</span>
    </Link>
  );
}
