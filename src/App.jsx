import React, { useState, useEffect } from 'react';
import { GradientDots } from "./components/GradientDots";

function App() {
  // 1. Buat state untuk menyimpan status tema (default: true = dark mode)
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // 2. Terapkan class 'dark' ke tag <html> setiap kali state berubah
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    // Tambahkan transisi warna yang halus (transition-colors duration-500)
    <div className="relative min-h-screen w-full transition-colors duration-700 font-sans flex flex-col overflow-x-hidden">
      {/* 3. Latar belakang dinamis mengikuti state */}
      <GradientDots 
        dotSize={1.8} 
        spacing={8} 
        duration={30}
        colorCycleDuration={10}
        backgroundColor={isDarkMode ? "#0a0a0a" : "#ffffff"} 
      />

      <header className="relative z-10 w-full px-8 py-6 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-wider text-slate-900 dark:text-white transition-colors">
          Yosea<span className="text-blue-500">.</span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
          <a href="#" className="text-blue-500 transition-colors">Home</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Projects</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Services</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Resume</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:block px-5 py-2 text-sm font-medium rounded-full border border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-all">
            Contact Me
          </button>
          
          {/* 4. Tombol Toggle Tema */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} // Fungsi mengubah state
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            {isDarkMode ? (
              // Icon Sun (Matahari) - Muncul saat Dark Mode untuk beralih ke Light
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-2.25l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              // Icon Moon (Bulan) - Muncul saat Light Mode untuk beralih ke Dark
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-32 h-32 md:w-40 md:h-40 mb-6 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-2xl transition-colors">
          <img 
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Yosea" 
            alt="Yosea Mervandy Sugiarto" 
            className="w-full h-full object-cover bg-slate-100 dark:bg-slate-800 transition-colors"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 transition-colors">
          Yosea Mervandy
        </h1>

        <h2 className="text-xl md:text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-6 flex items-center gap-2 transition-colors">
          Software Developer 👨‍💻
        </h2>

        <p className="max-w-2xl text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed mb-10 transition-colors">
          As a passionate Informatics Engineering graduate, with expertise in Web Development and Android Applications. I thrive on the challenges of exploring complex logic and uncovering meaningful patterns that drive innovation.
        </p>

        <button className="px-8 py-3 rounded-full border border-blue-500/50 text-blue-600 dark:text-white font-medium hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          Contact Me
        </button>
      </main>
    </div>
  );
}

export default App;