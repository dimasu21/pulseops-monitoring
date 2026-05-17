import { TerminalLogs } from "@/components/dashboard/terminal-logs"

export default function LogsPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Logs</h1>
          <p className="text-muted-foreground mt-1">
            Real-time streaming logs from all services across the infrastructure.
          </p>
        </div>
      </div>
      
      <TerminalLogs />
    </div>
  )
}
