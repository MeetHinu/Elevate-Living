import PageHero from "../components/PageHero.jsx";
import ServiceBlock from "../components/ServiceBlock.jsx";
import ProcessRow from "../components/ProcessRow.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { services } from "../data/services.js";
import { processSteps } from "../data/process.js";

export default function Services() {
  return (
    <>
      <PageHero
        image="/images/bathroom/bathroom-4.jpg"
        alt="Elevate Living Design services"
        eyebrow="Services"
        title="Every room, considered."
        description="From kitchens and bathrooms to laundries and living spaces — one studio, covered end to end."
      />

      <section className="section-cream">
        <div className="wrap grid-2" style={{ rowGap: 40, columnGap: 40 }}>
          {services.map((service) => (
            <ServiceBlock key={service.title} service={service} />
          ))}
        </div>
      </section>

      <section className="section-alt">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">How We Work</p>
            <h2>Our process</h2>
            <p>The same five stages carry every project, whatever room it is, from a first idea to a finished space.</p>
          </div>
          {processSteps.map((step) => (
            <ProcessRow key={step.num} step={step} />
          ))}
        </div>
      </section>

      <CtaBand
        title="Have a room in mind?"
        subtitle="Let's talk through what's possible for your space."
      />
    </>
  );
}
