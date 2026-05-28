import { comparisonRows } from "@/data/products";

export function ComparisonTable() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-white sm:text-4xl">Urun Karsilastirma Alani</h2>
      <p className="mt-3 text-zinc-400">Model, isik gucu ve kullanim ihtiyacina gore hizli karsilastirma.</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="min-w-full divide-y divide-zinc-800 text-left text-sm">
          <thead className="bg-zinc-900">
            <tr className="text-zinc-300">
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3">Lumen / Isik Gucu</th>
              <th className="px-4 py-3">Calisma Suresi</th>
              <th className="px-4 py-3">Sarj Tipi</th>
              <th className="px-4 py-3">Kullanim Alani</th>
              <th className="px-4 py-3">Agirlik</th>
              <th className="px-4 py-3">One Cikan Ozellik</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 bg-zinc-950 text-zinc-200">
            {comparisonRows.map((row) => (
              <tr key={row.model}>
                <td className="px-4 py-3">{row.model}</td>
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
    </section>
  );
}
