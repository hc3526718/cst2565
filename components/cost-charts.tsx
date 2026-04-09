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
import { costData, chartColorForHousing } from "@/lib/data"

const pieData = costData.map((c) => ({
  name: c.type,
  value: c.total,
  fill: chartColorForHousing(c.type),
}))

const chartConfig = Object.fromEntries(
  costData.map((c) => [
    c.type,
    { label: `${c.type} (${c.units}u)`, color: chartColorForHousing(c.type) },
  ]),
) as ChartConfig

export function CostCharts() {
  return (
    <ChartContainer config={chartConfig} className="mx-auto h-[300px] w-full">
      <PieChart accessibilityLayer>
        <ChartTooltip
          content={<ChartTooltipContent formatter={(value) => `£${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />}
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
