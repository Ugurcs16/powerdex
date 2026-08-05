export type ProductCategory =
  | "metal-el-fenerleri"
  | "kafa-lambalari"
  | "kamp-lambalari"
  | "solar-aydinlatma"
  | "piller-sarj"
  | "masa-lambalari"
  | "tiras-makineleri"
  | "berber-makaslari"
  | "fon-makineleri"
  | "sac-duzlestiriciler"
  | "hesap-makineleri"
  | "jet-fan"
  | "diger";

export type ProductPriority = "primary" | "secondary" | "other";

export type VerificationStatus =
  | "legacy-import"
  | "verified"
  | "image-missing"
  | "data-incomplete"
  | "image-only";

export type ProductSource = "legacy-website" | "local-catalog";

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: ProductCategory;
  legacyCategory?: string;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  specifications: Record<string, string>;
  useCases: string[];
  boxContents: string[];
  warnings: string[];
  priority: ProductPriority;
  featured: boolean;
  sourceUrl?: string;
  source: ProductSource;
  verificationStatus: VerificationStatus;
}
