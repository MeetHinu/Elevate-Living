import PageHero from "../components/PageHero.jsx";
import CtaBand from "../components/CtaBand.jsx";

export default function About() {
  return (
    <>
      <PageHero
        image="/images/kitchen/kitchen-4.jpg"
        alt="Elevate Living Design studio"
        eyebrow="About"
        title="A studio for the whole home."
        description="Every room deserves the same level of care — from the kitchen to the laundry."
      />

      <section className="section-cream">
        <div className="wrap grid-2">
          <div>
            <p className="eyebrow">Our Story</p>
            <h2 style={{ fontSize: 32, marginTop: 14 }}>Why Elevate Living</h2>
          </div>
          <div>
            <p style={{ color: "var(--text-ink-dim)" }}>
              Elevate Living was founded on a simple idea: a home is only as good as its least-considered
              room. We design kitchens, bathrooms, laundries and living spaces with the same attention to
              detail — the same care in material choice, lighting, and daily function — so nothing in the
              home feels like an afterthought.
            </p>
            <p style={{ color: "var(--text-ink-dim)", marginTop: 18 }}>
              That means door hinges chosen for a fifteen-year life, waterproofing specified to outlast the
              tile above it, and lighting plans that account for how a room is actually used morning and
              night.
            </p>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="wrap grid-2">
          <div>
            <div className="photo-card" style={{ aspectRatio: "3/4" }}>
              <img src="/images/team/hinal-dave.jpg" alt="Hinal Dave, Founder & Principal Designer" />
            </div>
            <h3 style={{ fontSize: 22, marginTop: 20 }}>Hinal Dave</h3>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 15,
                marginTop: 4,
                color: "var(--accent-brass)",
              }}
            >
              Founder & Principal Designer
            </p>
          </div>
          <div style={{ alignSelf: "center" }}>
            <p className="eyebrow">Founder's Summary</p>
            <p style={{ color: "var(--text-ink-dim)", marginTop: 16 }}>
              I'm Hinal, founder of Elevate Living. Interior design has always been about creating spaces
              that genuinely improve the way people live.
            </p>
            <p style={{ color: "var(--text-ink-dim)", marginTop: 16 }}>
              After designing my own home, I discovered how thoughtful planning and great design can
              completely transform everyday living. That passion led me into a career spanning more than 10
              years, working across kitchens, bathrooms, laundries, custom joinery, renovations and new home
              selections.
            </p>
            <p style={{ color: "var(--text-ink-dim)", marginTop: 16 }}>
              Today, I work closely with homeowners, builders and developers across Melbourne to create
              timeless interiors that balance beauty, functionality and long-term value.
            </p>
            <p style={{ color: "var(--text-ink-dim)", marginTop: 16 }}>
              Every project is approached with creativity, practical thinking and attention to detail,
              ensuring every space reflects the people who live in it.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's talk about your home."
        subtitle="We take on a limited number of projects each year — get in touch to check availability."
      />
    </>
  );
}
