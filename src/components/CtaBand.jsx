import { Link } from "react-router-dom";

export default function CtaBand({ title, subtitle }) {
  return (
    <section className="cta-band">
      <div className="wrap">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <Link to="/contact" className="btn btn-primary">Book a Consultation</Link>
      </div>
    </section>
  );
}
