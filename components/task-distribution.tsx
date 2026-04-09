"use client"

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ganttTasks, teamMembers, ownerColor } from "@/lib/data"

const data = [
  ...teamMembers.map((m) => ({
    name: m.name,
    tasks: ganttTasks.filter((t) => t.owner === m.name && !t.isMilestone).length,
    fill: ownerColor(m.name),
  })),
  {
    name: "All (group)",
    tasks: ganttTasks.filter((t) => t.owner === "All" && !t.isMilestone).length,
    fill: ownerColor("All"),
  },
]

const chartConfig = {
  tasks: {
    label: "Tasks",
    color: ownerColor("Haydn"),
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
