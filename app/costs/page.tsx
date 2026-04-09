import { Card } from "@heroui/react"
import { costData, TOTAL_ESTATE_COST, chartColorForHousing } from "@/lib/data"
import { CostCharts } from "@/components/cost-charts"

export default function CostsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cost analysis</h1>
        <p className="text-muted-foreground">
          Parts only (GBP): 8 starter homes, 6 family homes, 1 shared / sheltered unit — per-unit rates × units; estate
          total £{TOTAL_ESTATE_COST.toLocaleString(undefined, { minimumFractionDigits: 2 })}.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border shadow-sm">
          <Card.Header>
            <Card.Title>Cost distribution</Card.Title>
            <Card.Description>Share of estate total by housing type</Card.Description>
          </Card.Header>
          <Card.Content>
            <CostCharts />
          </Card.Content>
        </Card>

        <Card className="border-border shadow-sm">
          <Card.Header>
            <Card.Title>Cost summary</Card.Title>
            <Card.Description>Itemised breakdown</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium">Housing type</th>
                    <th className="pb-2 text-right font-medium">Per unit</th>
                    <th className="pb-2 text-right font-medium">Units</th>
                    <th className="pb-2 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {costData.map((c) => (
                    <tr key={c.type} className="border-b last:border-0">
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="size-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: chartColorForHousing(c.type) }}
                          />
                          <span className="font-medium">{c.type}</span>
                        </div>
                      </td>
                      <td className="py-2 text-right tabular-nums">
                        £{c.perUnit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 text-right tabular-nums">{c.units}</td>
                      <td className="py-2 text-right font-semibold tabular-nums">
                        £{c.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="pt-3 font-semibold">
                      Estate total
                    </td>
                    <td className="pt-3 text-right font-bold tabular-nums">
                      £{TOTAL_ESTATE_COST.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  )
}
