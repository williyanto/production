/**
 * Lightweight, zero-dependency Confetti Engine
 * Custom built for smooth 60fps canvas particle animations
 */
class ConfettiCannon {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationFrame = null;
    this.initCanvas();
  }

  initCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'confetti-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '999999';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    if (this.ctx) {
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }

  createParticle(x, y, isStar = false) {
    const colors = [
      '#FF477E', '#FF7096', '#FF85A1', '#FBB1BD', 
      '#FFD166', '#06D6A0', '#118AB2', '#073B4C',
      '#7209B7', '#4CC9F0', '#F72585', '#FF9F1C'
    ];
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 4;
    return {
      x: x !== undefined ? x : this.width / 2,
      y: y !== undefined ? y : this.height / 3,
      vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : 0.8),
      vy: Math.sin(angle) * speed - 5,
      size: Math.random() * 10 + 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 12,
      shape: isStar ? 'star' : (Math.random() > 0.3 ? 'rect' : 'circle'),
      gravity: 0.28,
      drag: 0.98,
      opacity: 1,
      fadeRate: Math.random() * 0.015 + 0.008
    };
  }

  burst(options = {}) {
    const count = options.count || 80;
    const originX = options.x !== undefined ? options.x : this.width / 2;
    const originY = options.y !== undefined ? options.y : this.height / 3;

    for (let i = 0; i < count; i++) {
      const isStar = Math.random() > 0.7;
      this.particles.push(this.createParticle(originX, originY, isStar));
    }

    if (!this.animationFrame) {
      this.loop();
    }
  }

  // Celebratory cannon from both sides (left & right)
  doubleCannon() {
    this.burst({ count: 50, x: this.width * 0.2, y: this.height * 0.6 });
    this.burst({ count: 50, x: this.width * 0.8, y: this.height * 0.6 });
    setTimeout(() => {
      this.burst({ count: 60, x: this.width * 0.5, y: this.height * 0.4 });
    }, 250);
  }

  drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vRotation;
      p.opacity -= p.fadeRate;

      if (p.opacity <= 0 || p.y > this.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.shape === 'rect') {
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      } else if (p.shape === 'circle') {
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.shape === 'star') {
        this.drawStar(this.ctx, 0, 0, 5, p.size, p.size * 0.4, p.color);
      }
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationFrame = requestAnimationFrame(() => this.loop());
    } else {
      this.animationFrame = null;
    }
  }
}

// Global instance
window.confetti = new ConfettiCannon();

