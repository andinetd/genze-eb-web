'use client';

import { useEffect } from 'react';

export default function RevealScript() {
  useEffect(() => {
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
  }, []);

  return null;
}