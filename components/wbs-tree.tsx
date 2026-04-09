"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { wbsStructured } from "@/lib/data"

function Tip({ text, x, y }: { text: string; x: number; y: number }) {
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
      {text}
    </div>,
    document.body
  )
}

function WpButton({
  id,
  title,
  onHover,
}: {
  id: string
  title: string
  onHover: (text: string | null, el: HTMLElement | null) => void
}) {
  return (
    <button
      type="button"
      className="hover:bg-sky-100/90 w-full rounded-md border border-sky-200/80 bg-sky-50 px-2 py-1.5 text-center text-[11px] leading-snug text-slate-900"
      onMouseEnter={(e) => onHover(`${id} · ${title}`, e.currentTarget)}
      onMouseLeave={() => onHover(null, null)}
      onFocus={(e) => onHover(`${id} · ${title}`, e.currentTarget)}
      onBlur={() => onHover(null, null)}
    >
      <span className="font-mono text-[10px] text-slate-500">{id}</span>
      <br />
      <span>{title}</span>
    </button>
  )
}

export function WBSTree() {
  const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(null)

  const showTip = (text: string | null, el: HTMLElement | null) => {
    if (!text || !el) {
      setTip(null)
      return
    }
    const r = el.getBoundingClientRect()
    setTip({ text, x: r.left + r.width / 2, y: r.top })
  }

  return (
    <div className="space-y-6">
      {tip && <Tip text={tip.text} x={tip.x} y={tip.y} />}

      <div className="flex flex-col items-center gap-2">
        <div className="w-full max-w-2xl rounded-lg border-2 border-slate-900 bg-slate-900 px-4 py-3 text-center text-sm font-bold text-white">
          {wbsStructured.projectTitle}
        </div>
        <div className="h-3 w-px bg-slate-800" aria-hidden />
        <div className="h-px w-[min(100%,72rem)] bg-slate-800" aria-hidden />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {wbsStructured.activities.map((activity) => (
          <div key={activity.id} className="flex min-w-0 flex-col items-center gap-2">
            <div className="h-3 w-px shrink-0 bg-slate-800" aria-hidden />
            <div className="w-full rounded-lg border-2 border-slate-900 bg-slate-900 px-2 py-2.5 text-center text-xs font-semibold text-white">
              <span className="font-mono text-sky-200">{activity.id}</span> {activity.title}
            </div>
            <div className="h-2 w-px bg-slate-800" aria-hidden />
            <div className="grid w-full min-w-0 gap-2 sm:grid-cols-3">
              {activity.tasks.map((task) => (
                <div key={task.id} className="flex min-w-0 flex-col items-center gap-1.5">
                  <div className="h-2 w-px bg-slate-800" aria-hidden />
                  <div className="w-full rounded-md border border-blue-900 bg-blue-700 px-1.5 py-2 text-center text-[11px] font-medium leading-tight text-white">
                    <span className="font-mono text-blue-100">{task.id}</span>
                    <br />
                    {task.title}
                  </div>
                  <div className="h-1.5 w-px grow bg-slate-800" aria-hidden />
                  <div className="flex w-full min-w-0 flex-col gap-1.5">
                    {task.workPackages.map((wp) => (
                      <WpButton key={wp.id} id={wp.id} title={wp.title} onHover={showTip} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
