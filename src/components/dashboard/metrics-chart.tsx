"use client"

import { useEffect, useState } from "react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSocket } from "@/hooks/use-socket"

export function MetricsChart() {
  const { metrics } = useSocket()
  const [data, setData] = useState<any[]>([])

  // Store history of total RPS and average latency for the chart
  useEffect(() => {
    if (metrics.length > 0) {
      const now = new Date()
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      
      const totalRps = metrics.reduce((acc, curr) => acc + curr.rps, 0)
      const avgLatency = metrics.reduce((acc, curr) => acc + Number(curr.latency), 0) / metrics.length
      
      setData(prev => {
        const newData = [...prev, { time: timeStr, rps: totalRps, latency: avgLatency }]
        if (newData.length > 30) {
          newData.shift() // Keep last 30 data points
        }
        return newData
      })
    }
  }, [metrics])

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Global Traffic (RPS)</CardTitle>
          <CardDescription>Real-time requests per second across all services.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={30}
                />
                <YAxis 
                  tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="rps" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRps)" 
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average System Latency (ms)</CardTitle>
          <CardDescription>Real-time P50 latency across all services.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={30}
                />
                <YAxis 
                  tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="latency" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
