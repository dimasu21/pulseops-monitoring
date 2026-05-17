"use client"

import { useState } from "react"
import { Search, Plus, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSocket } from "@/hooks/use-socket"
import { ServiceCard } from "@/components/dashboard/service-card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ServicesPage() {
  const { services, metrics, isConnected } = useSocket()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "ALL" || service.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services Map</h1>
          <p className="text-muted-foreground mt-1">
            Monitor the health and performance of your infrastructure.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isConnected && (
            <span className="text-sm text-status-warning flex items-center mr-4 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-status-warning mr-2" />
              Reconnecting to telemetry...
            </span>
          )}
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Views
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Service
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search services by name or ID..."
            className="w-full pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="HEALTHY">Healthy</SelectItem>
            <SelectItem value="WARNING">Warning</SelectItem>
            <SelectItem value="CRITICAL">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {services.length === 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3 border p-4 rounded-xl bg-card">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-6 w-[60px]" />
              </div>
              <Skeleton className="h-[80px] w-full rounded-xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredServices.map(service => {
            const serviceMetrics = metrics.find(m => m.serviceId === service.id) || {
              cpu: "0", ram: "0", latency: "0", rps: 0, errorRate: "0"
            }
            return (
              <ServiceCard 
                key={service.id} 
                service={service} 
                metrics={serviceMetrics} 
              />
            )
          })}
        </div>
      )}
      
      {filteredServices.length === 0 && services.length > 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No services found</h3>
          <p className="text-muted-foreground mt-1 max-w-sm">
            No services match your current search and filter criteria. Try adjusting your filters.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => { setSearch(""); setStatusFilter("ALL"); }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
