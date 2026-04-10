import type { ApplianceRow, PropertyAppliancePricing } from "@/lib/property-appliance-pricing"

function formatGBP(n: number) {
  return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function DataRows({ rows, startIndex }: { rows: ApplianceRow[]; startIndex: number }) {
  return (
    <>
      {rows.map((row, i) => (
        <tr
          key={`${row.appliance}-${startIndex + i}`}
          className={(startIndex + i) % 2 === 0 ? "bg-white" : "bg-sky-50/80 dark:bg-sky-950/20"}
        >
          <td className="border-b border-sky-100 px-3 py-2 align-top">{row.appliance}</td>
          <td className="border-b border-sky-100 px-3 py-2 text-right tabular-nums">{row.qty}</td>
          <td className="border-b border-sky-100 px-3 py-2 text-right tabular-nums">
            {formatGBP(row.unitPrice)}
          </td>
          <td className="border-b border-sky-100 px-3 py-2 text-right font-medium tabular-nums">
            {formatGBP(row.total)}
          </td>
          <td className="border-b border-sky-100 px-3 py-2 text-muted-foreground">{row.category}</td>
        </tr>
      ))}
    </>
  )
}

export function PropertyPricingBlock({
  data,
  embedded,
}: {
  data: PropertyAppliancePricing
  /** When true, omit outer card chrome (used inside tabbed Card). */
  embedded?: boolean
}) {
  const shell = embedded
    ? "overflow-hidden rounded-b-lg"
    : "border-border overflow-hidden rounded-lg border shadow-sm"

  return (
    <section className={shell}>
      <div className="bg-sky-950 px-4 py-3 text-white">
        <h2 className="text-lg font-bold tracking-tight">Appliance costing — {data.title}</h2>
        <p className="text-sky-200/90 mt-0.5 text-xs font-medium">
          CST2565 · Project management &amp; professional practice · Smart home consulting
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <thead>
            <tr className="bg-sky-800 text-white">
              <th className="px-3 py-2 text-left font-semibold">Appliance</th>
              <th className="px-3 py-2 text-right font-semibold">Qty</th>
              <th className="px-3 py-2 text-right font-semibold">Unit price (£)</th>
              <th className="px-3 py-2 text-right font-semibold">Total cost (£)</th>
              <th className="px-3 py-2 text-left font-semibold">Category</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-sky-600 text-white">
              <td colSpan={5} className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide">
                Essentials
              </td>
            </tr>
            <DataRows rows={data.essentials} startIndex={0} />
            <tr className="bg-sky-900 text-white">
              <td colSpan={3} className="px-3 py-2 text-right text-xs font-semibold uppercase">
                Essentials subtotal
              </td>
              <td className="px-3 py-2 text-right text-sm font-bold tabular-nums">
                {formatGBP(data.essentialsSubtotal)}
              </td>
              <td className="px-3 py-2" />
            </tr>
            <tr className="bg-sky-600 text-white">
              <td colSpan={5} className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide">
                Extras
              </td>
            </tr>
            <DataRows rows={data.extras} startIndex={data.essentials.length} />
            <tr className="bg-sky-900 text-white">
              <td colSpan={3} className="px-3 py-2 text-right text-xs font-semibold uppercase">
                Extras subtotal
              </td>
              <td className="px-3 py-2 text-right text-sm font-bold tabular-nums">
                {formatGBP(data.extrasSubtotal)}
              </td>
              <td className="px-3 py-2" />
            </tr>
            <tr className="bg-sky-950 text-white">
              <td colSpan={3} className="px-4 py-3 text-right text-sm font-bold uppercase tracking-wide">
                Total cost
              </td>
              <td className="px-4 py-3 text-right text-base font-bold tabular-nums">
                {formatGBP(data.grandTotal)}
              </td>
              <td className="px-4 py-3" />
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
