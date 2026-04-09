import { Card, Badge, Separator } from "@heroui/react"
import { teamMembers, ganttTasks } from "@/lib/data"
import { TaskDistribution } from "@/components/task-distribution"

const totalNonMilestone = ganttTasks.filter((t) => !t.isMilestone).length

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Team</h1>
        <p className="text-muted-foreground">Member roles, file ownership, and task distribution</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {teamMembers.map((m) => {
          const taskCount = ganttTasks.filter((t) => t.owner === m.name && !t.isMilestone).length
          const pct = Math.round((taskCount / totalNonMilestone) * 100)

          return (
            <Card key={m.name} className="border-border transition-shadow hover:shadow-sm">
              <Card.Header className="pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{
                      backgroundColor: m.color,
                      boxShadow: `0 0 0 2px var(--background), 0 0 0 4px ${m.color}`,
                    }}
                  >
                    {m.name[0]}
                  </div>
                  <div>
                    <Card.Title className="text-base">{m.name}</Card.Title>
                    <Card.Description className="font-mono text-xs">{m.handle}</Card.Description>
                  </div>
                </div>
              </Card.Header>
              <Card.Content>
                <p className="text-sm font-medium">{m.role}</p>
                <Separator className="my-3" />

                <div className="mb-3 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Assigned tasks</span>
                    <span className="text-xs tabular-nums">
                      {taskCount} / {totalNonMilestone} ({pct}%)
                    </span>
                  </div>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: m.color,
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs">Primary files</span>
                  <div className="flex flex-wrap gap-1">
                    {m.files.map((f) => (
                      <Badge key={f} variant="soft" color="default" size="sm" className="text-[10px]">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card.Content>
            </Card>
          )
        })}
      </div>

      <Card className="border-border shadow-sm">
        <Card.Header>
          <Card.Title>Task Distribution</Card.Title>
          <Card.Description>Number of individual tasks per member</Card.Description>
        </Card.Header>
        <Card.Content>
          <TaskDistribution />
        </Card.Content>
      </Card>
    </div>
  )
}
