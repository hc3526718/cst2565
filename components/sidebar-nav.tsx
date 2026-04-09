"use client"

import type { LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@heroui/react"
import { cn } from "@/lib/utils"

export type NavItem = { title: string; href: string; icon: LucideIcon }

export function SidebarNav({
  items,
  onNavigate,
  className,
}: {
  items: NavItem[]
  onNavigate?: () => void
  className?: string
}) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      <p className="text-muted-foreground mb-1 px-2 text-xs font-medium uppercase tracking-wide">Navigation</p>
      {items.map((item) => {
        const active = pathname === item.href
        const Icon = item.icon
        return (
          <Button
            key={item.href}
            variant={active ? "secondary" : "ghost"}
            className="h-9 w-full justify-start gap-2 px-2 font-normal"
            onPress={() => {
              router.push(item.href)
              onNavigate?.()
            }}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            <span>{item.title}</span>
          </Button>
        )
      })}
    </nav>
  )
}
