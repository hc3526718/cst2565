"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { Button, Card } from "@heroui/react"
import { fourFieldsPhases, type FourFieldsPhase } from "@/lib/data"

function HoverTip({ text, detail, x, y }: { text: string; detail?: string; x: number; y: number }) {
  if (typeof document === "undefined") return null
  return createPortal(
    <div
      className="border-border bg-popover text-popover-foreground pointer-events-none fixed z-[10000] max-w-md rounded-md border px-3 py-2 text-xs shadow-lg"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, calc(-100% - 8px))",
      }}
    >
      <p className="font-semibold leading-snug">{text}</p>
      {detail && <p className="text-muted-foreground mt-2 leading-snug">{detail}</p>}
    </div>,
    document.body
  )
}

function Hoverable({
  children,
  text,
  detail,
  className = "",
}: {
  children: React.ReactNode
  text: string
  detail?: string
  className?: string
}) {
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null)
  return (
    <>
      {tip && <HoverTip text={text} detail={detail} x={tip.x} y={tip.y} />}
      <div
        role="button"
        tabIndex={0}
        className={`cursor-default outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
        onMouseEnter={(e) => {
          const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
          setTip({ x: r.left + r.width / 2, y: r.top })
        }}
        onMouseLeave={() => setTip(null)}
        onFocus={(e) => {
          const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
          setTip({ x: r.left + r.width / 2, y: r.top })
        }}
        onBlur={() => setTip(null)}
      >
        {children}
      </div>
    </>
  )
}

function PhaseDiagram({ phase }: { phase: FourFieldsPhase }) {
  return (
    <div className="flex gap-2">
      <div
        className="flex w-8 shrink-0 items-center justify-center rounded-md px-1 text-[10px] font-bold tracking-wide text-white sm:w-10 sm:text-xs"
        style={{
          background:
            phase.key === "early"
              ? "#2e7d32"
              : phase.key === "discussion"
                ? "#1565c0"
                : phase.key === "checking"
                  ? "#6a1b9a"
                  : "#00695c",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        {phase.leftLabel}
      </div>

      <div className="min-w-0 flex-1 space-y-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {phase.headers.map((h) => (
            <div
              key={h}
              className="rounded-md border border-sky-200 bg-sky-100 px-2 py-2 text-center text-xs font-semibold text-sky-950"
            >
              {h}
            </div>
          ))}
        </div>

        {phase.milestones.map((m, i) => (
          <Hoverable key={i} text={m.text} detail={m.detail} className="block w-full">
            <div className="rounded-md border border-red-300 bg-red-200/80 px-3 py-2 text-center text-xs font-medium text-red-950">
              {m.text}
            </div>
          </Hoverable>
        ))}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {phase.lanes.map((lane) => (
            <div key={lane.name} className="flex flex-col gap-2">
              {lane.tasks.map((t, i) => (
                <Hoverable key={i} text={t.text} detail={t.detail} className="block">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-full rounded-md border border-stone-300 bg-stone-50 px-2 py-2 text-[11px] leading-snug text-stone-900 shadow-sm">
                      {t.text}
                    </div>
                    {i < lane.tasks.length - 1 && <span className="text-muted-foreground text-lg">↓</span>}
                  </div>
                </Hoverable>
              ))}
            </div>
          ))}
        </div>

        {phase.wideBox && (
          <Hoverable text={phase.wideBox.text} detail={phase.wideBox.detail} className="block">
            <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-3 text-xs leading-snug text-amber-950">
              {phase.wideBox.text}
            </div>
          </Hoverable>
        )}

        {phase.gate && (
          <div className="flex flex-col items-center gap-2">
            <Hoverable text={`${phase.gate.name} — decision gate`} detail={phase.gate.detail}>
              <div className="flex size-16 rotate-45 items-center justify-center border-2 border-stone-600 bg-white text-[10px] font-bold leading-tight shadow-sm">
                <span className="-rotate-45 px-1 text-center">{phase.gate.name}</span>
              </div>
            </Hoverable>
            {phase.gateCriteria && (
              <div className="w-full rounded-md border border-indigo-200 bg-indigo-50/90 px-3 py-3 text-xs text-indigo-950">
                <p className="font-semibold">Gate criteria</p>
                <ol className="mt-2 list-decimal space-y-1 pl-4">
                  {phase.gateCriteria.map((c, i) => (
                    <Hoverable key={i} text={c} className="block">
                      <li className="cursor-default leading-snug">{c}</li>
                    </Hoverable>
                  ))}
                </ol>
              </div>
            )}
            {phase.standards && (
              <div className="w-full rounded-md border border-pink-200 bg-pink-50/90 px-3 py-3 text-xs text-pink-950">
                <p className="font-semibold">Standards</p>
                <ol className="mt-2 list-decimal space-y-1 pl-4">
                  {phase.standards.map((c, i) => (
                    <Hoverable key={i} text={c} className="block">
                      <li className="cursor-default leading-snug">{c}</li>
                    </Hoverable>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className="flex w-8 shrink-0 items-center justify-center rounded-md px-1 text-[9px] font-medium leading-tight text-white sm:w-10 sm:text-[10px]"
        style={{
          background: "#ad1457",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        {phase.rightLabel}
      </div>
    </div>
  )
}

export function FourFieldsMapTabs() {
  const [active, setActive] = useState(fourFieldsPhases[0]!.key)
  const phase = fourFieldsPhases.find((p) => p.key === active) ?? fourFieldsPhases[0]!

  return (
    <Card className="border-border shadow-sm">
      <Card.Content className="p-4">
        <div className="flex flex-wrap gap-2 border-b pb-3">
          {fourFieldsPhases.map((p) => (
            <Button
              key={p.key}
              size="sm"
              variant={active === p.key ? "primary" : "ghost"}
              className="text-xs"
              onPress={() => setActive(p.key)}
            >
              {p.label}
            </Button>
          ))}
        </div>
        <div className="mt-4">
          <PhaseDiagram phase={phase} />
        </div>
      </Card.Content>
    </Card>
  )
}
