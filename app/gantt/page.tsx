import { Card } from "@heroui/react"
import { GanttChart } from "@/components/gantt-chart"

export default function GanttPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gantt Chart</h1>
        <p className="text-muted-foreground">
          Project timeline — Weeks 8 to 12 | Click a member to filter
        </p>
      </div>

      <Card className="border-border shadow-sm">
        <Card.Header>
          <Card.Title>Project Schedule</Card.Title>
          <Card.Description>
            Tasks from the WBS mapped across 5 weeks (25 working days). Hover over any bar for details.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <GanttChart />
        </Card.Content>
      </Card>
    </div>
  )
}
