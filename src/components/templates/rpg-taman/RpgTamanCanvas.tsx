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
  propKey?: string;
  propW?: number;
  propH?: number;
  propOffsetY?: number;
  modalType?: 'couple' | 'event' | 'story' | 'gallery' | 'gift' | 'wishes' | 'music';
  // Solid obstacle bounds for collision
  obstacle?: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
}

// Master list of all hotspots on the 848 x 1264 bright wedding garden map
export const ALL_HOTSPOTS: Hotspot[] = [
  {
    id: 'couple',
    name: 'Pelaminan Pengantin',
    x: 424,
    y: 285,
    radius: 90,
    icon: '💍',
    propKey: 'couple',
    propW: 76,
    propH: 95,
    propOffsetY: -65,
    modalType: 'couple',
    obstacle: { minX: 320, maxX: 530, minY: 150, maxY: 250 },
  },
  {
    id: 'events',
    name: 'Rangkaian Acara',
    x: 210,
    y: 500,
    radius: 75,
    icon: '📜',
    propKey: 'eventKiosk',
    propW: 90,
    propH: 90,
    propOffsetY: -20,
    modalType: 'event',
    obstacle: { minX: 165, maxX: 255, minY: 440, maxY: 500 },
  },
  {
    id: 'story',
    name: 'Kisah Kasih & Cinta',
    x: 485,
    y: 450,
    radius: 70,
    icon: '♥',
    propKey: 'loveStory',
    propW: 80,
    propH: 80,
    propOffsetY: -15,
    modalType: 'story',
    obstacle: { minX: 445, maxX: 525, minY: 410, maxY: 460 },
  },
  {
    id: 'gallery',
    name: 'Gazebo Galeri Foto',
    x: 250,
    y: 865,
    radius: 80,
    icon: '📷',
    propKey: 'gallery',
    propW: 85,
    propH: 85,
    propOffsetY: -20,
    modalType: 'gallery',
    obstacle: { minX: 160, maxX: 335, minY: 720, maxY: 835 },
  },
  {
    id: 'gifts',
    name: 'Kotak Hadiah & Berkat',
    x: 775,
    y: 915,
    radius: 75,
    icon: '🎁',
    propKey: 'gift',
    propW: 85,
    propH: 75,
    propOffsetY: -15,
    modalType: 'gift',
    obstacle: { minX: 730, maxX: 825, minY: 875, maxY: 935 },
  },
  {
    id: 'wishes',
    name: 'Buku Tamu & Doa',
    x: 345,
    y: 1045,
    radius: 70,
    icon: '✉️',
    propKey: 'wishes',
    propW: 80,
    propH: 80,
    propOffsetY: -15,
    modalType: 'wishes',
    obstacle: { minX: 305, maxX: 375, minY: 1000, maxY: 1055 },
  },
  {
    id: 'music',
    name: 'Musisi Taman',
    x: 600,
    y: 520,
    radius: 65,
    icon: '🎵',
    propKey: 'bard',
    propW: 75,
    propH: 75,
    propOffsetY: -15,
    modalType: 'music',
    obstacle: { minX: 565, maxX: 635, minY: 480, maxY: 525 },
  },
];

// Additional static environmental solid obstacles (Lake, Pond, Fountain, Altar, Gazebo)
const ENVIRONMENT_OBSTACLES = [
  // 1. Garden fountain on the left
  { minX: 230, maxX: 340, minY: 600, maxY: 690 },
  // 2. Large gazebo on the left (flower gazebo)
  { minX: 130, maxX: 300, minY: 750, maxY: 920 },
  // 3. Top wedding altar / pelaminan
  { minX: 340, maxX: 510, minY: 150, maxY: 240 },
  // 4. Upper pond above the bridge (two fishermen)
  { minX: 570, maxX: 848, minY: 520, maxY: 645 },
  // 5. Lower main lake below the wooden bridge (with water lilies & rocks)
  // The wooden bridge is at Y: 645..730, X: 610..800 - leaving it fully OPEN & WALKABLE!
  { minX: 510, maxX: 848, minY: 730, maxY: 940 },
  // West shoreline curve of lower lake
  { minX: 470, maxX: 530, minY: 770, maxY: 860 },
];

interface SeriMalaysiaCanvasProps {
  character: CharacterOption;
  guestName?: string;
  enabledSections?: string[];
  spawnTrigger?: number;
  onOpenModal: (modalType: 'couple' | 'event' | 'story' | 'gallery' | 'gift' | 'wishes') => void;
  onToggleMusic?: () => void;
}

export const SeriMalaysiaCanvas: React.FC<SeriMalaysiaCanvasProps> = ({
  character,
  guestName = 'Tamu Undangan',
  enabledSections = ['couple', 'events', 'story', 'gallery', 'gifts', 'wishes', 'rsvp'],
  spawnTrigger = 0,
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

  // Filter hotspots based on enabled sections
  const activeHotspots = ALL_HOTSPOTS.filter((h) => {
    if (h.id === 'music') return true; // Musician always available
    if (h.id === 'wishes') {
      return enabledSections.includes('wishes') || enabledSections.includes('rsvp');
    }
    return enabledSections.includes(h.id);
  });

  // Game state refs (to avoid re-renders inside 60fps loop)
  const stateRef = useRef({
    // Map dimensions (matches world-garden-bright.jpg 848 x 1264)
    mapWidth: 848,
    mapHeight: 1264,

    // Player state
    player: {
      x: 500,
      y: 1180,
      speed: 155, // px per sec
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
    petals: Array.from({ length: 28 }).map((_, i) => ({
      x: Math.random() * 848,
      y: Math.random() * 1264,
      size: 4 + Math.random() * 6,
      speedY: 22 + Math.random() * 32,
      speedX: 10 + Math.random() * 18,
      oscillation: Math.random() * Math.PI * 2,
      color: i % 2 === 0 ? 'rgba(255, 182, 193, 0.85)' : 'rgba(255, 240, 245, 0.9)',
    })),

    // Images
    images: {
      map: null as HTMLImageElement | null,
      player: null as HTMLCanvasElement | HTMLImageElement | null,
      couple: null as HTMLImageElement | null,
      eventKiosk: null as HTMLImageElement | null,
      loveStory: null as HTMLImageElement | null,
      gallery: null as HTMLImageElement | null,
      gift: null as HTMLImageElement | null,
      wishes: null as HTMLImageElement | null,
      bard: null as HTMLImageElement | null,
      loaded: false,
    },

    activeHotspotId: null as string | null,

    // Spawn burst animation state
    spawnAnim: {
      active: false,
      startTime: 0,
      duration: 2.2,
      particles: [] as Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        color: string;
        alpha: number;
        rot: number;
      }>,
    },
  });

  // Advanced sprite normalization (matches Inveet's frameNormalization pipeline)
  // Extracts the character body's primary connected component, filters out stray floating pixels,
  // normalizes vertical height to 156px across all frames, and anchors baseline at 175px & center at 96px.
  const normalizeSpritesheet = (img: HTMLImageElement): HTMLCanvasElement => {
    const frameW = 192;
    const frameH = 192;
    const cols = 4;
    const rows = 4;
    const alphaThreshold = 32;
    const targetCenterX = 96;
    const targetBaselineY = 175;
    const targetVisibleHeight = 156;

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return canvas;

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imgData.data;

    // Helper: Find largest connected component in frame
    const findComponent = (startX: number, startY: number) => {
      const grid = new Uint8Array(frameW * frameH);
      const visited = new Uint8Array(frameW * frameH);

      for (let y = 0; y < frameH; y++) {
        for (let x = 0; x < frameW; x++) {
          const idx = ((startY + y) * img.width + (startX + x)) * 4;
          if (data[idx + 3] > alphaThreshold) {
            grid[y * frameW + x] = 1;
          }
        }
      }

      let bestComp: {
        pixels: { x: number; y: number }[];
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
        count: number;
      } | null = null;

      const queue = new Int32Array(frameW * frameH);

      for (let i = 0; i < grid.length; i++) {
        if (!grid[i] || visited[i]) continue;

        let head = 0;
        let tail = 0;
        queue[tail++] = i;
        visited[i] = 1;

        let minX = frameW, maxX = -1, minY = frameH, maxY = -1;
        const pixels: { x: number; y: number }[] = [];

        while (head < tail) {
          const p = queue[head++];
          const x = p % frameW;
          const y = Math.floor(p / frameW);
          pixels.push({ x, y });

          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;

          // 8-way connectivity
          const neighbors = [
            x > 0 ? p - 1 : -1,
            x + 1 < frameW ? p + 1 : -1,
            y > 0 ? p - frameW : -1,
            y + 1 < frameH ? p + frameW : -1,
            x > 0 && y > 0 ? p - frameW - 1 : -1,
            x + 1 < frameW && y > 0 ? p - frameW + 1 : -1,
            x > 0 && y + 1 < frameH ? p + frameW - 1 : -1,
            x + 1 < frameW && y + 1 < frameH ? p + frameW + 1 : -1,
          ];

          for (const n of neighbors) {
            if (n >= 0 && grid[n] && !visited[n]) {
              visited[n] = 1;
              queue[tail++] = n;
            }
          }
        }

        if (!bestComp || pixels.length > bestComp.count) {
          bestComp = { pixels, minX, minY, maxX, maxY, count: pixels.length };
        }
      }

      return bestComp;
    };

    // 1. Analyze all 16 frames
    const components: (ReturnType<typeof findComponent>)[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        components.push(findComponent(c * frameW, r * frameH));
      }
    }

    // 2. Compute median height across non-empty frames
    const heights = components
      .filter((comp): comp is NonNullable<typeof comp> => !!comp)
      .map((comp) => comp.maxY - comp.minY + 1)
      .sort((a, b) => a - b);

    const medianH = heights.length > 0 ? heights[Math.floor(heights.length / 2)] : targetVisibleHeight;
    const scale = targetVisibleHeight / Math.max(1, medianH);

    // 3. Render normalized output canvas
    const outCanvas = document.createElement('canvas');
    outCanvas.width = img.width;
    outCanvas.height = img.height;
    const outCtx = outCanvas.getContext('2d');
    if (!outCtx) return canvas;

    outCtx.imageSmoothingEnabled = false;

    components.forEach((comp, frameIdx) => {
      const col = frameIdx % cols;
      const row = Math.floor(frameIdx / cols);
      const frameStartX = col * frameW;
      const frameStartY = row * frameH;

      if (!comp) {
        outCtx.drawImage(
          img,
          frameStartX,
          frameStartY,
          frameW,
          frameH,
          frameStartX,
          frameStartY,
          frameW,
          frameH
        );
        return;
      }

      const compW = comp.maxX - comp.minX + 1;
      const compH = comp.maxY - comp.minY + 1;

      const destW = Math.max(1, Math.round(compW * scale));
      const destH = Math.max(1, Math.round(compH * scale));
      const destX = frameStartX + Math.round(targetCenterX - destW / 2);
      const destY = frameStartY + (targetBaselineY - destH);

      // Create temporary component canvas
      const compCanvas = document.createElement('canvas');
      compCanvas.width = compW;
      compCanvas.height = compH;
      const compCtx = compCanvas.getContext('2d');
      if (!compCtx) return;

      const compImgData = compCtx.createImageData(compW, compH);
      for (const p of comp.pixels) {
        const srcIdx = ((frameStartY + p.y) * img.width + (frameStartX + p.x)) * 4;
        const targetIdx = ((p.y - comp.minY) * compW + (p.x - comp.minX)) * 4;
        compImgData.data[targetIdx] = data[srcIdx];
        compImgData.data[targetIdx + 1] = data[srcIdx + 1];
        compImgData.data[targetIdx + 2] = data[srcIdx + 2];
        compImgData.data[targetIdx + 3] = data[srcIdx + 3];
      }
      compCtx.putImageData(compImgData, 0, 0);

      outCtx.save();
      outCtx.beginPath();
      outCtx.rect(frameStartX, frameStartY, frameW, frameH);
      outCtx.clip();
      outCtx.drawImage(compCanvas, 0, 0, compW, compH, destX, destY, destW, destH);
      outCtx.restore();
    });

    return outCanvas;
  };

  // Load all game assets & props
  useEffect(() => {
    let isCancelled = false;

    const loadImg = (url: string): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
      });
    };

    Promise.all([
      loadImg('/templates/seri-malaysia/world-garden-bright.jpg'),
      loadImg(character.spriteUrl),
      loadImg('/templates/seri-malaysia/wedding-couple.png'),
      loadImg('/templates/seri-malaysia/event-kiosk.png'),
      loadImg('/templates/seri-malaysia/love-story-shrine.png'),
      loadImg('/templates/seri-malaysia/gallery-pavilion.png'),
      loadImg('/templates/seri-malaysia/gift-pavilion.png'),
      loadImg('/templates/seri-malaysia/wishes-station.png'),
      loadImg('/templates/seri-malaysia/bard-musician.png'),
    ]).then(([map, playerRaw, couple, eventKiosk, loveStory, gallery, gift, wishes, bard]) => {
      if (isCancelled) return;

      // Normalize player frames to eliminate any wobbling/choppiness
      const normalizedPlayer = normalizeSpritesheet(playerRaw);

      stateRef.current.images.map = map;
      stateRef.current.images.player = normalizedPlayer;
      stateRef.current.images.couple = couple;
      stateRef.current.images.eventKiosk = eventKiosk;
      stateRef.current.images.loveStory = loveStory;
      stateRef.current.images.gallery = gallery;
      stateRef.current.images.gift = gift;
      stateRef.current.images.wishes = wishes;
      stateRef.current.images.bard = bard;
      stateRef.current.images.loaded = true;
    });

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

  // Trigger spawn animation (burst of stars & golden aura) when character is chosen/confirmed
  useEffect(() => {
    if (spawnTrigger && spawnTrigger > 0) {
      const state = stateRef.current;
      const px = state.player.x;
      const py = state.player.y;
      const colors = ['#FFD700', '#FFF8DC', '#FF69B4', '#FFA07A', '#00FFFF', '#FFFFFF', '#D7BB83'];
      const particles = Array.from({ length: 36 }).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 45 + Math.random() * 120;
        return {
          x: px,
          y: py - 18,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 30,
          size: 3.5 + Math.random() * 4.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          rot: Math.random() * Math.PI * 2,
        };
      });

      state.spawnAnim = {
        active: true,
        startTime: performance.now(),
        duration: 2.2,
        particles,
      };
    }
  }, [spawnTrigger]);

  // Hotspot trigger action
  const triggerHotspot = useCallback(
    (hotspotId: string) => {
      const h = ALL_HOTSPOTS.find((item) => item.id === hotspotId);
      if (!h) return;

      if (h.modalType === 'music') {
        if (onToggleMusic) onToggleMusic();
      } else if (h.modalType) {
        onOpenModal(h.modalType);
      }
    },
    [onOpenModal, onToggleMusic]
  );

  // Collision check against all active booths & environment obstacles
  const checkCollision = (testPX: number, testPY: number): boolean => {
    // Player feet collision radius
    const playerRadius = 14;

    // Check all active hotspot obstacle bounding boxes
    for (const h of activeHotspots) {
      if (h.obstacle) {
        const { minX, maxX, minY, maxY } = h.obstacle;
        if (
          testPX + playerRadius > minX &&
          testPX - playerRadius < maxX &&
          testPY + playerRadius > minY &&
          testPY - playerRadius < maxY
        ) {
          return true; // Collision detected
        }
      }
    }

    // Check environment obstacles (fountain, pond)
    for (const obs of ENVIRONMENT_OBSTACLES) {
      if (
        testPX + playerRadius > obs.minX &&
        testPX - playerRadius < obs.maxX &&
        testPY + playerRadius > obs.minY &&
        testPY - playerRadius < obs.maxY
      ) {
        return true; // Collision detected
      }
    }

    return false;
  };

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
    const clampedX = Math.max(50, Math.min(state.mapWidth - 50, worldX));
    const clampedY = Math.max(260, Math.min(state.mapHeight - 60, worldY));

    // Check if clicked directly on an active hotspot
    for (const h of activeHotspots) {
      const dist = Math.hypot(clampedX - h.x, clampedY - h.y);
      if (dist <= h.radius) {
        state.target = { x: h.x, y: h.y + 35 };
        return;
      }
    }

    // Avoid setting target inside a solid obstacle
    if (!checkCollision(clampedX, clampedY)) {
      state.target = { x: clampedX, y: clampedY };
    }
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
        // Move with solid collision detection (X and Y axis independent sliding)
        const nextX = player.x + moveX * player.speed * dt;
        const nextY = player.y + moveY * player.speed * dt;

        // Try moving X
        if (!checkCollision(nextX, player.y) && nextX >= 50 && nextX <= state.mapWidth - 50) {
          player.x = nextX;
        }

        // Try moving Y
        if (!checkCollision(player.x, nextY) && nextY >= 260 && nextY <= state.mapHeight - 60) {
          player.y = nextY;
        }

        // Determine face direction
        if (Math.abs(moveX) > Math.abs(moveY)) {
          player.direction = moveX > 0 ? 'right' : 'left';
        } else {
          player.direction = moveY > 0 ? 'down' : 'up';
        }

        // Cycle animation frames (4 frames per direction: 0 -> 1 -> 2 -> 3)
        player.frameTime += dt;
        if (player.frameTime >= 0.11) {
          player.frameTime = 0;
          player.frame = (player.frame + 1) % 4;
        }
      } else {
        player.frame = 0;
      }

      // 2. CHECK HOTSPOT PROXIMITY
      let nearestHotspot: Hotspot | null = null;
      let minDist = Infinity;

      for (const h of activeHotspots) {
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

      // 3. UPDATE CAMERA (Desktop & Mobile Full-Screen Cover)
      const isPortrait = cw < ch;
      // Minimum zoom required so that map width & height fully cover viewport without any black bar
      const minZoomToCover = Math.max(cw / state.mapWidth, ch / state.mapHeight);
      const targetZoom = isPortrait
        ? Math.max(minZoomToCover, 1.15)
        : Math.max(minZoomToCover, 1.25);

      state.camera.zoom = targetZoom;

      const viewW = cw / targetZoom;
      const viewH = ch / targetZoom;

      // Keep camera viewport smoothly inside map boundaries
      const maxCamX = Math.max(0, state.mapWidth - viewW);
      const maxCamY = Math.max(0, state.mapHeight - viewH);

      const targetCamX = Math.max(0, Math.min(maxCamX, player.x - viewW / 2));
      const targetCamY = Math.max(0, Math.min(maxCamY, player.y - viewH / 2));

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
        ctx.fillStyle = '#78AB46';
        ctx.fillRect(0, 0, state.mapWidth, state.mapHeight);
      }

      // B. Draw Illustrated Props & Hotspot Circles
      for (const h of activeHotspots) {
        const isNear = state.activeHotspotId === h.id;

        // Ground indicator aura
        ctx.beginPath();
        ctx.arc(h.x, h.y, h.radius * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = isNear ? 'rgba(215, 187, 131, 0.4)' : 'rgba(215, 187, 131, 0.18)';
        ctx.fill();

        ctx.lineWidth = isNear ? 3 : 1.5;
        ctx.strokeStyle = isNear ? '#FFFFFF' : 'rgba(215, 187, 131, 0.65)';
        ctx.stroke();

        // Draw Illustrated Prop Image
        if (state.images.loaded && h.propKey) {
          const propImg = (state.images as any)[h.propKey] as HTMLImageElement | null;
          if (propImg && propImg.complete) {
            const pW = h.propW || 80;
            const pH = h.propH || 80;
            const pX = h.x - pW / 2;
            const pY = h.y + (h.propOffsetY || -pW / 2);

            ctx.drawImage(propImg, pX, pY, pW, pH);
          }
        }

        // Floating Illustrated Marker Pill above booth
        ctx.save();
        ctx.font = 'bold 11px "Poppins", sans-serif';
        const text = `${h.icon} ${h.name}`;
        const textWidth = ctx.measureText(text).width;
        const boxH = 22;
        const boxW = textWidth + 18;
        const boxX = h.x - boxW / 2;
        const boxY = h.y - h.radius * 0.5 - 28;

        // Pill background
        ctx.fillStyle = isNear ? 'rgba(76, 3, 10, 0.94)' : 'rgba(42, 23, 19, 0.78)';
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 11);
        ctx.fill();

        ctx.strokeStyle = isNear ? '#D7BB83' : 'rgba(215, 187, 131, 0.45)';
        ctx.lineWidth = isNear ? 2 : 1;
        ctx.stroke();

        // Text
        ctx.fillStyle = isNear ? '#FFFCF3' : '#F4ECD8';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, h.x, boxY + boxH / 2);
        ctx.restore();
      }

      // C. Draw Player Drop Shadow
      ctx.beginPath();
      ctx.ellipse(player.x, player.y + 24, 18, 7, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20, 9, 7, 0.32)';
      ctx.fill();

      // D. Draw Player Sprite
      if (state.images.player && state.images.loaded) {
        let row = 0; // down
        if (player.direction === 'left') row = 1;
        if (player.direction === 'right') row = 2;
        if (player.direction === 'up') row = 3;

        const frameW = 192;
        const frameH = 192;
        const sx = player.frame * frameW;
        const sy = row * frameH;

        const isFemale = character.id.includes('female');
        const destW = isFemale ? 64 : 62;
        const destH = isFemale ? 64 : 62;

        // Draw Spawn Aura Rings if active
        if (state.spawnAnim.active) {
          const t = (performance.now() - state.spawnAnim.startTime) / (state.spawnAnim.duration * 1000);
          if (t < 1) {
            const ringRadius = 14 + t * 45;
            const ringAlpha = Math.max(0, 1 - t);
            ctx.save();
            ctx.beginPath();
            ctx.arc(player.x, player.y + 12, ringRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 215, 0, ${ringAlpha * 0.9})`;
            ctx.lineWidth = 3 * (1 - t * 0.5);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(player.x, player.y + 12, ringRadius * 0.55, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${ringAlpha * 0.8})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
          }
        }

        // Elastic scale-in bounce during spawn
        let scaleMultiplier = 1;
        if (state.spawnAnim.active) {
          const t = (performance.now() - state.spawnAnim.startTime) / (state.spawnAnim.duration * 1000);
          if (t < 0.22) {
            scaleMultiplier = Math.sin((t / 0.22) * Math.PI * 0.5) * 1.36;
          } else if (t < 0.44) {
            scaleMultiplier = 1.36 - ((t - 0.22) / 0.22) * 0.36;
          } else {
            scaleMultiplier = 1;
          }
        }

        const renderW = destW * scaleMultiplier;
        const renderH = destH * scaleMultiplier;

        ctx.drawImage(
          state.images.player,
          sx,
          sy,
          frameW,
          frameH,
          player.x - renderW / 2,
          player.y - renderH / 2,
          renderW,
          renderH
        );
      }

      // Draw Spawn Burst Particles & Floating Banner
      if (state.spawnAnim.active) {
        const t = (performance.now() - state.spawnAnim.startTime) / (state.spawnAnim.duration * 1000);
        if (t < 1) {
          // Particles
          for (const sp of state.spawnAnim.particles) {
            sp.x += sp.vx * dt;
            sp.y += sp.vy * dt;
            sp.vy += 35 * dt;
            sp.vx *= 0.97;
            sp.rot += 3 * dt;
            const pAlpha = Math.max(0, (1 - t) * 0.95);

            ctx.save();
            ctx.translate(sp.x, sp.y);
            ctx.rotate(sp.rot);
            ctx.globalAlpha = pAlpha;
            ctx.fillStyle = sp.color;

            const s = sp.size;
            ctx.beginPath();
            ctx.moveTo(0, -s);
            ctx.lineTo(s * 0.3, -s * 0.3);
            ctx.lineTo(s, 0);
            ctx.lineTo(s * 0.3, s * 0.3);
            ctx.lineTo(0, s);
            ctx.lineTo(-s * 0.3, s * 0.3);
            ctx.lineTo(-s, 0);
            ctx.lineTo(-s * 0.3, -s * 0.3);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          }

          // Floating welcome banner above player
          if (t < 0.85) {
            const bannerAlpha = t < 0.2 ? t / 0.2 : 1 - (t - 0.2) / 0.65;
            const bannerOffsetY = -58 - t * 24;
            ctx.save();
            ctx.globalAlpha = Math.max(0, Math.min(1, bannerAlpha));
            ctx.font = 'bold 11px "Poppins", sans-serif';
            const bText = `✨ Selamat Datang di Taman, ${guestName}! ✨`;
            const bWidth = ctx.measureText(bText).width;
            const bBoxW = bWidth + 20;
            const bBoxH = 22;
            const bBoxX = player.x - bBoxW / 2;
            const bBoxY = player.y + bannerOffsetY;

            ctx.fillStyle = 'rgba(76, 3, 10, 0.92)';
            ctx.beginPath();
            ctx.roundRect(bBoxX, bBoxY, bBoxW, bBoxH, 11);
            ctx.fill();

            ctx.strokeStyle = '#D7BB83';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.fillStyle = '#FFD700';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(bText, player.x, bBoxY + bBoxH / 2);
            ctx.restore();
          }
        } else {
          state.spawnAnim.active = false;
        }
      }

      // E. Draw Player Name Tag above head
      ctx.save();
      ctx.font = 'bold 10px "Poppins", sans-serif';
      const pText = guestName;
      const pWidth = ctx.measureText(pText).width;
      const pBoxW = pWidth + 14;
      const pBoxH = 16;
      const pBoxX = player.x - pBoxW / 2;
      const pBoxY = player.y - 42;

      ctx.fillStyle = 'rgba(76, 3, 10, 0.88)';
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

      // F. Draw Target Destination Marker (if walking towards target)
      if (state.target) {
        ctx.beginPath();
        ctx.arc(state.target.x, state.target.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(215, 187, 131, 0.85)';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // G. Draw Falling Petal Particles
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
  }, [guestName, activeHotspots]);

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
          <div className="grid grid-cols-3 gap-1 bg-black/45 backdrop-blur-md p-2 rounded-2xl border border-[#D7BB83]/40 shadow-lg">
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
            2D RPG Taman Pengantin
          </span>
        </div>
      </div>
    </div>
  );
};
export const RpgTamanCanvas = SeriMalaysiaCanvas;
export default SeriMalaysiaCanvas;
