import { teamMembers, ownerColor } from "@/lib/data"

/** Consistent colour key for task owners across Gantt, activity list, and team pages. */
export function MemberColorLegend({ className = "" }: { className?: string }) {
  return (
    <div
      className={`border-border bg-muted/30 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border px-3 py-2 text-xs ${className}`}
      role="list"
      aria-label="Task owner colour key"
    >
      <span className="text-muted-foreground font-medium">Owner colours</span>
      {teamMembers.map((m) => (
        <span key={m.name} className="inline-flex items-center gap-1.5 font-medium" role="listitem">
          <span
            className="size-2.5 shrink-0 rounded-full ring-2 ring-background"
            style={{ backgroundColor: ownerColor(m.name) }}
            aria-hidden
          />
          <span style={{ color: ownerColor(m.name) }}>{m.name}</span>
          <span className="text-muted-foreground font-normal">({m.contributionHue})</span>
        </span>
      ))}
      <span className="text-muted-foreground inline-flex items-center gap-1.5" role="listitem">
        <span
          className="size-2.5 shrink-0 rounded-full ring-2 ring-background"
          style={{ backgroundColor: ownerColor("All") }}
          aria-hidden
        />
        All / group (slate)
      </span>
    </div>
  )
}
