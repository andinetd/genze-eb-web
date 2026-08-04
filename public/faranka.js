// Nav scroll state (paper glass bar, shadow once scrolled)
function updateNav() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 10);
}
window.addEventListener('scroll', updateNav, { passive: true });

// Intersection observer for staggered reveals
let io = null;
function setupReveals() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (io) io.disconnect();
  io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => {
    el.style.animationPlayState = 'paused';
    io.observe(el);
  });
}

// Download buttons navigate natively to /download, which redirects to the
// hosted APK. No client-side interception needed.

// ── Powder burst hero ──
function initPowder() {
  const canvas = document.getElementById('powder-canvas');
  const hero = document.getElementById('hero');
  if (!canvas || !hero || !canvas.getContext) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const isMobile = window.innerWidth < 768;
  const MAX_PARTICLES = isMobile ? 150 : 300;
  const BURST_COUNT = isMobile ? 60 : 140;
  const AMBIENT_COUNT = isMobile ? 16 : 32;

  let W = 0;
  let H = 0;
  let raf = null;
  let active = false;
  let hasBurst = false;
  let inView = false;
  const particles = [];

  // Pre-render soft powder sprites (one per colour/size) for fast drawImage.
  const COLORS = [
    [34, 197, 94],    // green mid
    [134, 239, 172],  // green light
    [22, 101, 52],    // green dark
    [38, 35, 35],     // ink
  ];
  const SIZES = [3, 5, 8, 13, 20];
  const sprites = [];
  COLORS.forEach(([r, g, b]) => {
    SIZES.forEach((size) => {
      const s = document.createElement('canvas');
      const d = size * 3;
      s.width = s.height = d;
      const c = s.getContext('2d');
      const grad = c.createRadialGradient(d / 2, d / 2, 0, d / 2, d / 2, d / 2);
      grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      c.fillStyle = grad;
      c.fillRect(0, 0, d, d);
      sprites.push({ el: s, d });
    });
  });

  function spriteFor(size) {
    let best = sprites[0];
    let bestDist = Infinity;
    for (const sp of sprites) {
      const dist = Math.abs(sp.d / 3 - size);
      if (dist < bestDist) { bestDist = dist; best = sp; }
    }
    return best;
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = hero.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function addParticle(x, y, vx, vy, size, alpha, decay) {
    if (particles.length >= MAX_PARTICLES) particles.shift();
    particles.push({
      x,
      y,
      vx,
      vy,
      size: Math.max(2, size * (0.6 + Math.random() * 0.8)),
      sprite: spriteFor(size),
      alpha: alpha || 0.5 + Math.random() * 0.4,
      decay: decay || 0.93,
      life: 1,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.5 + Math.random() * 1.2,
    });
  }

  function burst(cx, cy, count, power) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = power * (0.25 + Math.random() * 0.75);
      const size = 2 + Math.random() * 14;
      addParticle(
        cx,
        cy,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        size,
        0.4 + Math.random() * 0.45,
        0.9 + Math.random() * 0.06,
      );
    }
  }

  function ambient() {
    for (let i = particles.length; i < AMBIENT_COUNT; i++) {
      addParticle(
        Math.random() * W,
        H * (0.3 + Math.random() * 0.7),
        (Math.random() - 0.5) * 0.35,
        -(0.05 + Math.random() * 0.25),
        2 + Math.random() * 6,
        0.12 + Math.random() * 0.2,
        0.985,
      );
    }
  }

  function burstOrigin() {
    const dot = hero.querySelector('.splash-dot');
    const target = dot || hero;
    const r = target.getBoundingClientRect();
    const hr = hero.getBoundingClientRect();
    return { x: r.left + r.width / 2 - hr.left, y: r.top + r.height / 2 - hr.top };
  }

  function step() {
    if (!active) return;
    ctx.clearRect(0, 0, W, H);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life *= p.decay;
      if (p.life < 0.02) { particles.splice(i, 1); continue; }
      p.sway += p.swaySpeed * 0.02;
      p.vx *= p.decay;
      p.vy = p.vy * p.decay - 0.008;
      p.x += p.vx;
      p.y += p.vy + Math.sin(p.sway) * 0.18;
      const sp = p.sprite;
      ctx.globalAlpha = Math.min(1, p.alpha * p.life);
      ctx.drawImage(sp.el, p.x - sp.d / 2, p.y - sp.d / 2, sp.d, sp.d);
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(step);
  }

  function start() {
    if (raf) return;
    active = true;
    raf = requestAnimationFrame(step);
  }

  function stop() {
    active = false;
    if (raf) { cancelAnimationFrame(raf); raf = null; }
  }

  const heroIO = new IntersectionObserver((entries) => {
    const isVisible = entries[0].isIntersecting;
    inView = isVisible;
    if (isVisible) {
      if (!hasBurst) {
        hasBurst = true;
        resize();
        const o = burstOrigin();
        const power = isMobile ? 5 : 7;
        setTimeout(() => burst(o.x, o.y, BURST_COUNT, power), 650);
      }
      start();
    } else {
      stop();
    }
  }, { threshold: 0.05 });
  heroIO.observe(hero);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else if (inView) start();
  });

  window.addEventListener('resize', resize);

  const title = hero.querySelector('.splash-title');
  if (title && window.matchMedia && window.matchMedia('(hover: hover)').matches) {
    let lastPop = 0;
    title.addEventListener('pointermove', (e) => {
      const now = performance.now();
      if (now - lastPop < 180) return;
      lastPop = now;
      const hr = hero.getBoundingClientRect();
      burst(e.clientX - hr.left, e.clientY - hr.top, 6, 1.6);
    });
  }

  resize();
  ambient();
  start();
}

// Wait for the client-injected content before binding DOM-dependent logic
function init() {
  updateNav();
  setupReveals();
  initPowder();
}

const observer = new MutationObserver(() => {
  if (document.getElementById('siteNav') && document.querySelector('.reveal')) {
    observer.disconnect();
    init();
  }
});
observer.observe(document.body, { childList: true, subtree: true });

if (document.getElementById('siteNav')) init();
