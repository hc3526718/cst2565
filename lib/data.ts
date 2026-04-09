/** CST2565 Assignment 2 — Smart Home project (Mar–Apr 2026) */

const MS_PER_DAY = 86400000

/** Timeline anchor: 20 Mar 2026 (UTC date math, no DST issues) */
export const PROJECT_START_ISO = "2026-03-20"
export const PROJECT_END_ISO = "2026-04-10"

export function dayIndexFromIso(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number)
  const t = Date.UTC(y, m - 1, d)
  const a0 = Date.UTC(2026, 2, 20)
  return Math.round((t - a0) / MS_PER_DAY)
}

export function formatShortDate(iso: string): string {
  const [y, mo, d] = iso.split("-").map(Number)
  return new Date(Date.UTC(y, mo - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}

export const TIMELINE_DAYS: string[] = (() => {
  const out: string[] = []
  const start = Date.UTC(2026, 2, 20)
  for (let i = 0; i <= 21; i++) {
    const t = new Date(start + i * MS_PER_DAY)
    const y = t.getUTCFullYear()
    const m = String(t.getUTCMonth() + 1).padStart(2, "0")
    const d = String(t.getUTCDate()).padStart(2, "0")
    out.push(`${y}-${m}-${d}`)
  }
  return out
})()

export const TOTAL_TIMELINE_DAYS = TIMELINE_DAYS.length

export interface TeamMember {
  name: string
  handle: string
  role: string
  files: string[]
  color: string
}

export const teamMembers: TeamMember[] = [
  {
    name: "Mahari",
    handle: "@mahari",
    role: "PID, stakeholders, WBS, PM tools, benefits/costs, Appendix C",
    files: ["PID & scope", "WBS (draw.io)", "Stakeholder grid", "Section 17", "Appendix C"],
    color: "oklch(0.42 0.09 55)",
  },
  {
    name: "Mohammed",
    handle: "@mohammed",
    role: "Gantt & CPA, review & conclusion, device validation",
    files: ["Activity list & Gantt", "CPA diagram", "Review / Conclusion"],
    color: "oklch(0.42 0.08 165)",
  },
  {
    name: "Nisar",
    handle: "@nisar",
    role: "Introduction, 4-field maps, integration & cyber, final sign-off",
    files: ["Intro & brief", "4-Field Maps", "Integration section", "Final upload"],
    color: "oklch(0.45 0.15 290)",
  },
  {
    name: "Haydn",
    handle: "@haydn",
    role: "Systems research, floor plans, costing, appendices, LabVIEW datasheet",
    files: ["Devices & protocols", "Floor plans", "Costing tables", "Appendices A/B"],
    color: "oklch(0.48 0.16 250)",
  },
]

export const OWNER_COLORS: Record<string, string> = {
  Mahari: "oklch(0.42 0.09 55)",
  Mohammed: "oklch(0.42 0.08 165)",
  Nisar: "oklch(0.45 0.15 290)",
  Haydn: "oklch(0.48 0.16 250)",
  All: "oklch(0.38 0.02 0)",
}

export function ownerColor(owner: string): string {
  return OWNER_COLORS[owner] ?? "oklch(0.45 0.02 0)"
}

export interface GanttTask {
  id: string
  numericId?: number
  name: string
  owner: string
  startIso: string
  endIso: string
  category: string
  duration: string
  predecessors: string
  isMilestone?: boolean
  isMeetingMarker?: boolean
}

export const fridayMeetingDayIndices = [0, 7, 14, 21] // Mar 20, 27; Apr 3, 10

export const ganttTasks: GanttTask[] = [
  {
    id: "M1",
    name: "Milestone M1 — Phase 1 complete",
    owner: "All",
    startIso: "2026-03-21",
    endIso: "2026-03-21",
    category: "Phase 1 — Project kick-off & planning",
    duration: "—",
    predecessors: "—",
    isMilestone: true,
  },
  { id: "1", numericId: 1, name: "Project kick-off meeting & task allocation", owner: "All", startIso: "2026-03-20", endIso: "2026-03-20", category: "Phase 1 — Project kick-off & planning", duration: "1 day", predecessors: "—" },
  { id: "2", numericId: 2, name: "Shared document setup, file naming & section headings", owner: "All", startIso: "2026-03-20", endIso: "2026-03-21", category: "Phase 1 — Project kick-off & planning", duration: "2 days", predecessors: "1" },

  { id: "M2", name: "Milestone M2 — Phase 2 complete", owner: "All", startIso: "2026-03-27", endIso: "2026-03-27", category: "Phase 2 — Research & early drafts", duration: "—", predecessors: "—", isMilestone: true },
  { id: "3", numericId: 3, name: "PID — executive summary, scope, objectives, risks & success criteria", owner: "Mahari", startIso: "2026-03-21", endIso: "2026-03-27", category: "Phase 2 — Research & early drafts", duration: "1 week", predecessors: "1, 2" },
  { id: "4", numericId: 4, name: "Stakeholder identification & power-interest grid (11 stakeholders)", owner: "Mahari", startIso: "2026-03-21", endIso: "2026-03-27", category: "Phase 2 — Research & early drafts", duration: "1 week", predecessors: "1, 2" },
  { id: "5", numericId: 5, name: "Project organisational structure diagram (draw.io)", owner: "Mahari", startIso: "2026-03-21", endIso: "2026-03-24", category: "Phase 2 — Research & early drafts", duration: "4 days", predecessors: "1, 2" },
  { id: "6", numericId: 6, name: "Introduction & project brief draft (three property types)", owner: "Nisar", startIso: "2026-03-21", endIso: "2026-03-27", category: "Phase 2 — Research & early drafts", duration: "1 week", predecessors: "1, 2" },
  { id: "7", numericId: 7, name: "Gantt chart activity list, dates & bar diagram (Excel)", owner: "Mohammed", startIso: "2026-03-22", endIso: "2026-03-27", category: "Phase 2 — Research & early drafts", duration: "1 week", predecessors: "1, 2" },
  { id: "8", numericId: 8, name: "Systems, devices & communication protocols research (Wi-Fi, Zigbee, Z-Wave, LabVIEW, Yale, Genius Hub, Alexa)", owner: "Haydn", startIso: "2026-03-21", endIso: "2026-03-27", category: "Phase 2 — Research & early drafts", duration: "1 week", predecessors: "1, 2" },

  { id: "M3", name: "Milestone M3 — Phases 3 & 4 gates", owner: "All", startIso: "2026-04-03", endIso: "2026-04-03", category: "Phase 3 — WBS, CPA, device selection & floor plans", duration: "—", predecessors: "—", isMilestone: true },
  { id: "9", numericId: 9, name: "Work Breakdown Structure — all 12 branches (draw.io)", owner: "Mahari", startIso: "2026-03-27", endIso: "2026-04-03", category: "Phase 3 — WBS, CPA, device selection & floor plans", duration: "1 week", predecessors: "3, 4, 5" },
  { id: "10", numericId: 10, name: "Critical Path Analysis — node diagram with ES, LS, EF, LF & float", owner: "Mohammed", startIso: "2026-03-27", endIso: "2026-04-03", category: "Phase 3 — WBS, CPA, device selection & floor plans", duration: "1 week", predecessors: "7" },
  { id: "11", numericId: 11, name: "4-Field Maps — all four project phases (draw.io)", owner: "Nisar", startIso: "2026-03-27", endIso: "2026-04-03", category: "Phase 3 — WBS, CPA, device selection & floor plans", duration: "1 week", predecessors: "6, 7" },
  { id: "12", numericId: 12, name: "2-bedroom starter home — device selection & colour-coded floor plan", owner: "Haydn", startIso: "2026-03-27", endIso: "2026-04-03", category: "Phase 3 — WBS, CPA, device selection & floor plans", duration: "1 week", predecessors: "8" },
  { id: "13", numericId: 13, name: "4-bedroom family home — device selection & colour-coded floor plan", owner: "Haydn", startIso: "2026-03-27", endIso: "2026-04-03", category: "Phase 3 — WBS, CPA, device selection & floor plans", duration: "1 week", predecessors: "8" },
  { id: "14", numericId: 14, name: "Sheltered accommodation — device selection, per-room & building plan", owner: "Haydn", startIso: "2026-03-27", endIso: "2026-04-03", category: "Phase 3 — WBS, CPA, device selection & floor plans", duration: "1 week", predecessors: "8" },

  { id: "15", numericId: 15, name: "Costing tables — all three property types (Excel, parts only in GBP)", owner: "Haydn", startIso: "2026-03-27", endIso: "2026-04-03", category: "Phase 4 — Costing, recommendations & drafting", duration: "1 week", predecessors: "12, 13, 14" },
  { id: "16", numericId: 16, name: "Overall recommendation, rationale sections & solar panel analysis", owner: "Haydn", startIso: "2026-03-27", endIso: "2026-04-03", category: "Phase 4 — Costing, recommendations & drafting", duration: "1 week", predecessors: "12, 13, 14, 15" },
  { id: "17", numericId: 17, name: "PM tools used section & benefits/costs with payback calculations", owner: "Mahari", startIso: "2026-03-27", endIso: "2026-04-03", category: "Phase 4 — Costing, recommendations & drafting", duration: "1 week", predecessors: "9" },
  { id: "18", numericId: 18, name: "Integration plan, implementation section & cyber incident response", owner: "Nisar", startIso: "2026-03-27", endIso: "2026-04-03", category: "Phase 4 — Costing, recommendations & drafting", duration: "1 week", predecessors: "11" },

  { id: "19", numericId: 19, name: "Review section — device validation against three PID requirements", owner: "Mohammed", startIso: "2026-04-03", endIso: "2026-04-06", category: "Phase 5 — Review, conclusion & appendices", duration: "3 days", predecessors: "10, 15, 16" },
  { id: "20", numericId: 20, name: "Conclusion — PM frameworks summary & improvement pathway", owner: "Mohammed", startIso: "2026-04-03", endIso: "2026-04-06", category: "Phase 5 — Review, conclusion & appendices", duration: "3 days", predecessors: "19" },
  { id: "21", numericId: 21, name: "Appendix B — LabVIEW technical datasheet (5 control areas, protocols)", owner: "Haydn", startIso: "2026-04-03", endIso: "2026-04-06", category: "Phase 5 — Review, conclusion & appendices", duration: "3 days", predecessors: "8, 16" },
  { id: "22", numericId: 22, name: "Appendix A — meeting minutes log (Meetings 1–7)", owner: "Haydn", startIso: "2026-04-03", endIso: "2026-04-06", category: "Phase 5 — Review, conclusion & appendices", duration: "3 days", predecessors: "19" },
  { id: "23", numericId: 23, name: "Appendix C — PM tools evidence & screenshots", owner: "Mahari", startIso: "2026-04-03", endIso: "2026-04-06", category: "Phase 5 — Review, conclusion & appendices", duration: "3 days", predecessors: "17" },

  { id: "M4", name: "Milestone M4 — Presentation rehearsal", owner: "All", startIso: "2026-04-09", endIso: "2026-04-09", category: "Phase 6 — References, proof-reading & sign-off", duration: "—", predecessors: "—", isMilestone: true },
  { id: "24", numericId: 24, name: "Full references list — 25+ Harvard sources cross-checked", owner: "All", startIso: "2026-04-05", endIso: "2026-04-09", category: "Phase 6 — References, proof-reading & sign-off", duration: "4 days", predecessors: "19, 20, 21" },
  { id: "25", numericId: 25, name: "Final proof-read, corrections & formatting check (all sections)", owner: "All", startIso: "2026-04-05", endIso: "2026-04-09", category: "Phase 6 — References, proof-reading & sign-off", duration: "4 days", predecessors: "20, 22, 23, 24" },
  { id: "26", numericId: 26, name: "Presentation slides preparation & full group rehearsal (9 Apr)", owner: "All", startIso: "2026-04-07", endIso: "2026-04-09", category: "Phase 6 — References, proof-reading & sign-off", duration: "3 days", predecessors: "25" },

  { id: "M5", name: "Milestone M5 — Submission & presentation", owner: "All", startIso: "2026-04-10", endIso: "2026-04-10", category: "Phase 6 — References, proof-reading & sign-off", duration: "—", predecessors: "—", isMilestone: true },
  { id: "27", numericId: 27, name: "Final sign-off & report submission upload", owner: "Nisar", startIso: "2026-04-09", endIso: "2026-04-09", category: "Phase 6 — References, proof-reading & sign-off", duration: "1 day", predecessors: "25, 26" },
  { id: "28", numericId: 28, name: "Group presentation & assessment", owner: "All", startIso: "2026-04-10", endIso: "2026-04-10", category: "Phase 6 — References, proof-reading & sign-off", duration: "1 day", predecessors: "27" },
]

export function taskBarSpan(task: GanttTask): { left: number; width: number } {
  const s = dayIndexFromIso(task.startIso)
  const e = dayIndexFromIso(task.endIso)
  const width = e - s + 1
  return { left: s, width: Math.max(width, task.isMilestone ? 0.15 : 0.5) }
}

/** Activity list rows (same data as Gantt, tabular export) */
export type ActivityRow = {
  id: string
  activity: string
  owner: string
  start: string
  finish: string
  duration: string
  predecessors: string
  phase: string
}

export const activityRows: ActivityRow[] = ganttTasks
  .filter((t) => !t.isMilestone)
  .map((t) => ({
    id: String(t.numericId ?? t.id),
    activity: t.name,
    owner: t.owner,
    start: formatShortDate(t.startIso),
    finish: formatShortDate(t.endIso),
    duration: t.duration,
    predecessors: t.predecessors,
    phase: t.category,
  }))

export interface CostEntry {
  type: string
  perUnit: number
  units: number
  total: number
}

const STARTER_PER_UNIT = 1805.03
const FAMILY_PER_UNIT = 3715.63
const SHARED_PER_UNIT = 26259.93
const STARTER_UNITS = 8
const FAMILY_UNITS = 6
const SHARED_UNITS = 1

export const costData: CostEntry[] = [
  {
    type: "Starter home",
    perUnit: STARTER_PER_UNIT,
    units: STARTER_UNITS,
    total: Math.round(STARTER_PER_UNIT * STARTER_UNITS * 100) / 100,
  },
  {
    type: "Family home",
    perUnit: FAMILY_PER_UNIT,
    units: FAMILY_UNITS,
    total: Math.round(FAMILY_PER_UNIT * FAMILY_UNITS * 100) / 100,
  },
  {
    type: "Shared / sheltered accommodation",
    perUnit: SHARED_PER_UNIT,
    units: SHARED_UNITS,
    total: Math.round(SHARED_PER_UNIT * SHARED_UNITS * 100) / 100,
  },
]

export const TOTAL_ESTATE_COST = costData.reduce((sum, c) => sum + c.total, 0)

export interface Milestone {
  name: string
  week: number
  day: number
  status: "pending" | "in-progress" | "complete"
}

export const milestones: Milestone[] = [
  { name: "M1 — Phase 1 complete (kick-off & planning)", week: 1, day: 2, status: "pending" },
  { name: "M2 — Phase 2 complete (research & drafts)", week: 2, day: 8, status: "pending" },
  { name: "M3 — WBS / CPA / costing / drafting gates", week: 3, day: 15, status: "pending" },
  { name: "M4 — Rehearsal (9 Apr)", week: 4, day: 21, status: "pending" },
  { name: "M5 — Submission & presentation (10 Apr)", week: 4, day: 22, status: "pending" },
]

/** CPA diagram nodes */
export interface CPANode {
  id: string
  title: string
  duration: string
  es: string
  ef: string
  ls: string
  lf: string
  float: string
  detail?: string
}

export const cpaNodes: CPANode[] = [
  { id: "N1", title: "Kick-off & planning", duration: "2d", es: "20 Mar", ef: "21 Mar", ls: "20 Mar", lf: "21 Mar", float: "0", detail: "Project initiation, roles, and shared documentation." },
  { id: "N2", title: "Research & early drafts", duration: "7d", es: "21 Mar", ef: "27 Mar", ls: "21 Mar", lf: "27 Mar", float: "0" },
  { id: "N3", title: "WBS, CPA & device selection", duration: "7d", es: "27 Mar", ef: "3 Apr", ls: "27 Mar", lf: "3 Apr", float: "0", detail: "Runs in parallel with N4 (costing & recommendations)." },
  { id: "N4", title: "Costing & recommendations", duration: "7d", es: "27 Mar", ef: "3 Apr", ls: "27 Mar", lf: "3 Apr", float: "0", detail: "Parallel path with N3." },
  { id: "N5", title: "Review & appendices", duration: "3d", es: "3 Apr", ef: "6 Apr", ls: "3 Apr", lf: "6 Apr", float: "0" },
  { id: "N6", title: "References & proof-reading", duration: "4d", es: "5 Apr", ef: "9 Apr", ls: "5 Apr", lf: "9 Apr", float: "0" },
  { id: "N7", title: "Sign-off & presentation", duration: "1d", es: "10 Apr", ef: "10 Apr", ls: "10 Apr", lf: "10 Apr", float: "0" },
]

export const cpaCriticalPath = "N1 → N2 → N3 → N4 → N5 → N6 → N7"
export const cpaProjectDuration = "21 calendar days (20 Mar – 10 Apr 2026)"

/** WBS — root → 12 primary branches (1.1–1.12) → work packages (1.x.y) */
export interface WBSWorkPackage {
  id: string
  title: string
}

export interface WBSSection {
  id: string
  title: string
  workPackages: WBSWorkPackage[]
}

export interface WBSStructure {
  projectTitle: string
  sections: WBSSection[]
}

function section(id: string, title: string, items: string[]): WBSSection {
  return {
    id,
    title,
    workPackages: items.map((t, i) => ({ id: `${id}.${i + 1}`, title: t })),
  }
}

/** Smart Home (1.0) — matches course WBS diagram (twelve level-1 nodes). */
export const wbsStructured: WBSStructure = {
  projectTitle: "Smart Home Project (1.0)",
  sections: [
    section("1.1", "Planning & Design", [
      "Project Brief & PID",
      "WBS & Gantt",
      "Success Criteria",
      "Scope & Objectives",
      "Risks & Mitigation",
      "Constraints",
    ]),
    section("1.2", "Stakeholders", [
      "11 Identified Stakeholders",
      "Close Management Strategy",
      "'Keep Informed' Strategy",
      "Power-Interest Grid",
      "'Keep Satisfied' Strategy",
      "'Monitor' Strategy",
    ]),
    section("1.3", "Platform Research", [
      "LABVIEW justification",
      "YALE Ecosystem",
      "Alternatives Researched and Rejected",
      "Solar Power System Compatibility",
      "Amazon System",
      "Genius Hub",
      "Mind Maps",
    ]),
    section("1.4", "Home Design", [
      "4-Bed Floor Plan",
      "Sheltered Accommodation Floor Plan",
      "Device Legend",
      "Device Rationale",
      "2-Bed Floor Plan",
      "Per-Room Floor Plan",
      "Colour-Coded Icons",
    ]),
    section("1.5", "Integration & Security", [
      "Protocol Research",
      "UK GDPR Compliance",
      "BS EN Compliance",
      "Ecosystem Integration",
      "Protocol Table",
      "4-Field Map",
    ]),
    section("1.6", "Costing", [
      "2-Bed: £1,805",
      "4-Bed: £3,715",
      "Sheltered Accommodation: £26,259",
      "Development Total: £62,993",
      "Essentials/Extras",
      "Benefits & ROI",
      "Payback Period",
    ]),
    section("1.7", "Control Systems", [
      "LABVIEW Overview",
      "Internal Lighting",
      "Fire/CO Alarm",
      "Temperature Control",
      "Security Logging",
      "PIR Sensor Spec",
      "Known Limitations",
    ]),
    section("1.8", "PM Tools", [
      "WBS Description",
      "Gantt Chart",
      "Critical Path",
      "4-Field Maps",
      "Power-Interest Grid",
      "PID Analysis",
    ]),
    section("1.9", "Training", [
      "Homeowner Guides",
      "Training Sessions",
      "Elderly Usability",
      "Warden Onboarding",
    ]),
    section("1.10", "Health & Safety", [
      "H&S Plan",
      "BS EN Fire Regulation",
      "Building Reg Part P",
      "CQC Care Standards",
      "Risk Assessment",
      "Health & Social Act",
    ]),
    section("1.11", "Presentation & Report", [
      "Introduction",
      "Device Review",
      "Conclusion",
      "25+ References",
      "Harvard Format",
      "Team Performance",
      "Org Structure",
    ]),
    section("1.12", "Appendices", [
      "Meeting Minutes",
      "LABVIEW Datasheet",
      "Pricing tables",
      "Genius Hub",
      "Peer Assessment",
      "Additional Datasheets",
    ]),
  ],
}

/** Flat list for exports / search */
export interface WBSNode {
  id: string
  title: string
  children: string[]
}

export const wbsTree: WBSNode[] = wbsStructured.sections.map((s) => ({
  id: s.id,
  title: s.title,
  children: s.workPackages.map((w) => w.title),
}))

/** Four Fields Map — per phase */
export type FourFieldsLane = { name: string; tasks: { text: string; detail?: string }[] }

export interface FourFieldsPhase {
  key: string
  label: string
  leftLabel: string
  rightLabel: string
  headers: string[]
  milestones: { text: string; detail?: string }[]
  lanes: FourFieldsLane[]
  gate?: { name: string; detail?: string }
  gateCriteria?: string[]
  standards?: string[]
  wideBox?: { text: string; detail?: string }
}

export const fourFieldsPhases: FourFieldsPhase[] = [
  {
    key: "early",
    label: "Early phase",
    leftLabel: "EARLY PHASE",
    rightLabel: "Standards — See research standards & ensure smart devices meet health & safety regs",
    headers: ["Haydn", "Mohammed", "Mahari", "Nisar"],
    milestones: [
      { text: "Initial Meetings — Kick-off & Assign Sections (20 March 2026)", detail: "Allocate sections and agree file structure." },
      { text: "Review Meeting (Friday 27 March 2026)", detail: "Weekly review of research progress." },
    ],
    lanes: [
      { name: "Haydn", tasks: [
        { text: "Research smart systems & protocols", detail: "Wi-Fi, Zigbee, Z-Wave, LabVIEW, Yale." },
        { text: "Look for smart devices for all homes" },
        { text: "Retrieve device pricing & references" },
        { text: "Review platform docs (LabVIEW, Yale)" },
      ]},
      { name: "Mohammed", tasks: [
        { text: "Draft activity list dates & durations" },
        { text: "Research UK H&S regulations & standards" },
        { text: "Check compliance BS 5839-6, BS EN 50131" },
        { text: "Confirm data protection compliance" },
      ]},
      { name: "Mahari", tasks: [
        { text: "Research project scope & PID criteria" },
        { text: "Identify stakeholders power-interest mapping" },
        { text: "Estimate budget per property type" },
        { text: "Review PM frameworks & WBS refs" },
      ]},
      { name: "Nisar", tasks: [
        { text: "Research project brief & client needs" },
        { text: "Find running costs of all smart devices" },
        { text: "Research building regs & solar standards" },
        { text: "Source references Harvard & PM texts" },
      ]},
    ],
    gate: { name: "Gate 1", detail: "Quality gate before detailed design." },
    gateCriteria: [
      "Do all smart devices meet health & safety requirements (BS 5839-6, BS EN 50131, Building Regs Part P)?",
      "Do the smart devices fit within the budget for each property type?",
      "Can cheaper compliant alternatives be identified before selection is finalised?",
    ],
    standards: [
      "Affordable devices found for each property type — 2-bed £1,805 / 4-bed £3,715 / sheltered £26,259",
      "Running & fixed costs verified — solar compatibility confirmed (MCS / IEC 61215 / G99 DNO)",
      "All research gathered: device references, regulations, Harvard sources & pricing before gate review",
      "Data Protection Act 2018 / UK GDPR / ISO 27001 & CQC care standards confirmed applicable",
    ],
  },
  {
    key: "discussion",
    label: "Discussion stage",
    leftLabel: "DISCUSSION STAGE",
    rightLabel: "Standards — See research standards & ensure smart devices meet H&S regulation & remain within budget",
    headers: ["Haydn", "Mohammed", "Mahari", "Nisar"],
    milestones: [
      { text: "Weekly Meeting — Fri 27 March 2026" },
      { text: "Weekly Meeting — Fri 3 April 2026" },
    ],
    lanes: [
      { name: "Haydn", tasks: [
        { text: "Consider solar panel integration — MCS, IEC 61215 & G99 DNO" },
        { text: "Evaluate sensors & protocols per home Wi-Fi, Zigbee, Z-Wave" },
        { text: "Choose best devices for 2-bed, 4-bed & sheltered housing" },
      ]},
      { name: "Mohammed", tasks: [
        { text: "Review Gantt & CPA confirm task sequence & no critical delays" },
        { text: "Draw risk assessment tech obsolescence, budget & cyber risks" },
        { text: "Begin review section & conclusion draft aligned to PID criteria" },
      ]},
      { name: "Mahari", tasks: [
        { text: "Check devices fit estimated budget per property type" },
        { text: "Apply stakeholder power-interest grid & PID scope review" },
        { text: "Finalise WBS branches & benefits / costs payback calculations" },
      ]},
      { name: "Nisar", tasks: [
        { text: "Identify integration issues — Alexa, Yale & Genius Hub" },
        { text: "Draw risk assessment usability & elderly resident safety risks" },
        { text: "Finalise introduction & 4-field map drafts for group sign-off" },
      ]},
    ],
    wideBox: {
      text: "Write report & prepare presentation slides — ALL members. Sign off assigned sections — peer review — confirm 25+ Harvard references. Slide content, timings & Q&A practice ahead of 10 April assessment.",
      detail: "Collaborative drafting and peer review before checking stage.",
    },
    gate: { name: "Gate 2" },
    gateCriteria: [
      "Do all Gate 1 criteria still hold? BS 5839-6:2019, BS EN 50131, Building Regs Part P & DPA 2018 all confirmed met",
      "Has device selection been reviewed and agreed at the Friday weekly meeting with tutor Rand Raheem?",
      "Are all three costing tables within budget? 2-bed £1,805.03 / 4-bed £3,715.63 / sheltered £26,259.93",
      "Is there sufficient research & rationale across all three property types for report drafting to proceed to the next phase?",
    ],
    standards: [
      "Smart devices must help reduce carbon footprint — solar panels compliant with MCS & IEC 61215 recommended across all property types",
      "Smart devices must facilitate residents’ lives — Alexa Drop In for sheltered, Genius Hub per-room heating meeting CQC 18°C minimum",
      "Smart devices must be user-friendly — Yale panic button (one press, no Wi-Fi), Echo Dot voice control deployed across all three property types",
      "Smart devices must be easy to implement — LabVIEW local server (no cloud), Yale Sync Hub single-supplier ecosystem simplifying compliance",
    ],
  },
  {
    key: "checking",
    label: "Checking stage",
    leftLabel: "CHECKING STAGE",
    rightLabel: "Standards: See research standards & ensure security systems in all houses & remain within budget",
    headers: ["Haydn", "Mohammed", "Mahari", "Nisar"],
    milestones: [
      { text: "Weekly Meeting — Fri 3 April 2026" },
      { text: "Weekly Meeting — Fri 7 April 2026" },
    ],
    lanes: [
      { name: "Haydn", tasks: [
        { text: "Discuss advantages of selected smart devices per property" },
        { text: "Research & verify advantages for 4-bed & 2-bed — energy, security & convenience" },
        { text: "Check smart meter & Yale Smart Water Sensor integration" },
        { text: "Check floor plan device placements & solar compatibility" },
      ]},
      { name: "Mohammed", tasks: [
        { text: "Present device costs & confirm protocols Wi-Fi, Zigbee, Z-Wave" },
        { text: "Check LabVIEW supports independent living automation" },
        { text: "Check smart heating Hive thermostat & Genius Hub setup" },
      ]},
      { name: "Mahari", tasks: [
        { text: "Check final costs fit estimated budget across all 3 types" },
        { text: "Confirm selections: 2-bed £1,805.03 / 4-bed £3,715.63 / sheltered £26,259.93 — estate £62,993.95" },
        { text: "Check Yale security BS EN 50131 Grade 2 compliance" },
        { text: "Proofread report appendices, references & final corrections" },
      ]},
      { name: "Nisar", tasks: [
        { text: "Verify user-friendliness of devices for elderly residents" },
        { text: "Check security systems across all three property types" },
        { text: "Final sign-off & submission prep 9 April 2026" },
      ]},
    ],
    gate: { name: "Gate 3" },
    gateCriteria: [
      "Do all Gate 2 criteria still hold? Costing tables, device selection and UK regulatory compliance all confirmed.",
      "Has the full report been approved at the Friday weekly meeting and signed off by all four group members?",
      "Have the security systems (Yale Sync Hub, TAPO cameras, BS EN 50131) been verified across all three property types?",
      "Have costs and protocols (Wi-Fi, Zigbee, Z-Wave, RS-232) been fully documented in Appendix B?",
      "Have the advantages of smart devices across all three household types been clearly evidenced in the rationale sections?",
    ],
    standards: [
      "Smart devices must fit all house types — 2-bed, 4-bed and sheltered with tailored specifications.",
      "Smart devices must be affordable — estate total £62,993.95 parts only per client brief.",
      "Smart devices must be user-friendly — Yale panic button, Echo Dot, Fire HD 10 tablets verified.",
      "Smart devices must be easy to implement — LabVIEW local server, Yale ecosystem, G99 DNO solar compliance.",
    ],
  },
  {
    key: "completion",
    label: "Completion phase",
    leftLabel: "COMPLETION PHASE",
    rightLabel: "See Standards",
    headers: ["Haydn", "Mohammed", "Mahari", "Nisar"],
    milestones: [
      { text: "Weekly Meeting — Fri 7 April 2026" },
      { text: "Weekly Meeting — Fri 7 April 2026 (sign-off)" },
      { text: "Documentation of project management process — Final report uploaded (Appendix A + B — Haydn submits)", detail: "Formal close-out of PM artefacts." },
    ],
    lanes: [
      { name: "Haydn", tasks: [{ text: "Review team planning & execution — systems, devices & rationale sections" }] },
      { name: "Mohammed", tasks: [{ text: "Review Gantt, CPA & conclusion — all activities on schedule" }] },
      { name: "Mahari", tasks: [{ text: "Review member final work — PID, WBS, benefits & Appendix C" }] },
      { name: "Nisar", tasks: [{ text: "Review intro, integration & 4-field maps — phases documented" }] },
    ],
    wideBox: {
      text: "Review collaboration & meetings (100% attendance, 7 meetings). Peer review all sections — slides, timings, Q&A. 25+ Harvard references confirmed.",
    },
    gate: { name: "Gate 4" },
    standards: [
      "Execution: All three property types addressed with costings & training.",
      "Teamwork: Equal contribution & attendance across 7 sessions.",
      "Client brief: Floor plans, costing tables, LabVIEW doc & solar analysis included.",
      "Presentation: Ready for 10 Apr — rehearsal 9 Apr.",
      "Regulatory: DPA 2018, BS 5839-6:2019, BS EN 50131 Grade 2, Part P, CQC evidenced.",
    ],
  },
]

/** Legacy exports for chart components (use housing type labels) */
const CHART_COLORS: Record<string, string> = {
  "Starter home": "oklch(0.48 0.16 250)",
  "Family home": "oklch(0.42 0.09 55)",
  "Shared / sheltered accommodation": "oklch(0.45 0.15 290)",
}

export function chartColorForHousing(type: string): string {
  return CHART_COLORS[type] ?? "oklch(0.45 0.02 0)"
}
