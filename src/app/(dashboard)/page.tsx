"use client"

import { 
  Activity, 
  ArrowUpRight, 
  Cpu, 
  HardDrive, 
  Network, 
  ServerCrash
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export default function DashboardPage() {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t("overview")}</h1>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-status-ok animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">{t("allSystemsOperational")}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("globalApiLatency")}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124ms</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-status-ok flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1 rotate-45" /> 12%
              </span>
              {t("fromLastHour")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("requestRate")}</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,231 req/s</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-status-warning flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 8%
              </span>
              {t("fromLastHour")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("errorRate")}</CardTitle>
            <ServerCrash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-ok">0.01%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-status-ok flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1 rotate-45" /> 0.05%
              </span>
              {t("fromLastHour")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("avgCpuUsage")}</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              {t("stableAcross")}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{t("systemHealthMap")}</CardTitle>
            <CardDescription>
              {t("systemHealthDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative grid grid-cols-3 h-[320px] w-full items-center justify-items-center rounded-xl bg-muted/20 border border-border/50 overflow-hidden">
              <svg className="absolute inset-0 h-full w-full pointer-events-none text-border" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Gateway to Top Service */}
                <path d="M 16.6 50 C 33 50, 33 25, 50 25" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" fill="none" />
                {/* Gateway to Bottom Service */}
                <path d="M 16.6 50 C 33 50, 33 75, 50 75" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" fill="none" />
                {/* Top Service to Top DB */}
                <path d="M 50 25 L 83.3 25" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" fill="none" />
                {/* Top Service to Bottom DB (Warning Path) */}
                <path d="M 50 25 C 66 25, 66 75, 83.3 75" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" fill="none" strokeDasharray="4 4" className="text-status-warning animate-pulse" />
                {/* Bottom Service to Top DB */}
                <path d="M 50 75 C 66 75, 66 25, 83.3 25" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" fill="none" />
                {/* Bottom Service to Bottom DB */}
                <path d="M 50 75 L 83.3 75" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" fill="none" />
              </svg>

              {/* Col 1: Gateway */}
              <div className="z-10 flex flex-col items-center gap-2 bg-background p-3 rounded-xl border shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Network className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs font-medium">{t("gateway")}</span>
              </div>

              {/* Col 2: Services */}
              <div className="z-10 flex flex-col justify-around h-full w-full items-center py-6">
                <div className="flex flex-col items-center gap-2 bg-background p-3 rounded-xl border-2 border-status-warning/50 shadow-sm relative">
                  <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-warning opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-status-warning"></span>
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-status-warning/10">
                    <Activity className="h-6 w-6 text-status-warning" />
                  </div>
                  <span className="text-xs font-medium">{t("authApi")}</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-background p-3 rounded-xl border shadow-sm relative">
                  <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-status-ok"></span>
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <Cpu className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="text-xs font-medium">{t("coreServices")}</span>
                </div>
              </div>

              {/* Col 3: Data */}
              <div className="z-10 flex flex-col justify-around h-full w-full items-center py-6">
                <div className="flex flex-col items-center gap-2 bg-background p-3 rounded-xl border shadow-sm relative">
                  <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-status-ok"></span>
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <HardDrive className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="text-xs font-medium">{t("redisCache")}</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-background p-3 rounded-xl border-2 border-status-critical/50 shadow-sm relative">
                  <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-critical opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-status-critical"></span>
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-status-critical/10">
                    <ServerCrash className="h-6 w-6 text-status-critical" />
                  </div>
                  <span className="text-xs font-medium">{t("postgres")}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>{t("activeIncidents")}</CardTitle>
            <CardDescription>
              {t("activeIncidentsDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border p-3">
                <div className="mt-1 bg-status-critical h-2 w-2 rounded-full shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium leading-none">Database CPU High</p>
                  <p className="text-xs text-muted-foreground">postgres-primary is sustained at 98% CPU for &gt; 5 minutes.</p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="secondary" size="sm" className="h-7 text-xs">{t("investigate")}</Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs">{t("acknowledge")}</Button>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border p-3">
                <div className="mt-1 bg-status-warning h-2 w-2 rounded-full shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium leading-none">API Latency Spike</p>
                  <p className="text-xs text-muted-foreground">auth-api p99 latency crossed 500ms threshold.</p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="secondary" size="sm" className="h-7 text-xs">{t("investigate")}</Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs">{t("acknowledge")}</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
