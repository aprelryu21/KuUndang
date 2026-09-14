import React, { useRef, useEffect, useCallback } from 'react';
import {
  drawBrideSprite,
  drawGroomSprite,
  drawQuestionBlock,
  drawBrickBlock,
  drawPipe,
  drawCoin,
  drawPixelCloud,
  drawGreenHill,
  drawWeddingCastle,
  drawSpikes,
  Particle,
} from './marioSprites';
import { marioAudio } from './marioAudio';

export interface MarioCanvasGameProps {
  playerGender: 'tuan' | 'nyonya';
  onZoneChange: (zone: number) => void;
  onCoinCollect: (coins: number, score: number) => void;
  targetTeleportX?: number | null;
  onTeleportComplete?: () => void;
  isMovingLeft: boolean;
  isMovingRight: boolean;
  isJumpRequested: boolean;
  onJumpHandled: () => void;
}

interface Block {
  id: number;
  x: number;
  groundOffset: number; // Height above ground: y = groundY - groundOffset
  y: number;
  width: number;
  height: number;
  type: 'question' | 'brick' | 'pipe';
  isHit?: boolean;
  bumpOffset?: number;
  content?: 'coin' | 'heart';
}

interface WorldCoin {
  x: number;
  groundOffset: number;
  y: number;
  collected: boolean;
}

interface SpikeObstacle {
  x: number;
  width: number;
  safeCheckpointX: number;
}

interface PitObstacle {
  startX: number;
  endX: number;
  safeCheckpointX: number;
}

export const WORLD_WIDTH = 7600;

export const ZONE_BOUNDARIES = [
  { zone: 0, minX: 0, maxX: 850 },            // World 1-1: Sambutan
  { zone: 1, minX: 850, maxX: 1800 },         // World 1-2: Mempelai (Spike at 880)
  { zone: 2, minX: 1800, maxX: 2750 },        // World 1-3: Kisah Kasih (Pit at 1820)
  { zone: 3, minX: 2750, maxX: 3700 },        // World 1-4: Rangkaian Acara (Spike at 2770)
  { zone: 4, minX: 3700, maxX: 4650 },        // World 1-5: Galeri Kenangan (Pit at 3720)
  { zone: 5, minX: 4650, maxX: 5600 },        // World 1-6: Tanda Kasih (Spike at 4670)
  { zone: 6, minX: 5600, maxX: 6550 },        // World 1-7: Buku Tamu & RSVP (Pit at 5620)
  { zone: 7, minX: 6550, maxX: WORLD_WIDTH }, // World 1-8: Pelaminan Impian & Finish (Spike at 6570)
];

const PITS: PitObstacle[] = [
  { startX: 1820, endX: 1890, safeCheckpointX: 1730 }, // Between Mempelai & Kisah Kasih
  { startX: 3720, endX: 3790, safeCheckpointX: 3630 }, // Between Acara & Galeri
  { startX: 5620, endX: 5690, safeCheckpointX: 5530 }, // Between Tanda Kasih & RSVP
];

const SPIKES: SpikeObstacle[] = [
  { x: 880, width: 64, safeCheckpointX: 800 },         // Between Sambutan & Mempelai
  { x: 2770, width: 64, safeCheckpointX: 2690 },       // Between Kisah Kasih & Acara
  { x: 4670, width: 64, safeCheckpointX: 4590 },       // Between Galeri & Tanda Kasih
  { x: 6570, width: 64, safeCheckpointX: 6490 },       // Between RSVP & Pelaminan
];

export const MarioCanvasGame: React.FC<MarioCanvasGameProps> = ({
  playerGender,
  onZoneChange,
  onCoinCollect,
  targetTeleportX,
  onTeleportComplete,
  isMovingLeft,
  isMovingRight,
  isJumpRequested,
  onJumpHandled,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game state stored in refs to allow ultra-smooth 60fps requestAnimationFrame loop
  const gameState = useRef({
    player: {
      x: 100,
      y: 300,
      vx: 0,
      vy: 0,
      width: 28,
      height: 48,
      isGrounded: false,
      facingRight: true,
    },
    cameraX: 0,
    tick: 0,
    coins: 0,
    score: 0,
    currentZone: 0,
    hasReachedFinish: false,
    invulnerabilityTimer: 0,
    keys: {
      left: false,
      right: false,
      up: false,
    },
    particles: [] as Particle[],
    blocks: [] as Block[],
    coinsInWorld: [] as WorldCoin[],
  });

  // Initialize level terrain, blocks, pipes, and coins with ground offsets
  useEffect(() => {
    const s = gameState.current;

    s.blocks = [
      // Zone 0: Sambutan (World 1-1)
      { id: 1, x: 300, groundOffset: 110, y: 0, width: 32, height: 32, type: 'question', content: 'coin' },
      { id: 2, x: 332, groundOffset: 110, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 3, x: 364, groundOffset: 110, y: 0, width: 32, height: 32, type: 'question', content: 'heart' },
      { id: 4, x: 680, groundOffset: 70, y: 0, width: 48, height: 70, type: 'pipe' },

      // Zone 1: Mempelai (World 1-2)
      { id: 5, x: 1050, groundOffset: 115, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 6, x: 1082, groundOffset: 115, y: 0, width: 32, height: 32, type: 'question', content: 'coin' },
      { id: 7, x: 1114, groundOffset: 115, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 8, x: 1350, groundOffset: 80, y: 0, width: 48, height: 80, type: 'pipe' },
      { id: 9, x: 1550, groundOffset: 120, y: 0, width: 32, height: 32, type: 'question', content: 'heart' },
      { id: 10, x: 1582, groundOffset: 120, y: 0, width: 32, height: 32, type: 'brick' },

      // Zone 2: Kisah Kasih (World 1-3)
      { id: 11, x: 2050, groundOffset: 32, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 12, x: 2082, groundOffset: 64, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 13, x: 2114, groundOffset: 96, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 14, x: 2320, groundOffset: 75, y: 0, width: 48, height: 75, type: 'pipe' },
      { id: 15, x: 2480, groundOffset: 115, y: 0, width: 32, height: 32, type: 'question', content: 'coin' },
      { id: 16, x: 2512, groundOffset: 115, y: 0, width: 32, height: 32, type: 'brick' },

      // Zone 3: Rangkaian Acara (World 1-4)
      { id: 17, x: 3000, groundOffset: 110, y: 0, width: 32, height: 32, type: 'question', content: 'heart' },
      { id: 18, x: 3032, groundOffset: 110, y: 0, width: 32, height: 32, type: 'question', content: 'coin' },
      { id: 19, x: 3250, groundOffset: 85, y: 0, width: 48, height: 85, type: 'pipe' },
      { id: 20, x: 3450, groundOffset: 115, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 21, x: 3482, groundOffset: 115, y: 0, width: 32, height: 32, type: 'question', content: 'coin' },

      // Zone 4: Galeri Kenangan (World 1-5)
      { id: 22, x: 3950, groundOffset: 70, y: 0, width: 48, height: 70, type: 'pipe' },
      { id: 23, x: 4200, groundOffset: 115, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 24, x: 4232, groundOffset: 115, y: 0, width: 32, height: 32, type: 'question', content: 'heart' },
      { id: 25, x: 4264, groundOffset: 115, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 26, x: 4450, groundOffset: 85, y: 0, width: 48, height: 85, type: 'pipe' },

      // Zone 5: Tanda Kasih (World 1-6)
      { id: 27, x: 4900, groundOffset: 115, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 28, x: 4932, groundOffset: 115, y: 0, width: 32, height: 32, type: 'question', content: 'coin' },
      { id: 29, x: 4964, groundOffset: 115, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 30, x: 4996, groundOffset: 115, y: 0, width: 32, height: 32, type: 'question', content: 'coin' },
      { id: 31, x: 5028, groundOffset: 115, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 32, x: 5300, groundOffset: 75, y: 0, width: 48, height: 75, type: 'pipe' },

      // Zone 6: Buku Tamu & RSVP (World 1-7)
      { id: 33, x: 5850, groundOffset: 32, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 34, x: 5882, groundOffset: 64, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 35, x: 5914, groundOffset: 96, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 36, x: 6100, groundOffset: 115, y: 0, width: 32, height: 32, type: 'question', content: 'heart' },
      { id: 37, x: 6132, groundOffset: 115, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 38, x: 6300, groundOffset: 80, y: 0, width: 48, height: 80, type: 'pipe' },

      // Zone 7: Pelaminan Impian & Finish (World 1-8)
      { id: 39, x: 6780, groundOffset: 115, y: 0, width: 32, height: 32, type: 'brick' },
      { id: 40, x: 6812, groundOffset: 115, y: 0, width: 32, height: 32, type: 'question', content: 'heart' },
    ];

    // Floating Coins placed above ground
    s.coinsInWorld = [
      { x: 460, groundOffset: 60, y: 0, collected: false },
      { x: 500, groundOffset: 60, y: 0, collected: false },
      { x: 1200, groundOffset: 60, y: 0, collected: false },
      { x: 1240, groundOffset: 60, y: 0, collected: false },
      { x: 2114, groundOffset: 140, y: 0, collected: false },
      { x: 2400, groundOffset: 60, y: 0, collected: false },
      { x: 3120, groundOffset: 60, y: 0, collected: false },
      { x: 3550, groundOffset: 60, y: 0, collected: false },
      { x: 4100, groundOffset: 60, y: 0, collected: false },
      { x: 4364, groundOffset: 160, y: 0, collected: false },
      { x: 5120, groundOffset: 60, y: 0, collected: false },
      { x: 5450, groundOffset: 60, y: 0, collected: false },
      { x: 6200, groundOffset: 60, y: 0, collected: false },
      { x: 6850, groundOffset: 60, y: 0, collected: false },
    ];
  }, []);

  // Handle Teleport (when user clicks minimap stage dots)
  useEffect(() => {
    if (targetTeleportX !== null && targetTeleportX !== undefined) {
      const s = gameState.current;
      s.player.x = targetTeleportX;
      s.player.vx = 0;
      s.player.vy = 0;
      marioAudio.playPowerUp();
      if (onTeleportComplete) onTeleportComplete();
    }
  }, [targetTeleportX, onTeleportComplete]);

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const k = gameState.current.keys;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        k.left = true;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        k.right = true;
      }
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        const p = gameState.current.player;
        if (p.isGrounded) {
          p.vy = -12;
          p.isGrounded = false;
          marioAudio.playJump();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = gameState.current.keys;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        k.left = false;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        k.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle touch / on-screen jump trigger
  useEffect(() => {
    if (isJumpRequested) {
      const p = gameState.current.player;
      if (p.isGrounded) {
        p.vy = -12;
        p.isGrounded = false;
        marioAudio.playJump();
      }
      onJumpHandled();
    }
  }, [isJumpRequested, onJumpHandled]);

  // Spawn particle effect
  const spawnParticles = useCallback(
    (x: number, y: number, color: string, count = 8, type: 'heart' | 'sparkle' | 'confetti' = 'sparkle') => {
      const s = gameState.current;
      for (let i = 0; i < count; i++) {
        s.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: -Math.random() * 6 - 2,
          color,
          size: Math.random() * 5 + 3,
          alpha: 1,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          type,
        });
      }
    },
    []
  );

  // Main 60 FPS Canvas Game Loop
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive Canvas Resizing
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const loop = () => {
      const s = gameState.current;
      const p = s.player;
      s.tick++;

      // Elevated ground level so it never sinks or gets covered by bottom controls
      const groundY = Math.max(260, canvas.height - (canvas.height < 650 ? 120 : 140));

      // Recalculate dynamic Y position for all blocks and coins relative to groundY
      s.blocks.forEach((block) => {
        block.y = groundY - block.groundOffset;
      });
      s.coinsInWorld.forEach((coin) => {
        coin.y = groundY - coin.groundOffset;
      });

      // 1. Player Input & Horizontal Velocity
      const moveLeft = s.keys.left || isMovingLeft;
      const moveRight = s.keys.right || isMovingRight;

      if (moveLeft) {
        p.vx = -4.8;
        p.facingRight = false;
      } else if (moveRight) {
        p.vx = 4.8;
        p.facingRight = true;
      } else {
        p.vx *= 0.78; // friction
        if (Math.abs(p.vx) < 0.1) p.vx = 0;
      }

      // 2. Vertical Physics (Gravity)
      p.vy += 0.55;
      if (p.vy > 13) p.vy = 13; // Terminal fall velocity

      // Apply horizontal position
      p.x += p.vx;
      if (p.x < 20) p.x = 20;
      if (p.x > WORLD_WIDTH - 50) p.x = WORLD_WIDTH - 50;

      // Apply vertical position
      p.y += p.vy;

      // 3. Ground Collision & Pit Detection
      const activePit = PITS.find((pit) => p.x + 8 > pit.startX && p.x - 8 < pit.endX);

      if (activePit) {
        // Player is over a pit! No ground under feet
        p.isGrounded = false;
        // If fallen below screen, trigger pit respawn
        if (p.y > canvas.height + 40) {
          marioAudio.playBump();
          spawnParticles(activePit.safeCheckpointX, groundY - 20, '#FF5C8D', 12, 'sparkle');
          p.x = activePit.safeCheckpointX;
          p.y = groundY;
          p.vx = 0;
          p.vy = 0;
          p.isGrounded = true;
        }
      } else {
        // Solid ground collision
        if (p.y >= groundY) {
          p.y = groundY;
          p.vy = 0;
          p.isGrounded = true;
        } else {
          p.isGrounded = false;
        }
      }

      // 4. Spikes Obstacle Collision & Respawn
      if (s.invulnerabilityTimer <= 0) {
        const hitSpike = SPIKES.find(
          (sp) =>
            p.x + 10 > sp.x &&
            p.x - 10 < sp.x + sp.width &&
            p.y >= groundY - 14
        );
        if (hitSpike) {
          s.invulnerabilityTimer = 45; // invulnerability frames
          marioAudio.playBump();
          spawnParticles(p.x, groundY - 20, '#E60012', 15, 'confetti');
          p.x = hitSpike.safeCheckpointX;
          p.y = groundY;
          p.vx = 0;
          p.vy = 0;
          p.isGrounded = true;
        }
      } else {
        s.invulnerabilityTimer--;
      }

      // 5. Block & Pipe Collisions
      s.blocks.forEach((block) => {
        // Recover block bump
        if (block.bumpOffset && block.bumpOffset < 0) {
          block.bumpOffset += 1.5;
          if (block.bumpOffset > 0) block.bumpOffset = 0;
        }

        // Horizontal box checking
        const pLeft = p.x - 14;
        const pRight = p.x + 14;
        const pTop = p.y - 48;
        const pBottom = p.y;

        const bLeft = block.x;
        const bRight = block.x + block.width;
        const bTop = block.y;
        const bBottom = block.y + block.height;

        // Check if overlapping
        if (pRight > bLeft && pLeft < bRight && pBottom > bTop && pTop < bBottom) {
          // Player hit from below (Head bump)
          if (p.vy < 0 && pTop - p.vy >= bBottom - 12) {
            p.y = bBottom + 48;
            p.vy = 1;

            // Trigger block reaction
            if (!block.isHit) {
              block.isHit = true;
              block.bumpOffset = -10;
              marioAudio.playBump();

              if (block.content === 'coin') {
                s.coins += 1;
                s.score += 200;
                marioAudio.playCoin();
                spawnParticles(block.x + 16, block.y - 10, '#FFD166', 10, 'sparkle');
                onCoinCollect(s.coins, s.score);
              } else if (block.content === 'heart') {
                s.score += 500;
                marioAudio.playPowerUp();
                spawnParticles(block.x + 16, block.y - 10, '#FF5C8D', 12, 'heart');
                onCoinCollect(s.coins, s.score);
              }
            }
          }
          // Player landed on top of block/pipe
          else if (p.vy > 0 && pBottom - p.vy <= bTop + 14) {
            p.y = bTop;
            p.vy = 0;
            p.isGrounded = true;
          }
          // Sideways collision
          else if (p.vx > 0 && pRight - p.vx <= bLeft + 8) {
            p.x = bLeft - 14;
            p.vx = 0;
          } else if (p.vx < 0 && pLeft - p.vx >= bRight - 8) {
            p.x = bRight + 14;
            p.vx = 0;
          }
        }
      });

      // 6. Collectible Coins
      s.coinsInWorld.forEach((coin) => {
        if (!coin.collected) {
          const dist = Math.hypot(p.x - coin.x, p.y - 24 - coin.y);
          if (dist < 28) {
            coin.collected = true;
            s.coins += 1;
            s.score += 100;
            marioAudio.playCoin();
            spawnParticles(coin.x, coin.y, '#FFE082', 8, 'sparkle');
            onCoinCollect(s.coins, s.score);
          }
        }
      });

      // 7. Zone Transition Detection (8 Zones)
      const matchedZone = ZONE_BOUNDARIES.find((zb) => p.x >= zb.minX && p.x < zb.maxX);
      if (matchedZone && matchedZone.zone !== s.currentZone) {
        s.currentZone = matchedZone.zone;
        onZoneChange(matchedZone.zone);
        marioAudio.playPowerUp();
      }

      // 8. Finish Line & Partner Reunion Detection
      if (p.x >= 7050 && !s.hasReachedFinish) {
        s.hasReachedFinish = true;
        marioAudio.playFanfare();
        // Trigger massive wedding confetti fireworks!
        for (let i = 0; i < 6; i++) {
          setTimeout(() => {
            spawnParticles(p.x + (Math.random() - 0.5) * 250, groundY - 140, '#FF5C8D', 16, 'heart');
            spawnParticles(p.x + (Math.random() - 0.5) * 250, groundY - 140, '#FFD166', 16, 'confetti');
          }, i * 300);
        }
      }

      // 9. Smooth Camera Tracking
      const targetCamX = p.x - canvas.width * 0.35;
      s.cameraX += (targetCamX - s.cameraX) * 0.1;
      if (s.cameraX < 0) s.cameraX = 0;
      if (s.cameraX > WORLD_WIDTH - canvas.width) s.cameraX = Math.max(0, WORLD_WIDTH - canvas.width);

      // ================= RENDERING =================
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky gradient (Super Mario 8-Bit Sky)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, '#5C94FC');
      skyGrad.addColorStop(0.7, '#88B8FC');
      skyGrad.addColorStop(1, '#B0D4FC');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(-Math.round(s.cameraX), 0);

      // A. Parallax Pixel Clouds in Sky (Across 7600px)
      const cloudPositions = [
        { x: 100, y: 50, scale: 1.2 },
        { x: 550, y: 70, scale: 0.9 },
        { x: 1000, y: 40, scale: 1.4 },
        { x: 1500, y: 65, scale: 1.0 },
        { x: 2000, y: 45, scale: 1.3 },
        { x: 2500, y: 70, scale: 0.8 },
        { x: 3000, y: 45, scale: 1.2 },
        { x: 3500, y: 65, scale: 1.1 },
        { x: 4000, y: 40, scale: 1.4 },
        { x: 4500, y: 70, scale: 0.9 },
        { x: 5000, y: 50, scale: 1.3 },
        { x: 5500, y: 65, scale: 1.0 },
        { x: 6000, y: 45, scale: 1.2 },
        { x: 6500, y: 70, scale: 0.8 },
        { x: 7000, y: 40, scale: 1.5 },
      ];
      cloudPositions.forEach((cl) => {
        drawPixelCloud(ctx, cl.x, cl.y, cl.scale);
      });

      // B. Rolling Green Hills (Across 7600px)
      const hillPositions = [
        { x: 50, w: 220, h: 110 },
        { x: 650, w: 280, h: 140 },
        { x: 1300, w: 240, h: 120 },
        { x: 1950, w: 300, h: 150 },
        { x: 2600, w: 260, h: 130 },
        { x: 3300, w: 320, h: 160 },
        { x: 4000, w: 280, h: 140 },
        { x: 4700, w: 300, h: 150 },
        { x: 5400, w: 260, h: 130 },
        { x: 6100, w: 320, h: 160 },
        { x: 6800, w: 280, h: 140 },
      ];
      hillPositions.forEach((hp) => {
        drawGreenHill(ctx, hp.x, groundY, hp.w, hp.h);
      });

      // C. Solid Ground Segments (Excluding Pits)
      const solidSegments: { start: number; end: number }[] = [];
      let currentSegStart = 0;
      PITS.forEach((pit) => {
        if (pit.startX > currentSegStart) {
          solidSegments.push({ start: currentSegStart, end: pit.startX });
        }
        currentSegStart = pit.endX;
      });
      if (currentSegStart < WORLD_WIDTH) {
        solidSegments.push({ start: currentSegStart, end: WORLD_WIDTH });
      }

      solidSegments.forEach((seg) => {
        const segWidth = seg.end - seg.start;
        // 1. Green grass top
        ctx.fillStyle = '#00A800';
        ctx.fillRect(seg.start, groundY, segWidth, 14);

        // 2. Soil / Brick under grass
        ctx.fillStyle = '#C84C0C';
        ctx.fillRect(seg.start, groundY + 14, segWidth, canvas.height - (groundY + 14));

        // 3. Ground brick pattern lines
        ctx.fillStyle = '#000000';
        ctx.fillRect(seg.start, groundY + 14, segWidth, 2);
        const firstGrid = Math.ceil(seg.start / 32) * 32;
        for (let gx = firstGrid; gx < seg.end; gx += 32) {
          ctx.fillRect(gx, groundY + 16, 2, canvas.height);
        }

        // 4. Dark pit edge borders
        ctx.fillStyle = '#1A1009';
        ctx.fillRect(seg.start, groundY, 2, canvas.height - groundY);
        ctx.fillRect(seg.end - 2, groundY, 2, canvas.height - groundY);
      });

      // D. Draw Spikes Obstacles
      SPIKES.forEach((sp) => {
        drawSpikes(ctx, sp.x, groundY, sp.width, 20);
      });

      // E. Draw Blocks & Pipes (Directly seated on ground)
      s.blocks.forEach((block) => {
        const drawY = block.y + (block.bumpOffset || 0);
        if (block.type === 'question') {
          drawQuestionBlock(ctx, block.x, drawY, block.width, block.isHit || false, s.tick);
        } else if (block.type === 'brick') {
          drawBrickBlock(ctx, block.x, drawY, block.width);
        } else if (block.type === 'pipe') {
          drawPipe(ctx, block.x, drawY, block.width, block.height);
        }
      });

      // F. Draw Floating Coins in World
      s.coinsInWorld.forEach((coin) => {
        if (!coin.collected) {
          drawCoin(ctx, coin.x, coin.y, 9, s.tick);
        }
      });

      // G. Draw Wedding Castle at Finish Line
      drawWeddingCastle(ctx, 7080, groundY, s.tick);

      // H. Draw Partner at Finish Line
      const partnerX = 7160;
      const partnerY = groundY;
      const partnerFacingRight = false; // Facing left toward incoming player
      const partnerJump = s.hasReachedFinish ? Math.sin(s.tick * 0.2) > 0 : false;

      if (playerGender === 'tuan') {
        drawBrideSprite(
          ctx,
          partnerX,
          partnerY,
          partnerFacingRight,
          s.hasReachedFinish,
          partnerJump,
          s.tick,
          2.1
        );
      } else {
        drawGroomSprite(
          ctx,
          partnerX,
          partnerY,
          partnerFacingRight,
          s.hasReachedFinish,
          partnerJump,
          s.tick,
          2.1
        );
      }

      // Heart balloon above partner
      const heartBounce = Math.sin(s.tick * 0.1) * 5;
      ctx.fillStyle = '#E60012';
      ctx.font = 'bold 14px monospace';
      ctx.fillText('❤ AKU MENUNGGUMU ❤', partnerX - 25, partnerY - 65 + heartBounce);

      // I. Draw Playable Character (with damage blink)
      const isMoving = Math.abs(p.vx) > 0.3;
      const isJumping = !p.isGrounded;
      const shouldRenderPlayer = s.invulnerabilityTimer <= 0 || Math.floor(s.invulnerabilityTimer / 4) % 2 === 0;

      if (shouldRenderPlayer) {
        if (playerGender === 'tuan') {
          drawGroomSprite(
            ctx,
            p.x,
            p.y,
            p.facingRight,
            isMoving,
            isJumping,
            s.tick,
            2.1
          );
        } else {
          drawBrideSprite(
            ctx,
            p.x,
            p.y,
            p.facingRight,
            isMoving,
            isJumping,
            s.tick,
            2.1
          );
        }
      }

      // J. Render Active Particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const pt = s.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.2; // gravity
        pt.life++;
        pt.alpha = 1 - pt.life / pt.maxLife;

        if (pt.life >= pt.maxLife) {
          s.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.fillStyle = pt.color;

        if (pt.type === 'heart') {
          ctx.font = `${Math.round(pt.size * 2)}px monospace`;
          ctx.fillText('❤', pt.x, pt.y);
        } else if (pt.type === 'confetti') {
          ctx.fillRect(pt.x, pt.y, pt.size * 1.5, pt.size);
        } else {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [playerGender, onZoneChange, onCoinCollect, spawnParticles, isMovingLeft, isMovingRight]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none touch-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
