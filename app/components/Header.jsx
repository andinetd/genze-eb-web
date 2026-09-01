"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import DownloadButton from "./DownloadButton";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#flow", label: "How it works" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`} id="siteHeader">
      <div className="container header-inner">
        <a className="nav-logo" href="#site-hero">
          <span className="nav-logo-icon">
            <Image src="/app-icon.png" alt="" width={28} height={28} />
          </span>
          Faranka
        </a>

        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <DownloadButton className="nav-download">Download</DownloadButton>
          <button
            className="menu-btn"
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobileMenu">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <DownloadButton className="nav-download">Download</DownloadButton>
      </div>
    </header>
  );
}
