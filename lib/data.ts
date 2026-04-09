export interface TeamMember {
  name: string
  handle: string
  role: string
  files: string[]
  color: string
}

export interface GanttTask {
  id: string
  name: string
  owner: string
  startWeek: number
  startDay: number
  endWeek: number
  endDay: number
  category: string
  isMilestone?: boolean
}

export interface CostEntry {
  type: string
  perUnit: number
  units: number
  total: number
}

export interface Milestone {
  name: string
  week: number
  day: number
  status: "pending" | "in-progress" | "complete"
}

export const teamMembers: TeamMember[] = [
  {
    name: "Afsah",
    handle: "@NAME0x0",
    role: "Project Manager / Report Editor",
    files: ["01-project-management/", "05-minutes/", "Intro", "Conclusion"],
    color: "oklch(0.55 0.2 250)",
  },
  {
    name: "Jake",
    handle: "@JakeSajith",
    role: "Technical Lead — Family Homes",
    files: ["03-designs/family-home.md", "Protocol research", "Diagrams"],
    color: "oklch(0.6 0.18 165)",
  },
  {
    name: "Eeshitha",
    handle: "@Eeshitha-afk",
    role: "Technical Lead — Sheltered Accommodation",
    files: ["03-designs/sheltered-accommodation.md", "Security research"],
    color: "oklch(0.55 0.2 300)",
  },
  {
    name: "Syed",
    handle: "@Syed-Nihaal",
    role: "Technical Lead — Starter Homes & Costing",
    files: ["03-designs/starter-home.md", "Cost summary", "Appendices"],
    color: "oklch(0.62 0.18 55)",
  },
]

export const ganttTasks: GanttTask[] = [
  { id: "1.1.1", name: "Draft PID", owner: "Afsah", startWeek: 8, startDay: 1, endWeek: 8, endDay: 3, category: "Initiation" },
  { id: "1.1.2", name: "Create WBS", owner: "Jake", startWeek: 8, startDay: 2, endWeek: 8, endDay: 3, category: "Initiation" },
  { id: "1.1.3", name: "Create Gantt Chart", owner: "Afsah", startWeek: 8, startDay: 3, endWeek: 8, endDay: 4, category: "Initiation" },
  { id: "1.1.4", name: "Create 4-Fields Map", owner: "Afsah", startWeek: 8, startDay: 3, endWeek: 8, endDay: 5, category: "Initiation" },
  { id: "1.1.5", name: "Brainstorming Session", owner: "All", startWeek: 8, startDay: 1, endWeek: 8, endDay: 2, category: "Initiation" },
  { id: "M1", name: "Tutor Sign-Off", owner: "All", startWeek: 8, startDay: 5, endWeek: 8, endDay: 5, category: "Initiation", isMilestone: true },

  { id: "1.2.1", name: "Platform Comparison", owner: "Jake", startWeek: 9, startDay: 1, endWeek: 9, endDay: 3, category: "Research" },
  { id: "1.2.3", name: "Protocols Research", owner: "Jake", startWeek: 9, startDay: 1, endWeek: 9, endDay: 3, category: "Research" },
  { id: "1.2.2a", name: "Devices: Heating & HVAC", owner: "Syed", startWeek: 9, startDay: 1, endWeek: 9, endDay: 3, category: "Research" },
  { id: "1.2.2b", name: "Devices: Security & Access", owner: "Eeshitha", startWeek: 9, startDay: 1, endWeek: 9, endDay: 3, category: "Research" },
  { id: "1.2.2c", name: "Devices: Lighting", owner: "Syed", startWeek: 9, startDay: 2, endWeek: 9, endDay: 3, category: "Research" },
  { id: "1.2.2d", name: "Devices: Sensors", owner: "Jake", startWeek: 9, startDay: 2, endWeek: 9, endDay: 4, category: "Research" },
  { id: "1.2.2e", name: "Assistive Tech Survey", owner: "Eeshitha", startWeek: 9, startDay: 2, endWeek: 9, endDay: 5, category: "Research" },
  { id: "1.2.2f", name: "Energy & Solar Survey", owner: "Syed", startWeek: 9, startDay: 2, endWeek: 9, endDay: 4, category: "Research" },
  { id: "1.2.4", name: "Security & Privacy", owner: "Eeshitha", startWeek: 9, startDay: 3, endWeek: 9, endDay: 5, category: "Research" },
  { id: "1.2.5", name: "UK Regulatory Research", owner: "Afsah", startWeek: 9, startDay: 3, endWeek: 9, endDay: 5, category: "Research" },
  { id: "M2", name: "Research Complete", owner: "All", startWeek: 9, startDay: 5, endWeek: 9, endDay: 5, category: "Research", isMilestone: true },

  { id: "1.3.1", name: "Family Home Persona", owner: "Jake", startWeek: 10, startDay: 1, endWeek: 10, endDay: 1, category: "Design: Family" },
  { id: "1.3.2", name: "Platform Selection", owner: "Jake", startWeek: 10, startDay: 1, endWeek: 10, endDay: 2, category: "Design: Family" },
  { id: "1.3.3", name: "Device Selection + Prices", owner: "Jake", startWeek: 10, startDay: 2, endWeek: 10, endDay: 4, category: "Design: Family" },
  { id: "1.3.4", name: "Solar Integration", owner: "Jake", startWeek: 10, startDay: 3, endWeek: 10, endDay: 4, category: "Design: Family" },
  { id: "1.3.5", name: "Network Diagram", owner: "Jake", startWeek: 10, startDay: 4, endWeek: 10, endDay: 5, category: "Design: Family" },
  { id: "1.3.6", name: "Cost Table (Family)", owner: "Jake", startWeek: 10, startDay: 4, endWeek: 10, endDay: 5, category: "Design: Family" },

  { id: "1.4.1a", name: "Elderly Resident Persona", owner: "Eeshitha", startWeek: 10, startDay: 1, endWeek: 10, endDay: 1, category: "Design: Sheltered" },
  { id: "1.4.1b", name: "Warden Persona", owner: "Eeshitha", startWeek: 10, startDay: 1, endWeek: 10, endDay: 2, category: "Design: Sheltered" },
  { id: "1.4.2", name: "Assistive Tech Selection", owner: "Eeshitha", startWeek: 10, startDay: 2, endWeek: 11, endDay: 2, category: "Design: Sheltered" },
  { id: "1.4.3", name: "Platform (Accessibility)", owner: "Eeshitha", startWeek: 10, startDay: 3, endWeek: 11, endDay: 2, category: "Design: Sheltered" },
  { id: "1.4.4", name: "Warden Dashboard", owner: "Eeshitha", startWeek: 11, startDay: 1, endWeek: 11, endDay: 3, category: "Design: Sheltered" },
  { id: "1.4.5", name: "Device Selection (Rooms)", owner: "Eeshitha", startWeek: 11, startDay: 2, endWeek: 11, endDay: 4, category: "Design: Sheltered" },
  { id: "1.4.7", name: "Network Diagram", owner: "Eeshitha", startWeek: 11, startDay: 3, endWeek: 11, endDay: 5, category: "Design: Sheltered" },
  { id: "1.4.8", name: "Cost Table (Sheltered)", owner: "Eeshitha", startWeek: 11, startDay: 4, endWeek: 11, endDay: 5, category: "Design: Sheltered" },

  { id: "1.5.1", name: "First-Time Buyer Persona", owner: "Syed", startWeek: 10, startDay: 1, endWeek: 10, endDay: 1, category: "Design: Starter" },
  { id: "1.5.2", name: "Platform (Cost-Optimised)", owner: "Syed", startWeek: 10, startDay: 1, endWeek: 10, endDay: 2, category: "Design: Starter" },
  { id: "1.5.3", name: "Essential vs Optional Tiers", owner: "Syed", startWeek: 10, startDay: 2, endWeek: 10, endDay: 5, category: "Design: Starter" },
  { id: "1.5.5", name: "Network Diagram", owner: "Syed", startWeek: 11, startDay: 1, endWeek: 11, endDay: 2, category: "Design: Starter" },
  { id: "1.5.6", name: "Cost Table (Starter)", owner: "Syed", startWeek: 11, startDay: 2, endWeek: 11, endDay: 4, category: "Design: Starter" },

  { id: "1.6.1", name: "Estate-Wide Cost Summary", owner: "Syed", startWeek: 11, startDay: 3, endWeek: 11, endDay: 4, category: "Cost-Benefit" },
  { id: "1.6.2", name: "Tangible Benefits", owner: "Syed", startWeek: 11, startDay: 4, endWeek: 11, endDay: 5, category: "Cost-Benefit" },
  { id: "1.6.3", name: "Intangible Benefits", owner: "Afsah", startWeek: 11, startDay: 4, endWeek: 11, endDay: 5, category: "Cost-Benefit" },
  { id: "1.6.4", name: "ROI / Payback Period", owner: "Syed", startWeek: 11, startDay: 5, endWeek: 11, endDay: 5, category: "Cost-Benefit" },
  { id: "1.6.5", name: "Additional Features", owner: "Syed", startWeek: 11, startDay: 3, endWeek: 11, endDay: 5, category: "Cost-Benefit" },
  { id: "M3", name: "All Designs Complete", owner: "All", startWeek: 11, startDay: 5, endWeek: 11, endDay: 5, category: "Cost-Benefit", isMilestone: true },

  { id: "1.7.1", name: "Write: Intro & Stakeholders", owner: "Afsah", startWeek: 12, startDay: 1, endWeek: 12, endDay: 1, category: "Report" },
  { id: "1.7.2", name: "Write: Brainstorming", owner: "Afsah", startWeek: 12, startDay: 1, endWeek: 12, endDay: 1, category: "Report" },
  { id: "1.7.3", name: "Write: PM Artefacts", owner: "Afsah", startWeek: 12, startDay: 1, endWeek: 12, endDay: 2, category: "Report" },
  { id: "1.7.4", name: "Write: Design Sections", owner: "All", startWeek: 12, startDay: 1, endWeek: 12, endDay: 2, category: "Report" },
  { id: "1.7.5", name: "Write: Costing", owner: "Syed", startWeek: 12, startDay: 2, endWeek: 12, endDay: 2, category: "Report" },
  { id: "1.7.6", name: "Write: Additional Features", owner: "Syed", startWeek: 12, startDay: 2, endWeek: 12, endDay: 3, category: "Report" },
  { id: "1.7.7", name: "Write: Conclusion", owner: "Afsah", startWeek: 12, startDay: 3, endWeek: 12, endDay: 3, category: "Report" },
  { id: "1.7.8", name: "Compile Appendix", owner: "Syed", startWeek: 12, startDay: 2, endWeek: 12, endDay: 3, category: "Report" },
  { id: "1.7.9", name: "Peer Review", owner: "All", startWeek: 12, startDay: 3, endWeek: 12, endDay: 3, category: "Report" },
  { id: "1.7.10", name: "Formatting & Proofreading", owner: "Afsah", startWeek: 12, startDay: 3, endWeek: 12, endDay: 4, category: "Report" },
  { id: "M4", name: "Report Draft Complete", owner: "All", startWeek: 12, startDay: 4, endWeek: 12, endDay: 4, category: "Report", isMilestone: true },

  { id: "1.8.1", name: "Design Slides", owner: "All", startWeek: 12, startDay: 3, endWeek: 12, endDay: 3, category: "Presentation" },
  { id: "1.8.2", name: "Prepare Visual Aids", owner: "All", startWeek: 12, startDay: 3, endWeek: 12, endDay: 4, category: "Presentation" },
  { id: "1.8.3", name: "Rehearsal (Timed)", owner: "All", startWeek: 12, startDay: 5, endWeek: 12, endDay: 5, category: "Presentation" },
  { id: "M5", name: "Final Submission", owner: "All", startWeek: 12, startDay: 5, endWeek: 12, endDay: 5, category: "Presentation", isMilestone: true },
]

export const costData: CostEntry[] = [
  { type: "4-Bed Family Home", perUnit: 4814, units: 6, total: 28884 },
  { type: "Sheltered Accommodation", perUnit: 26037, units: 1, total: 26037 },
  { type: "2-Bed Starter Home", perUnit: 961, units: 8, total: 7688 },
]

export const milestones: Milestone[] = [
  { name: "Tutor Sign-Off on PID & Plan", week: 8, day: 5, status: "pending" },
  { name: "Research Phase Complete", week: 9, day: 5, status: "pending" },
  { name: "All Designs Complete", week: 11, day: 5, status: "pending" },
  { name: "Report Draft Complete", week: 12, day: 4, status: "pending" },
  { name: "Final Report Submitted", week: 12, day: 5, status: "pending" },
  { name: "Presentation Delivered", week: 12, day: 5, status: "pending" },
]

export const TOTAL_ESTATE_COST = 62609
export const WEEKS = [8, 9, 10, 11, 12] as const
export const DAYS_PER_WEEK = 5
export const TOTAL_DAYS = WEEKS.length * DAYS_PER_WEEK

export function getOwnerColor(owner: string): string {
  const member = teamMembers.find((m) => m.name === owner)
  if (member) return member.color
  return "oklch(0.58 0.16 15)"
}

export function getDayOffset(week: number, day: number): number {
  return (week - 8) * DAYS_PER_WEEK + (day - 1)
}

export function getTaskWidth(task: GanttTask): number {
  const start = getDayOffset(task.startWeek, task.startDay)
  const end = getDayOffset(task.endWeek, task.endDay)
  return end - start + 1
}
