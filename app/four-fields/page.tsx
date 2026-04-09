import { FourFieldsMapTabs } from "@/components/four-fields-map"

export default function FourFieldsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Four Fields Map</h1>
        <p className="text-muted-foreground">
          All four PM stages on one page — use the tabs for Early, Discussion, Checking, and Completion. Swimlanes
          for Haydn, Mohammed, Mahari, and Nisar; hover tasks, gates, and standards for anchored detail.
        </p>
      </div>

      <FourFieldsMapTabs />
    </div>
  )
}
