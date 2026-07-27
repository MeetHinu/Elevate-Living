import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-logo-mark">
            <img src="/images/logo/logo.png" alt="Elevate Living Interior Design Studio" />
            <p style={{ marginTop: 14, maxWidth: 280 }}>
              Full-service interior design for kitchens, bathrooms, laundries and living spaces.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h5>Site</h5>
              <Link to="/">Home</Link>
              <Link to="/services">Services</Link>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-col">
              <h5>Studio</h5>
              <a href="mailto:info@elevatelivingstudio.com.au">info@elevatelivingstudio.com.au</a>
              <a href="tel:+61402601808">0402601808</a>
              <a
                href="https://instagram.com/elevateliving.design"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                @elevateliving.design
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Elevate Living Interior Design Studio. All rights reserved.</span>
          <span>Melbourne, Australia</span>
        </div>
      </div>
    </footer>
  );
}
