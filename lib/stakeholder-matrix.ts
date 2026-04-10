/** Power / interest matrix — stakeholder analysis (CST2565 smart home project) */

export type StakeholderQuadrantKey = "keep-satisfied" | "manage-closely" | "monitor" | "keep-informed"

export type StakeholderQuadrant = {
  key: StakeholderQuadrantKey
  strategy: string
  /** Grid position: row 1 = high power, row 2 = low; col 1 = low interest, col 2 = high */
  gridRow: 1 | 2
  gridCol: 1 | 2
  stakeholders: string[]
  dotClass: string
  panelClass: string
  titleClass: string
}

export const stakeholderQuadrants: StakeholderQuadrant[] = [
  {
    key: "keep-satisfied",
    strategy: "Keep satisfied",
    gridRow: 1,
    gridCol: 1,
    stakeholders: [
      "Arch. firm owner / director",
      "Quantity surveyor",
      "Investors / developers",
      "Construction firm",
    ],
    dotClass: "bg-orange-500",
    panelClass: "bg-orange-50/90 dark:bg-orange-950/25",
    titleClass: "text-orange-800 dark:text-orange-200",
  },
  {
    key: "manage-closely",
    strategy: "Manage closely",
    gridRow: 1,
    gridCol: 2,
    stakeholders: [
      "Architects / design team",
      "Physical security provider",
      "Training facilitators",
    ],
    dotClass: "bg-green-600",
    panelClass: "bg-green-50/90 dark:bg-green-950/25",
    titleClass: "text-green-800 dark:text-green-200",
  },
  {
    key: "monitor",
    strategy: "Monitor",
    gridRow: 2,
    gridCol: 1,
    stakeholders: ["Neighbourhood residents"],
    dotClass: "bg-slate-400",
    panelClass: "bg-slate-100/90 dark:bg-slate-900/40",
    titleClass: "text-slate-700 dark:text-slate-300",
  },
  {
    key: "keep-informed",
    strategy: "Keep informed",
    gridRow: 2,
    gridCol: 2,
    stakeholders: [
      "Future apartment residents",
      "Future care home residents",
      "Care home owners / operators",
    ],
    dotClass: "bg-blue-600",
    panelClass: "bg-blue-50/90 dark:bg-blue-950/25",
    titleClass: "text-blue-800 dark:text-blue-200",
  },
]
