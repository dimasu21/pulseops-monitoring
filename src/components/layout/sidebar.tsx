"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Activity, 
  AlertTriangle, 
  BarChart3, 
  Box, 
  FileTerminal, 
  Settings,
  ShieldAlert,
  Server,
  LineChart,
  TerminalSquare,
  Shield
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const { t } = useLanguage()

  const mainNavItems = [
    { title: t("overview"), href: "/", icon: Activity },
    { title: t("services"), href: "/services", icon: Server },
    { title: t("incidents"), href: "/incidents", icon: AlertTriangle },
    { title: t("analytics"), href: "/analytics", icon: LineChart },
    { title: t("logs"), href: "/logs", icon: TerminalSquare },
    { title: t("audit"), href: "/audit", icon: Shield },
  ]

  const bottomNavItems = [
    { title: t("settings"), href: "/settings", icon: Settings },
  ]

  return (
    <div className={cn("flex h-full w-64 flex-col border-r bg-card text-card-foreground", className)}>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Activity className="h-5 w-5 text-primary" />
          <span className="text-lg tracking-tight">PulseOps</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.title} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 px-3",
                    isActive ? "font-medium" : "text-muted-foreground font-normal"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
      
      <div className="border-t p-4 flex flex-col gap-2">
        <nav className="grid gap-1 px-0">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.title} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 px-3",
                    isActive ? "font-medium" : "text-muted-foreground font-normal"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-3 rounded-md bg-secondary/50 p-3 mt-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
            <span className="text-sm font-semibold">JD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-none">John Doe</span>
            <span className="text-xs text-muted-foreground mt-1">Admin</span>
          </div>
        </div>
      </div>
    </div>
  )
}
