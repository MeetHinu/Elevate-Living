export default function PageHero({ image, alt, eyebrow, title, description }) {
  return (
    <header className="page-hero">
      <img src={image} alt={alt} />
      <div className="page-hero-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  );
}
