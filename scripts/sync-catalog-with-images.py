#!/usr/bin/env python3
"""Sync local product images to legacy catalog products. Regenerates data/products.ts + reports."""

from __future__ import annotations

import html
import json
import re
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = Path(__file__).resolve().parent / "legacy-raw"
IMG_DIR = ROOT / "public" / "images" / "products"
EXT = {".jpg", ".jpeg", ".png", ".webp", ".avif"}

LEGACY_TO_CATEGORY = {
    "el-fenerleri": "metal-el-fenerleri",
    "kafa-lambasi": "kafa-lambalari",
    "kamp-lambasi": "kamp-lambalari",
    "gunes-paneli-solar": "solar-aydinlatma",
    "powerdex-orjinal-pil": "piller-sarj",
    "masa-lambasi": "masa-lambalari",
    "tiras-makineleri": "tiras-makineleri",
    "makaslar": "berber-makaslari",
    "genel": "fon-makineleri",
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
    "PD-2572",
    "PD-1672",
}

DESCRIPTOR_TOKENS = {
    "battery",
    "marketing",
    "kit",
    "adapter",
    "scissors",
    "hair",
    "dryer",
    "clipper",
    "projektor",
    "projector",
    "mini",
    "pro",
    "plus",
    "set",
    "barbers",
    "range",
    "render",
    "blue",
}

TR_LOWER = str.maketrans({"I": "ı", "İ": "i", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç"})
TR_UPPER = str.maketrans({"i": "İ", "ı": "I", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç"})

SMALL_WORDS = {"ve", "ile", "veya", "icin", "için", "de", "da", "bir", "of", "the"}

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

PLACEHOLDERS = {
    "metal-el-fenerleri": "/images/placeholders/flashlight.jpg",
    "kafa-lambalari": "/images/placeholders/headlamp.jpg",
    "kamp-lambalari": "/images/placeholders/camping-lantern.jpg",
    "solar-aydinlatma": "/images/placeholders/solar-lantern.jpg",
    "piller-sarj": "/images/placeholders/battery.jpg",
    "masa-lambalari": "/images/placeholders/desk-lamp.jpg",
    "tiras-makineleri": "/images/placeholders/shaver.jpg",
    "berber-makaslari": "/images/placeholders/scissors.jpg",
    "fon-makineleri": "/images/placeholders/hair-dryer.jpg",
    "sac-duzlestiriciler": "/images/placeholders/straightener.jpg",
    "hesap-makineleri": "/images/placeholders/calculator.jpg",
    "jet-fan": "/images/placeholders/jet-fan.jpg",
    "diger": "/images/placeholders/flashlight.jpg",
}


def tr_lower(s: str) -> str:
    return s.translate(TR_LOWER).lower()


def title_case_tr(word: str) -> str:
    if not word:
        return word
    if re.fullmatch(
        r"(?i)pd-?\d+[a-z0-9-]*|vt-?\d+[a-z0-9-]*|kg-?\d+|pg-?\d+|vtc\d+|18650l?|26650|14500|16340|18500|ipx\d+|usb|type-?c|cob|led|smd|lcd|w|mah",
        word,
    ):
        if re.match(r"(?i)^pd", word):
            m = re.match(r"(?i)^pd-?(.+)$", word)
            return f"PD-{m.group(1).upper()}" if m else word.upper()
        if re.match(r"(?i)^vt", word):
            m = re.match(r"(?i)^vt-?(.+)$", word)
            return f"VT-{m.group(1).upper()}" if m else word.upper()
        if re.match(r"(?i)^kg", word):
            m = re.match(r"(?i)^kg-?(\d+)$", word)
            return f"KG-{m.group(1)}" if m else word.upper()
        if re.match(r"(?i)^pg", word):
            m = re.match(r"(?i)^pg-?(\d+)$", word)
            return f"PG-{m.group(1)}" if m else word.upper()
        return word.upper()
    if word.lower() in {"powerdex", "vult", "king", "powergold", "ultrufife"}:
        return "Powerdex" if word.lower() == "powerdex" else word.capitalize()
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
    first = first.translate(TR_UPPER) if first in "iışğüöç" else first.upper()
    return first + lower[1:]


def extract_sku(title: str) -> str:
    text = html.unescape(title)
    for pat in [
        r"\b(PD[-\s]?\d{1,5}(?:[A-Z]{0,6})?(?:-?PRO|-?PLUS|-?MINI)?)\b",
        r"\b(VT[-\s]?\d{3,5}(?:-?PRO)?)\b",
        r"\b(KG[-\s]?\d{3,5})\b",
        r"\b(PG[-\s]?\d{3,5})\b",
    ]:
        m = re.search(pat, text, re.I)
        if m:
            raw = m.group(1).upper().replace(" ", "")
            raw = re.sub(r"^(PD|VT|KG|PG)(\d)", r"\1-\2", raw)
            return raw
    return ""


def slugify(text: str) -> str:
    table = str.maketrans(
        {"ş": "s", "Ş": "s", "ı": "i", "İ": "i", "ğ": "g", "Ğ": "g", "ü": "u", "Ü": "u", "ö": "o", "Ö": "o", "ç": "c", "Ç": "c"}
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
    return re.sub(r"\s+", " ", text).strip()


def clean_description(text: str) -> str:
    if not text:
        return ""
    for c in [
        r"(?i)hemen satın al",
        r"(?i)ücretsiz kargo",
        r"(?i)stokta var",
        r"(?i)quick view",
        r"(?i)karşılaştır",
    ]:
        text = re.sub(c, " ", text)
    if text.count("|") >= 2:
        parts = [p.strip(" -–—") for p in text.split("|")]
        parts = [p for p in parts if p and tr_lower(p) not in {"powerdex"}]
        text = ". ".join(parts)
    text = re.sub(r"\s+", " ", text).strip(" -–—|")
    text = re.sub(r"!{2,}", ".", text)
    text = re.sub(r"\.{2,}", ".", text)

    def soften(m: re.Match) -> str:
        chunk = m.group(0)
        if len(chunk) < 12:
            return chunk
        return " ".join(title_case_tr(w) for w in chunk.split())

    text = re.sub(r"\b[A-ZÇĞİÖŞÜ0-9][A-ZÇĞİÖŞÜ0-9\s,./+\-]{11,}\b", soften, text)
    text = re.sub(r"(?i)\bşarjl\b", "şarjlı", text)
    return text.strip()


def extract_specifications(text: str) -> dict[str, str]:
    specs: dict[str, str] = {}
    if not text:
        return specs
    patterns = [
        ("Işık Gücü", r"(\d+(?:[.,]\d+)?\s*(?:lümen|lumen|lm)\b)"),
        ("Güç", r"(\d+(?:[.,]\d+)?\s*W(?:att)?\b)"),
        ("Batarya", r"((?:\d+(?:[.,]\d+)?\s*V\s*)?\d+(?:[.,]\d+)?\s*mAh\b)"),
        ("Çalışma Süresi", r"(\d+(?:[.,]\d+)?\s*saat(?:\s*kesintisiz)?(?:\s*çalış(?:ır|ma)?)?)"),
        ("Şarj Tipi", r"((?:USB[\s\-]?Type[\s\-]?C|Type[\s\-]?C|USB[\s\-]?[Cc]|Micro[\s\-]?USB|USB[\s\-]?Micro))"),
        ("Koruma", r"\b(IPX?\d)\b"),
        ("Ağırlık", r"(\d+(?:[.,]\d+)?\s*gr(?:am)?\b)"),
        ("Voltaj", r"(\d+(?:[.,]\d+)?\s*V\b)"),
        ("Pil Tipi", r"\b(18650L?|26650|Li[\s\-]?ion|Lion)\b"),
    ]
    for key, pat in patterns:
        m = re.search(pat, text, re.I)
        if not m:
            continue
        val = re.sub(r"\s+", " ", m.group(1).strip())
        val = re.sub(r"(?i)\blumen\b", "lümen", val)
        val = re.sub(r"(?i)type[\s\-]?c", "Type-C", val)
        val = re.sub(r"(?i)usb[\s\-]?type[\s\-]?c", "USB Type-C", val)
        val = re.sub(r"(?i)micro[\s\-]?usb|usb[\s\-]?micro", "Micro USB", val)
        val = re.sub(r"(?i)\bgr(am)?\b", "gr", val)
        if key == "Çalışma Süresi":
            mm = re.search(r"(\d+(?:[.,]\d+)?\s*saat)", val, re.I)
            if mm:
                val = mm.group(1)
        specs.setdefault(key, val)
    return specs


def extract_highlights(text: str, specs: dict[str, str], category: str) -> list[str]:
    highlights: list[str] = []
    for key in ["Işık Gücü", "Batarya", "Çalışma Süresi", "Şarj Tipi", "Koruma", "Güç", "Ağırlık"]:
        if key in specs:
            highlights.append(f"{key}: {specs[key]}")
    if len(highlights) >= 3:
        return highlights[:4]
    for c in re.split(r"[.|•\n]", text):
        c = clean_description(c)
        if 12 <= len(c) <= 80 and not c.lower().startswith("paket"):
            highlights.append(c)
        if len(highlights) >= 4:
            break
    if not highlights:
        highlights = [CATEGORY_NOUN.get(category, "Ürün"), "Powerdex kalitesi"]
    return [re.sub(r"^[-—–\s]+", "", h) for h in highlights[:4]]


def extract_box_contents(text: str) -> list[str]:
    m = re.search(r"(?i)paket\s*i[çc]eri[ğg]i\s*:?\s*(.+)$", text)
    if not m:
        return []
    items = []
    for p in re.split(r"[,;]| ve ", m.group(1)):
        p = clean_description(p)
        if 3 <= len(p) <= 80:
            items.append(p)
    return items[:8]


def extract_warnings(text: str) -> list[str]:
    warnings = []
    for m in re.finditer(r"(?i)(kullanılmadığı zaman[^.]+\.|doğrudan göze[^.]+\.|çocuklardan[^.]+\.)", text):
        w = clean_description(m.group(1))
        if w:
            warnings.append(w)
    return warnings[:4]


def use_cases_for(category: str) -> list[str]:
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
    for pref in MULTI_CAT_PREFERENCE:
        if pref in mapped:
            return pref, legacy_slugs[mapped.index(pref)]
    return mapped[0], legacy_slugs[0]


def priority_for(category: str) -> str:
    if category in {"metal-el-fenerleri", "kafa-lambalari"}:
        return "primary"
    if category in {"kamp-lambalari", "solar-aydinlatma", "piller-sarj"}:
        return "secondary"
    return "other"


def format_product_name(raw: str, category: str, sku: str) -> str:
    text = re.sub(r"\s+", " ", html.unescape(raw).replace("|", " ")).strip()
    parts = []
    for tok in text.split(" "):
        low = tr_lower(tok)
        if low in SMALL_WORDS and parts:
            parts.append(low)
        else:
            parts.append(title_case_tr(tok))
    name = " ".join(parts)
    brand_match = re.match(r"(?i)^(vult|king|powergold|ultrufife)\b", html.unescape(raw).strip())
    if brand_match:
        brand = brand_match.group(1).capitalize()
        if brand.lower() == "vult":
            brand = "Vult"
        rest = re.sub(r"(?i)^" + brand_match.group(1), "", html.unescape(raw)).strip(" -–—")
        rest = " ".join(title_case_tr(w) for w in rest.split() if w)
        name = f"{brand} {rest}".strip()
        if sku and sku not in name:
            name = re.sub(r"\s+", " ", f"{brand} {sku} {rest}").strip()
        return name
    if sku:
        cleaned = re.sub(r"(?i)\bpowerdex\b", "", name)
        cleaned = re.sub(re.escape(sku), "", cleaned, flags=re.I)
        cleaned = re.sub(r"\s{2,}", " ", cleaned).strip(" -–—")
        noun = CATEGORY_NOUN.get(category, "")
        rest = cleaned
        if noun and tr_lower(noun) not in tr_lower(rest):
            if not rest or len(rest) < 3:
                rest = noun
            elif not any(
                k in tr_lower(rest)
                for k in ["fener", "lamba", "makine", "makas", "pil", "panel", "fan", "pointer", "düzleştir", "duzlestir"]
            ):
                rest = f"{rest} {noun}".strip()
        name = f"Powerdex {sku}" + (f" {rest}" if rest else "")
        name = re.sub(r"\s+", " ", name).strip()
    return name


def normalize_sku_token(token: str) -> str:
    raw = token.upper().replace("_", "-").replace(" ", "")
    raw = re.sub(r"^(PD|VT|KG|PG)(\d)", r"\1-\2", raw)
    return raw


def base_sku(sku: str) -> str:
    m = re.match(r"^((?:PD|VT|KG|PG)-\d+)", sku.upper())
    return m.group(1) if m else sku.upper()


def parse_image_file(path: Path) -> dict | None:
    """Return {path, public, sku_candidates, gallery_index, sort_key} or None if not an image."""
    if path.suffix.lower() not in EXT:
        return None
    stem = path.stem.lower().replace("_", "-")
    gallery_index = None

    # Gallery numeric suffix: pd-808-2 → index 2 (only when preceding looks like sku)
    m = re.match(r"^(.+)-(\d+)$", stem)
    if m:
        left, num = m.group(1), int(m.group(2))
        if re.search(r"(?:^|-)(?:pd|vt|kg|pg)-?\d+", left):
            # Avoid treating mah capacities as gallery: pd-75-battery-7800mah already no trailing pure digits after mah
            stem = left
            gallery_index = num

    # Find primary brand-code sku in stem
    m2 = re.search(r"(?:^|-)((?:pd|vt|kg|pg)-?\d+[a-z0-9-]*)", stem, re.I)
    if not m2:
        return {
            "filename": path.name,
            "public": f"/images/products/{path.name}",
            "sku": "",
            "base": "",
            "candidates": [],
            "gallery_index": gallery_index,
            "stem": stem,
        }

    full = normalize_sku_token(m2.group(1))
    # Keep PRO/PLUS/MINI as part of SKU when attached
    # Strip trailing descriptor tokens for candidate generation
    parts = full.split("-")
    while len(parts) > 2 and parts[-1].lower() in DESCRIPTOR_TOKENS:
        # keep PRO/PLUS/MINI as SKU suffixes
        if parts[-1].upper() in {"PRO", "PLUS", "MINI"}:
            break
        parts.pop()
    # Also strip pure mah-like trailing if present in sku token (rare)
    sku_full = "-".join(parts)
    base = base_sku(sku_full)
    candidates = []
    for c in [sku_full, base, full]:
        c = normalize_sku_token(c)
        if c and c not in candidates:
            candidates.append(c)
    # PD-1672-PRO style
    if re.search(r"-PRO$|-PLUS$|-MINI$", full):
        candidates.insert(0, full)

    sort_key = (gallery_index is not None, gallery_index or 0, path.name.lower())
    return {
        "filename": path.name,
        "public": f"/images/products/{path.name}",
        "sku": sku_full,
        "base": base,
        "candidates": candidates,
        "gallery_index": gallery_index,
        "stem": stem,
        "sort_key": sort_key,
    }


def scan_images() -> list[dict]:
    items = []
    for p in sorted(IMG_DIR.iterdir(), key=lambda x: x.name.lower()):
        if not p.is_file():
            continue
        parsed = parse_image_file(p)
        if parsed:
            items.append(parsed)
    return items


def natural_gallery_sort(files: list[dict], preferred_sku: str = "") -> list[dict]:
    preferred = preferred_sku.lower().replace("_", "-") if preferred_sku else ""

    def key(item: dict):
        stem = Path(item["filename"]).stem.lower()
        # Prefer exact sku filename (pd-4380.jpg) over descriptor variants
        exact = 0 if preferred and stem == preferred else 1
        has_desc = 1 if any(
            tok in stem.split("-")
            for tok in [
                "marketing",
                "battery",
                "kit",
                "adapter",
                "scissors",
                "hair",
                "dryer",
                "clipper",
                "projektor",
                "projector",
                "barbers",
                "range",
                "render",
            ]
        ) else 0
        idx = item.get("gallery_index")
        return (exact, has_desc, idx is not None, idx if idx is not None else 0, item["filename"].lower())

    return sorted(files, key=key)


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def ts_string_list(values: list[str]) -> str:
    if not values:
        return "[]"
    return "[" + ", ".join(ts_string(v) for v in values) + "]"


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
    images = scan_images()

    # Build product candidates from legacy
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
    candidates.sort(key=lambda x: (-x["score"], x["wp_id"]))

    selected = []
    seen = set()
    duplicates_eliminated = []
    for c in candidates:
        keys = []
        if c["sku"]:
            keys.append(("sku-cat", c["sku"], c["category"]))
        keys.append(("slug", c["raw_slug"]))
        keys.append(("title-cat", tr_lower(c["title"]), c["category"]))
        if any(k in seen for k in keys):
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
            seen.add(k)
        selected.append(c)

    # Index images by candidate SKUs
    images_by_candidate: dict[str, list[dict]] = defaultdict(list)
    images_no_sku = []
    for img in images:
        if not img.get("candidates"):
            images_no_sku.append(img)
            continue
        for cand in img["candidates"]:
            images_by_candidate[cand].append(img)

    used_image_files: set[str] = set()
    products = []
    used_slugs: set[str] = set()
    used_ids: set[str] = set()
    products_without_images = []
    matched_count = 0

    for c in selected:
        category = c["category"]
        sku = c["sku"]
        name = format_product_name(c["title"], category, sku)
        body = c["body"]
        specs = extract_specifications(body)
        highlights = extract_highlights(body, specs, category)
        box = extract_box_contents(body)
        warnings = extract_warnings(body)
        use_cases = use_cases_for(category)

        if body:
            m = re.search(r"^(.{40,180}?[.!?])(\s|$)", body)
            short = clean_description(m.group(1) if m else (body[:180].rsplit(" ", 1)[0] if len(body) > 180 else body))
        else:
            noun = CATEGORY_NOUN.get(category, "ürün")
            short = f"{name}, Powerdex {tr_lower(noun)} kategorisinde yer alan bir modeldir."
        description = body if body else short

        # Match images
        matched_files: list[dict] = []
        match_keys = []
        if sku:
            match_keys.append(sku)
            match_keys.append(base_sku(sku))
            # also try SKU-PRO variants present in filenames
            for suffix in ("-PRO", "-PLUS", "-MINI"):
                match_keys.append(base_sku(sku) + suffix)
        for key in match_keys:
            for img in images_by_candidate.get(key, []):
                if img["filename"] not in {x["filename"] for x in matched_files}:
                    matched_files.append(img)

        matched_files = natural_gallery_sort(matched_files, preferred_sku=sku or "")
        # Prefer unnumbered file as main; already sorted
        gallery_paths = []
        for img in matched_files:
            if img["filename"] in used_image_files:
                continue
            # Allow same file only once globally when assigned to a product
            used_image_files.add(img["filename"])
            gallery_paths.append(img["public"])

        if gallery_paths:
            image = gallery_paths[0]
            verification = "legacy-import"
            matched_count += 1
        else:
            image = PLACEHOLDERS.get(category, PLACEHOLDERS["diger"])
            # only use placeholder path if file exists
            ph_abs = ROOT / "public" / image.lstrip("/")
            if not ph_abs.exists():
                image = PLACEHOLDERS["diger"]
            gallery_paths = [image]
            verification = "image-missing"
            products_without_images.append(
                {
                    "sku": sku,
                    "name": name,
                    "category": category,
                    "sourceUrl": c["source_url"],
                }
            )

        # slug
        if sku:
            base = slugify(f"{sku} {CATEGORY_NOUN.get(category, '')}")
        else:
            base = slugify(name)
        slug = base or f"urun-{c['wp_id']}"
        original = slug
        i = 2
        while slug in used_slugs:
            slug = f"{original}-{i}"
            i += 1
        used_slugs.add(slug)

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

        featured = bool(sku and sku in FEATURED_SKUS and category in {"metal-el-fenerleri", "kafa-lambalari"})
        # also feature base match
        if not featured and sku and base_sku(sku) in FEATURED_SKUS and category in {"metal-el-fenerleri", "kafa-lambalari"}:
            featured = True

        if verification == "legacy-import" and (not body or "kategorisinde yer alan bir modeldir" in short):
            # has image but thin copy
            verification = "data-incomplete" if gallery_paths and gallery_paths[0].startswith("/images/products/") else verification

        products.append(
            {
                "id": pid,
                "slug": slug,
                "sku": sku,
                "name": name,
                "category": category,
                "legacyCategory": LEGACY_LABEL.get(c["legacy_primary"], c["legacy_primary"]),
                "image": image,
                "gallery": gallery_paths,
                "shortDescription": short,
                "description": description,
                "highlights": highlights,
                "specifications": specs,
                "useCases": use_cases,
                "boxContents": box,
                "warnings": warnings,
                "priority": priority_for(category),
                "featured": featured,
                "sourceUrl": c["source_url"],
                "source": "legacy-website",
                "verificationStatus": verification,
            }
        )

    priority_order = {"primary": 0, "secondary": 1, "other": 2}
    products.sort(key=lambda p: (priority_order[p["priority"]], CATEGORY_PRIORITY.get(p["category"], 99), p["name"]))

    # Unmatched images: files not assigned to any product
    unmatched = []
    # Group unused images by base/sku
    unused_groups: dict[str, list[str]] = defaultdict(list)
    for img in images:
        if img["filename"] in used_image_files:
            continue
        key = img.get("base") or img.get("sku") or img["stem"] or img["filename"]
        unused_groups[key].append(img["public"])

    for key, files in sorted(unused_groups.items(), key=lambda x: x[0]):
        sku_guess = key if re.match(r"^(PD|VT|KG|PG)-", key.upper()) else ""
        unmatched.append(
            {
                "sku": sku_guess or key.upper(),
                "files": sorted(files),
                "reason": "Eski sitede eşleşen ürün bulunamadı",
            }
        )

    # Write products.ts
    lines = [
        'import type { Product } from "@/types/product";',
        "",
        'export type { Product, ProductCategory, ProductPriority, VerificationStatus } from "@/types/product";',
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
        lines.append(f"    verificationStatus: {ts_string(p['verificationStatus'])},")
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

    by_cat = Counter(p["category"] for p in products)
    report = {
        "totalProducts": len(products),
        "totalImages": len(images),
        "matchedProducts": matched_count,
        "productsWithoutImages": len(products_without_images),
        "unmatchedImages": len(unmatched),
        "unmatchedImageFiles": sum(len(x["files"]) for x in unmatched),
        "duplicateProductsRemoved": len(duplicates_eliminated),
        "categoryCounts": dict(sorted(by_cat.items(), key=lambda x: -x[1])),
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "source": "https://powerdex.com.tr/",
    }
    (ROOT / "data" / "product-import-report.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (ROOT / "data" / "unmatched-product-images.json").write_text(
        json.dumps(unmatched, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (ROOT / "data" / "products-without-images.json").write_text(
        json.dumps(products_without_images, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print("=== PRODUCT IMAGE SYNC REPORT ===")
    print(f"Toplam ürün: {report['totalProducts']}")
    print(f"Toplam görsel: {report['totalImages']}")
    print(f"Eşleşen ürün (gerçek görsel): {report['matchedProducts']}")
    print(f"Görselsiz ürün: {report['productsWithoutImages']}")
    print(f"Eşleşmeyen görsel grubu: {report['unmatchedImages']} ({report['unmatchedImageFiles']} dosya)")
    print(f"Duplicate elenen: {report['duplicateProductsRemoved']}")
    print("Kategori başına:")
    for k, v in report["categoryCounts"].items():
        print(f"  {k}: {v}")


if __name__ == "__main__":
    main()
