"use client"

import {
  Button,
  Drawer,
  Separator,
  useOverlayState,
} from "@heroui/react"
import {
  CalendarClockIcon,
  FlagIcon,
  FolderTreeIcon,
  GanttChartIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LayoutGridIcon,
  PanelLeftIcon,
  PoundSterlingIcon,
  RouteIcon,
  TablePropertiesIcon,
  UsersIcon,
} from "lucide-react"
import { SidebarNav, type NavItem } from "@/components/sidebar-nav"

const navItems: NavItem[] = [
  { title: "Overview", href: "/", icon: LayoutDashboardIcon },
  { title: "Gantt Chart", href: "/gantt", icon: GanttChartIcon },
  { title: "Activity list", href: "/activity-list", icon: TablePropertiesIcon },
  { title: "CPA", href: "/cpa", icon: RouteIcon },
  { title: "WBS", href: "/wbs", icon: FolderTreeIcon },
  { title: "Four Fields Map", href: "/four-fields", icon: LayoutGridIcon },
  { title: "Costs", href: "/costs", icon: PoundSterlingIcon },
  { title: "Team", href: "/team", icon: UsersIcon },
  { title: "Milestones", href: "/milestones", icon: FlagIcon },
]

function SidebarBrand() {
  return (
    <div className="flex items-center gap-2.5 px-1">
      <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
        <HomeIcon className="size-4" aria-hidden />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-tight">CST2565</span>
        <span className="text-[11px] text-muted-foreground leading-tight">Assignment 2 · Smart Home</span>
      </div>
    </div>
  )
}

function SidebarFooter() {
  return (
    <div className="text-muted-foreground flex items-center gap-2 text-xs">
      <CalendarClockIcon className="size-3.5 shrink-0" aria-hidden />
      <span>Due 10 Apr 2026 · Presentation &amp; submission</span>
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const mobileNav = useOverlayState()

  return (
    <div className="flex min-h-screen w-full">
      <aside className="bg-sidebar text-sidebar-foreground border-sidebar-border hidden w-64 shrink-0 flex-col border-r md:flex">
        <div className="flex flex-1 flex-col gap-2 p-4">
          <SidebarBrand />
          <Separator className="bg-sidebar-border my-2" />
          <SidebarNav items={navItems} className="flex-1" />
          <Separator className="bg-sidebar-border my-2" />
          <SidebarFooter />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <Drawer state={mobileNav}>
            <Button
              isIconOnly
              variant="ghost"
              aria-label="Open navigation"
              className="-ml-1 shrink-0 md:hidden"
            >
              <PanelLeftIcon className="size-5" />
            </Button>
            <Drawer.Backdrop variant="blur">
              <Drawer.Content placement="left" className="max-w-[min(100vw,280px)]">
                <Drawer.Dialog className="bg-sidebar text-sidebar-foreground border-sidebar-border rounded-none border-r">
                  <Drawer.Header className="border-sidebar-border border-b px-4 pt-4 pb-2">
                    <Drawer.Heading className="text-sm font-semibold">Navigation</Drawer.Heading>
                  </Drawer.Header>
                  <Drawer.Body className="px-3 py-3">
                    <SidebarNav items={navItems} onNavigate={() => mobileNav.close()} />
                    <Separator className="bg-sidebar-border my-4" />
                    <SidebarFooter />
                  </Drawer.Body>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>

          <Separator orientation="vertical" className="bg-border hidden !h-4 md:block" />

          <span className="text-sm font-medium">Smart Home — Group project</span>
          <span className="text-muted-foreground ml-auto hidden text-xs tabular-nums sm:block">
            CST2565 · Mar–Apr 2026
          </span>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
