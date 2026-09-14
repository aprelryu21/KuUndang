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
  y: number;
  width: number;
  height: number;
  type: 'question' | 'brick' | 'pipe';
  isHit?: boolean;
  bumpOffset?: number;
  content?: 'coin' | 'heart';
}

const WORLD_WIDTH = 4400;
const ZONE_BOUNDARIES = [
  { zone: 0, minX: 0, maxX: 650 },
  { zone: 1, minX: 650, maxX: 1300 },
  { zone: 2, minX: 1300, maxX: 1950 },
  { zone: 3, minX: 1950, maxX: 2650 },
  { zone: 4, minX: 2650, maxX: 3350 },
  { zone: 5, minX: 3350, maxX: 3950 },
  { zone: 6, minX: 3950, maxX: WORLD_WIDTH },
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
    keys: {
      left: false,
      right: false,
      up: false,
    },
    particles: [] as Particle[],
    blocks: [] as Block[],
    coinsInWorld: [] as { x: number; y: number; collected: boolean }[],
  });

  // Initialize level terrain, blocks, pipes, and coins
  useEffect(() => {
    const s = gameState.current;
    const groundY = 380; // normalized baseline, adjusted in render

    s.blocks = [
      // Zone 0: Welcome block
      { id: 1, x: 300, y: groundY - 80, width: 32, height: 32, type: 'question', content: 'coin' },
      { id: 2, x: 332, y: groundY - 80, width: 32, height: 32, type: 'brick' },
      { id: 3, x: 364, y: groundY - 80, width: 32, height: 32, type: 'question', content: 'heart' },

      // Zone 1: Couple Zone
      { id: 4, x: 800, y: groundY - 70, width: 48, height: 70, type: 'pipe' },
      { id: 5, x: 950, y: groundY - 85, width: 32, height: 32, type: 'brick' },
      { id: 6, x: 982, y: groundY - 85, width: 32, height: 32, type: 'question', content: 'coin' },
      { id: 7, x: 1014, y: groundY - 85, width: 32, height: 32, type: 'brick' },

      // Zone 2: Story Zone
      { id: 8, x: 1500, y: groundY - 80, width: 32, height: 32, type: 'question', content: 'coin' },
      { id: 9, x: 1620, y: groundY - 80, width: 48, height: 80, type: 'pipe' },
      { id: 10, x: 1780, y: groundY - 90, width: 32, height: 32, type: 'brick' },
      { id: 11, x: 1812, y: groundY - 90, width: 32, height: 32, type: 'question', content: 'heart' },

      // Zone 3: Events Zone (Stairs)
      { id: 12, x: 2200, y: groundY - 32, width: 32, height: 32, type: 'brick' },
      { id: 13, x: 2232, y: groundY - 64, width: 32, height: 32, type: 'brick' },
      { id: 14, x: 2264, y: groundY - 96, width: 32, height: 32, type: 'brick' },
      { id: 15, x: 2360, y: groundY - 90, width: 32, height: 32, type: 'question', content: 'coin' },
      { id: 16, x: 2500, y: groundY - 75, width: 48, height: 75, type: 'pipe' },

      // Zone 4: Gifts Zone
      { id: 17, x: 2850, y: groundY - 85, width: 32, height: 32, type: 'question', content: 'coin' },
      { id: 18, x: 2882, y: groundY - 85, width: 32, height: 32, type: 'brick' },
      { id: 19, x: 2914, y: groundY - 85, width: 32, height: 32, type: 'question', content: 'coin' },
      { id: 20, x: 3050, y: groundY - 80, width: 48, height: 80, type: 'pipe' },

      // Zone 5: RSVP Zone
      { id: 21, x: 3550, y: groundY - 85, width: 32, height: 32, type: 'question', content: 'heart' },
      { id: 22, x: 3680, y: groundY - 85, width: 32, height: 32, type: 'brick' },
      { id: 23, x: 3712, y: groundY - 85, width: 32, height: 32, type: 'question', content: 'coin' },
    ];

    // Collectible floating coins in sky
    s.coinsInWorld = [
      { x: 450, y: groundY - 60, collected: false },
      { x: 490, y: groundY - 60, collected: false },
      { x: 1150, y: groundY - 50, collected: false },
      { x: 1190, y: groundY - 50, collected: false },
      { x: 1900, y: groundY - 70, collected: false },
      { x: 2264, y: groundY - 130, collected: false },
      { x: 3200, y: groundY - 60, collected: false },
      { x: 3750, y: groundY - 60, collected: false },
    ];
  }, []);

  // Handle Teleport (when user clicks minimap or previous/next stage buttons)
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

      const groundY = canvas.height - 70;

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
      if (p.vy > 12) p.vy = 12; // Terminal fall velocity

      // Apply horizontal position
      p.x += p.vx;
      if (p.x < 20) p.x = 20;
      if (p.x > WORLD_WIDTH - 50) p.x = WORLD_WIDTH - 50;

      // Apply vertical position
      p.y += p.vy;

      // Ground Collision
      if (p.y >= groundY) {
        p.y = groundY;
        p.vy = 0;
        p.isGrounded = true;
      } else {
        p.isGrounded = false;
      }

      // 3. Block & Pipe Collisions
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

      // 4. Collectible Coins
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

      // 5. Zone Transition Detection
      const matchedZone = ZONE_BOUNDARIES.find((zb) => p.x >= zb.minX && p.x < zb.maxX);
      if (matchedZone && matchedZone.zone !== s.currentZone) {
        s.currentZone = matchedZone.zone;
        onZoneChange(matchedZone.zone);
        marioAudio.playPowerUp();
      }

      // 6. Finish Line & Partner Reunion Detection
      if (p.x >= 3980 && !s.hasReachedFinish) {
        s.hasReachedFinish = true;
        marioAudio.playFanfare();
        // Trigger massive wedding confetti fireworks!
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            spawnParticles(p.x + (Math.random() - 0.5) * 200, groundY - 140, '#FF5C8D', 16, 'heart');
            spawnParticles(p.x + (Math.random() - 0.5) * 200, groundY - 140, '#FFD166', 16, 'confetti');
          }, i * 300);
        }
      }

      // 7. Smooth Camera Tracking
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

      // A. Parallax Pixel Clouds in Sky
      const cloudPositions = [
        { x: 100, y: 50, scale: 1.2 },
        { x: 500, y: 70, scale: 0.9 },
        { x: 900, y: 40, scale: 1.4 },
        { x: 1400, y: 60, scale: 1.0 },
        { x: 1850, y: 50, scale: 1.3 },
        { x: 2300, y: 70, scale: 0.8 },
        { x: 2800, y: 45, scale: 1.2 },
        { x: 3300, y: 65, scale: 1.1 },
        { x: 3800, y: 40, scale: 1.5 },
      ];
      cloudPositions.forEach((cl) => {
        drawPixelCloud(ctx, cl.x, cl.y, cl.scale);
      });

      // B. Rolling Green Hills
      const hillPositions = [
        { x: 50, w: 220, h: 110 },
        { x: 600, w: 280, h: 140 },
        { x: 1200, w: 240, h: 120 },
        { x: 1750, w: 300, h: 150 },
        { x: 2400, w: 260, h: 130 },
        { x: 3100, w: 320, h: 160 },
        { x: 3700, w: 280, h: 140 },
      ];
      hillPositions.forEach((hp) => {
        drawGreenHill(ctx, hp.x, groundY, hp.w, hp.h);
      });

      // C. Ground Platform (Classic Brick & Grass)
      ctx.fillStyle = '#00A800'; // Green grass top
      ctx.fillRect(0, groundY, WORLD_WIDTH, 14);

      // Soil / Brick under grass
      ctx.fillStyle = '#C84C0C';
      ctx.fillRect(0, groundY + 14, WORLD_WIDTH, canvas.height - (groundY + 14));

      // Ground brick pattern lines
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, groundY + 14, WORLD_WIDTH, 2);
      for (let gx = 0; gx < WORLD_WIDTH; gx += 32) {
        ctx.fillRect(gx, groundY + 16, 2, canvas.height);
      }

      // D. Draw Blocks & Pipes
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

      // E. Draw Floating Coins in World
      s.coinsInWorld.forEach((coin) => {
        if (!coin.collected) {
          drawCoin(ctx, coin.x, coin.y, 9, s.tick);
        }
      });

      // F. Draw Wedding Castle at Finish Line
      drawWeddingCastle(ctx, 4000, groundY, s.tick);

      // G. Draw Partner at Finish Line
      // "Dibagian finish, akan ada pasangan dari karakter terpilih. Jika user memilih bride, maka yg muncul groom, dan sebaliknnya."
      const partnerX = 4070;
      const partnerY = groundY;
      const partnerFacingRight = false; // Facing left toward incoming player
      const partnerJump = s.hasReachedFinish ? Math.sin(s.tick * 0.2) > 0 : false;

      if (playerGender === 'tuan') {
        // Player is Groom -> Partner at finish is BRIDE!
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
        // Player is Bride -> Partner at finish is GROOM!
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

      // H. Draw Playable Character (Groom or Bride)
      const isMoving = Math.abs(p.vx) > 0.3;
      const isJumping = !p.isGrounded;

      if (playerGender === 'tuan') {
        // Groom character sprite
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
        // Bride character sprite
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

      // I. Render Active Particles (Coins, Sparkles, Hearts, Confetti)
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
          // Cute heart shape
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
