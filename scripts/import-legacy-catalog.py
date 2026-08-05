#!/usr/bin/env python3
"""One-time legacy catalog importer. Reads saved WooCommerce JSON, writes static TS + report."""

from __future__ import annotations

import json
import re
import html
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = Path(__file__).resolve().parent / "legacy-raw"

LEGACY_TO_CATEGORY = {
    "el-fenerleri": "metal-el-fenerleri",
    "kafa-lambasi": "kafa-lambalari",
    "kamp-lambasi": "kamp-lambalari",
    "gunes-paneli-solar": "solar-aydinlatma",
    "powerdex-orjinal-pil": "piller-sarj",
    "masa-lambasi": "masa-lambalari",
    "tiras-makineleri": "tiras-makineleri",
    "makaslar": "berber-makaslari",
    "genel": "fon-makineleri",  # site labels this FÖN MAKİNESİ
    "sac-duzlestirici": "sac-duzlestiriciler",
    "hesap-makinesi": "hesap-makineleri",
    "jet-fan": "jet-fan",
}

LEGACY_LABEL = {
    "el-fenerleri": "EL FENERİ",
    "kafa-lambasi": "KAFA LAMBASI",
    "kamp-lambasi": "KAMP LAMBASI",
    "gunes-paneli-solar": "GÜNEŞ PANELİ (SOLAR)",
    "powerdex-orjinal-pil": "Powerdex Orjinal Pil",
    "masa-lambasi": "MASA LAMBASI",
    "tiras-makineleri": "TIRAŞ MAKİNESİ",
    "makaslar": "MAKAS",
    "genel": "FÖN MAKİNESİ",
    "sac-duzlestirici": "SAÇ DÜZLEŞTİRİCİ",
    "hesap-makinesi": "HESAP MAKİNESİ",
    "jet-fan": "JET FAN",
}

CATEGORY_PRIORITY = {
    "metal-el-fenerleri": 0,
    "kafa-lambalari": 1,
    "kamp-lambalari": 2,
    "solar-aydinlatma": 3,
    "piller-sarj": 4,
    "masa-lambalari": 5,
    "tiras-makineleri": 6,
    "berber-makaslari": 7,
    "fon-makineleri": 8,
    "sac-duzlestiriciler": 9,
    "hesap-makineleri": 10,
    "jet-fan": 11,
    "diger": 12,
}

# Prefer these categories when a product sits in multiple legacy cats
MULTI_CAT_PREFERENCE = [
    "kamp-lambalari",
    "solar-aydinlatma",
    "metal-el-fenerleri",
    "kafa-lambalari",
]

FEATURED_SKUS = {
    "PD-7007",
    "PD-8007",
    "PD-14000",
    "PD-13000",
    "PD-12500",
    "PD-1072",
    "PD-1872",
    "PD-1472",
    "PD-9972",
}

TR_LOWER = str.maketrans(
    {
        "I": "ı",
        "İ": "i",
        "Ş": "ş",
        "Ğ": "ğ",
        "Ü": "ü",
        "Ö": "ö",
        "Ç": "ç",
    }
)

TR_UPPER = str.maketrans(
    {
        "i": "İ",
        "ı": "I",
        "ş": "Ş",
        "ğ": "Ğ",
        "ü": "Ü",
        "ö": "Ö",
        "ç": "Ç",
    }
)

SMALL_WORDS = {
    "ve",
    "ile",
    "veya",
    "icin",
    "için",
    "de",
    "da",
    "bir",
    "of",
    "the",
}

CATEGORY_NOUN = {
    "metal-el-fenerleri": "El Feneri",
    "kafa-lambalari": "Kafa Lambası",
    "kamp-lambalari": "Kamp Lambası",
    "solar-aydinlatma": "Solar Panel",
    "piller-sarj": "Pil",
    "masa-lambalari": "Masa Lambası",
    "tiras-makineleri": "Tıraş Makinesi",
    "berber-makaslari": "Berber Makası",
    "fon-makineleri": "Fön Makinesi",
    "sac-duzlestiriciler": "Saç Düzleştirici",
    "hesap-makineleri": "Hesap Makinesi",
    "jet-fan": "Jet Fan",
    "diger": "Ürün",
}


def tr_lower(s: str) -> str:
    return s.translate(TR_LOWER).lower()


def title_case_tr(word: str) -> str:
    if not word:
        return word
    # Keep SKU-like tokens
    if re.fullmatch(
        r"(?i)pd-?\d+[a-z]?|vt-?\d+|kg-?\d+|pg-?\d+|vtc\d+|18650l?|26650|ipx\d+|usb|type-?c|cob|led|smd|w|mah|mah\.?",
        word,
    ):
        if re.match(r"(?i)^pd", word):
            m = re.match(r"(?i)^pd-?(\d+[a-z]?)$", word)
            return f"PD-{m.group(1).upper()}" if m else word.upper()
        if re.match(r"(?i)^vt", word):
            m = re.match(r"(?i)^vt-?(\d+)$", word)
            return f"VT-{m.group(1)}" if m else word.upper()
        if re.match(r"(?i)^kg", word):
            m = re.match(r"(?i)^kg-?(\d+)$", word)
            return f"KG-{m.group(1)}" if m else word.upper()
        if re.match(r"(?i)^pg", word):
            m = re.match(r"(?i)^pg-?(\d+)$", word)
            return f"PG-{m.group(1)}" if m else word.upper()
        return word.upper() if word.isupper() or word.lower() in {"usb", "led", "cob", "smd", "type-c", "typec"} else word
    if word.lower() in {"powerdex", "vult", "king", "powergold", "ultrufife"}:
        return word[:1].upper() + word[1:].lower() if word.lower() != "powerdex" else "Powerdex"
    # watt / mah units
    if re.fullmatch(r"\d+w", word, re.I):
        return word.upper()
    if re.fullmatch(r"\d+mah", word, re.I):
        return re.sub(r"(?i)mah", "mAh", word)
    if re.fullmatch(r"(?i)li-?ions?", word):
        return "Li-ion"
    lower = tr_lower(word)
    if not lower:
        return word
    first = lower[0]
    if first in "iışğüöç":
        first = first.translate(TR_UPPER)
    else:
        first = first.upper()
    return first + lower[1:]


def format_product_name(raw: str, category: str, sku: str) -> str:
    text = html.unescape(raw)
    text = re.sub(r"\s+", " ", text).strip()
    text = text.replace("|", " ")
    text = re.sub(r"\s+", " ", text)

    # Keep hyphenated SKUs intact (PD-7007), only split on spaces
    tokens = text.split(" ")
    parts = []
    for idx, tok in enumerate(tokens):
        low = tr_lower(tok)
        if low in SMALL_WORDS and parts:
            parts.append(low)
        else:
            parts.append(title_case_tr(tok))
    name = " ".join(parts)
    name = re.sub(r"\s+", " ", name).strip()
    name = re.sub(r"\bPowerdex\b", "Powerdex", name, flags=re.I)

    # Ensure Powerdex + SKU ordering when possible
    if sku:
        cleaned = name
        cleaned = re.sub(r"(?i)\bpowerdex\b", "", cleaned)
        cleaned = re.sub(re.escape(sku), "", cleaned, flags=re.I)
        cleaned = re.sub(r"\s{2,}", " ", cleaned).strip(" -–—")
        noun = CATEGORY_NOUN.get(category, "")
        rest = cleaned
        if noun and tr_lower(noun) not in tr_lower(rest):
            if not rest or len(rest) < 3:
                rest = noun
            elif category in {
                "metal-el-fenerleri",
                "kafa-lambalari",
                "kamp-lambalari",
                "masa-lambalari",
                "hesap-makineleri",
                "tiras-makineleri",
                "fon-makineleri",
                "sac-duzlestiriciler",
                "jet-fan",
            }:
                if re.fullmatch(r"(\d+\s*W|\d+\s*mAh|Pro|Plus|Profesyonel.*)", rest, re.I):
                    rest = f"{rest} {noun}".strip()
                elif not any(
                    k in tr_lower(rest)
                    for k in [
                        "fener",
                        "lamba",
                        "makine",
                        "makas",
                        "pil",
                        "panel",
                        "fan",
                        "pointer",
                        "düzleştir",
                        "duzlestir",
                    ]
                ):
                    rest = f"{rest} {noun}".strip()
        name = f"Powerdex {sku}" + (f" {rest}" if rest else "")
        name = re.sub(r"\s+", " ", name).strip()

    # Brand overrides for non-Powerdex
    brand_match = re.match(r"(?i)^(vult|king|powergold|ultrufife)\b", html.unescape(raw).strip())
    if brand_match:
        brand = brand_match.group(1).capitalize()
        if brand.lower() == "vult":
            brand = "Vult"
        if brand.lower() == "king":
            brand = "King"
        if brand.lower() == "powergold":
            brand = "Powergold"
        if brand.lower() == "ultrufife":
            brand = "Ultrufife"
        rest = re.sub(r"(?i)^" + brand_match.group(1), "", html.unescape(raw)).strip(" -–—")
        rest_parts = [title_case_tr(w) for w in rest.split() if w]
        rest = " ".join(rest_parts)
        name = f"{brand} {rest}".strip()
        if sku and sku not in name:
            name = f"{brand} {sku} {rest}".strip()
            name = re.sub(r"\s+", " ", name)

    return name


def extract_sku(title: str) -> str:
    text = html.unescape(title)
    patterns = [
        r"\b(PD[-\s]?\d{2,5}[A-Z]?)\b",
        r"\b(VT[-\s]?\d{3,5})\b",
        r"\b(KG[-\s]?\d{3,5})\b",
        r"\b(PG[-\s]?\d{3,5})\b",
    ]
    for pat in patterns:
        m = re.search(pat, text, re.I)
        if m:
            raw = m.group(1).upper().replace(" ", "")
            raw = re.sub(r"^(PD|VT|KG|PG)(\d)", r"\1-\2", raw)
            return raw
    return ""


def slugify(text: str) -> str:
    table = str.maketrans(
        {
            "ş": "s",
            "Ş": "s",
            "ı": "i",
            "İ": "i",
            "ğ": "g",
            "Ğ": "g",
            "ü": "u",
            "Ü": "u",
            "ö": "o",
            "Ö": "o",
            "ç": "c",
            "Ç": "c",
        }
    )
    s = html.unescape(text).translate(table).lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def strip_html(raw: str) -> str:
    text = re.sub(r"<script[\s\S]*?</script>", " ", raw, flags=re.I)
    text = re.sub(r"<style[\s\S]*?</style>", " ", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text)
    text = re.sub(r"https?://\S+", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def clean_description(text: str) -> str:
    if not text:
        return ""
    # Remove marketplace clichés
    cliches = [
        r"(?i)hemen satın al",
        r"(?i)ücretsiz kargo",
        r"(?i)stokta var",
        r"(?i)sepette",
        r"(?i)kaçırma",
        r"(?i)fırsat",
        r"(?i)quick view",
        r"(?i)karşılaştır",
        r"(?i)wishlist",
        r"(?i)add to cart",
    ]
    for c in cliches:
        text = re.sub(c, " ", text)
    # Pipe-separated marketing titles -> readable sentence fragments
    if text.count("|") >= 2:
        parts = [p.strip(" -–—") for p in text.split("|")]
        parts = [p for p in parts if p and tr_lower(p) not in {"powerdex"}]
        text = ". ".join(parts)
    text = re.sub(r"\s+", " ", text).strip(" -–—|")
    text = re.sub(r"!{2,}", ".", text)
    text = re.sub(r"\.{2,}", ".", text)
    text = re.sub(r"\s+([.!?])", r"\1", text)

    def soften(m: re.Match) -> str:
        chunk = m.group(0)
        if len(chunk) < 12:
            return chunk
        words = chunk.split()
        return " ".join(title_case_tr(w) for w in words)

    text = re.sub(r"\b[A-ZÇĞİÖŞÜ0-9][A-ZÇĞİÖŞÜ0-9\s,./+\-]{11,}\b", soften, text)
    # Light typo fixes that don't invent specs
    text = re.sub(r"(?i)\bşarjl\b", "şarjlı", text)
    text = re.sub(r"(?i)\bi[şs]kl[ıi]\b", "ışıklı", text)
    return text.strip()


def extract_specifications(text: str) -> dict[str, str]:
    specs: dict[str, str] = {}
    if not text:
        return specs

    patterns = [
        ("Işık Gücü", r"(\d+(?:[.,]\d+)?\s*(?:lümen|lumen|lm)\b)", None),
        ("Güç", r"(\d+(?:[.,]\d+)?\s*W(?:att)?\b)", None),
        ("Batarya", r"((?:\d+(?:[.,]\d+)?\s*V\s*)?\d+(?:[.,]\d+)?\s*mAh\b)", None),
        ("Çalışma Süresi", r"(\d+(?:[.,]\d+)?\s*saat(?:\s*kesintisiz)?(?:\s*çalış(?:ır|ma)?)?)", None),
        ("Şarj Tipi", r"((?:USB[\s\-]?Type[\s\-]?C|Type[\s\-]?C|USB[\s\-]?[Cc]|Micro[\s\-]?USB|USB[\s\-]?Micro))", None),
        ("Koruma", r"\b(IPX?\d)\b", None),
        ("Ağırlık", r"(\d+(?:[.,]\d+)?\s*gr(?:am)?\b)", None),
        ("Voltaj", r"(\d+(?:[.,]\d+)?\s*V\b)", None),
        ("Pil Tipi", r"\b(18650L?|26650|Li[\s\-]?ion|Lion)\b", None),
    ]

    for key, pat, _ in patterns:
        m = re.search(pat, text, re.I)
        if not m:
            continue
        val = m.group(1).strip()
        val = re.sub(r"\s+", " ", val)
        # normalize
        val = re.sub(r"(?i)\blumen\b", "lümen", val)
        val = re.sub(r"(?i)\blm\b", "lm", val)
        val = re.sub(r"(?i)type[\s\-]?c", "Type-C", val)
        val = re.sub(r"(?i)usb[\s\-]?type[\s\-]?c", "USB Type-C", val)
        val = re.sub(r"(?i)micro[\s\-]?usb|usb[\s\-]?micro", "Micro USB", val)
        if key == "Çalışma Süresi":
            mm = re.search(r"(\d+(?:[.,]\d+)?\s*saat)", val, re.I)
            if mm:
                val = mm.group(1)
        if key not in specs:
            specs[key] = val
    return specs


def extract_highlights(text: str, specs: dict[str, str], category: str) -> list[str]:
    highlights: list[str] = []
    for key in ["Işık Gücü", "Batarya", "Çalışma Süresi", "Şarj Tipi", "Koruma", "Güç", "Ağırlık"]:
        if key in specs:
            highlights.append(f"{key}: {specs[key]}")
    if len(highlights) >= 3:
        return highlights[:4]

    # Pull short bullet-like phrases from text
    candidates = re.split(r"[.|•\n]", text)
    for c in candidates:
        c = clean_description(c)
        if 12 <= len(c) <= 80 and not c.lower().startswith("paket"):
            if c not in highlights:
                highlights.append(c)
        if len(highlights) >= 4:
            break

    if not highlights:
        noun = CATEGORY_NOUN.get(category, "Ürün")
        highlights = [noun, "Powerdex kalitesi"]
    return highlights[:4]


def extract_box_contents(text: str) -> list[str]:
    m = re.search(r"(?i)paket\s*i[çc]eri[ğg]i\s*:?\s*(.+)$", text)
    if not m:
        return []
    chunk = m.group(1)
    parts = re.split(r"[,;]| ve ", chunk)
    items = []
    for p in parts:
        p = clean_description(p)
        if 3 <= len(p) <= 80:
            items.append(title_case_tr(p) if p.isupper() else p)
    return items[:8]


def extract_warnings(text: str) -> list[str]:
    warnings = []
    for m in re.finditer(r"(?i)(kullanılmadığı zaman[^.]+\.|doğrudan göze[^.]+\.|çocuklardan[^.]+\.)", text):
        w = clean_description(m.group(1))
        if w:
            warnings.append(w)
    return warnings[:4]


def use_cases_for(category: str, text: str) -> list[str]:
    defaults = {
        "metal-el-fenerleri": ["Araç / tamir", "Güvenlik", "Outdoor"],
        "kafa-lambalari": ["Teknik servis", "Outdoor", "Eller serbest kullanım"],
        "kamp-lambalari": ["Kamp", "Açık alan", "Acil durum"],
        "solar-aydinlatma": ["Solar sistem", "Outdoor", "Enerji desteği"],
        "piller-sarj": ["Yedek enerji", "Uyumlu cihaz şarjı"],
        "masa-lambalari": ["Masaüstü aydınlatma", "Ofis / ev"],
        "tiras-makineleri": ["Kişisel bakım", "Kuaför / berber"],
        "berber-makaslari": ["Berber / kuaför"],
        "fon-makineleri": ["Saç şekillendirme"],
        "sac-duzlestiriciler": ["Saç şekillendirme"],
        "hesap-makineleri": ["Ofis", "Muhasebe"],
        "jet-fan": ["Havalandırma", "Saha kullanımı"],
        "diger": ["Genel kullanım"],
    }
    return defaults.get(category, ["Genel kullanım"])


def pick_category(legacy_slugs: list[str]) -> tuple[str, str]:
    mapped = [LEGACY_TO_CATEGORY.get(s, "diger") for s in legacy_slugs]
    if not mapped:
        return "diger", legacy_slugs[0] if legacy_slugs else ""
    # Preference for multi-cat
    for pref in MULTI_CAT_PREFERENCE:
        if pref in mapped:
            idx = mapped.index(pref)
            return pref, legacy_slugs[idx]
    # else first
    return mapped[0], legacy_slugs[0]


def priority_for(category: str) -> str:
    if category in {"metal-el-fenerleri", "kafa-lambalari"}:
        return "primary"
    if category in {"kamp-lambalari", "solar-aydinlatma", "piller-sarj"}:
        return "secondary"
    return "other"


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def ts_string_list(values: list[str]) -> str:
    if not values:
        return "[]"
    inner = ", ".join(ts_string(v) for v in values)
    return f"[{inner}]"


def ts_record(record: dict[str, str]) -> str:
    if not record:
        return "{}"
    parts = [f"    {ts_string(k)}: {ts_string(v)}" for k, v in record.items()]
    return "{\n" + ",\n".join(parts) + ",\n  }"


def main() -> None:
    cats_raw = json.loads((RAW / "categories.json").read_text())
    products_raw = json.loads((RAW / "products-page-1.json").read_text()) + json.loads(
        (RAW / "products-page-2.json").read_text()
    )
    cat_by_id = {c["id"]: c for c in cats_raw}

    # Deduplicate: same SKU + same mapped category, or identical slug/title
    # Keep richest content. Different categories with same SKU kept separately.
    candidates = []
    for p in products_raw:
        title = html.unescape(p["title"]["rendered"]).strip()
        legacy_slugs = [cat_by_id[cid]["slug"] for cid in p["product_cat"] if cid in cat_by_id]
        category, legacy_primary = pick_category(legacy_slugs)
        sku = extract_sku(title)
        content = clean_description(strip_html(p["content"]["rendered"]))
        excerpt = clean_description(strip_html(p["excerpt"]["rendered"]))
        body = content if len(content) >= len(excerpt) else excerpt
        candidates.append(
            {
                "wp_id": p["id"],
                "raw_slug": p["slug"],
                "title": title,
                "sku": sku,
                "category": category,
                "legacy_slugs": legacy_slugs,
                "legacy_primary": legacy_primary,
                "body": body,
                "source_url": p.get("link") or f"https://powerdex.com.tr/?product={p['slug']}",
                "score": len(body) + (20 if sku else 0) + (10 if "powerdex" in p["slug"] else 0),
            }
        )

    # Sort richest first
    candidates.sort(key=lambda x: (-x["score"], x["wp_id"]))

    selected = []
    seen_keys = set()
    duplicates_eliminated = []

    for c in candidates:
        # Dedup keys
        keys = []
        if c["sku"]:
            keys.append(("sku-cat", c["sku"], c["category"]))
        keys.append(("slug", c["raw_slug"]))
        keys.append(("title-cat", tr_lower(c["title"]), c["category"]))

        # Special: same SKU same category
        dup = False
        for k in keys:
            if k in seen_keys:
                dup = True
                break
        if dup:
            duplicates_eliminated.append(
                {
                    "title": c["title"],
                    "sku": c["sku"],
                    "category": c["category"],
                    "sourceUrl": c["source_url"],
                    "reason": "duplicate-sku-or-title-same-category",
                }
            )
            continue
        for k in keys:
            seen_keys.add(k)
        selected.append(c)

    products = []
    used_slugs = set()
    used_ids = set()

    for c in selected:
        category = c["category"]
        sku = c["sku"]
        name = format_product_name(c["title"], category, sku)
        body = c["body"]
        specs = extract_specifications(body)
        highlights = extract_highlights(body, specs, category)
        box = extract_box_contents(body)
        warnings = extract_warnings(body)
        use_cases = use_cases_for(category, body)

        # short description
        if body:
            short = body
            # Cut at sentence
            m = re.search(r"^(.{40,180}?[.!?])(\s|$)", body)
            if m:
                short = m.group(1)
            else:
                short = body[:180].rsplit(" ", 1)[0] if len(body) > 180 else body
            short = clean_description(short)
        else:
            noun = CATEGORY_NOUN.get(category, "ürün")
            short = f"{name}, Powerdex {tr_lower(noun)} kategorisinde yer alan bir modeldir."

        description = body if body else short

        # slug
        if sku:
            base = slugify(f"{sku} {CATEGORY_NOUN.get(category, '')}")
        else:
            base = slugify(name)
        slug = base or f"urun-{c['wp_id']}"
        original_slug = slug
        i = 2
        while slug in used_slugs:
            slug = f"{original_slug}-{i}"
            i += 1
        used_slugs.add(slug)

        # id
        if sku:
            pid = slugify(sku)
        else:
            pid = f"legacy-{c['wp_id']}"
        original_id = pid
        j = 2
        while pid in used_ids:
            pid = f"{original_id}-{j}"
            j += 1
        used_ids.add(pid)

        image = f"/images/products/{slug}.jpg"
        featured = bool(sku and sku in FEATURED_SKUS and category in {"metal-el-fenerleri", "kafa-lambalari"})

        products.append(
            {
                "id": pid,
                "slug": slug,
                "sku": sku,
                "name": name,
                "category": category,
                "legacyCategory": LEGACY_LABEL.get(c["legacy_primary"], c["legacy_primary"]),
                "image": image,
                "gallery": [image],
                "shortDescription": short,
                "description": description,
                "highlights": [re.sub(r"^[-—–\s]+", "", h) for h in highlights],
                "specifications": specs,
                "useCases": use_cases,
                "boxContents": box,
                "warnings": warnings,
                "priority": priority_for(category),
                "featured": featured,
                "sourceUrl": c["source_url"],
                "source": "legacy-website",
                "verificationStatus": "legacy-import",
            }
        )

    # Sort: priority then category then name
    priority_order = {"primary": 0, "secondary": 1, "other": 2}
    products.sort(
        key=lambda p: (
            priority_order[p["priority"]],
            CATEGORY_PRIORITY.get(p["category"], 99),
            p["name"],
        )
    )

    # Write products.ts
    lines = [
        'import type { Product } from "@/types/product";',
        "",
        'export type { Product, ProductCategory, ProductPriority } from "@/types/product";',
        "",
        "export const products: Product[] = [",
    ]
    for p in products:
        lines.append("  {")
        lines.append(f"    id: {ts_string(p['id'])},")
        lines.append(f"    slug: {ts_string(p['slug'])},")
        lines.append(f"    sku: {ts_string(p['sku'])},")
        lines.append(f"    name: {ts_string(p['name'])},")
        lines.append(f"    category: {ts_string(p['category'])},")
        if p.get("legacyCategory"):
            lines.append(f"    legacyCategory: {ts_string(p['legacyCategory'])},")
        lines.append(f"    image: {ts_string(p['image'])},")
        lines.append(f"    gallery: {ts_string_list(p['gallery'])},")
        lines.append(f"    shortDescription: {ts_string(p['shortDescription'])},")
        lines.append(f"    description: {ts_string(p['description'])},")
        lines.append(f"    highlights: {ts_string_list(p['highlights'])},")
        lines.append(f"    specifications: {ts_record(p['specifications'])},")
        lines.append(f"    useCases: {ts_string_list(p['useCases'])},")
        lines.append(f"    boxContents: {ts_string_list(p['boxContents'])},")
        lines.append(f"    warnings: {ts_string_list(p['warnings'])},")
        lines.append(f"    priority: {ts_string(p['priority'])},")
        lines.append(f"    featured: {'true' if p['featured'] else 'false'},")
        if p.get("sourceUrl"):
            lines.append(f"    sourceUrl: {ts_string(p['sourceUrl'])},")
        lines.append('    source: "legacy-website",')
        lines.append('    verificationStatus: "legacy-import",')
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append(
        """export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((product) => product.category === category);
}

export function getHomepageProducts(): Product[] {
  const featured = products.filter((product) => product.featured);
  if (featured.length >= 6) {
    return featured.slice(0, 9);
  }

  const primary = products.filter(
    (product) =>
      product.category === "metal-el-fenerleri" || product.category === "kafa-lambalari",
  );
  const camp = products.filter((product) => product.category === "kamp-lambalari").slice(0, 3);
  const selected = [...featured];
  for (const product of [...primary, ...camp]) {
    if (!selected.some((item) => item.id === product.id)) {
      selected.push(product);
    }
    if (selected.length >= 9) break;
  }
  return selected.slice(0, 9);
}

export function getSimilarProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, limit);
}

export const comparisonRows = getHomepageProducts()
  .filter((product) => Object.keys(product.specifications).length > 0)
  .slice(0, 6)
  .map((product) => ({
    model: product.name,
    lumen: product.specifications["Işık Gücü"] || "—",
    runtime: product.specifications["Çalışma Süresi"] || "—",
    chargingType: product.specifications["Şarj Tipi"] || "—",
    usage: product.useCases[0] || "—",
    weight: product.specifications["Ağırlık"] || "—",
    standout: product.highlights[0] || product.shortDescription.slice(0, 48),
  }));
"""
    )

    (ROOT / "data" / "products.ts").write_text("\n".join(lines) + "\n", encoding="utf-8")

    # Report
    by_cat = Counter(p["category"] for p in products)
    no_sku = [p["name"] for p in products if not p["sku"]]
    no_desc = [
        p["name"]
        for p in products
        if "kategorisinde yer alan bir modeldir" in p["shortDescription"]
    ]
    placeholder_images = [p["name"] for p in products]  # all local placeholders for now

    report = {
        "totalProducts": len(products),
        "rawFetched": len(products_raw),
        "duplicatesEliminated": len(duplicates_eliminated),
        "duplicateDetails": duplicates_eliminated,
        "byCategory": dict(sorted(by_cat.items(), key=lambda x: -x[1])),
        "withoutSku": no_sku,
        "withoutDescription": no_desc,
        "placeholderImages": len(placeholder_images),
        "featuredCount": sum(1 for p in products if p["featured"]),
        "source": "https://powerdex.com.tr/",
        "verificationStatus": "legacy-import",
    }
    (ROOT / "data" / "import-report.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print("=== LEGACY IMPORT REPORT ===")
    print(f"Total products: {report['totalProducts']}")
    print(f"Raw fetched: {report['rawFetched']}")
    print(f"Duplicates eliminated: {report['duplicatesEliminated']}")
    print("By category:")
    for k, v in report["byCategory"].items():
        print(f"  {k}: {v}")
    print(f"Without SKU: {len(no_sku)}")
    for n in no_sku:
        print(f"  - {n}")
    print(f"Without description: {len(no_desc)}")
    print(f"Placeholder images: {report['placeholderImages']}")
    print(f"Featured: {report['featuredCount']}")


if __name__ == "__main__":
    main()
