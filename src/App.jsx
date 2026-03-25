import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Layers, FileText } from 'lucide-react'; 

import { GradientDots } from "./components/ui/GradientDots";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import { NavBar } from "./components/ui/NavBar"; 
import { ProfileCardComponent } from "./components/ui/ProfileCardComponent"; 
import { AboutMeComponent } from "./components/ui/AboutMeComponent";

const navItems = [
  { name: 'Home', url: '#', icon: Home },
  { name: 'About', url: '#about', icon: User },
  { name: 'Projects', url: '#projects', icon: Briefcase },
  { name: 'Services', url: '#services', icon: Layers },
  { name: 'Resume', url: '#resume', icon: FileText }
];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-700 font-sans flex flex-col overflow-x-hidden ${
      isDarkMode ? 'text-slate-50' : 'text-slate-900'
    }`}>
      
      {/* --- BACKGROUND ANIMATION --- */}
      <GradientDots 
        dotSize={1.2}     
        spacing={6} 
        duration={24}
        colorCycleDuration={6}
        backgroundColor={isDarkMode ? "#0a0a0a" : "#f8fafc"}  
      />

      {/* --- HEADER --- */}
      <header className="relative z-50 w-full px-6 md:px-12 py-6 flex items-center justify-between">
        
        {/* LOGO */}
        <div className={`text-2xl font-bold tracking-wider transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
          Yosea<span className={isDarkMode ? 'text-cyan-400' : 'text-blue-600'}>.</span>
        </div>

        {/* --- FLOATING NAVBAR --- */}
        <NavBar items={navItems} isDarkMode={isDarkMode} />

        {/* ACTIONS CONTAINER */}
        <div className="flex items-center gap-4">
          <ThemeToggle 
            isDark={isDarkMode} 
            onToggle={() => setIsDarkMode(!isDarkMode)} 
          />
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 md:px-8 pt-6 md:pt-10 pb-24 w-full">
        
        {/* 1. HERO SECTION */}
        <ProfileCardComponent isDarkMode={isDarkMode} />

        {/* 2. SPACER*/}
        <div className="h-20 md:h-16 w-full"></div>

        {/* 3. ABOUT SECTION */}
        <AboutMeComponent isDarkMode={isDarkMode} />

      </main>

    </div>
  );
}

export default App;