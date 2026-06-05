/** Powerdex kurumsal marka tokenları — endüstriyel / premium */
export const brand = {
  bg: "#111315",
  surface: "#1A1D21",
  card: "#20242A",
  border: "#2A2E35",
  text: "#F5F5F5",
  muted: "#B0B4BC",
  accent: "#A6C74A",
  accentHover: "#B7D95A",
} as const;

export const brandClasses = {
  bg: "bg-[#111315]",
  surface: "bg-[#1A1D21]",
  card: "bg-[#20242A]",
  border: "border-[#2A2E35]",
  text: "text-[#F5F5F5]",
  textMuted: "text-[#B0B4BC]",
  accent: "text-[#A6C74A]",
  accentBg:
    "bg-[#A6C74A] text-[#111315] transition-colors hover:bg-[#B7D95A]",
  accentBorder: "border-[#2A2E35]",
  accentBorderSubtle: "border-[#A6C74A]/18",
  accentGlow: "shadow-[0_0_12px_rgba(166,199,74,0.1)]",
  cardSurface: "rounded-2xl border border-[#2A2E35] bg-[#20242A]",
  cardHover: "transition-shadow hover:shadow-[0_12px_32px_rgba(0,0,0,0.32)]",
} as const;
