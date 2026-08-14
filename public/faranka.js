document.documentElement.classList.add('js');

// Header: frosted bar once scrolled
function updateHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 8);
}
window.addEventListener('scroll', updateHeader, { passive: true });

// Mobile menu
function setupMobileMenu() {
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  function close() {
    btn.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });

  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// Scroll reveals
function setupReveals() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
  els.forEach((el) => io.observe(el));
}

// Animated stat counters (dub-style stats band)
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  if (!Number.isFinite(target) || target <= 0) {
    el.textContent = String(target);
    return;
  }
  const duration = 1600;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = String(Math.round(target * eased));
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function setupCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    els.forEach((el) => { el.textContent = el.dataset.count; });
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  els.forEach((el) => io.observe(el));
}

// Video driver: play visible phone recordings, pause the rest; posters hold if a clip is missing
function setupVideos() {
  const videos = document.querySelectorAll('video[data-video]');
  if (!videos.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const v = entry.target;
      if (entry.isIntersecting) {
        const p = v.play();
        if (p) p.catch(() => {});
      } else {
        v.pause();
      }
    });
  }, { threshold: 0.35 });

  videos.forEach((v) => {
    if (reduceMotion) return;
    io.observe(v);
  });
}

// Download buttons: /download resolves to the hosted APK via a 302. Resolve it
// first so the click gives immediate "Preparing…" feedback instead of silent dead
// time before the browser's own download progress appears. Falls back to a plain
// navigation to /download if anything goes wrong.
function setupDownloads() {
  const links = document.querySelectorAll('a[href="/download"]');
  if (!links.length) return;
  const MIN_BUSY = 400;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function resolveDownload() {
    const res = await fetch('/download', { method: 'GET', redirect: 'manual', cache: 'no-store' });
    const location = res.headers.get('location');
    if (!location) throw new Error('download route did not redirect');
    return new URL(location, window.location.href).href;
  }

  function setBusy(link, busy, html) {
    link.dataset.downloadBusy = busy ? '1' : '0';
    if (busy) {
      link.setAttribute('aria-busy', 'true');
    } else {
      link.removeAttribute('aria-busy');
    }
    if (html) link.innerHTML = html;
  }

  links.forEach((link) => {
    link.addEventListener('click', async (e) => {
      if (link.dataset.downloadBusy === '1') {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      const originalHTML = link.innerHTML;
      const started = performance.now();
      setBusy(
        link,
        true,
        '<span class="dl-progress"><span class="dl-spinner" aria-hidden="true"></span>Preparing…</span>',
      );

      try {
        const url = await resolveDownload();
        const elapsed = performance.now() - started;
        if (elapsed < MIN_BUSY) await sleep(MIN_BUSY - elapsed);

        const a = document.createElement('a');
        a.href = url;
        a.rel = 'noopener';
        a.download = 'faranka.apk';
        document.body.appendChild(a);
        a.click();
        a.remove();

        link.innerHTML = '<span class="dl-progress">Download started</span>';
        setTimeout(() => {
          link.innerHTML = originalHTML;
          link.removeAttribute('aria-busy');
          link.dataset.downloadBusy = '0';
        }, 2600);
      } catch {
        setBusy(link, false, originalHTML);
        window.location.href = '/download';
      }
    });
  });
}

// Wait for the client-injected content before binding DOM-dependent logic
function init() {
  updateHeader();
  setupMobileMenu();
  setupReveals();
  setupVideos();
  setupCounters();
  setupDownloads();
}

const observer = new MutationObserver(() => {
  if (document.getElementById('siteHeader') && document.getElementById('site-hero')) {
    observer.disconnect();
    init();
  }
});
observer.observe(document.body, { childList: true, subtree: true });

if (document.getElementById('siteHeader')) init();