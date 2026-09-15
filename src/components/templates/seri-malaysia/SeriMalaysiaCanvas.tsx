import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Compass } from 'lucide-react';
import { CharacterOption } from './SeriMalaysiaCharacterSelector';

export interface Hotspot {
  id: string;
  name: string;
  x: number;
  y: number;
  radius: number;
  icon: string;
  modalType?: 'couple' | 'event' | 'story' | 'gallery' | 'gift' | 'wishes' | 'music';
}

interface SeriMalaysiaCanvasProps {
  character: CharacterOption;
  guestName?: string;
  onOpenModal: (modalType: 'couple' | 'event' | 'story' | 'gallery' | 'gift' | 'wishes') => void;
  onToggleMusic?: () => void;
}

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'couple',
    name: 'Pelaminan Pengantin',
    x: 360,
    y: 215,
    radius: 80,
    icon: '💍',
    modalType: 'couple',
  },
  {
    id: 'event',
    name: 'Rangkaian Acara',
    x: 160,
    y: 280,
    radius: 70,
    icon: '📜',
    modalType: 'event',
  },
  {
    id: 'story',
    name: 'Kisah Kasih & Cinta',
    x: 360,
    y: 440,
    radius: 70,
    icon: '♥',
    modalType: 'story',
  },
  {
    id: 'gallery',
    name: 'Gazebo Galeri Foto',
    x: 550,
    y: 560,
    radius: 70,
    icon: '📷',
    modalType: 'gallery',
  },
  {
    id: 'wishes',
    name: 'Buku Tamu & Doa',
    x: 175,
    y: 620,
    radius: 65,
    icon: '✉️',
    modalType: 'wishes',
  },
  {
    id: 'gift',
    name: 'Kotak Hadiah & Berkat',
    x: 360,
    y: 800,
    radius: 75,
    icon: '🎁',
    modalType: 'gift',
  },
  {
    id: 'bard',
    name: 'Musisi Taman',
    x: 530,
    y: 330,
    radius: 65,
    icon: '🎵',
    modalType: 'music',
  },
];

export const SeriMalaysiaCanvas: React.FC<SeriMalaysiaCanvasProps> = ({
  character,
  guestName = 'Tamu Undangan',
  onOpenModal,
  onToggleMusic,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Active nearby hotspot
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // Mobile detection
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    return typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);
  });

  // Game state refs (to avoid re-renders inside 60fps loop)
  const stateRef = useRef({
    // Map dimensions
    mapWidth: 720,
    mapHeight: 1080,

    // Player state
    player: {
      x: 360,
      y: 960,
      vx: 0,
      vy: 0,
      speed: 150, // px per sec
      direction: 'up' as 'down' | 'left' | 'right' | 'up',
      frame: 0,
      frameTime: 0,
      isMoving: false,
    },

    // Target position for click-to-walk
    target: null as { x: number; y: number } | null,

    // Keys down
    keys: {
      up: false,
      down: false,
      left: false,
      right: false,
    },

    // Camera
    camera: {
      x: 0,
      y: 0,
      zoom: 1,
    },

    // Falling petals particles
    petals: Array.from({ length: 24 }).map((_, i) => ({
      x: Math.random() * 720,
      y: Math.random() * 1080,
      size: 4 + Math.random() * 6,
      speedY: 20 + Math.random() * 30,
      speedX: 10 + Math.random() * 15,
      oscillation: Math.random() * Math.PI * 2,
      color: i % 2 === 0 ? 'rgba(255, 182, 193, 0.75)' : 'rgba(255, 240, 245, 0.85)',
    })),

    // Images
    images: {
      map: null as HTMLImageElement | null,
      couple: null as HTMLImageElement | null,
      player: null as HTMLImageElement | null,
      loaded: false,
    },

    activeHotspotId: null as string | null,
  });

  // Load game assets
  useEffect(() => {
    let isCancelled = false;

    const mapImg = new Image();
    mapImg.src = '/templates/seri-malaysia/world-garden.jpg';

    const coupleImg = new Image();
    coupleImg.src = '/templates/seri-malaysia/wedding-couple.png';

    const playerImg = new Image();
    playerImg.src = character.spriteUrl;

    let loadedCount = 0;
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount >= 3 && !isCancelled) {
        stateRef.current.images.map = mapImg;
        stateRef.current.images.couple = coupleImg;
        stateRef.current.images.player = playerImg;
        stateRef.current.images.loaded = true;
      }
    };

    mapImg.onload = checkLoaded;
    coupleImg.onload = checkLoaded;
    playerImg.onload = checkLoaded;

    return () => {
      isCancelled = true;
    };
  }, [character.spriteUrl]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const k = stateRef.current.keys;
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        k.up = true;
        stateRef.current.target = null;
      }
      if (['ArrowDown', 'KeyS'].includes(e.code)) {
        k.down = true;
        stateRef.current.target = null;
      }
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        k.left = true;
        stateRef.current.target = null;
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        k.right = true;
        stateRef.current.target = null;
      }

      // Space or Enter to trigger hotspot
      if (['Space', 'Enter'].includes(e.code)) {
        const hId = stateRef.current.activeHotspotId;
        if (hId) {
          e.preventDefault();
          triggerHotspot(hId);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = stateRef.current.keys;
      if (['ArrowUp', 'KeyW'].includes(e.code)) k.up = false;
      if (['ArrowDown', 'KeyS'].includes(e.code)) k.down = false;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) k.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) k.right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Hotspot trigger action
  const triggerHotspot = useCallback(
    (hotspotId: string) => {
      const h = HOTSPOTS.find((item) => item.id === hotspotId);
      if (!h) return;

      if (h.modalType === 'music') {
        if (onToggleMusic) onToggleMusic();
      } else if (h.modalType) {
        onOpenModal(h.modalType);
      }
    },
    [onOpenModal, onToggleMusic]
  );

  // Canvas Click / Tap to Walk
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickScreenX = e.clientX - rect.left;
    const clickScreenY = e.clientY - rect.top;

    const state = stateRef.current;
    const zoom = state.camera.zoom;

    // Convert screen coordinates to world coordinates
    const worldX = clickScreenX / zoom + state.camera.x;
    const worldY = clickScreenY / zoom + state.camera.y;

    // Clamp inside world bounds
    const clampedX = Math.max(60, Math.min(state.mapWidth - 60, worldX));
    const clampedY = Math.max(180, Math.min(state.mapHeight - 80, worldY));

    // Check if clicked directly on a hotspot
    for (const h of HOTSPOTS) {
      const dist = Math.hypot(clampedX - h.x, clampedY - h.y);
      if (dist <= h.radius) {
        // Move towards hotspot and trigger it
        state.target = { x: h.x, y: h.y + 30 };
        return;
      }
    }

    state.target = { x: clampedX, y: clampedY };
  };

  // Main 60fps Animation Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      // Sync canvas dimensions with container client size
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      const state = stateRef.current;
      const player = state.player;

      // 1. UPDATE PLAYER MOVEMENT
      let moveX = 0;
      let moveY = 0;

      if (state.keys.left) moveX -= 1;
      if (state.keys.right) moveX += 1;
      if (state.keys.up) moveY -= 1;
      if (state.keys.down) moveY += 1;

      // Target navigation (click-to-walk)
      if (state.target) {
        const dx = state.target.x - player.x;
        const dy = state.target.y - player.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 8) {
          moveX = dx / dist;
          moveY = dy / dist;
        } else {
          state.target = null;
        }
      }

      // Normalize diagonal movement
      if (moveX !== 0 && moveY !== 0) {
        const length = Math.hypot(moveX, moveY);
        moveX /= length;
        moveY /= length;
      }

      player.isMoving = moveX !== 0 || moveY !== 0;

      if (player.isMoving) {
        player.x += moveX * player.speed * dt;
        player.y += moveY * player.speed * dt;

        // Determine face direction
        if (Math.abs(moveX) > Math.abs(moveY)) {
          player.direction = moveX > 0 ? 'right' : 'left';
        } else {
          player.direction = moveY > 0 ? 'down' : 'up';
        }

        // Cycle animation frames (4 frames per direction)
        player.frameTime += dt;
        if (player.frameTime >= 0.12) {
          player.frameTime = 0;
          player.frame = (player.frame + 1) % 4;
        }
      } else {
        player.frame = 0;
      }

      // Clamp player inside map boundaries
      player.x = Math.max(60, Math.min(state.mapWidth - 60, player.x));
      player.y = Math.max(180, Math.min(state.mapHeight - 80, player.y));

      // 2. CHECK HOTSPOT PROXIMITY
      let nearestHotspot: Hotspot | null = null;
      let minDist = Infinity;

      for (const h of HOTSPOTS) {
        const d = Math.hypot(player.x - h.x, player.y - h.y);
        if (d <= h.radius && d < minDist) {
          minDist = d;
          nearestHotspot = h;
        }
      }

      if (nearestHotspot?.id !== state.activeHotspotId) {
        state.activeHotspotId = nearestHotspot?.id || null;
        setActiveHotspot(nearestHotspot);
      }

      // 3. UPDATE CAMERA
      // On mobile / portrait, zoom in ~1.35x. On desktop, fit comfortably.
      const isPortrait = cw < ch;
      const targetZoom = isPortrait
        ? Math.max(cw / 500, 1.1)
        : Math.min(cw / 720, ch / 800) * 1.25;

      state.camera.zoom = targetZoom;

      const viewW = cw / targetZoom;
      const viewH = ch / targetZoom;

      // Smooth camera follow player
      const targetCamX = Math.max(
        0,
        Math.min(state.mapWidth - viewW, player.x - viewW / 2)
      );
      const targetCamY = Math.max(
        0,
        Math.min(state.mapHeight - viewH, player.y - viewH / 2)
      );

      state.camera.x += (targetCamX - state.camera.x) * 0.1;
      state.camera.y += (targetCamY - state.camera.y) * 0.1;

      // 4. UPDATE PARTICLES (Falling flower petals)
      for (const p of state.petals) {
        p.y += p.speedY * dt;
        p.oscillation += dt * 2;
        p.x += (p.speedX + Math.sin(p.oscillation) * 15) * dt;

        if (p.y > state.mapHeight) {
          p.y = -10;
          p.x = Math.random() * state.mapWidth;
        }
        if (p.x > state.mapWidth) p.x = 0;
      }

      // 5. RENDER CANVAS
      ctx.clearRect(0, 0, cw, ch);
      ctx.save();

      // Apply camera transformation
      ctx.scale(state.camera.zoom, state.camera.zoom);
      ctx.translate(-state.camera.x, -state.camera.y);

      // A. Draw Map Background
      if (state.images.map && state.images.loaded) {
        ctx.drawImage(state.images.map, 0, 0, state.mapWidth, state.mapHeight);
      } else {
        // Fallback grass color
        ctx.fillStyle = '#476534';
        ctx.fillRect(0, 0, state.mapWidth, state.mapHeight);
      }

      // B. Draw Hotspot Ground Circles & Indicator Badges
      for (const h of HOTSPOTS) {
        const isNear = state.activeHotspotId === h.id;

        // Ground pulse circle
        ctx.beginPath();
        ctx.arc(h.x, h.y, h.radius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = isNear ? 'rgba(215, 187, 131, 0.4)' : 'rgba(215, 187, 131, 0.15)';
        ctx.fill();

        ctx.lineWidth = isNear ? 3 : 1.5;
        ctx.strokeStyle = isNear ? '#FFFCF3' : 'rgba(215, 187, 131, 0.6)';
        ctx.stroke();

        // Hotspot floating label tag
        ctx.save();
        ctx.font = 'bold 12px "Poppins", sans-serif';
        const text = `${h.icon} ${h.name}`;
        const textWidth = ctx.measureText(text).width;
        const boxH = 22;
        const boxW = textWidth + 18;
        const boxX = h.x - boxW / 2;
        const boxY = h.y - h.radius * 0.5 - 18;

        // Pill background
        ctx.fillStyle = isNear ? 'rgba(76, 3, 10, 0.92)' : 'rgba(42, 23, 19, 0.75)';
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 11);
        ctx.fill();

        ctx.strokeStyle = isNear ? '#D7BB83' : 'rgba(215, 187, 131, 0.4)';
        ctx.lineWidth = isNear ? 2 : 1;
        ctx.stroke();

        // Text
        ctx.fillStyle = isNear ? '#FFFCF3' : '#F4ECD8';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, h.x, boxY + boxH / 2);
        ctx.restore();
      }

      // C. Draw Couple Sprite on Stage (x: 360, y: 155)
      if (state.images.couple && state.images.loaded) {
        const cwW = 68;
        const cwH = 85;
        ctx.drawImage(state.images.couple, 360 - cwW / 2, 160 - cwH / 2, cwW, cwH);
      }

      // D. Draw Player Drop Shadow
      ctx.beginPath();
      ctx.ellipse(player.x, player.y + 24, 18, 7, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20, 9, 7, 0.35)';
      ctx.fill();

      // E. Draw Player Sprite (768x768 sheet, 192x192 frame)
      if (state.images.player && state.images.loaded) {
        let row = 0; // down
        if (player.direction === 'left') row = 1;
        if (player.direction === 'right') row = 2;
        if (player.direction === 'up') row = 3;

        const frameW = 192;
        const frameH = 192;
        const sx = player.frame * frameW;
        const sy = row * frameH;

        const destW = 64;
        const destH = 64;

        ctx.drawImage(
          state.images.player,
          sx,
          sy,
          frameW,
          frameH,
          player.x - destW / 2,
          player.y - destH / 2,
          destW,
          destH
        );
      } else {
        // Fallback dot
        ctx.beginPath();
        ctx.arc(player.x, player.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#8A1B26';
        ctx.fill();
      }

      // F. Draw Player Name Tag above head
      ctx.save();
      ctx.font = 'bold 10px "Poppins", sans-serif';
      const pText = guestName;
      const pWidth = ctx.measureText(pText).width;
      const pBoxW = pWidth + 12;
      const pBoxH = 16;
      const pBoxX = player.x - pBoxW / 2;
      const pBoxY = player.y - 42;

      ctx.fillStyle = 'rgba(76, 3, 10, 0.85)';
      ctx.beginPath();
      ctx.roundRect(pBoxX, pBoxY, pBoxW, pBoxH, 8);
      ctx.fill();

      ctx.strokeStyle = '#D7BB83';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#FFFCF3';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(pText, player.x, pBoxY + pBoxH / 2);
      ctx.restore();

      // G. Draw Target Destination Marker (if walking towards target)
      if (state.target) {
        ctx.beginPath();
        ctx.arc(state.target.x, state.target.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(215, 187, 131, 0.8)';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // H. Draw Falling Petal Particles
      for (const p of state.petals) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.oscillation);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore(); // Restore camera transformation

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [guestName]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-[#1A1015] select-none"
      style={{ touchAction: 'none' }}
    >
      {/* 60fps HTML5 Canvas Engine */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full block cursor-pointer"
      />

      {/* Proximity Interaction Prompt Banner */}
      {activeHotspot && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 animate-bounce">
          <button
            onClick={() => triggerHotspot(activeHotspot.id)}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4C030A] via-[#8A1B26] to-[#4C030A] text-[#FFFCF3] border-2 border-[#D7BB83] shadow-2xl hover:scale-105 active:scale-95 transition-all"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <span className="text-base">{activeHotspot.icon}</span>
            <div className="text-left">
              <div className="text-xs font-bold leading-none">
                Buka {activeHotspot.name}
              </div>
              <div className="text-[10px] text-[#D7BB83] leading-none mt-1">
                {isMobile ? 'Ketuk untuk membuka' : 'Tekan SPASI atau Klik'}
              </div>
            </div>
            <Sparkles className="w-4 h-4 text-[#D7BB83] animate-spin" style={{ animationDuration: '3s' }} />
          </button>
        </div>
      )}

      {/* Mobile Touch D-Pad / Controller */}
      {isMobile && (
        <div className="absolute bottom-20 left-4 z-20 flex flex-col items-center">
          <div className="grid grid-cols-3 gap-1 bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-[#D7BB83]/40 shadow-lg">
            <div />
            <button
              onTouchStart={() => (stateRef.current.keys.up = true)}
              onTouchEnd={() => (stateRef.current.keys.up = false)}
              onMouseDown={() => (stateRef.current.keys.up = true)}
              onMouseUp={() => (stateRef.current.keys.up = false)}
              className="w-11 h-11 rounded-xl bg-white/20 active:bg-[#4C030A] text-[#D7BB83] flex items-center justify-center font-bold text-lg shadow-sm"
              aria-label="Atas"
            >
              ▲
            </button>
            <div />

            <button
              onTouchStart={() => (stateRef.current.keys.left = true)}
              onTouchEnd={() => (stateRef.current.keys.left = false)}
              onMouseDown={() => (stateRef.current.keys.left = true)}
              onMouseUp={() => (stateRef.current.keys.left = false)}
              className="w-11 h-11 rounded-xl bg-white/20 active:bg-[#4C030A] text-[#D7BB83] flex items-center justify-center font-bold text-lg shadow-sm"
              aria-label="Kiri"
            >
              ◀
            </button>
            <div className="w-11 h-11 flex items-center justify-center">
              <Compass className="w-6 h-6 text-[#D7BB83]/60" />
            </div>
            <button
              onTouchStart={() => (stateRef.current.keys.right = true)}
              onTouchEnd={() => (stateRef.current.keys.right = false)}
              onMouseDown={() => (stateRef.current.keys.right = true)}
              onMouseUp={() => (stateRef.current.keys.right = false)}
              className="w-11 h-11 rounded-xl bg-white/20 active:bg-[#4C030A] text-[#D7BB83] flex items-center justify-center font-bold text-lg shadow-sm"
              aria-label="Kanan"
            >
              ▶
            </button>

            <div />
            <button
              onTouchStart={() => (stateRef.current.keys.down = true)}
              onTouchEnd={() => (stateRef.current.keys.down = false)}
              onMouseDown={() => (stateRef.current.keys.down = true)}
              onMouseUp={() => (stateRef.current.keys.down = false)}
              className="w-11 h-11 rounded-xl bg-white/20 active:bg-[#4C030A] text-[#D7BB83] flex items-center justify-center font-bold text-lg shadow-sm"
              aria-label="Bawah"
            >
              ▼
            </button>
            <div />
          </div>
        </div>
      )}

      {/* Mobile Action Button (Right bottom) */}
      {isMobile && activeHotspot && (
        <div className="absolute bottom-20 right-4 z-20 animate-pulse">
          <button
            onClick={() => triggerHotspot(activeHotspot.id)}
            className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#4C030A] to-[#8A1B26] text-[#D7BB83] border-2 border-[#D7BB83] flex flex-col items-center justify-center shadow-xl active:scale-95 transition-transform"
            aria-label="Aksi Pos"
          >
            <span className="text-lg">{activeHotspot.icon}</span>
            <span className="text-[9px] font-bold text-white uppercase mt-0.5">Buka</span>
          </button>
        </div>
      )}

      {/* Top Left Garden Title Tag */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="px-3.5 py-1.5 rounded-full bg-[#FFFCF3]/90 backdrop-blur-md border border-[#D7BB83] shadow-md flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold text-[#4C030A] font-serif tracking-wide">
            Laman Seri Taman Pengantin
          </span>
        </div>
      </div>
    </div>
  );
};
