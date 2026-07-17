export default function ServiceBlock({ service }) {
  return (
    <div className="service-block">
      <div className="thumb">
        <img src={service.img} alt={service.title} />
      </div>
      <h3>{service.title}</h3>
      <p style={{ color: "var(--text-ink-dim)", fontSize: 15, marginTop: 10 }}>{service.text}</p>
      <ul>
        {service.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
