import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AntigravityBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<any[]>([]);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    // Generate particles only once
    const colors = [
      "rgba(66, 133, 244, 0.4)", // Google Blue
      "rgba(234, 67, 53, 0.4)", // Google Red
      "rgba(251, 188, 5, 0.4)", // Google Yellow
      "rgba(52, 168, 83, 0.4)", // Google Green
      "rgba(175, 92, 247, 0.4)" // Accent Purple
    ];
    
    const count = isMobile ? 30 : 100;
    const items = Array.from({ length: count }).map((_, i) => {
      // Position particles randomly but structured for radial drift
      const angle = Math.random() * Math.PI * 2;
      const distance = 10 + Math.random() * 50; // Distance from center 0-100
      const x = 50 + Math.cos(angle) * distance;
      const y = 50 + Math.sin(angle) * distance;
      
      return {
        id: i,
        x, y,
        angle: (angle * 180) / Math.PI + 90, // Rotate dash to point away from center
        size: Math.random() * 8 + 4, // Larger size
        isDash: i % 4 === 0,
        color: colors[i % colors.length],
        depth: 0.2 + Math.random() * 0.8,
        duration: 15 + Math.random() * 30,
        delay: -Math.random() * 30,
      };
    });
    setParticles(items);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            animate={{
              x: mousePos.x * p.depth,
              y: mousePos.y * p.depth,
            }}
            transition={{ 
              x: { type: "spring", damping: 60, stiffness: 20 },
              y: { type: "spring", damping: 60, stiffness: 20 }
            }}
            style={{ 
              left: `${p.x}%`, 
              top: `${p.y}%`,
              zIndex: 0 
            }}
          >
            <motion.div
              animate={{
                opacity: [0, 0.7, 0.7, 0],
                x: [0, (p.x - 50) * 12],
                y: [0, (p.y - 50) * 12],
                scale: [0.7, 1.3, 0.7],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "linear",
                delay: p.delay,
              }}
              className={`${p.isDash ? 'w-[4px] h-[45px]' : 'rounded-full'}`}
              style={{
                width: p.isDash ? '4px' : `${p.size}px`,
                height: p.isDash ? '45px' : `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: p.id % 8 === 0 ? `0 0 20px ${p.color}` : 'none',
                transform: `rotate(${p.angle}deg)`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px] opacity-50" />
    </div>
  );
};

export default AntigravityBackground;
