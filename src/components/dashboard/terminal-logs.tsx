"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Square, Download, Trash2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useSocket } from "@/hooks/use-socket"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function TerminalLogs() {
  const { logs, isConnected } = useSocket()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [search, setSearch] = useState("")
  const [levelFilter, setLevelFilter] = useState("ALL")
  const [displayedLogs, setDisplayedLogs] = useState(logs)

  // Handle pause/play
  useEffect(() => {
    if (!isPaused) {
      setDisplayedLogs(logs)
    }
  }, [logs, isPaused])

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current && !isPaused) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [displayedLogs, isPaused])

  const filteredLogs = displayedLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase()) || 
                          log.serviceId.toLowerCase().includes(search.toLowerCase())
    const matchesLevel = levelFilter === "ALL" || log.level === levelFilter
    return matchesSearch && matchesLevel
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "INFO": return "text-blue-400"
      case "WARN": return "text-yellow-400"
      case "ERROR": return "text-red-400"
      case "DEBUG": return "text-gray-400"
      default: return "text-gray-300"
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] border rounded-lg overflow-hidden bg-[#0d1117] text-gray-300 font-mono text-sm shadow-xl">
      {/* Terminal Toolbar */}
      <div className="flex items-center justify-between p-2 bg-[#161b22] border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("h-8 px-2 text-gray-400 hover:text-white hover:bg-gray-800", isPaused ? "text-yellow-400" : "")}
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Square className="h-4 w-4 mr-2" />}
            {isPaused ? "Resume" : "Pause"}
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-400 hover:text-white hover:bg-gray-800">
            <Trash2 className="h-4 w-4 mr-2" /> Clear
          </Button>
          <div className="h-4 w-px bg-gray-700 mx-2" />
          <Badge variant="outline" className={cn("bg-transparent border-gray-700", isConnected ? "text-green-400 border-green-900" : "text-red-400 border-red-900")}>
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="h-8 w-[120px] bg-[#0d1117] border-gray-700 text-gray-300 focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent className="bg-[#161b22] border-gray-700 text-gray-300">
              <SelectItem value="ALL">All Levels</SelectItem>
              <SelectItem value="INFO" className="text-blue-400">INFO</SelectItem>
              <SelectItem value="WARN" className="text-yellow-400">WARN</SelectItem>
              <SelectItem value="ERROR" className="text-red-400">ERROR</SelectItem>
              <SelectItem value="DEBUG" className="text-gray-400">DEBUG</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative w-48">
            <Search className="absolute left-2 top-2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Filter logs..." 
              className="h-8 pl-8 bg-[#0d1117] border-gray-700 text-gray-300 focus-visible:ring-0 focus-visible:border-gray-500 placeholder:text-gray-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Terminal Output */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-auto p-4 space-y-1"
      >
        {filteredLogs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-600 italic">
            Waiting for logs...
          </div>
        ) : (
          [...filteredLogs].reverse().map((log) => {
            const date = new Date(log.timestamp)
            const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}`
            
            return (
              <div key={log.id} className="flex hover:bg-[#161b22] px-2 py-0.5 rounded -mx-2">
                <span className="text-gray-500 w-28 shrink-0 select-none">[{timeStr}]</span>
                <span className={cn("w-14 shrink-0 font-bold", getLevelColor(log.level))}>
                  {log.level}
                </span>
                <span className="text-purple-400 w-40 shrink-0 truncate mr-2" title={log.serviceId}>
                  [{log.serviceId}]
                </span>
                <span className="text-gray-300 break-all">
                  {log.message}
                </span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
