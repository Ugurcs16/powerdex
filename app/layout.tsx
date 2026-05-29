import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.powerdex.com.tr"),
  title: {
    default: "Powerdex | Metal El Feneri, Kafa Lambası ve Profesyonel Aydınlatma",
    template: "%s | Powerdex",
  },
  description:
    "Powerdex; metal el fenerleri, kafa lambaları, kamp aydınlatmaları ve profesyonel kullanım için dayanıklı aydınlatma çözümleri sunar.",
  keywords: [
    "metal el feneri",
    "kafa lambası",
    "powerdex",
    "kamp lambası",
    "profesyonel aydınlatma",
    "şarjlı el feneri",
    "outdoor aydınlatma",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0B0D10] text-white">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <WhatsAppButton />
      </body>
    </html>
  );
}
