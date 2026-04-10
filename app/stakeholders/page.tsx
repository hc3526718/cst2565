import { Card } from "@heroui/react"
import { StakeholderMatrixGrid } from "@/components/stakeholder-matrix-grid"

export default function StakeholdersPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Stakeholder analysis</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl text-sm leading-relaxed">
          Power / interest matrix for the smart home development: how to engage each stakeholder group — manage closely,
          keep satisfied, keep informed, or monitor — aligned with the project PID.
        </p>
      </div>

      <Card className="border-border shadow-sm">
        <Card.Header>
          <Card.Title>Power / interest grid</Card.Title>
          <Card.Description>Eleven stakeholders across four engagement strategies</Card.Description>
        </Card.Header>
        <Card.Content>
          <StakeholderMatrixGrid />
        </Card.Content>
      </Card>
    </div>
  )
}
