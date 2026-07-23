import { useEffect, useRef, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import { encodeForm } from "../lib/encodeForm.js";

const initialState = { name: "", email: "", phone: "", project: "Kitchen", message: "", "bot-field": "" };

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState(initialState);
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(resetTimeoutRef.current);
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearTimeout(resetTimeoutRef.current);
    setStatus("sending");
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm({ "form-name": "consultation-request", ...form }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
        setStatus("sent");
        resetTimeoutRef.current = setTimeout(() => {
          setStatus("idle");
          setForm(initialState);
        }, 3000);
      })
      .catch(() => setStatus("error"));
  };

  return (
    <>
      <PageHero
        image="/images/living/living-3.jpg"
        alt="Contact Elevate Living Design"
        eyebrow="Contact"
        title="Tell us about your space."
        description="Fill in a few details and we'll get back to you within two business days to arrange a consultation."
      />

      <section className="section-cream">
        <div className="wrap grid-2">
          <div>
            <form
              onSubmit={handleSubmit}
              name="consultation-request"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="consultation-request" />
              <p style={{ display: "none" }}>
                <label>
                  Don't fill this out if you're human:{" "}
                  <input name="bot-field" value={form["bot-field"]} onChange={handleChange} />
                </label>
              </p>

              <div className="form-row">
                <div>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={status === "sending" || status === "sent"}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={status === "sending" || status === "sent"}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={status === "sending" || status === "sent"}
                  />
                </div>
                <div>
                  <label htmlFor="project">Project Type</label>
                  <select
                    id="project"
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    disabled={status === "sending" || status === "sent"}
                  >
                    <option>Kitchen</option>
                    <option>Bathroom</option>
                    <option>Laundry</option>
                    <option>Living Space</option>
                    <option>Whole Home</option>
                    <option>Not Sure Yet</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message">Tell us about your space</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  disabled={status === "sending" || status === "sent"}
                  placeholder="Room size, current condition, timeline, anything else that helps us prepare."
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "sending" || status === "sent"}
                >
                  {status === "sending" ? "Sending…" : status === "sent" ? "Request sent" : "Request Consultation"}
                </button>
                <p
                  aria-live="polite"
                  style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}
                >
                  {status === "sending" ? "Sending your request…" : status === "sent" ? "Request sent." : ""}
                </p>
                {status === "error" && (
                  <p role="alert" style={{ marginTop: 12, fontSize: 13, color: "#a94442" }}>
                    Something went wrong — please email us directly at{" "}
                    <a href="mailto:info@elevateliving.com.au">info@elevateliving.com.au</a>.
                  </p>
                )}
              </div>
            </form>
          </div>
          <div className="photo-card" style={{ aspectRatio: "auto", height: "100%", minHeight: 340 }}>
            <img src="/images/bathroom/bathroom-2.jpg" alt="Elevate Living Design project" />
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="wrap grid-3">
          <div>
            <p className="eyebrow">Studio</p>
            <h3 style={{ fontSize: 20, marginTop: 10 }}>Visit Us</h3>
            <p style={{ marginTop: 10, color: "var(--text-ink-dim)", fontSize: 14 }}>
              123 Gertrude Street<br />Fitzroy VIC 3065<br />Australia
            </p>
          </div>
          <div>
            <p className="eyebrow">Reach Out</p>
            <h3 style={{ fontSize: 20, marginTop: 10 }}>Get in Touch</h3>
            <p style={{ marginTop: 10, color: "var(--text-ink-dim)", fontSize: 14 }}>
              <a href="mailto:info@elevateliving.com.au">info@elevateliving.com.au</a>
              <br />
              <a href="tel:+61402601808">0402601808</a>
            </p>
          </div>
          <div>
            <p className="eyebrow">Hours</p>
            <h3 style={{ fontSize: 20, marginTop: 10 }}>Studio Hours</h3>
            <p style={{ marginTop: 10, color: "var(--text-ink-dim)", fontSize: 14 }}>
              Monday – Friday: 9am – 5:30pm<br />Saturday: By appointment
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
