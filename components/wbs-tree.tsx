"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { Card } from "@heroui/react"
import { wbsTree } from "@/lib/data"

function Tip({ text, x, y }: { text: string; x: number; y: number }) {
  if (typeof document === "undefined") return null
  return createPortal(
    <div
      className="border-border bg-popover text-popover-foreground pointer-events-none fixed z-[10000] max-w-xs rounded-md border px-3 py-2 text-xs shadow-lg"
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

export function WBSTree() {
  const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(null)

  return (
    <div className="space-y-4">
      {tip && <Tip text={tip.text} x={tip.x} y={tip.y} />}

      <div className="rounded-lg border-2 border-slate-800 bg-slate-900 px-4 py-3 text-center text-sm font-bold text-white">
        Smart Home Project (1.0)
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {wbsTree.map((node) => (
          <Card key={node.id} className="border-border shadow-sm">
            <Card.Header className="border-b bg-slate-900 py-2 text-white">
              <Card.Title className="text-sm">
                {node.id} {node.title}
              </Card.Title>
            </Card.Header>
            <Card.Content className="pt-3">
              <ul className="space-y-1">
                {node.children.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      className="hover:bg-muted/80 w-full rounded border border-stone-200 bg-stone-100 px-2 py-1.5 text-left text-xs text-stone-900"
                      onMouseEnter={(e) => {
                        const r = e.currentTarget.getBoundingClientRect()
                        setTip({
                          text: `${node.id} · ${c}`,
                          x: r.left + r.width / 2,
                          y: r.top,
                        })
                      }}
                      onMouseLeave={() => setTip(null)}
                      onFocus={(e) => {
                        const r = e.currentTarget.getBoundingClientRect()
                        setTip({
                          text: `${node.id} · ${c}`,
                          x: r.left + r.width / 2,
                          y: r.top,
                        })
                      }}
                      onBlur={() => setTip(null)}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  )
}
