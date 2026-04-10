"use client"

import { useMemo, useState } from "react"
import { Button, Card } from "@heroui/react"
import { PropertyPricingBlock } from "@/components/property-pricing-tables"
import { propertyAppliancePricing } from "@/lib/property-appliance-pricing"

const TABS = [
  { id: "starter" as const, label: "Starter home (2-bed)" },
  { id: "family" as const, label: "Family home (4-bed)" },
  { id: "shared" as const, label: "Shared accommodation (14-person)" },
]

export function AppliancePricingTabs() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("starter")

  const selected = useMemo(
    () => propertyAppliancePricing.find((p) => p.id === active) ?? propertyAppliancePricing[0]!,
    [active]
  )

  return (
    <Card className="border-border shadow-sm">
      <Card.Content className="p-4">
        <div className="flex flex-wrap gap-2 border-border border-b pb-3">
          {TABS.map((tab) => (
            <Button
              key={tab.id}
              size="sm"
              variant={active === tab.id ? "primary" : "ghost"}
              className="text-xs"
              onPress={() => setActive(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <div className="mt-4">
          <PropertyPricingBlock data={selected} embedded />
        </div>
      </Card.Content>
    </Card>
  )
}
