import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { cn } from '../lib/utils';

// Helper noise untuk gerakan organik
function smoothNoise(t, freq = 1) {
  return Math.sin(t * freq) * 0.5 + Math.sin(t * freq * 2.1) * 0.25 + Math.sin(t * freq * 0.7) * 0.25;
}

function AuroraBlob({ color, baseX, baseY, size, speed, phaseOffset, isLightMode }) {
  const ref = useRef(null);
  const startTime = useRef(Date.now());

  useAnimationFrame(() => {
    if (!ref.current) return;
    const t = (Date.now() - startTime.current) / 1000;

    const x = baseX + smoothNoise(t * speed + phaseOffset, 0.4) * 120; 
    const y = baseY + smoothNoise(t * speed + phaseOffset + 2, 0.35) * 100;
    const rotate = t * (speed * 20) + phaseOffset;
    const scale = 1 + smoothNoise(t * speed * 1.2 + phaseOffset, 0.6) * 0.4;

    ref.current.style.transform = `translate(${x}%, ${y}%) scale(${scale}) rotate(${rotate}deg)`;
    
    // PERBAIKAN OPACITY: baseOpacity di Light Mode dinaikkan ke 0.85 agar sangat tebal
    const baseOpacity = isLightMode ? 0.85 : 0.45; 
    ref.current.style.opacity = baseOpacity + smoothNoise(t * speed * 0.5 + phaseOffset, 0.4) * 0.15;
  });

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: '5%', top: '5%',
        width: `${size}%`, height: `${size}%`,
        borderRadius: '50%',
        background: color,
        // PERBAIKAN BLUR: Dikurangi lagi ke 40px agar warna tetap terkumpul di dalam dots
        filter: isLightMode ? 'blur(40px)' : 'blur(120px)',
        willChange: 'transform, opacity',
      }}
    />
  );
}

export function GradientDots({
  dotSize = 1.2,
  spacing = 10,
  backgroundColor = '#07070f',
  className,
  ...props
}) {
  const [ripples, setRipples] = useState([]);
  const [hueRotate, setHueRotate] = useState(0);
  const hueRef = useRef(0);

  const isLightMode = backgroundColor === '#ffffff' || backgroundColor === '#f8fafc';

  useAnimationFrame(() => {
    hueRef.current = (hueRef.current + 0.12) % 360;
    setHueRotate(hueRef.current);
  });

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const palette = isLightMode 
        ? [['#4338ca', '#3b82f6'], ['#be185d', '#9d174d'], ['#0369a1', '#0e7490']] 
        : [['#ff6ec7', '#ff3366'], ['#6ec6ff', '#338fff'], ['#a78bfa', '#7c3aed']];
      
      const [c1, c2] = palette[Math.floor(Math.random() * palette.length)];
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY, color1: c1, color2: c2 };

      setRipples((prev) => [...prev.slice(-2), newRipple]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)), 3000);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [isLightMode]);

  const blobs = [
    { 
      color: isLightMode 
        ? 'radial-gradient(circle, #4338ca 0%, transparent 85%)' 
        : 'radial-gradient(circle, #7c3aed 0%, transparent 80%)', 
      baseX: -20, baseY: -20, size: 90, speed: 0.35, phaseOffset: 0 
    },
    { 
      color: isLightMode 
        ? 'radial-gradient(circle, #be185d 0%, transparent 85%)' 
        : 'radial-gradient(circle, #ec4899 0%, transparent 80%)', 
      baseX: 50, baseY: -10, size: 80, speed: 0.28, phaseOffset: 2 
    },
    { 
      color: isLightMode 
        ? 'radial-gradient(circle, #0369a1 0%, transparent 85%)' 
        : 'radial-gradient(circle, #06b6d4 0%, transparent 80%)', 
      baseX: 60, baseY: 40, size: 85, speed: 0.42, phaseOffset: 4 
    },
    { 
      color: isLightMode 
        ? 'radial-gradient(circle, #047857 0%, transparent 85%)' 
        : 'radial-gradient(circle, #10b981 0%, transparent 80%)', 
      baseX: 10, baseY: 60, size: 75, speed: 0.32, phaseOffset: 1 
    },
  ];

  const maskStyles = {
    WebkitMaskImage: `radial-gradient(circle at center, black ${dotSize}px, transparent ${dotSize}px), radial-gradient(circle at center, black ${dotSize}px, transparent ${dotSize}px)`,
    WebkitMaskSize: `${spacing}px ${spacing}px`,
    WebkitMaskPosition: `0 0, ${spacing / 2}px ${spacing / 2}px`,
    maskImage: `radial-gradient(circle at center, black ${dotSize}px, transparent ${dotSize}px), radial-gradient(circle at center, black ${dotSize}px, transparent ${dotSize}px)`,
    maskSize: `${spacing}px ${spacing}px`,
    maskPosition: `0 0, ${spacing / 2}px ${spacing / 2}px`,
  };

  return (
    <div className={cn('fixed inset-0 -z-10 w-full h-full overflow-hidden transition-colors duration-700', className)} style={{ backgroundColor }}>
      <div className="absolute inset-0 w-full h-full" style={maskStyles}>
        
        {/* PERBAIKAN CONTAINER OPACITY: Dinaikkan ke 100% (opacity-100) di Light Mode agar warna blob keluar penuh */}
        <div 
          className={cn("absolute inset-0 w-full h-full transition-opacity duration-700", isLightMode ? "opacity-100" : "opacity-100")} 
          style={{ filter: `hue-rotate(${hueRotate}deg)` }}
        >
          {blobs.map((blob, i) => (
            <AuroraBlob key={i} {...blob} isLightMode={isLightMode} />
          ))}
        </div>

        {/* PERBAIKAN OVERLAY: Dibuat lebih transparan (0.15) agar tidak 'mencuci' warna dots di bawahnya */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-700" 
          style={{ 
            background: isLightMode 
              ? 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(255,255,255,0.15) 100%)'
              : 'radial-gradient(circle at 50% 50%, transparent 10%, rgba(7,7,15,0.5) 100%)' 
          }} 
        />
      </div>

      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{ left: ripple.x, top: ripple.y, x: '-50%', y: '-50%', width: '400px', height: '400px', ...maskStyles }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: [0, 1, 0.7, 0], scale: [0.2, 1.1, 1.3] }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ 
            width: '100%', height: '100%', borderRadius: '50%', 
            background: `radial-gradient(circle, ${ripple.color1} 0%, ${ripple.color2} 30%, transparent 70%)`, 
            filter: 'blur(30px)',
            mixBlendMode: isLightMode ? 'multiply' : 'screen' 
          }} />
        </motion.div>
      ))}
    </div>
  );
} 