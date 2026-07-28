import { testimonials } from "../data/testimonials.js";

export default function Testimonials({ background = "alt" }) {
  return (
    <section className={`section-${background}`}>
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">What Clients Say</p>
          <h2>In their words</h2>
        </div>
        <div className="grid-3">
          {testimonials.map((item) => (
            <div className="testimonial-card" key={item.name + item.quote}>
              <p className="testimonial-quote">“{item.quote}”</p>
              <p className="testimonial-name">{item.name}</p>
              <p className="testimonial-detail">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
