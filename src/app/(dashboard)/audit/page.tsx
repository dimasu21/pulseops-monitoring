"use client"

import { useState } from "react"
import { Calendar, Search } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const auditData = [
  { id: "LOG-9281", user: "John Doe", action: "Deleted User", target: "user_7482", time: "10 mins ago", status: "SUCCESS" },
  { id: "LOG-9280", user: "Jane Smith", action: "Created Incident", target: "INC-8429", time: "15 mins ago", status: "SUCCESS" },
  { id: "LOG-9279", user: "System", action: "Auto-scaled Group", target: "worker-nodes", time: "1 hour ago", status: "SUCCESS" },
  { id: "LOG-9278", user: "Alice Johnson", action: "Modified Config", target: "auth-rate-limit", time: "2 hours ago", status: "FAILED" },
  { id: "LOG-9277", user: "John Doe", action: "Login", target: "IP: 192.168.1.42", time: "5 hours ago", status: "SUCCESS" },
]

export default function AuditLogsPage() {
  const [search, setSearch] = useState("")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">
            Track user activity and system events for compliance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" /> Date Range
          </Button>
          <Button variant="secondary">Export CSV</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Activity History</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search audit logs..."
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
                <TableHead>User / Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditData.filter(i => i.action.toLowerCase().includes(search.toLowerCase()) || i.user.toLowerCase().includes(search.toLowerCase())).map((log) => (
                <TableRow key={log.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.id}</TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="font-mono text-xs">{log.target}</TableCell>
                  <TableCell>
                    {log.status === "SUCCESS" ? (
                      <Badge variant="outline" className="text-status-ok border-status-ok/30 bg-status-ok/10">Success</Badge>
                    ) : (
                      <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/10">Failed</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{log.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
