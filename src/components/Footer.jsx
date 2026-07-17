import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-logo-mark">
            <img src="/images/logo/logo.jpg" alt="Elevate Living Interior Design Studio" />
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
              <p>123 Gertrude Street<br />Fitzroy VIC 3065</p>
              <a href="mailto:info@elevateliving.com.au">info@elevateliving.com.au</a>
              <a href="tel:+61402601808">0402601808</a>
              <a href="https://instagram.com/elevateliving.design" target="_blank" rel="noopener noreferrer">
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
