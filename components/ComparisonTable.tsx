import { comparisonRows } from "@/data/products";
import { brandClasses } from "@/lib/brand";

export function ComparisonTable() {
  return (
    <section className={brandClasses.bg + " py-20"}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className={`text-xs font-medium uppercase tracking-[0.14em] ${brandClasses.accent}`}>
          Teknik Karşılaştırma
        </p>
        <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${brandClasses.text}`}>Model Karşılaştırması</h2>
        <p className={`mt-3 ${brandClasses.textMuted}`}>
          Işık gücü, çalışma süresi ve kullanım alanına göre hızlı teknik karşılaştırma.
        </p>

        <div className={`mt-8 overflow-x-auto rounded-xl border ${brandClasses.border}`}>
          <table className={`min-w-full divide-y divide-[#2A2E35] text-left text-sm`}>
            <thead className={brandClasses.surface}>
              <tr className={brandClasses.textMuted}>
                <th className="px-4 py-3 font-medium">Model</th>
                <th className="px-4 py-3 font-medium">Lümen</th>
                <th className="px-4 py-3 font-medium">Çalışma Süresi</th>
                <th className="px-4 py-3 font-medium">Şarj Tipi</th>
                <th className="px-4 py-3 font-medium">Kullanım</th>
                <th className="px-4 py-3 font-medium">Ağırlık</th>
                <th className="px-4 py-3 font-medium">Öne Çıkan</th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-[#2A2E35] ${brandClasses.bg} ${brandClasses.textMuted}`}>
              {comparisonRows.map((row) => (
                <tr key={row.model} className="hover:bg-[#1A1D21]/60">
                  <td className={`px-4 py-3 font-medium ${brandClasses.text}`}>{row.model}</td>
                  <td className="px-4 py-3">{row.lumen}</td>
                  <td className="px-4 py-3">{row.runtime}</td>
                  <td className="px-4 py-3">{row.chargingType}</td>
                  <td className="px-4 py-3">{row.usage}</td>
                  <td className="px-4 py-3">{row.weight}</td>
                  <td className="px-4 py-3">{row.standout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
