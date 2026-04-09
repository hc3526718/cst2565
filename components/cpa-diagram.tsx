"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { cpaNodes, cpaCriticalPath, cpaProjectDuration, type CPANode } from "@/lib/data"

const box =
  "rounded-md border-2 px-3 py-2 text-left shadow-sm transition-shadow hover:shadow-md w-[160px] sm:w-[170px]"
const boxStyle = {
  backgroundColor: "#f5ebe0",
  borderColor: "#8b4513",
  color: "#3d2817",
} as const

function NodeBox({
  node,
  onHover,
}: {
  node: CPANode
  onHover: (p: { node: CPANode; x: number; y: number } | null) => void
}) {
  return (
    <button
      type="button"
      className={`${box} cursor-default font-sans text-xs`}
      style={boxStyle}
      onMouseEnter={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        onHover({ node, x: r.left + r.width / 2, y: r.top })
      }}
      onMouseLeave={() => onHover(null)}
      onFocus={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        onHover({ node, x: r.left + r.width / 2, y: r.top })
      }}
      onBlur={() => onHover(null)}
    >
      <div className="border-[#8b4513]/40 border-b pb-1 font-bold">{node.id}</div>
      <div className="pt-1 font-semibold leading-tight">{node.title}</div>
      <div className="mt-1 space-y-0.5 border-t border-[#8b4513]/30 pt-1 text-[10px] leading-snug">
        <div>Dur: {node.duration}</div>
        <div>
          ES {node.es} · EF {node.ef}
        </div>
        <div>
          LS {node.ls} · LF {node.lf}
        </div>
        <div>Float: {node.float}</div>
      </div>
    </button>
  )
}

function Tip({ node, x, y }: { node: CPANode; x: number; y: number }) {
  if (typeof document === "undefined") return null
  return createPortal(
    <div
      className="border-border bg-popover text-popover-foreground pointer-events-none fixed z-[10000] max-w-sm rounded-md border px-3 py-2 text-xs shadow-lg"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, calc(-100% - 8px))",
      }}
    >
      <p className="font-semibold">
        {node.id} — {node.title}
      </p>
      <p className="text-muted-foreground mt-1 tabular-nums">
        Duration {node.duration} · ES/EF {node.es} → {node.ef} · LS/LF {node.ls} → {node.lf} · Float {node.float}
      </p>
      {node.detail && <p className="mt-2 leading-snug">{node.detail}</p>}
    </div>,
    document.body
  )
}

function Arrow({ className = "" }: { className?: string }) {
  return <span className={`text-[#8b4513] text-lg font-bold ${className}`}>→</span>
}

export function CPADiagram() {
  const [hover, setHover] = useState<{ node: CPANode; x: number; y: number } | null>(null)

  const n = (id: string) => cpaNodes.find((x) => x.id === id)!
  const N1 = n("N1")
  const N2 = n("N2")
  const N3 = n("N3")
  const N4 = n("N4")
  const N5 = n("N5")
  const N6 = n("N6")
  const N7 = n("N7")

  return (
    <div className="flex flex-col gap-6">
      {hover && <Tip node={hover.node} x={hover.x} y={hover.y} />}

      <p className="text-muted-foreground text-sm">
        N3 and N4 run in parallel after N2. Hover any node for full CPA context (anchored to that box).
      </p>

      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-wrap items-start justify-center gap-2">
          <NodeBox node={N1} onHover={setHover} />
          <Arrow />
          <NodeBox node={N2} onHover={setHover} />
          <Arrow />
          <NodeBox node={N3} onHover={setHover} />
          <Arrow />
          <NodeBox node={N4} onHover={setHover} />
        </div>

        <div className="text-[#8b4513] text-2xl leading-none">↓</div>

        <div className="flex flex-wrap items-start justify-center gap-2">
          <NodeBox node={N5} onHover={setHover} />
          <Arrow />
          <NodeBox node={N6} onHover={setHover} />
          <Arrow />
          <NodeBox node={N7} onHover={setHover} />
        </div>
      </div>

      <div
        className="rounded-lg border-2 px-4 py-3 text-sm"
        style={{ ...boxStyle, backgroundColor: "#ede4d7" }}
      >
        <p className="font-semibold">Critical path</p>
        <p className="mt-1 font-mono text-xs">{cpaCriticalPath}</p>
        <p className="mt-2 font-semibold">Total project duration</p>
        <p className="mt-1">{cpaProjectDuration}</p>
      </div>
    </div>
  )
}
