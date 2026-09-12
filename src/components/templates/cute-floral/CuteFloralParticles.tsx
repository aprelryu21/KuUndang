import React, { useMemo } from 'react';
import { CuteDaisyFlower, CuteSakuraFlower, CuteSparkleStar } from './cuteFloralAssets';

interface CuteFloralParticlesProps {
  count?: number;
  className?: string;
  showFlowers?: boolean;
}

interface ParticleConfig {
  id: number;
  left: number;
  size: number;
  fallDuration: number;
  swayDuration: number;
  delay: number;
  type: 'petal' | 'flower' | 'sparkle' | 'heart';
}

export const CuteFloralParticles: React.FC<CuteFloralParticlesProps> = ({
  count = 20,
  className = '',
  showFlowers = true,
}) => {
  const particles = useMemo<ParticleConfig[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      // Deterministic spread
      const left = ((i * 19.3 + 7) % 94) + 3;
      const size = 12 + ((i * 13) % 18); // 12px to 30px
      const fallDuration = 8 + ((i * 3.7) % 7); // 8s to 15s
      const swayDuration = 3 + ((i * 1.9) % 3); // 3s to 6s
      const delay = -((i * 1.3) % 10); // Spread out so they start immediately

      const types: Array<'petal' | 'flower' | 'sparkle' | 'heart'> = showFlowers
        ? ['petal', 'flower', 'sparkle', 'petal', 'heart']
        : ['petal', 'sparkle', 'petal', 'heart'];
      const type = types[i % types.length];

      return {
        id: i,
        left,
        size,
        fallDuration,
        swayDuration,
        delay,
        type,
      };
    });
  }, [count, showFlowers]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-10 ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 animate-cute-fall"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.fallDuration}s`,
            animationDelay: `${p.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        >
          <div
            className="animate-cute-sway"
            style={{
              animationDuration: `${p.swayDuration}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
            }}
          >
            {p.type === 'flower' && (
              <div style={{ width: p.size, height: p.size }} className="opacity-75">
                <CuteDaisyFlower className="w-full h-full" />
              </div>
            )}
            {p.type === 'petal' && (
              <div style={{ width: p.size * 0.9, height: p.size * 0.9 }} className="opacity-80">
                <CuteSakuraFlower className="w-full h-full" />
              </div>
            )}
            {p.type === 'sparkle' && (
              <div style={{ width: p.size * 0.7, height: p.size * 0.7 }} className="opacity-70 text-[#FFD166]">
                <CuteSparkleStar className="w-full h-full" />
              </div>
            )}
            {p.type === 'heart' && (
              <div
                style={{ width: p.size * 0.6, height: p.size * 0.6 }}
                className="opacity-60 text-[#FF6584] flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
