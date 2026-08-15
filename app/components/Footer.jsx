export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a className="nav-logo" href="#site-hero">
            <span className="nav-logo-icon">
              <img src="/app-icon.png" alt="" />
            </span>
            Faranka
          </a>
          <p>SMS finance intelligence for Android</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <span className="mono footer-col-label">Product</span>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#flow">How it works</a>
          <a href="/download" download="faranka.apk">
            Download
          </a>
        </nav>
        <nav className="footer-links" aria-label="Resources">
          <span className="mono footer-col-label">Resources</span>
          <a href="#faq">FAQ</a>
          <a href="mailto:support@faranka.com">Support</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p className="mono">&copy; 2026 Faranka · All rights reserved</p>
        <p className="mono">100% on-device</p>
      </div>
    </footer>
  );
}
