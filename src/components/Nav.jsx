import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }) => (isActive ? "active" : "");
  const close = () => setOpen(false);

  return (
    <nav className="site-nav">
      <div className="wrap">
        <Link to="/" className="logo-mark" onClick={close}>
          <img src="/images/logo/logo.jpg" alt="Elevate Living Interior Design Studio" />
        </Link>
        <div className={`nav-links${open ? " open" : ""}`}>
          <NavLink to="/" className={linkClass} onClick={close} end>Home</NavLink>
          <NavLink to="/services" className={linkClass} onClick={close}>Services</NavLink>
          <NavLink to="/portfolio" className={linkClass} onClick={close}>Portfolio</NavLink>
          <NavLink to="/about" className={linkClass} onClick={close}>About</NavLink>
          <NavLink to="/contact" className={linkClass} onClick={close}>Contact</NavLink>
          <Link to="/contact" className="nav-cta" onClick={close}>Book a Consultation</Link>
        </div>
        <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}
