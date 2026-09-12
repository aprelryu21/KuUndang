import React, { useMemo } from 'react';

interface JavaneseGoldenParticlesProps {
  count?: number;
  showJasminePetals?: boolean;
  className?: string;
}

export const JavaneseGoldenParticles: React.FC<JavaneseGoldenParticlesProps> = ({
  count = 24,
  showJasminePetals = true,
  className = 'absolute inset-0 pointer-events-none overflow-hidden z-0',
}) => {
  // Memoize particle attributes so they don't re-randomize on re-renders
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const isPetal = showJasminePetals && i % 4 === 0;
      const size = isPetal ? 10 + (i % 6) * 2 : 2 + (i % 4) * 1.5;
      const left = (i * 100) / count + (i % 5) - 2;
      const duration = 7 + (i % 7) * 1.8;
      const delay = (i % 9) * 0.8;
      const opacity = 0.35 + (i % 5) * 0.12;
      const swayDuration = 3 + (i % 4) * 1.2;

      return {
        id: i,
        isPetal,
        size,
        left: Math.max(2, Math.min(98, left)),
        duration,
        delay,
        opacity,
        swayDuration,
      };
    });
  }, [count, showJasminePetals]);

  return (
    <div className={className} aria-hidden="true">
      {particles.map((p) => {
        if (p.isPetal) {
          // Melati Sekar Kedhaton (Jasmine Petal)
          return (
            <span
              key={p.id}
              className="absolute block animate-javanese-float"
              style={{
                left: `${p.left}%`,
                bottom: '-20px',
                width: `${p.size}px`,
                height: `${p.size * 1.3}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear',
                opacity: p.opacity,
              }}
            >
              <svg
                viewBox="0 0 20 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_2px_6px_rgba(212,175,55,0.4)] animate-javanese-sway"
                style={{
                  animationDuration: `${p.swayDuration}s`,
                  animationIterationCount: 'infinite',
                  animationTimingFunction: 'ease-in-out',
                }}
              >
                {/* Jasmine Petal Shape */}
                <path
                  d="M 10 2 C 16 7, 19 16, 12 24 C 6 22, 2 15, 6 7 C 7 4, 9 2, 10 2 Z"
                  fill="url(#jasmineGrad)"
                  stroke="#E5C158"
                  strokeWidth="0.5"
                  strokeOpacity="0.7"
                />
                <defs>
                  <linearGradient id="jasmineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFDF5" />
                    <stop offset="60%" stopColor="#F5E8C7" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          );
        }

        // Golden Sparkle / Glowing Ember Dust
        return (
          <span
            key={p.id}
            className="absolute rounded-full bg-[#E5C158] animate-javanese-float"
            style={{
              left: `${p.left}%`,
              bottom: '-10px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: `0 0 ${p.size * 2.5}px #D4AF37, 0 0 ${p.size * 5}px rgba(255, 235, 150, 0.6)`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              opacity: p.opacity,
            }}
          />
        );
      })}
    </div>
  );
};
