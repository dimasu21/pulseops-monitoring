"use client"

import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"

interface MetricData {
  serviceId: string
  cpu: string
  ram: string
  latency: string
  rps: number
  errorRate: string
  timestamp: string
}

interface ServiceData {
  id: string
  name: string
  status: "HEALTHY" | "WARNING" | "CRITICAL" | "OFFLINE"
}

interface LogData {
  id: string
  serviceId: string
  level: "INFO" | "WARN" | "ERROR" | "DEBUG"
  message: string
  timestamp: string
}

export function useSocket() {
  const socketRef = useRef<Socket | null>(null)
  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [services, setServices] = useState<ServiceData[]>([])
  const [logs, setLogs] = useState<LogData[]>([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Connect to the telemetry server
    socketRef.current = io("http://localhost:3001", {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    socketRef.current.on("connect", () => {
      setIsConnected(true)
      console.log("Connected to telemetry server")
    })

    socketRef.current.on("disconnect", () => {
      setIsConnected(false)
      console.log("Disconnected from telemetry server")
    })

    socketRef.current.on("metrics_update", (data: { metrics: MetricData[], services: ServiceData[] }) => {
      setMetrics(data.metrics)
      setServices(data.services)
    })

    socketRef.current.on("logs_update", (newLogs: LogData[]) => {
      setLogs(prev => {
        const combined = [...newLogs, ...prev]
        return combined.slice(0, 100) // Keep last 100 logs
      })
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  return { metrics, services, logs, isConnected }
}
