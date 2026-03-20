import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { cn } from '../../lib/utils';

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
    
    // Opacity
    const baseOpacity = isLightMode ? 0.8 : 0.6; 
    ref.current.style.opacity = baseOpacity + smoothNoise(t * speed * 0.5 + phaseOffset, 0.4) * 0.15;
  });

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: '5%', top: '5%',
        width: `${size}vw`, 
        height: `${size}vw`,
        borderRadius: '50%',
        background: color,
        filter: 'blur(50px)',
        willChange: 'transform, opacity',
      }}
    />
  );
}

export function GradientDots({
  dotSize = 1.2,
  spacing = 6,
  backgroundColor = '#0a0a0a',
  className,
  ...props
}) {
  const [ripples, setRipples] = useState([]);
  const [hueRotate, setHueRotate] = useState(0);
  const hueRef = useRef(0);

  // Deteksi mode
  const isLightMode = backgroundColor === '#ffffff' || backgroundColor === '#f8fafc';

  useAnimationFrame(() => {
    hueRef.current = (hueRef.current + 0.12) % 360;
    setHueRotate(hueRef.current);
  });

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const palette = isLightMode 
        ? [
            ['#ea580c', '#f59e0b'], 
            ['#2563eb', '#06b6d4'],
            ['#db2777', '#f43f5e'],
            ['#65a30d', '#84cc16'] 
          ] 
        : [
            ['#fde047', '#f59e0b'], 
            ['#67e8f9', '#06b6d4'], 
            ['#f9a8d4', '#ec4899'], 
            ['#bef264', '#84cc16'], 
            ['#a78bfa', '#8b5cf6']  
          ];
      
      const [c1, c2] = palette[Math.floor(Math.random() * palette.length)];
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY, color1: c1, color2: c2 };

      setRipples((prev) => [...prev.slice(-2), newRipple]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)), 3000);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [isLightMode]);

  // BLOBS: Warnanya dicampur
  const blobs = [
    { color: isLightMode ? '#4338ca' : '#8b5cf6', baseX: -20, baseY: -20, size: 90, speed: 0.35, phaseOffset: 0 }, 
    { color: isLightMode ? '#ea580c' : '#fde047', baseX: 40, baseY: -20, size: 80, speed: 0.28, phaseOffset: 2 }, 
    { color: isLightMode ? '#0284c7' : '#22d3ee', baseX: 60, baseY: 40, size: 85, speed: 0.42, phaseOffset: 4 }, 
    { color: isLightMode ? '#e11d48' : '#f472b6', baseX: -10, baseY: 60, size: 75, speed: 0.32, phaseOffset: 1 }, 
    { color: isLightMode ? '#16a34a' : '#a3e635', baseX: 30, baseY: 30, size: 80, speed: 0.38, phaseOffset: 3 }, 
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
      
      {/* MASK CONTAINER */}
      <div className="absolute inset-0 w-full h-full" style={maskStyles}>
        
        {/* Layer 1: Aurora Blobs */}
        <div 
          className="absolute inset-0 w-full h-full transition-opacity duration-700"
          style={{ filter: `hue-rotate(${hueRotate}deg)` }}
        >
          {blobs.map((blob, i) => (
            <AuroraBlob key={i} {...blob} isLightMode={isLightMode} />
          ))}
        </div>

        {/* Layer 2: Ripple Click */}
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{ left: ripple.x, top: ripple.y, x: '-50%', y: '-50%', width: '400px', height: '400px' }}
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

      {/* Layer 3: VIGNETTE */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-700" 
        style={{ 
          background: isLightMode 
            ? 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(255,255,255,0.8) 100%)'
            : 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(10,10,10,0.9) 100%)' 
        }} 
      />

    </div>
  );
}