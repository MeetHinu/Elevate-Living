import { useState } from "react";
import PageHero from "../components/PageHero.jsx";
import PhotoCard from "../components/PhotoCard.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { filterTabs, portfolioItems, filterPortfolio } from "../data/portfolio.js";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const visibleItems = filterPortfolio(portfolioItems, activeFilter);

  return (
    <>
      <PageHero
        image="/images/kitchen/kitchen-1.jpg"
        alt="Elevate Living Design portfolio"
        eyebrow="Portfolio"
        title="Rooms we've brought to life."
        description="Kitchens, bathrooms, laundries and living spaces — each one designed and overseen from first sketch to final styling."
      />

      <section className="section-cream">
        <div className="wrap">
          <div className="filter-bar">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                className={`filter-btn${activeFilter === tab.key ? " active-filter" : ""}`}
                onClick={() => setActiveFilter(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {visibleItems.length > 0 ? (
            <div className="grid-3">
              {visibleItems.map((item) => (
                <PhotoCard key={item.id} project={item} />
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--text-ink-dim)" }}>
              Photos for this category are on the way — check back soon, or get in touch to see recent work directly.
            </p>
          )}
        </div>
      </section>

      <CtaBand
        title="See something close to your vision?"
        subtitle="We'd love to talk about what a similar approach could look like in your space."
      />
    </>
  );
}
