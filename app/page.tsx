import type { Metadata } from "next";
import { HeroVideo } from "@/components/HeroVideo";
import { TrustBar } from "@/components/TrustBar";
import { FocusCategories } from "@/components/FocusCategories";
import { UseCaseSection } from "@/components/UseCaseSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { TechnicalAdvantages } from "@/components/TechnicalAdvantages";
import { ComparisonTable } from "@/components/ComparisonTable";
import { BlogPreview } from "@/components/BlogPreview";
import { AboutPreview } from "@/components/AboutPreview";

export const metadata: Metadata = {
  title: "Powerdex | Metal El Feneri, Kafa Lambası ve Profesyonel Aydınlatma",
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

export default function Home() {
  return (
    <>
      <HeroVideo />
      <TrustBar />
      <FocusCategories />
      <UseCaseSection />
      <ProductShowcase />
      <TechnicalAdvantages />
      <ComparisonTable />
      <BlogPreview />
      <AboutPreview />
    </>
  );
}
