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

// Wait for the client-injected content before binding DOM-dependent logic
function init() {
  updateNav();
  setupReveals();
}

const observer = new MutationObserver(() => {
  if (document.getElementById('siteNav') && document.querySelector('.reveal')) {
    observer.disconnect();
    init();
  }
});
observer.observe(document.body, { childList: true, subtree: true });

if (document.getElementById('siteNav')) init();
