import { Link } from "react-router-dom";
import CtaBand from "../components/CtaBand.jsx";
import PhotoCard from "../components/PhotoCard.jsx";
import { findPortfolioItem } from "../data/portfolio.js";

const teaserIds = ["kitchen-2", "bath-3", "laundry-2", "bath-5", "kitchen-4"];

export default function Home() {
  return (
    <>
      <header className="photo-hero">
        <img src="/images/kitchen/kitchen-3.jpg" alt="Elevate Living Design project" />
        <div className="photo-hero-content">
          <blockquote>
            “Good design should feel like it always belonged — considered in every room, from the kitchen to the laundry.”
          </blockquote>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary">Book a Consultation</Link>
            <Link to="/portfolio" className="btn btn-outline-light">View Portfolio</Link>
          </div>
        </div>
      </header>

      <section className="section-cream">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Portfolio</p>
            <h2>Recent work</h2>
            <p>A look at kitchens, bathrooms and laundries we've brought to life.</p>
          </div>
          <div className="teaser-grid">
            {teaserIds.map((id) => (
              <PhotoCard key={id} project={findPortfolioItem(id)} />
            ))}
          </div>
          <div style={{ marginTop: 44 }}>
            <Link to="/portfolio" className="btn btn-outline-dark">Explore Full Portfolio</Link>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="wrap grid-2">
          <div>
            <div className="thumb" style={{ height: 260, marginBottom: 0, overflow: "hidden" }}>
              <img
                src="/images/kitchen/kitchen-5.jpg"
                alt="Kitchen design"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          <div style={{ alignSelf: "center" }}>
            <p className="eyebrow">What We Do</p>
            <h2 style={{ fontSize: 34, marginTop: 14 }}>Full-service interior design</h2>
            <p style={{ marginTop: 16, color: "var(--text-ink-dim)" }}>
              We design every room in the home — kitchens, bathrooms, laundries and living spaces — planned as
              one cohesive material story from concept through to build oversight and final styling.
            </p>
            <div style={{ marginTop: 28 }}>
              <Link to="/services" className="btn btn-outline-dark">Know More</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className="wrap grid-2">
          <div style={{ alignSelf: "center" }}>
            <p className="eyebrow">About Us</p>
            <h2 style={{ fontSize: 34, marginTop: 14 }}>Hinal Dave</h2>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 18,
                marginTop: 6,
                color: "var(--accent-brass)",
              }}
            >
              Founder & Principal Designer
            </p>
            <p style={{ marginTop: 18, color: "var(--text-ink-dim)" }}>
              Elevate Living was founded on the belief that every room in a home deserves the same level of
              care — not just the ones guests see. From kitchens and bathrooms to laundries and living
              spaces, each project is guided from first concept through to the final styled reveal.
            </p>
            <div style={{ marginTop: 28 }}>
              <Link to="/about" className="btn btn-outline-dark">Know More</Link>
            </div>
          </div>
          <div className="photo-card" style={{ aspectRatio: "3/4" }}>
            <img src="/images/team/hinal-dave.jpg" alt="Hinal Dave, Founder & Principal Designer" />
          </div>
        </div>
      </section>

      <CtaBand
        title="Start with a conversation."
        subtitle="Tell us about your space — we'll take it from there."
      />
    </>
  );
}
