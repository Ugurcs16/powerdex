"use client";

import { FormEvent, useMemo, useState } from "react";
import { company } from "@/config/company";
import { buildContactMailto } from "@/lib/site";
import { brandClasses } from "@/lib/brand";

const subjects = [
  "Ürün Bilgisi",
  "Toptan Satış",
  "Perakende Satış",
  "Sipariş Desteği",
  "İade / Değişim",
  "Teknik Destek",
  "Diğer",
] as const;

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<string>(subjects[0]);
  const [message, setMessage] = useState("");
  const [kvkk, setKvkk] = useState(false);

  const canSubmit = useMemo(
    () => Boolean(name.trim() && phone.trim() && email.trim() && message.trim() && kvkk),
    [name, phone, email, message, kvkk],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    window.location.href = buildContactMailto({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      subject,
      message: message.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${brandClasses.cardSurface} p-6`}>
      <h2 className="text-xl font-semibold text-white">İletişim Formu</h2>
      <p className={`text-sm ${brandClasses.textMuted}`}>
        Form gönderimi şu an e-posta istemciniz üzerinden{" "}
        <span className={brandClasses.text}>{company.email.display}</span> adresine yönlendirilir.
      </p>

      <label className="block space-y-2 text-sm">
        <span className={brandClasses.textMuted}>Ad Soyad</span>
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={`w-full rounded-lg border ${brandClasses.border} bg-[#151922] px-3 py-3 text-white outline-none focus:border-[#A6C74A]`}
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className={brandClasses.textMuted}>Telefon</span>
        <input
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className={`w-full rounded-lg border ${brandClasses.border} bg-[#151922] px-3 py-3 text-white outline-none focus:border-[#A6C74A]`}
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className={brandClasses.textMuted}>E-posta</span>
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={`w-full rounded-lg border ${brandClasses.border} bg-[#151922] px-3 py-3 text-white outline-none focus:border-[#A6C74A]`}
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className={brandClasses.textMuted}>Konu</span>
        <select
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className={`w-full rounded-lg border ${brandClasses.border} bg-[#151922] px-3 py-3 text-white outline-none focus:border-[#A6C74A]`}
        >
          {subjects.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-2 text-sm">
        <span className={brandClasses.textMuted}>Mesaj</span>
        <textarea
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`h-32 w-full rounded-lg border ${brandClasses.border} bg-[#151922] px-3 py-3 text-white outline-none focus:border-[#A6C74A]`}
        />
      </label>

      <label className={`flex items-start gap-3 text-sm ${brandClasses.textMuted}`}>
        <input
          type="checkbox"
          checked={kvkk}
          onChange={(event) => setKvkk(event.target.checked)}
          className="mt-1"
          required
        />
        <span>
          Kişisel verilerimin iletişim talebimin değerlendirilmesi amacıyla işlenmesini kabul
          ediyorum.
        </span>
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className={`rounded-lg px-5 py-3 font-semibold ${brandClasses.accentBg} disabled:cursor-not-allowed disabled:opacity-50`}
      >
        E-posta ile Gönder
      </button>
    </form>
  );
}
