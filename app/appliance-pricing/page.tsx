import { AppliancePricingTabs } from "@/components/appliance-pricing-tabs"

export default function AppliancePricingPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Smart device property pricing</h1>
        <p className="text-muted-foreground mt-1 max-w-3xl text-sm leading-relaxed">
          Appliance breakdowns (parts, GBP). Use the tabs to switch property type — the starter home list loads first.
          Each view matches the project spreadsheets (essentials, extras, and totals).
        </p>
      </div>

      <AppliancePricingTabs />
    </div>
  )
}
