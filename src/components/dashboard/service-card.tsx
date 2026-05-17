"use client"

import { Activity, Cpu, HardDrive, Network, ServerCrash } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  service: {
    id: string
    name: string
    status: "HEALTHY" | "WARNING" | "CRITICAL" | "OFFLINE"
  }
  metrics: {
    cpu: string
    ram: string
    latency: string
    rps: number
    errorRate: string
  }
}

export function ServiceCard({ service, metrics }: ServiceCardProps) {
  const statusColors = {
    HEALTHY: "bg-status-ok text-status-ok-foreground",
    WARNING: "bg-status-warning text-status-warning-foreground",
    CRITICAL: "bg-status-critical text-status-critical-foreground",
    OFFLINE: "bg-muted text-muted-foreground",
  }
  
  const statusIndicator = {
    HEALTHY: "bg-status-ok animate-pulse",
    WARNING: "bg-status-warning animate-pulse",
    CRITICAL: "bg-status-critical animate-bounce",
    OFFLINE: "bg-muted",
  }

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md",
      service.status === "CRITICAL" ? "border-status-critical/50" : ""
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <span className={cn("h-2.5 w-2.5 rounded-full", statusIndicator[service.status])} />
          <CardTitle className="text-base font-semibold">{service.name}</CardTitle>
        </div>
        <Badge variant={service.status === "HEALTHY" ? "outline" : "default"} className={cn(
          service.status !== "HEALTHY" ? statusColors[service.status] : "text-muted-foreground border-muted-foreground/30"
        )}>
          {service.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Cpu className="h-3 w-3" /> CPU
            </span>
            <span className="text-sm font-medium">{metrics?.cpu || "0"}%</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <HardDrive className="h-3 w-3" /> RAM
            </span>
            <span className="text-sm font-medium">{metrics?.ram || "0"} MB</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Activity className="h-3 w-3" /> Latency
            </span>
            <span className="text-sm font-medium">{metrics?.latency || "0"} ms</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Network className="h-3 w-3" /> RPS
            </span>
            <span className="text-sm font-medium">{metrics?.rps || "0"}</span>
          </div>
        </div>
        {Number(metrics?.errorRate) > 0 && (
          <div className="mt-4 flex items-center gap-2 rounded-md bg-destructive/10 px-2 py-1.5 text-xs font-medium text-destructive">
            <ServerCrash className="h-3.5 w-3.5" />
            Error rate: {metrics.errorRate}%
          </div>
        )}
      </CardContent>
    </Card>
  )
}
