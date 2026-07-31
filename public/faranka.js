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

// Download handler with error management (delegated so it works whenever links exist)
function handleDownloadClick(e) {
  const link = e.target.closest('a[href="/download"]');
  if (!link) return;
  e.preventDefault();
  const downloadUrl = link.getAttribute('href');
  const errorDialog = document.getElementById('downloadError');

  fetch(downloadUrl)
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.error || 'Download failed');
        }).catch(err => {
          throw new Error(err.message || 'Download failed with error');
        });
      }
      return response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'faranka.apk';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      });
    })
    .catch(error => {
      console.error('Download error:', error);
      const messageEl = document.getElementById('errorMessage');
      if (messageEl) messageEl.textContent =
        error.message || 'Failed to download APK. Please check your connection and try again.';
      if (errorDialog) errorDialog.classList.add('show');
    });
}
document.addEventListener('click', handleDownloadClick);

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
