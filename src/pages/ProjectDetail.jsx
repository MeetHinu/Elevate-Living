import { useParams, Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { findPortfolioItemOrNull } from "../data/portfolio.js";
import { useDocumentHead } from "../hooks/useDocumentHead.js";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = findPortfolioItemOrNull(id);

  useDocumentHead({
    title: project ? `${project.title} | Elevate Living Portfolio` : "Project Not Found | Elevate Living",
    description: project ? project.longDesc : "This project could not be found.",
  });

  if (!project) {
    return (
      <section className="section-cream">
        <div className="wrap" style={{ textAlign: "center", padding: "80px 0" }}>
          <p className="eyebrow">Portfolio</p>
          <h1 style={{ marginTop: 14 }}>Project not found.</h1>
          <p style={{ marginTop: 14, color: "var(--text-ink-dim)" }}>
            This project may have been renamed or removed.
          </p>
          <div style={{ marginTop: 28 }}>
            <Link to="/portfolio" className="btn btn-primary">Back to Portfolio</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        image={project.img}
        alt={project.title}
        eyebrow={project.tag}
        title={project.title}
        description={project.desc}
      />

      <section className="section-cream">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <p style={{ color: "var(--text-ink-dim)", fontSize: 16 }}>{project.longDesc}</p>
          <div style={{ marginTop: 32 }}>
            <Link to="/portfolio" className="btn btn-outline-dark">Back to Portfolio</Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Something similar in mind?"
        subtitle="We'd love to talk about what a similar approach could look like in your space."
      />
    </>
  );
}
