import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils" 

export function NavBar({ items, className, isDarkMode }) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  // --- LOGIKA SMART NAVBAR (AUTO-HIDE) ---
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    // Logika Resize Layar
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)

    // Logika Scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // 1. Jika di posisi paling atas (kurang dari 50px), navbar selalu muncul
      if (currentScrollY < 50) {
        setIsVisible(true)
      } 
      // 2. Jika scroll ke bawah, sembunyikan navbar
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } 
      // 3. Jika scroll ke atas, munculkan kembali
      else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    // Tambahkan event listener scroll (passive: true agar performa scroll tidak ngelag)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  return (
    <div
      className={cn(
        // Posisi default Navbar
        "fixed left-1/2 -translate-x-1/2 z-50 transition-transform duration-500 ease-in-out",
        "bottom-6 sm:bottom-auto sm:top-6",
        
        // --- ANIMASI HIDE / SHOW ---
        // Jika isVisible false, navbar akan terdorong keluar layar.
        // Mobile (bawah) -> didorong ke bawah (translate-y-[200%])
        // Desktop (atas) -> didorong ke atas (-translate-y-[200%])
        isVisible 
          ? "translate-y-0" 
          : "translate-y-[200%] sm:-translate-y-[200%]",
          
        className
      )}>
      
      <div
        className={cn(
          "flex items-center gap-1 md:gap-3 border backdrop-blur-md py-1 px-1 rounded-full transition-colors duration-700",
          isDarkMode 
            ? "bg-black/40 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]" 
            : "bg-white/60 border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
        )}>
        
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 md:px-6 py-2 md:py-2.5 rounded-full transition-colors",
                isDarkMode 
                  ? "text-slate-300 hover:text-cyan-400" 
                  : "text-slate-500 hover:text-blue-600",
                isActive && (isDarkMode ? "text-cyan-300" : "text-blue-600")
              )}>
              
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className={cn(
                    "absolute inset-0 w-full rounded-full -z-10",
                    isDarkMode ? "bg-cyan-400/10" : "bg-blue-600/10"
                  )}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}>
                  <div
                    className={cn(
                      "absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full transition-colors duration-700",
                      isDarkMode ? "bg-cyan-400" : "bg-blue-600"
                    )}>
                    <div className={cn("absolute w-12 h-6 rounded-full blur-md -top-2 -left-2", isDarkMode ? "bg-cyan-400/20" : "bg-blue-600/30")} />
                    <div className={cn("absolute w-8 h-6 rounded-full blur-md -top-1", isDarkMode ? "bg-cyan-400/20" : "bg-blue-600/30")} />
                    <div className={cn("absolute w-4 h-4 rounded-full blur-sm top-0 left-2", isDarkMode ? "bg-cyan-400/20" : "bg-blue-600/40")} />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}