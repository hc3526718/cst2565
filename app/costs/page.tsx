import { Card } from "@heroui/react"
import { costData, TOTAL_ESTATE_COST } from "@/lib/data"
import { CostCharts } from "@/components/cost-charts"

const HOUSING_COLORS: Record<string, string> = {
  "4-Bed Family Home": "oklch(0.55 0.2 250)",
  "Sheltered Accommodation": "oklch(0.6 0.18 165)",
  "2-Bed Starter Home": "oklch(0.62 0.18 55)",
}

export default function CostsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cost Analysis</h1>
        <p className="text-muted-foreground">
          Estate-wide smart home technology costs — parts only, GBP
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border shadow-sm">
          <Card.Header>
            <Card.Title>Cost Distribution</Card.Title>
            <Card.Description>Proportion of estate total by housing type</Card.Description>
          </Card.Header>
          <Card.Content>
            <CostCharts />
          </Card.Content>
        </Card>

        <Card className="border-border shadow-sm">
          <Card.Header>
            <Card.Title>Cost Summary</Card.Title>
            <Card.Description>Itemised breakdown per housing type</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium">Housing Type</th>
                    <th className="pb-2 text-right font-medium">Per Unit</th>
                    <th className="pb-2 text-right font-medium">Units</th>
                    <th className="pb-2 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {costData.map((c) => (
                    <tr key={c.type} className="border-b last:border-0">
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: HOUSING_COLORS[c.type] }} />
                          <span className="font-medium">{c.type}</span>
                        </div>
                      </td>
                      <td className="py-2 text-right tabular-nums">£{c.perUnit.toLocaleString()}</td>
                      <td className="py-2 text-right tabular-nums">{c.units}</td>
                      <td className="py-2 text-right font-semibold tabular-nums">£{c.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="pt-3 font-semibold">
                      Estate Total
                    </td>
                    <td className="pt-3 text-right font-bold tabular-nums">£{TOTAL_ESTATE_COST.toLocaleString()}</td>
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
