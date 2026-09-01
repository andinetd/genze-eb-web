import Image from "next/image";
import { TelegramIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a className="nav-logo" href="#site-hero">
          <span className="nav-logo-icon">
            <Image src="/app-icon.png" alt="" width={28} height={28} />
          </span>
          Faranka
        </a>
        <nav className="footer-links" aria-label="Footer">
          <a href="#features">Features</a>
          <a href="#flow">How it works</a>
          <a href="/privacy">Privacy</a>
          <a href="/faq">FAQ</a>
          <a href="https://t.me/fa_ranka" target="_blank" rel="noopener noreferrer">Support</a>
          <a
            href="https://t.me/fa_ranka"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            title="Telegram"
          >
            <TelegramIcon width={18} height={18} />
          </a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2026 Faranka · All rights reserved</p>
      </div>
    </footer>
  );
}