"use client";
import { useEffect } from "react";

export default function VideoDriver() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const videos = document.querySelectorAll("video[data-video]");
    if (!videos.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target;
          if (entry.isIntersecting) {
            const p = v.play();
            if (p) p.catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.35 },
    );

    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  return null;
}
