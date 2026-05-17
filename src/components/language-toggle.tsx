"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const [lang, setLang] = React.useState("EN")

  React.useEffect(() => {
    const saved = localStorage.getItem("pulseops-lang")
    if (saved) {
      setLang(saved)
    }
  }, [])

  const changeLanguage = (newLang: string) => {
    setLang(newLang)
    localStorage.setItem("pulseops-lang", newLang)
    // In a real app, this would trigger an i18n re-render or redirect
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-border flex items-center justify-center text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground" />
      }>
        {lang}
        <span className="sr-only">Toggle language</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => changeLanguage("EN")} 
          className={`cursor-pointer ${lang === "EN" ? "bg-muted/50 font-medium" : ""}`}
        >
          English (EN)
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage("ID")}
          className={`cursor-pointer ${lang === "ID" ? "bg-muted/50 font-medium" : ""}`}
        >
          Bahasa Indonesia (ID)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
