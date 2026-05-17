"use client"

import { useState } from "react"
import { AlertCircle, ArrowRight, CheckCircle2, Search, ShieldAlert, Sparkles } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const initialIncidents = [
  {
    id: "INC-8429",
    title: "Database CPU High on Primary",
    service: "postgres-primary",
    severity: "CRITICAL",
    status: "INVESTIGATING",
    createdAt: "10 mins ago",
    assignee: "John Doe",
  },
  {
    id: "INC-8428",
    title: "API Latency Spike in Auth Service",
    service: "auth-api",
    severity: "WARNING",
    status: "OPEN",
    createdAt: "45 mins ago",
    assignee: "Unassigned",
  },
  {
    id: "INC-8427",
    title: "High Memory Usage on Worker",
    service: "payment-worker",
    severity: "INFO",
    status: "RESOLVED",
    createdAt: "2 hours ago",
    assignee: "Jane Smith",
  },
  {
    id: "INC-8426",
    title: "Redis Cache Eviction Rate High",
    service: "redis-cache",
    severity: "WARNING",
    status: "RESOLVED",
    createdAt: "5 hours ago",
    assignee: "John Doe",
  }
]

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState(initialIncidents)
  const [search, setSearch] = useState("")
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState("")

  const generateAiAnalysis = () => {
    setIsAiLoading(true)
    setAiAnalysis("")
    
    // Simulate AI generation
    setTimeout(() => {
      setAiAnalysis(`## AI Incident Analysis
      
**Root Cause:**
Based on the telemetry data and log patterns, the \`postgres-primary\` instance is experiencing severe CPU starvation due to a sudden 400% spike in unindexed sequential scans originating from the \`auth-api\` service.

**Impact:**
- Database CPU is pegged at 98%
- API Latency for dependent services has increased to P99 > 500ms
- Connection pooling is backing up, causing sporadic 503 errors

**Recommended Actions:**
1. **Immediate:** Add the missing compound index on \`users(tenant_id, last_login)\` table.
2. **Short-term:** Temporarily scale up the \`postgres-primary\` instance to 8 vCPU to handle the current load.
3. **Long-term:** Implement Redis caching in \`auth-api\` for frequent tenant lookups.
      `)
      setIsAiLoading(false)
    }, 2000)
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return <Badge className="bg-destructive hover:bg-destructive/90 text-white">Critical</Badge>
      case "WARNING": return <Badge className="bg-status-warning hover:bg-status-warning/90 text-white">Warning</Badge>
      case "INFO": return <Badge variant="secondary">Info</Badge>
      default: return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "OPEN": return <AlertCircle className="h-4 w-4 text-status-warning" />
      case "INVESTIGATING": return <ShieldAlert className="h-4 w-4 text-primary animate-pulse" />
      case "RESOLVED": return <CheckCircle2 className="h-4 w-4 text-status-ok" />
      default: return null
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Incidents</h1>
          <p className="text-muted-foreground mt-1">
            Track, manage and resolve infrastructure issues.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger render={
              <Button variant="secondary" onClick={generateAiAnalysis} />
            }>
              <Sparkles className="mr-2 h-4 w-4 text-indigo-500" /> AI Analysis
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-500" />
                  PulseOps AI Analysis
                </DialogTitle>
                <DialogDescription>
                  Automated root cause analysis and remediation suggestions.
                </DialogDescription>
              </DialogHeader>
              <div className="min-h-[200px] rounded-md border bg-muted/50 p-4 mt-2 whitespace-pre-wrap font-mono text-sm">
                {isAiLoading ? (
                  <div className="flex h-full items-center justify-center space-x-2 text-muted-foreground animate-pulse">
                    <Sparkles className="h-4 w-4" />
                    <span>Analyzing telemetry, logs, and traces...</span>
                  </div>
                ) : (
                  aiAnalysis || "Click 'AI Analysis' to start."
                )}
              </div>
            </DialogContent>
          </Dialog>
          <Button>
            Declare Incident
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Investigating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">MTTR (7 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42m</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Recent Incidents</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search incidents..."
                className="pl-9 h-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase())).map((incident) => (
                <TableRow key={incident.id} className="cursor-pointer hover:bg-muted/50 group">
                  <TableCell className="font-medium">{incident.id}</TableCell>
                  <TableCell>{incident.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">{incident.service}</Badge>
                  </TableCell>
                  <TableCell>{getSeverityBadge(incident.severity)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(incident.status)}
                      <span className="text-sm capitalize">{incident.status.toLowerCase()}</span>
                    </div>
                  </TableCell>
                  <TableCell>{incident.assignee}</TableCell>
                  <TableCell className="text-muted-foreground">{incident.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
