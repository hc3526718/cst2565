"use client"

import { Cell, Pie, PieChart } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { costData } from "@/lib/data"

const HOUSING_COLORS: Record<string, string> = {
  "4-Bed Family Home": "oklch(0.55 0.2 250)",
  "Sheltered Accommodation": "oklch(0.6 0.18 165)",
  "2-Bed Starter Home": "oklch(0.62 0.18 55)",
}

const pieData = costData.map((c) => ({
  name: c.type,
  value: c.total,
  fill: HOUSING_COLORS[c.type] ?? "oklch(0.58 0.16 15)",
}))

const chartConfig = {
  "4-Bed Family Home": {
    label: "Family Homes (×6)",
    color: "oklch(0.55 0.2 250)",
  },
  "Sheltered Accommodation": {
    label: "Sheltered (×1)",
    color: "oklch(0.6 0.18 165)",
  },
  "2-Bed Starter Home": {
    label: "Starter Homes (×8)",
    color: "oklch(0.62 0.18 55)",
  },
} satisfies ChartConfig

export function CostCharts() {
  return (
    <ChartContainer config={chartConfig} className="mx-auto h-[300px] w-full">
      <PieChart accessibilityLayer>
        <ChartTooltip
          content={<ChartTooltipContent formatter={(value) => `£${Number(value).toLocaleString()}`} />}
        />
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          strokeWidth={2}
          paddingAngle={2}
        >
          {pieData.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
      </PieChart>
    </ChartContainer>
  )
}
