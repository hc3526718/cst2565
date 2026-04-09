import { Card, Badge, Separator } from "@heroui/react"
import { milestones, ganttTasks, WEEKS } from "@/lib/data"

const stageMap: Record<number, { name: string; description: string }> = {
  8: {
    name: "Stage 1: Initiation",
    description: "PID, WBS, Gantt chart, 4-Fields Map, brainstorming, tutor sign-off",
  },
  9: {
    name: "Stage 2: Research",
    description:
      "Platform comparison, device surveys, protocol research, security analysis, UK regulations",
  },
  10: {
    name: "Stage 3: Design (Part 1)",
    description: "User personas, platform selection, device selection for all housing types",
  },
  11: {
    name: "Stage 3: Design (Part 2) + Cost-Benefit",
    description: "Network diagrams, cost tables, ROI analysis, additional features catalogue",
  },
  12: {
    name: "Stage 4: Delivery & Presentation",
    description: "Report writing, peer review, formatting, slides, rehearsal, final delivery",
  },
}

export default function MilestonesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Milestones & Timeline</h1>
        <p className="text-muted-foreground">PRINCE2 stage gates and weekly deliverables</p>
      </div>

      <div className="flex flex-col gap-0">
        {WEEKS.map((week, idx) => {
          const stage = stageMap[week]
          const weekMilestones = milestones.filter((m) => m.week === week)
          const weekTasks = ganttTasks.filter(
            (t) =>
              !t.isMilestone &&
              ((t.startWeek <= week && t.endWeek >= week) || t.startWeek === week)
          )
          const uniqueTasks = weekTasks.filter((t, i, arr) => arr.findIndex((x) => x.id === t.id) === i)
          const isLast = idx === WEEKS.length - 1

          return (
            <div key={week} className="flex gap-4">
              <div className="flex flex-col items-center pt-4">
                <div className="border-primary bg-background flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold tabular-nums">
                  {week}
                </div>
                {!isLast && <div className="bg-border min-h-6 w-px flex-1" />}
              </div>

              <div className="flex-1 pb-6">
                <Card className="border-border transition-shadow hover:shadow-sm">
                  <Card.Header>
                    <div className="flex items-center justify-between">
                      <div>
                        <Card.Title className="text-lg">Week {week}</Card.Title>
                        <Card.Description>{stage.name}</Card.Description>
                      </div>
                      <Badge variant="soft" color="default" size="sm" className="shrink-0 text-xs tabular-nums">
                        {uniqueTasks.length} tasks
                      </Badge>
                    </div>
                  </Card.Header>
                  <Card.Content>
                    <p className="text-muted-foreground mb-3 text-sm">{stage.description}</p>

                    {weekMilestones.length > 0 && (
                      <>
                        <Separator className="my-3" />
                        <div className="flex flex-col gap-2">
                          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                            Milestones
                          </span>
                          {weekMilestones.map((m) => (
                            <div key={m.name} className="flex items-center gap-2.5 text-sm">
                              <span className="bg-primary size-2 shrink-0 rotate-45" />
                              <span>{m.name}</span>
                              <Badge variant="soft" color="accent" size="sm" className="ml-auto shrink-0 text-xs">
                                Day {m.day}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </Card.Content>
                </Card>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
