import { Card } from "@heroui/react"
import { GanttChart } from "@/components/gantt-chart"

export default function GanttPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gantt chart</h1>
        <p className="text-muted-foreground">
          Assignment 2 schedule — 28 tasks across six phases (20 Mar – 10 Apr 2026). Filter by owner; ♦ marks
          Friday meetings. Hover any bar — the info panel is anchored to that bar (fixed to viewport from its
          screen position).
        </p>
      </div>

      <Card className="border-border shadow-sm">
        <Card.Header>
          <Card.Title>Project schedule</Card.Title>
          <Card.Description>
            Milestones M1–M5, assignee colour coding (Mahari · Mohammed · Nisar · Haydn · All), and predecessor
            logic as in the activity list.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <GanttChart />
        </Card.Content>
      </Card>
    </div>
  )
}
