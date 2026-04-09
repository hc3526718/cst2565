import { Card, Badge, Separator } from "@heroui/react"

const phases = [
  {
    title: "Phase 1 — Project kick-off & planning",
    dates: "20 Mar 2026",
    summary: "Kick-off, task allocation, shared document structure and section headings.",
    tasks: 2,
  },
  {
    title: "Phase 2 — Individual research & early drafts",
    dates: "21–27 Mar 2026",
    summary: "PID, stakeholders, org chart, introduction, Gantt activity list, systems & protocols research.",
    tasks: 6,
  },
  {
    title: "Phase 3 — WBS, CPA, device selection & floor plans",
    dates: "27 Mar – 3 Apr 2026",
    summary: "WBS (12 branches), CPA node diagram, 4-field maps, three property floor plans & device sets.",
    tasks: 6,
  },
  {
    title: "Phase 4 — Costing, recommendations & drafting",
    dates: "27 Mar – 3 Apr 2026",
    summary: "Costing tables, recommendations & solar, PM tools section, integration & cyber response.",
    tasks: 4,
  },
  {
    title: "Phase 5 — Review, conclusion & appendices",
    dates: "3–6 Apr 2026",
    summary: "Device validation review, conclusion, appendices A–C (minutes, LabVIEW, PM tools evidence).",
    tasks: 5,
  },
  {
    title: "Phase 6 — References, proof-reading & sign-off",
    dates: "5–10 Apr 2026",
    summary: "Harvard references, proof-read, rehearsal, upload (Nisar), group presentation 10 Apr.",
    tasks: 5,
  },
]

const gates = [
  { label: "M1", text: "End of Phase 1 — planning baseline set" },
  { label: "M2", text: "End of Phase 2 — research & drafts complete" },
  { label: "M3", text: "End of Phases 3 & 4 — design & costing package" },
  { label: "M4", text: "Rehearsal milestone — 9 Apr" },
  { label: "M5", text: "Submission & presentation — 9–10 Apr" },
]

export default function MilestonesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Milestones & phases</h1>
        <p className="text-muted-foreground">
          Assignment 2 timeline — six phases with Gantt milestones M1–M5 and Friday review rhythm.
        </p>
      </div>

      <Card className="border-border shadow-sm">
        <Card.Header>
          <Card.Title>Gantt milestones</Card.Title>
          <Card.Description>Markers on the chart (red diamonds / milestone rows)</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="flex flex-col gap-3">
            {gates.map((g, i) => (
              <div key={g.label}>
                <div className="flex items-center gap-3">
                  <Badge color="danger" variant="soft" size="sm" className="shrink-0 font-mono">
                    {g.label}
                  </Badge>
                  <span className="text-sm">{g.text}</span>
                </div>
                {i < gates.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>

      <div className="flex flex-col gap-0">
        {phases.map((p, idx) => {
          const isLast = idx === phases.length - 1
          return (
            <div key={p.title} className="flex gap-4">
              <div className="flex flex-col items-center pt-4">
                <div className="border-primary bg-background flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold tabular-nums">
                  {idx + 1}
                </div>
                {!isLast && <div className="bg-border min-h-6 w-px flex-1" />}
              </div>
              <div className="flex-1 pb-6">
                <Card className="border-border transition-shadow hover:shadow-sm">
                  <Card.Header>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Card.Title className="text-lg">{p.title}</Card.Title>
                      <Badge variant="soft" color="default" size="sm" className="shrink-0">
                        {p.tasks} tasks
                      </Badge>
                    </div>
                    <Card.Description>{p.dates}</Card.Description>
                  </Card.Header>
                  <Card.Content>
                    <p className="text-muted-foreground text-sm">{p.summary}</p>
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
