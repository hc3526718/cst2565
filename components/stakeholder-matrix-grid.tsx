import { stakeholderQuadrants } from "@/lib/stakeholder-matrix"

function QuadrantCell({
  strategy,
  stakeholders,
  dotClass,
  panelClass,
  titleClass,
}: {
  strategy: string
  stakeholders: string[]
  dotClass: string
  panelClass: string
  titleClass: string
}) {
  return (
    <div className={`flex min-h-[10rem] flex-col p-4 sm:min-h-[11rem] ${panelClass}`}>
      <h3 className={`text-sm font-bold ${titleClass}`}>{strategy}</h3>
      <ul className="mt-3 flex flex-col gap-2 text-sm">
        {stakeholders.map((name) => (
          <li key={name} className="flex items-start gap-2 leading-snug">
            <span className={`mt-1.5 size-2 shrink-0 rounded-full ${dotClass}`} aria-hidden />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function StakeholderMatrixGrid() {
  const byPos = (row: 1 | 2, col: 1 | 2) =>
    stakeholderQuadrants.find((q) => q.gridRow === row && q.gridCol === col)!

  const q11 = byPos(1, 1)
  const q12 = byPos(1, 2)
  const q21 = byPos(2, 1)
  const q22 = byPos(2, 2)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        <div
          className="text-muted-foreground flex w-full flex-row items-center justify-center gap-2 text-xs font-semibold tracking-wide lg:w-8 lg:flex-col lg:justify-between lg:py-6 lg:pb-10"
          aria-hidden
        >
          <span className="lg:[writing-mode:vertical-rl] lg:rotate-180">High</span>
          <span className="max-lg:hidden lg:[writing-mode:vertical-rl] lg:rotate-180 lg:text-[11px] lg:font-bold lg:text-foreground">
            Power
          </span>
          <span className="lg:[writing-mode:vertical-rl] lg:rotate-180">Low</span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground mb-2 text-center text-xs font-medium lg:hidden">Power: High → Low (top to bottom)</p>
          <div
            className="border-border grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-300 dark:border-slate-600 dark:bg-slate-600 sm:grid-cols-2"
            role="img"
            aria-label="Stakeholder power and interest matrix with four quadrants"
          >
            <QuadrantCell
              strategy={q11.strategy}
              stakeholders={q11.stakeholders}
              dotClass={q11.dotClass}
              panelClass={q11.panelClass}
              titleClass={q11.titleClass}
            />
            <QuadrantCell
              strategy={q12.strategy}
              stakeholders={q12.stakeholders}
              dotClass={q12.dotClass}
              panelClass={q12.panelClass}
              titleClass={q12.titleClass}
            />
            <QuadrantCell
              strategy={q21.strategy}
              stakeholders={q21.stakeholders}
              dotClass={q21.dotClass}
              panelClass={q21.panelClass}
              titleClass={q21.titleClass}
            />
            <QuadrantCell
              strategy={q22.strategy}
              stakeholders={q22.stakeholders}
              dotClass={q22.dotClass}
              panelClass={q22.panelClass}
              titleClass={q22.titleClass}
            />
          </div>

          <div className="text-muted-foreground mt-2 flex justify-between px-1 text-xs font-semibold">
            <span>Low interest / influence</span>
            <span>High interest / influence</span>
          </div>
          <p className="text-muted-foreground mt-1 text-center text-xs">Interest (horizontal axis)</p>
        </div>
      </div>

      <div
        className="border-border bg-muted/30 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border px-4 py-3 text-xs"
        role="list"
        aria-label="Quadrant legend"
      >
        <span className="text-muted-foreground font-semibold">Legend</span>
        {stakeholderQuadrants.map((q) => (
          <span key={q.key} className="inline-flex items-center gap-2" role="listitem">
            <span className={`size-2.5 shrink-0 rounded-full ${q.dotClass}`} aria-hidden />
            <span>{q.strategy}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
