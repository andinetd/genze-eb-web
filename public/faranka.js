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

// Intersection observer for scroll reveals
const REVEAL_SELECTOR = '.section-head, .feature-row, .value-card, .faq-card, .signal-tile, .release-grid, .support-strip, .flow-inner, footer';
let io = null;

function setupReveals() {
  const els = document.querySelectorAll(REVEAL_SELECTOR);
  if (!els.length) return;
  if (io) io.disconnect();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach((el) => io.observe(el));
}

// Wait for the client-injected content before binding DOM-dependent logic
function init() {
  updateHeader();
  setupMobileMenu();
  setupReveals();
}

const observer = new MutationObserver(() => {
  if (document.getElementById('siteHeader') && document.getElementById('site-hero')) {
    observer.disconnect();
    init();
  }
});
observer.observe(document.body, { childList: true, subtree: true });

if (document.getElementById('siteHeader')) init();
