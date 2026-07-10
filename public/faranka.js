  // Intersection observer for staggered reveals
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
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

  // Download handler with error management
  function handleDownloadClick(e) {
    e.preventDefault();
    const downloadUrl = e.currentTarget.getAttribute('href');
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
        document.getElementById('errorMessage').textContent =
          error.message || 'Failed to download APK. Please check your connection and try again.';
        errorDialog.classList.add('show');
      });
  }

  // Attach click handlers to all download buttons
  document.addEventListener('DOMContentLoaded', function() {
    const downloadLinks = document.querySelectorAll('a[href="/download"]');
    downloadLinks.forEach(link => {
      link.addEventListener('click', handleDownloadClick);
    });
  });
