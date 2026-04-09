import {
  CalendarDaysIcon,
  ListChecksIcon,
  PoundSterlingIcon,
  UsersIcon,
} from "lucide-react"
import { Card, Badge, Separator } from "@heroui/react"
import {
  ganttTasks,
  teamMembers,
  costData,
  milestones,
  TOTAL_ESTATE_COST,
  chartColorForHousing,
  formatShortDate,
  PROJECT_START_ISO,
  PROJECT_END_ISO,
} from "@/lib/data"
import { OverviewCharts } from "@/components/overview-charts"

export default function Page() {
  const totalTasks = ganttTasks.filter((t) => !t.isMilestone).length
  const memberCount = teamMembers.length
  const phaseCount = 6
  const milestoneCount = ganttTasks.filter((t) => t.isMilestone).length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Project Overview</h1>
        <p className="text-muted-foreground">
          CST2565 — Smart Home group report (Assignment 2) · {formatShortDate(PROJECT_START_ISO)} →{" "}
          {formatShortDate(PROJECT_END_ISO)} · Mahari, Mohammed, Nisar & Haydn
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border shadow-sm">
          <Card.Header className="flex flex-row items-center justify-between pb-2">
            <Card.Description>Estate total (parts only)</Card.Description>
            <PoundSterlingIcon className="text-muted-foreground size-4" />
          </Card.Header>
          <Card.Content>
            <div className="text-2xl font-bold tabular-nums">
              £{TOTAL_ESTATE_COST.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">8 starter · 6 family · 1 shared unit · GBP</p>
          </Card.Content>
        </Card>

        <Card className="border-border shadow-sm">
          <Card.Header className="flex flex-row items-center justify-between pb-2">
            <Card.Description>Scheduled activities</Card.Description>
            <ListChecksIcon className="text-muted-foreground size-4" />
          </Card.Header>
          <Card.Content>
            <div className="text-2xl font-bold tabular-nums">{totalTasks}</div>
            <p className="text-muted-foreground mt-1 text-xs">
              {milestoneCount} milestones (M1–M5) on Gantt
            </p>
          </Card.Content>
        </Card>

        <Card className="border-border shadow-sm">
          <Card.Header className="flex flex-row items-center justify-between pb-2">
            <Card.Description>Team members</Card.Description>
            <UsersIcon className="text-muted-foreground size-4" />
          </Card.Header>
          <Card.Content>
            <div className="text-2xl font-bold tabular-nums">{memberCount}</div>
            <p className="text-muted-foreground mt-1 text-xs">Plus shared “All” tasks on the plan</p>
          </Card.Content>
        </Card>

        <Card className="border-border shadow-sm">
          <Card.Header className="flex flex-row items-center justify-between pb-2">
            <Card.Description>Plan window</Card.Description>
            <CalendarDaysIcon className="text-muted-foreground size-4" />
          </Card.Header>
          <Card.Content>
            <div className="text-2xl font-bold tabular-nums">{phaseCount} phases</div>
            <p className="text-muted-foreground mt-1 text-xs">CPA critical path 21 days (calendar)</p>
          </Card.Content>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border shadow-sm">
          <Card.Header>
            <Card.Title>Cost breakdown</Card.Title>
            <Card.Description>Line totals = per-unit rate × units (8 / 6 / 1)</Card.Description>
          </Card.Header>
          <Card.Content>
            <OverviewCharts />
          </Card.Content>
        </Card>

        <Card className="border-border shadow-sm">
          <Card.Header>
            <Card.Title>Milestones</Card.Title>
            <Card.Description>Key gates on the Gantt</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="flex flex-col gap-3">
              {milestones.map((m, i) => (
                <div key={m.name}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted flex size-6 items-center justify-center rounded-full border text-[10px] font-bold tabular-nums">
                        {i + 1}
                      </div>
                      <span className="text-sm">{m.name}</span>
                    </div>
                    <Badge variant="soft" color="default" size="sm" className="ml-2 shrink-0 text-xs tabular-nums">
                      Day {m.day}
                    </Badge>
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="border-muted-foreground/30 ml-3 h-3 border-l border-dashed" />
                  )}
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>

      <Card className="border-border shadow-sm">
        <Card.Header>
          <Card.Title>Property types</Card.Title>
          <Card.Description>Starter, family & shared accommodation — estate mix per brief</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid gap-4 sm:grid-cols-3">
            {costData.map((c) => (
              <div
                key={c.type}
                className="rounded-lg border border-l-4 p-4 transition-shadow hover:shadow-sm"
                style={{ borderLeftColor: chartColorForHousing(c.type) }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: chartColorForHousing(c.type) }}
                  />
                  <p className="text-sm font-medium">{c.type}</p>
                </div>
                <Separator className="my-2" />
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Per unit</span>
                    <span className="tabular-nums">£{c.perUnit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Units</span>
                    <span className="tabular-nums">×{c.units}</span>
                  </div>
                  <Separator className="my-1" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="tabular-nums">£{c.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}
