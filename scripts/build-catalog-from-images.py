#!/usr/bin/env python3
"""Build full product catalog from local images (primary) + legacy site (reference)."""

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

# Hero / kategori banner tasarım görselleri — ürün kataloğuna dahil edilmez
DESIGN_ASSET_STEMS = {
    "metalelfeneri",
    "kafalambasi",
    "powerdex-flashlight-range",
}

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
    "PD-13500",
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

# Known Powerdex SKU ranges / patterns for category inference
HEADLAMP_SKUS = {
    "PD-1072", "PD-1172", "PD-1272", "PD-1372", "PD-1472", "PD-1572", "PD-1672",
    "PD-1772", "PD-1872", "PD-1972", "PD-2072", "PD-2172", "PD-2472", "PD-2572",
    "PD-3072", "PD-3272", "PD-3372", "PD-4472", "PD-4872", "PD-5572", "PD-6572",
    "PD-6672", "PD-7272", "PD-9972", "PD-501", "PD-572", "PD-672", "PD-772",
}
KAMP_SKUS = {
    "PD-808", "PD-530", "PD-630", "PD-730", "PD-830", "PD-1515", "PD-2525",
    "PD-3535", "PD-5555", "PD-5050", "PD-6060", "PD-7070", "PD-7575", "PD-8585",
    "PD-6565", "PG-1993",
}
SOLAR_SKUS = {"PD-6005"}
JET_SKUS = {"PD-4380"}
CALC_SKUS = {"PD-312", "PD-412", "PD-512", "PD-612"}
MASA_SKUS = {"PD-212", "PD-222", "PD-232"}
SAC_SKUS = {"PD-2550", "PD-2610", "PD-5059"}
FON_SKUS = {"PD-4800"}
SCISSOR_SKUS = {"PD-06", "PD-07", "PD-08", "PD-09", "PD-10", "PD-18", "PD-99"}

TR_LOWER = str.maketrans({"I": "ı", "İ": "i", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç"})
TR_UPPER = str.maketrans({"i": "İ", "ı": "I", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç"})
SMALL_WORDS = {"ve", "ile", "veya", "icin", "için", "de", "da", "bir", "of", "the"}

DEFAULT_DESC = "Detaylı teknik bilgiler yakında eklenecektir."


def tr_lower(s: str) -> str:
    return s.translate(TR_LOWER).lower()


def title_case_tr(word: str) -> str:
    if not word:
        return word
    if re.fullmatch(r"(?i)pd-?\d+[a-z0-9-]*|vt-?\d+[a-z0-9-]*|kg-?\d+|pg-?\d+|18650l?|26650|14500|16340|18500|usb|lcd|led|cob|smd|type-?c|ipx\d+|mah|w", word):
        if re.match(r"(?i)^pd", word):
            m = re.match(r"(?i)^pd-?(.+)$", word)
            return f"PD-{m.group(1).upper()}" if m else word.upper()
        if re.match(r"(?i)^vt", word):
            m = re.match(r"(?i)^vt-?(.+)$", word)
            return f"VT-{m.group(1).upper()}" if m else word.upper()
        if re.match(r"(?i)^kg", word):
            m = re.match(r"(?i)^kg-?(.+)$", word)
            return f"KG-{m.group(1).upper()}" if m else word.upper()
        if re.match(r"(?i)^pg", word):
            m = re.match(r"(?i)^pg-?(.+)$", word)
            return f"PG-{m.group(1).upper()}" if m else word.upper()
        return word.upper()
    if word.lower() in {"powerdex", "vult", "king", "powergold", "ultrufife"}:
        return {"powerdex": "Powerdex", "vult": "Vult", "king": "King", "powergold": "Powergold", "ultrufife": "Ultrufife"}[word.lower()]
    if re.fullmatch(r"\d+w", word, re.I):
        return word.upper()
    if re.fullmatch(r"\d+mah", word, re.I):
        return re.sub(r"(?i)mah", "mAh", word)
    if re.fullmatch(r"(?i)li-?ions?", word):
        return "Li-ion"
    lower = tr_lower(word)
    first = lower[0]
    first = first.translate(TR_UPPER) if first in "iışğüöç" else first.upper()
    return first + lower[1:]


def slugify(text: str) -> str:
    table = str.maketrans({"ş": "s", "Ş": "s", "ı": "i", "İ": "i", "ğ": "g", "Ğ": "g", "ü": "u", "Ü": "u", "ö": "o", "Ö": "o", "ç": "c", "Ç": "c"})
    s = html.unescape(text).translate(table).lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def normalize_sku(token: str) -> str:
    raw = token.upper().replace("_", "-").replace(" ", "")
    return re.sub(r"^(PD|VT|KG|PG)(\d)", r"\1-\2", raw)


def base_sku(sku: str) -> str:
    m = re.match(r"^((?:PD|VT|KG|PG)-\d+)", sku.upper())
    return m.group(1) if m else sku.upper()


def extract_sku_from_title(title: str) -> str:
    text = html.unescape(title)
    for pat in [
        r"\b(PD[-\s]?\d{1,5}(?:[A-Z]{0,6})?(?:-?PRO|-?PLUS|-?MINI)?)\b",
        r"\b(VT[-\s]?\d{3,5}(?:-?PRO)?)\b",
        r"\b(KG[-\s]?\d{3,5})\b",
        r"\b(PG[-\s]?\d{3,5})\b",
    ]:
        m = re.search(pat, text, re.I)
        if m:
            return normalize_sku(m.group(1))
    return ""


def strip_html(raw: str) -> str:
    text = re.sub(r"<script[\s\S]*?</script>|<style[\s\S]*?</style>", " ", raw, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text)
    text = re.sub(r"https?://\S+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def clean_description(text: str) -> str:
    if not text:
        return ""
    for c in [r"(?i)hemen satın al", r"(?i)ücretsiz kargo", r"(?i)quick view", r"(?i)karşılaştır"]:
        text = re.sub(c, " ", text)
    if text.count("|") >= 2:
        parts = [p.strip(" -–—") for p in text.split("|") if p.strip() and tr_lower(p) != "powerdex"]
        text = ". ".join(parts)
    text = re.sub(r"\s+", " ", text).strip(" -–—|")
    text = re.sub(r"(?i)\bşarjl\b", "şarjlı", text)

    def soften(m: re.Match) -> str:
        chunk = m.group(0)
        if len(chunk) < 12:
            return chunk
        return " ".join(title_case_tr(w) for w in chunk.split())

    text = re.sub(r"\b[A-ZÇĞİÖŞÜ0-9][A-ZÇĞİÖŞÜ0-9\s,./+\-]{11,}\b", soften, text)
    return text.strip()


def extract_specifications(text: str) -> dict[str, str]:
    specs: dict[str, str] = {}
    if not text:
        return specs
    patterns = [
        ("Işık Gücü", r"(\d+(?:[.,]\d+)?\s*(?:lümen|lumen|lm)\b)"),
        ("Güç", r"(\d+(?:[.,]\d+)?\s*W(?:att)?\b)"),
        ("Batarya", r"((?:\d+(?:[.,]\d+)?\s*V\s*)?\d+(?:[.,]\d+)?\s*mAh\b)"),
        ("Çalışma Süresi", r"(\d+(?:[.,]\d+)?\s*saat)"),
        ("Şarj Tipi", r"((?:USB[\s\-]?Type[\s\-]?C|Type[\s\-]?C|USB[\s\-]?[Cc]|Micro[\s\-]?USB))"),
        ("Koruma", r"\b(IPX?\d)\b"),
        ("Ağırlık", r"(\d+(?:[.,]\d+)?\s*gr(?:am)?\b)"),
        ("Voltaj", r"(\d+(?:[.,]\d+)?\s*V\b)"),
        ("Pil Tipi", r"\b(18650L?|26650|14500|16340|18500|Li[\s\-]?ion)\b"),
    ]
    for key, pat in patterns:
        m = re.search(pat, text, re.I)
        if not m:
            continue
        val = re.sub(r"\s+", " ", m.group(1).strip())
        val = re.sub(r"(?i)\blumen\b", "lümen", val)
        val = re.sub(r"(?i)usb[\s\-]?type[\s\-]?c|type[\s\-]?c", "Type-C", val)
        val = re.sub(r"(?i)\bgr(am)?\b", "gr", val)
        if key == "Çalışma Süresi":
            mm = re.search(r"(\d+(?:[.,]\d+)?\s*saat)", val, re.I)
            if mm:
                val = mm.group(1)
        specs.setdefault(key, val)
    return specs


def extract_highlights(text: str, specs: dict[str, str], category: str) -> list[str]:
    highlights = []
    for key in ["Işık Gücü", "Batarya", "Çalışma Süresi", "Şarj Tipi", "Koruma", "Güç", "Ağırlık", "Pil Tipi"]:
        if key in specs:
            highlights.append(f"{key}: {specs[key]}")
    if len(highlights) >= 3:
        return highlights[:4]
    for c in re.split(r"[.|•\n]", text or ""):
        c = clean_description(c)
        if 12 <= len(c) <= 80:
            highlights.append(c)
        if len(highlights) >= 4:
            break
    if not highlights:
        highlights = [CATEGORY_NOUN.get(category, "Ürün"), "Powerdex kalitesi"]
    return [re.sub(r"^[-—–\s]+", "", h) for h in highlights[:4]]


def use_cases_for(category: str) -> list[str]:
    return {
        "metal-el-fenerleri": ["Araç / tamir", "Güvenlik", "Outdoor"],
        "kafa-lambalari": ["Teknik servis", "Outdoor", "Eller serbest kullanım"],
        "kamp-lambalari": ["Kamp", "Açık alan", "Acil durum"],
        "solar-aydinlatma": ["Solar sistem", "Outdoor"],
        "piller-sarj": ["Yedek enerji", "Uyumlu cihaz şarjı"],
        "masa-lambalari": ["Masaüstü aydınlatma", "Ofis / ev"],
        "tiras-makineleri": ["Kişisel bakım", "Kuaför / berber"],
        "berber-makaslari": ["Berber / kuaför"],
        "fon-makineleri": ["Saç şekillendirme"],
        "sac-duzlestiriciler": ["Saç şekillendirme"],
        "hesap-makineleri": ["Ofis", "Muhasebe"],
        "jet-fan": ["Havalandırma", "Saha kullanımı"],
        "diger": ["Genel kullanım"],
    }.get(category, ["Genel kullanım"])


def priority_for(category: str) -> str:
    if category in {"metal-el-fenerleri", "kafa-lambalari"}:
        return "primary"
    if category in {"kamp-lambalari", "solar-aydinlatma", "piller-sarj"}:
        return "secondary"
    return "other"


def pick_category(legacy_slugs: list[str]) -> tuple[str, str]:
    mapped = [LEGACY_TO_CATEGORY.get(s, "diger") for s in legacy_slugs]
    if not mapped:
        return "diger", ""
    for pref in MULTI_CAT_PREFERENCE:
        if pref in mapped:
            return pref, legacy_slugs[mapped.index(pref)]
    return mapped[0], legacy_slugs[0]


def infer_category(sku: str, stem: str, filenames: list[str]) -> str:
    joined = " ".join([stem] + filenames).lower()
    base = base_sku(sku) if sku else ""

    if any(x in joined for x in ["battery", "18650", "14500", "16340", "18500", "li-ion", "mah"]):
        return "piller-sarj"
    if any(x in joined for x in ["scissors", "makas"]):
        return "berber-makaslari"
    if any(x in joined for x in ["hair-dryer", "fon", "hairdryer"]):
        return "fon-makineleri"
    if any(x in joined for x in ["straightener", "duzlestir", "düzleştir"]):
        return "sac-duzlestiriciler"
    if any(x in joined for x in ["clipper", "shaver", "tiras", "traş", "barber"]):
        return "tiras-makineleri"
    if "jet" in joined or "fan" in joined:
        return "jet-fan"
    if "solar" in joined or "panel" in joined:
        return "solar-aydinlatma"
    if any(x in joined for x in ["kamp", "lantern", "camping"]):
        return "kamp-lambalari"
    if any(x in joined for x in ["kafa", "headlamp"]):
        return "kafa-lambalari"
    if any(x in joined for x in ["masa", "desk"]):
        return "masa-lambalari"
    if any(x in joined for x in ["hesap", "calculator"]):
        return "hesap-makineleri"
    if "vult" in joined or joined.startswith("vt-") or (sku or "").startswith("VT-"):
        return "tiras-makineleri"
    if (sku or "").startswith("KG-"):
        return "tiras-makineleri"

    if base in HEADLAMP_SKUS or (sku in HEADLAMP_SKUS):
        return "kafa-lambalari"
    if base in KAMP_SKUS:
        return "kamp-lambalari"
    if base in SOLAR_SKUS:
        return "solar-aydinlatma"
    if base in JET_SKUS:
        return "jet-fan"
    if base in CALC_SKUS:
        return "hesap-makineleri"
    if base in MASA_SKUS:
        return "masa-lambalari"
    if base in SAC_SKUS:
        return "sac-duzlestiriciler"
    if base in FON_SKUS:
        return "fon-makineleri"
    if base in SCISSOR_SKUS:
        return "berber-makaslari"

    # xx72 pattern often headlamp in Powerdex line
    if re.match(r"^PD-\d*72$", base):
        return "kafa-lambalari"

    if (sku or "").startswith("PD-") or "fener" in joined or "flashlight" in joined or "torch" in joined:
        return "metal-el-fenerleri"
    if "metalelfeneri" in joined:
        return "metal-el-fenerleri"
    if "kafalambasi" in joined:
        return "kafa-lambalari"
    return "diger"


def format_name_from_image(sku: str, category: str, stem: str) -> str:
    noun = CATEGORY_NOUN.get(category, "Ürün")
    if sku:
        brand = "Vult" if sku.startswith("VT-") else "King" if sku.startswith("KG-") else "Powergold" if sku.startswith("PG-") else "Powerdex"
        extra = ""
        low = stem.lower()
        if "pro" in low.split("-"):
            extra = " Pro"
        if "plus" in low.split("-"):
            extra = " Plus"
        if "mini" in low.split("-"):
            extra = " Mini"
        if "kit" in low.split("-"):
            extra = f"{extra} Kit".strip()
        # capacity for batteries
        m = re.search(r"(\d+)\s*mah", low)
        if category == "piller-sarj" and m:
            return f"{brand} {sku} {m.group(1)}mAh Pil"
        return f"{brand} {sku}{extra} {noun}".replace("  ", " ").strip()

    # Non-SKU named files
    tokens = [title_case_tr(t) for t in stem.replace("_", "-").split("-") if t]
    name = " ".join(tokens)
    if category == "piller-sarj" and not name.lower().startswith("powerdex"):
        name = f"Powerdex {name}"
    if "vult" in stem:
        return name
    if not name.lower().startswith("powerdex") and category != "tiras-makineleri":
        name = f"Powerdex {name}"
    return re.sub(r"\s+", " ", name).strip()


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
        brand_key = tr_lower(brand_match.group(1)).replace("i̇", "i")
        brand = {"vult": "Vult", "king": "King", "powergold": "Powergold", "ultrufife": "Ultrufife"}.get(
            brand_key, brand_match.group(1).capitalize()
        )
        rest = re.sub(r"(?i)^" + re.escape(brand_match.group(1)), "", html.unescape(raw)).strip(" -–—")
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
            elif not any(k in tr_lower(rest) for k in ["fener", "lamba", "makine", "makas", "pil", "panel", "fan", "pointer", "düzleştir", "duzlestir", "set"]):
                rest = f"{rest} {noun}".strip()
        name = f"Powerdex {sku}" + (f" {rest}" if rest else "")
        name = re.sub(r"\s+", " ", name).strip()
    return name


def parse_image(path: Path) -> dict:
    stem_raw = path.stem.lower().replace("_", "-")
    gallery_index = None
    stem = stem_raw

    m = re.match(r"^(.+)-(\d+)$", stem)
    if m and re.search(r"(?:pd|vt|kg|pg)-?\d+", m.group(1)):
        # Avoid treating ...-7800mah as gallery; only pure trailing digits after sku-ish left
        left = m.group(1)
        if not left.endswith("mah"):
            stem = left
            gallery_index = int(m.group(2))

    sku = ""
    m2 = re.search(r"(?:^|-)((?:pd|vt|kg|pg)-?\d+[a-z0-9-]*)", stem, re.I)
    if m2:
        sku = normalize_sku(m2.group(1))
        # trim non-SKU trailing descriptors except PRO/PLUS/MINI
        parts = sku.split("-")
        while len(parts) > 2 and parts[-1] not in {"PRO", "PLUS", "MINI"} and not parts[-1].isdigit():
            if parts[-1] in {"BATTERY", "MARKETING", "KIT", "ADAPTER", "SCISSORS", "HAIR", "DRYER", "CLIPPER", "PROJEKTOR", "PROJECTOR", "BARBERS", "SET", "BLUE", "RANGE", "RENDER"}:
                parts.pop()
            else:
                break
        sku = "-".join(parts)

    # Group key
    if sku:
        b = base_sku(sku)
        # Distinct battery capacity variants under same PD number
        if "battery" in stem and re.search(r"\d+mah", stem):
            group_key = f"{b}:{stem}"
        else:
            group_key = b
    else:
        # Family groups for named sets
        if stem.startswith("vult-pro-set"):
            group_key = "vult-pro-set"
        elif stem.startswith("battery-"):
            group_key = stem  # each battery size is its own product
        elif stem.startswith("vult-"):
            group_key = re.sub(r"-\d+$", "", stem)
        elif stem.startswith("powerdex-"):
            group_key = stem
        else:
            group_key = stem

    return {
        "filename": path.name,
        "public": f"/images/products/{path.name}",
        "stem": stem,
        "sku": sku,
        "base": base_sku(sku) if sku else "",
        "gallery_index": gallery_index,
        "group_key": group_key,
    }


def gallery_sort(files: list[dict], preferred_sku: str = "") -> list[dict]:
    preferred = preferred_sku.lower() if preferred_sku else ""

    def key(item: dict):
        stem = Path(item["filename"]).stem.lower()
        exact = 0 if preferred and stem == preferred.lower() else 1
        has_desc = 1 if any(
            tok in stem.split("-")
            for tok in ["marketing", "battery", "kit", "adapter", "scissors", "hair", "dryer", "clipper", "projektor", "barbers"]
        ) else 0
        idx = item.get("gallery_index")
        return (exact, has_desc, idx is not None, idx or 0, item["filename"].lower())

    return sorted(files, key=key)


def ts_string(v: str) -> str:
    return json.dumps(v, ensure_ascii=False)


def ts_list(values: list[str]) -> str:
    return "[" + ", ".join(ts_string(v) for v in values) + "]" if values else "[]"


def ts_record(record: dict[str, str]) -> str:
    if not record:
        return "{}"
    return "{\n" + ",\n".join(f"    {ts_string(k)}: {ts_string(v)}" for k, v in record.items()) + ",\n  }"


def load_legacy() -> dict[str, dict]:
    cats = {c["id"]: c for c in json.loads((RAW / "categories.json").read_text())}
    raw = json.loads((RAW / "products-page-1.json").read_text()) + json.loads((RAW / "products-page-2.json").read_text())
    by_sku: dict[str, dict] = {}
    duplicates = 0
    scored = []
    for p in raw:
        title = html.unescape(p["title"]["rendered"]).strip()
        legacy_slugs = [cats[cid]["slug"] for cid in p["product_cat"] if cid in cats]
        category, legacy_primary = pick_category(legacy_slugs)
        sku = extract_sku_from_title(title)
        body = clean_description(strip_html(p["content"]["rendered"])) or clean_description(strip_html(p["excerpt"]["rendered"]))
        scored.append((len(body), p["id"], {
            "title": title,
            "sku": sku,
            "category": category,
            "legacy_primary": legacy_primary,
            "body": body,
            "source_url": p.get("link") or f"https://powerdex.com.tr/?product={p['slug']}",
            "raw_slug": p["slug"],
        }))
    scored.sort(reverse=True)
    for _, _, item in scored:
        if not item["sku"]:
            continue
        key = item["sku"]
        base = base_sku(key)
        if key in by_sku or base in by_sku:
            duplicates += 1
            continue
        by_sku[key] = item
        by_sku[base] = item
    return {"by_sku": by_sku, "duplicates": duplicates, "raw_count": len(raw)}


def main() -> None:
    legacy = load_legacy()
    by_sku = legacy["by_sku"]

    images = []
    design_assets = []
    for p in sorted(IMG_DIR.iterdir(), key=lambda x: x.name.lower()):
        if p.is_file() and p.suffix.lower() in EXT:
            parsed = parse_image(p)
            if parsed["stem"] in DESIGN_ASSET_STEMS:
                design_assets.append(parsed)
                continue
            images.append(parsed)

    groups: dict[str, list[dict]] = defaultdict(list)
    for img in images:
        groups[img["group_key"]].append(img)

    products = []
    used_slugs: set[str] = set()
    used_ids: set[str] = set()
    used_files: set[str] = set()
    created_from_images = 0
    matched_legacy = 0
    image_only = 0

    for group_key, files in sorted(groups.items(), key=lambda x: x[0]):
        files = gallery_sort(files)
        filenames = [f["filename"] for f in files]
        stems = [f["stem"] for f in files]
        # Prefer a clear sku from group
        sku = ""
        for f in files:
            if f["sku"]:
                sku = base_sku(f["sku"]) if "battery" not in f["stem"] else f["sku"]
                # Keep PRO suffix if present on all/main
                if f["sku"].endswith(("-PRO", "-PLUS", "-MINI")):
                    sku = f["sku"]
                break
        if not sku and group_key.upper().startswith(("PD-", "VT-", "KG-", "PG-")):
            sku = group_key.split(":")[0].upper()

        legacy_item = None
        if sku:
            legacy_item = by_sku.get(sku) or by_sku.get(base_sku(sku))

        if legacy_item:
            category = legacy_item["category"]
            name = format_product_name(legacy_item["title"], category, sku or legacy_item["sku"])
            body = legacy_item["body"]
            source = "legacy-website"
            source_url = legacy_item["source_url"]
            legacy_category = LEGACY_LABEL.get(legacy_item["legacy_primary"], legacy_item["legacy_primary"])
            matched_legacy += 1
            if body:
                m = re.search(r"^(.{40,180}?[.!?])(\s|$)", body)
                short = clean_description(m.group(1) if m else body[:180])
                description = body
                specs = extract_specifications(body)
                highlights = extract_highlights(body, specs, category)
                verification = "legacy-import"
            else:
                short = DEFAULT_DESC
                description = DEFAULT_DESC
                specs = {}
                highlights = extract_highlights("", {}, category)
                verification = "data-incomplete"
        else:
            category = infer_category(sku, files[0]["stem"], filenames)
            name = format_name_from_image(sku, category, files[0]["stem"] if not sku else (sku.lower()))
            # Improve name from richest stem
            name = format_name_from_image(sku, category, max(stems, key=len))
            short = DEFAULT_DESC
            description = DEFAULT_DESC
            specs = extract_specifications(" ".join(stems))  # only if capacity etc. in filename
            # For batteries, put capacity into specs from filename when explicit
            m = re.search(r"(\d+)\s*mah", " ".join(stems), re.I)
            if m and category == "piller-sarj":
                specs.setdefault("Batarya", f"{m.group(1)} mAh")
            highlights = extract_highlights("", specs, category)
            source = "local-catalog"
            source_url = None
            legacy_category = None
            verification = "image-only"
            image_only += 1
            created_from_images += 1

        gallery = []
        for f in gallery_sort(files, preferred_sku=sku):
            if f["filename"] in used_files:
                continue
            used_files.add(f["filename"])
            gallery.append(f["public"])
        if not gallery:
            continue
        image = gallery[0]

        # ids/slugs
        if sku:
            pid = slugify(sku)
            slug_base = slugify(f"{sku} {CATEGORY_NOUN.get(category, '')}")
        else:
            pid = slugify(group_key)
            slug_base = slugify(name)
        slug = slug_base or pid
        original_slug, original_id = slug, pid
        i = 2
        while slug in used_slugs:
            slug = f"{original_slug}-{i}"
            i += 1
        used_slugs.add(slug)
        j = 2
        while pid in used_ids:
            pid = f"{original_id}-{j}"
            j += 1
        used_ids.add(pid)

        featured = bool(sku and (sku in FEATURED_SKUS or base_sku(sku) in FEATURED_SKUS) and category in {"metal-el-fenerleri", "kafa-lambalari"})

        products.append({
            "id": pid,
            "slug": slug,
            "sku": sku,
            "name": name,
            "category": category,
            "legacyCategory": legacy_category,
            "image": image,
            "gallery": gallery,
            "shortDescription": short,
            "description": description,
            "highlights": highlights,
            "specifications": specs,
            "useCases": use_cases_for(category),
            "boxContents": [],
            "warnings": [],
            "priority": priority_for(category),
            "featured": featured,
            "sourceUrl": source_url,
            "source": source,
            "verificationStatus": verification,
        })

    # Also keep legacy products that have NO local images (still useful catalog entries)
    legacy_only = 0
    covered_skus = {base_sku(p["sku"]) for p in products if p["sku"]} | {p["sku"] for p in products if p["sku"]}
    seen_legacy_titles = set()
    for key, item in legacy["by_sku"].items():
        # by_sku has both full and base pointing same object; dedupe by raw_slug
        if item["raw_slug"] in seen_legacy_titles:
            continue
        seen_legacy_titles.add(item["raw_slug"])
        sku = item["sku"]
        if sku and (sku in covered_skus or base_sku(sku) in covered_skus):
            continue
        category = item["category"]
        name = format_product_name(item["title"], category, sku)
        body = item["body"]
        if body:
            m = re.search(r"^(.{40,180}?[.!?])(\s|$)", body)
            short = clean_description(m.group(1) if m else body[:180])
            description = body
            specs = extract_specifications(body)
            highlights = extract_highlights(body, specs, category)
        else:
            short = DEFAULT_DESC
            description = DEFAULT_DESC
            specs = {}
            highlights = extract_highlights("", {}, category)
        image = PLACEHOLDERS.get(category, PLACEHOLDERS["diger"])
        pid = slugify(sku) if sku else f"legacy-{slugify(item['raw_slug'])}"
        slug = slugify(f"{sku} {CATEGORY_NOUN.get(category, '')}") if sku else slugify(name)
        original_slug, original_id = slug, pid
        i = 2
        while slug in used_slugs:
            slug = f"{original_slug}-{i}"
            i += 1
        used_slugs.add(slug)
        j = 2
        while pid in used_ids:
            pid = f"{original_id}-{j}"
            j += 1
        used_ids.add(pid)
        products.append({
            "id": pid,
            "slug": slug,
            "sku": sku,
            "name": name,
            "category": category,
            "legacyCategory": LEGACY_LABEL.get(item["legacy_primary"], item["legacy_primary"]),
            "image": image,
            "gallery": [image],
            "shortDescription": short,
            "description": description,
            "highlights": highlights,
            "specifications": specs,
            "useCases": use_cases_for(category),
            "boxContents": [],
            "warnings": [],
            "priority": priority_for(category),
            "featured": False,
            "sourceUrl": item["source_url"],
            "source": "legacy-website",
            "verificationStatus": "image-missing",
            })
        legacy_only += 1

    priority_order = {"primary": 0, "secondary": 1, "other": 2}
    products.sort(key=lambda p: (priority_order[p["priority"]], CATEGORY_PRIORITY.get(p["category"], 99), p["name"]))

    # Ensure 100% image usage
    unused = [img for img in images if img["filename"] not in used_files]
    if unused:
        # Force-create catch-all products for any leftover file
        for img in unused:
            category = infer_category(img["sku"], img["stem"], [img["filename"]])
            sku = img["sku"] and base_sku(img["sku"]) or ""
            name = format_name_from_image(sku, category, img["stem"])
            pid = slugify(sku or img["stem"])
            slug = slugify(f"{sku} {CATEGORY_NOUN.get(category, '')}" if sku else name)
            while slug in used_slugs:
                slug = f"{slug}-x"
            while pid in used_ids:
                pid = f"{pid}-x"
            used_slugs.add(slug)
            used_ids.add(pid)
            used_files.add(img["filename"])
            products.append({
                "id": pid,
                "slug": slug,
                "sku": sku,
                "name": name,
                "category": category,
                "image": img["public"],
                "gallery": [img["public"]],
                "shortDescription": DEFAULT_DESC,
                "description": DEFAULT_DESC,
                "highlights": extract_highlights("", {}, category),
                "specifications": {},
                "useCases": use_cases_for(category),
                "boxContents": [],
                "warnings": [],
                "priority": priority_for(category),
                "featured": False,
                "source": "local-catalog",
                "verificationStatus": "image-only",
            })
            image_only += 1
            created_from_images += 1

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
        for key in [
            "id", "slug", "sku", "name", "category", "legacyCategory", "image",
        ]:
            if key == "legacyCategory" and not p.get(key):
                continue
            lines.append(f"    {key}: {ts_string(p[key])},")
        lines.append(f"    gallery: {ts_list(p['gallery'])},")
        lines.append(f"    shortDescription: {ts_string(p['shortDescription'])},")
        lines.append(f"    description: {ts_string(p['description'])},")
        lines.append(f"    highlights: {ts_list(p['highlights'])},")
        lines.append(f"    specifications: {ts_record(p['specifications'])},")
        lines.append(f"    useCases: {ts_list(p['useCases'])},")
        lines.append(f"    boxContents: {ts_list(p['boxContents'])},")
        lines.append(f"    warnings: {ts_list(p['warnings'])},")
        lines.append(f"    priority: {ts_string(p['priority'])},")
        lines.append(f"    featured: {'true' if p['featured'] else 'false'},")
        if p.get("sourceUrl"):
            lines.append(f"    sourceUrl: {ts_string(p['sourceUrl'])},")
        lines.append(f"    source: {ts_string(p['source'])},")
        lines.append(f"    verificationStatus: {ts_string(p['verificationStatus'])},")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append(
        """/** Known design/placeholder product names — never show in catalog surfaces. */
const PLACEHOLDER_PRODUCT_NAMES = [
  "Powerdex Flashlight Range",
  "Powerdex Metalelfeneri",
  "Powerdex Kafalambasi",
] as const;

const PLACEHOLDER_PRODUCT_SLUGS = new Set([
  "powerdex-flashlight-range",
  "powerdex-metalelfeneri",
  "powerdex-kafalambasi",
]);

const PLACEHOLDER_IMAGE_MARKERS = [
  "/images/products/metalelfeneri.jpg",
  "/images/products/kafalambasi.jpg",
  "/images/products/powerdex-flashlight-range.jpg",
] as const;

/** Extra safety: exclude design placeholders and SKU-less design image cards. */
export function isCatalogProduct(product: Product): boolean {
  if (PLACEHOLDER_PRODUCT_NAMES.includes(product.name as (typeof PLACEHOLDER_PRODUCT_NAMES)[number])) {
    return false;
  }
  if (PLACEHOLDER_PRODUCT_SLUGS.has(product.slug)) {
    return false;
  }
  if (
    !product.sku?.trim() &&
    PLACEHOLDER_IMAGE_MARKERS.some((path) => product.image === path || product.gallery.includes(path))
  ) {
    return false;
  }
  return true;
}

export const catalogProducts = products.filter(isCatalogProduct);

export function getProductBySlug(slug: string): Product | undefined {
  return catalogProducts.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return catalogProducts.filter((product) => product.category === category);
}

/** Featured slider: 6–8 products, metal fener + kafa lambası (+ kamp) öncelikli. */
export function getHomepageProducts(limit = 8): Product[] {
  const preferredOrder = ["metal-el-fenerleri", "kafa-lambalari", "kamp-lambalari"] as const;
  const featured = catalogProducts.filter((product) => product.featured);
  const byCategory = (category: Product["category"]) =>
    featured.filter((product) => product.category === category);

  const picks: Product[] = [];
  const seen = new Set<string>();
  const push = (product: Product) => {
    if (seen.has(product.id) || picks.length >= limit) return;
    seen.add(product.id);
    picks.push(product);
  };

  const metal = byCategory("metal-el-fenerleri");
  const head = byCategory("kafa-lambalari");
  const camp = byCategory("kamp-lambalari");

  metal.slice(0, 4).forEach(push);
  head.slice(0, 3).forEach(push);
  camp.slice(0, 1).forEach(push);

  for (const category of preferredOrder) {
    for (const product of byCategory(category)) push(product);
  }
  for (const product of featured) push(product);

  if (picks.length < 6) {
    for (const category of preferredOrder) {
      for (const product of catalogProducts.filter((item) => item.category === category)) {
        push(product);
        if (picks.length >= 6) break;
      }
      if (picks.length >= 6) break;
    }
  }

  return picks.slice(0, Math.min(limit, Math.max(picks.length, 0)));
}

export function getSimilarProducts(product: Product, limit = 4): Product[] {
  return catalogProducts
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
    with_real = sum(1 for p in products if p["image"].startswith("/images/products/"))
    report = {
        "totalProducts": len(products),
        "totalImages": len(images),
        "designAssetsExcluded": [a["filename"] for a in design_assets],
        "imagesUsed": len(used_files),
        "imageCoveragePercent": round(100 * len(used_files) / max(len(images), 1), 1),
        "matchedLegacyWithImages": matched_legacy,
        "createdFromImagesOnly": image_only,
        "legacyWithoutImages": legacy_only,
        "featuredCount": sum(1 for p in products if p["featured"]),
        "productsWithRealImages": with_real,
        "categoryCounts": dict(sorted(by_cat.items(), key=lambda x: -x[1])),
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "sourcePriority": "local-images",
    }
    (ROOT / "data" / "product-import-report.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print("=== IMAGE-FIRST CATALOG REPORT ===")
    print(f"Toplam ürün: {report['totalProducts']}")
    print(f"Toplam görsel: {report['totalImages']}")
    print(f"Tasarım görselleri (hariç): {len(design_assets)}")
    for asset in design_assets:
        print(f"  - {asset['filename']}")
    print(f"Kullanılan görsel: {report['imagesUsed']} ({report['imageCoveragePercent']}%)")
    print(f"Eski site ile eşleşen (görselli): {report['matchedLegacyWithImages']}")
    print(f"Yalnızca görselden oluşturulan: {report['createdFromImagesOnly']}")
    print(f"Eski sitede olup görselsiz kalan: {report['legacyWithoutImages']}")
    print(f"Featured: {report['featuredCount']}")
    print("Kategori başına:")
    for k, v in report["categoryCounts"].items():
        print(f"  {k}: {v}")


if __name__ == "__main__":
    main()
