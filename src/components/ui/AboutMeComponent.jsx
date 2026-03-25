import React, { useRef, useState } from 'react';
import { Code, BookOpen, Briefcase, Brain } from 'lucide-react';
import { motion } from 'framer-motion'; // 1. IMPORT FRAMER MOTION

// --- WRAPPER COMPONENT: Magic Card dengan Efek Senter ---
// 2. TAMBAHKAN PROP 'delay' UNTUK MENGATUR URUTAN MUNCUL
function MagicCard({ children, className, isDarkMode, delay = 0 }) {
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
    // 3. UBAH div MENJADI motion.div DAN MASUKKAN ANIMASI
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }} // Mulai transparan & agak ke bawah
      whileInView={{ opacity: 1, y: 0 }} // Saat masuk layar, muncul & naik
      viewport={{ once: true, margin: "-50px" }} // Animasi jalan 1x saat discroll
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }} // Waktu & jeda
      
      className={`relative p-[1px] rounded-[2.1rem] group transition-shadow duration-700 ease-in-out ${className} ${
        isDarkMode 
          ? 'shadow-[0_8px_30px_rgb(0,0,0,0.6)]' 
          : 'shadow-[0_8px_30px_rgb(0,0,0,0.05)]'
      }`}
    >
      {/* 1. BORDER DASAR */}
      <div className={`absolute inset-0 rounded-[2.1rem] transition-colors duration-700 ${
        isDarkMode ? 'bg-white/10' : 'bg-slate-300/50' 
      }`} />

      {/* 2. EFEK CAHAYA BORDER MASKING */}
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

      {/* 3. KONTEN DALAM (Glassmorphism) */}
      <div className={`relative h-full w-full rounded-[2rem] p-6 sm:p-8 overflow-hidden z-10 backdrop-blur-2xl transition-colors duration-700 ${
        isDarkMode ? 'bg-[#0f1115]/40' : 'bg-white/50'
      }`}>
        <div className={`absolute inset-0 bg-gradient-to-br rounded-[2rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
          isDarkMode ? 'from-cyan-500/5 to-transparent' : 'from-[#ffcc00]/10 to-transparent' 
        }`} />
        {children}
      </div>
    </motion.div>
  );
}

// --- MAIN COMPONENT: About Me ---
export function AboutMeComponent({ isDarkMode }) {
  const textClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const titleClass = isDarkMode ? 'text-white' : 'text-slate-900';
  const highlightClass = isDarkMode ? 'text-cyan-400' : 'text-blue-600';

  const skills = [
    'Android Development', 'Kotlin', 'Machine Learning', 
    'YOLOv11', 'React', 'Laravel', 'UI/UX Design', 'Digital Forensics'
  ];

  return (
    <section id="about" className="w-[95%] max-w-[1300px] mx-auto mt-8 md:mt-12 mb-20 md:mb-32 relative z-10 scroll-mt-28 md:scroll-mt-14">
      
      {/* Header Section dengan Animasi Slide dari Kiri */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mb-8 md:mb-10 md:pl-4 text-center md:text-left"
      >
        <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${titleClass}`}>
          About <span className={highlightClass}>Me.</span>
        </h2>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
        
        {/* Card 1: My Story (Tambahkan delay={0.1}) */}
        <MagicCard isDarkMode={isDarkMode} delay={0.1} className="md:col-span-2 flex flex-col justify-center">
          <h3 className={`text-xl md:text-2xl font-semibold mb-5 md:mb-6 flex items-center gap-3 ${titleClass}`}>
            <Code className={highlightClass} size={28} /> 
            My Journey
          </h3>
          <p className={`leading-relaxed mb-4 md:mb-5 text-sm md:text-[15px] ${textClass}`}>
            I am an Informatics Engineering graduate from Telkom University Purwokerto. 
            My passion lies in bridging the gap between intelligent algorithms and user-centric applications. 
            As a proud alumnus of Bangkit Academy, I continuously push myself to learn and adapt to the ever-evolving tech landscape.
          </p>
          <p className={`leading-relaxed text-sm md:text-[15px] ${textClass}`}>
            Whether it's implementing deep learning models like YOLOv11 for object detection on Android devices, 
            or building full-stack web platforms, I enjoy solving complex problems and turning 
            innovative ideas into functional software.
          </p>
        </MagicCard>

        {/* Card 2: Education (Tambahkan delay={0.2}) */}
        <MagicCard isDarkMode={isDarkMode} delay={0.2}>
          <h3 className={`text-xl md:text-2xl font-semibold mb-5 md:mb-6 flex items-center gap-3 ${titleClass}`}>
            <BookOpen className={highlightClass} size={28} /> 
            Education
          </h3>
          <div className="relative border-l-2 border-gray-400/30 pl-5 ml-3 space-y-8 mt-4">
            
            <div className="relative">
              <div className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${isDarkMode ? 'bg-[#0f1115] border-cyan-400' : 'bg-white border-blue-600'}`}></div>
              <h4 className={`font-semibold text-sm md:text-[15px] ${titleClass}`}>Telkom University Purwokerto</h4>
              <p className={`text-xs md:text-sm mt-1.5 ${textClass}`}>B.Eng. in Informatics Engineering</p>
              <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${isDarkMode ? 'bg-cyan-500/20 text-cyan-300' : 'bg-blue-100 text-blue-700'}`}>
                Graduated
              </span>
            </div>

            <div className="relative">
              <div className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${isDarkMode ? 'bg-[#0f1115] border-cyan-400' : 'bg-white border-blue-600'}`}></div>
              <h4 className={`font-semibold text-sm md:text-[15px] ${titleClass}`}>Bangkit Academy</h4>
              <p className={`text-xs md:text-sm mt-1.5 ${textClass}`}>Mobile Development Cohort</p>
              <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${isDarkMode ? 'bg-cyan-500/20 text-cyan-300' : 'bg-blue-100 text-blue-700'}`}>
                Alumnus
              </span>
            </div>

          </div>
        </MagicCard>

        {/* Card 3: Experience (Tambahkan delay={0.3}) */}
        <MagicCard isDarkMode={isDarkMode} delay={0.3} className="md:col-span-2">
          <h3 className={`text-xl md:text-2xl font-semibold mb-5 md:mb-6 flex items-center gap-3 ${titleClass}`}>
            <Briefcase className={highlightClass} size={28} /> 
            Experience
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className={`p-4 rounded-2xl border transition-colors duration-300 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/5 hover:bg-black/10'}`}>
              <h4 className={`font-semibold text-sm md:text-[15px] ${titleClass}`}>Web Developer Intern</h4>
              <p className={`text-xs mt-1 opacity-80 ${textClass}`}>PT. Herbatech</p>
            </div>

            <div className={`p-4 rounded-2xl border transition-colors duration-300 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/5 hover:bg-black/10'}`}>
              <h4 className={`font-semibold text-sm md:text-[15px] ${titleClass}`}>AI Practicum Assistant</h4>
              <p className={`text-xs mt-1 opacity-80 ${textClass}`}>Telkom University</p>
            </div>

            <div className={`p-4 rounded-2xl border transition-colors duration-300 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/5 hover:bg-black/10'}`}>
              <h4 className={`font-semibold text-sm md:text-[15px] ${titleClass}`}>Field Technician</h4>
              <p className={`text-xs mt-1 opacity-80 ${textClass}`}>Telkom (Indihome)</p>
            </div>

          </div>
        </MagicCard>

        {/* Card 4: Tech Stack (Tambahkan delay={0.4}) */}
        <MagicCard isDarkMode={isDarkMode} delay={0.4} className="flex flex-col justify-center">
          <h3 className={`text-xl md:text-2xl font-semibold mb-5 md:mb-6 flex items-center gap-3 ${titleClass}`}>
            <Brain className={highlightClass} size={28} /> 
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2 md:gap-2.5">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className={`px-3 py-1.5 text-[11px] md:text-xs font-medium rounded-lg transition-colors duration-300 cursor-default ${
                  isDarkMode 
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20' 
                    : 'bg-blue-600/10 text-blue-700 border border-blue-600/20 hover:bg-blue-600/20'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </MagicCard>

      </div>
    </section>
  );
}