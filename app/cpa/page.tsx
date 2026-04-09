import { Card } from "@heroui/react"
import { CPADiagram } from "@/components/cpa-diagram"

export default function CPAPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Critical Path Analysis</h1>
        <p className="text-muted-foreground">
          Assignment 2 node diagram — ES, EF, LS, LF and float (20 Mar – 10 Apr 2026). Hover each node for
          details; tooltips align to the node under the pointer.
        </p>
      </div>

      <Card className="border-border shadow-sm">
        <Card.Header>
          <Card.Title>CPA network</Card.Title>
          <Card.Description>Critical path sequence N1 → N7 · N3 ∥ N4 parallel window</Card.Description>
        </Card.Header>
        <Card.Content>
          <CPADiagram />
        </Card.Content>
      </Card>
    </div>
  )
}
