import { MetricsChart } from "@/components/dashboard/metrics-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Historical and real-time trends for your infrastructure.
          </p>
        </div>
      </div>
      
      <MetricsChart />
      
      <div className="grid gap-4 md:grid-cols-3 mt-4">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Resource Utilization Distribution</CardTitle>
            <CardDescription>Average CPU and RAM usage by service tier.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex items-center justify-center text-muted-foreground border-dashed border-2 rounded-md m-4 mt-0">
            Pie chart visualization placeholder
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Error Rate Trends</CardTitle>
            <CardDescription>Top sources of 5xx errors.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-destructive">postgres-primary</span>
                <span className="text-muted-foreground">0.05%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-destructive w-[80%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-status-warning">auth-api</span>
                <span className="text-muted-foreground">0.02%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-status-warning w-[40%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">payment-worker</span>
                <span className="text-muted-foreground">0.00%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[5%]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
