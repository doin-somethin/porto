import React from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "../../lib/utils"

export function ThemeToggle({ isDark, onToggle, className }) {
  return (
    <div
      className={cn(
        "relative flex w-[70px] h-[36px] p-1 rounded-full cursor-pointer transition-all duration-500 ease-in-out border",
        isDark 
          ? "bg-slate-900/40 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]" 
          : "bg-white/12 border-white/50 shadow-2xl shadow-slate-400/50 backdrop-blur-md",
        className
      )}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Toggle Dark Mode"
    >
      <div className="relative flex justify-between items-center w-full h-full px-1">
        
        {/* === THUMB === */}
        <div
          className={cn(
            "absolute w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-md z-20",
            // Hitam di Light Mode, Putih di Dark Mode
            isDark 
              ? "translate-x-[30px] bg-white text-slate-900" 
              : "translate-x-0 bg-slate-900 text-white"
          )}
        >
          {isDark ? (
            <Moon className="w-4 h-4" strokeWidth={2.5} />
          ) : (
            <Sun className="w-4 h-4" strokeWidth={2.5} />
          )}
        </div>

        {/* === BACKGROUND ICONS === */}
        {/* Sun Icon di sisi kiri */}
        <div className="flex justify-center items-center w-7 h-7 z-10">
          <Sun 
            className={cn(
              "w-4 h-4 transition-all duration-300",
              isDark ? "text-slate-500 opacity-40" : "opacity-0 scale-50"
            )} 
            strokeWidth={1.5} 
          />
        </div>

        {/* Moon Icon */}
        <div className="flex justify-center items-center w-7 h-7 z-10">
          <Moon 
            className={cn(
              "w-4 h-4 transition-all duration-300",
              isDark ? "opacity-0 scale-50" : "text-slate-400 opacity-40"
            )} 
            strokeWidth={1.5} 
          />
        </div>

      </div>
    </div>
  )
}