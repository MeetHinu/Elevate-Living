import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section-cream">
      <div className="wrap" style={{ textAlign: "center", padding: "80px 0" }}>
        <p className="eyebrow">404</p>
        <h1 style={{ marginTop: 14 }}>Page not found.</h1>
        <p style={{ marginTop: 14, color: "var(--text-ink-dim)" }}>
          The page you're looking for doesn't exist or may have moved.
        </p>
        <div style={{ marginTop: 28 }}>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
