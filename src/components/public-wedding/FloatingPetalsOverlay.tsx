import React from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  type: 'rose_petal' | 'sakura_petal' | 'heart' | 'sparkle';
  left: number; // percentage across screen
  delay: number;
  duration: number;
  size: number;
  rotateFrom: number;
  rotateTo: number;
  swayAmount: number;
}

const PARTICLES: Particle[] = [
  { id: 1, type: 'sakura_petal', left: 5, delay: 0, duration: 11, size: 20, rotateFrom: 0, rotateTo: 360, swayAmount: 25 },
  { id: 2, type: 'heart', left: 14, delay: 2, duration: 9.5, size: 16, rotateFrom: -20, rotateTo: 20, swayAmount: 18 },
  { id: 3, type: 'rose_petal', left: 24, delay: 4, duration: 12, size: 22, rotateFrom: 30, rotateTo: -180, swayAmount: 30 },
  { id: 4, type: 'sparkle', left: 33, delay: 1, duration: 8, size: 14, rotateFrom: 0, rotateTo: 90, swayAmount: 12 },
  { id: 5, type: 'sakura_petal', left: 42, delay: 5.5, duration: 13, size: 18, rotateFrom: -45, rotateTo: 220, swayAmount: 22 },
  { id: 6, type: 'heart', left: 52, delay: 3, duration: 10, size: 17, rotateFrom: 15, rotateTo: -25, swayAmount: 20 },
  { id: 7, type: 'rose_petal', left: 62, delay: 1.5, duration: 11.5, size: 24, rotateFrom: 10, rotateTo: 270, swayAmount: 28 },
  { id: 8, type: 'sparkle', left: 71, delay: 4.5, duration: 8.5, size: 15, rotateFrom: 45, rotateTo: 135, swayAmount: 14 },
  { id: 9, type: 'sakura_petal', left: 81, delay: 2.8, duration: 12.5, size: 19, rotateFrom: -20, rotateTo: 320, swayAmount: 24 },
  { id: 10, type: 'heart', left: 91, delay: 0.5, duration: 9, size: 15, rotateFrom: -15, rotateTo: 25, swayAmount: 16 },
  { id: 11, type: 'rose_petal', left: 19, delay: 6.5, duration: 12, size: 21, rotateFrom: 40, rotateTo: -240, swayAmount: 26 },
  { id: 12, type: 'heart', left: 38, delay: 7, duration: 10.5, size: 14, rotateFrom: 10, rotateTo: -20, swayAmount: 18 },
  { id: 13, type: 'sakura_petal', left: 68, delay: 8, duration: 11, size: 20, rotateFrom: -30, rotateTo: 300, swayAmount: 25 },
  { id: 14, type: 'sparkle', left: 86, delay: 6, duration: 9, size: 13, rotateFrom: 0, rotateTo: 180, swayAmount: 10 },
  { id: 15, type: 'rose_petal', left: 48, delay: 9, duration: 13.5, size: 23, rotateFrom: 15, rotateTo: 360, swayAmount: 28 },
  { id: 16, type: 'heart', left: 77, delay: 8.5, duration: 9.8, size: 16, rotateFrom: -25, rotateTo: 20, swayAmount: 19 },
];

interface FloatingPetalsOverlayProps {
  className?: string;
}

export const FloatingPetalsOverlay: React.FC<FloatingPetalsOverlayProps> = ({
  className = 'absolute inset-0 pointer-events-none z-0 overflow-hidden select-none',
}) => {
  return (
    <div className={className} aria-hidden="true">
      {/* Global SVG Definitions for all petals */}
      <svg className="absolute w-0 h-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <defs>
          <linearGradient id="sakura-petal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0F3" />
            <stop offset="50%" stopColor="#F8C4CD" />
            <stop offset="100%" stopColor="#E992A2" />
          </linearGradient>
          <linearGradient id="rose-petal-grad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFDDE2" />
            <stop offset="50%" stopColor="#EFA4B1" />
            <stop offset="100%" stopColor="#D9778A" />
          </linearGradient>
        </defs>
      </svg>

      {PARTICLES.map((p) => {
        return (
          <motion.div
            key={p.id}
            style={{
              left: `${p.left}%`,
            }}
            initial={{
              top: '-35px',
              x: 0,
              rotate: p.rotateFrom,
              opacity: 0,
            }}
            animate={{
              top: '105%',
              x: [-p.swayAmount, p.swayAmount, -p.swayAmount / 2],
              rotate: p.rotateTo,
              opacity: [0, 0.8, 0.85, 0.7, 0],
            }}
            transition={{
              top: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: p.duration,
                delay: p.delay,
                ease: 'linear',
              },
              x: {
                repeat: Infinity,
                repeatType: 'mirror',
                duration: p.duration / 3,
                delay: p.delay,
                ease: 'easeInOut',
              },
              rotate: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: p.duration,
                delay: p.delay,
                ease: 'linear',
              },
              opacity: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: p.duration,
                delay: p.delay,
                times: [0, 0.1, 0.5, 0.85, 1],
              },
            }}
            className="absolute will-change-transform pointer-events-none"
          >
            {/* Sakura Petal */}
            {p.type === 'sakura_petal' && (
              <svg
                width={p.size}
                height={p.size * 1.3}
                viewBox="0 0 30 40"
                fill="none"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(223, 191, 193, 0.35))' }}
              >
                <path
                  d="M15 0 C24 8 30 22 24 34 C20 40 10 40 6 34 C0 22 6 8 15 0 Z"
                  fill="url(#sakura-petal-grad)"
                  opacity="0.88"
                />
              </svg>
            )}

            {/* Rose Petal */}
            {p.type === 'rose_petal' && (
              <svg
                width={p.size}
                height={p.size * 1.1}
                viewBox="0 0 32 36"
                fill="none"
                style={{ filter: 'drop-shadow(0 2px 5px rgba(200, 100, 120, 0.3))' }}
              >
                <path
                  d="M16 2 C26 6 32 18 28 28 C24 36 8 36 4 28 C0 18 6 6 16 2 Z"
                  fill="url(#rose-petal-grad)"
                  opacity="0.85"
                />
              </svg>
            )}

            {/* Cute Floating Heart */}
            {p.type === 'heart' && (
              <svg
                width={p.size}
                height={p.size}
                viewBox="0 0 24 24"
                fill="none"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(217, 119, 138, 0.4))' }}
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="#EFA4B1"
                  stroke="#C2A56B"
                  strokeWidth="0.8"
                  opacity="0.92"
                />
              </svg>
            )}

            {/* Shimmering Sparkle */}
            {p.type === 'sparkle' && (
              <svg
                width={p.size}
                height={p.size}
                viewBox="0 0 24 24"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 4px rgba(194, 165, 107, 0.7))' }}
              >
                <path
                  d="M12 0 L14 9 L23 12 L14 15 L12 24 L10 15 L1 12 L10 9 Z"
                  fill="#C2A56B"
                  opacity="0.9"
                />
              </svg>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
