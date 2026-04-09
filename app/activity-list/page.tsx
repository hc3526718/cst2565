import { Card } from "@heroui/react"
import { activityRows, ownerColor } from "@/lib/data"

export default function ActivityListPage() {
  const phases = [...new Set(activityRows.map((r) => r.phase))]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Activity list</h1>
        <p className="text-muted-foreground">
          Task register for the Gantt chart (Assignment 2) — IDs, owners, dates, duration, and predecessors.
        </p>
      </div>

      <Card className="border-border shadow-sm">
        <Card.Header>
          <Card.Title>28 activities + milestones on Gantt</Card.Title>
          <Card.Description>Phases 1–6 · Mar–Apr 2026</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="overflow-x-auto">
            {phases.map((phase) => (
              <div key={phase} className="mb-6 last:mb-0">
                <div className="bg-slate-900 px-3 py-2 text-xs font-bold text-white">{phase}</div>
                <table className="w-full min-w-[800px] text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="px-2 py-2 text-left">ID</th>
                      <th className="px-2 py-2 text-left">Activity</th>
                      <th className="px-2 py-2 text-left">Owner</th>
                      <th className="px-2 py-2 text-left">Start</th>
                      <th className="px-2 py-2 text-left">Finish</th>
                      <th className="px-2 py-2 text-left">Duration</th>
                      <th className="px-2 py-2 text-left">Predecessors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityRows
                      .filter((r) => r.phase === phase)
                      .map((r, i) => (
                        <tr key={r.id} className={i % 2 === 0 ? "bg-background" : "bg-muted/40"}>
                          <td className="px-2 py-2 tabular-nums font-medium">{r.id}</td>
                          <td className="px-2 py-2">{r.activity}</td>
                          <td className="px-2 py-2 font-medium" style={{ color: ownerColor(r.owner) }}>
                            {r.owner}
                          </td>
                          <td className="px-2 py-2 tabular-nums">{r.start}</td>
                          <td className="px-2 py-2 tabular-nums">{r.finish}</td>
                          <td className="px-2 py-2">{r.duration}</td>
                          <td className="text-muted-foreground px-2 py-2 text-xs">{r.predecessors}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}
