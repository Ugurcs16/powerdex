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

  whatsapp: [
    {
      label: "WhatsApp Destek",
      display: "+90 543 948 73 83",
      href: "https://wa.me/905439487383",
      primary: true,
    },
    {
      label: "Alternatif WhatsApp Hattı",
      display: "+90 537 867 73 62",
      href: "https://wa.me/905378677362",
      primary: false,
    },
  ],

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
