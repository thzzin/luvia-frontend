"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const handleToggle = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light")
  }

  return (
    <div className="flex items-center">
      <button
        onClick={handleToggle}
        className="flex items-center justify-center p-2 transition-all rounded-md bg-gray-200 dark:bg-gray-700"
        aria-label="Toggle theme"
      >
        <Sun className={`h-4 w-4 md:h-5 md:w-5 transition-transform ${resolvedTheme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
        <Moon className={`h-4 w-4 md:h-5 md:w-5 transition-transform absolute ${resolvedTheme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} />
        
        
      </button>
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}
