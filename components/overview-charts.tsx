"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { costData, chartColorForHousing } from "@/lib/data"

const chartData = costData.map((c) => ({
  name: `${c.type} (${c.units}u)`,
  total: c.total,
  perUnit: c.perUnit,
}))

const chartConfig = {
  total: {
    label: "Total (£)",
    color: chartColorForHousing(costData[0]?.type ?? ""),
  },
  perUnit: {
    label: "Per unit (£)",
    color: chartColorForHousing(costData[1]?.type ?? costData[0]?.type ?? ""),
  },
} satisfies ChartConfig

export function OverviewCharts() {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart data={chartData} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs" />
        <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="perUnit" fill="var(--color-perUnit)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
