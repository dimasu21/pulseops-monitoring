"use client"

import { useEffect } from "react"
import { Bell, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"

export function Header() {
  const { t } = useLanguage()
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey) || e.key === "/") {
        e.preventDefault()
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card/50 px-6 backdrop-blur supports-backdrop-filter:bg-card/50">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchPlaceholder")}
            className="w-full bg-background pl-9 md:w-[300px] lg:w-[400px] border-border/60 focus-visible:ring-primary/50 cursor-pointer"
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
              document.dispatchEvent(event);
            }}
            readOnly
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <LanguageToggle />
        <ThemeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="outline" size="icon" className="relative h-9 w-9 rounded-full border-border" />
          }>
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            <span className="sr-only">Toggle notifications</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex justify-between items-center">
                <span>{t("notifications")}</span>
                <Badge variant="secondary" className="text-xs">3 New</Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <div className="flex items-center gap-2 w-full">
                    <span className="h-2 w-2 rounded-full bg-destructive shrink-0" />
                    <span className="font-medium text-sm">Critical: Database CPU High</span>
                  </div>
                  <span className="text-xs text-muted-foreground pl-4">postgres-primary is at 98% CPU</span>
                  <span className="text-xs text-muted-foreground/60 pl-4 mt-1">2 mins ago</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <div className="flex items-center gap-2 w-full">
                    <span className="h-2 w-2 rounded-full bg-warning shrink-0" />
                    <span className="font-medium text-sm">Warning: API Latency Spike</span>
                  </div>
                  <span className="text-xs text-muted-foreground pl-4">auth-api p99 latency &gt; 500ms</span>
                  <span className="text-xs text-muted-foreground/60 pl-4 mt-1">15 mins ago</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-full text-center text-sm cursor-pointer justify-center text-primary">
              {t("viewAllNotifications")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
