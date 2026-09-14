/**
 * 8-Bit Pixel Art Sprites & Scenery Renderers for HTML5 Canvas
 */

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  type?: 'heart' | 'sparkle' | 'confetti';
}

/**
 * Draw 8-Bit Bride Character
 */
export function drawBrideSprite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  facingRight: boolean,
  isMoving: boolean,
  isJumping: boolean,
  tick: number,
  scale = 2
) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  if (!facingRight) {
    ctx.scale(-1, 1);
  }

  const s = scale;
  const legOffset = isMoving && !isJumping ? Math.sin(tick * 0.25) * 3 : 0;

  // 1. Veil flowing behind
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.fillRect(-6 * s, -16 * s, 4 * s, 14 * s);
  ctx.fillRect(-8 * s, -10 * s, 3 * s, 10 * s);

  // 2. Brown/Black Hair & Bun
  ctx.fillStyle = '#4A2E18';
  ctx.fillRect(-4 * s, -20 * s, 8 * s, 7 * s); // main hair
  ctx.fillRect(-6 * s, -18 * s, 3 * s, 4 * s); // back bun

  // 3. Floral Tiara / Crown on Hair
  ctx.fillStyle = '#FF85A2';
  ctx.fillRect(-2 * s, -21 * s, 2 * s, 2 * s);
  ctx.fillStyle = '#FFD166';
  ctx.fillRect(0, -22 * s, 2 * s, 2 * s);
  ctx.fillStyle = '#06D6A0';
  ctx.fillRect(2 * s, -21 * s, 2 * s, 2 * s);

  // 4. Face (Peach/Skin Tone)
  ctx.fillStyle = '#FFDFC4';
  ctx.fillRect(-2 * s, -17 * s, 7 * s, 6 * s);

  // Eye
  ctx.fillStyle = '#222222';
  ctx.fillRect(2 * s, -15 * s, 2 * s, 2 * s);

  // Cheerful Blush
  ctx.fillStyle = '#FF85A2';
  ctx.fillRect(0 * s, -13 * s, 2 * s, 1.5 * s);

  // 5. White Wedding Dress Top
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(-3 * s, -11 * s, 7 * s, 5 * s);
  // Gold ribbon sash
  ctx.fillStyle = '#D4AF37';
  ctx.fillRect(-3 * s, -7 * s, 7 * s, 1.5 * s);

  // 6. Gown Skirt (A-line wide wedding dress)
  ctx.fillStyle = '#F8F9FA';
  ctx.fillRect(-5 * s, -6 * s, 11 * s, 7 * s);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(-7 * s, 1 * s, 15 * s, 5 * s);

  // Lace trims at hem
  ctx.fillStyle = '#FFE4EC';
  for (let i = -7; i < 8; i += 3) {
    ctx.fillRect(i * s, 5 * s, 2 * s, 1.5 * s);
  }

  // 7. Arms & Rose Bouquet
  ctx.fillStyle = '#FFDFC4';
  ctx.fillRect(1 * s, -9 * s, 3 * s, 2 * s); // arm
  // Red Rose Bouquet
  ctx.fillStyle = '#E60012';
  ctx.fillRect(3 * s, -9 * s, 3 * s, 3 * s);
  ctx.fillStyle = '#06D6A0';
  ctx.fillRect(4 * s, -6 * s, 1.5 * s, 2 * s); // stem

  // 8. White Shoes / Feet
  ctx.fillStyle = '#E9ECEF';
  if (isJumping) {
    ctx.fillRect(-4 * s, 6 * s, 3 * s, 2 * s);
    ctx.fillRect(1 * s, 4 * s, 3 * s, 2 * s);
  } else {
    ctx.fillRect((-4 + legOffset) * s, 6 * s, 3 * s, 2 * s);
    ctx.fillRect((1 - legOffset) * s, 6 * s, 3 * s, 2 * s);
  }

  ctx.restore();
}

/**
 * Draw 8-Bit Groom Character
 */
export function drawGroomSprite(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  facingRight: boolean,
  isMoving: boolean,
  isJumping: boolean,
  tick: number,
  scale = 2
) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  if (!facingRight) {
    ctx.scale(-1, 1);
  }

  const s = scale;
  const legOffset = isMoving && !isJumping ? Math.sin(tick * 0.25) * 3 : 0;

  // 1. Neat Black Hair
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(-4 * s, -20 * s, 8 * s, 5 * s);
  ctx.fillRect(-5 * s, -18 * s, 3 * s, 3 * s);

  // 2. Face (Skin tone)
  ctx.fillStyle = '#FFDFC4';
  ctx.fillRect(-2 * s, -17 * s, 7 * s, 6 * s);

  // Eye
  ctx.fillStyle = '#222222';
  ctx.fillRect(2 * s, -15 * s, 2 * s, 2 * s);

  // Friendly Smile
  ctx.fillStyle = '#D35400';
  ctx.fillRect(2 * s, -12 * s, 2 * s, 1 * s);

  // 3. Black Tuxedo Jacket & White Shirt
  ctx.fillStyle = '#111827';
  ctx.fillRect(-4 * s, -11 * s, 9 * s, 9 * s); // Tuxedo jacket

  // White Shirt Collar & Chest V
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(-1 * s, -11 * s, 3 * s, 6 * s);

  // Red Bowtie
  ctx.fillStyle = '#E60012';
  ctx.fillRect(-1 * s, -10 * s, 3 * s, 2 * s);
  ctx.fillStyle = '#FF4D4D';
  ctx.fillRect(0, -10 * s, 1 * s, 2 * s);

  // Golden Pocket Boutonnière
  ctx.fillStyle = '#D4AF37';
  ctx.fillRect(2 * s, -8 * s, 2 * s, 2 * s);

  // 4. Tuxedo Trousers
  ctx.fillStyle = '#111827';
  if (isJumping) {
    ctx.fillRect(-3 * s, -2 * s, 3 * s, 6 * s);
    ctx.fillRect(1 * s, -2 * s, 3 * s, 4 * s);
    // Shoes
    ctx.fillStyle = '#000000';
    ctx.fillRect(-4 * s, 4 * s, 4 * s, 3 * s);
    ctx.fillRect(1 * s, 2 * s, 4 * s, 3 * s);
  } else {
    ctx.fillRect((-3 + legOffset * 0.6) * s, -2 * s, 3 * s, 7 * s);
    ctx.fillRect((1 - legOffset * 0.6) * s, -2 * s, 3 * s, 7 * s);
    // Shoes
    ctx.fillStyle = '#000000';
    ctx.fillRect((-4 + legOffset * 0.6) * s, 5 * s, 4 * s, 3 * s);
    ctx.fillRect((1 - legOffset * 0.6) * s, 5 * s, 4 * s, 3 * s);
  }

  // 5. Hands
  ctx.fillStyle = '#FFDFC4';
  ctx.fillRect(3 * s, -7 * s, 2.5 * s, 2.5 * s);

  ctx.restore();
}

/**
 * Draw 8-Bit Question Mark Block [?]
 */
export function drawQuestionBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  isHit: boolean,
  tick: number
) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));

  if (isHit) {
    // Spent brown metal block
    ctx.fillStyle = '#8B5A2B';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#654321';
    ctx.fillRect(1, 1, size - 2, size - 2);
    // 4 corner bolts
    ctx.fillStyle = '#3E2723';
    ctx.fillRect(2, 2, 3, 3);
    ctx.fillRect(size - 5, 2, 3, 3);
    ctx.fillRect(2, size - 5, 3, 3);
    ctx.fillRect(size - 5, size - 5, 3, 3);
  } else {
    // Active glowing gold question block
    const glow = Math.sin(tick * 0.1) * 0.15 + 0.85;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = `rgb(${Math.round(252 * glow)}, ${Math.round(152 * glow)}, 56)`;
    ctx.fillRect(2, 2, size - 4, size - 4);

    // Inner highlight
    ctx.fillStyle = '#FFE082';
    ctx.fillRect(2, 2, size - 4, 3);
    ctx.fillRect(2, 2, 3, size - 4);

    // Corner rivets
    ctx.fillStyle = '#000000';
    ctx.fillRect(3, 3, 2, 2);
    ctx.fillRect(size - 5, 3, 2, 2);
    ctx.fillRect(3, size - 5, 2, 2);
    ctx.fillRect(size - 5, size - 5, 2, 2);

    // Question Mark '?'
    ctx.fillStyle = '#000000';
    const cx = Math.floor(size / 2);
    const cy = Math.floor(size / 2);

    // Top bar
    ctx.fillRect(cx - 5, cy - 8, 10, 3);
    // Right hook
    ctx.fillRect(cx + 3, cy - 6, 3, 4);
    // Center curve
    ctx.fillRect(cx - 2, cy - 2, 6, 3);
    // Middle vertical
    ctx.fillRect(cx - 1, cy + 1, 3, 3);
    // Dot
    ctx.fillRect(cx - 1, cy + 6, 3, 3);
  }

  ctx.restore();
}

/**
 * Draw 8-Bit Brick Block
 */
export function drawBrickBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));

  // Base brick color
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = '#B84418';
  ctx.fillRect(1, 1, size - 2, size - 2);

  // Mortar lines (brick pattern)
  ctx.fillStyle = '#000000';
  const midY = Math.floor(size / 2);
  ctx.fillRect(1, midY, size - 2, 2);

  // Top half vertical split
  ctx.fillRect(Math.floor(size / 2), 1, 2, midY - 1);
  // Bottom half vertical splits
  ctx.fillRect(Math.floor(size / 4), midY + 2, 2, size - midY - 3);
  ctx.fillRect(Math.floor((size * 3) / 4), midY + 2, 2, size - midY - 3);

  // Brick highlight
  ctx.fillStyle = '#E88B58';
  ctx.fillRect(1, 1, size - 2, 2);

  ctx.restore();
}

/**
 * Draw Warp Pipe
 */
export function drawPipe(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));

  const lipH = 24;
  const lipExt = 6;

  // Pipe Top Lip
  ctx.fillStyle = '#000000';
  ctx.fillRect(-lipExt, 0, width + lipExt * 2, lipH);

  ctx.fillStyle = '#00A800';
  ctx.fillRect(-lipExt + 2, 2, width + lipExt * 2 - 4, lipH - 4);

  // Highlight strip
  ctx.fillStyle = '#80D010';
  ctx.fillRect(-lipExt + 6, 2, 8, lipH - 4);

  // Dark shadow strip
  ctx.fillStyle = '#005800';
  ctx.fillRect(width + lipExt - 10, 2, 6, lipH - 4);

  // Pipe Body
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, lipH, width, height - lipH);

  ctx.fillStyle = '#00A800';
  ctx.fillRect(2, lipH, width - 4, height - lipH);

  ctx.fillStyle = '#80D010';
  ctx.fillRect(6, lipH, 8, height - lipH);

  ctx.fillStyle = '#005800';
  ctx.fillRect(width - 10, lipH, 6, height - lipH);

  ctx.restore();
}

/**
 * Draw 8-Bit Gold Coin
 */
export function drawCoin(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  tick: number
) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));

  // Spin effect by scaling X
  const scaleX = Math.abs(Math.cos(tick * 0.12));
  ctx.scale(Math.max(scaleX, 0.15), 1);

  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FCB000';
  ctx.beginPath();
  ctx.arc(0, 0, radius - 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFF275';
  ctx.fillRect(-2, -radius + 4, 4, radius * 2 - 8);

  ctx.restore();
}

/**
 * Draw 8-Bit Fluffy Pixel Cloud
 */
export function drawPixelCloud(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale = 1
) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(scale, scale);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  // Base cloud puffs
  ctx.fillRect(20, 16, 80, 24);
  ctx.fillRect(36, 0, 48, 40);
  ctx.fillRect(10, 24, 100, 16);

  // Soft shaded underside
  ctx.fillStyle = 'rgba(215, 235, 255, 0.85)';
  ctx.fillRect(12, 34, 96, 6);

  // Cute Mario cloud eyes
  ctx.fillStyle = '#222222';
  ctx.fillRect(48, 16, 4, 8);
  ctx.fillRect(66, 16, 4, 8);

  ctx.restore();
}

/**
 * Draw Rolling Green Hills
 */
export function drawGreenHill(
  ctx: CanvasRenderingContext2D,
  x: number,
  groundY: number,
  width: number,
  height: number
) {
  ctx.save();
  ctx.translate(Math.round(x), groundY);

  // Hill arc
  ctx.fillStyle = '#00A800';
  ctx.beginPath();
  ctx.ellipse(width / 2, 0, width / 2, height, 0, Math.PI, 0);
  ctx.fill();

  // Dark outline
  ctx.strokeStyle = '#005800';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Highlight spots (spots on Mario hills)
  ctx.fillStyle = '#80D010';
  ctx.beginPath();
  ctx.ellipse(width * 0.35, -height * 0.45, 12, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(width * 0.65, -height * 0.35, 10, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Draw Wedding Castle & Finish Archway
 */
export function drawWeddingCastle(
  ctx: CanvasRenderingContext2D,
  x: number,
  groundY: number,
  tick: number
) {
  ctx.save();
  ctx.translate(Math.round(x), groundY);

  const castleW = 200;
  const castleH = 180;

  // Castle Main Walls (Cream / Peach Royal Stone)
  ctx.fillStyle = '#FFE6CC';
  ctx.fillRect(0, -castleH, castleW, castleH);

  // Brick texture pattern
  ctx.fillStyle = '#E6BF99';
  for (let row = -castleH + 10; row < 0; row += 20) {
    for (let col = 10; col < castleW - 10; col += 30) {
      ctx.fillRect(col, row, 14, 4);
    }
  }

  // Battlements / Crenellations at Top
  ctx.fillStyle = '#D99B66';
  for (let i = 0; i < castleW; i += 25) {
    ctx.fillRect(i, -castleH - 16, 16, 16);
  }

  // Left & Right Guard Towers
  ctx.fillStyle = '#F2C9A1';
  ctx.fillRect(-30, -castleH - 40, 36, castleH + 40);
  ctx.fillRect(castleW - 6, -castleH - 40, 36, castleH + 40);

  // Tower Roof Cones (Royal Crimson)
  ctx.fillStyle = '#E60012';
  // Left cone
  ctx.beginPath();
  ctx.moveTo(-35, -castleH - 40);
  ctx.lineTo(-12, -castleH - 85);
  ctx.lineTo(11, -castleH - 40);
  ctx.closePath();
  ctx.fill();

  // Right cone
  ctx.beginPath();
  ctx.moveTo(castleW - 11, -castleH - 40);
  ctx.lineTo(castleW + 12, -castleH - 85);
  ctx.lineTo(castleW + 35, -castleH - 40);
  ctx.closePath();
  ctx.fill();

  // Center Wedding Arch Doorway
  const doorW = 70;
  const doorH = 95;
  const doorX = (castleW - doorW) / 2;

  // Arch cutout (dark inside)
  ctx.fillStyle = '#1A1009';
  ctx.fillRect(doorX, -doorH, doorW, doorH);
  ctx.beginPath();
  ctx.arc(doorX + doorW / 2, -doorH, doorW / 2, Math.PI, 0);
  ctx.fill();

  // Floral Garland over arch
  ctx.strokeStyle = '#FF85A2';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(doorX + doorW / 2, -doorH, doorW / 2 + 4, Math.PI, 0);
  ctx.stroke();

  // Roses on Garland
  const roseColors = ['#FF4D6D', '#FFD166', '#FFFFFF', '#FF758F'];
  for (let a = 0; a <= Math.PI; a += Math.PI / 6) {
    const rx = doorX + doorW / 2 + Math.cos(a) * (doorW / 2 + 5);
    const ry = -doorH - Math.sin(a) * (doorW / 2 + 5);
    ctx.fillStyle = roseColors[Math.floor(Math.random() * roseColors.length)];
    ctx.fillRect(rx - 3, ry - 3, 6, 6);
  }

  // Giant Floating Animated Heart above Castle
  const heartFloat = Math.sin(tick * 0.08) * 8;
  const hx = castleW / 2;
  const hy = -castleH - 60 + heartFloat;

  ctx.fillStyle = '#FF1E56';
  ctx.beginPath();
  ctx.moveTo(hx, hy + 18);
  ctx.bezierCurveTo(hx - 24, hy, hx - 24, hy - 24, hx, hy - 14);
  ctx.bezierCurveTo(hx + 24, hy - 24, hx + 24, hy, hx, hy + 18);
  ctx.fill();

  // "FINISH / FOREVER" Golden Banner
  ctx.fillStyle = '#D4AF37';
  ctx.fillRect(doorX - 20, -castleH + 15, doorW + 40, 24);
  ctx.fillStyle = '#283D52';
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('FOREVER & ALWAYS', castleW / 2, -castleH + 31);

  ctx.restore();
}
