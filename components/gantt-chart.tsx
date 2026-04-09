"use client"

import { useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { Badge, Button } from "@heroui/react"
import {
  ganttTasks,
  teamMembers,
  TIMELINE_DAYS,
  TOTAL_TIMELINE_DAYS,
  taskBarSpan,
  ownerColor,
  fridayMeetingDayIndices,
  formatShortDate,
  type GanttTask,
} from "@/lib/data"

const PHASE_ORDER = [
  "Phase 1 — Project kick-off & planning",
  "Phase 2 — Research & early drafts",
  "Phase 3 — WBS, CPA, device selection & floor plans",
  "Phase 4 — Costing, recommendations & drafting",
  "Phase 5 — Review, conclusion & appendices",
  "Phase 6 — References, proof-reading & sign-off",
]

function GanttTooltip({
  task,
  x,
  y,
}: {
  task: GanttTask
  x: number
  y: number
}) {
  if (typeof document === "undefined") return null

  return createPortal(
    <div
      role="tooltip"
      className="border-border bg-popover text-popover-foreground pointer-events-none fixed z-[10000] max-w-xs rounded-md border px-3 py-2 text-xs shadow-lg"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, calc(-100% - 8px))",
      }}
    >
      <p className="font-semibold leading-snug">{task.name}</p>
      {task.isMilestone ? (
        <p className="text-muted-foreground mt-1">Milestone marker</p>
      ) : (
        <>
          <p className="text-muted-foreground mt-1">
            {task.numericId != null ? `Task ${task.numericId}` : task.id} · {task.owner}
          </p>
          <p className="mt-1 tabular-nums">
            {formatShortDate(task.startIso)} → {formatShortDate(task.endIso)} ({task.duration})
          </p>
          <p className="text-muted-foreground mt-1">Predecessors: {task.predecessors}</p>
        </>
      )}
    </div>,
    document.body
  )
}

function TaskBar({
  task,
  onHover,
}: {
  task: GanttTask
  onHover: (h: { task: GanttTask; x: number; y: number } | null) => void
}) {
  const { left, width } = taskBarSpan(task)
  const leftPct = (left / TOTAL_TIMELINE_DAYS) * 100
  const widthPct = (width / TOTAL_TIMELINE_DAYS) * 100
  const color = ownerColor(task.owner)

  const showTip = (el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    onHover({
      task,
      x: r.left + r.width / 2,
      y: r.top,
    })
  }

  if (task.isMilestone) {
    const centerPct = leftPct + widthPct / 2
    return (
      <button
        type="button"
        className="border-foreground bg-foreground absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 cursor-default"
        style={{ left: `${centerPct}%` }}
        aria-label={task.name}
        onMouseEnter={(e) => showTip(e.currentTarget)}
        onMouseLeave={() => onHover(null)}
        onFocus={(e) => showTip(e.currentTarget)}
        onBlur={() => onHover(null)}
      />
    )
  }

  return (
    <button
      type="button"
      className="absolute top-1 bottom-1 cursor-default rounded-sm border-0 transition-opacity hover:opacity-85"
      style={{
        left: `${leftPct}%`,
        width: `${widthPct}%`,
        backgroundColor: color,
        minWidth: "4px",
      }}
      aria-label={task.name}
      onMouseEnter={(e) => showTip(e.currentTarget)}
      onMouseLeave={() => onHover(null)}
      onFocus={(e) => showTip(e.currentTarget)}
      onBlur={() => onHover(null)}
    />
  )
}

export function GanttChart() {
  const [filter, setFilter] = useState<string | null>(null)
  const [hover, setHover] = useState<{ task: GanttTask; x: number; y: number } | null>(null)

  const categories = useMemo(() => {
    return PHASE_ORDER.filter((p) => ganttTasks.some((t) => t.category === p))
  }, [])

  const filteredTasks = filter
    ? ganttTasks.filter((t) => t.owner === filter || t.owner === "All")
    : ganttTasks

  return (
    <div className="flex flex-col gap-4">
      {hover && <GanttTooltip task={hover.task} x={hover.x} y={hover.y} />}

      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant={filter === null ? "primary" : "outline"}
          className="min-h-7 h-7 px-2 text-xs"
          onPress={() => setFilter(null)}
        >
          All
        </Button>
        {teamMembers.map((m) => (
          <Button
            key={m.name}
            size="sm"
            variant={filter === m.name ? "primary" : "outline"}
            className="min-h-7 h-7 gap-1.5 px-2 text-xs"
            onPress={() => setFilter(filter === m.name ? null : m.name)}
          >
            <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: ownerColor(m.name) }} />
            {m.name}
          </Button>
        ))}
        <span className="text-muted-foreground ml-2 flex items-center gap-1.5 text-xs">
          <span className="bg-foreground size-2.5 rotate-45" />
          Milestone
        </span>
        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <span className="text-destructive text-[10px] leading-none">♦</span>
          Weekly Friday meeting
        </span>
      </div>

      <p className="text-muted-foreground text-[11px]">
        ♦ = Weekly Friday meeting · Hover a bar for task details (anchored to the bar you point at).
      </p>

      <div className="overflow-x-auto rounded-lg border">
        <div className="min-w-[1100px]">
          <div className="bg-muted/50 flex border-b">
            <div className="text-muted-foreground w-64 shrink-0 border-r px-3 py-2 text-xs font-medium">Task</div>
            <div className="flex flex-1">
              {TIMELINE_DAYS.map((iso, i) => {
                const isFri = fridayMeetingDayIndices.includes(i)
                const [, m, d] = iso.split("-")
                return (
                  <div
                    key={iso}
                    className={`relative flex-1 border-r py-2 text-center text-[10px] font-medium last:border-r-0 ${
                      isFri ? "bg-destructive/5" : ""
                    }`}
                  >
                    {Number(d)}/{m}
                    {isFri && (
                      <span className="text-destructive absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[9px]" aria-hidden>
                        ♦
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {categories.map((cat) => {
            const tasks = filteredTasks.filter((t) => t.category === cat)
            if (tasks.length === 0) return null

            return (
              <div key={cat}>
                <div className="bg-muted/20 flex border-b">
                  <div className="w-64 shrink-0 border-r px-3 py-1.5">
                    <span className="text-xs font-semibold leading-snug">{cat}</span>
                  </div>
                  <div className="flex-1" />
                </div>

                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="hover:bg-muted/10 flex border-b transition-colors last:border-b-0"
                  >
                    <div className="flex w-64 shrink-0 items-center gap-2 border-r px-3 py-1.5">
                      {!task.isMilestone && (
                        <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: ownerColor(task.owner) }} />
                      )}
                      {task.isMilestone && <span className="bg-foreground size-2 shrink-0 rotate-45" />}
                      <span className="line-clamp-2 text-xs">{task.name}</span>
                      <Badge variant="soft" color="default" size="sm" className="ml-auto shrink-0 text-[10px]">
                        {task.owner}
                      </Badge>
                    </div>
                    <div className="relative flex-1">
                      <div className="absolute inset-0 flex">
                        {TIMELINE_DAYS.map((_, i) => (
                          <div
                            key={i}
                            className={`flex-1 border-r border-dashed border-muted last:border-r-0 ${
                              fridayMeetingDayIndices.includes(i) ? "bg-destructive/[0.04]" : ""
                            }`}
                          />
                        ))}
                      </div>
                      <div className="relative h-8">
                        <TaskBar task={task} onHover={setHover} />
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
