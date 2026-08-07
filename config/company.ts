export const company = {
  name: "POWERDEX",
  legalBackground: "Uğur İthalat",
  foundedYear: 2008,
  trademarkYear: 2017,

  phone: {
    display: "0488 213 72 73",
    href: "tel:+904882137273",
  },

  email: {
    display: "powerdex.tr@gmail.com",
    href: "mailto:powerdex.tr@gmail.com",
  },

  whatsapp: {
    primary: {
      label: "WhatsApp Destek",
      display: "+90 535 315 43 73",
      href: "https://wa.me/905353154373",
      number: "905353154373",
    },
  },

  instagram: {
    display: "@powerdex.tr",
    href: "https://www.instagram.com/powerdex.tr/",
  },

  address: null as null | {
    display: string;
    mapEmbedUrl?: string;
  },
} as const;

export type CompanyConfig = typeof company;
