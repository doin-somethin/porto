import React, { useRef, useState } from 'react';
import { Linkedin, Github, Instagram } from 'lucide-react'; 
import profilePhoto from '../../assets/images/photo1.jpg'; 

export function ProfileCardComponent({ isDarkMode }) {
  // --- LOGIKA MOUSE TRACKING ---
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative p-[1px] w-[95%] max-w-[1300px] mx-auto rounded-[2.1rem] group transition-shadow duration-700 ease-in-out ${
        isDarkMode 
          ? 'shadow-[0_8px_30px_rgb(0,0,0,0.6)]' 
          : 'shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
      }`}
    >
      
      {/* 1. BORDER DASAR */}
      <div className={`absolute inset-0 rounded-[2.1rem] transition-colors duration-700 ${
        isDarkMode ? 'bg-white/10' : 'bg-slate-300/50' 
      }`} />

{/* 2. EFEK CAHAYA BORDER */}
      <div
        className="absolute inset-0 rounded-[2.1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
            isDarkMode ? 'rgba(255,255,255,0.8)' : 'rgba(37,99,235,0.7)' 
          }, transparent 100%)`,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* 3. KONTEN UTAMA (Inner Card) */}
      <div className={`relative h-full w-full rounded-[2rem] p-8 md:p-14 flex flex-col-reverse md:flex-row items-center md:items-stretch justify-between gap-12 md:gap-20 overflow-hidden z-10 backdrop-blur-2xl transition-colors duration-700 ${
        isDarkMode ? 'bg-[#0f1115]/40' : 'bg-white/50'
      }`}>

        {/* Background*/}
        <div className={`absolute inset-0 bg-gradient-to-br rounded-[2rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
          isDarkMode ? 'from-cyan-500/10 to-transparent' : 'from-[#ffcc00]/20 to-transparent' 
        }`} />

        {/* --- KOLOM KIRI --- */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-20 w-full max-w-2xl py-2">
          <div className="w-full">
            <h3 className={`text-base md:text-xl font-medium mb-4 tracking-wide transition-colors duration-700 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Hello, I'm Yosea Mervandy Sugiarto,
            </h3>
            
            <h1 className={`text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-8 transition-colors duration-700 leading-[1.1] ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Software <br className="hidden md:block" /> 
              <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode ? 'from-cyan-400 to-blue-500' : 'from-blue-600 to-cyan-500'
              }`}>
                Developers.
              </span>
            </h1>

            <p className={`max-w-lg text-sm md:text-[17px] leading-relaxed mb-8 md:mb-0 transition-colors duration-700 font-light ${
              isDarkMode ? 'text-gray-300' : 'text-slate-700'
            }`}>
              Informatics Engineering graduate from Telkom University. Passionate Software Engineer with expertise in Artificial Intelligence and Mobile Development, focusing on deep learning implementation and modern web-mobile integration.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 mt-10 md:mt-auto pb-2">
            <button className={`px-9 py-3.5 rounded-full font-medium transition-all duration-300 shadow-lg hover:-translate-y-1 text-sm md:text-base tracking-wide z-20 relative ${
              isDarkMode 
                ? 'bg-white text-black hover:bg-gray-200 shadow-white/10' 
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20'
            }`}>
              Contact Me
            </button>
            
            <div className="flex items-center gap-6 ml-2 md:ml-4 z-20 relative">
              <a href="https://www.linkedin.com/in/yoseamerv/" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 hover:-translate-y-1 ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-600 hover:text-blue-600'
              }`}>
                <Linkedin size={24} strokeWidth={1.5} />
              </a>
              <a href="https://github.com/YoseaMerv" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 hover:-translate-y-1 ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}>
                <Github size={24} strokeWidth={1.5} />
              </a>
              <a href="https://www.instagram.com/yoseamerv_2/" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 hover:-translate-y-1 ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-600 hover:text-pink-600'
              }`}>
                <Instagram size={24} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* --- KOLOM KANAN: GAMBAR --- */}
        <div className={`w-full max-w-[280px] md:max-w-[400px] lg:max-w-[440px] aspect-square md:aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] flex-shrink-0 relative z-20 ${
          isDarkMode ? 'border border-white/5' : 'border border-black/5'
        }`}>
          <img 
            src={profilePhoto} 
            alt="Yosea Mervandy Sugiarto" 
            className={`w-full h-full object-cover transition-colors duration-700 ${
              isDarkMode ? 'bg-[#1a1d24]' : 'bg-slate-100'
            }`} 
          />
        </div>

      </div>
    </div>
  );
}