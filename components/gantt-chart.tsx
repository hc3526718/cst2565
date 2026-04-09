"use client"

import { useMemo, useState } from "react"
import { Badge, Button, Tooltip } from "@heroui/react"
import {
  ganttTasks,
  teamMembers,
  WEEKS,
  DAYS_PER_WEEK,
  TOTAL_DAYS,
  getDayOffset,
  getTaskWidth,
  type GanttTask,
} from "@/lib/data"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const

const MEMBER_COLORS: Record<string, string> = {
  Afsah: "oklch(0.55 0.2 250)",
  Jake: "oklch(0.6 0.18 165)",
  Eeshitha: "oklch(0.55 0.2 300)",
  Syed: "oklch(0.62 0.18 55)",
}

function getColor(owner: string): string {
  return MEMBER_COLORS[owner] ?? "oklch(0.58 0.16 15)"
}

function TaskBar({ task }: { task: GanttTask }) {
  const offset = getDayOffset(task.startWeek, task.startDay)
  const width = getTaskWidth(task)
  const leftPct = (offset / TOTAL_DAYS) * 100
  const widthPct = (width / TOTAL_DAYS) * 100
  const color = getColor(task.owner)

  if (task.isMilestone) {
    const centerPct = leftPct + widthPct / 2
    return (
      <Tooltip delay={0}>
        <Tooltip.Trigger>
          <div
            className="border-foreground bg-foreground absolute top-1/2 size-3 -translate-y-1/2 rotate-45 border-2 cursor-pointer"
            style={{ left: `${centerPct}%` }}
          />
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p className="font-semibold">{task.name}</p>
          <p className="text-xs">W{task.startWeek} Day {task.startDay}</p>
        </Tooltip.Content>
      </Tooltip>
    )
  }

  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger>
        <div
          className="absolute top-1 bottom-1 cursor-pointer rounded-sm transition-opacity hover:opacity-80"
          style={{
            left: `${leftPct}%`,
            width: `${widthPct}%`,
            backgroundColor: color,
            minWidth: "4px",
          }}
        />
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p className="font-semibold">{task.name}</p>
        <p className="text-muted-foreground text-xs">
          {task.id} | {task.owner}
        </p>
        <p className="text-xs">
          W{task.startWeek}D{task.startDay} — W{task.endWeek}D{task.endDay} ({width}d)
        </p>
      </Tooltip.Content>
    </Tooltip>
  )
}

export function GanttChart() {
  const [filter, setFilter] = useState<string | null>(null)

  const categories = useMemo(() => {
    const cats: string[] = []
    for (const t of ganttTasks) {
      if (!cats.includes(t.category)) cats.push(t.category)
    }
    return cats
  }, [])

  const filteredTasks = filter
    ? ganttTasks.filter((t) => t.owner === filter || t.owner === "All")
    : ganttTasks

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant={filter === null ? "primary" : "outline"}
          className="text-xs min-h-7 h-7 px-2"
          onPress={() => setFilter(null)}
        >
          All
        </Button>
        {teamMembers.map((m) => (
          <Button
            key={m.name}
            size="sm"
            variant={filter === m.name ? "primary" : "outline"}
            className="text-xs min-h-7 h-7 gap-1.5 px-2"
            onPress={() => setFilter(filter === m.name ? null : m.name)}
          >
            <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: getColor(m.name) }} />
            {m.name}
          </Button>
        ))}
        <span className="text-muted-foreground ml-2 flex items-center gap-1.5 text-xs">
          <span className="bg-foreground size-2.5 rotate-45" />
          Milestone
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <div className="min-w-[900px]">
          <div className="bg-muted/50 flex border-b">
            <div className="text-muted-foreground w-56 shrink-0 border-r px-3 py-2 text-xs font-medium">Task</div>
            <div className="flex flex-1">
              {WEEKS.map((w) => (
                <div key={w} className="flex-1 border-r py-2 text-center text-xs font-semibold last:border-r-0">
                  Week {w}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/30 flex border-b">
            <div className="w-56 shrink-0 border-r" />
            <div className="flex flex-1">
              {WEEKS.map((w) =>
                DAYS.map((d, i) => (
                  <div
                    key={`${w}-${i}`}
                    className="text-muted-foreground flex-1 border-r py-1 text-center text-[10px] last:border-r-0"
                  >
                    {d}
                  </div>
                ))
              )}
            </div>
          </div>

          {categories.map((cat) => {
            const tasks = filteredTasks.filter((t) => t.category === cat)
            if (tasks.length === 0) return null

            return (
              <div key={cat}>
                <div className="bg-muted/20 flex border-b">
                  <div className="w-56 shrink-0 border-r px-3 py-1.5">
                    <span className="text-xs font-semibold">{cat}</span>
                  </div>
                  <div className="flex-1" />
                </div>

                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="hover:bg-muted/10 flex border-b transition-colors last:border-b-0"
                  >
                    <div className="flex w-56 shrink-0 items-center gap-2 border-r px-3 py-1.5">
                      {!task.isMilestone && (
                        <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: getColor(task.owner) }} />
                      )}
                      {task.isMilestone && <span className="bg-foreground size-2 shrink-0 rotate-45" />}
                      <span className="text-xs truncate">{task.name}</span>
                      <Badge variant="soft" color="default" size="sm" className="ml-auto shrink-0 text-[10px]">
                        {task.owner}
                      </Badge>
                    </div>
                    <div className="relative flex-1">
                      <div className="absolute inset-0 flex">
                        {Array.from({ length: TOTAL_DAYS }).map((_, i) => (
                          <div
                            key={i}
                            className={`flex-1 ${
                              i % DAYS_PER_WEEK === DAYS_PER_WEEK - 1
                                ? "border-r"
                                : "border-muted border-r border-dashed"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="relative h-7">
                        <TaskBar task={task} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
