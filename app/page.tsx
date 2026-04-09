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
} from "@/lib/data"
import { OverviewCharts } from "@/components/overview-charts"

const HOUSING_COLORS: Record<string, string> = {
  "4-Bed Family Home": "oklch(0.55 0.2 250)",
  "Sheltered Accommodation": "oklch(0.6 0.18 165)",
  "2-Bed Starter Home": "oklch(0.62 0.18 55)",
}

export default function Page() {
  const totalTasks = ganttTasks.filter((t) => !t.isMilestone).length
  const memberCount = teamMembers.length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Project Overview</h1>
        <p className="text-muted-foreground">
          CST2565 — Smart Home Consulting | Weeks 8–12 | Due 24 April 2026
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border shadow-sm">
          <Card.Header className="flex flex-row items-center justify-between pb-2">
            <Card.Description>Estate Total Cost</Card.Description>
            <PoundSterlingIcon className="text-muted-foreground size-4" />
          </Card.Header>
          <Card.Content>
            <div className="text-2xl font-bold tabular-nums">£{TOTAL_ESTATE_COST.toLocaleString()}</div>
            <p className="text-muted-foreground mt-1 text-xs">15 units · parts only</p>
          </Card.Content>
        </Card>

        <Card className="border-border shadow-sm">
          <Card.Header className="flex flex-row items-center justify-between pb-2">
            <Card.Description>Total Tasks</Card.Description>
            <ListChecksIcon className="text-muted-foreground size-4" />
          </Card.Header>
          <Card.Content>
            <div className="text-2xl font-bold tabular-nums">{totalTasks}</div>
            <p className="text-muted-foreground mt-1 text-xs">{milestones.length} milestones</p>
          </Card.Content>
        </Card>

        <Card className="border-border shadow-sm">
          <Card.Header className="flex flex-row items-center justify-between pb-2">
            <Card.Description>Team Members</Card.Description>
            <UsersIcon className="text-muted-foreground size-4" />
          </Card.Header>
          <Card.Content>
            <div className="text-2xl font-bold tabular-nums">{memberCount}</div>
            <p className="text-muted-foreground mt-1 text-xs">PRINCE2 Waterfall</p>
          </Card.Content>
        </Card>

        <Card className="border-border shadow-sm">
          <Card.Header className="flex flex-row items-center justify-between pb-2">
            <Card.Description>Project Duration</Card.Description>
            <CalendarDaysIcon className="text-muted-foreground size-4" />
          </Card.Header>
          <Card.Content>
            <div className="text-2xl font-bold tabular-nums">5 Weeks</div>
            <p className="text-muted-foreground mt-1 text-xs">Week 8 → Week 12</p>
          </Card.Content>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border shadow-sm">
          <Card.Header>
            <Card.Title>Cost Breakdown</Card.Title>
            <Card.Description>Per housing type (parts only, GBP)</Card.Description>
          </Card.Header>
          <Card.Content>
            <OverviewCharts />
          </Card.Content>
        </Card>

        <Card className="border-border shadow-sm">
          <Card.Header>
            <Card.Title>Milestones</Card.Title>
            <Card.Description>Key project gates</Card.Description>
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
                      W{m.week} D{m.day}
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
          <Card.Title>Housing Types</Card.Title>
          <Card.Description>Estate specification summary</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid gap-4 sm:grid-cols-3">
            {costData.map((c) => (
              <div
                key={c.type}
                className="rounded-lg border border-l-4 p-4 transition-shadow hover:shadow-sm"
                style={{ borderLeftColor: HOUSING_COLORS[c.type] }}
              >
                <div className="flex items-center gap-2">
                  <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: HOUSING_COLORS[c.type] }} />
                  <p className="text-sm font-medium">{c.type}</p>
                </div>
                <Separator className="my-2" />
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Per unit</span>
                    <span className="tabular-nums">£{c.perUnit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Units</span>
                    <span className="tabular-nums">×{c.units}</span>
                  </div>
                  <Separator className="my-1" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="tabular-nums">£{c.total.toLocaleString()}</span>
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
