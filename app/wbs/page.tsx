import { Card } from "@heroui/react"
import { WBSTree } from "@/components/wbs-tree"

export default function WBSPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Work Breakdown Structure</h1>
        <p className="text-muted-foreground">
          Smart Home Project (1.0) — twelve level-1 branches with level-2 deliverables. Hover any work package
          for a quick caption (anchored to that row).
        </p>
      </div>

      <Card className="border-border shadow-sm">
        <Card.Header>
          <Card.Title>WBS hierarchy</Card.Title>
          <Card.Description>Aligned to report structure & Assignment 2 scope</Card.Description>
        </Card.Header>
        <Card.Content>
          <WBSTree />
        </Card.Content>
      </Card>
    </div>
  )
}
