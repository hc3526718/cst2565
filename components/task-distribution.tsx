"use client"

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ganttTasks, teamMembers } from "@/lib/data"

const MEMBER_COLORS: Record<string, string> = {
  Afsah: "oklch(0.55 0.2 250)",
  Jake: "oklch(0.6 0.18 165)",
  Eeshitha: "oklch(0.55 0.2 300)",
  Syed: "oklch(0.62 0.18 55)",
}

const data = teamMembers.map((m) => ({
  name: m.name,
  tasks: ganttTasks.filter((t) => t.owner === m.name && !t.isMilestone).length,
  fill: MEMBER_COLORS[m.name] ?? "oklch(0.58 0.16 15)",
}))

const chartConfig = {
  tasks: {
    label: "Tasks",
    color: "oklch(0.55 0.2 250)",
  },
} satisfies ChartConfig

export function TaskDistribution() {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="tasks" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
